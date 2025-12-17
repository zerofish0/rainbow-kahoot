import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack } from 'expo-router';
import { Tabs } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabLayout() {
  return (
   <Tabs   screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: 'magenta',
    tabBarInactiveTintColor: '#4c4950',
    tabBarStyle: { backgroundColor: '#202b46' },
    tabBarLabelStyle: { fontSize: 14 },
    animationEnabled: true, // ça active les animations sur iOS et Android
    }}
    >
      <Tabs.Screen
        name="quizid"
        options={{ title: 'QuizID', tabBarIcon: ({ color }) => <FontAwesome6 size={24} name="rainbow" color={color} /> }}
      />
      <Tabs.Screen
        name="search"
        options={{ title: 'Search Engine', tabBarIcon: ({ color }) => <FontAwesome6 size={24} name="searchengin" color={color} />}}
      />
    </Tabs>
  );
}