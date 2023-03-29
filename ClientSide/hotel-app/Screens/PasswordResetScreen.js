import { View, Text, SafeAreaView } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Languages from '../Json files/Languages';

const PasswordResetScreen = () => {



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

  const screenContent = Languages.PasswordResetScreen;

  const { language, setlanguage } = useContext(HotelsAppContext)



  return (
   <SafeAreaView>
    <Text></Text>
   </SafeAreaView>
  )
}

export default PasswordResetScreen