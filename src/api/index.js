const apiBaseUrl = '/api/v1'

const apiRoutes = {
  notifications: '/notifications',
  users: '/users',
  profiles: '/profiles',
}

export const xhrClient = {
  getJson (url, options) {
    return fetch(url, options).then(res => res.json())
  },
}

export default {
  getNotifications () {
    return xhrClient.getJson(apiBaseUrl + apiRoutes.notifications)
  },

  getUsers () {
    return xhrClient.getJson(apiBaseUrl + apiRoutes.users)
  },

  getProfile () {
    return xhrClient.getJson(apiBaseUrl + apiRoutes.profiles)
  },
}
