import { useState } from "react";
import SearchBar from "./components/SearchBar";
import TrackList from "./components/TrackList";

const App = () => {
  const [tracks, setTracks] = useState([]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-4">K I D I F Y</h1>
      <SearchBar onSearch={setTracks} />
      <TrackList tracks={tracks} />
    </div>
  );
};

export default App;