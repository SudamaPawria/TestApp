import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUserContext } from './context';

interface SidebarProps {}

export function Sidebar({}: SidebarProps) {
  const user = useUserContext();

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.subscription}>
        Subscription Status: {user.isSubscribed ? 'Active' : 'Inactive'}
      </Text>
    </View>
  );
}

interface ProfileProps {}

export function Profile({}: ProfileProps) {
  const user = useUserContext();

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subscription: {
    fontSize: 16,
    color: 'gray',
  },
});
