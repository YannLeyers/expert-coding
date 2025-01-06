// frontend/apiService.js (or .ts)
export const addToCollectionService = async (album) => {
    try {
      const response = await fetch('http://localhost:5000/api/collection/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ album }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add album to collection');
      }
  
      const data = await response.json();
      console.log('Album added to collection:', data);
    } catch (error) {
      console.error('Error adding album to collection:', error);
    }
  };
  