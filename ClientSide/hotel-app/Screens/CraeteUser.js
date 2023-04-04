import { View, Text, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import ScreenComponent from '../FCComponents/ScreenComponent'
import Languages from '../Json files/Languages'
import { StyleSheet } from 'react-native'
import { HotelsAppContext } from '../Context/HotelsAppContext'
import LanguageSelect from '../FCComponents/LanguageSelect'
import ButtonMain from '../FCComponents/Buttons'
import { useNavigation } from '@react-navigation/core'

const CraeteUser = () => {

    const { language, setlanguage } = useContext(HotelsAppContext)
    const screenContent = Languages.CreateUserScreen;

    const [email, setEmail] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [confirmNewPassword, setConfirmNewPassword] = useState(null)

    const navigation = useNavigation();

    const checkPath = () => {
        if (email && newPassword && confirmNewPassword) {
            if (newPassword == confirmNewPassword)
                navigation.navigate("LoginScreen")
        }
    }


    return (
        <ScreenComponent
            content={
                <View>
                    <Text style={styles.largeText}>{screenContent.CreateAccount[language]}</Text>
                    <LanguageSelect languageContext={language} setlanguageContext={setlanguage} buttonStyle={{ marginTop: 120 }} />
                    <View style={styles.textInputsView}>
                        <Text style={{ left: 15, fontSize: 26 }}>{screenContent.Email[language]}</Text>
                        <TextInput style={styles.textInputs}
                            placeholder={screenContent.Email[language]} keyboardAppearance='dark' autoCapitalize='none'
                            onChangeText={(text) => setEmail(text)}
                        />
                        <Text style={{ left: 15, fontSize: 26 }}>{screenContent.NewPassword[language]}</Text>
                        <TextInput style={styles.textInputs}
                            placeholder={screenContent.NewPassword[language]} keyboardAppearance='dark' autoCapitalize='none'
                            secureTextEntry
                            onChangeText={(text) => setNewPassword(text)}
                        />
                        <Text style={{ left: 15, fontSize: 26 }}>{screenContent.ConfirmNewPassword[language]}</Text>
                        <TextInput style={styles.textInputs} placeholder={screenContent.ConfirmNewPassword[language]}
                            keyboardAppearance='dark' autoCapitalize='none' secureTextEntry
                            onChangeText={(text) => setConfirmNewPassword(text)}
                        />
                    </View>
                    <ButtonMain
                        text={screenContent.CreateAccount[language]}
                        buttonStyle={{ marginTop: 50 }}
                        onPress={checkPath}
                    />
                </View>
            }
        />
    )
}

export default CraeteUser

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
        marginTop: 130,
    }
}); 