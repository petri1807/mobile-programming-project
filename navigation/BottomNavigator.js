import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import ActivityScreen from '../screens/ActivityScreen';
import CalendarScreen from '../screens/CalendarScreen';
import FloorBallScreen from '../screens/FloorBallScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          // tabBarColor: 'blue',
        }}
      />
      <Tab.Screen
        name="Sports"
        component={FloorBallScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="hockey-sticks"
              color={color}
              size={26}
            />
          ),
          // tabBarColor: 'green',
        }}
      />
      <Tab.Screen
        name="Work"
        component={ActivityScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clock-outline"
              color={color}
              size={26}
            />
          ),
          // tabBarColor: 'red',
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
          // tabBarColor: 'black',
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
          // tabBarColor: 'tomato',
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
