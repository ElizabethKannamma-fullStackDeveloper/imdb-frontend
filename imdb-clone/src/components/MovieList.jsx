import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/slices/movieSlice';
import axios from 'axios';
import MovieCard from './MovieCard';
import '../App.css'


const MovieList = () => {
  
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies);

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch]);

  
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;


// movie.originalTitleText.text
