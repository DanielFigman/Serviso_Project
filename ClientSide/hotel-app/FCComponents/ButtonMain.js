import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

const ButtonMain = ({ textStyle, buttonStyle, text, onPress }) => {

    let buttonStyleConverted = {};

        if(buttonStyle) {
            buttonStyleConverted = {...buttonStyle};
            if (buttonStyle.color && !buttonStyle.backgroundColor) {
                buttonStyleConverted.backgroundColor = buttonStyle.color;
            }
        }

    return (
        <View style={StyleSheet.flatten([defaultStyle.buttonStyle, buttonStyleConverted])}>
            <TouchableOpacity onPress={onPress}>
                <Text style={StyleSheet.flatten([defaultStyle.textStyle, textStyle])}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonMain

const defaultStyle = StyleSheet.create({
    buttonStyle: {
        width: 281,
        height: 62,
        alignSelf: "center",
        borderRadius: 30,
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    textStyle: {
        color: "white",
        fontSize: 36
    },
});

