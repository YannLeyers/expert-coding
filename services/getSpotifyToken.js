// File: src/services/getSpotifyToken.js

import axios from 'axios';

const getSpotifyToken = async () => {
  const clientId = '7e8e203211954f2ca71a5c9237699519'; // Replace with your Client ID
  const clientSecret = '71abaaa8c4f444bab1919e0dc0429d25'; // Replace with your Client Secret
  const authUrl = 'https://accounts.spotify.com/api/token';

  const authOptions = {
    method: 'post',
    url: authUrl,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`, // Base64 encoding
    },
    data: 'grant_type=client_credentials',
  };

  try {
    const response = await axios(authOptions);
    return response.data.access_token; // Use this token for API requests
  } catch (error) {
    console.error('Error fetching Spotify token:', error);
    throw error;
  }
};

export default getSpotifyToken;
