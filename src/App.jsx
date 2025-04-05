import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import TrackCard from './components/TrackCard';
import MusicPlayer from './components/MusicPlayer';
import axios from 'axios';
import AlbumPage from './components/AlbumPage'; // New component for album page

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTrack, setSelectedTrack] = useState(null); // For storing the selected track
  const [audio, setAudio] = useState(null); // For storing the audio object
  const [isPlaying, setIsPlaying] = useState(false); // To track if the song is playing
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null); // To track the current track index
  const [album, setAlbum] = useState(null); // Store album details when an album is selected

  // Handle search function
  const handleSearch = async (query) => {
    setSearchQuery(query);
    setLoading(true);
    setError('');

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://api.deezer.com/search?q=${query}`;

    try {
      const response = await axios.get(proxyUrl + apiUrl);
      setTracks(response.data.data); // Store the search results
    } catch (err) {
      setError('Failed to fetch data from Deezer API');
    } finally {
      setLoading(false);
    }
  };

  // Handle track selection (album selection as well)
  const handleTrackSelect = (track, albumDetails) => {
    setSelectedTrack(track);
    setAlbum(albumDetails); // Store album details
    setCurrentTrackIndex(0); // Start from the first track of the album
    const newAudio = new Audio(track.preview); 
    newAudio.play();
    setAudio(newAudio);
    setIsPlaying(true);
    newAudio.onended = () => setIsPlaying(false); // Set audio to pause when finished
  };

  // Handle play/pause toggle
  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle next track
  const handleNextTrack = () => {
    if (currentTrackIndex < album.tracks.length - 1) {
      const nextTrack = album.tracks[currentTrackIndex + 1];
      setCurrentTrackIndex(currentTrackIndex + 1);
      setSelectedTrack(nextTrack);
      audio.src = nextTrack.preview; // Update the audio source
      audio.play(); // Play the next track
    }
  };

  // Handle previous track
  const handlePreviousTrack = () => {
    if (currentTrackIndex > 0) {
      const prevTrack = album.tracks[currentTrackIndex - 1];
      setCurrentTrackIndex(currentTrackIndex - 1);
      setSelectedTrack(prevTrack);
      audio.src = prevTrack.preview; // Update the audio source
      audio.play(); // Play the previous track
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    audio.volume = e.target.value;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl text-center text-blue-600">K-i-d-i-f-y</h1>
      
      {/* Search Bar Component */}
      <SearchBar onSearch={handleSearch} />

      {/* Loading indicator */}
      {loading && <p className="text-center mt-4">Loading...</p>}

      {/* Error message */}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* Display the album page if an album is selected */}
      {album ? (
        <AlbumPage
          album={album}
          selectedTrack={selectedTrack}
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          handleNextTrack={handleNextTrack}
          handlePreviousTrack={handlePreviousTrack}
          handleVolumeChange={handleVolumeChange}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {tracks.length > 0 ? (
            tracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                onSelect={() => handleTrackSelect(track, track.album)} // Send album details
              />
            ))
          ) : (
            <p className="text-center mt-4">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
