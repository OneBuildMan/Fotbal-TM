import React, {useState} from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView} from "react-native";
import Logo from '../../assets/images/logo.jpg';
import {useNavigation} from '@react-navigation/native';
import NavBar from '../components/NavBar';
import Button from "../components/Button";
import auth from '@react-native-firebase/auth';
import ScrollableList from "../components/ScrollableList";

function HomeScreen() {
    const navigation = useNavigation();
    const {height} = useWindowDimensions();

    const items = [
        { id: 1, title: 'Item 1', details: 'Additional item details go here' },
        { id: 2, title: 'Item 2', details: 'Additional item details go here' },
        { id: 3, title: 'Item 2', details: 'Additional item details go here' },
        // More items
      ];

    const onSignOutPressed = () => {
        auth().signOut()
        .then(()=>{
            console.log('Logged out');
            navigation.navigate('HomeLogin');
        }) 
    }

    const onFindTeamMatesPressed = () => {
        navigation.navigate('FindTeamMates');
    }

    const onSeeYourBookingsPressed = () => {
        navigation.navigate('SeeBookingsAsPlayer');
    }

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <NavBar text="Lista terenuri"/>
            <View style={styles.buttons}>
            <Button bgColor="white" text="Vezi rezervarile tale" onPress={onSeeYourBookingsPressed}/>
            <Button bgColor="white" marginLeft={60} text="Gaseste coechipieri" onPress={onFindTeamMatesPressed}/>
            </View>
            <ScrollableList/>
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
    buttons: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 15
    }
    
});
export default HomeScreen;