import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, useWindowDimensions, Alert } from 'react-native';
import InputBox from './InputBox';
import CheckBox from '@react-native-community/checkbox';
import Button from './Button';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage, { firebase, FirebaseStorageTypes } from '@react-native-firebase/storage';
import logo from '../../assets/images/addimagefield.png';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function AddField() {
    const {height} = useWindowDimensions();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState(0);
    const [price, setPrice] = useState(0);
    const [covered, setCovered] = useState(false);
    const [image, setImage] = useState(null);
    const [filename, setFileName] = useState('');

    const selectImage = () => {
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            saveToPhotos: true
          };

          // TO DO: sa poata adauga si din fisierele telefonului cu launchImageLibrary, functioneaza exact la fel ca si launchCamera.

          launchCamera(options, res => {
            if(res.didCancel) {
                console.log('image picker cancelled');
            }
            else if(res.errorCode) {
                console.log(res.errorMessage);
            }
            else {
                const imagePicked = res.assets[0].uri;
                console.log(imagePicked);
                setImage(imagePicked);

                const uri = imagePicked.substring(imagePicked.lastIndexOf('/') + 1);
                setFileName(uri);
            }
          });
    }

    const onSaveFieldPressed = async () => {
        console.log(image);

        const task = storage()
        .ref(filename)
        .putFile(image);

        try {
            await task;
        } catch(e) {
            console.error(e);
        }

        firestore().collection("fields").doc().set({
            nume: name,
            adresa: address,
            numar: number,
            pret: price,
            acoperit: covered,
            imagine: filename,
            owner_id: auth().currentUser.uid
        });

        Alert.alert(
            'Teren creeat cu succes!'
          );
   
    }
    
    return(
        <View> 
            <View style={styles.container}>
                <InputBox placeholder="Nume" value={name} setValue={setName} />
                <InputBox placeholder="Adresa" value={address} setValue={setAddress} />
                <InputBox placeholder="Numar de contact" value={number} setValue={setNumber} keyboardType='numeric' />
                <InputBox placeholder="Pret / ora" value={price} setValue={setPrice} keyboardType='numeric'/>
                <View style={styles.covered}>
                <CheckBox style={styles.checkbox} disabled={false} value={covered} setValue={setCovered} />
                <Text style={styles.label}>Balon pus</Text>
                </View>

                <Pressable style={styles.covered} onPress={selectImage}>
                    <Image style={[styles.image, {height: height * 0.05}]} source={logo}/>
                    <Text style={styles.label}> Fa poza terenului </Text>   
                </Pressable>

                <Text> {filename} </Text>

            </View>
            <Button text="Salveaza terenul" onPress={onSaveFieldPressed}></Button>
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
        width: "50%",
        marginBottom: 8
    },
    checkbox: {
        alignSelf: "center"
    },
    label: {
        margin: 8,
        color: "black",
    },
    image: {
        maxWidth: 32,
        maxHeight: 32
    }
});
export default AddField;