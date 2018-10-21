<template>
  <li :class="{ 'is-reverse is-user': isUser }" class="message columns is-gapless">

    <div class="column is-1">
      <user-thumbnail
        v-if="message._sender.profileUrl"
        :image-url="message._sender.profileUrl"/>
    </div>

    <div class="column is-10">
      <div class="message-text">
        {{ message.message }}

        <p class="message-infos">
          <span v-if="!isUser" class="message-name">{{ message._sender.userId }}</span>
          <span class="message-date has-text-primary"> {{ date }}</span>
        </p>

      </div>
    </div>

  </li>
</template>

<script>

import UserThumbnail from '@/components/UserThumbnail'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  name: 'Message',

  components: {
    UserThumbnail
  },

  props: {
    message: {
      type: Object,
      default: null
    }
  },

  computed: {

    ...mapState([
      'user',
      'locale'
    ]),

    isUser() {
      return this.user.userId === this.message._sender.userId
    },

    date() {
      moment.locale(this.locale)
      return moment(this.message.createdAt).format('LT')
    }

  },

  mounted () {
  }
}
</script>
