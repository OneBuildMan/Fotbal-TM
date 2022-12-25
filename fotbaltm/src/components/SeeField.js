import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import CheckBox from '@react-native-community/checkbox';

function SeeField({ field }) {
    // detaliile din field-urile de Text urmeaza a fi luate din terenul trimis ca props
    const covered = false; // va fi luat tot din field

    const onDeleteFieldPressed = () => {

    }

    const onEditFieldPressed = () => {
        // potentiala idee, sa nu mai fie un formular ca pe mock cu toate atributele, ci sa fie o iconita mica de edit
        // in dreptul fiecarui detaliu al terenului, sa apara un pop-up unde sa schimbi respectivul atribut si sa se dea update
        // in firestore doar cu atributul respectiv
    }
    return(
        <View>
            <View style={styles.container}>
            <Text style={styles.text}> Nume </Text>              
            <Text style={styles.text}> Adresa </Text>
            <Text style={styles.text}> Numar </Text>
            <Text style={styles.text}> Pret </Text>

            <View style={styles.covered}>
                <CheckBox style={styles.checkbox} disabled={false} value={covered} />
                <Text style={styles.text}>Balon pus</Text>
            </View>

            <Text style={styles.text}> Imagine placeholder </Text>
            </View>

            <View style={styles.buttons}>
            <Button text="Sterge terenul" bgColor='white' onPress={onDeleteFieldPressed} />
            <Button text="Editeaza informatiile terenului" bgColor='white' width='55%' onPress={onEditFieldPressed} />
            </View>
        </View>
    );
}

export default SeeField;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 40,
        marginRight: 40,
        paddingTop: 10,

        alignContent: "center",
        borderColor: '#777777',
        borderWidth: 1,
        borderRadius: 5,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    text: {
        color: 'black',
        fontSize: 18,
        paddingBottom: 8
    },
    covered:{
        flexDirection: "row",
        width: "50%",
    },
})