import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import AddField from './AddField';

function FieldDetailsOwner() {
    const [field, setField] = useState();
    if(!field) {
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
            <Text> Terenul exista, aici sunt detaliile </Text>
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