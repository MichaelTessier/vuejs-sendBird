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

  components: {
    Messages,
    MessageSender,
    ChannelUsers
  },

  created () {

    sendBird
      .getChannel('vuejs')
      .then((channel) => {
        this.$store.commit('SET_CHANNEL', channel)
      })
      .catch((error) => {
        console.error(error)
      })

  }

}
</script>
