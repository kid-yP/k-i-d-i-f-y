import React from 'react';

const TrackCard = ({ track, onSelect, isPlaying, currentTrack }) => {
  const handleSelectTrack = () => {
    onSelect(track);
  };

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
      </div>

      {/* Track Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white truncate">{track.title}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-400 truncate">{track.artist?.name || track.artist}</p>
          <span className="text-xs text-gray-500">{formattedDuration}</span>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
                                                                                                                                                                                                                                                                   