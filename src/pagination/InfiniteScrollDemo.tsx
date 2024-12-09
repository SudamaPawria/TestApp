import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

// Define the type for each post item
interface Post {
  id: number;
  title: string;
  body: string;
}

const InfiniteScrollDemo: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Function to fetch more posts from the API using axios
  const fetchPosts = async () => {
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
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial posts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Render each post
  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.body}</Text>
    </View>
  );

  // Render a loading spinner when fetching more posts
  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} />;
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={fetchPosts}
      onEndReachedThreshold={0.5} // Trigger fetching when half of the list remains
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
});

export default InfiniteScrollDemo;
