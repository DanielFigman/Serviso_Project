import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Image, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import LanguageSelect from '../FCComponents/LanguageSelect';
import ButtonMain, { ButtonText } from '../FCComponents/Buttons';
import ScreenComponent from '../FCComponents/ScreenComponent';
import { HotelsAppContext } from '../Context/HotelsAppContext';
import Languages from '../Json files/Languages';



const LoginScreen = () => {

  const { language, setlanguage } = useContext(HotelsAppContext)
  const screenContent = Languages.LoginScreen;

  return (
    <ScreenComponent
      content={
        <View>
          <View>
            <Text style={styles.largeText}>{screenContent.Welcome[language]}</Text>
            <Text style={styles.smallText}>{screenContent.EnterYourEmailAndPassword[language]}</Text>
          </View>
          <LanguageSelect languageContext={language} setlanguageContext={setlanguage} buttonStyle={{}} />
          <View style={styles.textInputsView}>
            <Text style={{ left: 15, fontSize: 26 }}>{screenContent.Email[language]}</Text>
            <TextInput style={styles.textInputs} placeholder={screenContent.Email[language]} keyboardAppearance='dark' autoCapitalize='none' />
            <Text style={{ left: 15, fontSize: 26 }}>{screenContent.Password[language]}</Text>
            <TextInput style={styles.textInputs} placeholder={screenContent.Password[language]} keyboardAppearance='dark' autoCapitalize='none' secureTextEntry />
          </View>
          <ButtonMain text={screenContent.Login[language]} buttonStyle={{ marginTop: 50 }} onPress={() => { { } }} />
          <ButtonText text={screenContent.ForgotYourPassword[language]} buttonStyle={{ marginTop: 30 }} navigate={"PasswordResetScreen"} />
          <ButtonText text={screenContent.OrCreateAnewAccount[language]} buttonStyle={{ marginTop: 20}} navigate={"CraeteUser"}/>
        </View>
      }
    />
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  largeText: {
    fontSize: 40,
    height: 48,
    alignSelf: "center",
    color: "#535150",
    marginTop: 20,
  },
  smallText: {
    fontSize: 18,
    height: 48,
    alignSelf: "center",
    color: "#565656"
  },
  textInputs: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:10
  },
  textInputsView: {
    marginTop: 100
  }
});
