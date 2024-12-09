import React, { useCallback } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const UseFocusEffect = () => {
  useFocusEffect(
    useCallback(() => {
      Alert.alert("Component Focused", "The component is now in focus!");

      // Cleanup function if needed
      return () => {
        console.log("Component unfocused");
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text>Focus Alert Demo</Text>
      <Button title="Press me" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UseFocusEffect;
// component should be part of navigation container to get this effect
// I used useCallback to ensure that the function passed to useFocusEffect is memoized. This means that the function reference remains the same between renders unless its dependencies change. Here’s why this is beneficial:

// Performance Optimization: By memoizing the function, we avoid unnecessary re-creations of the function on every render. This can help with performance, especially if the function is passed down to child components or used in hooks that 
// depend on stable function references.
// Dependency Management: useCallback helps in managing dependencies more effectively. In the case of useFocusEffect, it ensures that the effect only re-runs if the dependencies change. Since we passed an empty dependency array ([]), 
// the effect will only run once when the component mounts and when it unmounts.
// useCallback wraps the function to memoize it.