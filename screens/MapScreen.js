import 'react-native-gesture-handler'
import 'react-native-reanimated'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import Map from '../components/Map'
import NavigateCard from '../components/NavigateCard'
import RideOptionCard from '../components/RideOptionsCard'
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements'

import HomeScreen from './HomeScreen'


const MapScreen = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();

    function MyDrawer() {
        return (
          <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Map" component={MapScreen} />
          </Drawer.Navigator>
        );
      }

    return (
        <View>

            <TouchableOpacity
                    onPress={() => navigation.navigate("Home")}
                    style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`} 
                    >

                    <Icon name="menufold"  type='antdesign' size={23} />
            </TouchableOpacity>

            <View style={styles.firstHalfContainer}>
                <Map />
            </View>



            <View style={styles.secondHalfContainer}>

                <Stack.Navigator>
                    <Stack.Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{
                            headerShown: false,
                        }}
                        >
                    </Stack.Screen>

                    <Stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionCard}
                        options={{
                            headerShown: false,
                        }}
                        >
                    </Stack.Screen>

                </Stack.Navigator>

            </View>
        </View>

        
    )
}

export default MapScreen


const styles = StyleSheet.create({ 
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    menuBackButt:{
        // tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        zIndex: 50,
        backgroundColor: "rgb(243, 244, 246)",
        marginTop: "9%", 
        marginLeft: "7%",
        height: Dimensions.get('window').height * 0.02,
        width: Dimensions.get('window').height * 0.02,
        borderRadius: Math.round((Dimensions.get('window').height + Dimensions.get('window').width) / 2),
        // borderBottomLeftRadius: 100,
        // borderBottomRightRadius: 100,
        // borderTopLeftRadius: 100,
        // borderTopRightRadius: 100,
        shadowOpacity: 0.75,
        shadowRadius: 8,
        shadowOffset: { height: 3, width: 3 }
    },
    firstHalfContainer:{
        // tw`h-1/2`
        height: "50%",
    },
    secondHalfContainer: {
        // tw`h-1/2`
        height: "50%",
    }
})