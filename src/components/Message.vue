<template>
  <li class="message columns is-gapless" :class="{ 'is-reverse is-user': isUser }">
    <div class="column is-1">
      <user-thumbnail :image-url="message._sender.profileUrl"/>
    </div>
    <div class="column is-10">
      <div class="message-text">
        {{ message.message }}
        <p class="message-infos">
          <span class="message-name" v-if="!isUser">{{ message._sender.userId }}</span>
          <span class="message-date">{{date}}</span>
        </p>
      </div>
    </div>
  </li>
</template>

<script>

import UserThumbnail from '@/components/UserThumbnail'
import moment from 'moment'
import sendBird from '@/services/SendBird.js'
import { mapState } from 'vuex'

export default {
  name: 'Message',

  props: {
    message: Object
  },

  components: {
    UserThumbnail
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
