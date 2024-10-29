import React from 'react';
import Navbar from './Navbar';
import MovieList from './MovieList';
import '../App.css'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <header className="header">
        <h1>Welcome to IMDb Clone</h1>
        <p>Your go-to platform for movies and ratings!</p>
      </header>
      <MovieList />
    </div>
  );
};

export default LandingPage;
