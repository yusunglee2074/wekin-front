<template>
  <div id="kakaologin">
    <div class="navbar-custom"></div>
        <div class="ui active inverted dimmer">
          <div class="ui large text loader">잠시만 기다려주세요.</div>
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
  name: 'kakaologin',
  methods: {
  },
  data() {
    return {
    }
  },
  mounted() {
    api.kakaoLogin(this.$route.query.code, 'kakao')
      .then(res => {
        let customToken = res.data.customToken
        localStorage.setItem('socialToken', JSON.stringify(res.data.userToken))
        return firebase.auth().signInWithCustomToken(customToken)
      })
      .then(result => {
        return auth.getCurrentUser()
      })
      .then(idToken => {
        return api.dbCreateWithIdToken(localStorage.getItem('accessToken'))
      })
      .then(result => {
        if (result.exist == true) {
          window.location.replace('/')
        } else {
          window.location.replace('/thankyou')
        }
      })
      .catch(error => {
        console.log("여기로 빠지나?")
        if (error.response.data.message == "Already signin with this email") {
          window.alert('해당 이메일 가입 이력이 있습니다. \n 이메일: ' + error.response.data.email + '\n 추가 문의사항은 카카오톡 @위킨 혹은 고객센터에 문의바랍니다.')
          window.location.href = '/'
        } else {
          console.log(error, "에러")
        }
      })
  }
}
</script>
