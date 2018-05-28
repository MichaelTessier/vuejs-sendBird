<template>
  <div class="channel-list" v-if="channels">
    <h2>{{title}}</h2>
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

  data() {
    return {
      title: 'Rooms'
    }
  },

  components: {
    ChannelListItem
  },

  computed: {

    ...mapState({
      channels: 'channels',
      activeChannel: 'channel'
    })
    
  },

  created () {
    sendBird.getChannelList((channels, error) => {
      if (error) {
        console.error(error)
        return
      }

      this.$store.commit('SET_CHANNELS', channels)
    })
  }
}
</script>
