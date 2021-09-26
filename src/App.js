import React from 'react';
import { SearchBar } from './features/movies/searchBar';

import './App.css';
import { MovieList } from './features/movies/movieList';
import { NzbResults } from './features/movies/NzbResults';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
      <Route path="/nzb/:id">
        <NzbResults/>
      </Route>
      <Route path="/">
        <div className="App">
          <SearchBar/>
          <MovieList/>        
        </div>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
