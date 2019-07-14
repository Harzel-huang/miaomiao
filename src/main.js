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
});
import scroller from '@/components/scroller'
Vue.component('scroller',scroller)
// 注册一个全局的loading组件
import loading from '@/components/loading'
Vue.component('loading',loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
