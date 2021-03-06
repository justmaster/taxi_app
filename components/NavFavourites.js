import 'react-native-gesture-handler'
import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon';
import {  selectbookmart1, selectbookmart2} from "../slices/navSlice"
import { useSelector } from "react-redux"


// aq Back - dan fetch rom gaketdes useris mixedvit amis amushavebas bevri dro ar unda






const NavFavourites = () => {
    const bookmart1 = useSelector(selectbookmart1)
    const bookmart2 = useSelector(selectbookmart2)

    const data = [
        {
            id: "123",
            icon: "home",
            location: "Home",
            destination: bookmart1,
        },
        {
            id: "456",
            icon: "briefcase",
            location: "Work",
            destination: bookmart2,
        },
    ];
    
    return (
        <FlatList 
            data={data} 
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={()=> (
                <View 
                    style={styles.separatorline}
                />
            )}
            renderItem={({item: { location, destination, icon }}) => (
                <TouchableOpacity style={styles.favoriteline}>
                    <Icon
                        style={styles.iconfav}
                        name={icon}
                        type="ionicon"
                        color="white"
                        size={18}
                    />
                    <View>
                        <Text style={styles.location}>{location}</Text>
                        <Text style={styles.destination}>{destination}</Text>
                    </View>
                </TouchableOpacity>
            )}/>
    )
}

export default NavFavourites

const styles = StyleSheet.create({
    separatorline: {
        // style={[tw`bg-gray-200 `, {height: 0.5}]}
        backgroundColor: "rgb(229, 231, 235)",
        height: 0.5,
    },
    favoriteline: {
        // {tw`flex-row item-center p-5`}
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 13,
    },
    iconfav: {
        margin: 13,
        borderRadius: 4,
        backgroundColor: "gray",
        opacity: 1,
        padding: 6,
    },
    location: {
        // {tw`font-semibold text-lg`}
        fontWeight: "600",
        fontSize: 18,
        lineHeight: 18,
    },
    destination: {
        // {tw`text-gray-500`}
        color: "rgb(107, 114, 128)",
    }

})
