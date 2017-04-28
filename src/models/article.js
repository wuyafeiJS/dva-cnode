import * as usersService from '../services/IndexPage';

export default {
  namespace: 'Article',
  state: {},
  reducers: {
    receiveArticle(state, { payload: { topicId, article } }) {
      return { ...state, topicId, article };
    },
  },
  effects: {
    *fetchArticle({ payload: { topicId } }, { call, put }) {
      const { data } = yield call(usersService.fetchArticle, topicId);
      yield put({
        type: 'receiveArticle',
        payload: { topicId, article: data.data },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/topic') !== -1) {
          const topicId = pathname.split('/topic/')[1];
          dispatch({ type: 'fetchArticle', payload: { topicId } });
        }
      });
    },
  },
};
