import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { HotelsAppContext } from '../../Context/HotelsAppContext';
import Languages from '../../Json_files/Languages';
import ButtonMain from '../../FCComponents/Buttons';

const WelcomeScreen = () => {
    ////////////////////////////////////////
    ////////Make screen without header//////
    ////////////////////////////////////////

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });

    }, []);
    ///////////////////////////////////////

    const navigation = useNavigation();
    
    const screenContent = Languages.WelcomeScreen;

    const { language } = useContext(HotelsAppContext)


    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.mainImage} source={require('../../assets/ServisoMain.png')} />
            </View>
            <ButtonMain text={screenContent.Start[language]} buttonStyle={{ marginTop: 300 }} navigate={"LoginScreen"} />

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
    }
});