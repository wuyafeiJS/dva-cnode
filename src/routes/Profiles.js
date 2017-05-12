import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import Profile from '../components/Profile/Profile';

function Profiles({ dispatch, loading, profile, loginData }) {
  const { collectTopics } = profile;
  return (
    <div>
      { loading === false && collectTopics ? <Profile loginData={loginData} dispatch={dispatch} collectTopics={collectTopics} profile={profile.profile} /> : <Spin style={{ margin: '100px auto' }} size="large" /> }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.profile,
    profile: state.profile,
    loginData: state.login,
  };
}

export default connect(mapStateToProps)(Profiles);
