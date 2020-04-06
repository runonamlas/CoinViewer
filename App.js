import React from 'react';
import Home from './src/components/Home';
import Details from './src/components/Details';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import 'react-native-gesture-handler';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CoinViewer"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FF6D00',
          },
          headerTintColor: '#ffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="CoinViewer">
          {(props) => <Home {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Details"
          component={Details}
          options={({route}) => ({title: route.params.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
