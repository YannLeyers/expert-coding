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
    return response.data;
  } catch (error) {
    console.error('Error fetching album details:', error);
    return null;
  }
};
