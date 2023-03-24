import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeftCircleIcon, ArrowLeftIcon, ArrowSmallLeftIcon, ArrowUturnLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/mini';
import Languages from '../Json files/Languages';


const LoginScreen = () => {


  ////////////////////////////////////////
  ////////Make screen without header//////
  ////////////////////////////////////////
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

  }, []);
  ///////////////////////////////////////

const [language, setlanguage] = useState("EN")

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.leftArrowView}>
        <TouchableOpacity onPress={navigation.goBack}>
          <ArrowLeftCircleIcon color={styles.leftArrow.color} size={styles.leftArrow.fontSize} style={styles.leftArrow} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.largeText}>{Languages.Wellcome.JP}!</Text>
        <Text style={styles.smallText}>{Languages.EnterYourUsernameAndPassword.JP}</Text>
      </View>
      <View style={styles.textInputsView}>
        <Text style={{ left: 15, fontSize: 26 }}>{Languages.UserName.JP}</Text>
        <TextInput style={styles.textInputs} placeholder='UserName' keyboardAppearance='dark' autoCapitalize='none' />
        <Text style={{ left: 15, fontSize: 26 }}>{Languages.Password.JP}</Text>
        <TextInput style={styles.textInputs} placeholder='Password' keyboardAppearance='dark' autoCapitalize='none' secureTextEntry />
      </View>
      <View style={styles.loginButton}>
        <TouchableOpacity onPress={() => {

        }}

        >
          <Text style={styles.loginText}>{Languages.Login.JP}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.additionalOptionsView}>
        <TouchableOpacity onPress={() => {

        }}

        >
          <Text style={styles.additionalOptions}>{Languages.ForgotYourPassword.JP}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {

        }}

        >
          <Text style={styles.additionalOptions}>{Languages.OrCreateAnewAccount.JP}</Text>
        </TouchableOpacity>
      </View>
      <Image style={styles.servisoFlower} source={require('../assets/ServisoFlower.png')} />
    </SafeAreaView >
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%"
  },
  leftArrow: {
    color: "#8E8E8E",
    width: 2,
    fontSize: 30,
    left: 10,
    top: 5,
  },
  leftArrowView: {
    height: 60,
    width: 2
  },
  topTextView: {

  },
  largeText: {
    fontSize: 40,
    height: 48,
    alignSelf: "center",
    color: "#535150",
    marginTop: 20
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
  loginButton: {
    width: 281,
    height: 62,
    marginTop: 50,
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "black"
  },
  loginText: {
    color: "white",
    fontSize: 36,
    alignSelf: "center",
    top: 10
  },
  backgroundFont: {
    position: "absolute",
    width: 643,
    height: 713,
    left: -174,
    top: 303,
    backgroundColor: "rgba(240, 232, 230, 0.3)",
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
  },
  servisoFlower: {
    width:134,
    height:68,
    top:50,
    alignSelf:"center"
  }
});