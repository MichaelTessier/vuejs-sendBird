<template>
  <div :class="size" class="user-thumbnail">
    <img :src="imageUrl">
  </div>
</template>

<script>

export default {
  name: 'UserThumbnail',

  props: {
    imageUrl: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => {
        return ['xs', 'md', 'xl'].indexOf(value) !== -1
      }
    }
  }

}
</script>
