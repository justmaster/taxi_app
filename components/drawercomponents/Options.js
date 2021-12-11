import 'react-native-gesture-handler'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import {  useNavigation } from '@react-navigation/native';

const OptionsScreen = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>Options</Text>

            <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={tw` absolute top-10 left-4 z-50 p-3 rounded-full shadow-lg`} 
                >
                    
                <Icon name="menu" size={30} />
            </TouchableOpacity>
        </View>
    )
}

export default OptionsScreen

const styles = StyleSheet.create({})
