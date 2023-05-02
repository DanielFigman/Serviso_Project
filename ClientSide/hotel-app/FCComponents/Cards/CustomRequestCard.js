import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const CustomRequestCard = ({ item }) => {

    const [amount, setAmount] = useState(0);

    const handleQuantityChange = (action) => {
        switch (action) {
            case "PLUS":
                setAmount(prev => prev + 1);
                break;
            case "MINUS":
                if (amount > 0) {
                    setAmount(prev => prev - 1);
                }
                break;
        }
    };

    return (
        <View
            style={{
                backgroundColor: '#D3B9B3',
                padding: 15,
                alignItems: 'center',
                borderRadius: 30,
                margin: 10,
                width: 150,
                height: 130,

            }}
        >
            <Image
                style={{
                    width: '50%',
                    height: '50%',
                    alignSelf: 'center',
                    marginTop: -10,
                    resizeMode: 'contain',
                }}
                source={item.img}
            />
            <Text style={{ fontSize: 17 }}>{item.name}</Text>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 10,
                    width: 100,
                    backgroundColor: '#F8F3F2',
                    borderRadius: 40,
                    height:35
                }}
            >
                <TouchableOpacity
                    onPress={() => handleQuantityChange("MINUS")}
                >
                    <Text style={{ fontSize: 25 }}>-</Text>
                </TouchableOpacity>
                <Text style={{ marginHorizontal: 10, fontSize: 18 }}>
                    {amount}


                </Text>
                <TouchableOpacity
                    onPress={() => handleQuantityChange("PLUS")}

                >
                    <Text style={{ fontSize: 25 }}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomRequestCard