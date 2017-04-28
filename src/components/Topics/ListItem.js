import React from 'react';
import { Link } from 'dva/router';
import styles from './ListItem.css';
import transformDate from '../../utils/transformDate';

function ListItem({ value }) {
  const tabChn = { all: '全部', good: '精华', share: '分享', ask: '问答', job: '招聘' };
  return (
    <li className={styles.normal}>
      <Link to={`topic/${value.id}`}>
        <img role="presentation" className={styles.avatar} src={value.author.avatar_url} />
        <div className={styles.title}>
          <p>
            <span className={styles.share}>
              { value.top && <span>顶</span> }
              { value.good && <span style={{ color: 'red' }}>精</span> }
              <b>{value.title}</b>
            </span>
          </p>
          <p className={styles.shareTime}>
            <span style={{ float: 'left' }}>
              { value.reply_count + '/' + value.visit_count }
            </span>
            <span style={{ float: 'left' }}>{tabChn[value.tab]}</span>
            <span style={{ float: 'right' }}>{ transformDate(value.create_at) }</span>
          </p>
        </div>
      </Link>
    </li>
  );
}

export default ListItem;
