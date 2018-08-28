<template>
        <div class="form-group">
            <input type="text" id="add-user" placeholder="Start type to find user" class="form-control">
        </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { userautocomplete } from '../helplers/autocomplete.js'
export default {
  name: 'AddUser',
  computed: {
    ...mapGetters({
      conversation: 'conversation/currentConversation'
    })
  },
  methods: {
    ...mapActions('conversation', ['addConversationUser'])
  },
  mounted() {
    var users = userautocomplete('#add-user').on(
      'autocomplete:selected',
      (e, selection) => {
        this.addConversationUser({
          id: this.conversation.id,
          contacts: [selection].map(contact => {
            return contact.id
          })
        })
        users.autocomplete.setVal('')
      }
    )
  }
}
</script>

<style>
</style>
