import React from 'react';
import { useState } from 'react';
import SearchItem from './SearchItem';
import styles from './SearchItems.module.css'

export default function SearchItems() {
    const [words, setwords] = useState([ 
    { id:1, content:'바지' },
    { id:2, content:'모자' }]);
    return (
        <div className={styles.body}>
            <span className={styles.text}>최근 검색어</span>
            <ul>
                {words.map((word) => (
                    <SearchItem
                    key={word.wordId}
                    word={word}/>
                ))}
            </ul>
        </div>
    );
}

