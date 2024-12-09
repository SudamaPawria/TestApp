import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Profile, Sidebar } from './Components';

interface DashboardProps {}

export default function Dashboard({}: DashboardProps) {
  return (
    <View style={styles.container}>
      <Sidebar />
      <Profile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
