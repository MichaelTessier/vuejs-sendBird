<template>
  <div class="login">
    <div class="login-form">
      <input 
        type="text" 
        class="input is-medium"
        placeholder="Username"
        v-model="username">
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

import sendBird from '@/services/SendBird.js'

export default {
  name: 'Login',

  data () {
    return {
      username: '',
      message: ''
    }
  },

  methods: {

    login(username) {
      sendBird.login(username, (user, error) => {
        console.log(user, error)
    
        if (error) {
          this.username = ''
          this.message = error.message
          return
        }

        this.$store.commit('SET_USER', user)
      })
    }

  },

}
</script>
