const TrackList = ({ tracks }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((track) => (
          <div key={track.id} className="p-4 border rounded-lg">
            <img src={track.album.cover_medium} alt={track.title} className="w-full rounded" />
            <h3 className="text-lg font-bold mt-2">{track.title}</h3>
            <p className="text-gray-600">{track.artist.name}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default TrackList;