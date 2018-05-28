<template>
  <div class="loading" :class="{'is-active': isActive}">
    <div class="icon">
      <icon name="sync" spin></icon>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Loading',

  props: {
    isActive: Boolean
  },

  data () {
    return {
    }
  },

  mounted() {

  },

}
</script>

