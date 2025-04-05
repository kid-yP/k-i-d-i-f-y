import React, { useEffect, useRef } from 'react';

const MusicPlayer = ({ track, isPlaying, togglePlayPause }) => {
  const audioRef = useRef(null);

  // Play/Pause audio when isPlaying changes
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Early return if no track is selected
  if (!track) {
    return <div>No track selected</div>;
  }

  return (
    <div className="music-player bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="player-header mb-4">
        <h3 className="text-2xl font-semibold text-white">{track.title}</h3>
        <p className="text-md text-gray-300">{track.artist?.name || track.artist}</p>
      </div>

      {/* Play/Pause Button */}
      <div className="controls mt-4 flex justify-center items-center">
        <button
          onClick={togglePlayPause}
          className="bg-purple-600 hover:bg-purple-700 p-4 rounded-full text-white transition-all duration-300"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          )}
        </button>
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
