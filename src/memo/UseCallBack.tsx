import React, { useCallback, useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';

const allUsers = ['john', 'alex', 'george', 'simon', 'james'];

// Shuffle function
const shuffle = (array: string[]) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array.slice(); // Return a new shuffled array (not mutating original)
};

interface DemoProps {}

const UseCallback = () => {
  const [users, setUsers] = useState<string[]>(allUsers);

  const handleSearch = useCallback(
    (text: string) => {
      console.log(users[0]);

      const filteredUsers = allUsers.filter((user) =>
        user.includes(text)
      );
      setUsers(filteredUsers);
    },
    [users]
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Button title="Shuffle" onPress={() => setUsers(shuffle(allUsers))} />

        <Search onChange={handleSearch} />
      </View>

      <FlatList
        data={users}
        keyExtractor={(user) => user}
        renderItem={({ item }) => <Text style={styles.user}>{item}</Text>}
      />
    </View>
  );
};

export default UseCallback;

interface SearchProps {
  onChange: (text: string) => void;
}

const Search = React.memo(({ onChange }:SearchProps) => {
  console.log('Search rendered!');

  return (
    <TextInput
      style={styles.input}
      placeholder="Search users..."
      onChangeText={(text) => onChange(text)}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginLeft: 10,
    flex: 1,
    borderRadius: 5,
  },
  user: {
    fontSize: 18,
    padding: 10,
  },
});
