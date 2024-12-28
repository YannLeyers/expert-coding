import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Index from './(tabs)/index';
import Album from './album'; // Import the Album component
import Collection from './(tabs)/collection';  // Adjust the path accordingly

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Album" component={Album} /> {/* Register the Album screen */}
        <Stack.Screen name="Collection" component={Collection} /> {/* Register the Collection screen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}