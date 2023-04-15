import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'react-native-heroicons/mini';

const ButtonMain = ({ textStyle, buttonStyle, text, onPress, navigate }) => {
    const navigation = useNavigation();

    let buttonStyleConverted = {};
    const onPressConverted = navigate ? (() => { { navigation.navigate(navigate) } }) : onPress;

    if (buttonStyle) {
        buttonStyleConverted = { ...buttonStyle };
        if (buttonStyle.color && !buttonStyle.backgroundColor) {
            buttonStyleConverted.backgroundColor = buttonStyle.color;
        }
    }

    return (
        <View style={StyleSheet.flatten([defaultStyle.buttonStyle, buttonStyleConverted])}>
            <TouchableOpacity onPress={onPressConverted}>
                <Text style={StyleSheet.flatten([defaultStyle.textStyle, textStyle])}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}
export default ButtonMain

export const ButtonText = ({ textStyle, buttonStyle, text, onPress, navigate }) => {
    const navigation = useNavigation();
    const onPressConverted = navigate ? (() => { { navigation.navigate(navigate) } }) : onPress;

    return (
        <View style={buttonStyle}>
            <TouchableOpacity onPress={onPressConverted}>
                <Text style={StyleSheet.flatten([defaultStyle.buttonText, textStyle])}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export const ButtonArrow = ({ direction, color, size, style, onPress, navigate }) => {

    const navigation = useNavigation();
    const onPressConverted = navigate ? (() => { { navigation.navigate(navigate) } }) : onPress;
    const colorConverted = color ? color : defaultStyle.arrow.color;
    const sizeConverted = size ? size : defaultStyle.arrow.fontSize;

    return (
        <View>
            <TouchableOpacity onPress={onPressConverted}>
                {
                    direction == "left"
                        ?
                        <ArrowLeftCircleIcon
                            color={colorConverted}
                            size={sizeConverted}
                            style={StyleSheet.flatten([defaultStyle.arrow, style])} />

                        :
                        <ArrowRightCircleIcon
                            color={colorConverted}
                            size={sizeConverted}
                            style={StyleSheet.flatten([defaultStyle.arrow, style])} />

                }
            </TouchableOpacity>
        </View>
    )
}


const defaultStyle = StyleSheet.create({
    buttonStyle: {
        height: 62,
        alignSelf: "center",
        borderRadius: 30,
        backgroundColor: "black",
        justifyContent: "center"
    },
    textStyle: {
        color: "white",
        fontSize: 36,
        paddingHorizontal: 20
    },
    buttonText: {
        fontSize: 15,
        color: "#6B6B6B",
        textAlign: "center",
    },
    arrow: {
        color: "#8E8E8E",
        fontSize: 30,
        left: 10,
        top: 5,
    },
});

