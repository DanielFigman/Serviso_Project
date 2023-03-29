import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeftCircleIcon, ArrowLeftIcon, ArrowSmallLeftIcon, ArrowUturnLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/mini';
import Languages from '../Json files/Languages';
import { HotelsAppContext } from '../Context/HotelsAppContext';
import { SelectList } from 'react-native-dropdown-select-list'



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

  const screenContent = Languages.LoginScreen;


  const { language, setlanguage } = useContext(HotelsAppContext)
  const [selected, setSelected] = useState("EN");




  const data = [
    { key: '1', value: 'EN' },
    { key: '2', value: 'HE' },
    { key: '3', value: 'AR' },
    { key: '4', value: 'ES' },
    { key: '5', value: 'RU' },
    { key: '6', value: 'FR' },
    { key: '7', value: 'POR' },
    { key: '8', value: 'CH' },
    { key: '9', value: 'JP' }
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.leftArrowView}>
        <TouchableOpacity onPress={navigation.goBack}>
          <ArrowLeftCircleIcon color={styles.leftArrow.color} size={styles.leftArrow.fontSize} style={styles.leftArrow} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.largeText}>{screenContent.Welcome[language]}</Text>
        <Text style={styles.smallText}>{screenContent.EnterYourUsernameAndPassword[language]}</Text>
      </View>
      <View style={styles.selectList}>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          placeholder={language}
          save="value"
          onSelect={() => setlanguage(selected)}
          label="Languages"
        />
      </View>
      <View style={styles.textInputsView}>
        <Text style={{ left: 15, fontSize: 26 }}>{screenContent.UserName[language]}</Text>
        <TextInput style={styles.textInputs} placeholder={screenContent.UserName[language]} keyboardAppearance='dark' autoCapitalize='none' />
        <Text style={{ left: 15, fontSize: 26 }}>{screenContent.Password[language]}</Text>
        <TextInput style={styles.textInputs} placeholder={screenContent.Password[language]} keyboardAppearance='dark' autoCapitalize='none' secureTextEntry />
      </View>
      <View style={styles.loginButton}>
        <TouchableOpacity onPress={() => {

        }}

        >
          <Text style={styles.loginText}>{screenContent.Login[language]}</Text>
        </TouchableOpacity>
      </View>
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
  loginButton: {
    width: 281,
    height: 62,
    marginTop: 50,
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  loginText: {
    color: "white",
    fontSize: 36
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
    width: 134,
    height: 68,
    top: 40,
    alignSelf: "center"
  },
  selectList: {
    width: "20%",
    left: 12,
    top: 250,
    position: "absolute",
    zIndex: 1,
    backgroundColor: "white"
  }
});
