import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Pressable, Image, Alert} from 'react-native';
import deleteLogo from '../../assets/images/deleteLogo.png';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

function SeeYourAnnouncements() {
    const [yourAnnouncements, setYourAnnouncements] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const {height} = useWindowDimensions();

    useEffect( () => {
        firestore().collection('announcements').where('creator_id', '==', auth().currentUser.uid).onSnapshot( snapshot => {
            if(snapshot) {
            let items = snapshot.docs.map(doc => doc.data());
            const items_ids = snapshot.docs.map(doc => doc.id);
            let counter = 0;
            items.forEach( (it) => {
                it.id = items_ids[counter];
                counter++;
            })
            counter = 0;
            
            setYourAnnouncements(items);
            }
        })
    }, []);
    const toggleExpand = id => {
        setExpanded(expanded === id ? null : id);
    };

    const onDeleteAnnouncement = (id) => {
        Alert.alert('Esti sigur ca vrei sa stergi anuntul ?', 
        '',
        [
            {
                text: "Da",
                onPress: () => {
                    firestore().collection('announcements').doc(id).delete()
                    .then(() => Alert.alert('Anunt sters cu succes'))
                    .catch((err) => {
                        Alert.alert('A aparut o eroare');
                        console.log(err);
                    })
                }
            },
            {
                text: "Nu",
                onPress: () => console.log('Actiunea de sterge anuntul a fost anulata')
            }
        ]);
    }
                           
    return(
        <ScrollView style={styles.container}>
            {yourAnnouncements.map(item => (
                <TouchableOpacity key={item.id} style={styles.item} onPress={() => toggleExpand(item.id)}>
                    <View style={styles.title}>
                    <Text style={styles.itemTitle}>{item.date} ora {item.time} </Text>
                    <Pressable style={styles.button} onPress={ () => onDeleteAnnouncement(item.id)}>
                        <Image style={[styles.delete, {height: height * 0.05}]} source={deleteLogo}/>
                    </Pressable>
                    </View>
                    {expanded === item.id && (
                        <View style={styles.details}>
                            <Text style={styles.label}>{item.field}</Text>
                            <Text style={styles.label}>{item.occupiedPlaces}/12 locuri ocupate</Text>
                        </View>
                    )}
                </TouchableOpacity>      
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        alignSelf: "center"
    },
    item:{
        borderColor: '#777777',
        borderWidth: 1,
        borderRadius: 1,
        borderRadius: 4,

        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 60,
        paddingRight: 60,
    
        marginTop: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        display: "flex",
        flexDirection: "row",
        alignContent: "space-between"
    },
    itemTitle: {
        fontSize: 20,
        alignSelf: "center",
        color: "black",
    },
    label: {
        margin: 1,
        padding: 1.5,
        paddingTop: 6,
        color: "black",
        fontSize: 16
    },
    button: {
        marginLeft: 10
    },
    delete: {
        maxWidth: 25,
        maxHeight: 32
    }
})
export default SeeYourAnnouncements;