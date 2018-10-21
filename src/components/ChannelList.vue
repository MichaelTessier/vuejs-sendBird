<template>
  <div v-if="channels" class="channel-list">

    <h2>{{ title }}</h2>

    <ul>
      <channel-list-item
        v-for="(channel, index) in channels"
        :key="index"
        :cover-url="channel.coverUrl"
        :name="channel.name"
        :url="channel.url"/>
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

    ...mapState([
      'channels'
    ])

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
