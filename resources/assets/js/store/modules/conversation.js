import api from '../api/all.js'
export const state = {
  conversation: null,
  loadingConversation: false
}

export const getters = {
  currentConversation: state => {
    return state.conversation
  },
  loadingConversation: state => {
    return state.loadingConversation
  }
}

export const mutations = {
  setConversation (state, conversation) {
    state.conversation = conversation
  },
  setConversationLoading (state, status) {
    state.loadingConversation = status
  },
  appendToConversation (state, reply) {
    state.conversation.replies.data.unshift(reply)
  }
}

export const actions = {
  getConversation ({ dispatch, commit }, id) {
    commit('setConversationLoading', true)
    api.getConversation(id).then(response => {
      commit('setConversation', response.data.data)
      commit('setConversationLoading', false)
    })
  },
  createConversationReply ({ dispatch, commit }, {id, body}) {
    return api.storeConversationReply(id, {body}).then(response => {
      commit('appendToConversation', response.data.data)
      commit('conversations/changeTopConversations', response.data.data.parent.data, { root: true })
    })
  },
  createConversation ({ dispatch, commit }, {body, contacts}) {
    return api.storeConversation({body, contacts}).then(response => {
      commit('setConversation', response.data.data)
      commit('conversations/changeTopConversations', response.data.data, { root: true })
    })
  }
}
