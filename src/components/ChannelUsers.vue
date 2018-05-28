<template>
  <div class="channel-users">
    <h2>{{channel.name}}</h2>
    <ul>
      <channel-user 
        v-for="(user, index) in channelUsers" 
        :key="index" 
        :user="user"/>
    </ul>
  </div>
</template>

<script>

import ChannelUser from '@/components/ChannelUser'
import sendBird from '@/services/SendBird.js'
import { mapState } from 'vuex'

export default {
  name: 'ChannelUsers',

  components: {
    ChannelUser
  },

  computed: {

    ...mapState([
      'channel',
      'channelUsers'
    ])
    
  },

  mounted () {
    sendBird.getChannelUsers(this.channel, (participantList, error) => {
      if (error) {
        console.error(error)
        return
      }

      this.$store.commit('SET_CHANNEL_USERS', participantList)

    })

    sendBird.onUserEntered(this.channel, (channel, user) => {

      this.$store.dispatch('addChannelUser', user)
      
    })
  }
}
</script>

