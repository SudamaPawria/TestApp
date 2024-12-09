// components/Pagination.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Template = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={currentPage === 1}
        onPress={() => onPageChange(currentPage - 1)}
        style={[styles.button, currentPage === 1 && styles.disabledButton]}
      >
        <Text style={styles.text}>P</Text>
      </TouchableOpacity>
      {[...Array(totalPages).keys()].map((page) => (
        <TouchableOpacity
          key={page + 1}
          onPress={() => onPageChange(page + 1)}
          style={[
            styles.button, currentPage === page + 1 && styles.activeButton
          ]}
        >
          <Text style={styles.text}>{page + 1}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        disabled={currentPage === totalPages}
        onPress={() => onPageChange(currentPage + 1)}
        style={[styles.button, currentPage === totalPages && styles.disabledButton]}
      >
        <Text style={styles.text}>N</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    // Ensure no excessive height or padding that could affect layout
  },
  button: {
    marginHorizontal: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: '#007BFF',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  text: {
    color: '#000',
  },
});


export default Template;

// Creating an Array of a Given Length:
// Array(totalPages)
// This creates an array with totalPages number of empty slots. For example, if totalPages is 5, it creates [ , , , , ].
// console.log(Array(5)); // Output: [ , , , , ]

// Getting the Keys (Indices) of the Array:
// Array(totalPages).keys()
// The keys() method returns an iterator for the array’s keys (indices). For our example, it returns an iterator for [0, 1, 2, 3, 4].
// const keysIterator = Array(5).keys();
// console.log([...keysIterator]); // Output: [0, 1, 2, 3, 4]

// Spreading the Iterator into an Array:
// [...Array(totalPages).keys()]
// The spread operator (...) converts the iterator into an array. So, [...Array(5).keys()] becomes [0, 1, 2, 3, 4].
// const pagesArray = [...Array(5).keys()];
// console.log(pagesArray); // Output: [0, 1, 2, 3, 4]

