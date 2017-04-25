import request from '../utils/request';

export function fetchTopics({ tab, page, limit }) {
  return request(`/api/topics?tab=${tab}&page=${page}&limit=${limit}`);
}

export function fetchAccess(accessToken) {
  return request('https://cnodejs.org/api/v1/accesstoken', {
    method: 'POST',
    body: `accesstoken=${accessToken}`,
  });
}
