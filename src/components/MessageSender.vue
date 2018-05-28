<template>
  <div class="message-sender">
    <div class="columns is-gapless is-centered">

      <div class="column">
        <textarea placeholder="Tapez votre message" v-model="message"></textarea>
      </div>

      <div class="column is-1 text">
        <div @click="send(message)">
          <icon name="paper-plane"></icon>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import sendBird from '@/services/SendBird.js'
import { mapState } from 'vuex'

export default {
  name: 'Message',

  data () {
    return {
      message: ''
    }
  },

  computed: {

    ...mapState([
      'channel'
    ])

  },

  methods: {
    send(message) {
      
      if (!message) return 

      sendBird.sendMessage(this.channel, message, (message, error) => {
        if (error) {
          console.error(error)
          return
        }
        this.$store.dispatch('addMessage', message)
        this.message = ''
      })
    }
  }

}
</script>
