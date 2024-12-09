import React, { useEffect, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface DemoProps {}

export const UseRefFocus = (props:DemoProps) => {
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Type something..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
});

export default UseRefFocus;
