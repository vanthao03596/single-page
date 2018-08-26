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

        <reply-form></reply-form>
        
        <hr>
        <div class="media mb-5" v-for="reply in conversation.replies.data" :key="reply.id">
            <img class="mr-3" :src="reply.user.data.avatar" alt="reply.user.data.name">
            <div class="media-body">
                <p class="mb-1">{{ reply.user.data.name }} &bull; {{ reply.created_at_human.date | ago }}</p>
                <card>
                    {{ reply.body }}
                </card>
            </div>
        </div>

        <div class="media mb-5">
            <img class="mr-3" :src="conversation.user.data.avatar" alt="conversation.user.data.name">
            <div class="media-body">
                <p class="mb-1">{{ conversation.user.data.name }} &bull; {{ conversation.created_at_human.date | ago }}</p>
                <card>
                    {{ conversation.body }}
                </card>
            </div>  
        </div>
    </div>
    <div v-else>Select Conversation</div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'Conversation',
    computed : {
    ...mapGetters('conversation',{
      conversation : 'currentConversation',
      loading : 'loadingConversation'
    }),
    ...mapGetters('lang', {
        locale : 'locale'
    })
    },
    methods : {
        ...mapActions('conversation',{
            getConversation : 'getConversation'
        }),
    },
    created() {
        this.getConversation(this.$route.params.id)
    },
    watch: {
        '$route.params.id': function (id) {
            this.getConversation(id)
        },
        'locale': function (value) {
            moment.locale(value)
        }
    },
    filters: {
        ago (date) {
            return moment(date).fromNow()
        }
    },
    mounted () {
        moment.locale(this.locale)
    }
}
</script>

<style>

</style>
