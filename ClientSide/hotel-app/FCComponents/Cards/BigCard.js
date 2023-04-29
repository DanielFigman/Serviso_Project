import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const BigCard = ({item, cardStyle}) => {
    return (
        <TouchableOpacity
            style={cardStyle}
        >
            <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.imageUrl }} />
        </TouchableOpacity>
    )
}

export default BigCard