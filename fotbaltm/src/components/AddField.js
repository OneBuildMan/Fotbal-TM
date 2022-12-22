import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputBox from './InputBox';
import CheckBox from '@react-native-community/checkbox';

function AddField() {
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [number, setNumber] = useState();
    const [price, setPrice] = useState();
    const [covered, setCovered] = useState();
    return(
        <View> 
            <View style={styles.container}>
                <InputBox placeholder="Nume" value={name} setValue={setName} />
                <InputBox placeholder="Adresa" value={address} setValue={setAddress} />
                <InputBox placeholder="Numar de contact" value={number} setValue={setNumber} keyboardType='numeric' />
                <InputBox placeholder="Pret / ora" value={price} setValue={setPrice} keyboardType='numeric'/>
                <View style={styles.covered}>
                <CheckBox style={styles.checkbox} disabled={false} value={covered} />
                <Text style={styles.label}>Balon pus</Text>
                </View>
            </View>
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
    },
    covered:{
        alignContent: "center",
        alignSelf: "center",
        flexDirection: "row",
        width: "50%"
    },
    checkbox: {
        alignSelf: "center"
    },
    label: {
        margin: 8,
        color: "black"
    }
});
export default AddField;