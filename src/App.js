import React from 'react';
import logo from './logo.svg';
import { SearchBar } from './features/movies/searchBar';
import {Counter} from './features/counter/Counter'

import './App.css';
import { MovieList } from './features/movies/movieList';

function App() {
  return (
    <div className="App">
        <SearchBar/>
        <MovieList/>        
    </div>
  );
}

export default App;
