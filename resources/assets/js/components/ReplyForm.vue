<template>
    <form action="#" @submit.prevent="reply">
        <div class="form-group">
            <textarea name="" id="" cols="30" rows="4" class="form-control" placeholder="Reply.." v-model="body">

            </textarea>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-default">Reply</button>
        </div>
    </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    
    name : 'ReplyForm',
    data() {
        return {
            body : null
        }
    },
    computed : mapGetters({
        conversation : 'conversation/currentConversation'
    }),
    methods: {
        ...mapActions('conversation', [
            'createConversationReply'
        ]),
        reply() {
            this.createConversationReply({
                id : this.conversation.id,
                body : this.body
            }).then(() => {
                this.body = null
            })
        }
    }
}
</script>

<style>

</style>
