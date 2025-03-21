import axios from "axios";

export const searchTracks = async (query) => {
  try {
    const response = await axios.get(`https://api.deezer.com/search?q=${query}`);
    return response.data.data; // Array of tracks
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return [];
  }
};