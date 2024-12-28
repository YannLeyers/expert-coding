// spotifyService.js
export async function fetchAlbumData(albumId, accessToken) {
    try {
      // Fetch album details
      const albumResponse = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const albumData = await albumResponse.json();
  
      // Fetch artist details for genre
      const artistId = albumData.artists[0].id; // Get the first artist's ID
      const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const artistData = await artistResponse.json();
  
      // Build album object
      const album = {
        name: albumData.name,
        artist: albumData.artists.map(artist => artist.name).join(', '),
        releaseDate: albumData.release_date,
        cover: albumData.images[0]?.url || '',
        genre: artistData.genres.join(', ') || 'Unknown Genre',
      };
  
      return album;
    } catch (error) {
      console.error('Error fetching album details:', error);
      return null;
    }
  }
  