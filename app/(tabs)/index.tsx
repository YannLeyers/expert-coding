import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Platform, ScrollView, View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { fetchAlbumDetails } from '@/services/apiService'; // Ensure this service is correctly implemented
import BookmarkInactive from '@/assets/images/white-bookmark-inactive.png'; // Adjust path based on your folder structure

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    'Vollkorn-Italic': require('@/assets/fonts/Vollkorn-BlackItalic.ttf'), // Adjust this path based on your folder structure
    'Montserrat-Bold': require('@/assets/fonts/Montserrat-Bold.ttf'), // Adjust this path based on your folder structure
  });

  // State to hold album details
  const [albumCover, setAlbumCover] = useState<string | null>(null);

  // Fetch album details on component mount
  useEffect(() => {
    const fetchAlbum = async () => {
      const albumId = '1uE3dRPe3SrGdNhd1nWlSa';
      const albumData = await fetchAlbumDetails(albumId);
      if (albumData && albumData.images && albumData.images.length > 0) {
        setAlbumCover(albumData.images[0].url); // Set the URL of the album cover
      }
    };

    fetchAlbum();
  }, []);

  if (!fontsLoaded) {
    return <ThemedText>Loading...</ThemedText>; // Show loading text while fonts are loading
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerText}>Records</ThemedText>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* New Releases Section */}
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle" style={styles.subtitleText}>New Releases</ThemedText>
          {/* Shape Container */}
          <View style={styles.shapeContainer}>
            {albumCover ? (
              <Image
                source={{ uri: albumCover }}
                style={styles.innerSquare} // Replace innerSquare's placeholder color with the album cover
              />
            ) : (
              <View style={styles.innerSquare} /> // Show a placeholder until album cover is fetched
            )}
            <View style={styles.infoContainer}>
              <Text style={styles.seeDetails}>See Details</Text>
              <View style={styles.bookmarkButton}>
                <Image
                  source={BookmarkInactive}
                  style={styles.bookmarkIcon}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle" style={styles.subtitleText}>Popular Records</ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle" style={styles.subtitleText}>Your Wishlist</ThemedText>
        </ThemedView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE5', // Set your desired background color
  },
  header: {
    width: '100%', // Max width of the screen
    backgroundColor: '#F95530', // Hex color for background
    paddingVertical: 10, // Vertical padding for the header
    borderBottomWidth: 2, // Outline thickness
    borderBottomColor: '#000000', // Outline color
  },
  headerText: {
    color: '#000', // Black color for the text
    fontFamily: 'Vollkorn-Italic', // Apply Vollkorn-Italic font
    marginLeft: 20,
    marginTop: 60,
  },
  subtitleText: {
    color: '#000', // Black color for the text
    fontFamily: 'Montserrat-Bold',
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 40,
  },
  shapeContainer: {
    width: 266,
    height: 331,
    borderWidth: 2,
    borderColor: '#000',
    marginVertical: 20,
    marginLeft: 20,
    alignItems: 'center',
  },
  innerSquare: {
    width: 246,
    height: 246,
    backgroundColor: '#FFC0CB', // Placeholder color
    margin: 10,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  seeDetails: {
    fontSize: 16,
    color: '#000',
    width: 190,
    height: 45,
    backgroundColor: '#FFC0CB',
    fontFamily: 'Montserrat-Bold',
    marginRight: 10,
    textAlign: 'center', // Centers text horizontally
    paddingVertical: 13, // Adjust this value for visual centering
  },
  bookmarkButton: {
    width: 45,
    height: 45,
    backgroundColor: '#000',
    justifyContent: 'center', // Centers vertically
    alignItems: 'center',    // Centers horizontally
  },
  bookmarkIcon: {
    width: 15,
    height: 21,
  },
});