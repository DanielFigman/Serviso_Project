import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { TouchableWithoutFeedback } from 'react-native';
import { ArrowLeftCircleIcon } from 'react-native-heroicons/mini';
import { Image } from 'react-native';

const ScreenComponent = ({content}) => {

    ////////////////////////////////////////
    ////////Make screen without header//////
    ////////////////////////////////////////
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });

    }, []);
    ///////////////////////////////////////

    const dismissKeyboard = () => {
        if (Keyboard)
            Keyboard.dismiss();
    };


    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <ArrowLeftCircleIcon color={styles.leftArrow.color} size={styles.leftArrow.fontSize} style={styles.leftArrow} />
                </TouchableOpacity>
                {content}
                <Image style={styles.servisoFlower} source={require('../assets/ServisoFlower.png')} />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default ScreenComponent

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
        flex:1
    },
    leftArrow: {
        color: "#8E8E8E",
        width: 2,
        fontSize: 30,
        left: 10,
        top: 5,
    },
    leftArrowView: {
        height: 60,
        width: 2
    },
    servisoFlower: {
        width: 134,
        height: 68,
        position:"absolute",
        bottom:15,
        alignSelf:"center"
    }
});