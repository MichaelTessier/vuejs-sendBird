<template>
  <li class="channel-user">

    <user-thumbnail
      v-if="profileUrl"
      :image-url="profileUrl"
      size="xs"/>

    <span>{{ userId }}</span>

  </li>
</template>

<script>

import UserThumbnail from '@/components/UserThumbnail'

export default {
  name: 'ChannelUser',

  components: {
    UserThumbnail
  },

  props: {
    profileUrl: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  }
}
</script>
