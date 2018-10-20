import Vue from 'vue'
import Vuex from 'vuex'
// TODO: introduce vuex-persistedstate
// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    locale: 'fr',
    user: null,
    messages: [],
    channel: null,
    channels: null,
    channelUsers: []
  },

  // plugins: [createPersistedState()],

  mutations: {

    SET_USER: (state, user) => {
      state.user = user
    },

    SET_CHANNELS: (state, channels) => {
      state.channels = channels
    },

    SET_CHANNEL: (state, channel) => {
      state.channel = channel
    },

    SET_CHANNEL_USERS: (state, channelUsers) => {
      state.channelUsers = channelUsers
    },

    SET_MESSAGES: (state, messages) => {
      state.messages = messages
    }

  },

  actions: {

    addMessage: ({ commit, state }, message) => {
      commit('SET_MESSAGES', state.messages.concat(message))
    },

    addMessages: ({ commit, state }, messages) => {
      commit('SET_MESSAGES', messages.concat(state.messages))
    },

    addChannelUser: ({ commit, state }, user) => {
      commit('SET_CHANNEL_USERS', state.channelUsers.concat(user))
    },

    removeChannelUser: ({ commit, state }, user) => {
      commit('SET_CHANNEL_USERS', state.channelUsers.filter(it => it.userId !== user.userId))
    }

  },

  getters: {

    earliestMessage(state) {
      return state.messages[0]
    }

  }

})
