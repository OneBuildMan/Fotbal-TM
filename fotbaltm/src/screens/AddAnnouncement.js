import React, {useState} from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView} from "react-native";
import NavBar from "../components/NavBar";

function AddAnnouncement() {
    return(
        <View>
            <NavBar text="Adauga un anunt"/>
            <View style={styles.container}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 40,
        marginRight: 40,
        paddingTop: 40,

        alignContent: "center",
        borderColor: '#777777',
        borderWidth: 1,
        borderRadius: 5
    }
});
export default AddAnnouncement;