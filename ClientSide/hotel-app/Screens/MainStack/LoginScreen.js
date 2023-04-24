import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Image, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import LanguageSelect from '../../FCComponents/LanguageSelect';
import ButtonMain, { ButtonText } from '../../FCComponents/Buttons';
import ScreenComponent from '../../FCComponents/ScreenComponent';
import { HotelsAppContext } from '../../Context/HotelsAppContext';
import Languages from '../../Json_files/Languages';
import axios from 'axios';



const LoginScreen = () => {

  const { language, setlanguage, setIsLoading, setUser } = useContext(HotelsAppContext)
  const screenContent = Languages.LoginScreen;
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null)

  const navigation = useNavigation();
 

  const handleLogin = async () => {
    if (email && password) {
      setIsLoading(true);

      try {
        const response = await fetch('http://proj.ruppin.ac.il/cgroup97/test2/api/login', {
          method: 'POST',
          body: JSON.stringify(
            {
              email: email,
              password: password,
            }
          ),
          headers: new Headers({
            'Content-type': 'application/json; charset=UTF-8',
          })
        });

        if (response.ok) {
          const message = await response.text();
          const object = JSON.parse(message);
          const fName = object.fName;
          const sName = object.sName;
          const gender = object.gender;
          setUser({email, fName, sName, gender});
          navigation.navigate("MainScreen")
        } else {
          const errorMessage = await response.text();
          const errorObject = JSON.parse(errorMessage);
          const errorType = errorObject.type;
          const errorMessageText = errorObject.message;

          console.log(`Error: ${response.status} - ${errorType} - ${errorMessageText}`);
        }
        setIsLoading(false);

      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  }

  return (
    <ScreenComponent bottomMenu={true}
      content={
        <View>
          <View>
            <Text style={styles.largeText}>{screenContent.Welcome[language]}</Text>
            <Text style={styles.smallText}>{screenContent.EnterYourEmailAndPassword[language]}</Text>
          </View>
          <LanguageSelect languageContext={language} setlanguageContext={setlanguage} buttonStyle={{}} />
          <View style={styles.textInputsView}>
            <Text style={{ left: 15, fontSize: 26 }}>{screenContent.Email[language]}</Text>
            <TextInput style={styles.textInputs} placeholder={screenContent.Email[language]} keyboardAppearance='dark' autoCapitalize='none'
              onChangeText={(text) => setEmail(text)} />
            <Text style={{ left: 15, fontSize: 26 }}>{screenContent.Password[language]}</Text>
            <TextInput style={styles.textInputs} placeholder={screenContent.Password[language]} keyboardAppearance='dark' autoCapitalize='none' secureTextEntry
              onChangeText={(text) => setPassword(text)} />
          </View>
          <ButtonMain text={screenContent.Login[language]} buttonStyle={{ marginTop: 50 }} onPress={handleLogin} />
          <ButtonText text={screenContent.ForgotYourPassword[language]} buttonStyle={{ marginTop: 30 }} navigate={"PasswordResetScreen"} />
          <ButtonText text={screenContent.OrCreateAnewAccount[language]} buttonStyle={{ marginTop: 20 }} navigate={"CreateUserScreen"} />
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
    borderRadius: 10
  },
  textInputsView: {
    marginTop: 100
  }
});
