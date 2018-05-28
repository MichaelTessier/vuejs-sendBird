<template>
  <li class="channel-user">
    <user-thumbnail :image-url="user.profileUrl"/>
    <span>{{ user.userId }}</span>
  </li>
</template>

<script>

import UserThumbnail from '@/components/UserThumbnail'

export default {
  name: 'Message',

  props: {
    user: Object
  },

  components: {
    UserThumbnail
  }
}
</script>

