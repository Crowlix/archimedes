import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  highlightResult,
  selectResults,
  startNZBAsync,
  unhighlightResult
} from './movieSlice';
import styles from './NZB.module.css';
import { fetchNZBAsync } from './movieSlice';
import {useParams} from 'react-router-dom'
import sdIcon from './icons/sd.svg';
import downloadIcon from './icons/download.svg';
import downloadIconBlack from './icons/downloadblack.svg';
import cancelIcon from './icons/close.svg';

import prettyBytes from 'pretty-bytes';
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

  function getFilesize(result) {
    console.log('result:');
    console.log(result);
    if(result?.attr?.length) {
      const fileSizeObj = result.attr.find((el) => el['@attributes'].name === 'size');
      return prettyBytes(parseInt(fileSizeObj['@attributes'].value));
    }
    return '-';
  }

  function ResultList() {
    const items = results?.channel?.item;
    console.log(items);
    if(items) {
      const listitems = items.map(el => {
        return (
          el.highlighted ? <DownloadBar result={el}/> : <Result result={el}/>
        )
      })
      return <div className={styles.resultList}>{listitems}</div>
    } else {
      return <div></div>
    }
  }
  function highlight(guid) {
    dispatch(highlightResult(guid));
  }
  function Result(props) {
    const result = props.result;
    return (
        <div key={result.guid} className={styles.result}>
        <div>
          <span className={styles.title}>{result.title}</span>
          <span className={styles.fileSize}><img className={styles.icon} src={sdIcon}/>{getFilesize(result)}</span>
        </div>
        <div>
            <img onClick={() => highlight(result.guid)} className={styles.download} src={downloadIcon}/>
        </div>
      </div>
    )
  }

  function DownloadBar(props) {
    const result = props.result;
    return (
      <div key={result.guid} className={styles.downloadbar}>
        <img className={styles.download} src={cancelIcon} onClick={() => dispatch(unhighlightResult(result.guid))}/>
        <span className={styles.downloadtitle}>DOWNLOAD</span>
        <div>
          <img className={styles.download} src={downloadIconBlack} onClick={() => dispatch(startNZBAsync(result.link))}/>
        </div>
      </div>
  )
  }
    return(
        <div>
            <ResultList/>
        </div>
    )
}