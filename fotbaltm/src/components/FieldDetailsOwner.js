import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import AddField from './AddField';
import SeeField from './SeeField';

function FieldDetailsOwner() {
    const [field, setField] = useState();   
    if(!field) {     // daca proprietarul nu are deja un teren creeat, ii va aparea formularul sa creeze terenul. In caz contrar, vor aparea detaliile terenului.
        return(
            <View>
                <NavBar text="Detalii teren"/>
                <Text style={styles.text}> Nu ai un teren existent, creeaza unul completand formularul de mai jos: </Text>
                <AddField />
            </View>
        );
    }
    return(
        <View>
            <NavBar text="Detalii teren"/>
            <Text> Terenul exista, aici sunt detaliile </Text>
            <SeeField />
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "black",
        fontSize: 16,
        alignSelf: "center",
        margin: 8
    }
});
export default FieldDetailsOwner;