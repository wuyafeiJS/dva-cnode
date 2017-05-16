import * as usersService from '../services/IndexPage';

export default {
  namespace: 'IndexPage',
  state: { tab: 'all', data: [] },
  reducers: {
    selectTab(state, { payload: { tab, activeKey } }) {
      return { ...state, tab, activeKey };
    },
    tabData(state, { payload: { data, page } }) {
      if (state.page < page) {
        let topics = state.data;
        data = topics.concat(data);
      }
      return { ...state, data, page };
    },
    recordScrollT(state = { scrollT: 0 }, { payload: { tab, scrollT } }) {
      return { ...state, scrollT, [tab]: scrollT };
    },
  },
  effects: {
    *fetchTopics({ payload: { tab, page = 1, limit = 20 } }, { call, put }) {
      const { data } = yield call(usersService.fetchTopics, { tab, page, limit });
      yield put({
        type: 'tabData',
        payload: {
          data: data.data,
          page: parseInt(page, 10),
        },
      });
    },
  },
  subscriptions: {},
};
