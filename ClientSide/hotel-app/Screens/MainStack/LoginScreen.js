import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Image, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import LanguageSelect from '../../FCComponents/LanguageSelect';
import ButtonMain, { ButtonText } from '../../FCComponents/Buttons';
import ScreenComponent from '../../FCComponents/ScreenComponent';
import { HotelsAppContext } from '../../Context/HotelsAppContext';
import Languages from '../../Json_files/Languages';
import { auth } from '../../Firebase/firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth'

const LoginScreen = () => {

  const {
    language,
    setlanguage,
    setIsLoading,
    setLoginInfo,
    setAuthToken
  } = useContext(HotelsAppContext)


  const screenContent = Languages.LoginScreen;
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null)

  const navigation = useNavigation();



  const handleLogin = async () => {
    if (email && password) {
      setIsLoading(true);

      try {
        const response = await fetch('http://proj.ruppin.ac.il/cgroup97/prod/api/login', {
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
          await signInWithEmailAndPassword(auth, email.toLowerCase(), password)
            .then((userCredential) => {
              // The user has been signed in successfully without any popups
              const user = userCredential.user;
              console.log('User signed in:', user.uid);
              setAuthToken(userCredential._tokenResponse.refreshToken)
              // Do whatever you need to do after successful sign-in
            })
            .catch((error) => {
              // Handle sign-in errors
              console.error('Sign-in error:', error.message);
            });

          setLoginInfo(email, object);
          navigation.navigate("MainScreen")
        } else {
          const message = await response.text();
          const object = JSON.parse(message);
          if (object.type === "OrderNotFound") {
            showAlert(object.message);
          }
        }
      } catch (error) {
        showAlert("Either the Email or the password wrong");
      }
      finally {
        setIsLoading(false);
      }
    }
  }

  const showAlert = (message) => {
    Alert.alert(
      "Login Failed",
      message,
      [{ text: 'OK' }],
    );
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
