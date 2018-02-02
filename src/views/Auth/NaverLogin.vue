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
import auth from './../../auth'
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
        localStorage.setItem('socialToken', JSON.stringify(res.data.userToken))
        let customToken = res.data.customToken
        let userInfo = res.data.userInfo
        return firebase.auth().signInWithCustomToken(customToken)
      })
      .then(result => {
        return auth.getCurrentUser()
      })
      .then(idToken => {
        return api.dbCreateWithIdToken(localStorage.getItem('accessToken'))
      })
      .then(result => {
        window.location.replace('/')
      })
      .catch( error => {
        if (error.response.data.message == "Already signin with this email") {
          window.alert('해당 이메일 가입 이력이 있습니다. \n 이메일: ' + error.response.data.email + '\n 추가 문의사항은 카카오톡 @위킨 혹은 고객센터에 문의바랍니다.')
          window.location.href = '/'
        }
      })
  }
}
</script>
