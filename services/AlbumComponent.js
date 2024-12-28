import React, { useEffect, useState } from 'react';
import { fetchAlbumDetails } from './services/apiService';  // Import the fetchAlbumDetails function

const AlbumComponent = ({ albumId }) => {
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAlbumDetails(albumId);  // Fetch album details
      setAlbum(data);  // Store the fetched album data in state
    };

    fetchData();
  }, [albumId]);  // Re-run the fetch if albumId changes

  return (
    <div>
      {album ? (
        <div>
          <h1>{album.name}</h1>
          <img src={album.cover} alt={album.name} />
          <p><strong>Artist:</strong> {album.artist}</p>
          <p><strong>Genre:</strong> {album.genre}</p>
          <p><strong>Release Date:</strong> {album.releaseDate}</p>
        </div>
      ) : (
        <p>Loading album details...</p>
      )}
    </div>
  );
};

export default AlbumComponent;
