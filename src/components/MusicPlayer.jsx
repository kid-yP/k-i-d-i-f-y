import React, { useEffect, useRef } from 'react';

const MusicPlayer = ({ track, isPlaying, togglePlayPause }) => {
  const audioRef = useRef(null);

  // Early return if no track is selected
  if (!track) {
    return <div>No track selected</div>;
  }

  return (
    <div className="music-player">
      <div className="player-header">
        <h3 className="text-xl font-semibold text-white">{track.title}</h3>
        <p className="text-md text-gray-300">{track.artist?.name || track.artist}</p>
      </div>

      {/* Audio Element */}
      {track.preview ? (
        <audio
          ref={audioRef}
          src={track.preview}
          controls
          autoPlay={isPlaying}
          className="mt-4 w-full"
        >
          Your browser does not support the audio element.
        </audio>
      ) : (
        <div className="mt-4 text-center text-red-500">Audio preview not available</div>
      )}
    </div>
  );
};

export default MusicPlayer;
