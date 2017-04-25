import React from 'react';
import styles from './ListItem.css';

function ListItem({ value }) {
  return (
    <li className={styles.normal}>
      <img role="presentation" className={styles.avatar} src={value.author.avatar_url} />
      <div className={styles.title}>
        <p>
          <span className={styles.share}>
            { value.top && <span>顶</span> }
            { value.good && <span style={{ color:'red' }}>精</span> }
            <b>{value.title}</b>
          </span>
          <span className={styles.time}></span>
        </p>
        <p></p>
      </div>
    </li>
  );
}

export default ListItem;
