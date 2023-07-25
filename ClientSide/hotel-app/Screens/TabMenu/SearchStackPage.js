import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import SearchScreen from '../SearchStack/SearchScreen'
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CardScreen from '../ServisoStack/CardScreen';

const SearchStackPage = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);

    return (
        <Stack.Navigator>
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="CardScreen" component={CardScreen} />
        </Stack.Navigator>
    )
}

export default SearchStackPage