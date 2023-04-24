import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServisoScreen from '../ServisoStack/ServisoScreen'
import FeedbackScreen from '../ServisoStack/FeedbackScreen';
import HealthDeclarationScreen from '../ServisoStack/HealthDeclarationScreen';
import SpaConfirmationScreen from '../ServisoStack/SpaConfirmationScreen';
import SpaTreatmenScreen from '../ServisoStack/SpaTreatmenScreen';
import { useNavigation } from '@react-navigation/native';

const ServisoScreenStack = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);

    return (
        <Stack.Navigator>
            <Stack.Screen name="ServisoScreen" component={ServisoScreen} />
            <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
            <Stack.Screen name="HealthDeclarationScreen" component={HealthDeclarationScreen} />
            <Stack.Screen name="SpaConfirmationScreen" component={SpaConfirmationScreen} />
            <Stack.Screen name="SpaTreatmenScreen" component={SpaTreatmenScreen} />
        </Stack.Navigator>
    )
}

export default ServisoScreenStack