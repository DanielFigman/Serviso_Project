import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Image, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import LanguageSelect from '../../FCComponents/LanguageSelect';
import ButtonMain, { ButtonText } from '../../FCComponents/Buttons';
import ScreenComponent from '../../FCComponents/ScreenComponent';
import { HotelsAppContext } from '../../Context/HotelsAppContext';
import Languages from '../../Json_files/Languages';

const LoginScreen = () => {

  const {
    language,
    setlanguage,
    setIsLoading,
    setUser,
    setOrder,
    setActivities_nearBy,
    setActivities_hotel,
    setFacilities,
    setCustom_Request_Types,
    setTherapies,
    setHotel,
    setFood,
    setRetrivedNtoken
  } = useContext(HotelsAppContext)


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
          setUser({ email, fName: object.fName, sName: object.sName, gender: object.gender, phone: object.phone, dateOfBirth: object.dateOfBirth });
          setRetrivedNtoken(object.Ntoken ? object.Ntoken : null)
          setOrder({ orderID: object.orderID, checkInDate: object.checkInDate, checkOutDate: object.checkOutDate, hotelID: object.hotelID });
          setActivities_nearBy(object.activities_nearBy);
          setActivities_hotel(object.activities_hotel);
          setFacilities(object.facilities);
          setCustom_Request_Types(object.custom_Request_Types);
          setTherapies(object.therapies);
          setHotel(object.hotel)
          setlanguage(object.languageShortName)
          setFood(object.food)
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
