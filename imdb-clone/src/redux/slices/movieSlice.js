import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const options = {
    method: 'GET',
    url: 'https://imdb188.p.rapidapi.com/api/v1/getFanFavorites',
    params: {country: 'US'},
    headers: {
      'x-rapidapi-key': '149a32b18amsha1aabea2658fbbdp1b7ebfjsnfced28bf0575',
      'x-rapidapi-host': 'imdb188.p.rapidapi.com'
    }
  };
  


export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get("https://imdb-clone-g6ud.onrender.com/api/movies/")
  return response.data;
  
});

export const addMovie = createAsyncThunk('movies/addMovie', async (movieData) => {
  const response = await axios.post('https://imdb-clone-g6ud.onrender.com/api/movies', movieData);
  return response.data;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => action.payload)
      .addCase(addMovie.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export default movieSlice.reducer;
