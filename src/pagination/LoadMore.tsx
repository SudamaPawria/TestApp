import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

// Define the type for each post item
interface Post {
  id: number;
  title: string;
  body: string;
}

const LoadMore = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Function to fetch posts from the API using axios
  const fetchPosts = async (page: number) => {
    if (loading || !hasMore) return; // Prevent extra fetches
    setLoading(true);

    try {
      const response = await axios.get<Post[]>(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const newPosts = response.data;

      if (newPosts.length === 0) {
        setHasMore(false); // No more posts to load
      } else {
        setData((prevData) => [...prevData, ...newPosts]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial posts
  useEffect(() => {
    fetchPosts(page);
  }, []);

  // Function to handle loading the next page
  const loadMore = () => {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      fetchPosts(newPage);
      return newPage;
    });
  };

  // Render each post
  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.body}</Text>
    </View>
  );

  // Render the footer with a "Load More" button or a loading spinner
  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator style={{ marginVertical: 20 }} />;
    }

    if (hasMore) {
      return (
        <Button title="Load More" onPress={loadMore} />
      );
    }

    return <Text style={styles.noMoreText}>No more posts to load</Text>;
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  noMoreText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default LoadMore;
