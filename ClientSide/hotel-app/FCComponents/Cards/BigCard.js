import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const BigCard = ({item, cardStyle, id}) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={()=> navigation.navigate("CardScreen",{
            id,
            name: item.name,
            description: item.description,
            openingHours: item.openingHours,
            imageURL: item.imageURL,
            price: item.price,
            rating: item.rating,
            hallNum: item.HallNum,
            address:item.address,
        })}
            style={cardStyle}
        >
            <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.imageURL }} />
        </TouchableOpacity>
    )
}

export default BigCard