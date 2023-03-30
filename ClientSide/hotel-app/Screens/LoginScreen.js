import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Image, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import LanguageSelect from '../FCComponents/LanguageSelect';
import ButtonMain from '../FCComponents/ButtonMain';
import ScreenComponent from '../FCComponents/ScreenComponent';
import { HotelsAppContext } from '../Context/HotelsAppContext';
import Languages from '../Json files/Languages';



const LoginScreen = () => {

  const { language, setlanguage } = useContext(HotelsAppContext)
  const screenContent = Languages.LoginScreen;
  const navigation = useNavigation();

  return (
    <ScreenComponent content={
      <View>
        <View>
          <Text style={styles.largeText}>{screenContent.Welcome[language]}</Text>
          <Text style={styles.smallText}>{screenContent.EnterYourUsernameAndPassword[language]}</Text>
        </View>
        <LanguageSelect languageContext={language} setlanguageContext={setlanguage} buttonStyle={{}}/>
        <View style={styles.textInputsView}>
          <Text style={{ left: 15, fontSize: 26 }}>{screenContent.UserName[language]}</Text>
          <TextInput style={styles.textInputs} placeholder={screenContent.UserName[language]} keyboardAppearance='dark' autoCapitalize='none' />
          <Text style={{ left: 15, fontSize: 26 }}>{screenContent.Password[language]}</Text>
          <TextInput style={styles.textInputs} placeholder={screenContent.Password[language]} keyboardAppearance='dark' autoCapitalize='none' secureTextEntry />
        </View>
        <ButtonMain text={screenContent.Login[language]} buttonStyle={{ marginTop: 50 }} onPress={() => { { } }} />
        <View style={styles.additionalOptionsView}>
          <TouchableOpacity onPress={() => {
            navigation.navigate("PasswordResetScreen")
          }}

          >
            <Text style={styles.additionalOptions}>{screenContent.ForgotYourPassword[language]}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {

          }}

          >
            <Text style={styles.additionalOptions}>{screenContent.OrCreateAnewAccount[language]}</Text>
          </TouchableOpacity>
        </View>
      </View>
    }
    />
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%"
  },
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
  },
  textInputsView: {
    marginTop: 100
  },
  additionalOptions: {
    fontSize: 15,
    color: "#6B6B6B",
    textAlign: "center",
    marginTop: 20,
  },
  additionalOptionsView: {
    alignItems: "center",
    marginTop: 15
  }
});
