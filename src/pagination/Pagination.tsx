// screens/HomeScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Template from './Template';

interface Post {
  id: number;
  title: string;
  body: string;
}

const Pagination = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      setData(response.data);
      setTotalPages(10); // Total pages can be derived from the API response or headers if available
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      <Template currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make sure this takes up the available space
    paddingHorizontal: 0,
  },
  item: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default Pagination;
