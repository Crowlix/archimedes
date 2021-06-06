import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
 selectMovies
} from './movieSlice';
import styles from './Movies.module.css';

export function MovieList() {
    const movies = useSelector(selectMovies) || [];

    console.log(movies);
    let list = [];
    if(movies.length) {      
       list =  movies.map(movie => {
         console.log(movie);
        return <div className={styles.movie} key={movie.id}> <img src={movie.i}/><span className={styles.title}>{movie.l}</span></div>
      })
    }

    return(
        <div className={styles.movies}>
         {list}
        </div>
    )
}