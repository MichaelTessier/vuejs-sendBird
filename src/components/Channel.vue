<template>
  <div class="channel">

    <!-- <channel-users v-if="$store.state.channel"/> -->

    <messages v-if="$store.state.channel"/>

    <message-sender/>

  </div>
</template>

<script>

import sendBird from '@/services/SendBird.js'
import Messages from '@/components/Messages'
import MessageSender from '@/components/MessageSender'
import ChannelUsers from '@/components/ChannelUsers'

export default {
  name: 'Channel',

  data () {
    return {
    }
  },

  components: {
    Messages,
    MessageSender,
    ChannelUsers
  },

  methods: {
    
  },

  created () {
    // TODO: dynamic channel
    sendBird.getChannel('vuejs', (channel, error) => {
      if (error) {
        console.error(error)
        return
      }
      this.$store.commit('SET_CHANNEL', channel)
    })
  }
}
</script>
