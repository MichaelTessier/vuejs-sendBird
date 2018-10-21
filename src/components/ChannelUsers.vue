<template>
  <div class="channel-users">

    <h2>{{ channel.name }}</h2>

    <ul>
      <channel-user
        v-for="(user, index) in channelUsers"
        :key="index"
        :profile-url="user.profileUrl"
        :user-id="user.userId"/>
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

    sendBird
      .getChannelUsers(this.channel)
      .then((participantList) => {
        this.$store.commit('SET_CHANNEL_USERS', participantList)
      })
      .catch((error) => {
        console.error(error)
      })

    sendBird.onUserEntered(this.channel, (channel, user) => {
      this.$store.dispatch('addChannelUser', user)
    })

    sendBird.onUserExited(this.channel, (channel, user) => {
      this.$store.dispatch('removeChannelUser', user)
    })

  }
}
</script>
