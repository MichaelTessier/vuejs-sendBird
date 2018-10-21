<template>
  <div class="messages">

    <loading :is-active="loadingIsActive"/>

    <ul v-if="messages" ref="messagesList">
      <message
        v-for="(message, index) in messages"
        :key="index"
        :message="message"/>
    </ul>

  </div>
</template>

<script>

// TODO:
// add alert message when all messages is loaded
// add day of the message if > current day like skype

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
    },

    channel: {
      handler: function(newValue) {
        this.init(newValue)
      }
    }
  },

  mounted () {

    this.init(this.channel)

  },

  destroyed () {
    this.$el.removeEventListener('scroll', this.handleScroll)
  },

  methods: {

    init (channel) {

      sendBird
        .getChannelMessages(channel, 10)
        .then((messageList) => {
          this.$store.commit('SET_MESSAGES', messageList)
          this.scrollToBottom()
        })
        .catch((error) => {
          console.error(error)
        })

      sendBird.onMessageReceived(channel, (channel, message) => {
        this.$store.dispatch('addMessage', message)
      })

      this.$nextTick(() => {
        this.$el.addEventListener('scroll', this.handleScroll)
      })

    },

    scrollToBottom () {
      this.$el.scrollTop = this.$refs.messagesList.offsetHeight
    },

    handleScroll () {

      const oldHeight = this.$refs.messagesList.offsetHeight

      if (this.$el.scrollTop === 0 && !this.allMessagesIsLoaded && this.messages.length > 0) {

        this.loadingIsActive = true

        sendBird
          .getPreviousMessages(this.channel, this.earliestMessage.createdAt, 10)
          .then((messageList) => {
            if (messageList.length === 0) {
              this.loadingIsActive = false
              this.allMessagesIsLoaded = true
              return
            }

            this.$store.dispatch('addMessages', messageList)

            this.$nextTick(() => {
              this.$el.scrollTop = this.$refs.messagesList.offsetHeight - oldHeight
              this.loadingIsActive = false
            })

          })
          .catch((error) => {
            console.error(error)
          })
      }
    }
  }

}
</script>
