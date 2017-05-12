import request from '../utils/request';

export function fetchTopics({ tab, page, limit }) {
  return request(`/api/topics?tab=${tab}&page=${page}&limit=${limit}`);
}

export function fetchAccess(accessToken) {
  return request('/api/accesstoken', {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `accesstoken=${accessToken}`,
  });
}

export function fetchArticle(topicId) {
  return request(`/api/topic/${topicId}`);
}

export function fetchProfile(loginname) {
  return request(`/api/user/${loginname}`);
}

export function fetchMessage(accessToken) {
  return request(`/api/messages?accesstoken=${accessToken}`);
}

export function getCollectedTopics(userName) {
  return request(`/api/topic_collect/${userName}`);
}

export function fetchComment({ accessToken, topicId, content, replyId }) {
  const postConent = replyId ? `accesstoken=${accessToken}&content=${content}&replyId=${replyId}` : `accesstoken=${accessToken}&content=${content}`
  return request(`/api/topic/${topicId}/replies`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: postConent,
  });
}