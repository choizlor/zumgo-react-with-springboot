import React, { useState } from 'react';
import styles from './styles/LiveRoom.module.css';
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'

export default function LiveRoom() {
    
    const [inputData, setInputData] = useState("");
    

    const handleChange = e => {
        console.log(e.target.value)
        setInputData(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log('입력한 내용 전송:', inputData)
        setInputData('');
        // 채팅 내용 전송하기
    }
    return (
        <div className={styles.body}>
            <div className={styles.top}>

            </div>
            <div className={styles.bottom}>
                <div className={styles.chats}>

                </div>
                <div className={styles.bottombar}>
                    <form className={styles.chatform} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={inputData}
                            className={styles.input}
                            placeholder="댓글 달기"
                            onChange={handleChange}
                        />
                        <button type="submit">
                            <ArrowUpCircleIcon/>
                        </button>
                    </form>
                    <button className={styles.gobtn}></button>
                </div>
            </div>
        </div>
    );
}

