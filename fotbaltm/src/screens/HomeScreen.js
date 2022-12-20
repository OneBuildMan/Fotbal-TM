import React, {useState} from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView} from "react-native";
import Logo from '../../assets/images/logo.jpg';
import {useNavigation} from '@react-navigation/native';
import AppLogin from "../components/AppLogin";
import Button from "../components/Button";
import auth from '@react-native-firebase/auth';

function HomeScreen() {
    const navigation = useNavigation();
    const {height} = useWindowDimensions();

    const onSignOutPressed = () => {
        auth().signOut()
        .then(()=>{
            console.log('Logged out');
        })
        
    }

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Image 
            source={Logo} 
            style={[styles.logo, {height: height * 0.1}]} 
            resizeMode="contain"
            />
            <AppLogin/>
            <Text> Home page placeholder</Text>
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