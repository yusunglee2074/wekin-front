// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index'
import AsyncComputed from 'vue-async-computed'
import NavBar from './components/NavBar.vue'
import FootBar from './components/FootBar.vue'
import router from './router'
import filter from './filter'

import firebase from 'firebase'
// require('static/fine-uploader/fine-uploader.js')
require('../static/swiper/js/swiper.min.js')
require('../static/semantic/dist/semantic.min.js')
require('./style/common.scss')
require('./style/media.scss')
require('./style/variables.scss')
require('../static/trumbowyg/dist/trumbowyg.min.js')
require('../static/trumbowyg/dist/plugins/upload/trumbowyg.upload.min.js')
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


