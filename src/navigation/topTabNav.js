import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Detail from '../screens/AthleteTopTab/Detail';
import Eval from '../screens/AthleteTopTab/Eval';
import Profile from '../screens/AthleteTopTab/Profile';
import Roster from '../screens/AthleteTopTab/Roster';
import Sched from '../screens/AthleteTopTab/Sched';
import Video from '../screens/AthleteTopTab/Video';
import COLORS from '../data/colors';

const TabTop = createMaterialTopTabNavigator();

export const AthleteTopTab = () => (
  <TabTop.Navigator
    initialRouteName="Eval"
    screenOptions={{
      tabBarLabelStyle: {
        fontSize: 10,
        fontWeight: 'bold',
      },
      tabBarIndicatorStyle: {
        backgroundColor: COLORS.mainBlue,
      },
      tabBarActiveTintColor: COLORS.mainBlue,
      tabBarInactiveTintColor: COLORS.gray,
      tabBarPressColor: 'transparent',
      tabBarStyle: { backgroundColor: 'transparent', height: 44 },
    }}>
    <TabTop.Screen name="Eval" component={Eval} />
    <TabTop.Screen name="Sched" component={Sched} />
    <TabTop.Screen name="Roster" component={Roster} />
    <TabTop.Screen name="Detail" component={Detail} />
    <TabTop.Screen name="Profile" component={Profile} />
    <TabTop.Screen name="Video" component={Video} />
  </TabTop.Navigator>
);
