import 'react-native-gesture-handler'
import React from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native'
import MapView from 'react-native-maps'
import {  selectDestination, selectOrigin, selectTravelTimeInformation } from "../slices/navSlice"
import MapViewDirections from 'react-native-maps-directions'
import { Icon } from 'react-native-elements/dist/icons/Icon'

import { useEffect, useRef} from 'react'
import { APIKEY } from '@env'
import { map } from 'lodash'
import { Marker } from 'react-native-maps'
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { setTravelTimeInformation } from '../slices/navSlice'
import marker from '.././assets/Map-Marker-icon.png'



const Map = () => {
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const travelTimeInformation = useSelector(selectTravelTimeInformation)
    const originlat = origin.location.lat
    const originlng = origin.location.lng
    const OriginCoordStr = originlat.toString() + "," + originlng.toString()



    useEffect(() => {
        if (!origin || !destination) return;


        // მაშტაბი და მარკერის დაზუსტებისას
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50}
        })
    }, [origin, destination]);

    const getTravelTimeDirect = async() => {
        fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?
        units=metric&origins=${originlat} ${originlng}
        &destinations=${destination.description}
        &key=${APIKEY}`
        ).then((res) => res.json()).then(data => {
            dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
        })
    };

    const getTravelTime = async() => {
        fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?
        units=metric&origins=${origin.description}
        &destinations=${destination.description}
        &key=${APIKEY}`
        ).then((res) => res.json()).then(data => {
            dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
        })
    };

    useEffect(() => {
        if (!origin || !destination) return;
        console.log(origin)
        origin.description ? 
            getTravelTime()
            :
            getTravelTimeDirect()
    }, [origin, destination, APIKEY])

    
    return (
        
    <MapView
        ref={mapRef}
        style={styles.mapview}
        mapType="mutedStandard"
        initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.0421,
        }}
    >
        {origin.description ? 
                origin && destination && (
                    <MapViewDirections
                        origin={origin.description}
                        destination={destination.description}
                        apikey={APIKEY}
                        strokeWidth={4}
                        strokeColor="black"
                    />
                )

        :

        origin && destination && (
            <MapViewDirections
                origin={OriginCoordStr}
                destination={destination.description}
                apikey={APIKEY}
                strokeWidth={4}
                strokeColor="black"
            />
        )

        }


        {origin?.location && (
            <Marker 
            draggable
            coordinate={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
            }}
            // onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
            onDragEnd={(e) => console.log(e.nativeEvent.coordinate.longitude)}
            // dispatch(
            //     setDestination({
            //         location: details.geometry.location,
            //         description: data.description,
            //     })
            title="Origin"
            description={origin.description}
            identifier="origin"
            image={marker}
            />
        )}
        
        {destination?.location && (
            <Marker 
            coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
            }}
            title="Destination"
            description={destination.description}
            identifier="Destination"
            />
        )}


    </MapView>
    
    
    );
}

export default Map

const styles = StyleSheet.create({
    text: {
        fontSize: 5,
    },
    mapview: {
        flex: 1
    },
    
})
