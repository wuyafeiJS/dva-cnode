import * as usersService from '../services/IndexPage';

export default {
  namespace: 'message',
  state: {},
  reducers: {
    receiveMessage(state, { payload: { hasReadMessage, hasNotReadMessage } }) {
      return { ...state, hasReadMessage, hasNotReadMessage };
    },
  },
  effects: {
    *fetchMessage({ payload: accessToken }, { put, call }) {
      const { data } = yield call(usersService.fetchMessage, accessToken);
      yield put({
        type: 'receiveMessage',
        payload: {
          hasReadMessage: data.data.has_read_messages,
          hasNotReadMessage: data.data.hasnot_read_messages,
        },
      });
    },
  },
  subscriptions: {},
};
