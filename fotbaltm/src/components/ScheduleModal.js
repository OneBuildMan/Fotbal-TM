import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert, ScrollView, Pressable, useWindowDimensions, Image } from 'react-native';
import Button from './Button';
import goBackArrow from '../../assets/images/goBack.png';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

function ScheduleModal({field}) {
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

    const hoursArray = Array.from(
      Array(endTime - startTime + 1),
      (_, i) => i + startTime
    )

    const [selectedHour, setSelectedHour] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [expandedDay, setExpandedDay] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [hours, setHours] = useState([]);

    // useEffect(() => {
    //     const unsubscribe = firestore()
    //       .collection('hours')
    //       .where('available', '==', true)
    //       .onSnapshot((querySnapshot) => {
    //         const data = querySnapshot.docs.map((doc) => doc.data());
    //         setHours(data);
    //       });
      
    //     return () => unsubscribe();
    //   }, []);


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

    function removeReservedHours(day) {
      let auxHoursArray = hoursArray;
      let finalHoursArray = hoursArray;
      let bookedCounter = 0;
      const bookingsForField = field.bookings;

      bookingsForField.forEach( (item) => {
        const book = Object.values(item);
        if(book[0].day === day) {
          bookedCounter++;
          auxHoursArray.forEach( (hour, index) => {
            if(hour === book[0].hour) {
              delete finalHoursArray[index];
            }
          })
        }

        })

        if(bookedCounter === 0) {
          finalHoursArray = hoursArray;
        }

        // item.forEach( (book) => {
        //   if(book.day === day) {
        //     console.log("ceva");
        //     auxHoursArray.forEach( (hour) => {
        //       if(hour != book.hour) {
        //         finalHoursArray.push(hour);
        //       }
        //     })
        //   }
        // })
        return finalHoursArray;
      }

        

    const onBookFieldPressed = () => {
      const fieldsRefFirestore = firestore().collection("fields").doc(field.id);
      const bookingsRefFirestore = fieldsRefFirestore.collection("bookings");

      if(selectedDay != '' && selectedHour!= ''){
      Alert.alert(`Esti sigur ca vrei sa rezervi terenul la ora ${selectedHour}:00 in data de ${selectedDay} ?`,
      '',
      [
        {
          text: 'Nu',
          style: 'cancel',
        },
        {
          text: 'Da',
          onPress: () => {
            bookingsRefFirestore.doc().set({
              day: selectedDay,
              hour: selectedHour,
              player_id: auth().currentUser.uid
            }).then( () => {
              Alert.alert('Rezervare facuta cu succes!');
              setSelectedDay('');
              setSelectedHour('');
              setIsModalVisible(false);
             }).catch( (err) => {
                Alert.alert('A aparut o eroare');
                console.log(err);
              })
          }
        }
      ]);
      }else{
        Alert.alert('Nu ai selectat un interval, mai incearca');
      }
    };
  
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
                { removeReservedHours(day)
                .map((hour) => (
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


  return (
    <ScrollView>
        <Button text="Alege ora si data rezervarii" bgColor="white" onPress={() => setIsModalVisible(true)}/>
      <Modal visible={isModalVisible}>
      <View style={styles.buttonsView}>
          <Pressable  onPress={() => setIsModalVisible(false)}>
            <Image style={[styles.goBack, {height: height * 0.05}]} source={goBackArrow} />
          </Pressable>
          <Button text="Rezerva terenul" bgColor="white" width="40%" marginLeft={20} onPress={onBookFieldPressed} />
      </View>
        {renderWeekSchedule()}
      </Modal>
    </ScrollView>
  );
};

const styles = {
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
    modalText: {
        margin: 20,
        fontSize: 24
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
    }
  };

export default ScheduleModal;
