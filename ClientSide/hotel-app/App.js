import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './Screens/WelcomeScreen';
import HotelsAppContextProvider from './Context/HotelsAppContext';
import PasswordResetScreen from './Screens/PasswordResetScreen';
import CreateUserScreen from './Screens/CreateUserScreen';
import HomeScreen from './Screens/HomeScreen';
import ChatScreen from './Screens/ChatScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <HotelsAppContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}

          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen} />
          <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </HotelsAppContextProvider>
  );
}
