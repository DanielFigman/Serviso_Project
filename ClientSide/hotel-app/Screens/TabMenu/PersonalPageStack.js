import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import PersonalPageScreen from '../PersonalStack/PersonalPageScreen';
import CheckInScreen from '../PersonalStack/CheckInScreen';
import CheckOutScreen from '../PersonalStack/CheckOutScreen';
import PaymentScreen from '../PersonalStack/PaymentScreen';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const PersonalPageStack = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);
      
    return (
        <Stack.Navigator>
            <Stack.Screen name="PersonalPageScreen" component={PersonalPageScreen} />
            <Stack.Screen name="CheckInScreen" component={CheckInScreen} />
            <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        </Stack.Navigator>
    )
}

export default PersonalPageStack