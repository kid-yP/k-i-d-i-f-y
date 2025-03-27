import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';

export default function Player() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { trackId } = useParams();
  const audioRef = useRef(null);
  
  // Fallback if no state (direct URL access)
  const [track, setTrack] = useState(state?.track || null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Fetch track if not passed via state
  useEffect(() => {
    if (!track && trackId) {
      fetch(`https://api.deezer.com/track/${trackId}`)
        .then(res => res.json())
        .then(data => setTrack(data))
        .catch(console.error);
    }
  }, [trackId, track]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!track) {
    return (
      <div className="p-8 text-center">
        <p>Loading track...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-purple-600 mb-6 hover:underline"
      >
        <FiArrowLeft className="mr-2" />
        Back to results
      </button>

      {/* Track info */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <img
          src={track.album?.cover_big}
          alt={track.title}
          className="w-full md:w-64 h-64 rounded-lg shadow-lg object-cover"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{track.title}</h1>
          <p className="text-lg text-purple-600 mb-2">{track.artist?.name}</p>
          <p className="text-gray-500">{track.album?.title}</p>
          <p className="text-sm text-gray-400 mt-2">
            {Math.floor(track.duration / 60)}:
            {(track.duration % 60).toString().padStart(2, '0')}
          </p>
        </div>
      </div>

      {/* Audio player */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <audio
          ref={audioRef}
          src={track.preview}
          onEnded={() => setIsPlaying(false)}
          className="w-full mb-4"
        />
        <div className="flex justify-center gap-6">
          <button className="p-3 text-gray-700 hover:text-purple-600">
            <FaStepBackward size={20} />
          </button>
          <button 
            onClick={togglePlay}
            className="p-4 bg-purple-600 text-white rounded-full hover:bg-purple-700"
          >
            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
          </button>
          <button className="p-3 text-gray-700 hover:text-purple-600">
            <FaStepForward size={20} />
          </button>
        </div>
      </div>

      {/* Hidden audio element for playback */}
      <audio src={track.preview} ref={audioRef} />
    </div>
  );
}