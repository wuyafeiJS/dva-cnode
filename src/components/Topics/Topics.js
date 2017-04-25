import React from 'react';
import styles from './Topics.css';
import ListItem from './ListItem';


function Topics({ data }) {
  const topics = data.data;
  return (
    <div className={styles.normal}>
      <ul className={styles.list}>
        {
          topics.map((v, k) => (
            <ListItem value={v} key={k} />
          ))
        }
      </ul>
    </div>
  );
}

export default Topics;
