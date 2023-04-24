import React, { useLayoutEffect, useState } from 'react'
import BottomMenu from '../../FCComponents/BottomMenu';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';

// stack/screens
import ServisoScreenStack from '../TabMenu/ServisoScreenStack'
import SearchStackPage from '../TabMenu/SearchStackPage';
import ChatScreen from '../TabMenu/ChatScreen';
import PersonalPageStack from '../TabMenu/PersonalPageStack';


const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);


  
  return (
    <>
      <Tab.Navigator tabBar={props => <BottomMenu {...props} />} >
        <Tab.Screen name="ServisoScreenStack" component={ServisoScreenStack} />
        <Tab.Screen name="SearchStackPage" component={SearchStackPage}/>
        <Tab.Screen name="ChatScreen" component={ChatScreen}/>
        <Tab.Screen name="PersonalPageStack" component={PersonalPageStack}/>
      </Tab.Navigator>
    </>
  )
}

export default MainScreen
