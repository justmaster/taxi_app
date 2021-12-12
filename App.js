import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import 'react-native-reanimated'
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { KeyboardAvoidingView, Platform} from 'react-native';
import { Provider } from "react-redux"
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import OptionsScreen from './components/drawercomponents/Options';
import ProfileScreen from './components/drawercomponents/Profile';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContent from './components/navigation/DrawerContent';

const Drawer = createDrawerNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1}}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
          
          <Drawer.Navigator initialRouteName='Home' drawerContent={props => <DrawerContent {... props} />} >

            <Drawer.Screen 
              name="Home" 
              component={HomeScreen}
              options={{
                headerShown: false,
                drawerItemStyle: { height: 0 }
              }}/>

            <Drawer.Screen 
              name="MapScreen" 
              
              component={MapScreen}
              options={{
                headerShown: false,
                drawerItemStyle: { height: 0 },
                unmountOnBlur: true
                
              }}/>

              <Drawer.Screen 
              name="Options" 
              component={OptionsScreen}
              options={{
                headerShown: false,
                drawerItemStyle: { height: 0 },
                unmountOnBlur: true,
              }}/>

              <Drawer.Screen 
              name="Profile" 
              component={ProfileScreen}
              options={{
                headerShown: false,
                drawerItemStyle: { height: 0 },
                unmountOnBlur: true,
              }}/>

          </Drawer.Navigator>

          </KeyboardAvoidingView>

        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}


