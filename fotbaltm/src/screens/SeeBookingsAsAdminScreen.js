import React, {useState, useEffect} from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView} from "react-native";
import NavBar from "../components/NavBar";
import SeeBookingsAsAdmin from "../components/SeeBookingsAsAdmin";

function SeeBookingsAsAdminScreen() {
    return(
        <View>
            <NavBar text="Rezervarile pe terenul tau" goBack={true} navigateScreen='HomeOwner'/>
            <SeeBookingsAsAdmin />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default SeeBookingsAsAdminScreen;