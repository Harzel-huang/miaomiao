import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
// 在main.js 中引入包，初始化，然放到vue中，以后可以通过this 来访问
import axios from 'axios'
Vue.prototype.axios = axios;

Vue.config.productionTip = false
Vue.filter("setWH",function(url,arg){
   return  url.replace(/w\.h/,arg)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
