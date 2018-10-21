<template>
  <li class="channel-list-item">

    <div
      v-if="channel.coverUrl"
      class="channel-list-item__thumb">

      <img :src="channel.coverUrl" >

    </div>

    <span>{{ channel.name }}</span>

  </li>
</template>

<script>

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
