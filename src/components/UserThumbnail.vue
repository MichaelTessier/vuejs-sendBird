<template>
  <div class="user-thumbnail">
    <img :src="imageUrl">      
  </div>
</template>

<script>

export default {
  name: 'UserThumbnail',

  props: {
    imageUrl: String
  },

}
</script>

