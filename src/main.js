import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueQrcodeReader from "vue-qrcode-reader";

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  VueQrcodeReader,
  render: h => h(App)
}).$mount('#app')
