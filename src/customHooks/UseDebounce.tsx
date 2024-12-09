import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { faker } from '@faker-js/faker';

// SearchBar Component
interface SearchBarProps {
  onChange: (value: string) => void;
}

const SearchBar = ({ onChange }:SearchBarProps) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Search users"
      onChangeText={onChange}
    />
  );
};

// useDebounce Hook
export const useDebounce = <T,>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

// Demo Component
export interface User {
  id: number;
  name: string;
}

const fetchUsers = async (search: string): Promise<User[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
};

const users: User[] = Array(1000)
  .fill(0)
  .map((_, i) => ({
    id: i,
    name: faker.person.fullName(),
  }));

const UseDebounce = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [usersList, setUsersList] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);

      const fetchedUsers = await fetchUsers(debouncedSearch);
      setUsersList(fetchedUsers);

      setLoading(false);
    };

    loadUsers();
  }, [debouncedSearch]);

  return (
    <View style={styles.container}>
      <SearchBar onChange={setSearch} />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={usersList}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => <Text style={styles.user}>{item.name}</Text>}
        />
      )}
    </View>
  );
};

export default UseDebounce;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  user: {
    fontSize: 18,
    paddingVertical: 10,
  },
});
