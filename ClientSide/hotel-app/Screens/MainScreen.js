import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ScreenComponent from '../FCComponents/ScreenComponent'

const MainScreen = () => {

  const [showServisoScreen, setShowServisoScreen] = useState(true)
  const [showSearchScreen, setShowSearchScreen] = useState(false)
  const [showChatScreen, setShowChatScreen] = useState(false)
  const [showPersonalScreen, setShowPersonalScreen] = useState(false)

  return (
    <ScreenComponent />
  )
}

export default MainScreen