<template>
  <div class="app">

    <div class="columns is-gapless">

      <div class="column is-3">
        <div class="aside">
          <channel-users v-if="channel"/>
          <!-- <channel-list/> -->
        </div>
      </div>

      <channel class="content column"/>

    </div>

  </div>
</template>

<script>

import Login from '@/components/Login.vue'
import Channel from '@/components/Channel.vue'
import ChannelList from '@/components/ChannelList.vue'
import ChannelUsers from '@/components/ChannelUsers.vue'
import sendBird from '@/services/SendBird.js'
import { mapState } from 'vuex'

export default {
  name: 'App',

  components: {
    Login,
    Channel,
    ChannelList,
    ChannelUsers
  },

  computed: {
    ...mapState([
      'user',
      'channel',
      'channels'
    ])
  },

  created () {

    window.onbeforeunload = function() {
      // TODO: dynamic channel
      sendBird.exitChannel('vuejs')
    }
  }

}
</script>
