// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('es6-promise').polyfill();
import 'es6-promise/auto'

import 'expose-loader?$!expose-loader?jQuery!jquery'
import Vue from 'vue'
import App from './App'
import store from './store/index'
import AsyncComputed from 'vue-async-computed'
import NavBar from './components/NavBar.vue'
import FootBar from './components/FootBar.vue'
import router from './router'
import filter from './filter'
import api from 'api'
import auth from './auth'

import firebase from 'firebase'
// require('static/fine-uploader/fine-uploader.js')
require('../static/swiper/js/swiper.min.js')
require('../static/semantic/dist/semantic.min.js')
require('./style/common.scss')
require('./style/media.scss')
require('./style/variables.scss')
require('../static/trumbowyg/dist/trumbowyg.min.js')
require('../static/trumbowyg/dist/plugins/uploadimage/trumbowyg.uploadimage.js')
require('../static/trumbowyg/dist/plugins/noembed/trumbowyg.noembed.min.js')
require('../static/trumbowyg/dist/langs/ko.min.js')

Vue.use(require('vue-infinite-scroll'))
Vue.use(filter)
Vue.use(AsyncComputed)

var config = {
  apiKey: 'AIzaSyB7lOHTi4hfDs8U36kN6f7nA8slYKBoDwY',
  authDomain: 'wekin-9111d.firebaseapp.com',
  databaseURL: 'https://wekin-9111d.firebaseio.com',
  projectId: 'wekin-9111d',
  storageBucket: 'wekin-9111d.appspot.com',
  messagingSenderId: '698686828109'
}
firebase.initializeApp(config)

// 이메일 인증 안할 시 튕겨냄

router.afterEach((to, from) => {
  if (to.path !== '/login' && to.path !== '/join') {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) { // 유저가 있는지 판단.
        console.log(currentUser, '###커렌트유저')
        auth.getCurrentUser().then(response => {
          if (response.phone_valid || currentUser.emailVerified) { // 이메일 인증 여부 확인
          } else if (response.country !== "Korea") {
            router.push('/verifyEmail')
          } else if (currentUser.providerData.length == 0) {
            router.push('/verify/phonenumber')
          } else if (currentUser.providerData[0].providerId === 'password') {
            router.push('/verify/phonenumber')
          }
        })
      }
    })
  }
})


Vue.config.productionTip = false

Vue.component('navbar', NavBar)
Vue.component('footbar', FootBar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


