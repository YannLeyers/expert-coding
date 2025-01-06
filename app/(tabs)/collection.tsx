import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, ScrollView, View, Text, FlatList } from 'react-native';
import { useFonts } from 'expo-font';
import { fetchAlbumDetails } from '@/services/apiService'; 
import InfoIcon from '@/assets/images/info.png';
import Album from '../album'; 

import { ThemedText } from '@/components/ThemedText';

export default function Index() {
  const [fontsLoaded] = useFonts({
    'Vollkorn-Italic': require('@/assets/fonts/Vollkorn-BlackItalic.ttf'),
    'Montserrat-Bold': require('@/assets/fonts/Montserrat-Bold.ttf'),
  });

  const [albums, setAlbums] = useState<any[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null); 
  const [collection, setCollection] = useState<any[]>([]); 
  const [wishlist, setWishlist] = useState<any[]>([]); 

  const albumIds = [
    '7uwTHXmFa1Ebi5flqBosig',
    '4yP0hdKOZPNshxUOjY0cZj',
    '7J84ixPVFehy6FcLk8rhk3',
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
              artist: albumData.artist || 'Unknown Artist',
              releaseDate: albumData.release_date || 'Unknown Date',
              genre: albumData.genre || 'Unknown Genre',
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

  const addToCollection = (album: any) => {
    setCollection((prevCollection) => [...prevCollection, album]);
  };

  const addToWishlist = (album: any) => {
    setWishlist((prevWishlist) => [...prevWishlist, album]);
  };

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

  const renderCollectionAlbum = ({ item }: { item: any }) => (
    <View style={styles.shapeContainer}>
      {item.cover ? (
        <Image source={{ uri: item.cover }} style={styles.innerSquare} />
      ) : (
        <View style={styles.innerSquare} />
      )}
      <Text style={styles.seeDetails}>{item.name}</Text>
    </View>
  );

  if (selectedAlbum) {
    return <Album album={selectedAlbum} setShowAlbum={setSelectedAlbum} addToCollection={addToCollection} addToWishlist={addToWishlist} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.subtitleContainer}>
          <ThemedText type="subtitle" style={styles.subtitleText}>A</ThemedText>
          <View style={styles.orangeLine} />
        </View>
        <FlatList
          data={collection}
          renderItem={renderCollectionAlbum}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={styles.horizontalList}
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
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 52, 
  },
  subtitleText: {
    color: '#000',
    fontFamily: 'Montserrat-Bold',
    marginRight: 20,
  },
  orangeLine: {
    height: 2,
    backgroundColor: '#F95530',
    width: 295,
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
  innerSquare: {
    width: 246,
    height: 246,
    backgroundColor: '#FFC0CB',
    marginTop: 10,
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  seeDetails: {
    fontSize: 16,
    color: '#fff',
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
});
