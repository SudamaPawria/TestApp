import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const userIds = [1, 2];

const UseLayoutEffct = () => {
  const [userId, setUserId] = useState(userIds[0]);
  const [isAdmin, setIsAdmin] = useState(false);

  // This artificially slows down rendering
  let now = performance.now();
  while (performance.now() - now < 200) {
    // Do nothing for a bit...
  }

  useLayoutEffect(() => {
    setIsAdmin(userId === userIds[0]);
  }, [userId]);

  const handleChange = () => {
    const otherId = userIds.find((id) => id !== userId)!;
    setUserId(otherId);
  };

  return (
    <View style={styles.container}>
      <Text>userId: {userId}</Text>
      <Text>Admin: {isAdmin ? 'Yes' : 'No'}</Text>
      <Button title='Change User' onPress={handleChange} />
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

export default UseLayoutEffct;
