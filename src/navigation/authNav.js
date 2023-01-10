import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

export const AuthTabs = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="LogIn">
      <Stack.Screen
        name="LogIn"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
