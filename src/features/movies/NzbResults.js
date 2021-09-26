import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectResults
} from './movieSlice';
import styles from './NZB.module.css';
import { fetchNZBAsync } from './movieSlice';
import {useParams} from 'react-router-dom'

export function NzbResults() {
  const dispatch = useDispatch();
  const results = useSelector(selectResults) || [];

  let { id } = useParams();

  //Runs after render and on update?
  useEffect(() => {
    if(!results?.channel) {
      console.log('fetching with ' + id);
      dispatch(fetchNZBAsync(id));
    } else {
      console.log('results found');
      console.log(results );
    }
  });

  function ResultList() {
    const items = results?.channel?.item;
    console.log(items);
    if(items) {
      const listitems = items.map(el => {
        return (
        <div key={el.guid} className={styles.result}>
          <span className={styles.title}>{el.title}</span>
        </div>
        )
      })
      return <div className={styles.resultList}>{listitems}</div>
    } else {
      return <div></div>
    }
  }
    return(
        <div>
            <div>
                <ResultList/>
            </div>
        </div>
    )
}