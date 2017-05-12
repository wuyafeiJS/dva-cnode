import * as usersService from '../services/IndexPage';

export default {
  namespace: 'profile',
  state: {},
  reducers: {
    receiveProfile(state = { profile: {} }, { payload: { loginName, profile } }) {
      return { ...state, loginName, profile };
    },
    receiveCollectTopics(state, { payload: { collectTopics } }) {
      return { ...state, collectTopics };
    },
  },
  effects: {
    *fetchProfile({ payload: loginName }, { put, call }) {
      const { data } = yield call(usersService.fetchProfile, loginName);
      yield put({
        type: 'getCollectedTopics',
        payload: loginName,
      });
      yield put({
        type: 'receiveProfile',
        payload: {
          loginName,
          profile: data.data,
        },
      });
    },
    *getCollectedTopics({ payload: userName }, { call, put }) {
      const { data } = yield call(usersService.getCollectedTopics, userName);
      yield put({
        type: 'receiveCollectTopics',
        payload: {
          collectTopics: data.data,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/profile') !== -1) {
          const loginname = pathname.split('/profile/')[1];
          dispatch({ type: 'fetchProfile', payload: loginname });
          // if (window.localStorage.getItem('loginInfo')) {
          //   let loginInfo = window.localStorage.getItem('loginInfo');
          //   loginInfo = JSON.parse(loginInfo);
          //   loginInfo.loginName = loginname;
          //   loginInfo = JSON.stringify(loginInfo);
          //   window.localStorage.setItem('loginInfo', loginInfo);
          // }
        }
      });
    },
  },
};
