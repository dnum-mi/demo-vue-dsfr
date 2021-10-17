import { createStore } from 'vuex'

export default createStore({
  state: {
    showNotifications: false,
    notifications: [],
    users: [],
  },
  mutations: {
    toggleNotifications (state) {
      state.showNotifications = !state.showNotifications
    },
    setNotifications (state, notifications) {
      state.notifications = notifications
    },
    setUsers (state, users) {
      state.users = users
    },
  },
  actions: {
    toggleNotifications ({ commit }) {
      commit('toggleNotifications')
    },
    async fetchNotifications ({ commit }) {
      try {
        const notifications = await fetch('http://localhost:3004/notifications').then(response => response.json())
        commit('setNotifications', notifications)
      } catch (error) {
        // Display error to user
      }
    },
    async fetchUsers ({ commit }) {
      try {
        const users = await fetch('http://localhost:3004/users').then(response => response.json())
        commit('setUsers', users)
      } catch (error) {
        // Display error to user
      }
    },
  },
})
