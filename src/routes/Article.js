import React from 'react';
import { connect } from 'dva';
import { Layout, Row, Col, Button, Spin } from 'antd';
import styles from './Article.css';
import Article from '../components/Articles/Article';

const { Header, Content } = Layout;
function ArticlePage({ loading, article, loginData, dispatch }) {
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
        { loading ? <Spin size="large" className={styles.loadImg} /> : <Article dispatch={dispatch} loginData={loginData} article={article} /> }
      </Content>
    </div>
  );
}

function mapStateToProps(state) {
  const { article } = state.Article;
  return {
    loading: state.loading.models.Article,
    loginData: state.login,
    article,
  };
}

export default connect(mapStateToProps)(ArticlePage);
