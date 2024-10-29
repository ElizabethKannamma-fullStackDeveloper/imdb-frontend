import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditMovie = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [yearOfRelease, setYearOfRelease] = useState('');
  const [producerId, setProducerId] = useState('');
  const [actorIds, setActorIds] = useState([]);
  const [actors, setActors] = useState([]);
  const [producers, setProducers] = useState([]);

  useEffect(() => {
    const fetchActorsAndProducers = async () => {
      const actorsResponse = await axios.get('https://imdb-clone-g6ud.onrender.com/api/actors');
      const producersResponse = await axios.get('https://imdb-clone-g6ud.onrender.com/api/producers');
      setActors(actorsResponse.data);
      setProducers(producersResponse.data);
    };

    const fetchMovie = async () => {
      const response = await axios.get(`https://imdb-clone-g6ud.onrender.com/api/movies/${id}`);
      const movie = response.data;
      setName(movie.name);
      setYearOfRelease(movie.year);
      setProducerId(movie.producer);
      setActorIds(movie.actors);
    };

    fetchActorsAndProducers();
    fetchMovie();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedMovie = {
      name,
      year: yearOfRelease,
      producer: producerId,
      actors: actorIds,
    };

    try {
      await axios.put(`https://imdb-clone-g6ud.onrender.com/api/movies/${id}`, updatedMovie);
      alert('Movie updated successfully!');
    } catch (error) {
      console.error('Error updating movie:', error);
      alert('Failed to update movie. Please try again.');
    }
  };

  return (
    <div className="edit-movie-container">
      <h2>Edit Movie</h2>
      <form className="edit-movie-form" onSubmit={handleSubmit}>
        <div>
          <label>Movie Name:</label>
          <input
            type="text"
            className="movie-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Year of Release:</label>
          <input
            type="number"
            className="movie-input"
            value={yearOfRelease}
            onChange={(e) => setYearOfRelease(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Producer:</label>
          <select
            className="movie-select"
            value={producerId}
            onChange={(e) => setProducerId(e.target.value)}
            required
          >
            <option value="">Select Producer</option>
            {producers.map((producer) => (
              <option key={producer._id} value={producer._id}>
                {producer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="actors">
          <label>Actors:</label>
          <div className="actors-list">
            {actors.map((actor) => (
              <div key={actor._id}>
                <input
                  type="checkbox"
                  value={actor._id}
                  checked={actorIds.includes(actor._id)}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    if (actorIds.includes(selectedId)) {
                      setActorIds(actorIds.filter(id => id !== selectedId));
                    } else {
                      setActorIds([...actorIds, selectedId]);
                    }
                  }}
                />
                {actor.name}
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="submit-button">Update Movie</button>
      </form>
    </div>
  );
};

export default EditMovie;
