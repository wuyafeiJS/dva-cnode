import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout, Row, Col, Button, Spin } from 'antd';
import WrappedNormalLoginForm from '../components/Login/Login';
import Profiles from './Profiles';
import styles from './Login.css';

const { Header, Content } = Layout;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleOn: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  componentWillReceiveProps(newProps) {
    const { loginData, dispatch, profile, loading2 } = newProps;
    let { succeed, loginName, accessToken } = loginData;
    if (succeed && !loading2 && profile.loginName !== loginName) {
      if (this.state.toggleOn && !window.localStorage.getItem('loginInfo')) {
        accessToken = accessToken.trim();
        loginName = loginName.trim();
        let loginInfo = { accessToken, loginName };
        loginInfo = JSON.stringify(loginInfo);
        window.localStorage.setItem('loginInfo', loginInfo);
      }
      dispatch({ type: 'profile/fetchProfile', payload: loginName });
      // dispatch({ type: 'profile/fetchMessage', payload: accessToken });
    }
  }
  handleToggle(status) {
    this.setState({
      toggleOn: status,
    });
  }
  render() {
    const { loginData, profile, dispatch, loading } = this.props;
    const { succeed } = loginData;
    const loginInfo = window.localStorage.getItem('loginInfo') ? true : false;
    return (
      <div className={styles.normal}>
        <Header style={{ background: '#108EE9', color: '#fff' }}>
          <Row>
            <Col span={4} style={{ textAlign: 'left' }}>
              <a href="javascript:history.go(-1)">
                <Button type="primary" shape="circle" icon="left" />
              </a>
            </Col>
            <Col span={16} className={styles.title}>个人中心</Col>
            <Col span={4} style={{ textAlign: 'right' }}>
            </Col>
          </Row>
        </Header>
        <Content>
          { !succeed && !loginInfo && <WrappedNormalLoginForm handleToggle={this.handleToggle} loading={loading} loginData={loginData} dispatch={dispatch} /> }
          { succeed && profile.loginName && <Profiles /> }
        </Content>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.login,
    loading2: state.loading.models.profile,
    loginData: state.login,
    profile: state.profile,
  };
}

export default connect(mapStateToProps)(Login);
