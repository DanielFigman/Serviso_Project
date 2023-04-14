import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { TouchableWithoutFeedback } from 'react-native';
import { ArrowLeftCircleIcon, XCircleIcon } from 'react-native-heroicons/mini';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import BottomMenu from './BottomMenu';
import Loading from './Loading';
import { HotelsAppContext } from '../Context/HotelsAppContext';


const ScreenComponent = ({ content, topLeftButton, cancelNavigation, bottomMenu }) => {

    //use context to display Loading component 
    const { isLoading } = useContext(HotelsAppContext)

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

    let topLeftButtonIcon = <></>;
    switch (topLeftButton) {
        case "none":
            break;
        case "cancel":
            if (cancelNavigation) {
                topLeftButtonIcon = (
                    <TouchableOpacity onPress={() => navigation.navigate(cancelNavigation)}>
                        <XCircleIcon color={styles.topLeftButton.color} size={styles.topLeftButton.fontSize} style={styles.topLeftButton} />
                    </TouchableOpacity>
                );
            }
            break;
        default:
            topLeftButtonIcon = (
                <TouchableOpacity onPress={navigation.goBack}>
                    <ArrowLeftCircleIcon color={styles.topLeftButton.color} size={styles.topLeftButton.fontSize} style={styles.topLeftButton} />
                </TouchableOpacity>
            )
            break;
    }

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <SafeAreaView style={styles.container}>
                <View style={styles.leftArrowView}>
                    {topLeftButtonIcon}
                </View>
                {
                    isLoading ?
                        <Loading />
                        :
                        content
                }
                {
                    bottomMenu ?
                        <View style={styles.bottomMenu}>
                            <BottomMenu />
                        </View>
                        :
                        <Image style={styles.servisoFlower} source={require('../assets/ServisoFlower.png')} />
                }

            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default ScreenComponent

ScreenComponent.propTypes = {
    content: PropTypes.element.isRequired,
    topLeftButton: PropTypes.string,
    cancelNavigation: PropTypes.string
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    topLeftButton: {
        color: "#8E8E8E",
        width: 20,
        fontSize: 30,
        left: 10,
        top: 5,
        position: "absolute"
    },
    leftArrowView: {
        marginBottom: 20,
        width: 50,
        height: 20
    },
    servisoFlower: {
        width: 134,
        height: 68,
        position: "absolute",
        bottom: 15,
        alignSelf: "center",
    },
    bottomMenu: {
        position: "absolute",
        bottom: 5,

    }
});

