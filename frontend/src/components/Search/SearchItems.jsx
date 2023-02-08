import React from 'react';
import { useState } from 'react';
import SearchItem from './SearchItem';
import styles from './SearchItems.module.css'


export default function SearchItems({recents}) {
   
    return (
        <div className={styles.body}>
            <span className={styles.text}>최근 검색어</span>
            <ul className={styles.wordcontainer}>
                {recents.map((word, idx) => (
                    <SearchItem
                    key={idx}
                    word={word}/>
                ))}
            </ul>
        </div>
    );
}

