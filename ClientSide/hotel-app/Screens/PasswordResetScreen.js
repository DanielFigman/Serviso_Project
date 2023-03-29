import { View, Text, SafeAreaView } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Languages from '../Json files/Languages';
import VerificationCode from '../FCComponents/VerificationCode';
import { HotelsAppContext } from '../Context/HotelsAppContext';

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
    <VerificationCode />
  )
}

export default PasswordResetScreen