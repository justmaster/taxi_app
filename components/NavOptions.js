import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from "../slices/navSlice"


const data = [
    {
        id: "123",
        title: "Get a Ride",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen",
    },
    {
        id: "456",
        title: "Offer a Deal",
        image: "https://links.papareact.com/28w",
        screen: "EatsScreen", // Change in future...
    },
];

const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin)
    return (
        <FlatList 
            style={{zIndex: 1}}
            data={data}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (

                <TouchableOpacity 
                    onPress={()=> navigation.navigate(item.screen)}
                    style={styles.optionContainer}
                    disabled={!origin}
                    >
                    <View style={tw `${!origin && "opacity-20"}`}>
                        <Image 
                            style={styles.image}
                            source={{ uri: item.image }}
                        />
                        <Text style={styles.title}>{item.title}</Text>
                        <Icon 
                        style={styles.icon} 
                            name='arrowright' 
                            color='white' 
                            type='antdesign'
                        />
                    </View>
                </TouchableOpacity>

            )}

        />
    )
}

export default NavOptions


const styles = StyleSheet.create({
    text: {
        fontSize: 10,
    },
    // tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`
    optionContainer:{
        padding: 8,
        paddingLeft: 20,
        paddingBottom: 32,
        paddingTop: 30,
        backgroundColor: "rgb(229, 231, 235)",
        margin: 9,
        width: 160,
    },
    image: {
        width: 130,
        height: 130, 
        resizeMode: "contain"
    },
    title: {
        // tw`mt-2 text-lg font-semibold`
        marginTop: 19,
        fontSize: 19,
        lineHeight: 20,
        fontWeight: "600",
    },
    icon: {
        // tw`p-2 bg-black rounded-full w-10 mt-4`
        padding: 8,
        backgroundColor: "black",
        borderRadius: 9999,
        width: 40,
        marginTop: 12,
    },

})
