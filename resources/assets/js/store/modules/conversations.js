import api from '../api/all.js'
export const state = {
  conversations: [],
  loadingConversations: true
}

export const getters = {
  allConversations: state => {
    return state.conversations
  },
  loadingConversations: state => {
    return state.loadingConversations
  }
}

export const mutations = {
  setConversations (state, conversations) {
    state.conversations = conversations
  },
  setConversationsLoading (state, status) {
    state.loadingConversations = status
  },
  changeTopConversations (state, conversation) {
    state.conversations = state.conversations.filter((item) => {
      return item.id !== conversation.id
    })
    state.conversations.unshift(conversation)
  }
}

export const actions = {
  getConversations ({ commit, dispatch }, payload) {
    commit('setConversationsLoading', true)
    api.getConversations(1).then(response => {
      commit('setConversations', response.data.data)
      commit('setConversationsLoading', false)
    })
  }
}
