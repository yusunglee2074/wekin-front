<template>
  <div id="naverlogin">
    <div class="navbar-custom"></div>
    <div>
      <div class="ui active inverted dimmer">
        <div class="ui large text loader">잠시만 기다려주세요.</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import api from './../../api'
import axios from 'axios'
import firebase from 'firebase'

export default {
  name: 'naverlogin',
  methods: {
  },
  data() {
    return {
    }
  },
  mounted() {
    api.kakaoLogin(this.$route.query.code, 'naver')
      .then(res => {
        let customToken = res.data.customToken
        let userInfo = res.data.userInfo
        return firebase.auth().signInWithCustomToken(customToken)
      })
      .then(result => {
        return firebase.auth().currentUser.getIdToken()
      })
      .then(idToken => {
        return api.dbCreateWithIdToken(idToken)
      })
      .then(result => {
        window.location.href = '/'
      })
      .catch(error => console.log(error))
  }
}
</script>
