import React, { useReducer } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface State {
  count: number;
  error: string | null;
}

interface Action {
  type: 'increment' | 'decrement';
}

function reducer(state: State, action: Action): State {
  const { type } = action;

  switch (type) {
    case 'increment': {
      const newCount = state.count + 1;
      const hasError = newCount > 5;
      return {
        ...state,
        count: hasError ? state.count : newCount,
        error: hasError ? 'Maximum reached' : null,
      };
    }
    case 'decrement': {
      const newCount = state.count - 1;
      const hasError = newCount < 0;
      return {
        ...state,
        count: hasError ? state.count : newCount,
        error: hasError ? 'Minimum reached' : null,
      };
    }
    default:
      return state;
  }
}

export default function UseReducer() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    error: null,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.count}>Count: {state.count}</Text>
      {state.error && <Text style={styles.error}>{state.error}</Text>}
      <Button
        title="Increment"
        onPress={() => dispatch({ type: 'increment' })}
      />
      <View style={styles.spacer} />
      <Button
        title="Decrement"
        onPress={() => dispatch({ type: 'decrement' })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  count: {
    fontSize: 24,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  spacer: {
    height: 10,
  },
});
