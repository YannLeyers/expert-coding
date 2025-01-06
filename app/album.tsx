import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { addToCollectionService } from '@/frontend/apiService';  // Make sure the path is correct

interface AlbumProps {
  album: {
    cover: string;
    name: string;
    artist: string;
    releaseDate: string;
    genre: string;
  };
  setShowAlbum: (album: null) => void;
  addToCollection: (album: any) => void;
  addToWishlist: (album: any) => void;
}

export default function Album({ album, setShowAlbum, addToCollection, addToWishlist }: AlbumProps) {

  // Define the function to handle the collection action
  const handleAddToCollection = async (album: any) => {
    try {
      // Call the service function that communicates with your backend
      await addToCollectionService(album);
      console.log('Album added to collection!');
    } catch (error) {
      console.error('Error adding album to collection:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => setShowAlbum(null)}>
          <Image source={require('@/assets/images/back-icon.png')} style={styles.backIcon} />
          <Text style={styles.backButtonText}>Return to home</Text>
        </TouchableOpacity>
        <Image source={{ uri: album.cover }} style={styles.albumCover} />
        <Text style={styles.albumHeader}>
          <Text style={styles.albumName}>{album.name}</Text>
          <Text style={styles.separator}> / </Text>
          <Text style={styles.artistName}>{album.artist}</Text>
        </Text>
        <Text style={styles.albumText}>Release Date: {album.releaseDate}</Text>
        <Text style={styles.albumText}>Genre: {album.genre}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.collectionButton}
            onPress={() => handleAddToCollection(album)} // Use the new handleAddToCollection function
          >
            <Text style={styles.buttonText}>Add to Collection</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={() => addToWishlist(album)}
          >
            <Text style={styles.buttonText}>Add to Wishlist</Text>
          </TouchableOpacity>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {
    width: 12,
    height: 15,
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6D6D66',
    fontFamily: 'Montserrat-Medium',
  },
  albumCover: {
    width: 335,
    height: 335,
    alignSelf: 'center',
    marginBottom: 20,
  },
  albumHeader: {
    textAlign: 'left',
    marginBottom: 20,
  },
  albumName: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 25,
    color: '#F95530',
  },
  separator: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 25,
    color: '#6D6D66',
  },
  artistName: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 25,
    color: '#000000',
  },
  albumText: {
    fontSize: 18,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  collectionButton: {
    backgroundColor: '#FEB0BE',
    width: 158,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistButton: {
    backgroundColor: '#000000',
    width: 158,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
