import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { decrement, increment, incrementByAmount, incrementAsync } from '../state/counter/counterSlice';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>{count}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(incrementAsync(10))}
        >
          <Text style={styles.buttonText}>Increment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(decrement())}
        >
          <Text style={styles.buttonText}>Decrement</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 32,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Counter;
