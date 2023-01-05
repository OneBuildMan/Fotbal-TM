import React, {useState, useEffect} from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity} from "react-native";
import NavBar from "../components/NavBar";

function SeeYourAnnouncements() {
    return(
        <View>
            <NavBar text="Anunturile tale" goBack={true} navigateScreen="FindTeamMates"/>
            <Text> Aici sunt anunturile tale </Text>
        </View>
    );
}

export default SeeYourAnnouncements;