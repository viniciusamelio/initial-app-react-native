import "reflect-metadata";
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/home/home';
import { injections } from "./src/core/di";



export default function App() {

  const Stack = createNativeStackNavigator();
  injections();
  return (
    <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
                name="Home"
                  component={HomeScreen}
                  options={{ headerShown: false }}/>
        </Stack.Navigator>
    </NavigationContainer>
    
  )
}



