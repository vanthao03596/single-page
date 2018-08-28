<template>
  <card :title="$t('all_conversations')">
    <div class="loader" v-if="loading"></div>
    <div class="media" v-for="conversation in conversations" :key="conversation.id" v-else-if="conversations.length">
      <div class="media-body">
        <router-link :to="{ name: 'conversation.show', params: { id : conversation.id} }" active-class="active">
          {{ trunc(conversation.body, 20) }}
        </router-link>
        <p class="text-muted">
         {{ $t('you_and') }} {{ conversation.participant_count }} {{ $t('other') }}
        </p>
        <ul class="list-inline">
          <li>
            <a href="#" :title="user.name" v-for="user in conversation.users.data" :key="user.id" >
              <img class="pr-1" :src="user.avatar" :alt="user.name">
            </a>
          </li>
          <li>{{ $t('last_reply') }} {{ conversation.last_reply_human | ago(locale) }}</li>
        </ul>
      </div>
    </div>
    <div v-else>No conversations</div>
  </card>
</template>

<script>
import { ago } from '../helplers/filters'
import trunc from '../helplers/trunc'
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('conversations', {
      conversations: 'allConversations',
      loading: 'loadingConversations'
    }),
    ...mapGetters('lang', {
      locale: 'locale'
    })
  },
  methods: {
    ...mapActions('conversations', {
      getConversations: 'getConversations'
    }),
    ...mapActions('conversation', {
      getConversation: 'getConversation'
    }),
    trunc
  },
  mounted() {
    this.getConversations(1)
  },
  filters: {
    ago
  },
  name: 'Conversations',

  data() {
    return {}
  }
}
</script>

<style lang="css" scoped>
</style>
