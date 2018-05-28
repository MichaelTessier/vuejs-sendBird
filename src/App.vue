<template>
  <div class="app">

    <login v-if="!user"/>

    <div v-if="user">
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
  name: 'app',

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

}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "./assets/scss/index.scss";
</style>