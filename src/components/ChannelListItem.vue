<template>
  <li class="channel-list-item" @click="openChannel(url)">

    <div
      v-if="coverUrl"
      class="channel-list-item_thumb">

      <img :src="coverUrl" >

    </div>

    <span>{{ name }}</span>

  </li>
</template>

<script>

import sendBird from '@/services/SendBird.js'

export default {
  name: 'ChannelListItem',

  props: {
    coverUrl: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },

  methods: {
    openChannel (url) {
      sendBird
        .getChannel(url)
        .then((channel) => {
          this.$store.commit('SET_CHANNEL', channel)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

}
</script>
