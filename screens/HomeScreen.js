import 'react-native-gesture-handler'
import React, { useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import NavOptions from "../components/NavOptions.js"
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { APIKEY } from '@env';
import { setDestination, setOrigin } from '../slices/navSlice.js';
import { useDispatch } from 'react-redux';
import {  useNavigation } from '@react-navigation/native';
import NavFavourites from '../components/NavFavourites.js';
import { Icon } from 'react-native-elements/dist/icons/Icon'
import * as Location from 'expo-location';

Location.installWebGeolocationPolyfill()
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
function success(pos) {
    var crd = pos.coords;
  
    // console.log('Your current position is:');
    // console.log(crd)
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);
  };

  function error(err) {
    console.log(`ERROR(${err.code}): ${err.message}`);
  };

navigator.geolocation.getCurrentPosition(success, error, options);

const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();


    const StartingPoint = () => {
        
        return (
        <View style={styles.formContainer}>
            <GooglePlacesAutocomplete
                        placeholder='Where From?'
                        styles={{
                            container: {
                                zIndex: 10,
                            },
                            textInputContainer: {
                            backgroundColor: 'white',
                            fontSize: 28,
                            //   borderTopWidth: 0.5,
                            //   borderBottomWidth: 0.5,
                            //   borderColor: "rgba(229, 231, 235)"
                            //   borderRadius: 1,
                            },
                            textInput: {
                            color: '#5d5d5d',
                            fontSize: 25,
                            zIndex: 10,
                            },
                            listView: {
                                zIndex: 100000,
                            }
                        }}
                        // აქ ვიღებთ და ნაპოვნ ლოკაციას ვსტორავთ 
                        onPress={(data, details = null) => {
                            dispatch(setOrigin({
                                location: details.geometry.location,
                                description: data.description
                            }))
                            dispatch(setDestination(null));
                        }}
                        onFail={error => console.error(error)}
                        query={{
                            key: APIKEY,
                            language: 'en',
                            types: 'geocode', // default: 'geocode'
                            components: 'country:ge',
                        }}
                        
                        fetchDetails={true}
                        enablePoweredByContainer={false}
                        minLength={2}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel="Current Position: Choose from list"
                        />
        </View>
        )

    }
    
    return (
        <SafeAreaView style={styles.mainViewContainer}>
            
                {/* Logotipi */}
                {/* <Image 
                        style={{
                            width: 100,
                            height: 100,
                            resizeMode: 'contain',
                            zIndex: 100,
                        }}
                    source={{
                        uri: ""
                    }}
                /> */}
            <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={tw` absolute top-10 left-4 z-50 p-3 rounded-full shadow-lg`} 
                >
                    
                <Icon name="menu" size={30} />
            </TouchableOpacity>
            
            <Text style={styles.apptitle}> ThisTaxi Is Cool </Text>

            <StartingPoint />

            <View style={styles.optionsContainer}>
                
                <NavOptions />
                <NavFavourites />
    
            </View>
            




        </SafeAreaView>
    )
};

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        fontSize: 5,
    },
    formContainer: {
        position: "absolute",
        marginTop: "30%", 
        backgroundColor: "white", 
        width: "100%", 
        zIndex: 1, 
        alignSelf: "center" 
    },
    mainViewContainer:{
        height: "100%", 
        display: 'flex',
        backgroundColor: "white" , 
        flexDirection: "column",
    },
    apptitle:{
        fontSize: 28, 
        fontFamily: "Verdana", 
        margin: 30, 
        alignSelf: "center"
    },
    optionsContainer:{
        position: "absolute", 
        marginTop: "50%", 
        backgroundColor: "white",
    }

})
