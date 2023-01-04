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
        const items = snapshot.docs.map(doc => doc.data());
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
              <Text>{item.adresa}</Text>
              <Text>{item.numar}</Text>
              <Text>{item.pret}</Text>
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
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemTitle: {
    fontSize: 32,
  },
  expandedContainer: {
    padding: 20,
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
