import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeLogin from "../screens/HomeLogin";
import Register from "../screens/Register";

const Stack = createNativeStackNavigator();

function Navigation() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeLogin" screenOptions={{headerShown: false}} >
                <Stack.Screen name="HomeLogin" component={HomeLogin}/>
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;