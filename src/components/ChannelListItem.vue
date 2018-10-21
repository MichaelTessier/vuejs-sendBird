<template>
  <li class="channel-list-item">

    <div
      v-if="coverUrl"
      class="channel-list-item__thumb">

      <img :src="coverUrl" >

    </div>

    <span>{{ name }}</span>

  </li>
</template>

<script>

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
    }
  }

}
</script>
