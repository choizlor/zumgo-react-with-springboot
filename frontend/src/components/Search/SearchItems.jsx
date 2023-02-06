import React from 'react';
import { useState } from 'react';
import SearchItem from './SearchItem';
import styles from './SearchItems.module.css'


export default function SearchItems() {
    const [words, setwords] = useState([ 
    { id:1, content:'바지' },
    { id:2, content:'모자' },
    { id:3, content:'의자' },
    { id:4, content:'컴퓨터' },]);
    return (
        <div className={styles.body}>
            <span className={styles.text}>최근 검색어</span>
            <ul className={styles.wordcontainer}>
                {words.map((word) => (
                    <SearchItem
                    key={word.id}
                    word={word}/>
                ))}
            </ul>
        </div>
    );
}

