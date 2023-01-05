import React, {useState} from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView} from "react-native";
import Logo from '../../assets/images/logo.jpg';
import {useNavigation} from '@react-navigation/native';
import Button from "../components/Button";
import auth from '@react-native-firebase/auth';
import NavBar from "../components/NavBar";
import SeeAnnouncements from "../components/SeeAnnouncements";

function FindTeamMates() {
    const navigation = useNavigation();
    const {height} = useWindowDimensions();

    const onAddAnnouncementPressed = () => {
        navigation.navigate("AddAnnouncement");
    }

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
        <NavBar text="Gasire de coechipieri" />
        <Button alignSelf="flex-start" bgColor="white" text="Adauga un anunt" onPress={onAddAnnouncementPressed}/>
        <SeeAnnouncements />
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
export default FindTeamMates;