import React from 'react';
import { Icon } from 'antd';
import { Link } from 'dva/router';
import transformDate from '../../utils/transformDate';
import styles from './Reply.css';

function Reply({ replies }) {
  console.log(replies);
  return (
    <div className={styles.comments}>
      <p className={styles.total}>共有{ replies.length }条回复</p>
      <ul>
        {
          replies.map((v, k) => (
            <li key={k}>
              <dl>
                <dt>
                  <img src={v.author.avatar_url} alt={v.author.loginname} />
                </dt>
                <dd>{ k + 1 }楼</dd>
              </dl>
              <p className={styles.autorName}>
                <Link style={{ float: 'left' }}>{ v.author.loginname }</Link>
                <span style={{ float: 'right' }}>{transformDate(v.create_at)}</span>
              </p>
              <div className={styles.details}>
                <div className={'markdown-text'} dangerouslySetInnerHTML={{ __html: v.content }} style={{ lineHeight: '21px', float: 'left' }}></div>
                <span style={{ float: 'right' }}>
                  回复{'   '}
                  <Icon style={{ cursor: 'pointer' }} type="like" />
                  { '10' }
                </span>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Reply;
