import React, { useState } from "react";
import { Text, View, StyleSheet,ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import InputBox from "../components/InputBox";
import Button from "../components/Button";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState();

    const navigation = useNavigation();

    const onLoginPressed = () => {
        console.warn("Login");
        //validate user

        navigation.navigate('HomeLogin');
    }

    const onRegisterPressed = () => {
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then( () => {
            console.warn("Utilizator creat");
            firestore().collection("users").doc(auth().currentUser.uid).set({
                uid: auth().currentUser.uid,
                name: name,
                role: role,
                email: email,
                number: number
            });

            navigation.navigate('HomeLogin'); // doar sa fiu sigur ca functioneaza navigate cum trebuie
        })
        .catch(error => {
            alert(error.message);
        })
    }

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View >
            <Text style={styles.text}> Fotbal TM </Text>

            <View style={styles.container}>
            <InputBox placeholder="Nume" value={name} setValue={setName} />
            <InputBox placeholder="Email" value={email} setValue={setEmail} />
            <InputBox placeholder="Numar de telefon" value={number} setValue={setNumber} />
            <InputBox placeholder="Parola" value={password} setValue={setPassword} secureTextEntry />

            <View style={styles.role}>
            <Picker
            selectedValue={role}
            onValueChange={(itemValue, itemIndex) => 
                setRole(itemValue)
            }>
                <Picker.Item style={{fontSize: 14}} label="Proprietar teren" value="proprietar" />
                <Picker.Item style={{fontSize: 14}} label="Jucator" value="jucator" />

            </Picker>
            </View>

            </View>

            <Button text="Creeaza contul" onPress={onRegisterPressed}/>
            <Button text="Login" onPress={onLoginPressed} bgColor='white'/>
        </View>
        </ScrollView>
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
    text: {
        marginTop: 60,
        alignSelf: "center",
        fontSize: 18,
        color: 'black'
    },
    role: {
        width: '55%',
        marginBottom: 20,
        alignSelf: "center",

        borderColor: '#777777',
        borderWidth: 1,
        borderRadius: 1,
    }
});

export default Register;