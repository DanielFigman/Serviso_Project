import { useContext, useState } from 'react';
import { HotelsAppContext } from '../Context/HotelsAppContext';
import GetEmail from '../FCComponents/GetEmail';
import ResetPassword from '../FCComponents/ResetPassword';
import ScreenComponent from '../FCComponents/ScreenComponent';
import VerificationCode from '../FCComponents/VerificationCode';

const PasswordResetScreen = () => {
  const { language, setlanguage } = useContext(HotelsAppContext)
  const [emailToReset, setEmailToReset] = useState("")
  const [verificationSucceed, setVerificationSucceed] = useState(false)


  return (
    <ScreenComponent topLeftButton="cancel" cancelNavigation="LoginScreen"
      content={
        !emailToReset
          ?
          <GetEmail setEmailToReset={setEmailToReset} language={language}/>
          :
          !verificationSucceed
            ?
            <VerificationCode language={language} email={emailToReset} setVerificationSucceed={setVerificationSucceed}/>
            :
            <ResetPassword language={language} email={emailToReset}/>
      }
    />
  )
}

export default PasswordResetScreen