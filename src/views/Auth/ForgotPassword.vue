<template>
  <div id="login">
    <div class="navbar-custom"></div>
    <div class="ui card login-container">
      <div class="content">
        <div class="header">비밀번호 재설정</div>
      </div>
      <div class="content padded">
        <span>회원님의 계정과 연계된 이메일 주소를 입력하시면, 비밀번호 재설정 링크를 전송해 드립니다.</span>
        <div class="ui divider"></div>
        <div class="ui input">
          <input type="text" placeholder="이메일" v-model="email">
        </div>
        <div class="ui small feed">
          <button class="ui basic button" @click="sendPasswordResetEmail()">재설정 메일 보내기</button>
          <button class="ui negative button" @click="confirmMail()">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import auth from 'src/auth'
import { Validation } from 'src/util'
import axios from 'axios'

export default {
  name: 'login',
  data() {
    return {
      page: 0,
      datas: [],
      email: '',
    }
  },
  methods: {
    confirmMail() {
      window.location.href = '/'
    },
    onError(error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("가입 된 유저가 아닙니다.")
          break;
      }
    },
    sendPasswordResetEmail() {
      if (Validation.checkEmailValidation(this.email)) {
        auth.sendPasswordResetEmail(this.email)
          .then(() => alert("비밀번호 재설정 메일이 전송되었습니다."))
          .catch(this.onError)
      } else {
        alert("이메일 형식을 확인해주세요.")
      }
    }
  }
}
</script>
<style lang=scss scoped>
.card.login-container {
  width: 400px;
  margin: 0 auto;
  padding-bottom: 20px;

  .header {
    text-align: center;
  }
  .padded {
    padding-left: 33px;
    padding-right: 33px;
  }

  .ui.input {
    width: 100%;
    padding: 6px 0;
    input {
      height: 50px;
    }
  }
  .ui.button {
    width: 100%;
    height: 50px;
    margin: 12px 0;
  }
  .ui.checkbox {
    width: 100%;
    text-align: left;
    padding: 12px 6px;
    font-size: 12px;
  }
  .ui.horizontal.divider {
    margin-top: 0;
  }
  .social-login-container img {
    padding-right: 10px;
    &:last-child {
      padding: 0;
    }
  }
}
</style>
