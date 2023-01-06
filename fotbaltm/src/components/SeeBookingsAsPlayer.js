import React, {useState, useEffect} from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, Pressable, Alert} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import deleteLogo from '../../assets/images/deleteLogo.png';
import {useNavigation} from '@react-navigation/native';

function SeeBookingsAsPlayer() {
    const navigation = useNavigation();
    const {height} = useWindowDimensions();
    const [bookings, setBookings] = useState([]);
    const [haveCancelled, setHaveCancelled] = useState();

    useEffect(() => {

        const fetchData = () => {
        let bookingsArray = [];

        firestore().collection("fields").get().then( (fieldQuery) => {
            if(fieldQuery) {
            const fields = fieldQuery.docs;
            const fieldsLength = fields.length;
            let counterFields = 0;
            fields.forEach( (field) => {
                if(field){
                const fieldRefFirestore = firestore().collection("fields").doc(field.id); 
                const bookingRefFirestore = fieldRefFirestore.collection("bookings");
                const fieldName = field.get("nume");
                const fieldId = field.id;

                if(bookingRefFirestore) {
                bookingRefFirestore.where("player_id", "==", auth().currentUser.uid).onSnapshot( (snapshot) => {
                    if(snapshot) {
                        let items = snapshot.docs.map(doc => doc.data());
                        let items_ids = snapshot.docs.map(doc => doc.id);
                        let counter = 0;
                        if(items) {
                        items.forEach( (it) => {
                            it.id = items_ids[counter];
                            it.field = fieldName;
                            it.fieldId = fieldId;
                            counter++;
                        })}
                        counter = 0;
                        if(items && bookingsArray) {
                         bookingsArray.push(items);
                        }
                         counterFields++;
                        if(counterFields == fieldsLength) {
                             setBookings(bookingsArray);
                        }
                    }
                  })
                }
        }})
    }});
        }

        fetchData();
    }, []);


    const removeBookingFromArray = () => {

    }

    const onDeleteBookingPressed = (id, fieldId) => {
        const fieldRefFirestore = firestore().collection("fields").doc(fieldId);
        const bookingRefFirestore = fieldRefFirestore.collection("bookings");

        Alert.alert('Esti sigur ca vrei sa anulezi rezervarea ?',
        '',
        [
            {
               text: "Da",
               onPress: () => {
                bookingRefFirestore.doc(id).delete()
                .then( () => 
                    Alert.alert('Rezervarea a fost anulata cu succes') 
                    ).catch( (err) => {
                    Alert.alert('A aparut o eroare');
                    console.log(err);
                })
               }
            },
            {
                text: "Nu",
                onPress: () => console.log('Actiunea de a anula rezervarea a fost anulata')
            }
        ])
    }


    return(
            <View style={styles.container}>
            {bookings.map(book => (
                book.map( item => (
                <View style={styles.item} key={item.id}>
                    <Text style={styles.text}> {item.day}/2023 ora {item.hour}:00 {item.field} </Text>
                    <Pressable style={styles.button} onPress={ () => onDeleteBookingPressed(item.id, item.fieldId)}>
                        <Image style={[styles.delete, {height: height * 0.04}]} source={deleteLogo}/>
                    </Pressable>
                </View>
            ))))}
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        alignSelf: "flex-start",
        marginLeft: 10
    },
    item:{
        borderColor: '#777777',
        borderWidth: 1,
        borderRadius: 1,
        borderRadius: 4,

        paddingTop: 8,
        paddingBottom: 4,
        paddingLeft: 30,
        paddingRight: 45,
    

        marginVertical: 2,
        marginHorizontal: 16,

        display: "flex",
        flexDirection: "row",
        alignContent: "space-between"
    },
    text: {
        fontSize: 15,
        color: "black"
    },
    button: {
        marginLeft: 10
    },
    delete: {
        maxWidth: 25,
        maxHeight: 20
    }
});

export default SeeBookingsAsPlayer;