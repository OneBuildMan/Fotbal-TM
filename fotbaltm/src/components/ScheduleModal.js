import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert, ScrollView } from 'react-native';
import Button from './Button';
import firestore from '@react-native-firebase/firestore';

const WeekSchedule = () => {
    const daysOfWeek = [    'Luni',    'Marti',    'Miercuri',    'Joi',    'Vineri',    'Sambadejaneiro',    'Duminica',  ];
    const startTime = 15;
    const endTime = 23;
    const [selectedHours, setSelectedHours] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [expandedDay, setExpandedDay] = useState(null);
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
        `Book ${hour}:00 on ${day}?`,
        '',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              setSelectedHours({
                ...selectedHours,
                [day]: [...(selectedHours[day] || []), hour],
              });
            },
          },
        ],
        { cancelable: false }
      );
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
                {Array.from(
                  Array(endTime - startTime + 1),
                  (_, i) => i + startTime
                ).map((hour) => (
                  <TouchableOpacity
                    key={hour}
                    onPress={() => handleHourPress(day, hour)}
                    disabled={(selectedHours[day] || []).includes(hour)}>
                    <Text style={[styles.hourText, (selectedHours[day] || []).includes(hour) && styles.selectedHourText,]}>
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
        {renderWeekSchedule()}
          <Button text="Mergi inapoi" bgColor="white" width="40%" onPress={() => setIsModalVisible(false)}/>
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
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color:'black',
      fontSize: 25
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
        fontSize: 25
    }
  };

export default WeekSchedule;
