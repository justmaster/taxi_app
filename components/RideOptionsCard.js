import React, {useState} from 'react'
import { FlatList, View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { selectTravelTimeInformation } from "../slices/navSlice"
import { Icon } from 'react-native-elements'


const data = [
    {
        id: "Taxi-X-123",
        title: "TaxiX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "Taxi-XL-456",
        title: "TaxiXL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "Taxi-X-789",
        title: "TaxiLUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    },
];

// პტობკების მიხედვით მულიტპლიკატორია
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null)
    const travelTimeInformation =  useSelector(selectTravelTimeInformation)
    

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("NavigateCard")}
                    style={styles.gobackbutton}> 
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Select A Ride - {travelTimeInformation?.distance?.text}</Text>
            </View>

            {/* // მანქანის არჩევა  */}
            <FlatList 
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({item: { id, title, multiplier, image}, item}) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"}`}
                        >
                        <Image 
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain",
                            }}
                            source={{ uri: image}}
                        />
                        <View style={styles.rideinfocontainer}>
                            <Text style={styles.smalltitle}>{title}</Text>
                            <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
                        </View>
                        <Text style={styles.price}>
                            {new Intl.NumberFormat('en-bg',{
                                style: 'currency',
                                currency: 'GEL'
                            }).format(
                                (travelTimeInformation?.duration?.value * 
                                    SURGE_CHARGE_RATE * 
                                    multiplier) / 
                                100
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            {/* // დადასტურება  */}
            
            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity 
                    disabled={!selected} 
                    style={tw` bg-black py-3 m-3 ${!selected && "bg-gray-300"}` }
                >
                    <Text style={styles.buttonText}>
                        Choose {selected?.title}
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default RideOptionsCard


const styles = StyleSheet.create({
    rootview: {
        // tw`bg-white flex-grow`
        backgroundColor: "white",
        flexGrow: 1,
    },
    gobackbutton:{
        // tw`absolute top-3 left-5 p-3 rounded-full`
        position: "absolute",
        marginTop: 12,
        left: 20,
        padding: 12,
        borderRadius: 9999,
        zIndex: 10,
    },
    screeninfo:{
        // tw`text-center py-5 text-xl`
        textAlign: "center",
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 20,
        lineHeight: 28,
    },
    rideinfocontainer: {
        // {tw`-ml-6`}
        marginLeft: -20,
    },
    smalltitle:{
        // tw`text-xl font-semibold`
        fontSize: 20,
        lineHeight: 25,
        fontWeight: "600",
    },
    price: {
        // tw`text-xl`
        fontSize: 20,
        lineHeight: 28,
    },
    borderBottomContainer: {
        // tw`mt-auto border-t border-gray-200`
        marginTop: "auto",
        borderTopWidth: 1,
        borderColor: "rgb(229, 231, 235)"
    },
    buttonText: {
        // tw`text-center text-white text-xl`
        textAlign: "center",
        color: "white",
        fontSize: 20,
        lineHeight: 28,

    } ,

})

