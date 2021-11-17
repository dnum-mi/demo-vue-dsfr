import { createStore } from 'vuex'
import apiClient from '../api/index.js'

export default createStore({
  state: {
    showNotifications: false,
    showProfile: false,
    loggedIn: false,
    notifications: [],
    users: [],
    profile: {},
  },
  mutations: {
    toggleNotifications (state) {
      state.showNotifications = !state.showNotifications
    },
    toggleProfile (state) {
      state.showProfile = !state.showProfile
    },
    setProfile (state, profile) {
      state.profile = profile
    },
    disconnectUser (state) {
      state.profile = undefined
    },
    setNotifications (state, notifications) {
      state.notifications = notifications
    },
    setUsers (state, users) {
      state.users = users
    },
    connectUser (state) {
      state.loggedIn = true
    },
  },
  actions: {
    toggleNotifications ({ commit }) {
      commit('toggleNotifications')
    },
    toggleProfile ({ commit }) {
      commit('toggleProfile')
    },
    async fetchProfile ({ commit }) {
      try {
        const profiles = await apiClient.getProfile()
        commit('setProfile', profiles[0])
      } catch (error) {
        // Display error to user
      }
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
        // Display error to profile
      }
    },
    async connectUser ({ commit, dispatch }) {
      try {
        commit('connectUser')
        await dispatch('fetchProfile')
      } catch (error) {
        // Display error to profile
      }
    },
  },
})
