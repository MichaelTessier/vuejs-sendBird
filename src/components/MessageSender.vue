<template>
  <div class="message-sender">
    <div class="columns is-gapless is-centered">

      <div class="column">
        <textarea v-model="message" placeholder="Tapez votre message"/>
      </div>

      <div class="column is-1 text">
        <div @click="send(message)">
          <icon name="paper-plane"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import sendBird from '@/services/SendBird.js'
import { mapState } from 'vuex'
import striptags from 'striptags'

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

      sendBird
        .sendMessage(this.channel, striptags(message))
        .then((message) => {
          this.$store.dispatch('addMessage', message)
          this.message = ''
        })
        .catch((error) => {
          console.error(error)
        })

    }
  }

}
</script>
