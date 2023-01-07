import React, {useState, useEffect} from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView, Alert} from "react-native";
import NavBar from "../components/NavBar";
import AddAnnouncement from "../components/AddAnnouncement";

function AddAnnouncementScreen() {
    return(
        <View style={styles.root}>
            <NavBar text="Adauga un anunt" goBack={true} navigateScreen="FindTeamMates"/>
            <AddAnnouncement />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        paddingTop: 20
    },
})

export default AddAnnouncementScreen;