import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1a1a1a', '#2d2d2d', '#3a3a3a', '#2d2d2d', '#1a1a1a']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.8 }}
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'rgba(26, 26, 26, 0.95)',
            borderTopColor: '#333',
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#888',
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'ティア表',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="grid" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: '履歴',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="time" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: '設定',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}