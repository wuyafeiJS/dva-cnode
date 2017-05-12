import React from 'react';
import { Spin } from 'antd';
import styles from './Topics.css';
import ListItem from './ListItem';


function Topics({ data }) {
  const topics = data;
  return (
    <div className={styles.normal}>
      <div className={styles.list}>
        {
          topics.map((v, k) => (
            <ListItem value={v} key={k} />
          ))
        }
      </div>
      <div className={styles.spinner}>
        <Spin type="large" />
      </div>
    </div>
  );
}

export default Topics;
