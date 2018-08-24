<template>
    <card :title="'Add Conversation'" class="mb-4">
        <form @submit.prevent="send">
            <div class="form-group">
                <input type="text" id="users" placeholder="Start type to find user" class="form-control">
            </div>
            <ul v-if="contacts.length" class="list-inline">
                <li><strong>To:</strong></li>
                <li v-for="contact in contacts" :key="contact.id">
                    <img class="rounded-circle profile-photo mr-1 pic" :src="contact.photo_url"/>
                    {{ contact.name }}[<a href="#" @click.prevent="removeContact(contact)">x</a>]
                </li>
            </ul>
            <div class="form-group">
                <label for="Message">Message</label>
                <textarea name="" id="" cols="30" rows="10" class="form-control" v-model="body"></textarea>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary">Send</button>
            </div>
        </form>
        
    </card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { userautocomplete } from '../helplers/autocomplete.js'
export default {
    name : 'AddConversation',
    data() {
        return {
            body : null,
            contacts : []
        }
    },
    methods : {
        addContact (contact) {
            var existing = this.contacts.filter((item) => {
                return item.id === contact.id 
            })
            if(existing.length)
            {
                return
            }
            this.contacts.push(contact)
        },
        removeContact (contact) {
            this.contacts = this.contacts.filter((item) => {
                return contact.id !== item.id
            })
        },
        ...mapActions('conversation', {
            createConversation: 'createConversation'
        }),
        send() {
            var id = this.contacts.map((item) => {
                    return item.id
            })
            this.createConversation({
                contacts : id,
                body : this.body
            }).then((response) => {
                this.contacts = []
                this.body = null
                
            })
        }
        
    },
    computed: {
        ...mapGetters('conversation',{
        conversation : 'currentConversation',
        })
    },
    watch: {
        conversation(val) {
            this.$router.push({
                name: 'conversation.show', 
                params: { id: val.id }
            });
        }
    },
    mounted() {
        var users = userautocomplete('#users').on('autocomplete:selected', (e, selection) => {
            this.addContact(selection)
            users.autocomplete.setVal('')
        })
    }

}
</script>

=