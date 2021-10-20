import { createStore } from 'vuex'
import apiClient from '../api/index.js'

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
        const notifications = await apiClient.getNotifications()
        commit('setNotifications', notifications)
      } catch (error) {
        // Display error to user
      }
    },
    async fetchUsers ({ commit }) {
      try {
        const users = await apiClient.getUsers()
        commit('setUsers', users)
      } catch (error) {
        // Display error to user
      }
    },
  },
})
