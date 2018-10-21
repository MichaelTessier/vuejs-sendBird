<template>
  <div class="login">
    <div class="login-form">

      <input
        v-model="username"
        type="text"
        class="input is-medium"
        placeholder="Username">

      <!-- <input
        type="text"
        class="input"
        placeholder="Password"> -->

      <input
        type="submit"
        class="button is-primary is-full is-medium"
        value="Login"
        @click="login(username)">

      {{ message }}

    </div>
  </div>
</template>

<script>

import SendBird from '@/services/SendBird.js'

export default {
  name: 'Login',

  data () {
    return {
      username: '',
      message: ''
    }
  },

  methods: {

    login (username) {

      SendBird
        .login(username)
        .then(async user => {
          await this.$store.commit('SET_USER', user)
          this.$router.push('/home')
        })
        .catch(error => {
          this.username = ''
          this.message = error.message
        })

    }

  }

}
</script>
