import { View, Text, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import Languages from '../Json_files/Languages';
import ButtonMain from './Buttons';

const ResetPassword = ({ language }) => {
    const screenContent = Languages.ResetPasswordComp;

    return (
        <View style={styles.container}>
            <Text style={styles.largeText}>{screenContent.PasswordReset[language]}</Text>
            <Text style={styles.smallText}>{screenContent.ChooseNewPassword[language]}</Text>
            <View style={styles.textInputsView}>
                <Text style={{ left: 15, fontSize: 26 }}>{screenContent.NewPassword[language]}</Text>
                <TextInput style={styles.textInputs} placeholder={screenContent.NewPassword[language]} keyboardAppearance='dark' autoCapitalize='none' secureTextEntry/>
                <Text style={{ left: 15, fontSize: 26 }}>{screenContent.ConfirmNewPassword[language]}</Text>
                <TextInput style={styles.textInputs} placeholder={screenContent.ConfirmNewPassword[language]} keyboardAppearance='dark' autoCapitalize='none' secureTextEntry/>
            </View>
            <ButtonMain text={screenContent.Continue[language]} buttonStyle={{marginTop:30}}/>
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
        marginBottom:30
    },
    textInputsView: {
        marginTop: 70,
    }
}); 