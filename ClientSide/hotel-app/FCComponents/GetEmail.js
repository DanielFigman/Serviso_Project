import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import VerificationCode from './VerificationCode';
import ScreenComponent from './ScreenComponent';
import Languages from '../Json_files/Languages';
import ButtonMain from './Buttons';
import axios from 'axios';
import { HotelsAppContext } from '../Context/HotelsAppContext';

const GetEmail = ({ setEmailToReset, language, setCode }) => {

  const { setIsLoading } = useContext(HotelsAppContext)

  const screenContent = Languages.GetEmailComp;
  const [givenEmail, setGivenEmail] = useState(null);


  const showErrAlert = (error) => {
    Alert.alert(
        "Email Verification Failed",
        `${error}`,
        [{ text: 'OK'}],
    );
}

  const checkEmailSucceed = () => {
    setIsLoading(true);

    const url = "http://proj.ruppin.ac.il/cgroup97/test2/api/EmailVerification?email=" + encodeURIComponent(givenEmail);
    console.log(url)

    axios.get(url)
      .then((res) => {
        if (res) {
          setEmailToReset(givenEmail);
          setCode(res.data)
        }
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          console.log("Error status code:", err.response.status);
          if(err.response.data){
            console.log("Error type:", err.response.data.type);
            console.log("Error message:", err.response.data.message);

            if(err.response.data.type === "NonExistingUser"){
              showErrAlert(err.response.data.message);
            }
          }
        } else if (err.request) {
          console.log("Request error:", err.request);
        } else {
          console.log("Error message:", err.message);
        }
        setIsLoading(false);
      });

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