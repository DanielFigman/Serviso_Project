import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { Keyboard, StyleSheet, View, Image, TouchableWithoutFeedback, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftCircleIcon, XCircleIcon } from 'react-native-heroicons/outline';
import Loading from './Loading';
import { HotelsAppContext } from '../Context/HotelsAppContext';


const ScreenComponent = ({ content, topLeftButton, cancelNavigation, servisoFlower, topLeftButtonStyle, topLeftButtonColor, title, backgroundShapes, additionalTopButton }) => {

    //use context to display Loading component 
    const { isLoading } = useContext(HotelsAppContext)

    // state of keyboard to know if keyboard is currently showen 
    const [isKeyBoardOpen, setIsKeyBoardOpen] = useState(false);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //listiner of the keyboard that setting the setIsKeboardOpen using the handleKeyboardDidShouw and didHide functions///// 
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

        // remove the event listeners when the component unmounts
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleKeyboardDidShow = () => {
        setIsKeyBoardOpen(true);

    };

    const handleKeyboardDidHide = () => {
        setIsKeyBoardOpen(false);

    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



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

    //TouchableWithoutFeedback function to dismiss the keyBoard if open
    const dismissKeyboard = () => {
        if (Keyboard) {
            Keyboard.dismiss();
        }
    };

    //switch to know which topLeftButton is needed
    let topLeftButtonIcon = <></>;
    switch (topLeftButton) {
        case 'none':
            break;
        case 'cancel':
            if (cancelNavigation) {
                topLeftButtonIcon = (
                    <TouchableOpacity onPress={() => navigation.navigate(cancelNavigation)}>
                        <XCircleIcon fill={topLeftButtonColor ? topLeftButtonColor : styles.topLeftButton.color} size={styles.topLeftButton.fontSize} style={styles.topLeftButton} />
                    </TouchableOpacity>
                );
            }
            break;
        default:
            topLeftButtonIcon = (
                <TouchableOpacity onPress={navigation.goBack}>
                    <ArrowLeftCircleIcon color={"white"} fill={topLeftButtonColor ? topLeftButtonColor : styles.topLeftButtonColor.color} size={styles.topLeftButton.fontSize} style={styles.topLeftButton} />
                </TouchableOpacity>
            );
            break;
    }

    const servisoFlowerInternal = servisoFlower === true ? true : false;

    return (
        <>
            <TouchableWithoutFeedback disabled={!isKeyBoardOpen} onPress={dismissKeyboard}>
                <SafeAreaView style={styles.container}>

                    {backgroundShapes ?
                        <View style={styles.backgroundContainer}>
                            <View style={styles.shape} />
                            <View style={styles.shape2} />
                        </View>
                        :
                        <></>
                    }
                    {!isLoading ?
                        < View style={{ flexDirection: "row", zIndex: 5, width: "100%" }}>
                            {topLeftButton != "none" ?
                                <View style={StyleSheet.flatten([styles.leftArrowView, topLeftButtonStyle])}>
                                    {topLeftButtonIcon}
                                </View>
                                :
                                <></>
                            }
                            {title ?
                                title
                                :
                                <></>
                            }
                            {
                                additionalTopButton ?
                                    additionalTopButton
                                    :
                                    <></>
                            }
                        </View>
                        :
                        <></>
                    }
                    {
                        isLoading ?
                            <Loading />
                            :
                            content
                    }
                </SafeAreaView>
            </TouchableWithoutFeedback >
            {
                servisoFlowerInternal
                    ?
                    <Image style={styles.servisoFlower
                    } source={require('../assets/ServisoFlower.png')} />
                    :
                    ""
            }
        </>
    );
};

export default ScreenComponent;

const styles = StyleSheet.create({
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject, // Position the container to cover the entire screen
        zIndex: -1, // Set a negative zIndex to position the background behind other components
    },
    shape: {
        position: 'absolute',
        top: 30,
        left: 10,
        right: 0,
        height: 400,
        width: 400,
        backgroundColor: '#F0E8E6',
        borderRadius: 300,
    },
    shape2: {
        position: 'absolute',
        right: 50,
        bottom: 60,
        height: 400,
        width: 400,
        backgroundColor: '#F0E8E6',
        borderRadius: 300,
    },
    container: {
        height: '100%',
    },
    topLeftButtonColor: {
        color: 'black',
    },
    topLeftButton: {
        width: 20,
        fontSize: 30,
        left: 10,
        top: 5,
        position: 'absolute',
    },
    leftArrowView: {
        marginBottom: 20,
        width: "10%",
        height: 20,
        flexDirection: "column",
    },
    servisoFlower: {
        width: 134,
        height: 68,
        position: 'absolute',
        bottom: 15,
        alignSelf: 'center',
    },
    bottomMenu: {
        position: "absolute",
        bottom: 5,

    },
});
