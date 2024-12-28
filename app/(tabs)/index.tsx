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
  const [selectedAlbum, setSelectedAlbum] = useState(null); // State to hold selected album details

  const albumIds = [
    '1uE3dRPe3SrGdNhd1nWlSa', // Existing album
    '7kFyd5oyJdVX2pIi6P4iHE', // Additional album 1
    '3VQkNrG74QPY4rHBPoyZYZ', // Additional album 2
    '0YIOpXQvcbiDNPusSqi5Ew', // Additional album 3
    '3wSWMuHQOJ2gU22t5sCouR', // Additional album 4
    '0U28P0QVB1QRxpqp5IHOlH', // Additional album 4
    '4C23ofFqNhsaAEkThw2yRB', // Additional album 4
  ];

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const albumPromises = albumIds.map(async (id) => {
          const albumData = await fetchAlbumDetails(id);
          if (albumData && albumData.images && albumData.images.length > 0) {
            return {
              id,
              name: albumData.name,
              artist: albumData.artist || 'Unknown Artist', // Include artist info if available
              releaseDate: albumData.release_date || 'Unknown Date', // Include release date
              genre: albumData.genre || 'Unknown Genre', // Include genre if available
              cover: albumData.images[0].url,
            };
          }
          return null;
        });

        const resolvedAlbums = await Promise.all(albumPromises);
        setAlbums(resolvedAlbums.filter((album) => album !== null));
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
        <Image
          source={{ uri: item.cover }}
          style={styles.innerSquare} // Album cover
        />
      ) : (
        <View style={styles.innerSquare} /> // Placeholder
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.seeDetails}>{item.name || 'Loading...'}</Text>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => setSelectedAlbum(item)} // Pass the album's data to the state
        >
          <Image
            source={InfoIcon} // Info icon
            style={styles.infoIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (selectedAlbum) {
    return <Album album={selectedAlbum} setShowAlbum={setSelectedAlbum} />; // Pass selected album details and state setter
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

        {/* Shape Container */}
        <View style={styles.smallShapeContainer}>
          {/* Inner Square */}
          <View style={styles.smallInnerSquare} />

          {/* Shape Row */}
          <View style={styles.shapeRow}>
            {/* Rectangle Shape */}
            <View style={styles.rectangleShape}>
              <Text style={styles.detailsText}>Album Details</Text>  {/* Details Text */}
            </View>
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
  subtitleText: {
    color: '#000',
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
