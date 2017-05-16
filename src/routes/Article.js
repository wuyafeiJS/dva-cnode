import React from 'react';
import { connect } from 'dva';
import { Layout, Row, Col, Button, Spin } from 'antd';
import styles from './Article.css';
import Article from '../components/Articles/Article';

const { Header, Content } = Layout;
function ArticlePage({ loading, article, isCommented, isSupported, loginData, currentT, dispatch }) {
  return (
    <div>
      <Header style={{ background: '#108EE9', color: '#fff' }}>
        <Row>
          <Col span={4} style={{ textAlign: 'left' }}>
            <a href="javascript:history.go(-1)">
              <Button type="primary" shape="circle" icon="left" />
            </a>
          </Col>
          <Col span={16} className={styles.title}>详情</Col>
          <Col span={4} style={{ textAlign: 'right' }}>
          </Col>
        </Row>
      </Header>
      <Content>
        { loading ? <Spin size="large" className={styles.loadImg} /> : <Article currentT={currentT} isCommented={isCommented} isSupported={isSupported} dispatch={dispatch} loginData={loginData} article={article} /> }
      </Content>
    </div>
  );
}

function mapStateToProps(state) {
  const { article, isCommented, isSupported, topicId } = state.Article;
  return {
    loading: state.loading.models.Article,
    loginData: state.login,
    article,
    isCommented,
    isSupported,
    currentT: state.Article[topicId],
  };
}

export default connect(mapStateToProps)(ArticlePage);
