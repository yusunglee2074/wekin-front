<template>
  <div id="naverlogin">
    <div class="navbar-custom"></div>
    <div>
      <h1>가입중입니다.</h1>
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
      .then( res => {
        console.log(res)
        let customToken = res.data.customToken
        let userInfo = res.data.userInfo
        firebase.auth().signInWithCustomToken(customToken)
          .then( result => {
            // 파베 회원가입 완료, 아이디 토큰 얻어서 서버로 보낸다음 서버에서는 유저 정보 업데이트, 디비 생성한다ㅣ.
            let idToken = localStorage.getItem('accessToken') || result.De
            api.dbCreateWithIdToken(idToken)
              .then( result => {
                window.location.href = '/'
              })
              .catch( error => console.log(error))
          })
          .catch( error => console.log(error))
      })
      .catch( error => {
        console.log(error)
      })
  }
}
</script>
