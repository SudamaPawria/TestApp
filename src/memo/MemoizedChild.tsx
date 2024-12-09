import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Child component that displays text
const MemoizedChild = React.memo(({ label }: { label: string }) => {
  console.log('Child component re-rendered');
  return (
    <View style={styles.box}>
      <Text>{label}</Text>
    </View>
  );
});

// Parent component
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [text] = useState('Hello, World!');

  return (
    <View style={styles.container}>
      <MemoizedChild label={text} />
      <Button title="Increment Counter" onPress={() => setCount(count + 1)} />
      <Text>Counter: {count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    padding: 10,
    backgroundColor: 'lightblue',
    marginBottom: 10,
  },
});

export default ParentComponent;


// The MemoizedChild component is wrapped with React.memo, which means it will only re-render when the props passed to it (label in this case) change.
// In the ParentComponent, when the button is pressed, it updates the state count, which causes the parent component to re-render.
// However, the MemoizedChild will not re-render because its props (label) haven’t changed.