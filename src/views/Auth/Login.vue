<template>
  <div id="login">
    <div class="navbar-custom"></div>
    <div class="ui card login-container">
      <div class="content">
        <div class="header">로그인</div>
      </div>
      <div class="content padded">
        <div class="ui input">
          <input type="text" placeholder="이메일" v-model="user.email">
        </div>
        <div class="ui input">
          <input type="password" placeholder="비밀번호" v-model="user.password" @keyup.enter="onLoginClick">
        </div>
        <div class="color secondary">{{errorMessage}}</div>
        <div class="ui small feed">
          <button class="negative ui button" @click="onLoginClick()">로그인하기</button>
          <span>비밀번호를 잃어버렸어요!
            <router-link to="/findPassword" tag="a"> 비밀번호 재설정</router-link>
          </span>
        </div>
      </div>
      <div class="padded">
        <span class="ui horizontal divider">
          또는
        </span>
        <div class="social-login-container">
          <img class="link" src="/static/images/logo-facebook-68x68.png" @click="onFacebookLoginClick()">
          <img class="link" src="/static/images/logo-kakao-68x68.png" @click="onKakaoClick()">
          <img class="link" src="/static/images/logo-googleplus-68x68.png" @click="onGoogleClick()">
          <!--<img class="link" src="static/images/logo-naver-68x68.png" @click="onNaverClick()">-->
          <!--<div id="naver_id_login"></div>-->
        </div>
        <div class="ui divider"></div>
        <div class="bottom-login-container">아직 위킨 회원이 아니신가요?
          <router-link to="/join"> 회원가입</router-link>
        </div>
      </div>
    </div>
    <div class="ui active inverted dimmer" v-if="isLoading">
      <div class="ui medium text loader">Loading</div>
    </div>
  </div>
</template>
<script>
import auth from 'src/auth'
import firebase from 'firebase'
import { Validation } from 'src/util'

export default {
  name: 'login',
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      errorMessage: '',
      isLoading: false
    }
  },
  mounted() {
    this.initKakaoLogin()
    this.initNaverLogin()
    $('.checkbox').checkbox()
  },
  methods: {
    initKakaoLogin() {
      Kakao.init('b799fcbeb4b6ed28e6e286a1cb70bfc0')
    },
    initNaverLogin() {

    },
    checkForm() {
      if (!(this.user.email &&
        this.user.password)) {
        this.errorMessage = "이메일 비밀번호를 확인해주세요."
      } else if (!Validation.checkEmailValidation(this.user.email)) {
        this.errorMessage = "이메일 형식을 확인해주세요."
      } else {
        return true
      }
    },
    onLoginSuccess(user) {
      this.isLoading = false
      console.log(user)
      if (user.emailVerified) {
        this.goToRedirectUrl()
      } else {
        window.location.href = '/verifyEmail'
      }
    },
    onLoginFail(error) {
      this.isLoading = false
      this.errorMessage = this.getErrorMessage(error.code)
    },
    getErrorMessage(error) {
      switch (error) {
        case "auth/wrong-password":
          return "비밀번호가 올바르지 않습니다."
        case "auth/user-not-found":
          return "이메일이 존재하지 않습니다."

      }
    },
    goToRedirectUrl() {
      if(this.$route.query.redirectUrl.indexOf('find') >= 0 || this.$route.query.redirectUrl.indexOf('join') >= 0) {
        window.location.href = '/'
      } else {
      window.location.href = this.$route.query.redirectUrl || '/'
      }
    },
    onFacebookLoginClick() {
      this.isLoading = true
      auth.loginWithFacebook()
        .then((currentUser) => {
          this.goToRedirectUrl()
        })
        .catch((error) => this.onLoginFail(error))
    },
    onGoogleClick() {
      this.isLoading = true
      auth.loginWithGoogle()
        .then((currentUser) => this.goToRedirectUrl())
        .catch((error) => this.onLoginFail(error))
    },
    onNaverClick() {
      auth.loginWithNaver()
        .then((currentUser) => console.log(currentUser))
        .catch((error) => this.onLoginFail(error))
    },
    onKakaoClick() {
      auth.loginWithKakao()
        .then((currentUser) => this.goToRedirectUrl())
        .catch((error) => this.onLoginFail(error))
    },
    onLoginClick() {
      if (this.checkForm()) {
        this.isLoading = true
        auth.signIn(this.user.email, this.user.password)
          .then((currentUser) => this.onLoginSuccess(currentUser))
          .catch((error) => this.onLoginFail(error))
      }
    }
  }
}
</script>
<style lang=scss scoped>
@import '../../style/variables.scss';

.card.login-container {
  width: 380px;
  margin: 0 auto;
  padding-bottom: 20px;
  margin-top: 20px;
  >.content:first-child {
    border-top: 0px!important;
  }
  .padded {
    padding-left: 33px;
    padding-right: 33px;
  }
  .header {
    text-align: center;
  }
  .ui.input {
    width: 100%;
    padding: 6px 0;
    input {
      height: 50px;
      border: 1px solid $color-line;
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
  .social-login-container {
    text-align: center;
    padding: 4px 0;
  }
  .social-login-container img {
    height: 50px;
    padding-right: 14px;
    &:last-child {
      padding: 0;
    }
  }
  .bottom-login-container {
    display: block;
    margin: 0 auto;

    a {
      font-family: NotoSansCJKkr-Medium;
    }
  }
}
</style>
