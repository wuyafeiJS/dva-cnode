import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Row, Col, Button, Modal } from 'antd';
import { routerRedux } from 'dva/router';
import PublishTopic from '../components/PublishTopic/PublishTopic';
import styles from './Publish.css';

const { Header, Content } = Layout;
class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }
  handlePublishOk(topicId) {
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`/topic/${topicId}`));
  }
  handleCancel() {
    this.setState({ showModal: false });
  }
  handleShowModal() {
    this.setState({ showModal: true });
  }
  render() {
    const { dispatch, loginData, backData, loading } = this.props;
    console.log(loading);
    return (
      <div className={styles.normal}>
        <Header style={{ background: '#108EE9', color: '#fff' }}>
          <Row>
            <Col span={4} style={{ textAlign: 'left' }}>
              <a href="javascript:history.go(-1)">
                <Button type="primary" shape="circle" icon="left" />
              </a>
            </Col>
            <Col span={16} className={styles.title}>发布新话题</Col>
            <Col span={4} style={{ textAlign: 'right' }}>
            </Col>
          </Row>
        </Header>
        <Modal title="提示" visible={this.state.showModal}
          onOk={this.handlePublishOk.bind(this, backData.topicId)} onCancel={this.handleCancel.bind(this)}
          okText="确定" cancelText="取消"
        >
          {loading && <div>加载中...</div>}
          {!loading && backData.success && <div>发布成功，去看看</div>}
        </Modal>
        <Content>
          <PublishTopic showModal={this.handleShowModal.bind(this)} dispatch={dispatch} loginData={loginData} />
        </Content>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    backData: state.publish,
    loginData: state.login,
    loading: state.loading.models.publish,
  };
}

export default connect(mapStateToProps)(Publish);
