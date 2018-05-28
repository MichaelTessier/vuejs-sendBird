<template>
  <div class="messages">
    <loading :is-active="loadingIsActive"/>
    <ul ref="messagesList">
      <message 
        v-for="(message, index) in messages" 
        :key="index" 
        :message="message"/>
    </ul>
  </div>
</template>

<script>

// TODO: add alert message when all messages is loaded

import Loading from '@/components/Loading.vue'
import Message from '@/components/Message.vue'
import sendBird from '@/services/SendBird.js'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Channel',

  components: {
    Loading,
    Message
  },

  data () {
    return {
      loadingIsActive: false,
      allMessagesIsLoaded: false
    }
  },

  computed: {

    ...mapState([
      'channel',
      'messages'
    ]),

    ...mapGetters([
      'earliestMessage'
    ]),

    ...mapActions([
      'addMessages'
    ])

  },

  methods: {

    scrollToBottom() {

      this.$el.scrollTop = this.$refs.messagesList.offsetHeight

    },

    handleScroll() {
      if (this.$el.scrollTop === 0 && !this.allMessagesIsLoaded) {
        const oldHeight = this.$refs.messagesList.offsetHeight
        
        this.loadingIsActive = true

        sendBird.getPreviousMessages(this.channel, this.earliestMessage.createdAt, 10, async (messageList, error) => {
          if (error) {
            console.error(error)
            return
          }
          console.log(messageList);
          if (messageList.length === 0) {
            this.loadingIsActive = false
            this.allMessagesIsLoaded = true
            return
          }

          await this.$store.dispatch('addMessages', messageList)

          this.$el.scrollTop = this.$refs.messagesList.offsetHeight - oldHeight 
          this.loadingIsActive = false
        })
      }
    }
  },

  watch: {
    messages: {
      handler: function(newValue) {
        if (newValue && this.$el.offsetHeight + this.$el.scrollTop === this.$el.scrollHeight) {
          
          this.$nextTick(() => {
              this.scrollToBottom()
          })
        
        }
      },
      deep: true
    }
  },

  mounted() {

    sendBird.getChannelMessages(this.channel, 10, async (messageList, error) => {
      if (error) {
        console.error(error)
        return
      }

      await this.$store.commit('SET_MESSAGES', messageList)

      this.scrollToBottom()

    })

    sendBird.onMessageReceived(this.channel, (channel, message) => {

      this.$store.dispatch('addMessage', message)
      
    })

    this.$nextTick(() => {

      this.$el.addEventListener('scroll', this.handleScroll)

    })

  },

  destroyed() {

    this.$el.removeEventListener('scroll', this.handleScroll)

  }


}
</script>

