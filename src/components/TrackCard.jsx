import React, { useState, useEffect } from 'react';

const TrackCard = ({ track, onSelect, onAddToFavorites }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  // Create a new audio object whenever a new track is selected
  useEffect(() => {
    const newAudio = new Audio(track.preview);
    setAudio(newAudio);

    // Cleanup the audio object when the component unmounts or when track changes
    return () => {
      newAudio.pause();
      newAudio.src = '';
    };
  }, [track]);  // Re-run this effect whenever the track changes

  // Play or Pause the track
  const handlePlayPause = () => {
    if (!audio) return;  // Ensure audio object exists before playing

    if (isPlaying) {
      audio.pause(); // Pause the audio if it's already playing
    } else {
      audio.play(); // Play the audio if it's paused
    }

    setIsPlaying(!isPlaying); // Toggle play/pause state
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <img
        src={track.album.cover}
        alt={track.title}
        className="w-full h-48 object-cover rounded-md cursor-pointer"
        onClick={onSelect} // Open album page when clicked
      />
      <h3 className="text-lg mt-2">{track.title}</h3>
      <p className="text-sm text-gray-600">{track.artist.name}</p>
      <p className="text-xs text-gray-500">{track.album.title}</p>
      <button
        onClick={handlePlayPause}
        className={`mt-2 px-4 py-2 rounded-md ${isPlaying ? 'bg-red-500' : 'bg-blue-500'} text-white`}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button
        onClick={() => onAddToFavorites(track)}
        className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md"
      >
        Add to Favorites
      </button>
    </div>
  );
};

export default TrackCard;
