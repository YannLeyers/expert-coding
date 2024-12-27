import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: '#000', // Set the color of inactive icons
        headerShown: true, // Show header
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#F95530', // Set the background color of the footer
          borderTopWidth: 2, // Add a 2px thick border
          borderTopColor: '#000', // Set the border color to black
        },
        headerStyle: {
          backgroundColor: '#F95530', // Set the background color of the header
          height: 137, // Set the height of the header
          borderBottomWidth: 2, // Add a 2px thick border to the bottom
          borderBottomColor: '#000', // Set the border color to black
        },
        headerTintColor: '#000', // Set the color of the header text and icons
        headerTitleStyle: {
          fontFamily: Platform.OS === 'ios' ? 'Vollkorn' : 'Vollkorn', // Set the font family of the header title
          fontWeight: 'bold', // Set the font weight of the header title
          fontSize: 40, // Set the font size of the header title
          marginTop: 60, // Add a 20px margin to the left of the header title
        },
        headerTitleAlign: 'left', // Align the header title to the left
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '', // Remove title from tab bar
          headerTitle: 'Records', // Set header title
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused
                ? require('@/assets/images/home-active.png')  // Active icon (filled)
                : require('@/assets/images/home-inactive.png')} // Inactive icon (unfilled)
              style={{ width: 26, height: 26, tintColor: color, marginTop: 25 }} // Adjust size and color
            />
          ),
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: '', // Remove title from tab bar
          headerTitle: 'Collection', // Set header title
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused
                ? require('@/assets/images/record-active.png')  // Active icon (filled)
                : require('@/assets/images/record-inactive.png')} // Inactive icon (unfilled)
              style={{ width: 26, height: 26, tintColor: color, marginTop: 25 }} // Adjust size and color
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: '', // Remove title from tab bar
          headerTitle: 'Wishlist', // Set header title
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused
                ? require('@/assets/images/bookmark-active.png')  // Active icon (filled)
                : require('@/assets/images/bookmark-inactive.png')} // Inactive icon (unfilled)
              style={{ width: 18, height: 24, tintColor: color, marginTop: 25 }} // Adjust size and color
            />
          ),
        }}
      />
    </Tabs>
  );
}