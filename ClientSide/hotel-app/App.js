import { StyleSheet} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HotelsAppContextProvider from "./Context/HotelsAppContext";

//screens
import WelcomeScreen from "./Screens/MainStack/WelcomeScreen";
import LoginScreen from "./Screens/MainStack/LoginScreen";
import PasswordResetScreen from "./Screens/MainStack/PasswordResetScreen";
import CreateUserScreen from "./Screens/MainStack/CreateUserScreen";
import MainScreen from "./Screens/MainStack/MainScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <HotelsAppContextProvider>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="PasswordResetScreen"
            component={PasswordResetScreen}
          />
          <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} />
          <Stack.Screen name="MainScreen" component={MainScreen} />



          {/* <Stack.Screen name="ChatScreen" component={ChatScreen} /> */}
          {/* <Stack.Screen name="ServisoScreen" component={ServisoScreen} /> */}

          {/* <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} /> */}
          {/* <Stack.Screen name="PaymentScreen" component={PaymentScreen} /> */}
          {/* <Stack.Screen name="CheckInScreen" component={CheckInScreen} /> */}

          {/* <Stack.Screen
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
          /> */}
          {/* <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen
            name="SpaTreatmenScreen"
            component={SpaTreatmenScreen}
          /> */}
          
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
