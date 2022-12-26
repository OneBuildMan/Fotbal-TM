import React, {useState} from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView} from "react-native";
import Logo from '../../assets/images/logo.jpg';
import {useNavigation} from '@react-navigation/native';
import AppLogin from "../components/AppLogin";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import auth from '@react-native-firebase/auth';

function HomeScreen() {
    const navigation = useNavigation();
    const {height} = useWindowDimensions();

    const onSignOutPressed = () => {
        auth().signOut()
        .then(()=>{
            console.log('Logged out');
            navigation.navigate('HomeLogin');
        }) 
    }

    const onBookFieldPressed = () => {
        console.log('Rezerva teren');
        navigation.navigate('BookField');
    }

    const onSeeYourBooksPressed = () => {
        console.log('Rezerva teren');
        navigation.navigate('SeeBooks');
    }

    const onFindTeamMatesPressed = () => {
        console.log('Rezerva teren');
        navigation.navigate('FindTeamMates');
    }

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <NavBar text="Home Jucator"/>
            <Image 
            source={Logo} 
            style={[styles.logo, {height: height * 0.1}]} 
            resizeMode="contain"
            />
            <Text> Home</Text>
            <Button text="Rezerva Teren" onPress={onBookFieldPressed} bgColor='white' />
            <Button text="Vezi rezervarile tale" onPress={onSeeYourBooksPressed} bgColor='white' />
            <Button text="Gaseste Coechipieri" onPress={onFindTeamMatesPressed} bgColor='white' />
            <Button text="Sign Out" onPress={onSignOutPressed} bgColor='white' />
        </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    
});
export default HomeScreen;