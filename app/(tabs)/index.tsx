import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, ScrollView, View, Text, FlatList } from 'react-native';
import { useFonts } from 'expo-font';
import { fetchAlbumDetails } from '@/services/apiService'; // Ensure this service is correctly implemented
import InfoIcon from '@/assets/images/info.png';
import Album from '../album'; // Import the Album component

import { ThemedText } from '@/components/ThemedText';

export default function Index() {
  const [fontsLoaded] = useFonts({
    'Vollkorn-Italic': require('@/assets/fonts/Vollkorn-BlackItalic.ttf'),
    'Montserrat-Bold': require('@/assets/fonts/Montserrat-Bold.ttf'),
  });

  const [albums, setAlbums] = useState<any[]>([]);
  const [newReleases, setNewReleases] = useState<any[]>([]); // New albums state
  const [recommended, setRecommended] = useState<any[]>([]); // New albums state
  const [selectedAlbum, setSelectedAlbum] = useState(null); // State to hold selected album details

  const albumIds = [
    '1uE3dRPe3SrGdNhd1nWlSa',
    '7kFyd5oyJdVX2pIi6P4iHE',
    '3VQkNrG74QPY4rHBPoyZYZ',
    '0YIOpXQvcbiDNPusSqi5Ew',
    '3wSWMuHQOJ2gU22t5sCouR',
    '0U28P0QVB1QRxpqp5IHOlH',
    '4C23ofFqNhsaAEkThw2yRB',
    '03guxdOi12XJbnvxvxbpwG',
  ];

  const newReleaseIds = [
    '2fenSS68JI1h4Fo296JfGr', // Unique IDs for new releases
    '1KNUCVXgIxKUGiuEB8eG0i',
    '4HTy9WFTYooRjE9giTmzAF',
    '0DucmDrdJM4evPXMbFJXBS',
    '1BrBVH1v92OAzRDijSyhj9',
    '2pOEFqvfxp5uUQ8vQEmVA0',
    '1CTm3ARqDETSm7GfvNYNJp',
    '22PkV1Le9P3X4RY4xtmK0q',
  ];

  const recommendedIds = [
    '4zP3lXg6RHEiUDOtUkr5yh', // Unique IDs for new releases
    '3QYrEoeYrBdBNrtsuoCor7',
    '5sFj47dMyRaQo3sVoElik2',
    '3G77BQuJy3jahjdkKQNNNM',
    '2ccGlDnYg0D9qAZHDq55Vm',
    '1qwlxZTNLe1jq3b0iidlue',
    '44JtWis3WYHBL7YcmIPobL',
    '22ljnmjYzy4TS5tCtaRIUE',
  ];

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        // Fetch for popular records
        const albumPromises = albumIds.map(async (id) => {
          const albumData = await fetchAlbumDetails(id);
          if (albumData && albumData.images && albumData.images.length > 0) {
            return {
              id,
              name: albumData.name,
              artist: albumData.artist || 'Unknown Artist',
              releaseDate: albumData.release_date || 'Unknown Date',
              genre: albumData.genre || 'Unknown Genre',
              cover: albumData.images[0].url,
            };
          }
          return null;
        });

        // Fetch for new releases
        const newReleasePromises = newReleaseIds.map(async (id) => {
          const albumData = await fetchAlbumDetails(id);
          if (albumData && albumData.images && albumData.images.length > 0) {
            return {
              id,
              name: albumData.name,
              artist: albumData.artist || 'Unknown Artist',
              releaseDate: albumData.release_date || 'Unknown Date',
              genre: albumData.genre || 'Unknown Genre',
              cover: albumData.images[0].url,
            };
          }
          return null;
        });

        // Fetch for new releases
        const recommendedPromise = recommendedIds.map(async (id) => {
          const albumData = await fetchAlbumDetails(id);
          if (albumData && albumData.images && albumData.images.length > 0) {
            return {
              id,
              name: albumData.name,
              artist: albumData.artist || 'Unknown Artist',
              releaseDate: albumData.release_date || 'Unknown Date',
              genre: albumData.genre || 'Unknown Genre',
              cover: albumData.images[0].url,
            };
          }
          return null;
        });

        const resolvedAlbums = await Promise.all(albumPromises);
        const resolvedNewReleases = await Promise.all(newReleasePromises);
        const resolvedRecommended = await Promise.all(recommendedPromise);

        setAlbums(resolvedAlbums.filter((album) => album !== null));
        setNewReleases(resolvedNewReleases.filter((album) => album !== null));
        setRecommended(resolvedRecommended.filter((album) => album !== null));
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  if (!fontsLoaded) {
    return <ThemedText>Loading...</ThemedText>;
  }

  const renderAlbum = ({ item }: { item: any }) => (
    <View style={styles.shapeContainer}>
      {item.cover ? (
        <Image source={{ uri: item.cover }} style={styles.innerSquare} />
      ) : (
        <View style={styles.innerSquare} />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.seeDetails}>{item.name || 'Loading...'}</Text>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => setSelectedAlbum(item)}
        >
          <Image source={InfoIcon} style={styles.infoIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (selectedAlbum) {
    return <Album album={selectedAlbum} setShowAlbum={setSelectedAlbum} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ThemedText type="subtitle" style={styles.subtitleText}>New Releases</ThemedText>
        <View style={styles.orangeLine} />
        <FlatList
          horizontal
          data={albums}
          renderItem={renderAlbum}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.horizontalList}
          showsHorizontalScrollIndicator={false}
        />

        <ThemedText type="subtitle" style={styles.subtitleText}>Popular Records</ThemedText>
        <View style={styles.orangeLineTwo} />
        <FlatList
          horizontal
          data={newReleases}
          renderItem={renderAlbum}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.horizontalList}
          showsHorizontalScrollIndicator={false}
        />

        <ThemedText type="subtitle" style={styles.subtitleText}>Records For You</ThemedText>
        <View style={styles.orangeLineTwo} />
        <FlatList
          horizontal
          data={recommended}
          renderItem={renderAlbum}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.horizontalList}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE5',
  },
  subtitleText: {
    color: '#000',
    fontFamily: 'Montserrat-Bold',
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  orangeLine: {
    height: 2,
    backgroundColor: '#F95530',
    width: 215,
    marginLeft: 45,
    marginBottom: 40,
  },
  orangeLineTwo: {
    height: 2,
    backgroundColor: '#F95530',
    width: 255,
    marginLeft: 45,
    marginBottom: 40,
  },
  horizontalList: {
    paddingHorizontal: 20,
  },
  shapeContainer: {
    width: 266,
    height: 335,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  smallShapeContainer: {
    width: 158,
    height: 203,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    marginBottom: 20,
  },
  innerSquare: {
    width: 246,
    height: 246,
    backgroundColor: '#FFC0CB', // Placeholder color
    marginTop: 10,
    marginBottom: 20,
  },
  smallInnerSquare: {
    width: 138,
    height: 138,
    backgroundColor: '#FFC0CB', // Placeholder color
    marginTop: 10,
    marginBottom: 10,
  },
  shapeRow: {
    flexDirection: 'row', // Align the rectangle and square horizontally
  },
  rectangleShape: {
    width: 138,
    height: 35,
    backgroundColor: '#000', // Rectangle color
    justifyContent: 'center',
    alignItems: 'center',  // Center the text horizontally and vertically
  },
  squareShape: {
    width: 35,
    height: 35,
    backgroundColor: '#000', // Square color
  },
  gridContainer: {
    paddingHorizontal: 20,
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
    textAlign: 'center',
    paddingVertical: 13,
  },
  infoButton: {
    width: 45,
    height: 45,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {
    width: 25,
    height: 25,
  },
  detailsText: {
    color: '#FFF',  // White text color
    fontSize: 13,  // Adjust font size as needed
    fontFamily: 'Montserrat-Medium',  // Example font family (change as needed)
  }
});
