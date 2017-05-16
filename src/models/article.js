import * as usersService from '../services/IndexPage';

export default {
  namespace: 'Article',
  state: { article: {} },
  reducers: {
    receiveArticle(state, { payload: { topicId, article } }) {
      return { ...state, topicId, article };
    },
    receiveComment(state, { payload: { isCommented, replyId } }) {
      return { ...state, isCommented, replyId };
    },
    recordArticleScrollT(state = { scroll: 0 }, { payload: { scrollT, topicId } }) {
      return { ...state, scrollT, [topicId]: scrollT };
    },
    receiveUps(state, { payload: { replyId, index, isSupported, action } }) {
      return { ...state, replyId, index, isSupported, action };
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
          isCommented: data.success,
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
    *switchSupport({ payload: { accessToken, replyId, index } }, { call, put, select }) {
      const { data } = yield call(usersService.fetchSupport, { replyId, accessToken });
      yield put({
        type: 'receiveUps',
        payload: {
          replyId,
          index,
          isSupported: data.success,
          action: data.action,
        },
      });
      const topicId = yield select(state => state.Article.topicId);
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
