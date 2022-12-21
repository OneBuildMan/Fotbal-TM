import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeLogin from "../screens/HomeLogin";
import Register from "../screens/Register";
import Homescreen from "../screens/HomeScreen";
import BookField from "../screens/BookField";
import SeeYourBooks from "../screens/SeeBooks";
import FindTeamMates from "../screens/FindTeamMates";

const Stack = createNativeStackNavigator();

function Navigation() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeLogin" screenOptions={{headerShown: false}} >
                <Stack.Screen name="HomeLogin" component={HomeLogin}/>
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Home" component={Homescreen} />
                <Stack.Screen name="BookField" component={BookField} />
                <Stack.Screen name="SeeBooks" component={SeeYourBooks} />
                <Stack.Screen name="FindTeamMates" component={FindTeamMates} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;