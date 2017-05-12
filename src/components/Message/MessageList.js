import React from 'react';
import styles from './MessageList.css';

function MessageList({ readData }) {
  console.log(readData,"heh");
  return (
    <div className={styles.normal}>
      Component: MessageList
    </div>
  );
}

export default MessageList;
