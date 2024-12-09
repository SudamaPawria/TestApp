import React, { useMemo, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface Item {
  id: number;
  isSelected: boolean;
}

const initialItems: Item[] = new Array(29_999_999).fill(0).map((_, i) => {
  return {
    id: i,
    isSelected: i === 29_999_998,
  };
});

const UseMemo = () => {
  const [count, setCount] = useState<number>(0);
  const [items] = useState<Item[]>(initialItems);

  const selectedItem = useMemo( () => items.find((item) => item.isSelected), [ items]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Count: {count}</Text>
      <Text style={styles.text}>Selected Item: {selectedItem?.id}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
    </View>
  );
};

export default UseMemo;

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
