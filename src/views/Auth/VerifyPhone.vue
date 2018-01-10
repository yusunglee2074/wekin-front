<template>
  <div id="login">
    <div class="navbar-custom"></div>
    <div class="ui card login-container">
      <div class="content">
        <div class="header">핸드폰 인증</div>
      </div>
      <div class="content padded">
        <p>위킨 회원이 되신 것을 진심으로 환영합니다.</p>
        <p>편리한 서비스 이용을 위한 핸드폰 인증을 진행해주세요.</p>
        <div class="ui input">
          <input type="text" placeholder="핸드폰번호" v-model="phoneNumber">
        </div>
        <div class="ui input" v-if="this.sentNumber">
          <input type="text" placeholder="인증번호" v-model="verifyNumber">
        </div>
        <div class="ui small feed">
          <button class="ui basic button" @click="sendSms()" v-if="!sentNumber">인증문자 전송</button>
          <button class="ui basic button" @click="sendSms()" v-if="sentNumber">인증문자 재전송</button>
          <button class="negative ui button" @click="confirm()" v-if="sentNumber">인증 확인</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import auth from 'src/auth'
import moment from 'moment'
import api from './../../api'


export default {
  name: 'login',
  computed: mapGetters([
    'user'
  ]),
  methods: {
    // 핸드폰 문자 발송
    sendSms() {
      if (this.sendingTime && this.sendingTime - moment() > -30000) {
        alert("인증문자는 30초에 한번만 보낼 수 있습니다.")
        return
      }
      this.phoneNumber = this.phoneNumber.replace(/-/g, "")
      if (this.phoneNumber.length < 9 || this.phoneNumber.length > 11) {
        alert("휴대폰번호의 형식이 이상합니다.")
        return
      }
      auth.sendPhoneVerification(this.phoneNumber)
        .then( response => {
          this.sentNumber = this.phoneNumber
          this.sendingTime = moment()
        })
    },
    confirm() {
      auth.verifySmsCode(this.phoneNumber, this.verifyNumber)
        .then(response => {
          if (response.success === true) {
            api.saveProfile(this.$store.getters.user.user_key, { phone: this.phoneNumber, phone_valid: true })
              .then(result => {
                window.location.href = '/thankyou'
              })
              .catch(error => {
                alert(error + moment().format() + "죄송합니다. 사이트 아래 주소의 오픈카톡으로 연락주시면 바로 해결해드리겠습니다.")
              })
            // this.$router.push({ name: "Home", force: true })
          } else {
            alert("인증번호가 일치하지 않습니다.")
            this.verifyNumber = ''
          }
        })
    }
  },
  data() {
    return {
      phoneNumber: null,
      sentNumber: null,
      verifyNumber: null,
      sendingTime: null,
    }
  },
  mounted() {
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
  .content {
    text-align: center;
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
