import { View, Text, TextInput, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ScreenComponent from '../FCComponents/ScreenComponent'
import Languages from '../Json files/Languages'
import { StyleSheet } from 'react-native'
import { HotelsAppContext } from '../Context/HotelsAppContext'
import LanguageSelect from '../FCComponents/LanguageSelect'
import ButtonMain from '../FCComponents/Buttons'
import { useNavigation } from '@react-navigation/core'
import { isEqual } from 'lodash';

const CraeteUser = () => {

    const { language, setlanguage } = useContext(HotelsAppContext)
    const screenContent = Languages.CreateUserScreen;

    const [email, setEmail] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [confirmNewPassword, setConfirmNewPassword] = useState(null)
    const [isConfirmePasswordCorrect, setIsconfirmedPasswordCorrect] = useState(null)
    const [borderColor, setBorderColor] = useState(null)


    const navigation = useNavigation();

    const checkPath = () => {
        if (email && newPassword && confirmNewPassword) {
            if (newPassword == confirmNewPassword)
                navigation.navigate("LoginScreen")
        }
    }

    const checkPasswords = () => {
        if (!isEqual(newPassword, confirmNewPassword)) {
            setIsconfirmedPasswordCorrect(false);
        }
        else {
            setIsconfirmedPasswordCorrect(true);
        }
    }

    useEffect(() => {
        if (confirmNewPassword != null) {
            if (isConfirmePasswordCorrect) {
                setBorderColor("green")
            }
            else {
                setBorderColor("red")
            }
        }

    }, [isConfirmePasswordCorrect])



    return (
        <ScreenComponent
            content={
                <ScrollView style={styles.container}>
                    <Text style={styles.largeText}>{screenContent.CreateAccount[language]}</Text>
                    <LanguageSelect languageContext={language} setlanguageContext={setlanguage} buttonStyle={{ marginTop: 120 }} />
                    <View style={styles.textInputsView}>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, width: "50%" }}>
                                <Text style={styles.textInputesText}>{screenContent.Email[language]}</Text>
                                <TextInput style={styles.textInputs}
                                    placeholder={screenContent.Email[language]} keyboardAppearance='dark' autoCapitalize='none'
                                    onChangeText={(text) => setEmail(text)}
                                />
                            </View>
                            <View style={{ width: "50%" }}>
                                <Text style={styles.textInputesText}>{screenContent.NewPassword[language]}</Text>
                                <TextInput style={StyleSheet.flatten([styles.textInputs, { borderColor }])}
                                    placeholder={screenContent.NewPassword[language]} keyboardAppearance='dark' autoCapitalize='none'
                                    secureTextEntry
                                    onChangeText={(text) => setNewPassword(text)}
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.textInputesText}>{screenContent.ConfirmNewPassword[language]}</Text>
                            <TextInput style={StyleSheet.flatten([styles.textInputs, { borderColor }])} placeholder={screenContent.ConfirmNewPassword[language]}
                                keyboardAppearance='dark' autoCapitalize='none' secureTextEntry
                                onChangeText={(text) => setConfirmNewPassword(text)}
                                onBlur={checkPasswords}
                            />

                        </View>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, width: "50%" }}>
                                <Text style={styles.textInputesText}>{screenContent.Email[language]}</Text>
                                <TextInput style={styles.textInputs}
                                    placeholder={screenContent.Email[language]} keyboardAppearance='dark' autoCapitalize='none'
                                    onChangeText={(text) => setEmail(text)}
                                />
                            </View>
                            <View style={{ width: "50%" }}>
                                <Text style={styles.textInputesText}>{screenContent.NewPassword[language]}</Text>
                                <TextInput style={StyleSheet.flatten([styles.textInputs, { borderColor }])}
                                    placeholder={screenContent.NewPassword[language]} keyboardAppearance='dark' autoCapitalize='none'
                                    secureTextEntry
                                    onChangeText={(text) => setNewPassword(text)}
                                />
                            </View>
                        </View>
                    </View>
                    <ButtonMain
                        text={screenContent.CreateAccount[language]}
                        buttonStyle={{ marginTop: 50 }}
                        onPress={checkPath}
                    />
                </ScrollView>
            }
        />
    )
}

export default CraeteUser

const styles = StyleSheet.create({
    container: {
        zIndex: 1
    },
    largeText: {
        fontSize: 35,
        alignSelf: "center",
        color: "black",
        marginTop: 30,
    },
    smallText: {
        fontSize: 18,
        height: 48,
        alignSelf: "center",
        color: "#565656",
        marginTop: 10
    },
    textInputs: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    textInputsView: {
        marginTop: 130,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    textInputesText: {
        fontSize: 20,
        textAlign: "center"

    }
}); 