import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie } from '../redux/slices/movieSlice';
import axios from 'axios';
import '../App.css'; 

const AddMovie = () => {
  const dispatch = useDispatch();
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

    fetchActorsAndProducers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMovie = {
      name,
      year: yearOfRelease,
      producer: producerId,
      actors: actorIds,
    };

    try {
      const response = await axios.post('https://imdb-clone-g6ud.onrender.com/api/movies', newMovie);
      dispatch(addMovie(response.data));

      setName('');
      setYearOfRelease('');
      setProducerId('');
      setActorIds([]);
      alert('Movie added successfully!');
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Failed to add movie. Please try again.');
    }
  };

  return (
    <div className="landing-page">
      <h2 className="heading">Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Movie Name:</label>
          <input
            className="movie-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Year of Release:</label>
          <input
            className="movie-input"
            type="number"
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
            <option value="">select Producer</option>
            {producers.map((producer) => (
              <option key={producer._id} value={producer._id}>
                {producer.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Actors:</label>
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
        <button className="submit-button" type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
