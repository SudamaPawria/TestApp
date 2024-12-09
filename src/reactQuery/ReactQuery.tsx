import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


import { addTodo, fetchTodos } from './api';
import TodoCard from './components/TodoCard';

export default function ReactQuery() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos', { search }],
    queryFn: () => fetchTodos(search),
    staleTime: Infinity,
    // cacheTime: 0,
  });

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        placeholder="Enter Todo"
        onChangeText={setTitle}
      />
      <Button
        title="Add Todo"
        onPress={async () => {
          try {
            await addTodoMutation({ title });
            setTitle('');
          } catch (e) {
            console.error(e);
          }
        }}
      />
      
      {/* Rendering the todos */}
      <FlatList
        data={todos}
        keyExtractor={(todo) => todo.id.toString()}
        renderItem={({ item }) => <TodoCard todo={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
