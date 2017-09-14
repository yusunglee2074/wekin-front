<template>
  <div id="payment" v-if="">
    <div class="navbar-custom"></div>
    <div class="ui stackable two column grid">
      <!--<div class="stretched row">-->
      <div class="column">
        <div class="ui segment activity-info">
          <span class="label">신청 활동</span>
          <div class="ui divider"></div>
          <span class="label">{{activity.title}}</span>
          <div class="ui form">
            <div class="inline field">
              <label>신청날짜</label>
              <span>{{ getCurrentTime() | formatDate }}</span>
            </div>
            <div class="inline field">
              <label>집결지</label>
              <span v-if="activity.address_detail">{{activity.address_detail.text}}</span>
            </div>
            <div class="inline field">
              <label>활동 날짜</label>
              <span v-if="selectedWekin">{{selectedWekin.start_date | formatDate}}</span>
            </div>
          </div>
        </div>
        <div class="ui segment applier-info">
          <span class="label">신청자정보</span>
          <div class="ui divider"></div>
          <div class="ui form">
            <div class="inline field">
              <label>이름</label>
              <input type="text" v-model="requestUser.name">
            </div>
            <div class="inline field">
              <label>성별</label>
              <button class="ui button" v-bind:class="{primary: !requestUser.gender, basic: requestUser.gender}" @click="setGender(0)">남자</button>
              <button class="ui button" v-bind:class="{primary: requestUser.gender, basic: !requestUser.gender}" @click="setGender(1)">여자</button>
            </div>
            <div class="inline field">
              <label>이메일</label>
              <input type="email" v-model="requestUser.email">
            </div>
            <div class="inline field phone flex">
              <label>전화번호</label>
              <div class="ui left labeled icon input f1" @click="onPhoneClick()">
                <i class="check circle icon violet" v-if="requestUser.phoneValid"></i>
                <input type="tel" v-model="requestUser.phone">
              </div>
              <button class="ui button basic negative applier-info__phone-valid" v-if="!requestUser.phoneValid" @click="sendPhoneVerification()">인증요청</button>
            </div>
            <div class="inline field phone-mobile">
              <label></label>
              <button class="ui button basic negative applier-info__phone-valid" v-if="!requestUser.phoneValid" @click="sendPhoneVerification()">인증요청</button>
            </div>
            <div class="inline field" v-if="isPhoneVerifying">
              <label>인증코드</label>
              <input type="text" v-model="requestUser.phoneVerificationCode" placeholder="인증코드를 입력해주세요.">
              <button class="ui primary button  applier-info__phone-valid" @click="verifySmsCode()">인증완료</button>
            </div>
            <div class="inline field" v-if="isPhoneVerifying">
              <label> </label>
              <div v-if="isPhoneVerifying">인증 만료 시간: {{expiredTime | formatTimer}}</div>
            </div>
          </div>
        </div>
        <div class="ui segment">
          <span class="label">신청인원</span>
          <span v-if="this.activity.isteamorpeople === 'people'" class="label floated right">{{this.$route.params.peopleCount}}인</span>
          <span v-if="this.activity.isteamorpeople === 'team'" class="label floated right">{{this.$route.params.peopleCount}}팀</span>
        </div>
      </div>
      <div class="column">
        <div class="ui segment">
          <span>활동 가격</span>
          <span class="floated right" v-if="activity.price">{{activity.price | joinComma}}원</span>
          <div class="ui divider"></div>
          <span>최종 가격</span>
          <span class="floated right" v-if="activity.price">{{(activity.price * this.$route.params.peopleCount) | joinComma }}원</span>
        </div>
        <div class="ui segment how-payments flex">
          <span>결제 수단</span>
          <div class="flex-space"></div>
          <div class="checkbox-container">
            <div class="ui radio checkbox">
              <input type="radio" name="payments" value="card" v-model="payMethod">
              <label>신용카드</label>
            </div>
            <div class="ui radio checkbox">
              <input type="radio" name="payments" v-model="payMethod" value="vbank">
              <label>무통장입금(가상계좌)</label>
            </div>
            <div class="ui radio checkbox">
              <input type="radio" name="payments" v-model="payMethod" value="trans">
              <label>실시간 계좌이체</label>
            </div>
            <!--
            <div class="ui radio checkbox">
              <input type="radio" name="payments" v-model="payMethod" value="phone" disabled="true">
              <label>휴대폰 소액결제</label>
            </div>
            <div class="ui radio checkbox">
              <input type="radio" name="payments" v-model="payMethod" disabled="true">
              <label>네이버 페이 간편결제</label>
            </div>
            <div class="ui radio checkbox">
              <input type="radio" name="payments" v-model="payMethod" disabled="true">
              <label>페이코 페이 간편결제</label>
            </div>
            -->
          </div>
        </div>
        <div class="ui segment" v-if="payMethod == 'vbank'">
          <p>가상계좌 이용시 환불받으실 계좌를 입력해주세요</p>
          <div class="ui form">
            <div class="inline field">
              <label>계좌번호</label>
              <input type="text" v-model="requestUser.refundAccount">
            </div>
            <div class="inline field">
              <label>은행명</label>
              <input type="text" v-model="requestUser.refundBank">
            </div>
            <div class="inline field">
              <label>예금주</label>
              <input type="text" v-model="requestUser.refundHolder">
            </div>
          </div>
        </div>
        <div class="ui checkbox agreement-checkbox">
          <input type="checkbox" name="agreement-checkbox" tabindex="0" class="hidden">
          <label>본인은
            <a href="/policy/privacy" target="_blank">개인정보 제 3자 제공</a>동의에 관한 내용을 모두 이해하였으며 이에 동의합니다.</label>
        </div>
        <button class="ui primary button full-width" v-on:click="onPayment()">참가신청하기</button>
        <a :href="`/activity/${$route.params.key}`" class="ui negative button full-width" style="margin-top:12px">취소</a>
      </div>
    </div>
  </div>
</template>
<script>
import api from 'api'
import auth from 'src/auth'
import { Validation } from 'src/util'

const EXPIRED_TIME = 180

export default {
  name: 'payment',
  data() {
    return {
      isAgreed: false,
      activity: {},
      payMethod: "card",
      user: {},
      requestUser: {
        name: '',
        email: '',
        phone: '',
        gender: 0,
        phoneValid: false,
        refundHolder: null,
        refundBank: null,
        refundAccount: null
      },
      isPhoneVerifying: false,
      expiredTime: EXPIRED_TIME,
    }
  },
  computed: {
    selectedWekin() {
      return this.$route.params.selectedWekin
    }
  },
  methods: {
    getUser() {
      auth.getCurrentUser().then(user => {
        this.user = user
      }).catch(error => console.error(error))
    },
    onPhoneClick() {
      if (this.requestUser.phoneValid && confirm("전화번호를 재인증 하시겠습니까?")) {
        this.requestUser.phoneValid = false
      }
    },
    startTimer() {
      let interval = setInterval(() => {
        this.expiredTime--
        if (this.expiredTime <= 0) {
          this.stopTimer(interval)
        }
      }, 1000);
    },
    stopTimer(interval) {
      this.expiredTime = EXPIRED_TIME
      this.isPhoneVerifying = false
      this.requestUser.phonVerificationCode = ''
      clearInterval(interval)
    },
    verifySmsCode() {
      auth.verifySmsCode(this.requestUser.phone, this.requestUser.phoneVerificationCode)
        .then((data) => {
          if (data.success) {
            this.requestUser.phoneValid = true
            this.stopTimer()
            alert("인증이 완료되었습니다.")
          } else {
            alert("인증번호가 올바르지 않습니다.")
          }
        }).catch(error => console.error(error))
    },
    sendPhoneVerification() {
      if (!this.isPhoneVerifying) {
        auth.sendPhoneVerification(this.requestUser.phone)
          .then((data) => {
            this.startTimer()
            this.isPhoneVerifying = true
          }).catch(error => console.error(error))
      } else {
        alert("이미 전송되었습니다. 경우에 따라 1분 이상 소요될 수 있습니다.")
      }
    },
    setGender(gender) {
      this.requestUser.gender = gender
    },
    getCurrentTime() {
      return new Date()
    },
    getActivity() {
      api.getActivity(this.$route.params.key)
        .then(activity => {
          activity.title = activity.title.replace('\n', '')
          this.activity = activity
        })
        .catch(err => {
          console.error(err)
        })
    },
    checkForm() {
      if (!(this.requestUser.name &&
        this.requestUser.email &&
        this.requestUser.phone)) {
        alert("모든 폼을 입력해주세요.")
      } else if (!Validation.checkEmailValidation(this.requestUser.email)) {
        alert('이메일 형식을 확인해주세요.')
      } else if (!this.requestUser.phoneValid) {
        alert("전화번호 인증을 완료해주세요.")
      } else if (this.payMethod == 'vbank' && !(this.requestUser.refundHolder && this.requestUser.refundBank && this.requestUser.refundAccount)) {
        alert("환불 정보를 확인해주세요.")
      } else {
        return true
      }
    },
    onPayment() {
      if (!this.isAgreed) {
        alert('약관에 동의해주세요.')
      } else if (this.checkForm()) {
        if (confirm("신청자 정보가 맞습니까?")) {
          let refundInfo = {
            refund_account: this.requestUser.refundAccount,
            refund_bank: this.requestUser.refundBank,
            refund_holder: this.requestUser.refundHolder,
          }
          api.requestOrder(this.user.user_key, this.selectedWekin.wekin_key, this.$route.params.peopleCount, refundInfo)
            .then((result) => {
              IMP.request_pay({
                pg: 'html5_inicis',
                pay_method: this.payMethod,
                escrow: true,
                merchant_uid: result.order_id,
                name: this.activity.title,
                amount: result.order_receipt_price,
                buyer_email: this.requestUser.email,
                buyer_name: this.requestUser.name,
                buyer_tel: this.requestUser.phone,
                digital: false,
                app_scheme: 'iamport',
                m_redirect_url : `http://we-kin.com/activity/${this.activity.activity_key}/payment/complete`
              }, (rsp) => {
                if (rsp.success) {
                  api.verifyOrder(result.order_key, rsp.imp_uid)
                    .then((result) => {
                      this.$router.push({
                        name: 'PaymentComplete',
                        params: {
                          rsp: rsp
                        }
                      })
                    })
                  // var msg = '결제가 완료되었습니다.';
                  // msg += '고유ID : ' + rsp.imp_uid;
                  // msg += '상점 거래ID : ' + rsp.merchant_uid;
                  // msg += '결제 금액 : ' + rsp.paid_amount;
                  // msg += '카드 승인번호 : ' + rsp.apply_num;
                } else {
                  api.deleteOrder(result.order_key)
                    .then((result) => {
                      console.log(result)
                      var msg = '결제에 실패하였습니다.';
                      msg += '에러내용 : ' + rsp.error_msg;
                      alert(msg);
                      // window.location.href = `/activity/${this.$route.params.key}`
                    }).catch(error => console.error(error))
                }
              })
            })
        }
      }
    }
  },
  created() {
    this.getActivity()
    this.getUser()
    // this.requestUser.name = this.user.name
    // this.requestUser.email = this.user.email
  },
  mounted() {
    IMP.init('imp77669929')
    this.$store.watch(() => {
      if (this.$store.state.user !== undefined) {
        this.requestUser.email = this.user.email
        this.requestUser.name = this.user.name
        this.requestUser.phone = this.user.phone
        this.requestUser.gender = this.user.gender
        this.requestUser.phoneValid = this.user.phone_valid
      }
    })
    $('.agreement-checkbox').checkbox({
      onChange: () => {
        this.isAgreed = !this.isAgreed
      }
    })
    if (this.$route.params.peopleCount == undefined) {
      alert('잘못 된 접근입니다.')
      window.location.href = `/activity/${this.$route.params.key}`
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../../style/typography.scss';
@import '../../style/variables.scss';
@import '../../style/cross-browsing.scss';
@import '../../style/media.scss';

.ui.grid {
  max-width: 1000px;
  margin: 0 auto;
}

.ui.segment {
  padding: 18px 30px;
  text-align: left;

  .label {
    font-size: 20px;
  }
}

.ui.form {
  label {
    font-weight: 300!important;
    min-width: 64px;
  }
  input {
    width: 100%;
  }
}

.activity-info {
  .ui.form {
    margin-top: 24px;
  }
}

.applier-info {
  &__phone-valid {
    margin-left: 14px!important;
    font-size: 12px;
    padding: 12px;
  }
}

.ui.form {
  margin-top: 10px;
  .field {
    @include flex-box();
    align-items: center;

    label {
      flex: initial;
    }
    input {
      flex: 1;
      border: 1px solid $color-line;
    }
  }
}

.how-payments {
  span {
    vertical-align: top;
  }
  .checkbox-container {
    width: 170px;
    display: inline-block;

    .ui.radio.checkbox {
      padding: 7px 0;
    }
  }
}

.agreement-checkbox {
  text-align: left;
  margin: 0 12px 12px;
}

.phone-mobile {
  display: none!important;
}

// 모바일 대응
@media only screen and (max-width: 1199px) {
  .ui.form {
    input {
      width: 100%!important;
    }
    input[type="tel"] {
      width: 120px;
    }
  }
  .phone {
    button {
      display: none;
    }
  }
  .phone-mobile {
    display: block!important;

    button {
      margin: 0!important;
      width: 100%;
    }
  }
}
</style>
