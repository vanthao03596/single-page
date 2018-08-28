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
  },
  addUserToConversation (state, users) {
    state.conversation.users.data = users
  }
}

export const actions = {
  getConversation ({ dispatch, commit }, id) {
    commit('setConversationLoading', true)
    if (state.conversation) {
      window.Echo.leave('conversation' + state.conversation.id)
    }

    api.getConversation(id).then(response => {
      commit('setConversation', response.data.data)
      commit('setConversationLoading', false)
      window.Echo.private('conversation.' + id).listen(
        'ConversationReplyCreated',
        e => {
          commit('appendToConversation', e.data)
        }
      )
    })
  },
  createConversationReply ({ dispatch, commit }, { id, body }) {
    return api.storeConversationReply(id, { body }).then(response => {
      commit('appendToConversation', response.data.data)
      commit(
        'conversations/changeTopConversations',
        response.data.data.parent.data,
        { root: true }
      )
    })
  },
  createConversation ({ dispatch, commit }, { body, contacts }) {
    return api.storeConversation({ body, contacts }).then(response => {
      commit('setConversation', response.data.data)
      commit('conversations/changeTopConversations', response.data.data, {
        root: true
      })
    })
  },
  addConversationUser ({ dispatch, commit }, { id, contacts }) {
    return api.storeConversationUsers(id, contacts).then(response => {
      commit('addUserToConversation', response.data.data.users.data)
      commit('conversations/addUserToConversations', response.data.data, {
        root: true
      })
    })
  }
}
