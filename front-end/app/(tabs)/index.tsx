// app/(tabs)/index.tsx
import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useAppColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const colorScheme = useAppColorScheme() ?? 'light';
  const router = useRouter();

  const handleExplore = () => {
    // Navigate to the Explore screen
    router.push('/explore');
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: Colors[colorScheme].background }]}
    >
      <Text style={[styles.title, { color: Colors[colorScheme].text }]}>
        Welcome to The Quill
      </Text>
      <Text style={[styles.subtitle, { color: Colors[colorScheme].text }]}>
        Your home for all things literary
      </Text>

      <View style={styles.featuresContainer}>
        <Text style={[styles.featureItem, { color: Colors[colorScheme].text }]}>
          • Discover a vast collection of genres and titles.
        </Text>
        <Text style={[styles.featureItem, { color: Colors[colorScheme].text }]}>
          • Build your personal bookshelf and reading list.
        </Text>
        <Text style={[styles.featureItem, { color: Colors[colorScheme].text }]}>
          • Write and share reviews with a community of book lovers.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors[colorScheme].tint }]}
        onPress={handleExplore}
      >
        <Text style={styles.buttonText}>Start Exploring</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 24,
  },
  featuresContainer: {
    marginBottom: 30,
  },
  featureItem: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
