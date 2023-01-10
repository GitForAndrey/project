import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Filters from '../screens/Filters';
import AssignTags from '../screens/AthleteTopTab/AssignTags';
import { AthleteTopTab } from './topTabNav';
import { MainBottomTabs } from './bottomTabNav';

const Stack = createNativeStackNavigator();

export const MainStackNav = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={MainBottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Filters" component={Filters} options={{}} />
      <Stack.Screen name="Athlete" component={AthleteTopTab} options={{}} />
      <Stack.Screen name="AssignTags" component={AssignTags} />
    </Stack.Navigator>
  </NavigationContainer>
);
