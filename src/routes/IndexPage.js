import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Row, Col, Tabs, Button, Spin, Icon } from 'antd';
import { Link } from 'dva/router';
import Topics from '../components/Topics/Topics';
import styles from './IndexPage.css';
import transformDate from '../utils/transformDate';
import getSize from '../utils/getSize';

const { Header, Content } = Layout;
const TabPane = Tabs.TabPane;

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideShow: false,
      scrollT: 0,
    };
  }
  componentDidMount() {
    const { dispatch, tab, page, scrollT } = this.props;
    dispatch({ type: 'IndexPage/fetchTopics', payload: { tab: 'all' } });
    // if (scrollT) {
    //   widnow.scrollTo(0, scrollT);
    // }
  }
  componentWillReceiveProps(nextProps) {
    const { loginData, tab, profile, dispatch, loading2 } = nextProps;
    if (!loading2 && loginData.loginName && loginData.loginName !== profile.loginName) {
      dispatch({ type: 'profile/fetchProfile', payload: loginData.loginName });
    }
    // 去除刷新时记住的滚动条位置
    if (this.props.scrollT === 0) {
      window.scrollTo(0, 0);
    }

    window.onscroll = () => {
      const { windowH, contentH, scrollT } = getSize();
      if (windowH + scrollT + 100 > contentH) {
        //这里dispatch recordScroll会执行两次，一次得到的scrollT是正常值，另一次为0;
        if (scrollT > 0) { this.setState({ scrollT: parseInt(scrollT, 10) }); }
        dispatch({ type: 'IndexPage/recordScrollT', payload: { tab, scrollT: this.state.scrollT } });
        this.loadMore();
      }

      // 由于下面的操作比较费cpu,所以进行判断是否为手机端
      // const ua = navigator.userAgent;
      // if (ua.indexOf('Mobile') === -1) {
      //   if (!lastScrollY || !scrollT) {
      //     lastScrollY = scrollT;
      //   }
      //   const diff = scrollT - lastScrollY;
      //   if (diff >= 0) {
      //     if (scrollT > 64 && this.state.fixedTop !== 64) {
      //       this.setState({
      //         fixedTop: 64,
      //       });
      //     }
      //     if (scrollT <= 64) {
      //       this.setState({
      //         fixedTop: scrollT,
      //       });
      //     }
      //   } else {
      //     this.setState({
      //       scrollT: 0,
      //     });
      //     if (scrollT > 64 && this.state.fixedTop !== 0) {
      //       this.setState({
      //         fixedTop: 0,
      //       });
      //     }
      //   }
      //   lastScrollY = scrollT;
      // }
    };
  }
  componentDidUpdate() {
    // let { windowH, contentH, scrollT } = getSize();
    const { currentTopicT } = this.props;
    // 根据不同的tab决定滚动条的位置
    if (currentTopicT) {
      window.scrollTo(0, currentTopicT);
    } else {
      window.scrollTo(0, 0);
    }
  }
  componentWillUnmount() {
    let { scrollT } = getSize();
    const { tab, dispatch } = this.props;
    // dispatch({ type: 'IndexPage/recordScrollT', payload: { tab, scrollT } });
    // 必须解绑事件，否则当组件再次被加载时，该事件会监听两个组件
    window.onscroll = null;
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
  loadMore = () => {
    const { tab, page, dispatch, loading } = this.props;
    let ipage = page;
    if (!loading) {
      dispatch({ type: 'IndexPage/fetchTopics', payload: { tab, page: ++ipage } });
    }
  }
  handlerTabClick(activeKey) {
    const { dispatch } = this.props;
    const tab = this.tabs[activeKey].filter;
    dispatch({ type: 'IndexPage/fetchTopics', payload: { tab } });
    dispatch({ type: 'IndexPage/selectTab', payload: tab });
  }
  handleClick() {
    this.setState({ sideShow: true });
  }
  handleClose() {
    this.setState({ sideShow: false });
  }
  handleLoginOut() {
    const { dispatch } = this.props;
    this.setState({ sideShow: false });
    window.localStorage.removeItem('loginInfo');
    window.sessionStorage.removeItem('loginInfo');
    dispatch({ type: 'login/loginOut' });
  }
  render() {
    const { data, loading, loading2, dispatch, tab, profile, loginData, message } = this.props;
    const succeed = loginData.succeed;
    if (!loading2 && succeed) {
      var { avatar_url, create_at, loginname, score } = profile.profile;// 不能用const或者let，因为他们形成了块级作用域
    }
    const tabs = this.tabs;
    function tabpane() {
      return tabs.map((v, k) => (
        <TabPane tab={v.title} key={k}>
          { v.filter === tab && <Topics loading={loading} data={data} dispatch={dispatch} />}
        </TabPane>
      ));
    }
    return (
      <div className={styles.normal}>
        <Header style={{ background: '#108EE9', color: '#fff' }}>
          <Row>
            <Col span={4} style={{ textAlign: 'left' }}>
              <Button type="primary" shape="circle" icon="bars" onClick={this.handleClick.bind(this)} />
            </Col>
            <Col span={16} className={styles.title}>NodeJs</Col>
            <Col span={4} style={{ textAlign: 'right' }}>
              <Link to="message" style={{ position: 'relative' }}>
                <Button type="primary" shape="circle" icon="bell" />
                <span className={styles.message}>{ message.hasReadMessage ? message.hasReadMessage.length + message.hasNotReadMessage.length : 0 }</span>
              </Link>
            </Col>
          </Row>
          <div
            className={styles.mask}
            style={{ display: this.state.sideShow ? 'block' : 'none' }}
            onClick={this.handleClose.bind(this)}
          ></div>
          <div className={styles.sideBar} style={{ display: this.state.sideShow ? 'block' : 'none' }}>
            { !loading2 && succeed &&
              <div>
                <div className={styles.profile}>
                  <Link to={`profile/${loginname}`}><img src={avatar_url} alt={loginname} /></Link>
                  <p>{loginname}</p>
                  <p>积分:{score}</p>
                  <p>注册于:{transformDate(create_at)}</p>
                  <p><Button onClick={this.handleLoginOut.bind(this)}>注销登录</Button></p>
                </div>
                <ul className={styles.funcList}>
                  <li>
                    <Link to={`profile/${loginname}`}><Icon type="user" style={{ marginRight: '10px' }} />个人中心</Link>
                  </li>
                  <li>
                    <Link to={`profile/${loginname}`}><Icon type="mail" style={{ marginRight: '10px' }} />未读信息</Link>
                  </li>
                </ul>
              </div>
            }
            {!succeed &&
              <div className={styles.profile}>
                <Link to="login">
                  <b><Icon type="user" style={{ fontSize: '24px', color: '#fff' }} /></b>
                </Link>
                <p>点击头像登录</p>
              </div>
            }
          </div>
        </Header>
        <Content>
          <Tabs type="line" onTabClick={this.handlerTabClick.bind(this)}>
            {
              tabpane()
            }
          </Tabs>
        </Content>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { data, tab, page, scrollT } = state.IndexPage;
  return {
    loading: state.loading.models.IndexPage,
    loading2: state.loading.models.profile,
    profile: state.profile,
    loginData: state.login,
    message: state.message,
    currentTopicT: state.IndexPage[tab],
    data,
    tab,
    page,
    scrollT,
  };
};
export default connect(mapStateToProps)(IndexPage);
