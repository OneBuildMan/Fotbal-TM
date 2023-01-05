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

    const onSeeYourAnnouncementsPressed = () => {
        navigation.navigate("SeeYourAnnouncements");   
    }

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
        <NavBar text="Gasire de coechipieri" />
        <View style={styles.buttons}>
            <Button bgColor="white" text="Adauga un anunt" onPress={onAddAnnouncementPressed}/>
            <Button bgColor="white" text="Vezi anunturile tale" marginLeft={50} onPress={onSeeYourAnnouncementsPressed} ></Button>
        </View>
        <SeeAnnouncements />
        </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingTop: 20,
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        alignContent: "space-between"
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    
});
export default FindTeamMates;