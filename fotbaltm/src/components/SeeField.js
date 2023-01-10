import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image,Modal, Alert, useWindowDimensions, TouchableOpacity} from 'react-native';
import Button from './Button';
import CheckBox from '@react-native-community/checkbox';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Edit from '../../assets/images/editField.png';
import auth from '@react-native-firebase/auth';
import InputBox from "../components/InputBox";

function SeeField({ field,fieldId }) {
    // detaliile din field-urile de Text urmeaza a fi luate din terenul trimis ca props
    const name = field.get("nume");
    const address = field.get("adresa");
    number = field.get("numar");
    price = field.get("pret");
    const covered = field.get("acoperit");
    const imageUrl = field.get("imagine");

    const {height} = useWindowDimensions();

    const [imageSource, setImageSource] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);

    [price, setPrice] = useState('');
    [price2, setPrice2] = useState('');
    price = field.get("pret");

    const navigation = useNavigation();

    [number, setNumber] = useState('');
    [number2, setNumber2] = useState('');
    number = field.get("numar");
    
    useEffect( () => {
        storage().ref(imageUrl).getDownloadURL().then( (url) => { setImageSource(url) })
    }, []);

    const onEditPressPrice = () => {
        setIsModalVisible(false);
        Alert.alert(
            `Schimbi pretul la ${price2}?`,
            '',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                    const collectionRef = firestore().collection('fields');
                collectionRef.doc(field.id).update({ pret: price2 });
                setPrice(price2);
                  },
              },
            ],
            { cancelable: false }
          );
    }

    const onEditPressNumber = () => {
        setIsModalVisible1(false);
        Alert.alert(
            `Schimbi numarul la ${number2}?`,
            '',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                    const collectionRef = firestore().collection('fields');
                collectionRef.doc(field.id).update({ numar: number2 });
                setNumber(number2);
                  },
              },
            ],
            { cancelable: false }
          );
    }
    
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

    const onSeeBooksPressed = () => {
        navigation.navigate('SeeBookingsAsAdmin');
    }

    return(
        <View>
            <View style={styles.container}>
            <Text style={styles.text}> {name} </Text>
            
            
                     
            <Text style={styles.text}> {address} </Text>
            <View style={styles.cutie}>
                <Text style={styles.text}> {number} </Text>
                <TouchableOpacity onPress={() => setIsModalVisible1(true)}>  
                    <Image style={[styles.edit, {height: height * 0.05}]} source={Edit} />
                    <Modal animationType="slide" transparent={false} visible={isModalVisible1}>
                        <InputBox style={styles.inputbox} placeholder="Numar"  setValue={setNumber2}/>
                        <Button text="Schimba numarul" bgColor="white" width="40%" onPress={ onEditPressNumber}/>
                        <Button text="Mergi inapoi" bgColor="white" width="40%" onPress={() => setIsModalVisible1(false)}/>
                    </Modal>
                </TouchableOpacity>
                </View>
            <View style={styles.cutie}>
                <Text style={styles.text}> {price} lei/ora </Text>
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>  
                    <Image style={[styles.edit, {height: height * 0.05}]} source={Edit} />
                    <Modal animationType="slide" transparent={false} visible={isModalVisible}>
                        <InputBox style={styles.inputbox} placeholder="Pret"  setValue={setPrice2}/>
                        <Button text="Schimba pretul" bgColor="white" width="40%" onPress={ onEditPressPrice}/>
                        <Button text="Mergi inapoi" bgColor="white" width="40%" onPress={() => setIsModalVisible(false)}/>
                    </Modal>
                </TouchableOpacity>
            </View>
                <View style={styles.covered}>               
                <Text style={styles.text}>Acoperit</Text>
                <CheckBox style={styles.checkbox} disabled={false} value={covered} />
                </View>
            <View style={styles.imageView}>
            <Image style={styles.image} source={{uri: imageSource}} />
            </View>
            </View>

            <View style={styles.buttons}>
            <Button text="Sterge terenul" bgColor='white'  width='58%' onPress={onDeleteFieldPressed} />
            <Button text="Editeaza informatiile terenului" bgColor='white' width='58%' onPress={onEditFieldPressed} />
            <Button text="Vezi rezervari" bgColor='white' width='58%' onPress={onSeeBooksPressed} />
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
        flexDirection: 'column',
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
    },
    edit: {
        maxWidth: 30,
        maxHeight: 20
    },
    cutie: {
        display: "flex",
        flexDirection: "row",
    },
    inputbox: {
        padding:20
    }
})