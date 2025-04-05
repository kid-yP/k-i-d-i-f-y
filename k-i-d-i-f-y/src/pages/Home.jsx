import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <div className="home-page">
      <h1>Discover Music</h1>
      <SearchBar />
      <Link to="/library" className="library-link">
        Your Library
      </Link>
    </div>
  );
}