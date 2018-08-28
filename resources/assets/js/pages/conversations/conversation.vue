<template>
    <div v-if="loading">
        <div class="loader">
        </div>
    </div>
    <div v-else-if="conversation">

        <ul class="list-inline" v-if="conversation.users.data.length">
            <li class="list-inline-item"><strong>In conversation:</strong></li>
            <li class="list-inline-item" v-for="user in conversation.users.data" :key="user.id">{{ user.name }}</li>
        </ul>
        <hr>
        <add-user></add-user>

        <reply-form></reply-form>

        <hr>
        <transition-group
          name="fade">
          <div class="media mb-5" v-for="reply in conversation.replies.data" :key="reply.id">
            <img class="mr-3" :src="reply.user.data.avatar" alt="reply.user.data.name">
            <div class="media-body">
                <p class="mb-1">{{ reply.user.data.name }} &bull; {{ reply.created_at_human | ago(locale) }}</p>
                <card>
                    {{ reply.body }}
                </card>
            </div>
        </div>
        </transition-group>


        <div class="media mb-5">
            <img class="mr-3" :src="conversation.user.data.avatar" alt="conversation.user.data.name">
            <div class="media-body">
                <p class="mb-1">{{ conversation.user.data.name }} &bull; {{ conversation.created_at_human | ago(locale) }}</p>
                <card>
                    {{ conversation.body }}
                </card>
            </div>
        </div>
    </div>
    <div v-else>Select Conversation</div>
</template>

<script>
import { ago } from '../../helplers/filters.js'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Conversation',
  computed: {
    ...mapGetters('conversation', {
      conversation: 'currentConversation',
      loading: 'loadingConversation'
    }),
    ...mapGetters('lang', {
      locale: 'locale'
    })
  },
  methods: {
    ...mapActions('conversation', {
      getConversation: 'getConversation'
    })
  },
  created() {
    this.getConversation(this.$route.params.id)
  },
  watch: {
    '$route.params.id': function(id) {
      this.getConversation(id)
    }
  },
  filters: {
    ago
  }
}
</script>

<style>
</style>
