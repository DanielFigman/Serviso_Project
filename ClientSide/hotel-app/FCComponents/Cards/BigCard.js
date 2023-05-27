import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import LoadingImage from '../LoadingImage';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const BigCard = ({ item, cardStyle, id }) => {

    const navigation = useNavigation();
    
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("CardScreen", {
            id,
            name: item.name,
            description: item.description,
            openingHours: item.openingHours,
            imageURL: item.imageURL,
            price: item.price,
            rating: item.rating,
            hallNum: item.HallNum,
            address: item.address,
        })}
            style={cardStyle}
        >
            <LoadingImage style={{ width: "100%", height: "100%" }} imageURL={item.imageURL}/>
        </TouchableWithoutFeedback>
    )
}

export default BigCard