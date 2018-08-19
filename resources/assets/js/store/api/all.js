import axios from 'axios'
export default {
    getConversation (id) {
        return new Promise((resolve, reject) => {
            axios.get('/api/conversations/' + id).then((response) => {
                resolve(response)
            })
        })
    },
    getConversations (page) {
        return new Promise((resolve, reject) => {
            axios.get('/api/conversations?page=' + page).then((response) => {
                resolve(response)
            })
        })
    },
    storeConversationReply (id, {body}) {
        return new Promise((resolve, reject) => {
            axios.post('/api/conversations/' + id + '/reply', {
                body: body
            }).then((response) => {
                resolve(response)
            })
        })
    },
    storeConversation ({body, recipientIds}) {
        return new Promise((resolve, reject) => {
            axios.post('/api/conversations', {
                body: body,
                recipients: recipientIds
            }).then((response) => {
                resolve(response)
            })
        })
    },
    storeConversationUsers (id, {recipientIds}) {
        return new Promise((resolve, reject) => {
            axios.post('/api/conversations/' + id + '/users', {
                recipients: recipientIds
            }).then((response) => {
                resolve(response)
            })
        })
    }
}
