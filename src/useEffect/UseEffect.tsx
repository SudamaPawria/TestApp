import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface DemoProps {}

const UseEffect = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // The code that we want to run
    console.log('The count is:', count);

    // Optional return function for cleanup
    return () => {
      console.log('I am being cleaned up!');
    };
  }, [count]); // The dependency array

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Count: {count}</Text>
      <Button title="Decrement" onPress={() => setCount(count - 1)} />
      <Button title="Increment" onPress={() => setCount(count + 1)} />
    </View>
  );
};

export default UseEffect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
  },
});
