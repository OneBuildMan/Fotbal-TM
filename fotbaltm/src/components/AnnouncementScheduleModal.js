import React, {useState, useEffect} from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView, Alert, Modal, Pressable, TouchableOpacity} from "react-native";
import Button from "./Button";
import goBackArrow from '../../assets/images/goBack.png';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

function AnnouncementScheduleModal({field, occupiedPlaces}) {
    const {height} = useWindowDimensions();

    let currentDay = new Date().getDate();
    let currentMonth = new Date().getMonth() + 1;
    if( currentMonth < 10 ) {
      currentMonth = '0' + currentMonth;
    }
    let daysOfWeek = [ ];
    for(i=0; i<7; i++) {
      let day = currentDay+i;
      if( day < 10 ) {
        day = '0' + day;
      }
      daysOfWeek[i] = day + '/' + currentMonth;
    }
    const startTime = 16;
    const endTime = 23;
    const [selectedHour, setSelectedHour] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [expandedDay, setExpandedDay] = useState(null);
    const [selectionSaved, setSelectionSaved] = useState(false);

    const handleDayPress = (day) => {
        if (expandedDay === day) {
          setExpandedDay(null);
        } else {
          setExpandedDay(day);
        }
      };
    
    const handleHourPress = (day, hour) => {
        // Prompt the user if they want to book the selected hour
        Alert.alert(
          ` Alegi ora ${hour}:00 in data de ${day} ?`,
          '',
          [
            {
              text: 'Anuleaza',
              style: 'cancel',
            },
            {
              text: 'Da',
              onPress: () => {
                setSelectedHour(hour);
                setSelectedDay(day);
              },
            },
          ],
          { cancelable: false }
        );
      };

    const onSaveDateAndTimePressed = () => {
        if(selectedDay != '' && selectedHour!= ''){
            Alert.alert(`Esti sigur ca vrei sa alegi ora ${selectedHour}:00 in data de ${selectedDay} ?`,
            '',
            [
              {
                text: 'Nu',
                style: 'cancel',
              },
              {
                text: 'Da',
                onPress: () => {
                    setSelectionSaved(true);
                    setIsModalVisible(false);
                }
              }
            ]);
            }else{
              Alert.alert('Nu ai selectat un interval, mai incearca');
            }
    }

    const onSaveAnnouncementPressed = () => {
        firestore().collection("announcements").doc().set({
            date: selectedDay,
            time: selectedHour,
            field: field,
            occupiedPlaces: occupiedPlaces,
            creator_id: auth().currentUser.uid
        })
        .then( () => {
            setSelectionSaved(false);
            Alert.alert('Anunt publicat cu succes!');
        }).catch( (err) => {
            Alert.alert('A aparut o eroare');
        })
    }

    const renderWeekSchedule = () => (
        <View>
          {daysOfWeek.map((day) => (
            <View key={day} style={styles.dayContainer}>
              <TouchableOpacity onPress={() => handleDayPress(day)}>
                <Text style={styles.dayText}>
                  {day}
                </Text>
              </TouchableOpacity>
              {expandedDay === day && (
                <View>
                  {Array.from(
                    Array(endTime - startTime + 1),
                    (_, i) => i + startTime
                  ).map((hour) => (
                    <TouchableOpacity
                      key={hour}
                      onPress={() => handleHourPress(day, hour)}
                      disabled={selectedHour === hour}>
                      <Text style={[styles.hourText, selectedHour === hour && selectedDay === day && styles.selectedHourText,]}>
                        {hour}:00
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            )}
          </View>
        ))}
      </View>
    );


    return(
        <ScrollView>
            <Button text="Alege data si ora" bgColor="white" onPress={() => setIsModalVisible(true)}/>

            <Modal visible={isModalVisible}>
                <View style={styles.buttonsView}>
                <Pressable  onPress={() => setIsModalVisible(false)}>
                    <Image style={[styles.goBack, {height: height * 0.05}]} source={goBackArrow} />
                </Pressable>
                <Button text="Salveaza data si ora" bgColor="white" marginLeft={20} onPress={onSaveDateAndTimePressed} />
                </View>
            {renderWeekSchedule()}
            </Modal>

            {selectionSaved && (
                <Text style={styles.selection}> Selectia ta: {selectedDay} ora {selectedHour}:00 </Text>
            )}
            <Button text="Publica anuntul" bgColor="white" onPress={onSaveAnnouncementPressed}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    dayContainer: {
        marginTop: 20,
        alignSelf: "center",
      },
      dayText: {
        fontWeight: 'bold',
        marginBottom: 10,
        color:'black',
        fontSize: 22
      },
      hourText: {
        fontSize: 16,
        alignSelf: "center",
      },
      selectedHourText: {
        color: 'red',
      },
    goBack: {
        maxWidth: 25,
        maxHeight: 32,
        marginTop: 25
    },
    buttonsView: {
        alignSelf: "center",
        display: "flex",
        flexDirection: "row"
    },
    selection: {
        marginTop: 5,
        alignSelf: "center",
        color: "black",
        fontSize: 16
    }
});

export default AnnouncementScheduleModal;