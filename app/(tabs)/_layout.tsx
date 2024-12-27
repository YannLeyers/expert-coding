import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Image } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '', // Remove title
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
          title: '', // Remove title
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
          title: '', // Remove title
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
      <Tabs.Screen
        name="explore"
        options={{
          title: '', // Remove title
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused
                ? require('@/assets/images/profile-active.png')  // Active icon (filled)
                : require('@/assets/images/profile-inactive.png')} // Inactive icon (unfilled)
              style={{ width: 22, height: 26, tintColor: color, marginTop: 25 }} // Adjust size and color
            />
          ),
        }}
      />
    </Tabs>
  );
}