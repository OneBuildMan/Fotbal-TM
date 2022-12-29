import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import AddField from './AddField';
import SeeField from './SeeField';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function FieldDetailsOwner() {
    const [field, setField] = useState();   

    useEffect(  () => {
            firestore().collection("fields").where('owner_id', '==', auth().currentUser.uid).get().then( (fieldQuery) => {
                const fieldData = fieldQuery.docs[0];
                setField(fieldData);
            } );
    }, []);

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
            <SeeField field={field}  />
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