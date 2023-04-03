import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './Screens/WelcomeScreen';
import HotelsAppContextProvider from './Context/HotelsAppContext';
import PasswordResetScreen from './Screens/PasswordResetScreen';
import CraeteUser from './Screens/CraeteUser';
import ServisoScreen from './Screens/ServisoScreen/ServisoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <HotelsAppContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="ServisoScreen" component={ServisoScreen} /> */}
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen} />
          <Stack.Screen name="CraeteUser" component={CraeteUser} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </HotelsAppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
