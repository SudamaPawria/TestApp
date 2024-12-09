import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Todo } from '../entities/Todo';

interface TodoProps {
  todo: Todo;
}

export default function TodoCard({ todo }: TodoProps) {
  const [checked, setChecked] = useState(todo.completed);

  return (
    <View style={styles.todoCard}>
      <Text style={styles.title}>{todo.title}</Text>
      <Switch
        value={checked}
        onValueChange={(value) => setChecked(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  todoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 16,
  },
});
