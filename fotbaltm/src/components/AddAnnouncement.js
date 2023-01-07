import React, {useState, useEffect} from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView, Alert} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Button from "./Button";
import AnnouncementScheduleModal from "./AnnouncementScheduleModal";
import NumericInput from 'react-native-numeric-input';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function AddAnnouncement() {
    const [date, setDate] = useState('07.01');
    const [time, setTime] = useState('18:00');
    const [occupiedPlaces, setOccupiedPlaces] = useState(0);
    const [selectedField, setSelectedField] = useState('');
    const [fieldNames, setFieldNames] = useState([]);

    useEffect( () => {
        firestore().collection("fields").get().then( (fields) => {
            const fieldNamesArray = [];

            fields.forEach( (instance) => {
                fieldNamesArray.push(instance.get("nume"));
            });

            console.log(fieldNamesArray);
            setFieldNames(fieldNamesArray);
        })
    }, []);

    const onSaveAnnouncementPressed = () => {
        firestore().collection("announcements").doc().set({
            date: date,
            time: time,
            field: selectedField,
            occupiedPlaces: occupiedPlaces,
            creator_id: auth().currentUser.uid
        }).then( () => Alert.alert('Anunt publicat cu succes!')).catch( (err) => { 
            Alert.alert('A aparut o eroare');
            console.log(err);
    });
    }

    return(
        <View>
            <View style={styles.container}>
                <Text style={styles.label}>Alege teren</Text>
                <View style={styles.picker}>
                <Picker
                selectedValue={selectedField}
                onValueChange={(itemValue, itemIndex) => 
                    setSelectedField(itemValue)
                }>
                    { fieldNames.map( (item) => {
                        return(
                            <Picker.Item key={item} style={{fontSize: 14}} label={item} value={item} ></Picker.Item>
                        );
                    })}
                </Picker>
                </View>

                <Text style={styles.label}>Locuri ocupate</Text>
                <View style={styles.places}>
                <NumericInput  minValue={0} maxValue={12} totalHeight={40} totalWidth={200} type='up-down' onChange={value => setOccupiedPlaces(value)} />
                </View>
                <AnnouncementScheduleModal field={selectedField} occupiedPlaces={occupiedPlaces} />
                {/* <Button bgColor="white" text="Publica anuntul" onPress={onSaveAnnouncementPressed}/> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40,
        paddingTop: 40,
        paddingBottom: 20,

        alignContent: "center",
        borderColor: '#777777',
        borderWidth: 1,
        borderRadius: 5
    },
    picker: {
        width: '60%',
        marginBottom: 10,
        alignSelf: "center",

        borderColor: '#777777',
        borderWidth: 1,
        borderRadius: 1,
    },
    label: {
        alignSelf: "center",
        marginBottom: 4,
        color: "black",
        fontSize: 14
    },
    places: {
        alignSelf: "center"
    }
});
export default AddAnnouncement;