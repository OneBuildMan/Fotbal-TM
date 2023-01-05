import React, {useState, useEffect} from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity} from "react-native";
import NavBar from "../components/NavBar";
import SeeYourAnnouncements from "../components/SeeYourAnnouncements";

function SeeYourAnnouncementsScreen() {
    return(
        <View>
            <NavBar text="Anunturile tale" goBack={true} navigateScreen="FindTeamMates"/>
            <SeeYourAnnouncements />
        </View>
    );
}

export default SeeYourAnnouncementsScreen;