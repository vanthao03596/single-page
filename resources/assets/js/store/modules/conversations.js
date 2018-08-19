import axios from 'axios'
import api from '../api/all.js'
export const state = {
    conversations: [],
    loadingConversations: false
}

export const getters = {
  allConversations : state => {
    return state.conversations
  },
  loadingConversations: state => {
      return state.loadingConversations
  }

}

export const mutations = {
  setConversations(state, conversations) {
    state.conversations = conversations
  }
}

export const actions = {
  getConversations ({ commit, dispatch }, payload) {
    api.getConversations(1).then((response) => {
      commit('setConversations', response.data.data)
    })
  }
}




