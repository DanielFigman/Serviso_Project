import React, { useLayoutEffect, useState } from 'react'
import BottomMenu from '../../FCComponents/BottomMenu';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';

// stack/screens
import ServisoScreenStack from '../TabMenu/ServisoScreenStack'
import SearchStackPage from '../TabMenu/SearchStackPage';
import ChatScreen from '../TabMenu/ChatScreen';
import PersonalPageStack from '../TabMenu/PersonalPageStack';
import PushPage from '../../Firebase/PushPage';
import SSEComponent from '../../Firebase/SSEComponent';
import { useFocusEffect } from '@react-navigation/core';
import { BackHandler } from 'react-native';


const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const route = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (route.name === "MainScreen") {
          return true; // Return true to indicate that the back action is handled
        } else {
          return false; // Allow the default back navigation
        }
      };

      // Add the event listener for the back button press
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        // Remove the event listener when the screen loses focus or unmounts
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [navigation, route])
  );
  return (
    <>
      <>
        <Tab.Navigator tabBar={props => <BottomMenu {...props} />} >
          <Tab.Screen name="ServisoScreenStack" component={ServisoScreenStack} />
          <Tab.Screen name="SearchStackPage" component={SearchStackPage} />
          <Tab.Screen name="ChatScreen" component={ChatScreen} />
          <Tab.Screen name="PersonalPageStack" component={PersonalPageStack} />
        </Tab.Navigator>
      </>
      <>
        <PushPage />
        <SSEComponent />
      </>
    </>
  )
}

export default MainScreen