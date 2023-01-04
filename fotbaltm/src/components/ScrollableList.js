import React, { useState, useEffect } from 'react';
import { View, Image,Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CheckBox from '@react-native-community/checkbox';
import Button from "../components/Button";
import storage from '@react-native-firebase/storage';




const List = () => {
  const [items, setItems] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const onBookPressed = () => {
    console.warn("book field");
}

  useEffect(() => {
    firestore()
      .collection('fields')
      .onSnapshot(snapshot => {
        let items = snapshot.docs.map(doc => doc.data());

        // luam si id-urile field-urilor si le adaugam in array
        const items_ids = snapshot.docs.map(doc => doc.id);
        let counter = 0;
        items.forEach( (it) => {
          it.id = items_ids[counter];
          counter++;
        })
        counter = 0;
        
        setItems(items);
      });
     // storage().ref(imageUrl).getDownloadURL().then( (url) => { setImageSource(url) })

  }, []);

  const toggleExpand = id => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <ScrollView>
      {items.map(item => (
        <TouchableOpacity key={item.id} style={styles.item} onPress={() => toggleExpand(item.id)}>
          <Text style={styles.itemTitle}>{item.nume}</Text>
          {expanded === item.id && (
            <View style={styles.expandedContainer}>
              <Text style={styles.label}>{item.adresa}</Text>
              <Text style={styles.label}>{item.numar}</Text>
              <Text style={styles.label}>{item.pret} lei/ora</Text>
              <View style={styles.container}>
              <View style={styles.checkboxContainer}>
                <Text style={styles.label}>Acoperit:</Text>
                <CheckBox value={item.acoperit}/>
              </View> 
              <Button text="Rezerva terenul" onPress={onBookPressed} bgColor='white' />
              <View style={styles.imageView}>
                <Image style={styles.image} source={{uri: item.imagine}} />
              </View>
    </View>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    borderColor: '#777777',
    borderWidth: 1,
    borderRadius: 1,
    borderRadius: 4,

    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 40,
    paddingRight: 60,

    marginTop: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemTitle: {
    fontSize: 20,
    alignSelf: "center",
    color: "black"
  },
  expandedContainer: {
    
  },

  container: {
    flex: 1,
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 1,
    padding: 1.5,
    color: "black",
    fontSize: 16
  },
  imageView: {
    paddingLeft: 10,
    paddingBottom: 10
},
image: {
    width: 200,
    height: 200,
    padding: 10
}

});

export default List;
