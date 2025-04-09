import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AgregarActividadScreen from './screens/AgregarActividadScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AgregarActividad" component={AgregarActividadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}