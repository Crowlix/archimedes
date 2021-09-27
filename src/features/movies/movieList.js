import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
 selectMovies
} from './movieSlice';
import styles from './Movies.module.css';
import { fetchNZBAsync } from './movieSlice';
import { useHistory } from 'react-router';
export function MovieList() {
  let history = useHistory();
  const dispatch = useDispatch();
    const movies = useSelector(selectMovies) || [];
    let list = [];
    if(movies.length) {      
       list =  movies.map(movie => {
        return (<div onClick={highlight} className={styles.movie} key={movie.id}> <img src={movie.i}/>
          <span className={styles.title}>{movie.l}</span>
          <div className={styles.overlay}>
            <div className={styles.fill}></div>
            <button onClick={(e) => searchNZB(movie.id, e)} className={styles.hide}>SEARCH</button>
          </div>
          </div>)
      })
    }

    return(
        <div className={styles.movies}>
         {list}
        </div>
    )
    function highlight(e) {
      //e.target.style.display = "none";
      const target = e.target.parentNode.querySelector('.' + styles.overlay);
      target.style.display = "inline";
      target.querySelector('button').classList.remove(styles.hide);
    }

    function searchNZB(id,e) {
      const q = id.replace('tt','');
      e.stopPropagation();

        history.push(`/nzb/${q}`);
        dispatch(fetchNZBAsync(q));
    }
}