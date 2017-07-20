<template>
  <div id="login">
    <div class="navbar-custom"></div>
    <div class="ui card login-container">
      <div class="content">
        <div class="header">회원가입</div>
      </div>
      <div class="content padded">
        <div class="ui input">
          <input type="email" placeholder="이메일" v-model="user.email">
        </div>
        <div class="ui input">
          <input type="text" placeholder="이름" v-model="user.name">
        </div>
        <div class="ui input">
          <input type="password" placeholder="비밀번호" v-model="user.password">
        </div>
        <div class="color secondary">{{errorMessage}}</div>
        <div class="ui small feed">
          <button class="negative ui button" @click="onSignUpClick()">가입하기</button>
          <div class="ui checkbox agreement-checkbox">
            <input type="checkbox" name="example">
            <label>
              <a href="/policy/term" tag="a">이용약관</a>과
              <a href="policy/privacy" tag="a">개인정보취급방침</a>에 동의합니다.</label>
          </div>
        </div>
      </div>
      <!--<div class="padded">
        <span class="ui horizontal divider">
          또는
        </span>
        <div class="social-login-container">
          <img class="link" src="static/images/logo-facebook-68x68.png" @click="onFacebookJoinClick()">
          <img class="link" src="static/images/logo-kakao-68x68.png" @click="onKakaoClick()">
          <img class="link" src="static/images/logo-googleplus-68x68.png" @click="onGoogleClick()">
        </div>
        <div class="ui divider"></div>
        <div class="bottom-login-container">이미 위킨 회원이신가요?
          <a href="/login" tag="a"> 로그인</a>
        </div>
      </div>-->
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
  name: 'join',
  data() {
    return {
      user: {
        email: null,
        password: null,
        name: null
      },
      errorMessage: '',
      isAgreed: false,
      isLoading: false,
    }
  },
  computed: {
    userSession() {
      return this.$store.state.user
    }
  },
  mounted() {
    $('.agreement-checkbox').checkbox({
      onChange: () => {
        this.isAgreed = !this.isAgreed
      }
    })
    this.initKakaoLogin()

  },
  methods: {
    initKakaoLogin() {
      Kakao.init('b799fcbeb4b6ed28e6e286a1cb70bfc0')
    },
    initNaverLogin() {

    },
    checkForm() {
      if (!(this.user.email &&
        this.user.password &&
        this.user.name)) {
        this.errorMessage = "모든 폼을 입력해주세요."
      } else if (!Validation.checkEmailValidation(this.user.email)) {
        this.errorMessage = "이메일 형식을 확인해주세요."
      } else if (!this.isAgreed) {
        alert("약관에 동의해주세요.")
      } else {
        return true
      }
    },
    onLoginSuccess(user) {
      this.isLoading = false
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
    onFacebookJoinClick() {
      this.isLoading = true
      auth.loginWithFacebook()
        .then((currentUser) => window.location.href = '/')
        .catch((error) => this.onLoginFail(error))
    },
    getErrorMessage(error) {
      switch (error) {
        case "auth/weak-password":
          return "비밀번호는 6자리 이상 입력해주세요."
        case "auth/email-already-in-use":
          return "이미 가입 된 이메일 입니다."
      }
    },
    onSignUpSuccess(result) {
      this.isLoading = false
      alert('가입이 완료되었습니다. 서비스 이용을 위해 이메일 인증을 완료해주세요.')
      window.location.href = '/verifyEmail'
    },
    onSignUpFail(error) {
      this.isLoading = false
      console.log(error)
      this.errorMessage = this.getErrorMessage(error.code)
    },
    onSignUpClick() {
      if (this.checkForm()) {
        this.isLoading = true
        auth.signUp(this.user.email, this.user.password, this.user.name)
          .then(result => this.onSignUpSuccess(result))
          .catch(error => this.onSignUpFail(error))
      }
    },
    goToRedirectUrl() {
      window.location.href = this.$route.query.redirectUrl || '/'
    },
    onFacebookClick() {
      this.isLoading = true
      auth.loginWithFacebook()
        .then((currentUser) => this.goToRedirectUrl())
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
      this.isLoading = true
      auth.loginWithKakao()
        .then((currentUser) => this.goToRedirectUrl())
        .catch((error) => this.onLoginFail(error))
    },
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
    /*padding: 12px 6px;*/
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
