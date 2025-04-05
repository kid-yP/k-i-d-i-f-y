import axios from 'axios';

export const searchTracks = async (query, limit = 25) => {
  try {
    const response = await axios.get(
      `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=${limit}`
    );
    
    if (!response.data.data || response.data.data.length === 0) {
      throw new Error('No tracks found');
    }
    
    return response.data.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};