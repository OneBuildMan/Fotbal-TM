import React, {useState, useEffect} from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity, Alert} from "react-native";
import Button from "./Button";
import firestore from "@react-native-firebase/firestore";

function SeeAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [expanded, setExpanded] = useState(null);

    useEffect( () => {
        firestore().collection('announcements').onSnapshot(snapshot => {
            if(snapshot) {
            let items = snapshot.docs.map(doc => doc.data());
            const items_ids = snapshot.docs.map(doc => doc.id);
            let counter = 0;
            items.forEach( (it) => {
                it.id = items_ids[counter];
                counter++;
            })
            counter = 0;

            let announcementsNonOccupied = items.filter( it => it.occupiedPlaces<12); // o sa fie aratate doar anunturile care nu sunt deja ocupate
            setAnnouncements(announcementsNonOccupied);
        }
        })
    }, []);

    const toggleExpand = id => {
        setExpanded(expanded === id ? null : id);
      };

    const onJoinAnnouncementPressed = (id, places) => {
        // locurile ocupate vor fi incrementate cu 1 si salvate in database. Daca se ajunge la 12 locuri ocupate, anuntul nu 
        // va mai aparea in aceasta lista.
        const incrementedPlaces = parseInt(places) + 1;
        firestore().collection('announcements').doc(id).update({ occupiedPlaces: incrementedPlaces})
        .then(() =>  Alert.alert('Te-ai alaturat anuntului cu succes'))
        .catch((err) => {
            Alert.alert('A aparut o eroare');
            console.log(err);
        })
    }

    return(
        <ScrollView>
            {announcements.map(item => (
                <TouchableOpacity key={item.id} style={styles.item} onPress={() => toggleExpand(item.id)}>
                    <Text style={styles.itemTitle}>{item.date} ora {item.time}</Text>
                    {expanded === item.id && (
                        <View style={styles.details}>
                            <Text style={styles.label}>{item.field}</Text>
                            <Text style={styles.label}>{item.occupiedPlaces}/12 locuri ocupate</Text>
                            <Button text="Alatura-te" bgColor="white" width="60%" onPress={() => onJoinAnnouncementPressed(item.id, item.occupiedPlaces)}></Button>
                        </View>
                    )}
                </TouchableOpacity>      
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    item:{
        borderColor: '#777777',
        borderWidth: 1,
        borderRadius: 1,
        borderRadius: 4,
    
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 50,
        paddingRight: 50,
    
        marginTop: 10,
        marginVertical: 8,
        marginHorizontal: 16,
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
})
export default SeeAnnouncements;