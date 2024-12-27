import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, ScrollView, View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { fetchAlbumDetails } from '@/services/apiService'; // Ensure this service is correctly implemented
import InfoIcon from '@/assets/images/info.png';
import Album from '../album'; // Import the Album component

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Index() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    'Vollkorn-Italic': require('@/assets/fonts/Vollkorn-BlackItalic.ttf'),
    'Montserrat-Bold': require('@/assets/fonts/Montserrat-Bold.ttf'),
  });

  const [albumCover, setAlbumCover] = useState<string | null>(null);
  const [showAlbum, setShowAlbum] = useState(false); // State to control navigation

  useEffect(() => {
    const fetchAlbum = async () => {
      const albumId = '1uE3dRPe3SrGdNhd1nWlSa';
      const albumData = await fetchAlbumDetails(albumId);
      if (albumData && albumData.images && albumData.images.length > 0) {
        setAlbumCover(albumData.images[0].url);
      }
    };

    fetchAlbum();
  }, []);

  if (!fontsLoaded) {
    return <ThemedText>Loading...</ThemedText>;
  }

  if (showAlbum) {
    return <Album setShowAlbum={setShowAlbum} />; // Pass setShowAlbum as a prop
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ThemedText type="subtitle" style={styles.subtitleText}>New Releases</ThemedText>
        <View style={styles.orangeLine} /> {/* Add the orange line */}
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
            <Text style={styles.seeDetails}>Bird's Eye</Text>

            <TouchableOpacity style={styles.infoButton} onPress={() => setShowAlbum(true)}>
              <Image
                source={InfoIcon}  // This is your info icon
                style={styles.infoIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE5',
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
  orangeLine: {
    height: 2,
    backgroundColor: '#F95530',
    width: 215,
    marginLeft: 45,
  },
  shapeContainer: {
    width: 266,
    height: 331,
    borderWidth: 2,
    borderColor: '#000',
    marginVertical: 20,
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
    color: '#fff',
    width: 190,
    height: 45,
    backgroundColor: '#000',
    fontFamily: 'Montserrat-Medium',
    marginRight: 10,
    textAlign: 'center', // Centers text horizontally
    paddingVertical: 13, // Adjust this value for visual centering
  },
  infoButton: {
    width: 45,
    height: 45,
    backgroundColor: '#000',
    justifyContent: 'center', // Centers vertically
    alignItems: 'center',    // Centers horizontally
  },
  infoIcon: {
    width: 25,
    height: 25,
  },
});