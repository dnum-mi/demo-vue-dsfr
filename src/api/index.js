const apiBaseUrl = '/api/v1'

const apiRoutes = {
  notifications: '/notifications',
  users: '/users',
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
}
