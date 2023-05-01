import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import CustomRequestCard from './Cards/CustomRequestCard';

const items = [
    { id: 1, name: 'Toilet Paper', img: require('../assets/Toilet.png') },
    { id: 2, name: 'Face towel', img: require('../assets/Towel.png') },
    { id: 3, name: 'Hand towel', img: require('../assets/Towel.png') },
    { id: 4, name: 'Body towel', img: require('../assets/Towel.png') },
    { id: 5, name: 'Shampoo', img: require('../assets/Shampoo.png') },
    { id: 6, name: 'Conditioner', img: require('../assets/Shampoo.png') },
    { id: 7, name: 'Hand soap', img: require('../assets/HandSoap.png') },
    { id: 8, name: 'Hard soap', img: require('../assets/HardSoap.png') },
    { id: 9, name: 'Blanket', img: require('../assets/Blanket.png') },
    { id: 10, name: 'Pillow', img: require('../assets/Pillow.png') },
];

const CustomRequestCarusel = () => {
    return (
        <View>
            <ScrollView horizontal={true}>
                {items.map(item =>
                    <CustomRequestCard key={item.id} item={item} />
                )}
            </ScrollView>
        </View>
    );
};

export default CustomRequestCarusel;