import React, { useEffect, useRef, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

interface DemoProps {}

const UseRefCount = (props:DemoProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  const handleIncrement = () => {
    setCount(count + 1);
    countRef.current++;

    console.log("State:", count);
    console.log("Ref:", countRef.current);
  };

  return (
    <View style={styles.container}>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={handleIncrement} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UseRefCount;
