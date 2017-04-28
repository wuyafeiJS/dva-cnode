import request from '../utils/request';

export function fetchTopics({ tab, page, limit }) {
  console.log('dfe')
  return request(`/api/topics?tab=${tab}&page=${page}&limit=${limit}`);
}

export function fetchAccess(accessToken) {
  return request('/api/accesstoken', {
    method: 'POST',
    body: `accesstoken=${accessToken}`,
  });
}

export function fetchArticle(topicId) {
  console.log('dfd')
  return request(`/api/topic/${topicId}`);
}
