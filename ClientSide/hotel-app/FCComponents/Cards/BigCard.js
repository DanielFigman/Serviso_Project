import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const BigCard = ({item}) => {
    return (
        <TouchableOpacity
            style={{
                borderWidth: 1,
            }}
        >
            <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.imageUrl }} />
        </TouchableOpacity>
    )
}

export default BigCard