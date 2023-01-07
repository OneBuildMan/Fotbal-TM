import React, {useState, useEffect} from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, Pressable, Alert} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import deleteLogo from '../../assets/images/deleteLogo.png';
import {useNavigation} from '@react-navigation/native';

function SeeBookingsAsAdmin() {
    const navigation = useNavigation();
    const {height} = useWindowDimensions();
    const [bookings, setBookings] = useState([]);
    const [haveCancelled, setHaveCancelled] = useState();

    useEffect( () => {
        const fetchData = () => {
            firestore().collection("fields").where("owner_id", "==", auth().currentUser.uid).get().then( (fieldQuery) => {
                const field = fieldQuery.docs[0];
                const fieldRefFirestore = firestore().collection("fields").doc(field.id);
                const bookingRefFirestore = fieldRefFirestore.collection("bookings");

                if(bookingRefFirestore) {
                    bookingRefFirestore.onSnapshot( (snapshot) => {
                        if(snapshot) {
                            let items = snapshot.docs.map(doc => doc.data());
                            let items_ids = snapshot.docs.map(doc => doc.id);
                            let counter = 0;
                            if(items) {
                            items.forEach( (it) => {
                                it.id = items_ids[counter];
                                counter++;
                            })}
                            setBookings(items);
                        }
                      })
                    }
            })
        }
    
            fetchData();
    }, [])


    const toggleExpand = id => {
        setExpanded(expanded === id ? null : id);
    };


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
            {bookings.map(item => (

                <View style={styles.item} key={item.id}>
                    <Text style={styles.text}> {item.day}/2023 ora {item.hour}:00 {item.field} </Text>
                    <Pressable style={styles.button} onPress={ () => onDeleteBookingPressed(item.id, item.fieldId)}>
                        <Image style={[styles.delete, {height: height * 0.04}]} source={deleteLogo}/>
                    </Pressable>
                </View>
            ))}
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

export default SeeBookingsAsAdmin;