import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
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
                    <Text style={styles.joinText}>{Languages.Start.EN}</Text>
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
        backgroundColor: "black"
    },
    joinText: {
        color: "white",
        fontSize: 36,
        alignSelf: "center",
        top: 10
    }
});