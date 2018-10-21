<template>
  <div v-if="channels" class="channel-list">

    <h2>{{ title }}</h2>

    <ul>
      <channel-list-item
        v-for="(channel, index) in channels"
        :key="index"
        :channel="channel"/>
    </ul>

  </div>
</template>

<script>

import ChannelListItem from '@/components/ChannelListItem'
import sendBird from '@/services/SendBird.js'
import { mapState } from 'vuex'

export default {
  name: 'ChannelList',

  components: {
    ChannelListItem
  },

  data() {
    return {
      title: 'Rooms'
    }
  },

  computed: {

    ...mapState({
      channels: 'channels',
      activeChannel: 'channel'
    })

  },

  created () {

    sendBird
      .getChannelList()
      .then((channels) => {
        this.$store.commit('SET_CHANNELS', channels)
      })
      .catch((error) => {
        console.error(error)
      })

  }
}
</script>
