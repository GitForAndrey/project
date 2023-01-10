import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tab1 from '../screens/Tab1';
import Tab2 from '../screens/Tab2';
import Tab3 from '../screens/Tab3';
import Tab4 from '../screens/Tab4';
import Tab5 from '../screens/Tab5';
import COLORS from '../data/colors';

const Tab = createBottomTabNavigator();

export const MainBottomTabs = () => (
  <Tab.Navigator
    initialRouteName={'Tab1'}
    screenOptions={{
      tabBarActiveTintColor: COLORS.mainBlue,
      tabBarInactiveTintColor: COLORS.gray,
      headerShown: false,
      tabBarLabelStyle: { fontSize: 14 },
    }}>
    <Tab.Screen
      name="Tab1"
      component={Tab1}
      options={{
        title: 'Schedule',
        tabBarIcon: ({ color }) => (
          <Icon name="list-outline" size={32} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Tab2"
      component={Tab2}
      options={{
        title: 'Recruits',
        tabBarIcon: ({ color }) => (
          <Icon name="list-outline" size={32} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Tab3"
      component={Tab3}
      options={{
        title: 'Roster',
        tabBarIcon: ({ color }) => (
          <Icon name="list-outline" size={32} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Tab4"
      component={Tab4}
      options={{
        title: 'Teams',
        tabBarIcon: ({ color }) => (
          <Icon name="list-outline" size={32} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Tab5"
      component={Tab5}
      options={{
        title: 'Matchups',
        tabBarIcon: ({ color }) => (
          <Icon name="list-outline" size={32} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);
