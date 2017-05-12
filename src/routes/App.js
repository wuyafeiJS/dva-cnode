import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './App.css';


class App extends Component {
  componentWillMount() {
    // console.log('componentWillMount')
    const { profile, dispatch } = this.props;
    const LoadingAction = (accessToken, loginName) => {
      dispatch({ type: 'login/fetchAccess', payload: accessToken });
      dispatch({ type: 'message/fetchMessage', payload: accessToken });
      dispatch({ type: 'profile/fetchProfile', payload: loginName });
    };
    if (window.localStorage.getItem('loginInfo')) {
      let loginInfo = window.localStorage.getItem('loginInfo');
      loginInfo = JSON.parse(loginInfo);
      const accessToken = loginInfo.accessToken;
      let loginName = loginInfo.loginName;
      LoadingAction(accessToken, loginName);
    } else {
      const accessToken = '37316a31-a59c-426d-92e1-ca406139c965';
      const loginName = 'wuyafeiJS';
      LoadingAction(accessToken, loginName);
    }
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {

};

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

export default connect(mapStateToProps)(App);
