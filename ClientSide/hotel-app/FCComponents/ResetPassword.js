import { View, Text, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Languages from '../Json_files/Languages';
import ButtonMain from './Buttons';
import { isEqual } from 'lodash';
import Loading from './Loading';
import { HotelsAppContext } from '../Context/HotelsAppContext';

const ResetPassword = ({ language, email, setIsResetSucceed }) => {

    const { setIsLoading } = useContext(HotelsAppContext)


    //Screen content (words and sentences from Languages Json File that have been set for the current page)
    const screenContent = Languages.ResetPasswordComp;

    //Helper States
    const [isConfirmePasswordCorrect, setIsconfirmedPasswordCorrect] = useState(null)
    const [borderColor, setBorderColor] = useState("black")


    //Personal Info States
    const [newPassword, setNewPassword] = useState(null)
    const [confirmNewPassword, setConfirmNewPassword] = useState(null)

    const handleSubmit = async () => {
        setIsLoading(true);

        if (isConfirmePasswordCorrect) {
            try {
                const response = await fetch('http://proj.ruppin.ac.il/cgroup97/prod/api/passwordReset', {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            email: email,
                            password: newPassword,
                        }
                    ),
                    headers: new Headers({
                        'Content-type': 'application/json; charset=UTF-8',
                    })
                });

                if (response.ok) {
                    console.log("The new Password has been updated");
                    setIsResetSucceed(true)
                } else {
                    const errorMessage = await response.text();
                    const errorObject = JSON.parse(errorMessage);
                    const errorType = errorObject.type;
                    const errorMessageText = errorObject.message;

                    console.log(`Error: ${response.status} - ${errorType} - ${errorMessageText}`);
                    setIsResetSucceed(false)
                }
                setIsLoading(false);

            } catch (error) {
                console.log(error);
                setIsResetSucceed(false)
                setIsLoading(false);
            }
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


    const checkPasswords = () => {
        if (confirmNewPassword != null && newPassword != null && !isEqual(newPassword, confirmNewPassword)) {
            setIsconfirmedPasswordCorrect(false);
        }
        else {
            setIsconfirmedPasswordCorrect(true);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.largeText}>{screenContent.PasswordReset[language]}</Text>
            <Text style={styles.smallText}>{screenContent.ChooseNewPassword[language]}</Text>
            <View style={styles.textInputsView}>
                <Text style={{ left: 15, fontSize: 26 }}>{screenContent.NewPassword[language]}</Text>
                <TextInput style={StyleSheet.flatten([styles.textInputs, { borderColor }])} placeholder={screenContent.NewPassword[language]} keyboardAppearance='dark' autoCapitalize='none'
                    secureTextEntry onChangeText={(text) => setNewPassword(text)} />
                <Text style={{ left: 15, fontSize: 26 }}>{screenContent.ConfirmNewPassword[language]}</Text>
                {
                    !isConfirmePasswordCorrect && isConfirmePasswordCorrect != null ?
                        <Text style={styles.alertText}>{screenContent.PasswordsDoNotMatch[language]}</Text>
                        :
                        ""
                }
                <TextInput style={StyleSheet.flatten([styles.textInputs, { borderColor }])} placeholder={screenContent.ConfirmNewPassword[language]} keyboardAppearance='dark' autoCapitalize='none'
                    secureTextEntry onChangeText={(text) => setConfirmNewPassword(text)} onBlur={checkPasswords}
                />

            </View>
            <ButtonMain text={screenContent.Continue[language]} buttonStyle={{ marginTop: 30 }} onPress={handleSubmit} />
        </View>
    )
}

export default ResetPassword

const styles = StyleSheet.create({
    largeText: {
        fontSize: 35,
        alignSelf: "center",
        color: "#535150",
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
        marginBottom: 30
    },
    textInputsView: {
        marginTop: 70,
    },
    alertText: {
        top: 10,
        left: 20,
        fontSize: 15,
        color: "red"
    }
}); 