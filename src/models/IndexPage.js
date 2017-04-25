import * as usersService from '../services/IndexPage';

export default {
  namespace: 'IndexPage',
  state: { tab: 'all' },
  reducers: {
    selectTab(state, { payload: tab }) {
      return { ...state, tab };
    },
    tabData(state, { payload: { data, total, page } }) {
      return { ...state, data, total, page };
    },
    loginSucceed(state = { succeed: false }, { loginName, loginId, accessToken }) {
      return { ...state, loginName, loginId, accessToken };
    },
  },
  effects: {
    *fetchTopics({ payload: { tab, page = 1, limit = 20 } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetchTopics, { tab, page, limit });
      yield put({
        type: 'tabData',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *fetchAccess({ payload: accessToken }, { put, call }) {
      const { data } = yield call(usersService.fetchAccess, accessToken);
      yield put({
        type: 'loginSucceed',
        payload: {
          loginName: data.loginname,
          loginId: data.id,
          accessToken,
        },
      });
    },
  },
  subscriptions: {},
};
