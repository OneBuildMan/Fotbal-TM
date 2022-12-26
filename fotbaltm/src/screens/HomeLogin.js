import React, {useState} from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView} from "react-native";
import Logo from '../../assets/images/logo.jpg';
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";
import AppLogin from "../components/AppLogin";
import { OWNER_ROLE, PLAYER_ROLE } from "../const";
function HomeLogin() {

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    

    //buttons, input boxes
    const [email, setEmail] = useState(''); 
    const [password,setPassword] = useState('');
    const onSignInPressed = () => {

        auth().signInWithEmailAndPassword(email,password)
        .then(async ()=>{
            console.log('Te-ai autentificat!');
            const userLoggedIn = await firestore().collection("users").doc(auth().currentUser.uid).get();
            const role = userLoggedIn.get("role");
            if(role === OWNER_ROLE) {
                navigation.navigate('HomeOwner');
            }
            if(role === PLAYER_ROLE) {
                navigation.navigate('Home');
            }
        })
        .catch(error => {
            if(error.code === 'auth/invalid-email') {
                console.log('Email invalid');
            }

            if(error.code === 'auth/auth/wrong-password') {
                console.log('Parola gresita');
            }

            alert(error.message);
        });
    }

    const onNoAccountPressed = () => {
        console.warn("No Account");
        navigation.navigate('Register');
    }
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Image 
            source={Logo} 
            style={[styles.logo, {height: height * 0.2}]} 
            resizeMode="contain"
            />
            <AppLogin/>
            <InputBox placeholder="Email" value={email} setValue={setEmail} />
            <InputBox placeholder="Parola" value={password} setValue={setPassword} secureTextEntry />
            <Button text="Intra in cont" onPress={onSignInPressed} />
            <Button text="Nu ai cont? Inregistreaza-te" onPress={onNoAccountPressed} bgColor='white' />
        </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    
});
export default HomeLogin;