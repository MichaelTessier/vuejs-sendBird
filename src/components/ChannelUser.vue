<template>
  <li class="channel-user">

    <user-thumbnail
      v-if="user.profileUrl"
      :image-url="user.profileUrl"
      size="xs"/>

    <span>{{ user.userId }}</span>

  </li>
</template>

<script>

import UserThumbnail from '@/components/UserThumbnail'

export default {
  name: 'Message',

  components: {
    UserThumbnail
  },

  props: {
    user: {
      type: Object,
      default: null
    }
  }
}
</script>
