import React from 'react';

const TrackCard = ({ track, onSelect, isPlaying, currentTrack }) => {
  const handleSelectTrack = () => {
    onSelect(track);
  };

  // Handle undefined track duration
  const formattedDuration = track.duration
    ? `${Math.floor(track.duration / 60)}:${String(track.duration % 60).padStart(2, '0')}`
    : 'Unknown Duration';

  return (
    <div
      onClick={handleSelectTrack}
      className={`group relative overflow-hidden rounded-xl bg-gray-800/70 backdrop-blur-sm border ${
        currentTrack?.id === track.id
          ? 'border-purple-500'
          : 'border-gray-700/50'
      } shadow-lg transition-all duration-300 hover:bg-gray-700/80 hover:shadow-xl hover:-translate-y-1 cursor-pointer`}
    >
      {/* Album Art */}
      <div className="relative pt-[100%]">
        <img
          src={track.album.cover_medium || track.album.cover}
          alt={track.album.title}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Play/Pause Indicator */}
        {currentTrack?.id === track.id && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            {isPlaying ? (
              <div className="bg-purple-600/90 rounded-full p-3">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"
                  />
                </svg>
              </div>
            ) : (
              <div className="bg-purple-600/90 rounded-full p-3">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                </svg>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Track Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white truncate">{track.title}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-400 truncate">
            {track.artist?.name || track.artist}
          </p>
          <span className="text-xs text-gray-500">{formattedDuration}</span>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
