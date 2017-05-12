import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Layout, Tabs, Button } from 'antd';
import styles from './Message.css';
import MessageList from '../components/Message/MessageList';

const { Header, Content } = Layout;
const TabPane = Tabs.TabPane;

class Message extends Component {
  tabs = [
    {
      title: '未读消息',
      filter: 'hasNotReadMessage',
    },
    {
      title: '已读消息',
      filter: 'hasReadMessage',
    },
  ]
  render() {
    const { message } = this.props;
    console.log(message);
    let messageData = {};
    message.hasReadMessage && (messageData = message);
    return (
      <div className={styles.normal}>
        <Header style={{ background: '#108EE9', color: '#fff' }}>
          <Row>
            <Col span={4} style={{ textAlign: 'left' }}>
              <a href="javascript:history.go(-1)">
                <Button type="primary" shape="circle" icon="left" />
              </a>
            </Col>
            <Col span={16} className={styles.title}>信息中心</Col>
            <Col span={4} style={{ textAlign: 'right' }}>
            </Col>
          </Row>
        </Header>
        <Content>
          <Tabs type="line">
            {
              this.tabs.map((v, k) => (
                <TabPane tab={v.title} key={k}>
                  <MessageList readData={messageData[v.filter]} />
                </TabPane>
              ))
            }
          </Tabs>
        </Content>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.message,
  };
}

export default connect(mapStateToProps)(Message);
