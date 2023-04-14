import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { Keyboard, StyleSheet, View, Image, TouchableWithoutFeedback, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftCircleIcon, XCircleIcon } from 'react-native-heroicons/mini';
import BottomMenu from './BottomMenu';
import Loading from './Loading';
import { HotelsAppContext } from '../Context/HotelsAppContext';


const ScreenComponent = ({ content, topLeftButton, cancelNavigation, bottomMenu }) => {

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

    //switch to knwo which topLeftButton is needed
    let topLeftButtonIcon = <></>;
    switch (topLeftButton) {
        case 'none':
            break;
        case 'cancel':
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
            );
            break;
    }

    return (
        <TouchableWithoutFeedback disabled={!isKeyBoardOpen} onPress={dismissKeyboard}>
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

    );
};

export default ScreenComponent;

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    topLeftButton: {
        color: '#8E8E8E',
        width: 20,
        fontSize: 30,
        left: 10,
        top: 5,
        position: 'absolute',
    },
    leftArrowView: {
        marginBottom: 20,
        width: 50,
        height: 20,
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
