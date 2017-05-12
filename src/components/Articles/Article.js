import React from 'react';
import { Row, Col, Icon } from 'antd';
import Reply from './Reply';
import styles from './Article.css';
import transformDate from '../../utils/transformDate';

function Article({ article, loginData, dispatch }) {
  return (
    <div className={styles.normal}>
      <Row className={styles.header}>
        <Col span={12} style={{ textAlign: 'left' }}>
          <img src={article.author.avatar_url} alt=""/>
          <span>{article.author.loginname}</span>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <p>{ transformDate(article.create_at) }</p>
          <p>
            <span>
              <Icon type="heart" />
              {article.reply_count}
            </span>
            { "  " }
            <span>
              <Icon type="eye" />
              {article.visit_count}
            </span>
          </p>
        </Col>
      </Row>
      <article>
        <h1 className={styles.title}>{article.title}</h1>
        <hr style={{ border: 'none', borderTop: '1px solid #ddd' }} />
        <div>
          <div className={`${styles.main} markdown-body`} dangerouslySetInnerHTML={{__html: article.content}}></div>
        </div>
      </article>
      <Reply dispatch={dispatch} currentTopicId={article.id} loginData={loginData} replies={article.replies} />
    </div>
  );
}

export default Article;
