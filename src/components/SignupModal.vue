<template>
  <div class="modalsignup">
    <div class="modal-mask" @click="close" v-show="show" transition="modal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3>회원가입</h3>
        </div>
        <div class="modal-body">
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
                <label class="label-for-signup">
                  <a href="/policy/term" tag="a">이용약관</a>과
                  <a href="policy/privacy" tag="a">개인정보취급방침</a>에 동의합니다.</label>
            </div>
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

export default {
  name: 'modalsignup',
  props: ['show'],
  data () {
    return {
      user: {
        email: null,
        name: null, 
        password: null 
      },
      errorMessage: '',
      isAgreed: false,
      isLoading: false,
    }
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
  },
  mounted() {
    $('.agreement-checkbox').checkbox({
      onChange: () => {
        this.isAgreed = !this.isAgreed
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
    width: 350px;
    height: 330px;
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
.ui.small.feed {
  margin-top: 2px;
  margin-bottom: 6px;
}
.label-for-signup {
  margin-top: 10px;
}
</style>
