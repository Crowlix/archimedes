import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMovies } from './movieApi';

const initialState = {
  movies: [],
  dummy: '',
  status: ''
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchMoviesAsync = createAsyncThunk(
  'movies/fetchMovies',
  async (q) => {
    const response = await fetchMovies(q);
    let rawJSON = response.data.replace(`imdb$${q.replace(' ', '_')}(`, ''); 
    rawJSON = rawJSON.slice(0,rawJSON.length -1);
    let jsonResult = JSON.parse(rawJSON);
    let resultList = jsonResult.d;
    resultList = resultList.filter(el => el.q === 'feature');
    console.log(resultList);

    return resultList;
  }
);

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateMovies: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.movies = action.payload;
    },
    dummy: (state) => {
      state.dummy = 'dumdum'
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
      builder
        .addCase(fetchMoviesAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchMoviesAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.movies = action.payload;
        });
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
);

export const { increment, dummy, incrementByAmount } = movieSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
export const selectMovies = (state) => state.movies.movies;


export default movieSlice.reducer;
