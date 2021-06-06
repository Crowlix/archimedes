import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchMoviesAsync} from './movieSlice';

export function SearchBar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (e) => {  
    setSearchTerm(e.target.value);
  }
    const searchMovies = function() {dispatch(fetchMoviesAsync(searchTerm));}
    return(
        <div><input type="text" onChange={handleChange}></input>
          <button onClick={searchMovies}>tette</button>
        </div>
    )
}