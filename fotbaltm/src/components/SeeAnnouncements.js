import React, {useState, useEffect} from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity} from "react-native";
import Button from "./Button";

function SeeAnnouncements() {
    const announcements = [{id:"2144", date: "05.06", time: "20:00", field: "Friends Arena", occupiedPlaces: 10},
                           {id:"2134" ,date: "06.06", time: "18:00", field:"Banu Sport", occupiedPlaces: 8}]       // de forma
    const [expanded, setExpanded] = useState(null);

    const toggleExpand = id => {
        setExpanded(expanded === id ? null : id);
      };

    const onJoinAnnouncementPressed = () => {
        // locurile ocupate vor fi incrementate cu 1 si salvate in database. Daca se ajunge la 12 locuri ocupate, anuntul nu 
        // va mai aparea in aceasta lista.
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
                            <Button text="Alatura-te" bgColor="white" width="60%" onPress={onJoinAnnouncementPressed}></Button>
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