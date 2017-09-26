<template>
  <div class="modalsignup2">
    <div class="ui active inverted dimmer" v-if="isLoading">
      <div class="ui medium text loader">회원가입 중 입니다.</div>
    </div>
    <div class="modal-mask" @click="close" v-show="show" transition="modal">
      <div class="modal-container" @click.stop>
          <fieldset class="inputField">
            <div>
              <div class="inputDefault">
                <span>
                  <input class="realInputDefault" type="text" v-model="user.email" placeholder="이메일" @blur="isRightEmail()">
                </span>
                <span>
                </span>
              </div>
              <div class="inputDefault">
                <span>
                  <input class="realInputDefault" type="password" ref="password" placeholder="비밀번호 영숫자 6자이상" v-model="user.password">
                </span>
              </div>
              <div class="inputDefault lastInputDeleteBottomBorder">
                <span>
                  <input class="realInputDefault" type="password" placeholder="비밀번호 확인" v-model="user.password2">
                </span>
              </div>
            </div>
          </fieldset>
          <fieldset class="inputField">
            <div>
              <div class="inputDefault">
                <span>
                  <input class="realInputDefault" type="text" ref="name" v-model="user.name" placeholder="이름">
                </span>
              </div>
              <div class="inputDefault gender">
                <button class="ui basic button genderButton" :class="{ 
                  pink: user.gender === 0,
                  teal: user.gender !== 0
                  }" @click="genderSelect(0)">남자</button>
                <button class="ui basic button genderButton" :class="{ 
                  pink: user.gender === 1,
                  teal: user.gender !== 1 
                  }" @click="genderSelect(1)">여자</button>
              </div>
              <div class="inputDefault">
                  <input class="realInputDefault setLikeSpan" type="number" v-model.number="user.birthday.year" @blur="isYear($event)" placeholder="출생년도">
                  <select id="birthdayMonth" v-model="user.birthday.month">
                    <option :value="null" disabled>월</option>
                    <option v-for="month in months" v-bind:value="month.value">
                      {{ month.text }}
                    </option>
                  </select>
                  <input id="birthdayDay" class="realInputDefault setLikeSpan" type="number" v-model.number="user.birthday.day" @blur="isDay($event)" placeholder="일" style="margin-left: 20px;">
              </div>
              <div class="inputDefault lastInputDeleteBottomBorder" v-if="!areUCompany">
                <span style="font-size: 13px;">
                  (옵션)위킨과 제휴 중인 기업 회원 이십니까? <button @click="getCompanyEmail()">확인</button>
                </span>
              </div>
              <div class="inputDefault lastInputDeleteBottomBorder" v-if="areUCompany">
                <span>
                  <input class="realInputDefault" type="text" v-model="user.email_company" placeholder="기업이메일(옵션)">
                </span>
              </div>
            </div>
          </fieldset>
          <fieldset class="inputField">
            <div>
              <div class="inputDefault">
                <span>
                  <input class="realInputDefault" style="width: 210px;" type="number" v-model="user.phoneNumber" placeholder="휴대폰번호">
                  <button class="ui teal basic button phoneButton" @click="sendSms()">인증</button>
                </span>
              </div>
              <div class="inputDefault">
                <span>
                  <input class="realInputDefault" type="number" style="width: 210px;" v-model="verifySmsNumber" placeholder="인증번호">
                  <button class="ui teal basic button phoneButton" @click="confirmVerifyNumber()" >확인</button>
                </span>
              </div>
            </div>
          </fieldset>
          <div class="color secondary">{{errorMessage}}</div>
          <button class="positive ui button" style="background-color: rgb(0,154,140); width: 140px; margin-bottom: 9px;" @click="onSignUpClick()">가입하기</button>
          <span>&nbsp또는&nbsp</span>
          <span style="padding-top: 20px"><img src="./../../static/images/logo-facebook-68x68.png" class="snsLoginButton" @click="signInWithFacebook()"></span>
          <span style="padding-top: 20px"><img src="./../../static/images/logo-kakao-68x68.png" class="snsLoginButton" @click="signInWithKakao()"></span>
          <span style="padding-top: 20px"><img src="./../../static/images/logo-naver-68x68.png" class="snsLoginButton" @click="signInWithNaver()"></span>
          <div class="ui fitted checkbox">
            <input type="checkbox" v-model="isAgreed">
            <label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
              <a href="/policy/term" tag="a" target="_blank">이용약관</a>과
              <a href="policy/privacy" tag="a" target="_blank">개인정보취급방침</a>에 동의합니다.</label>
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
import moment from 'moment'
import axios from 'axios'
import api from './../api'

export default {
  name: 'modalsignup2',
  props: ['show'],
  data () {
    return {
      months: [
        { text: "1월" , value: 1 },
        { text: "2월" , value: 2 },
        { text: "3월" , value: 3 },
        { text: "4월" , value: 4 },
        { text: "5월" , value: 5 },
        { text: "6월" , value: 6 },
        { text: "7월" , value: 7 },
        { text: "8월" , value: 8 },
        { text: "9월" , value: 9 },
        { text: "10월" , value: 10 },
        { text: "11월" , value: 11 },
        { text: "12월" , value: 12 },
        ],
      user: {
        email: null,
        name: null, 
        password: null,
        password2: null,
        name: null,
        gender: null,
        birthday: {
          year: null,
          day: null,
          month: null
        },
        email_company: null,
        phoneNumber: null,
        isPhoneSmsSent: false,
      },
      verifySmsNumber: null,
      errorMessage: '',
      isAgreed: false,
      isLoading: false,
      sendingTime: null,
      phoneVerify: null,
      areUCompany: false,
    }
  },
  methods: {
    getCompanyEmail() {
      this.areUCompany = !this.areUCompany
    },
    signInWithNaver() {
      window.location.href = "https://nid.naver.com/oauth2.0/authorize?client_id=rTHYGlmyZuVKSzR4_45d&redirect_uri=http://175.195.139.99:8080/auth/naver&response_type=code&state=wekin"
    },
    signInWithKakao() {
      window.location.href = "https://kauth.kakao.com/oauth/authorize?client_id=75c0694ad636bcca94fa48cbc7c9d8cf&redirect_uri=http://175.195.139.99:8080/auth/kakao&response_type=code"
    },
    signInWithFacebook() {
      var provider = new firebase.auth.FacebookAuthProvider()
      provider.addScope('publish_actions');
      firebase.auth().signInWithRedirect(provider)
    },
    isRightEmail(event) {
      if (!Validation.checkEmailValidation(this.user.email)) {
        this.errorMessage = "이메일 형식을 확인해주세요."
      }
    },
    isYear(event) {
      event = event ? event : window.event
      let year = this.user.birthday.year
      if (2020 < year || 1900 > year || String(year).length !== 4) {
        this.errorMessage = "생일에 '년도' 형식을 맞춰주세요. 예) 1991"
      } else {
        this.errorMessage = ''
      }
    },
    isDay(event) {
      event = event ? event : window.event
      let day = this.user.birthday.day
      if (31 < day || 1 > day || String(day).length > 3) {
        this.errorMessage = "생일에 '일' 형식을 맞춰주세요. 예) 13"
      } else {
        this.errorMessage = ''
      }
    },
    close: function () {
      this.$emit('update:show', false)
    },
    checkForm() {
      if (!(this.user.email &&
        this.user.password &&
        this.user.password2 &&
        this.user.name)) {
        this.errorMessage = "모든 폼을 입력해주세요."
      } else if (!this.isAgreed) {
        alert("약관에 동의해주세요.")
      } else if (this.user.password != this.user.password2) {
        alert("비밀번호 2개가 일치하지 않습니다.")
      } else if (this.user.password.length < 6) {
        alert("비밀번호는 6자리 이상이여야 합니다.")
        this.user.password = ''
        this.user.password2 = ''
        this.$refs.password.focus();
      } else if (this.user.password.search(/[0-9]/g) < 0 || this.user.password.search(/[a-z]/ig) < 0) {
        alert("비밀번호는 영문, 숫자 조합이여야 합니다.")
        this.user.password = ''
        this.user.password2 = ''
        this.$refs.password.focus();
      } else if (!this.user.name) {
        this.errorMessage = "이름을 입력해주세요."
        this.$refs.name.focus();
      } else if (this.user.gender === null) {
        this.errorMessage = "성별을 선택해 주세요."
      } else if (!this.user.birthday.year || !this.user.birthday.day || !this.user.birthday.month) {
        this.errorMessage = "생일을 입력해 주세요."
      } else if (!this.phoneVerify) {
        this.errorMessage = "휴대폰 인증을 진행해 주세요."
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
        case "auth/email-already-exists":
          return "이미 가입 된 이메일 입니다."
        case "auth/argument-error":
          return "이미 가입 된 이메일 입니다."
      }
    },
    onSignUpSuccess(result) {
      this.isLoading = false
      alert('가입이 완료되었습니다.')
      // this.$parent.showSignupModal2 = false
      // this.$router.push({ name: "VerifyPhoneNumber", force: true })
      // this.$router.go({ path: "/verify/phonenumber", force: true })
      window.location.reload()
    },
    onSignUpFail(error) {
      this.isLoading = false
      this.errorMessage = this.getErrorMessage(error.code)
    },
    onSignUpClick() {
      console.log(123)
      if (this.checkForm()) {
        this.isLoading = true
        console.log(this.user)
        auth.signUp(
          this.user.email,
          this.user.password,
          this.user.name,
          JSON.stringify(this.user)
        )
          .then(result => this.onSignUpSuccess(result))
          .catch(error => this.onSignUpFail(error.response.data))
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
    sendSms() {
      if (this.sendingTime && this.sendingTime - moment() > -20000) {
        alert("인증문자는 20초에 한번만 보낼 수 있습니다.")
        return
      }
      this.user.phoneNumber = this.user.phoneNumber.replace(/-/g, "")
      if (this.user.phoneNumber.length < 9 || this.user.phoneNumber.length > 11) {
        alert("휴대폰번호의 형식이 이상합니다. 010########")
        return
      }
      auth.sendPhoneVerification(this.user.phoneNumber)
        .then( response => {
          this.user.phoneNumber
          this.sendingTime = moment()
          this.errorMessage = "인증번호를 발송했습니다."
        })
    },
    genderSelect(num) {
      console.log(num)
      if (num === 0) {
        this.user.gender = 0
      } else {
        this.user.gender = 1
      }
    },
    confirmVerifyNumber() {
      auth.verifySmsCode(this.user.phoneNumber, this.verifySmsNumber)
        .then(response => {
          if (response.success === true) {
            this.phoneVerify = true
            this.errorMessage = "인증에 성공하였습니다."
          } else {
            this.phoneVerify = false
            this.verifySmsNumber = ''
            this.errorMessage = "인증실패, 입력정보를 확인해주세요."
          }
        })
    }
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
    width: 380px;
    height: 540px;
    margin: 40px auto 0;
    padding: 20px 30px;
    background-color: #f2f2f2;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
}

.modal-body {
    margin: 20px 0;
}
.modal-enter, .modal-leave {
    opacity: 0;
}

.modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.inputField {
  margin-bottom: 6px;
  border-color: rgb(240, 240, 240);
  border-style: bold;
  background-color: #fff;
  padding: 0px;
}

.inputDefault {
  display: block;
  font-size: 12px;
  height: 44px;
  padding-bottom: 8px;
  padding-left: 13px;
  padding-right: 11px;
  padding-top: 8px;
  border-color: rgb(230, 240, 230);
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

.realInputDefault {
  border-bottom-color: rgb(0, 0, 0);
  border-bottom-style: none;
  border-bottom-width: 0px;
  border-left-color: rgb(0, 0, 0);
  border-left-style: none;
  border-left-width: 0px;
  border-right-color: rgb(0, 0, 0);
  border-right-style: none;
  border-right-width: 0px;
  border-top-color: rgb(0, 0, 0);
  border-top-style: none;
  border-top-width: 0px;
  display: inline-block;
  font-size: 16px;
  height: 30px;
  line-height: normal;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  padding-bottom: 6px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 6px;
  position: relative;
  width: 260px;
}

.lastInputDeleteBottomBorder {
  border-bottom-width: 0px;
}

.genderButton {
  margin-top: 4px;
  margin-bottom: 4px;
  width: 46%;

}
.phoneButton {
  height: 29px;
  line-height: 8px;
}

.gender {
  padding: 0px;
  padding-top: 2px;
  height: 50px;
}

.setLikeSpan {
  display: inline-block;
  width: 70px;
  border-right-color: rgb(240, 240, 240);
  border-right-style: solid;
  border-right-width: 1px;
  margin-right: 15px;
}

#birthdayMonth {
  font-size:13px;
  width: 55px;
  height: 28px;
}

#birthdayDay {
  padding-left: 20px;
  border-left-color: rgb(240, 240, 240);
  border-left-style: solid;
  border-left-width: 1px;
  border-right-style: none;
}

.clickedButton {
  border-color: black;
}

.snsLoginButton {
  width: 24px;
  height: auto;
}


</style>
