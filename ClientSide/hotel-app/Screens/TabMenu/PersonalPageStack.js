import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import PersonalPageScreen from "../PersonalStack/PersonalPageScreen";
import CheckOutScreen from "../PersonalStack/CheckOutScreen";
import PaymentScreen from "../PersonalStack/PaymentScreen";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewCheckInScreen from "../PersonalStack/NewCheckInScreen";
import PaymentConfirmation from "../PersonalStack/PaymentConfirmation";
import HotelNavigation from "../PersonalStack/HotelNavigation";
import CustomRequestScreen from "../PersonalStack/CustomRequestScreen";
import RoomCleaningScreen from "../PersonalStack/RoomCleaningScreen";
import CustomOrderConfirmation from "../PersonalStack/CustomOrderConfirmation";
import Setting from "../PersonalStack/PersonalPageScreen";

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
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="PersonalPageScreen" component={PersonalPageScreen} /> */}

      <Stack.Screen name="NewCheckInScreen" component={NewCheckInScreen} />
      {/* <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} /> */}
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen
        name="PaymentConfirmation"
        component={PaymentConfirmation}
      />
      <Stack.Screen name="HotelNavigation" component={HotelNavigation} />
      <Stack.Screen
        name="CustomRequestScreen"
        component={CustomRequestScreen}
      />
      <Stack.Screen name="RoomCleaningScreen" component={RoomCleaningScreen} />
      <Stack.Screen
        name="CustomOrderConfirmation"
        component={CustomOrderConfirmation}
      />
    </Stack.Navigator>
  );
};

export default PersonalPageStack;
