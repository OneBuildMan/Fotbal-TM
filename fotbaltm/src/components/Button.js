import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

function Button({text, onPress}) {
    return(
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '30%',
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: "center",
        borderColor: '#777777',
        borderWidth: 1,
        borderRadius: 1
    },
    text: {
        alignSelf: "center"
    }
})
export default Button;