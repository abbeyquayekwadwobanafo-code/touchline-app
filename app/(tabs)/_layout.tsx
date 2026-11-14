import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background, borderBottomWidth: 1, borderBottomColor: COLORS.border },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: { fontWeight: '800', letterSpacing: 0.5 },
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'MATCHDAY',
          tabBarLabel: 'Matchday',
          tabBarIcon: ({ color, size }: any) => (
            <Ionicons name="football" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="trivia"
        options={{
          title: 'TRIVIA ARENA',
          tabBarLabel: 'Trivia',
          tabBarIcon: ({ color, size }: any) => (
            <Ionicons name="trophy" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="duels"
        options={{
          title: 'H2H DUELS',
          tabBarLabel: 'Duels',
          tabBarIcon: ({ color, size }: any) => (
            <Ionicons name="flash" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'MANAGER PROFILE',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }: any) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
