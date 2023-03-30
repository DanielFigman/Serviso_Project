import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { HotelsAppContext } from '../Context/HotelsAppContext';
import Languages from '../Json files/Languages';

const WelcomeScreen = () => {


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

    const screenContent = Languages.WelcomeScreen;

    const {language} = useContext(HotelsAppContext)


    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.mainImage} source={require('../assets/ServisoMain.png')} />
            </View>
            <View style={styles.joinButton}>
                <TouchableOpacity  onPress={()=>{
                    navigation.navigate("LoginScreen")
                }}

                >
                    <Text style={styles.joinText}>{screenContent.Start[language]}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
    },
    mainImage: {
        width: 354,
        height: 381,
        top: 120,
        alignSelf: "center"
    },
    text: {
        fontSize: 50,
        textAlign: "center",
        color: "#000000",
        top: 150,
    },
    joinButton: {
        width: 281,
        height: 62,
        top: 300,
        alignSelf: "center",
        borderRadius: 30,
        backgroundColor: "black",
        display: "flex",
        alignItems:"center",
        justifyContent:"center"
    },
    joinText: {
        color: "white",
        fontSize: 36
    }
});