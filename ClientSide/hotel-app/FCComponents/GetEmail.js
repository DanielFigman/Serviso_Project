import { View, Text } from 'react-native'
import React, { useState } from 'react'
import VerificationCode from './VerificationCode'

const GetEmail = () => {

  const [emailSucceed, setemailSucceed] = useState(true)

  return (
    <View>
      {
        emailSucceed
          ?
          <VerificationCode />
          :
          <Text>Hello</Text>
      }
    </View>

  )
}

export default GetEmail