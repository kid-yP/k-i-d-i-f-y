import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Search from './pages/Search';
import Player from './pages/Player';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [globalTracks, setGlobalTracks] = useState([]);

  return (
    <Router>
      <Routes>
        {/* Home Page with Search */}
        <Route 
          path="/" 
          element={
            <Layout>
              <ErrorBoundary>
                <Home />
              </ErrorBoundary>
            </Layout>
          } 
        />

        {/* Search Results Page */}
        <Route 
          path="/search" 
          element={
            <Layout>
              <ErrorBoundary>
                <Search />
              </ErrorBoundary>
            </Layout>
          } 
        />
        

        {/* Player Page */}
        <Route 
          path="/player/:trackId" 
          element={
            <Layout>
              <ErrorBoundary>
                <Player />
              </ErrorBoundary>
            </Layout>
          } 
        />

        {/* 404 Page */}
        <Route 
          path="*" 
          element={
            <Layout>
              <div className="text-center py-12">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p>Page not found</p>
              </div>
            </Layout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;