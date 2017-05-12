import React from 'react';
import { Row, Col, Table, Layout, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Profile.css';
import transformDate from '../../utils/transformDate';

// let testData =  require('../../utils/test.json');
const { Header } = Layout;
function Profile({ dispatch, loginData, profile, collectTopics }) {
  const { avatar_url, create_at, loginname, recent_replies, recent_topics, score } = profile;
  const columns1 = [
    {
      title: '收藏的话题',
      dataIndex: 'value',
      key: 'collectedTopics',
      render: data => (
        <div>
          <img className={styles.avatar} src={data.author.avatar_url} alt="" />
          <span>{data.title}</span>
        </div>
      ),
    },
  ];
  const columns2 = [
    {
      title: '最近参与的话题',
      dataIndex: 'value',
      key: 'recent_replies',
      render: data => (
        <div>
          <img className={styles.avatar} src={data.author.avatar_url} alt="" />
          <span>{data.title}</span>
        </div>
      ),
    },
  ];
  const columns3 = [
    {
      title: '最新创建的话题',
      dataIndex: 'value',
      key: 'recent_topics',
      render: data => (
        <div>
          <img className={styles.avatar} src={data.author.avatar_url} alt="" />
          <span>{data.title}</span>
        </div>
      ),
    },
  ];
  function getData(data) {
    let dataSource = [];
    data.map((v, k) => {
      dataSource.push({
        key: k,
        value: v,
      });
    });
    return dataSource;
  }
  // const dataSource = [
  //   {
  //     key: '1',
  //     name: '胡彦斌',
  //     age: 32,
  //     address: '西湖区湖底公园1号'
  //   },
  // ];
  return (
    <div className={styles.normal}>
      { loginData.loginName !== profile.loginname && <Header style={{ background: '#108EE9', color: '#fff' }}>
        <Row>
          <Col span={4} style={{ textAlign: 'left' }}>
            <a href="javascript:history.go(-1)">
              <Button type="primary" shape="circle" icon="left" />
            </a>
          </Col>
          <Col span={16} className={styles.title}>个人详情</Col>
          <Col span={4} style={{ textAlign: 'right' }}>
          </Col>
        </Row>
      </Header>}
      <div className={styles.header}>
        <img src={avatar_url} alt={loginname} />
        <p>{loginname}</p>
        <p>积分:{score}</p>
        <p>注册于:{transformDate(create_at)}</p>
      </div>
      <div className={styles.boxes}>
        <Row gutter={16} style={{ margin: '0 8px' }}>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">
              <Table
                onRowClick={(record) => {
                  dispatch(routerRedux.push(`/topic/${record.value.id}`));
                }}
                columns={columns1}
                dataSource={getData(collectTopics)}
              />
            </div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">
              <Table columns={columns2} dataSource={getData(recent_replies)} />
            </div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">
              <Table columns={columns3} dataSource={getData(recent_topics)} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Profile;
