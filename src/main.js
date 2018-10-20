import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// TODO: not use globally, easier in devs
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
// globally (in your main .js file)
Vue.component('icon', Icon)

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
