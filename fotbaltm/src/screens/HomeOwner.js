import React from "react";
import { Text, ScrollView, View } from "react-native";
import {useNavigation} from '@react-navigation/native';
import Button from "../components/Button";
import auth from "@react-native-firebase/auth";

function HomeOwner() {
    const navigation = useNavigation();

    const onSignOutPressed = () => {
        auth().signOut()
        .then(()=>{
            console.log('Logged out');
            navigation.navigate('HomeLogin');
        }) 
    }
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
            <Text>Home page for Owner</Text>
            <Button text="Sign Out" onPress={onSignOutPressed} bgColor='white' />
            </View>
        </ScrollView>
    );
}

export default HomeOwner;