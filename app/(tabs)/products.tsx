// import React, { useState, useEffect } from 'react';

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import axios from 'axios';

interface Product {
  userId: number;
  id: number;
  title: string;
  body: string;
  username: string; 
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('')
  useEffect(() => {
    checkAuthentication();
    fetchProducts();
  }, []);

  const checkAuthentication = () => {
    // Check if user is authenticated in session storage
    const authenticatedUser = sessionStorage.getItem('authenticatedUser');
    const storedUsername = sessionStorage.getItem('username');

    if (authenticatedUser) {
      setAuthenticated(true);
      setUsername(storedUsername)
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('https://jsonplaceholder.typicode.com/posts');
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleLogout = () => {
    // Clear session storage data or change authentication status to false
    sessionStorage.removeItem('authenticatedUser');
    sessionStorage.removeItem('username');
    setAuthenticated(false);
  };

  if (!authenticated) {
    return (
      <View style={styles.container}>
        <Text>You are not authenticated. Please login to view products.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
    <Button title="Logout" onPress={handleLogout} />

      {products.map((product) => (
        <View key={product.id} style={styles.productContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.body}>{product.body}</Text>
          <Text style={styles.username}>username: {username}</Text> 
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productContainer: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
  },
  username: {
    fontSize: 12,
    fontStyle: 'italic',
    color: 'green',
  },
});

export default Products;
