import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import LoadingImage from '../LoadingImage';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const BigCard = ({ item, cardStyle}) => {

    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("NearByScreen", {
            item:item
        })}
            style={cardStyle}
        >
            <LoadingImage style={{ width: "100%", height: "100%" }} imageURL={item.imageURL}/>
        </TouchableWithoutFeedback>
    )
}

export default BigCard