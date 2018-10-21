<template>
  <div class="channel">

    <channel-users v-if="channel"/>

    <messages v-if="channel"/>

    <message-sender/>

  </div>
</template>

<script>

import sendBird from '@/services/SendBird.js'
import Messages from '@/components/Messages'
import MessageSender from '@/components/MessageSender'
import ChannelUsers from '@/components/ChannelUsers'
import { mapState } from 'vuex'

export default {
  name: 'Channel',

  components: {
    Messages,
    MessageSender,
    ChannelUsers
  },

  computed: {
    ...mapState([
      'channel'
    ])
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
