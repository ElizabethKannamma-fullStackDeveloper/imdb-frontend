import React from 'react';
import '../App.css';
import EditMovie from './EditMovie';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    return (
        // <div className="movie-card">
        //     <img src={movie.primaryImage.imageUrl} alt={movie.originalTitleText.text} />
        //     <h3>{movie.originalTitleText.text}</h3>
        //     <p>{movie.releaseYear.year}</p>
        //     <p>Produced by: {movie.plot.author}</p>
        // </div>
        <div className="movie-card">
        <img src={movie.poster} alt={movie.name} />
        <h3>{movie.name}</h3>
        <p>{movie.year}</p>
        <p>Produced by: {movie.producer.name}</p>
        <Link to={`/edit-movie/${movie._id}`}><button>Edit</button></Link>
    </div>
    );
};

export default MovieCard;
