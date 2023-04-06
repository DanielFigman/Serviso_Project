import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import VerificationCode from './VerificationCode'
import ScreenComponent from './ScreenComponent'
import Languages from '../Json files/Languages'
import ButtonMain from './Buttons'
import verifyEmail from '../Hooks/useFetch'
import axios from 'axios'

const GetEmail = ({ setEmailToReset, setEmailSucceed, language }) => {

  const screenContent = Languages.GetEmailComp;
  const [givenEmail, setGivenEmail] = useState(null)

  const checkEmailSucceed = () => {
    const url = "http://proj.ruppin.ac.il/cgroup97/test1/api/EmailVerification?email=" + encodeURIComponent(givenEmail);
    console.log(url)

    axios.get(url)
      .then((res) => {
        console.log("OK", res)
        setEmailToReset(givenEmail);
      })
      .catch((err) => {
        console.log("error", err)
      })

  }

  return (
    <View>
      <Text style={styles.largeText}>{screenContent.EmailVerification[language]}</Text>
      <Text style={styles.smallText}>{screenContent.EnterYourEmail[language]}</Text>
      <View style={styles.textInputsView}>
        <Text style={{ left: 15, fontSize: 26 }}>{screenContent.Email[language]}</Text>
        <TextInput style={styles.textInputs} placeholder={screenContent.Email[language]} keyboardAppearance='dark' autoCapitalize='none' onChangeText={text => setGivenEmail(text)} />
      </View>
      <ButtonMain text={screenContent.Continue[language]} buttonStyle={{ marginTop: 50 }}
        onPress={checkEmailSucceed} />
    </View>
  )
}

export default GetEmail

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
    borderRadius: 10
  },
  textInputsView: {
    marginTop: 70
  }
}); 