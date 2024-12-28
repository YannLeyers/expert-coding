import axios from 'axios';
import { getSpotifyToken } from './authService';  // Import the token function

// Function to fetch album details using the Spotify API
export const fetchAlbumDetails = async (albumId) => {
  const token = await getSpotifyToken();  // Get the token

  if (!token) {
    console.error('Failed to fetch token');
    return null;
  }

  const url = `https://api.spotify.com/v1/albums/${albumId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const album = response.data;
    const artist = album.artists && album.artists.length > 0 ? album.artists[0].name : 'Unknown Artist';
    const genre = album.genres && album.genres.length > 0 ? album.genres[0] : 'Unknown Genre';

    // Return album details along with artist and genre
    return {
      name: album.name,
      artist: artist,
      genre: genre,
      cover: album.images && album.images[0].url,
      releaseDate: album.release_date,
    };
  } catch (error) {
    console.error('Error fetching album details:', error);
    return null;
  }
};
