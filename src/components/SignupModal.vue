<template>
  <div class="modalsignup">
    <div class="ui active inverted dimmer" v-if="isLoading">
      <div class="ui medium text loader">회원가입 중 입니다.</div>
    </div>
    <div class="modal-mask" @click="close" v-show="show" transition="modal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3>회원가입</h3>
        </div>
        <div class="modal-body">
          <div class="ui input">
            <input type="email" placeholder="이메일 Email" v-model="user.email">
          </div>
          <div class="ui input">
            <input type="text" placeholder="이름 Name" v-model="user.name">
          </div>
          <div class="ui input">
            <input type="password" ref="password" placeholder="비밀번호 Password" v-model="user.password">
          </div>
          <div class="ui input">
            <input type="password" placeholder="비밀번호 확인 Re-enter Password" v-model="user.password2">
          </div>
          <div class="color secondary">{{errorMessage}}</div>
          <div class="ui small feed">
            <div class="ui checkbox agreement-checkbox">
              <input type="checkbox" style="width:30px; height:30px;" v-model="isAgreed">
              <label class="label-for-signup">
                <a href="/policy/term" tag="a" target="_blank">이용약관</a>과
                <a href="policy/privacy" tag="a" target="_blank">개인정보취급방침</a>에 동의합니다.</label>
            </div>
            <br>
            <br>
            <button class="negative ui button" @click="onSignUpClick()">가입하기</button>
          </div>
          <p style="font-size: 14px;">If you are a foreigner use the button below.</p>
          <div class="ui checkbox agreement-checkbox">
            <input id="foriner" type="checkbox" style="width:30px; height:30px;" v-model="isForiner">
            <label for="foriner" style="text-align:left;">
              I have agreed the terms of the 
              <a href="/policy/term" tag="a" target="_blank">User Agreement</a> and
              <a href="policy/privacy" tag="a" target="_blank"> Private Policy.</a></label>
          </div>
          <button class="ui button" style="margin-top:5px;" @click="onSignUpClick()">Submit</button>
        </div>
        <!--<div class="social-login-container">
          <span class="ui horizontal divider">
            또는
          </span>
          <img class="link" style="width: 15%; height: auto;" src="static/images/logo-facebook-68x68.png" @click="onFacebookJoinClick()">
        </div>-->
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
      isForiner: false,
      user: {
        email: null,
        name: null, 
        password: null,
        password2: null 
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
        this.user.password2 &&
        this.user.name)) {
        this.errorMessage = "모든 폼을 입력해주세요."
      } else if (!Validation.checkEmailValidation(this.user.email)) {
        this.errorMessage = "이메일 형식을 확인해주세요."
      } else if (!this.isAgreed && !this.isForiner) {
        alert("약관에 동의해주세요.")
      } else if (this.user.password != this.user.password2) {
        alert("비밀번호 2개가 일치하지 않습니다. \n The two passwords do not match.")
      } else if (this.user.password.length < 6) {
        alert("비밀번호는 6자리 이상이여야 합니다.")
        this.user.password = ''
        this.user.password2 = ''
        this.$refs.password.focus();
      } else if (this.user.password.search(/[0-9]/g) < 0 || this.user.password.search(/[a-z]/ig) < 0) {
        alert("비밀번호는 영문, 숫자 조합이여야 합니다. \n Use more than 6 digits alphabets and numbers")
        this.user.password = ''
        this.user.password2 = ''
        this.$refs.password.focus();
      } else {
        return true
      }
    },
    onLoginFail(error) {
      this.isLoading = false
      this.errorMessage = this.getErrorMessage(error.code)
    },
    onFacebookJoinClick() {
      this.isLoading = true
      auth.loginWithFacebook()
    },
    getErrorMessage(error) {
      switch (error) {
        case "auth/weak-password":
          return "비밀번호는 6자리 이상 입력해주세요."
        case "auth/email-already-in-use":
          return "이미 가입 된 이메일 입니다."
        case "auth/argument-error":
          return "이미 가입 된 이메일 입니다."
      }
    },
    onSignUpSuccess(result) {
      this.isLoading = false
      alert('가입이 완료되었습니다.')
      this.$parent.showSignupModal = false
      this.$parent.isMobileMenuShowing = false
      if (this.isForiner) {
        this.$router.push({ name: "VerifyEmail", force: true })
        return
      }
      this.$router.push({ name: "VerifyPhoneNumber", force: true })
      // this.$router.go({ path: "/verify/phonenumber", force: true })
      // window.location.href = '/verify/phonenumber'
    },
    onSignUpFail(error) {
      this.isLoading = false
      console.log(error)
      this.errorMessage = this.getErrorMessage(error.code)
    },
    onSignUpClick() {
      if (this.checkForm()) {
        this.isLoading = true
        if (this.isForiner) {
          auth.signUp(this.user.email, this.user.password, this.user.name, 'notKorean')
            .then(result => this.onSignUpSuccess(result))
            .catch(error => this.onSignUpFail(error))
        } else {
          auth.signUp(this.user.email, this.user.password, this.user.name)
            .then(result => this.onSignUpSuccess(result))
            .catch(error => this.onSignUpFail(error))
        }
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
  updated() {
  },
  mounted() {
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
    height: 550px;
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
  width: 250px;
}
.ui.small.feed {
  margin-top: 2px;
  margin-bottom: 6px;
}
.label-for-signup {
  margin-top: 10px;
}
</style>
