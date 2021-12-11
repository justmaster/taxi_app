import 'react-native-gesture-handler'
import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { APIKEY } from "@env"
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavourites from './NavFavourites'
import { Icon } from 'react-native-elements'

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw `text-center py-5 text-xl`}>Good Morning Tornike</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete 
                        placeholder="Where to?"
                        styles={styles}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        minLength={2}
                        onPress={(data, details = null) => {
                        // რედუქსში ვნიშნავთ სტეიტს მიღებული არგუმენტებიდან
                            dispatch(
                                setDestination({
                                    location: details.geometry.location,
                                    description: data.description,
                                })
                            )
                        // ეგრევე დანიშნულების მიცემის შემდეგ გადავდივართ მგზავრობის დაზუზტების სტაკზე
                                navigation.navigate('RideOptionsCard')
                        }}
                        enablePoweredByContainer={false}
                        query={{
                            key: APIKEY,
                            language: "en"
                        }}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                    />
                </View>

                <NavFavourites />
            </View>
            

            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("RideOptionsCard")}
                    style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
                    <Icon 
                        name="car" 
                        type="font-awesome" 
                        color="white" 
                        size={16} 
                    />
                    <Text style={styles.ridesText}>Ride</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
                    <Icon 
                        name="fast-food-outline" 
                        type="ionicon" 
                        color="black" 
                        size={16} 
                    />
                    <Text style={styles.ridesText}>Offer</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}

export default NavigateCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,

    },
    rootView: {
        // {tw`bg-white flex-1`}
        backgroundColor: "white",
        display: "flex",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    greetings: {
        // {tw `text-center py-5 text-xl`}
        textAlign: "center",
        paddingTop: 20,
        paddingBottom: 20,
    },
    barcontainer: {
        // tw`border-t border-gray-200 flex-shrink`
        borderTopWidth: 1,
        borderColor: "rgb(229, 231, 235)",
        flexShrink: 1,
    },
    searchcontainer:{
        marginBottom: 70,
        zIndex: 50,
        height: "30%"

    },
    ordercarcontainer:{
        //tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-evenly",
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: "auto",
        borderTopWidth: 1,
        borderColor: "rgb(229, 231, 235)"
    },
    rides: {
        // tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "rgb(0, 0, 0)",
        width: 86,
        paddingLeft: 16,
        paddingRight: 16,        
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 9999,
    },
    ridesText: {
        color: "white",
        textAlign: "center",
    },

})
