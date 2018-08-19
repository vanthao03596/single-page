<template>
  <card :title="$t('all_conversations')">
    <div class="media" v-for="conversation in conversations">
      <div class="media-body">
        <a href="">{{ conversation.body }}</a>
        <p class="text-muted">
         {{ $t('you_and') }} {{ conversation.participant_count }} {{ $t('other') }}
        </p>
        <ul class="list-inline">
          <li>
            <img :src="user.avatar" v-for="user in conversation.users.data" :alt="user.name" :title="user.name">
          </li>
          <li>{{ $t('last_reply') }} {{ conversation.last_reply_human }}</li>
        </ul>

      </div>
    </div>
  </card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed : {
    ...mapGetters('conversations',{
      conversations : 'allConversations'
    })
  },
  methods : {
    ...mapActions('conversations',{
      getConversations : 'getConversations'
    }
    )
  },
  mounted() {
    this.getConversations(1)
  },
  name: 'Conversation',

  data () {
    return {

    }
  },

}
</script>

<style lang="css" scoped>
</style>
