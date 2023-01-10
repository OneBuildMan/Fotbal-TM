import React from "react";
import { Text, ScrollView, View } from "react-native";
import {useNavigation} from '@react-navigation/native';
import Button from "../components/Button";
import FieldDetailsOwner from "../components/FieldDetailsOwner";
import auth from "@react-native-firebase/auth";
import NavBar from '../components/NavBar';

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
            <NavBar text="Detalii teren"/>
            <FieldDetailsOwner />
            </View>
        </ScrollView>
    );
}

export default HomeOwner;