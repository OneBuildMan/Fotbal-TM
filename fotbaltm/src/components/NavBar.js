import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, Pressable } from 'react-native';
import logout from '../../assets/images/logout.png';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

function NavBar({ text }) {
    const navigation = useNavigation();
    const {height} = useWindowDimensions();

    const onSignOutPressed = () => {
        auth().signOut()
        .then(()=>{
            console.log('Logged out');
            navigation.navigate('HomeLogin');
        }) 
        .catch(error => {
            navigation.navigate('HomeLogin');
        })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.text}> {text} </Text>
            <Pressable style={styles.button} onPress={onSignOutPressed}>
            <Image style={[styles.logout, {height: height * 0.05}]} source={logout}  />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        width: "90%",

        alignSelf: "center",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        borderColor: '#777777',
        borderWidth: 1,
        borderRadius: 5,
        padding: 2
    },
    text: {
        fontSize: 16,
        alignSelf: "center",
        color: "black",
        padding: 4,
        textAlign: "center"
    },
    logout: {
        maxWidth: 25,
        maxHeight: 32
    }
});
export default NavBar;