import axios from 'axios';

// Function to fetch Spotify authentication token
export const getSpotifyToken = async () => {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const clientId = '7e8e203211954f2ca71a5c9237699519'; 
  const clientSecret = '71abaaa8c4f444bab1919e0dc0429d25'; 

  const auth = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');

  try {
    const response = await axios.post(tokenUrl, data, {
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    return null;
  }
};
