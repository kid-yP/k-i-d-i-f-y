import React from 'react';

const MusicPlayer = ({ track, isPlaying, togglePlayPause }) => {
  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl">{track.title}</h2>
      <p className="text-sm text-gray-600">{track.artist.name}</p>
      <img 
        src={track.album.cover_medium} 
        alt={track.title} 
        className="w-32 h-32 object-cover mt-2 rounded-md" 
      />
      <button 
        onClick={togglePlayPause} 
        className={`mt-4 px-4 py-2 rounded-md ${isPlaying ? 'bg-red-500' : 'bg-blue-500'} text-white`}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default MusicPlayer;
