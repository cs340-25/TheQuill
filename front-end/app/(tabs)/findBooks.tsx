import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';

const NewScreen = () => {
  const books = [
    { id: '1', title: 'Book 1', imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '2', title: 'Book 2', imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '3', title: 'Book 3', imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '4', title: 'Book 4', imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '5', title: 'Book 5', imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '6', title: 'Book 6', imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '7', title: 'Book 7', imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '8', title: 'Book 8', imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '9', title: 'Book 9', imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '10', title: 'Book 10', imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '11', title: 'Book 11', imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '12', title: 'Book 12', imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '13', title: 'Book 13', imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '14', title: 'Book 14', imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
    { id: '15', title: 'Book 15', imageUrl: 'https://cdn.pastemagazine.com/www/articles/2019/12/06/dunebbc19final.jpg' },
  ];

  const screenHeight = Dimensions.get('window').height;

  return (
    <ScrollView style={styles.container}> {/* Wrap the entire content in a vertical ScrollView */}
      {/* Main title */}
      <View style={styles.row}>
        <Text style={styles.text}>Explore Books</Text>
      </View>

      {/* Genre #1 Row */}
      <View style={styles.row}>
        <Text style={styles.genreTitle}>Genre #1</Text>
      </View>
      <ScrollView horizontal style={styles.booksRow} showsHorizontalScrollIndicator={false}>
        {books.map((book) => (
          <View key={book.id} style={styles.bookContainer}>
            <Image source={{ uri: book.imageUrl }} style={[styles.bookImage, { height: screenHeight * 0.20 }]} />
            <Text style={styles.bookTitle}>{book.title}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Genre #2 Row */}
      <View style={styles.row}>
        <Text style={styles.genreTitle}>Genre #2</Text>
      </View>
      <ScrollView horizontal style={styles.booksRow} showsHorizontalScrollIndicator={false}>
        {books.map((book) => (
          <View key={book.id} style={styles.bookContainer}>
            <Image source={{ uri: book.imageUrl }} style={[styles.bookImage, { height: screenHeight * 0.20 }]} />
            <Text style={styles.bookTitle}>{book.title}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Genre #3 Row */}
      <View style={styles.row}>
        <Text style={styles.genreTitle}>Genre #3</Text>
      </View>
      <ScrollView horizontal style={styles.booksRow} showsHorizontalScrollIndicator={false}>
        {books.map((book) => (
          <View key={book.id} style={styles.bookContainer}>
            <Image source={{ uri: book.imageUrl }} style={[styles.bookImage, { height: screenHeight * 0.20 }]} />
            <Text style={styles.bookTitle}>{book.title}</Text>
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
  row: {
    alignItems: 'flex-start', // Align items (titles and books) to the left
    marginBottom: 10, // Adds space below the title
    width: '100%', // Ensures the container takes the full width
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  genreTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left', // Align text to the left
    width: '100%', // Make sure the title takes up the full width of the container
  },
  booksRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 0,
  },
  bookContainer: {
    width: '8%', // Book containers take up 10% of the row width
    backgroundColor: 'lightpink',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  bookImage: {
    width: '100%',  // Width takes up the whole container's width
    borderRadius: 8,  // Optional: adds rounded corners to the image
    height: '100%',
  },
  bookTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default NewScreen;
