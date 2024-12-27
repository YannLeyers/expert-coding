import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Index from './(tabs)/index';
import Album from './album'; // Import the Album component

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Album" component={Album} /> {/* Register the Album screen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}