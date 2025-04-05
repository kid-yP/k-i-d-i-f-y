import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import AlbumPage from './components/AlbumPage';
import MusicPlayer from './components/MusicPlayer';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [album, setAlbum] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const defaultTracks = [
    {
      id: 1,
      title: 'No Role Modelz',
      artist: { name: 'J. Cole' },
      album: { 
        title: '2014 Forest Hills Drive', 
        cover: 'https://e-cdn-images.dzcdn.net/images/cover/c5fbc3787d9c968a14b5bc0cc3a3fc2c/500x500.jpg',
        cover_medium: 'https://e-cdn-images.dzcdn.net/images/cover/c5fbc3787d9c968a14b5bc0cc3a3fc2c/500x500.jpg',
        description: '2014 Forest Hills Drive by J. Cole is one of his most celebrated albums.'
      },
      preview: 'https://cdns-preview-1.dzcdn.net/stream/c-1b1b89701d5c0e77fc263b58c22a8631-8.mp3',
    },
    {
      id: 2,
      title: 'The World Is Yours',
      artist: { name: 'Nas' },
      album: { 
        title: 'Illmatic', 
        cover: 'https://e-cdn-images.dzcdn.net/images/cover/a0d7d914240dbb6b86c4f5071d5974ea/500x500.jpg',
        cover_medium: 'https://e-cdn-images.dzcdn.net/images/cover/a0d7d914240dbb6b86c4f5071d5974ea/500x500.jpg',
        description: 'Illmatic is a 1994 album by Nas, often regarded as one of the greatest hip hop albums of all time.'
      },
      preview: 'https://cdns-preview-2.dzcdn.net/stream/c-28f5e9cb61d0f1e8b31a2b21f2172b31-7.mp3',
    },
    {
      id: 3,
      title: 'Doo Wop (That Thing)',
      artist: { name: 'Lauryn Hill' },
      album: { 
        title: 'The Miseducation of Lauryn Hill', 
        cover: 'https://e-cdn-images.dzcdn.net/images/cover/50ecfbb1c01fa8f71bde8b19a451f557/500x500.jpg',
        cover_medium: 'https://e-cdn-images.dzcdn.net/images/cover/50ecfbb1c01fa8f71bde8b19a451f557/500x500.jpg',
        description: 'The Miseducation of Lauryn Hill is an album that blends R&B, hip hop, and soul, featuring the hit "Doo Wop (That Thing)".'
      },
      preview: 'https://cdns-preview-3.dzcdn.net/stream/c-46f6fd5db4e13c8a64d148d67803e7b9-10.mp3',
    },
    {
      id: 4,
      title: 'Juicy',
      artist: { name: 'The Notorious B.I.G.' },
      album: { 
        title: 'Ready to Die', 
        cover: 'https://e-cdn-images.dzcdn.net/images/cover/20e2b7fa4ec97d09022962776f951bb5/500x500.jpg',
        cover_medium: 'https://e-cdn-images.dzcdn.net/images/cover/20e2b7fa4ec97d09022962776f951bb5/500x500.jpg',
        description: 'Ready to Die is The Notorious B.I.G.’s debut album, which includes the iconic track "Juicy".'
      },
      preview: 'https://cdns-preview-4.dzcdn.net/stream/c-0e3a3d2d7923d08e8454430c64067f4f-9.mp3',
    },
    {
      id: 5,
      title: 'Fugees - Killing Me Softly',
      artist: { name: 'Lauryn Hill' },
      album: { 
        title: 'The Score', 
        cover: 'https://e-cdn-images.dzcdn.net/images/cover/71abf25e40a5caad15877979a82a4b0d/500x500.jpg',
        cover_medium: 'https://e-cdn-images.dzcdn.net/images/cover/71abf25e40a5caad15877979a82a4b0d/500x500.jpg',
        description: 'The Score is the second studio album by the Fugees, which features Lauryn Hill and their version of "Killing Me Softly".'
      },
      preview: 'https://cdns-preview-5.dzcdn.net/stream/c-68dba2ba19547b8b606c3f3dbfd04f90-7.mp3',
    },
    {
      id: 6,
      title: 'Big Poppa',
      artist: { name: 'The Notorious B.I.G.' },
      album: { 
        title: 'Life After Death', 
        cover: 'https://e-cdn-images.dzcdn.net/images/cover/71a9f82998e2a4ea19ef12da39c39f66/500x500.jpg',
        cover_medium: 'https://e-cdn-images.dzcdn.net/images/cover/71a9f82998e2a4ea19ef12da39c39f66/500x500.jpg',
        description: 'Life After Death is The Notorious B.I.G.’s second album, featuring the classic track "Big Poppa".'
      },
      preview: 'https://cdns-preview-6.dzcdn.net/stream/c-235c71f8e2345f3ff68087a52d3d67c9-7.mp3',
    },
    {
      id: 7,
      title: 'Ready or Not',
      artist: { name: 'Fugees' },
      album: { 
        title: 'The Score', 
        cover: 'https://e-cdn-images.dzcdn.net/images/cover/71abf25e40a5caad15877979a82a4b0d/500x500.jpg',
        cover_medium: 'https://e-cdn-images.dzcdn.net/images/cover/71abf25e40a5caad15877979a82a4b0d/500x500.jpg',
        description: 'The Fugees bring a powerful mix of hip hop and reggae with their track "Ready or Not".'
      },
      preview: 'https://cdns-preview-7.dzcdn.net/stream/c-307a4e62f16007eaf6db44d429d5a370-8.mp3',
    },
    {
      id: 8,
      title: 'No Tears Left to Cry',
      artist: { name: 'Ariana Grande' },
      album: { 
        title: 'Sweetener', 
        cover: 'https://e-cdn-images.dzcdn.net/images/cover/90b38a97b0e576ea67ca94be56b7f9fc/500x500.jpg',
        cover_medium: 'https://e-cdn-images.dzcdn.net/images/cover/90b38a97b0e576ea67ca94be56b7f9fc/500x500.jpg',
        description: 'Sweetener is Ariana Grande’s fourth studio album, and "No Tears Left to Cry" was a major hit from it.'
      },
      preview: 'https://cdns-preview-8.dzcdn.net/stream/c-72de5f8c40f9b1a3387c1738a50157b8-9.mp3',
    },
    {
      id: 9,
      title: 'Thrift Shop',
      artist: { name: 'Macklemore & Ryan Lewis' },
      album: { 
        title: 'The Heist', 
        cover: 'https://e-cdn-images.dzcdn.net/images/cover/74b9d4450d7b8bfa8b0c7882aab74a7d/500x500.jpg',
        cover_medium: 'https://e-cdn-images.dzcdn.net/images/cover/74b9d4450d7b8bfa8b0c7882aab74a7d/500x500.jpg',
        description: 'Thrift Shop was a breakout hit for Macklemore & Ryan Lewis, and "The Heist" became a very successful album.'
      },
      preview: 'https://cdns-preview-9.dzcdn.net/stream/c-6e6b8f4704b44983f58be16e4332062f-8.mp3',
    }
  ];

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setLoading(true);
    setError('');
    setSearchPerformed(true);

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://api.deezer.com/search?q=${query}`;

    try {
      const response = await axios.get(proxyUrl + apiUrl);
      setTracks(response.data.data || []); // Ensure the response is handled properly
    } catch (err) {
      setError('Failed to fetch data from Deezer API');
    } finally {
      setLoading(false);
    }
  };

  const handleTrackSelect = (track, albumDetails) => {
    console.log('Selected track:', track); // Debugging line
    setSelectedTrack(track);
    setAlbum(albumDetails);
    setIsPlaying(false);  // Don't start playing the music yet
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 p-4 md:p-6">
      <div className="flex items-center justify-center mb-6 md:mb-8 cursor-pointer" onClick={handleLogoClick}>
        <div className="flex items-center bg-gradient-to-r from-blue-500/10 to-purple-600/10 p-3 rounded-full border border-gray-700/50 hover:shadow-lg transition-all duration-300">
          <img 
            src="https://img.icons8.com/fluency/96/000000/music.png"
            alt="Kidify Logo"
            className="w-10 h-10 mr-3 transition-transform duration-500 hover:rotate-12 filter hue-rotate-180 brightness-110"
          />
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 tracking-tight">
            K-I-D-I-F-Y
          </h1>
        </div>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading && (
        <div className="flex justify-center mt-8">
          <div className="loader"></div>
        </div>
      )}

      {error && (
        <p className="error-message">{error}</p>
      )}

      {album ? (
        <AlbumPage
          album={album}
          selectedTrack={selectedTrack}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
          {searchPerformed && tracks.length === 0 ? (
            <div className="col-span-full text-center mt-8">
              <p className="search-query">No results found for "{searchQuery}"</p>
              <p className="search-query">Try a different search term</p>
            </div>
          ) : (
            (searchQuery ? tracks : defaultTracks).map((track) => (
              <div
                key={track.id}
                className="track-card bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 cursor-pointer"
                onClick={() => handleTrackSelect(track, track.album)} // Passing album details
              >
                <img
                  src={track.album?.cover_medium || track.album?.cover}
                  alt={track.album?.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg text-white">{track.title}</h3>
                <p className="text-sm text-gray-400">{track.artist?.name}</p>
              </div>
            ))
          )}
        </div>
      )}

      {selectedTrack && (
        <MusicPlayer
          track={selectedTrack}
          isPlaying={isPlaying}
          togglePlayPause={() => setIsPlaying(!isPlaying)}
        />
      )}
    </div>
  );
};

export default App;
