<template>
  <div class="modallogin">
    <div class="modal-mask" @click="close" v-show="show" transition="modal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3>로그인</h3>
        </div>
        <div class="modal-body">
          <div class="ui input">
            <input type="text" placeholder="이메일" v-model="user.email">
          </div>
          <div class="ui input">
            <input type="password" placeholder="비밀번호" v-model="user.password" @keyup.enter="onLoginClick">
          </div>
          <div class="color secondary">{{errorMessage}}</div>
          <div class="modal-footer">
            <button class="negative ui button" @click="onLoginClick()">로그인하기</button>
            <div class="ui divider"></div>
            <div>비밀번호를 잃어버리셨나요?</div>
            <p><a href="/findPassword">비밀번호 재설정</a></p>
          </div>
          <div class="padded">
            <!--<span class="ui horizontal divider">
              또는
            </span>
            <div class="social-login-container">
              <img class="link" src="../../static/images/logo-facebook-68x68.png" @click="onFacebookLoginClick()">
              <img class="link" src="../../static/images/logo-kakao-68x68.png" @click="onKakaoClick()">
              <img class="link" src="../../static/images/logo-googleplus-68x68.png" @click="onGoogleClick()">
            </div>-->
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import auth from 'src/auth'
import firebase from 'firebase'
import { Validation } from 'src/util'
import SignupModal from './SignupModal.vue'

export default {
  name: 'modallogin',
  props: ['show'],
  data () {
    return {
      user: {},
      errorMessage: '',
      showSignupModal: false
    }
  },
  components: {
    'modal-signup': SignupModal
  },
  methods: {
    savePost: function() {
      this.$emit('update:show', false)
    },
    close: function () {
      this.$emit('update:show', false)
    },
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
      window.location.reload()
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
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (this.show && e.keyCode == 27) {
        this.close();
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    box-sizing: border-box;
}
.modallogin {
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
}

.modal-container {
    width: 300px;
    margin: 40px auto 0;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.text-right {
    text-align: right;
}

.form-label {
    display: block;
    margin-bottom: 1em;
}

.form-label > .form-control {
    margin-top: 0.5em;
}

.form-control {
    display: block;
    width: 100%;
    padding: 0.5em 1em;
    line-height: 1.5;
    border: 1px solid #ddd;
}

.modal-enter, .modal-leave {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
.ui.input {
  margin-bottom: 10px;
}
</style>
