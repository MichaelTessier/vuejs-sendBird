<template>
  <div class="app">

    <div class="columns is-gapless">

      <div class="column is-2">
        <div class="aside">

          <channel-list/>

        </div>
      </div>

      <channel class="content column"/>

    </div>

  </div>
</template>

<script>

import Channel from '@/components/Channel.vue'
import ChannelList from '@/components/ChannelList.vue'
import sendBird from '@/services/SendBird.js'
import { mapState } from 'vuex'

export default {
  name: 'App',

  components: {
    Channel,
    ChannelList
  },

  computed: {
    ...mapState([
      'user',
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
