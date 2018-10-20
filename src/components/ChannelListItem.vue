<template>
  <li class="channel-list-item">
    <!-- <img :src="channel.coverUrl" alt=""> -->
    <span>{{ channel.name }}</span>
  </li>
</template>

<script>

import sendBird from '@/services/SendBird.js'

export default {
  name: 'Message',

  props: {
    channel: {
      type: Object,
      default: null
    }
  }

}
</script>
