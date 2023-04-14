import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Languages from '../Json_files/Languages';
import { HotelsAppContext } from '../Context/HotelsAppContext';
import ButtonMain from './Buttons';
import { isEqual } from 'lodash';
import { useNavigation } from '@react-navigation/core';

const GetLoginInfo = ({ setReturnedEmail, setReturnedPassword, setGetLoginInfoSucceed, errorMessageAfterFetch, fetchFailed, setFetchFailed }) => {

    //Screen content (words and sentences from Languages Json File that have been set for the current page)
    const screenContent = Languages.GetLoginInfoComp;

    //Context (language will be used also as personal info)
    const { language } = useContext(HotelsAppContext)

    //Helper States
    const [isConfirmePasswordCorrect, setIsconfirmedPasswordCorrect] = useState(null)
    const [emailTitleColor, setEmailTitleColor] = useState("black")
    const [newPasswordTitleColor, setNewPasswordTitleColor] = useState("black")
    const [passwordConfirmTitleColor, setPasswordConfirmTitleColor] = useState("black")
    const [borderColor, setBorderColor] = useState(null)


    //Personal Info States
    const [newPassword, setNewPassword] = useState(null)
    const [confirmNewPassword, setConfirmNewPassword] = useState(null)
    const [email, setEmail] = useState(null)

    //showError message state if the fetch has failed
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const checkPasswords = () => {
        if (!isEqual(newPassword, confirmNewPassword) && confirmNewPassword != null) {
            setIsconfirmedPasswordCorrect(false);
        }
        else {
            setIsconfirmedPasswordCorrect(true);
        }
    }

    useEffect(() => {
        //change the color of the passwords backGround in case of not match passwords, it will also raise a warning text (see in the return)
        if (confirmNewPassword != null) {
            if (isConfirmePasswordCorrect) {
                setBorderColor("black")
            }
            else {
                setBorderColor("red")
            }
        }

    }, [isConfirmePasswordCorrect])


    const handleSubmit = () => {

        //Check that all the fieds have changed, if not change the input text titles to red
        checkFields();

            if (email && newPassword && confirmNewPassword) {
                if (newPassword === confirmNewPassword) {
                    // setting the states of the parent comp (CreateUserScreen)
                    setReturnedEmail(email);
                    setReturnedPassword(newPassword);
                    setGetLoginInfoSucceed(true);
                }
            }
    }

    const checkFields = () => {
        const warningColor = "red";
        const okColor = "black"

        if (email == "") { setEmailTitleColor(warningColor) } else { setEmailTitleColor(okColor) }

        if (!newPassword && newPassword != null) { setNewPasswordTitleColor(warningColor) } else { setNewPasswordTitleColor(okColor) }

        if (!confirmNewPassword && confirmNewPassword != null) { setPasswordConfirmTitleColor(warningColor) } else { setPasswordConfirmTitleColor(okColor) }
    }

    useEffect(() => {
        if (!fetchFailed && fetchFailed != null) {
            const navigation = useNavigation();
            navigation.navigate("LoginScreen")
        }
        else if (fetchFailed) {
            setShowErrorMessage(true)
            showAlert();
        }
    }, [fetchFailed])

    const showAlert = () => {
        Alert.alert(
            "Account creation failed",
            errorMessageAfterFetch,
            [{ text: 'OK' }],
        );
    }


    return (
        <View>
            <Text style={styles.largeText}>{screenContent.CreateAccount[language]}</Text>
            <Text style={styles.smallText}>{screenContent.LoginInformation[language]}</Text>
            <View style={styles.textInputsView}>
                <Text style={styles.textInputesText}>{screenContent.Email[language]}</Text>
                <TextInput style={styles.textInputs}
                    placeholder={screenContent.Email[language]} keyboardAppearance='dark' autoCapitalize='none'
                    onChangeText={(text) => setEmail(text)}
                />
                <Text style={styles.textInputesText}>{screenContent.NewPassword[language]}</Text>
                <TextInput style={StyleSheet.flatten([styles.textInputs, { borderColor }])}
                    placeholder={screenContent.NewPassword[language]} keyboardAppearance='dark' autoCapitalize='none'
                    secureTextEntry onChangeText={(text) => setNewPassword(text)} onBlur={checkPasswords}
                />
                <Text style={styles.textInputesText}>{screenContent.ConfirmNewPassword[language]}</Text>
                {
                    !isConfirmePasswordCorrect && isConfirmePasswordCorrect != null ?
                        <Text style={styles.alertText}>{screenContent.PasswordsDoNotMatch[language]}</Text>
                        :
                        ""
                }
                <TextInput style={StyleSheet.flatten([styles.textInputs, { borderColor }])}
                    placeholder={screenContent.ConfirmNewPassword[language]} keyboardAppearance='dark' autoCapitalize='none'
                    secureTextEntry onChangeText={(text) => setConfirmNewPassword(text)} onBlur={checkPasswords}

                />
            </View>
            <ButtonMain
                text={screenContent.CreateAccount[language]}
                buttonStyle={{ marginTop: 50 }}
                onPress={handleSubmit}
            />
        </View >
    )
}

export default GetLoginInfo

const styles = StyleSheet.create({
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
        marginBottom: 20
    },
    textInputsView: {
        marginTop: 50,
    },
    textInputesText: {
        left: 15,
        fontSize: 26
    },
    alertText: {
        top: 10,
        left: 20,
        fontSize: 15,
        color: "red"
    }
}); 