import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AddField from './AddField';

function FieldDetailsOwner() {
    const [field, setField] = useState();
    if(!field) {
        return(
            <View>
                <Text> Terenul nu exista, adauga un teren </Text>
                <AddField />
            </View>
        );
    }
    return(
        <View>
            <Text> Terenul exista, aici sunt detaliile </Text>
        </View>
    );
}

export default FieldDetailsOwner;