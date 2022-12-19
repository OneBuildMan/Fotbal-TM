import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

function Button({text, onPress, bgColor, fgColor}) { //la buton poti scrie  bgColor='white' direct in el,
    return(                                          //sau poti sa lasi gol
        <Pressable onPress={onPress} style={[styles.container, bgColor ? {backgroundColor:bgColor}:{}]}>
            <Text style={[styles.text, fgColor ? {color: fgColor} : {}]}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '40%',
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: "center",
        borderColor: '#777777',
        borderWidth: 1,
        borderRadius: 1,
        backgroundColor: '#4dff4d',
        borderRadius: 4,
    },
    text: {
        alignSelf: "center",
        textAlign: 'center',
        fontWeight: 'bold',
    }
})
export default Button;