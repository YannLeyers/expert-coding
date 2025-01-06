import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // replace with your backend URL

export const addToCollectionService = async (album: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/albums/collection`, album);
    return response.data;
  } catch (error) {
    console.error('Error adding album to collection:', error);
    throw error;
  }
};
