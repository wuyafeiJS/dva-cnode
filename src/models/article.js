import * as usersService from '../services/IndexPage';

export default {
  namespace: 'Article',
  state: {},
  reducers: {
    receiveArticle(state, { payload: { topicId, article } }) {
      return { ...state, topicId, article };
    },
    receiveComment(state, { payload: { success, replyId } }) {
      return { ...state, success, replyId };
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
    *fetchComment({ payload: { accessToken, topicId, content, replyId } }, { call, put }) {
      const { data } = yield call(usersService.fetchComment, { accessToken, topicId, content, replyId });
      yield put({
        type: 'receiveComment',
        payload: {
          success: data.success,
          replyId: data.reply_id,
        },
      });
      yield put({// 重新刷新评论区
        type: 'fetchArticle',
        payload: {
          topicId,
        },
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
