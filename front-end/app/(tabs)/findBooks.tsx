import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for stars

const NewScreen = () => {

    const [searchQuery, setSearchQuery] = useState('');
  const books = [
    { id: '1', title: 'Book 1', author: 'Author A', rating: 4.5, imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '2', title: 'Book 2', author: 'Author B', rating: 3.8, imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '3', title: 'Book 3', author: 'Author C', rating: 4.2, imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '4', title: 'Book 4', author: 'Author D', rating: 5.0, imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '5', title: 'Book 5', author: 'Author E', rating: 3.5, imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '6', title: 'Book 6', author: 'Author F', rating: 4.0, imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
  ];

  const screenHeight = Dimensions.get('window').height;

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>Explore Books</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search books..."
        placeholderTextColor="gray"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.row}>
        <Text style={styles.genreTitle}>Genre #1</Text>
      </View>
      <ScrollView horizontal style={styles.booksRow} showsHorizontalScrollIndicator={false}>
        {books.map((book) => (
          <View key={book.id} style={styles.bookContainer}>
            <Image source={{ uri: book.imageUrl }} style={[styles.bookImage, { height: screenHeight * 0.20 }]} />
            <View style={styles.textContainer}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.author}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={14} color="black" />
                <Text style={styles.bookRating}>{book.rating.toFixed(1)}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.row}>
        <Text style={styles.genreTitle}>Genre #2</Text>
      </View>
      <ScrollView horizontal style={styles.booksRow} showsHorizontalScrollIndicator={false}>
        {books.map((book) => (
          <View key={book.id} style={styles.bookContainer}>
            <Image source={{ uri: book.imageUrl }} style={[styles.bookImage, { height: screenHeight * 0.20 }]} />
            <View style={styles.textContainer}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.author}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={14} color="black" />
                <Text style={styles.bookRating}>{book.rating.toFixed(1)}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.row}>
        <Text style={styles.genreTitle}>Genre #3</Text>
      </View>
      <ScrollView horizontal style={styles.booksRow} showsHorizontalScrollIndicator={false}>
        {books.map((book) => (
          <View key={book.id} style={styles.bookContainer}>
            <Image source={{ uri: book.imageUrl }} style={[styles.bookImage, { height: screenHeight * 0.20 }]} />
            <View style={styles.textContainer}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.author}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={14} color="black" />
                <Text style={styles.bookRating}>{book.rating.toFixed(1)}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    searchBar: {
      width: '100%',
      padding: 10,
      fontSize: 16,
      backgroundColor: 'lightpink',
      borderRadius: 8,
      marginBottom: 15,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    row: {
      alignItems: 'flex-start',
      marginBottom: 10,
      width: '100%',
    },
    genreTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'left',
      width: '100%',
    },
    booksRow: {
      flexDirection: 'row',
      width: '100%',
    },
    bookContainer: {
      flexDirection: 'row',
      backgroundColor: 'lightpink',
      marginHorizontal: 10,
      marginBottom: 10,
      borderRadius: 8,
      padding: 10,
      alignItems: 'center',
      width: 200, // Adjust width to fit text and image
    },
    bookImage: {
      width: 80,
      height: 100,
      borderRadius: 8,
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
    },
    bookTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    bookAuthor: {
      fontSize: 12,
      color: 'gray',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    bookRating: {
      fontSize: 12,
      marginLeft: 5,
    },
  });

export default NewScreen;
