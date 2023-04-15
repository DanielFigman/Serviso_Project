import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./Screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./Screens/WelcomeScreen";
import HotelsAppContextProvider from "./Context/HotelsAppContext";
import PasswordResetScreen from "./Screens/PasswordResetScreen";
import CheckInScreen from "./Screens/CheckInScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import CheckOutScreen from "./Screens/CheckOutScreen";
import PersonalPageScreen from "./Screens/PersonalPageScreen";
import CraeteUser from "./Screens/CraeteUser";
import SpaTreatmenScreen from "./Screens/SpaTreatmenScreen";
import RoomProductsScreen from "./Screens/RoomProductsScreen";
import SearchScreen from "./Screens/SearchScreen";
import HealthDeclarationScreen from "./Screens/HealthDeclarationScreen";
import SpaConfirmationScreen from "./Screens/SpaConfirmationScreen";
import FeedbackScreen from "./Screens/FeedbackScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <HotelsAppContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SpaConfirmationScreen"
            component={SpaConfirmationScreen}
          />
          <Stack.Screen
            name="HealthDeclarationScreen"
            component={HealthDeclarationScreen}
          />
          <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
          <Stack.Screen
            name="PersonalPageScreen"
            component={PersonalPageScreen}
          />
          <Stack.Screen
            name="RoomProductsScreen"
            component={RoomProductsScreen}
          />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen
            name="SpaTreatmenScreen"
            component={SpaTreatmenScreen}
          />

          <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="CheckInScreen" component={CheckInScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="PasswordResetScreen"
            component={PasswordResetScreen}
          />
          <Stack.Screen name="CraeteUser" component={CraeteUser} />
        </Stack.Navigator>
      </NavigationContainer>
    </HotelsAppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
