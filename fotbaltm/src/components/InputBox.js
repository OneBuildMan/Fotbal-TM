import React from "react";
import { View, TextInput, StyleSheet } from 'react-native';

function InputBox( { value, setValue, placeholder, secureTextEntry, keyboardType }) {
    return(
        <View style={styles.container}>
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            style={styles.input}
            placeholderTextColor="#A0A0A0"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '50%',
        marginBottom: 20,
        alignSelf: "center",

        borderColor: '#777777',
        borderWidth: 1,
        borderRadius: 1,

    },
    input: {
        color: "black"
    },
});
export default InputBox;