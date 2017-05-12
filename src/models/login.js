import * as usersService from '../services/IndexPage';

export default {
  namespace: 'login',
  state: {},
  reducers: {
    loginSucceed(state = { succeed: false }, { payload: { loginName, loginId, accessToken } }) {
      return { ...state, succeed: true, loginName, loginId, accessToken };
    },
    loginFailed(state = { succeed: false }, { payload: { failedMessage } }) {
      return { ...state, succeed: false, failedMessage };
    },
    loginOut(state = { succeed: false }, {}) {
      return { ...state, succeed: false };
    },
  },
  effects: {
    *fetchAccess({ payload: accessToken }, { put, call }) {
      const { data } = yield call(usersService.fetchAccess, accessToken);
      if (data.success) {
        yield put({
          type: 'loginSucceed',
          payload: {
            loginName: data.loginname,
            loginId: data.id,
            accessToken,
          },
        });
      } else {
        yield put({
          type: 'loginFailed',
          payload: {
            failedMessage: data.error_msg,
          },
        });
      }
    },
    *fetchProfile({ payload: loginName }, { put, call }) {
      const { data } = yield call(usersService.fetchProfile, loginName);
      yield put({
        type: 'receiveProfile',
        payload: {
          loginName,
          profile: data.data,
        },
      });
    },
  },
  subscriptions: {},
};
