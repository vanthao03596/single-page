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
            <img :src="user.avatar" v-for="user in conversation.users.data" :key="user.id" :alt="user.name" :title="user.name">
          </li>
          <li>{{ $t('last_reply') }} {{ conversation.last_reply_human }}</li>
        </ul>
      </div>
    </div>
    <div v-else>No conversations</div>
  </card>
</template>

<script>
import trunc from '../helplers/trunc'
import { mapActions, mapGetters } from 'vuex'
export default {
  computed : {
    ...mapGetters('conversations',{
      conversations : 'allConversations',
      loading : 'loadingConversations'
    }),
  },
  methods : {
    ...mapActions('conversations',{
      getConversations : 'getConversations'
    }),
    ...mapActions('conversation',{
      getConversation : 'getConversation'
    }),
    trunc
  },
  mounted() {
    this.getConversations(1)
  },
  name: 'Conversations',

  data () {
    return {

    }
  },

}
</script>

<style lang="css" scoped>
</style>
