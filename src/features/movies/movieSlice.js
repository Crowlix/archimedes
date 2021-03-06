import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMovies, fetchNZB, startNZB } from './movieApi';

const initialState = {
    movies: [],
    dummy: '',
    status: '',
    results: []
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchMoviesAsync = createAsyncThunk(
    'movies/fetchMovies',
    async(q) => {
        const response = await fetchMovies(q);
        let rawJSON = response.data.replace(`imdb$${q.replace(' ', '_')}(`, '');
        rawJSON = rawJSON.slice(0, rawJSON.length - 1);
        let jsonResult = JSON.parse(rawJSON);
        let resultList = jsonResult.d;
        resultList = resultList.filter(el => el.q === 'feature');
        console.log(resultList);

        return resultList;
    }
);

export const fetchNZBAsync = createAsyncThunk(
    'movies/fetchNZB',
    async(q) => {
        const response = await fetchNZB(q);
        return response.data;
    }
);

export const startNZBAsync = createAsyncThunk(
    'movies/startNZB',
    async(url) => {
        const response = await startNZB(url);
        return response.data;
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
            highlightResult: (state, action) => {
                const index = state.results.channel.item.findIndex((el) => el.guid === action.payload);
                state.results.channel.item[index].highlighted = true;
            },
            unhighlightResult: (state, action) => {
                const index = state.results.channel.item.findIndex((el) => el.guid === action.payload);
                state.results.channel.item[index].highlighted = false;
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
                })
                .addCase(startNZBAsync.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(startNZBAsync.fulfilled, (state, action) => {
                    state.status = 'idle';
                })
                .addCase(fetchNZBAsync.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(fetchNZBAsync.fulfilled, (state, action) => {
                    state.status = 'idle';
                    state.results = action.payload;
                });
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
);

export const { increment, dummy, highlightResult, unhighlightResult } = movieSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
export const selectMovies = (state) => state.movies.movies;
export const selectResults = (state) => state.movies.results;



export default movieSlice.reducer;