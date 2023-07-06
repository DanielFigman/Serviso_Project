import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedbackScreen from '../ServisoStack/FeedbackScreen';
import HealthDeclarationScreen from '../ServisoStack/HealthDeclarationScreen';
import SpaConfirmationScreen from '../ServisoStack/SpaConfirmationScreen';
import SpaTreatmenScreen from '../ServisoStack/SpaTreatmenScreen';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../ServisoStack/HomeScreen';
import ConciergeActivitiesScreen from '../ServisoStack/ConciergeActivitiesScreen';
import ConciergeMainScreen from '../ServisoStack/ConciergeMainScreen';
import HotelActivitiesScreen from '../ServisoStack/HotelActivitiesScreen';
import SpaMainScreen from '../ServisoStack/SpaMainScreen';
import CardScreen from '../ServisoStack/CardScreen';
import SpaOrder from '../ServisoStack/SpaOrder';
import QuestionaireScreen from '../ServisoStack/QuestionaireScreen';
import NearByScreen from '../ServisoStack/NearByScreen';
import RoomServiceMenu from '../ServisoStack/RoomServiceMenu';
import FavoritesScreen from '../ServisoStack/FavoritesScreen';
import RoomServiceMenuNew from '../ServisoStack/RoomServiceMenuNew';

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
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
      <Stack.Screen name="HealthDeclarationScreen" component={HealthDeclarationScreen} />
      <Stack.Screen name="SpaConfirmationScreen" component={SpaConfirmationScreen} />
      <Stack.Screen name="SpaTreatmenScreen" component={SpaTreatmenScreen} />
      <Stack.Screen name="ConciergeActivitiesScreen" component={ConciergeActivitiesScreen} />
      <Stack.Screen name="ConciergeMainScreen" component={ConciergeMainScreen} />
      <Stack.Screen name="HotelActivitiesScreen" component={HotelActivitiesScreen} />
      <Stack.Screen name="SpaMainScreen" component={SpaMainScreen}/>
      <Stack.Screen name="CardScreen" component={CardScreen} />
      <Stack.Screen name="SpaOrder" component={SpaOrder} />
      <Stack.Screen name="QuestionaireScreen" component={QuestionaireScreen} />
      <Stack.Screen name="NearByScreen" component={NearByScreen} />
      <Stack.Screen name="RoomServiceMenu" component={RoomServiceMenu} />
      <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <Stack.Screen name="RoomServiceMenuNew" component={RoomServiceMenuNew} />

    </Stack.Navigator>
  )
}

export default ServisoScreenStack