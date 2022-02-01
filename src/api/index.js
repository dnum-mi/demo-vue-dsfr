const apiBaseUrl = '/api/v1'

const apiRoutes = {
  notifications: '/notifications',
  users: '/users',
  profiles: '/profiles',
  healthCheck: '/healthCheck',
}

export const fetchClient = {
  getJson (url, options) {
    return fetch(url, options).then(res => res.json())
  },
}

export function getNotifications () {
  return fetchClient.getJson(apiBaseUrl + apiRoutes.notifications)
}

export function getUsers () {
  return fetchClient.getJson(apiBaseUrl + apiRoutes.users)
}

export function getProfile () {
  return fetchClient.getJson(apiBaseUrl + apiRoutes.profiles)
}

export function getHealthCheck () {
  return fetchClient.getJson(apiBaseUrl + apiRoutes.healthCheck)
}
