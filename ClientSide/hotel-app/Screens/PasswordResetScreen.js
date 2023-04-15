import { useContext, useEffect, useState } from 'react';
import { HotelsAppContext } from '../Context/HotelsAppContext';
import GetEmail from '../FCComponents/GetEmail';
import ResetPassword from '../FCComponents/ResetPassword';
import ScreenComponent from '../FCComponents/ScreenComponent';
import VerificationCode from '../FCComponents/VerificationCode';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const PasswordResetScreen = () => {
  const navigation = useNavigation();

  const { language, setlanguage } = useContext(HotelsAppContext)
  const [emailToReset, setEmailToReset] = useState("")
  const [verificationSucceed, setVerificationSucceed] = useState(false)
  const [code, setCode] = useState(null)
  const [isResetSucceed, setIsResetSucceed] = useState(null)

  useEffect(() => {
    if(isResetSucceed){
      showSucceedAlert();
    }

  }, [isResetSucceed])

  const showSucceedAlert = () => {
    Alert.alert(
        "Password reset succeed",
        `for ${emailToReset}`,
        [{ text: 'OK', onPress: () => navigation.navigate("LoginScreen")}],
    );
}

  return (
    <ScreenComponent topLeftButton="cancel" cancelNavigation="LoginScreen"
      content={
        !emailToReset
          ?
          <GetEmail setEmailToReset={setEmailToReset} language={language} setCode={setCode} />
          :
          !verificationSucceed
            ?
            <VerificationCode language={language} email={emailToReset} setVerificationSucceed={setVerificationSucceed} code={code} />
            :
            <ResetPassword language={language} email={emailToReset} setIsResetSucceed={setIsResetSucceed} />
      }
    />
  )
}

export default PasswordResetScreen