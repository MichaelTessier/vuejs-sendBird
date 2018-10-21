<template>
  <div :class="{'is-active': isActive}" class="loading">
    <div class="icon">
      <icon name="sync" spin/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Loading',

  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  }

}
</script>
