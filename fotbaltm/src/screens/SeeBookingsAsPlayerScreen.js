import React, {useState, useEffect} from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView} from "react-native";
import NavBar from "../components/NavBar";
import SeeBookingsAsPlayer from "../components/SeeBookingsAsPlayer";

function SeeBookingsAsPlayerScreen() {
    return(
        <View>
            <NavBar text="Rezervarile tale" goBack={true} navigateScreen='BookField'/>
            <SeeBookingsAsPlayer />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default SeeBookingsAsPlayerScreen;