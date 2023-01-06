import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import Button from './Button';
import CheckBox from '@react-native-community/checkbox';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

function SeeField({ field,fieldId }) {
    // detaliile din field-urile de Text urmeaza a fi luate din terenul trimis ca props
    const name = field.get("nume");
    const address = field.get("adresa");
    const number = field.get("numar");
    const price = field.get("pret");
    const covered = field.get("acoperit");
    const imageUrl = field.get("imagine");

    const [imageSource, setImageSource] = useState();

    useEffect( () => {
        storage().ref(imageUrl).getDownloadURL().then( (url) => { setImageSource(url) })
    }, []);

    const onDeleteFieldPressed = () => {
        Alert.alert('Esti sigur ca vrei sa stergi terenul ?', 
        '',
        [
            {
                text: "Da",
                onPress: () => {
                    firestore().collection('fields').doc(fieldId).delete()
                    .then(() => Alert.alert('Teren sters cu succes'))
                    .catch((err) => {
                        Alert.alert('A aparut o eroare');
                        console.log(err);
                    })
                }
            },
            {
                text: "Nu",
                onPress: () => console.log('Actiunea de sterge terenul a fost anulata')
            }
        ]);
    }

    const onEditFieldPressed = () => {
        // potentiala idee, sa nu mai fie un formular ca pe mock cu toate atributele, ci sa fie o iconita mica de edit
        // in dreptul fiecarui detaliu al terenului, sa apara un pop-up unde sa schimbi respectivul atribut si sa se dea update
        // in firestore doar cu atributul respectiv
    }
    return(
        <View>
            <View style={styles.container}>
            <Text style={styles.text}> {name} </Text>              
            <Text style={styles.text}> {address} </Text>
            <Text style={styles.text}> {number} </Text>
            <Text style={styles.text}> {price} lei/ora </Text>

            <View style={styles.covered}>
                <CheckBox style={styles.checkbox} disabled={false} value={covered} />
                <Text style={styles.text}>Acoperit</Text>
            </View>
            <View style={styles.imageView}>
            <Image style={styles.image} source={{uri: imageSource}} />
            </View>
            </View>

            <View style={styles.buttons}>
            <Button text="Sterge terenul" bgColor='white' onPress={onDeleteFieldPressed} />
            <Button text="Editeaza informatiile terenului" bgColor='white' width='58%' onPress={onEditFieldPressed} />
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
    imageView: {
        paddingLeft: 10,
        paddingBottom: 10
    },
    image: {
        width: 200,
        height: 200,
        padding: 10
    }
})