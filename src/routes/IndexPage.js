import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Row, Col, Tabs, Button, Spin } from 'antd';
import { Link } from 'dva/router';
import Topics from '../components/Topics/Topics';
import styles from './IndexPage.css';

const { Header } = Layout;
const TabPane = Tabs.TabPane;

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '',
    };
  }
  componentWillMount() {
    // console.log('componentWillMount')
    const { dispatch, selectTab } = this.props;
    const LoadingAction = (accessToken, loginName) => {
      dispatch({ type: 'IndexPage', payload: accessToken });
     // dispatch(fetchMessage(accessToken));
     // dispatch(fetchProfile(loginName));
    };
    if (window.localStorage.getItem('masterInfo')) {
      let masterInfo = window.localStorage.getItem('masterInfo');
      masterInfo = JSON.parse(masterInfo);
      const accessToken = masterInfo.accessToken;
      const loginName = masterInfo.loginName;
      LoadingAction(accessToken, loginName);
    } else {
      const accessToken = '37316a31-a59c-426d-92e1-ca406139c965';
      const loginName = 'wuyafeiJS';
      LoadingAction(accessToken, loginName);
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'IndexPage/fetchTopics', payload: { tab: 'all' } });
  }
  tabs = [
    {
      title: '全部',
      filter: 'all',
    },
    {
      title: '精华',
      filter: 'good',
    },
    {
      title: '分享',
      filter: 'share',
    },
    {
      title: '问答',
      filter: 'ask',
    },
    {
      title: '招聘',
      filter: 'job',
    },
  ]
  handlerTabClick(activeKey) {
    const { dispatch } = this.props;
    const tab = this.tabs[activeKey].filter;

    dispatch({ type: 'IndexPage/fetchTopics', payload: { tab } });
    dispatch({ type: 'IndexPage/selectTab', payload: tab });
    this.setState({ activeKey });
  }
  render() {
    const { data, loading, dispatch, tab } = this.props;
    const tabs = this.tabs;
    function tabpane() {
      return tabs.map((v, k) => (
        <TabPane tab={v.title} key={k}>
          { loading === false && v.filter === tab ? <Topics data={data} dispatch={dispatch} /> : <Spin size="large" /> }
        </TabPane>
      ));
    }
    return (
      <div className={styles.normal}>
        <Header style={{ background: '#108EE9', color: '#fff' }}>
          <Row>
            <Col span={4} style={{ textAlign: 'left' }}>
              <Link to="users">
                <Button type="primary" shape="circle" icon="bars" />
              </Link>
            </Col>
            <Col span={16} className={styles.title}>NodeJs</Col>
            <Col span={4} style={{ textAlign: 'right' }}>
              <Link to="textlink">
                <Button type="primary" shape="circle" icon="bell" />
              </Link>
            </Col>
          </Row>
          <Tabs type="line" onTabClick={this.handlerTabClick.bind(this)}>
            {
              tabpane()
            }
          </Tabs>
        </Header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { data, tab } = state.IndexPage;
  return {
    loading: state.loading.models.IndexPage,
    data,
    tab,
  };
};
export default connect(mapStateToProps)(IndexPage);
