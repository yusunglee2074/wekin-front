<template>
  <div id="kakaologin">
    <div class="navbar-custom"></div>
    <div>
      <div class="ui segment" style="margin-top: 300px;">
        <div class="ui active inverted dimmer">
          <div class="ui large text loader">잠시만 기다려주세요.</div>
        </div>
        <p></p>
        <p></p>
        <p></p>
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
  name: 'kakaologin',
  methods: {
  },
  data() {
    return {
    }
  },
  mounted() {
    api.kakaoLogin(this.$route.query.code, 'kakao')
      .then( res => {
        let customToken = res.data.customToken
        let userInfo = res.data.userInfo
        firebase.auth().signInWithCustomToken(customToken)
          .then( result => {
            // 파베 회원가입 완료, 아이디 토큰 얻어서 서버로 보낸다음 서버에서는 유저 정보 업데이트, 디비 생성한다ㅣ.
            let idToken =  result.De || localStorage.getItem('accessToken')
            api.dbCreateWithIdToken(idToken)
              .then( result => {
                window.location.href = '/'
              })
              .catch( error => console.log(error))
          })
          .catch( error => console.log(error))
      })
      .catch( error => console.log(error))
  }
}
</script>
