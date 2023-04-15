import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { StyleSheet } from 'react-native'

const HouseHoldProductCard = ({ productName, productImage, productID }) => {

    const [amount, setAmount] = useState(0)

    const handlePlus = () => {
        setAmount(prev => prev + 1)
    }

    const handleMinus = () => {
        if (amount != 0) {
            setAmount(prev => prev - 1)
        }
    }

    return (
        <View style={styles.rowView}>
            <Image
                source={{ url: productImage }}
                style={{ width: 90, height: 90 }}
            />
            <Text style={styles.text}>{productName}</Text>
            <Pressable
                style={{
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    alignSelf: "center",
                }}
            //   onPress={() => {
            //     decrementCount();
            //   }}
            >
                <TouchableOpacity onPress={handleMinus}>
                    <Text
                        style={{
                            fontSize: 20,
                            color: "#926255",
                            paddingHorizontal: 6,
                            fontWeight: "900",
                        }}
                    >
                        -
                    </Text>
                </TouchableOpacity>
                {/* <Pressable> */}
                <Text
                    style={{
                        fontSize: 19,
                        color: "#926255",
                        paddingHorizontal: 8,
                        fontWeight: "800",
                    }}
                >
                    {amount}
                </Text>
                {/* </Pressable> */}
                <TouchableOpacity
                    onPress={handlePlus}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            color: "#926255",
                            paddingHorizontal: 6,
                            fontWeight: "800",
                        }}
                    >
                        +
                    </Text>
                </TouchableOpacity>
            </Pressable>
        </View>
    )
}

export default HouseHoldProductCard

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        flex: 1,
        padding: 10,
    },
    discription: {
        flex: 1,
        fontSize: 15,
    },
    Details: {
        alignSelf: "center",
        top: 50,
    },
    listItemView: {
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
        marginHorizontal: 20,
    },
    rowView: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        margin: 10,
        borderColor: "#926255",
        borderWidth: 1,
        borderRadius: 2,
    },
});