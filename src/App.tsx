import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/HomePage';
import './App.css';
import MovieDetailPage from './components/DetailPage';
import 'video-react/dist/video-react.css';
import SearchPage from './components/SearchPage';
import Layout from './components/Layout';
import DiscoverPage from './components/DiscoverPage';
import WatchListPage from './components/WatchListPage';
import WatchNowPage from './components/WatchNowPage';


const App: React.FC = () => {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/watch-list" element={<WatchListPage />} />
        <Route path="/watch/:movieId" element={<WatchNowPage />} />

      </Routes>
      </Layout>

    </Router>
  );
};

export default App;
