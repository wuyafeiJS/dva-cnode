import * as usersService from '../services/IndexPage';

export default {
  namespace: 'publish',
  state: {},
  reducers: {
    receivePublish(state, { payload: { success, topicId } }) {
      return { ...state, success, topicId };
    },
  },
  effects: {
    *fetchPublishTopic({ payload: { accessToken, select, title, content } }, { call, put }) {
      const { data } = yield call(usersService.fetchPublishTopic, { accessToken, select, title, content });
      yield put({
        type: 'receivePublish',
        payload: {
          success: data.success,
          topicId: data.topic_id,
        },
      });
    },
  },
  subscriptions: {},
};
