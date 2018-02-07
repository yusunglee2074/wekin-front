<template>
  <div id="payment" v-if="">
    <div class="navbar-custom"></div>
    <div class="ui stackable two column grid">
      <!--<div class="stretched row">-->
      <div class="column">
        <div class="ui segment activity-info">
          <span class="label">신청 활동</span>
          <div class="ui divider"></div>
          <span class="label">{{ activity.title }}</span>
          <div class="ui form">
            <div class="inline field">
              <label>신청날짜</label>
              <span>{{ getCurrentTime() | formatDate }}</span>
            </div>
            <div class="inline field">
              <label>집결지</label>
              <span v-if="activity.address_detail">{{ activity.address_detail.text }}</span>
            </div>
            <div class="inline field">
              <label>활동 날짜</label>
              <span>{{ requestData.selectedDate | formatDateWithMoment }}</span>
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
                <input type="tel" v-model="requestUser.phone" placeholder="Phoneumber">
              </div>
              <!--
              <button class="ui button basic negative applier-info__phone-valid" v-if="!requestUser.phoneValid" @click="sendPhoneVerification()">인증요청</button>-->
            </div>
            <div class="inline field phone-mobile">
              <label></label>
              <!--<button class="ui button basic negative applier-info__phone-valid" v-if="!requestUser.phoneValid" @click="sendPhoneVerification()">인증요청</button>-->
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
        <div class="">
          <!-- TODO: 신청 활동정보 표시-->
        </div>
      </div>
      <div class="column">
        <div class="ui segment">
          <div>
            <span>활동 가격</span>
            <span class="floated right" v-if="activity.base_price">{{ requestData.finalPrice | joinComma}}원</span>
          </div>
          <div style="margin-top:10px;">
            <span>포인트 사용</span>
            <span class="floated right" v-if="activity.base_price">
              <input type="radio" id="normal" v-model="point.type" value="normal" @click="checkMinusPoint()"><label for="normal">일반포인트</label>
              <input type="radio" id="company" v-model="point.type" value="company" @click="checkMinusPoint()"><label for="company">기업포인트</label>
              <div class="ui mini icon input">
                <input type="text" placeholder="사용포인트" style="width:100px" v-model="point.value" @blur="checkPointInput()">
              </div>
            </span>
          </div>
          <div style="margin-top: 20px;">
            <span>사용가능 포인트</span>
            <span class="floated right">일반: {{ point.type === 'normal' ? user.point.point - point.value : user.point.point| joinComma }} P, 기업: {{ point.type === 'company' ? user.point.point_special - point.value : user.point.point_special | joinComma }} P</span>
            <br>
            
          </div>
          <div class="ui divider"></div>
          <span>최종 가격</span>
          <span class="floated right" v-if="activity.base_price">{{ requestData.finalPrice - point.value | joinComma }}원</span>
          <div id="error-message" v-if="point.errorMessage" style="color: red;">{{ point.errorMessage }}</div>
        </div>
        <div class="ui segment how-payments flex" v-if="!isFullPointOrder">
          <span>결제 수단</span>
          <div class="flex-space"></div>
          <div class="checkbox-container">
            <div class="ui radio checkbox">
              <input type="radio" name="payments" value="card" v-model="payMethod">
              <label>신용카드(Credit card)</label>
            </div>
            <div class="ui radio checkbox">
              <input type="radio" name="payments" v-model="payMethod" value="vbank">
              <label>무통장입금(가상계좌)(Virtual account deposit)</label>
            </div>
            <div class="ui radio checkbox" v-if="!isMobile">
              <input type="radio" name="payments" v-model="payMethod" value="trans">
              <label>실시간 계좌이체(Real-time account transfer)</label>
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
          <p>Please fill in the account to receive the refund when using virtual account</p>
          <div class="ui form">
            <div class="inline field">
              <label>계좌번호(Account Number)</label>
              <input type="text" v-model="requestUser.refundAccount">
            </div>
            <div class="inline field">
              <label>은행명(Bank Name)</label>
              <select v-model="requestUser.refundBank" style="width:244px;height:38px;">
                <option disabled value="">은행선택</option>
                <option value="04">KB국민은행</option>
                <option value="23">SC제일은행</option>
                <option value="39">경남은행</option>
                <option value="34">광주은행</option>
                <option value="03">기업은행</option>
                <option value="11">농협</option>
                <option value="31">대구은행</option>
                <option value="32">부산은행</option>
                <option value="45">새마을금고</option>
                <option value="07">수협</option>
                <option value="88">신한은행</option>
                <option value="05">외환은행</option>
                <option value="20">우리은행</option>
                <option value="71">우체국</option>
                <option value="37">전북은행</option>
                <option value="16">축협</option>
                <option value="81">하나은행(서울은행)</option>
                <option value="53">한국씨티은행(한미은행)</option>
              </select>
            </div>
            <div class="inline field">
              <label>예금주(Account Holder Name)</label>
              <input type="text" v-model="requestUser.refundHolder">
            </div>
          </div>
        </div>
        <div class="ui checkbox agreement-checkbox">
          <input type="checkbox" v-model="isAgreed">
          <label>본인은
            <a href="/policy/privacy" target="_blank">개인정보 제 3자 제공</a>동의에 관한 내용을 모두 이해하였으며 이에 동의합니다.(agreed the terms of the<a href="/policy/privacy" target="_blank"> Private Policy</a>)</label>
        </div>
        <button class="ui primary button full-width" v-on:click="onPayment()">참가신청하기(Submit)</button>
        <a :href="`/activity/${$route.params.key}`" class="ui negative button full-width" style="margin-top:12px">취소(Cancel)</a>
      </div>
    </div>
  </div>
</template>
<script>
import api from 'api'
import moment from 'moment'
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
      requestUser: {
        name: '',
        email: '',
        phone: '',
        gender: 0,
        phoneValid: false,
        refundHolder: null,
        refundBank: '',
        refundAccount: null
      },
      isPhoneVerifying: false,
      expiredTime: EXPIRED_TIME,
      point: {
        value: 0,
        type: null,
        validation: true,
        errorMessage: false,
        finalPrice: 0,
      },
      isFullPointOrder: false,
      isMobile: false
    }
  },
  computed: {
    selectedWekin() {
      return this.$route.params.selectedWekin
    },
    requestData() {
      return this.$route.params.requestData
    },
    user() {
      return this.$store.state.user
    },
  },
  created() {
    this.getActivity()
    this.getUser()
    // this.requestUser.name = this.user.name
    // this.requestUser.email = this.user.email
  },
  methods: {
    checkMinusPoint() {
      let user = this.user
      let point = this.point
      if ((user.point.point - point.value) < 0 || (user.point.point_special - point.value) < 0) {
        point.value = ''
        point.errorMessage = "포인트가 부족합니다."
      }
    },
    checkPointInput() {
      let point = this.point
      let userPoint = this.user.point
      if (point.type === 'company' && point.value > -1) {
        if (point.value > userPoint.point_special) {
          point.value = ''
          point.errorMessage = "사용하시려는 기업포인트가 보유포인트보다 많습니다."
        } else if (userPoint.percentage * 0.01 * this.activity.price * this.$route.params.peopleCount < point.value)  {
          point.value = ''
          point.errorMessage = `"포인트 사용한도율을 초과했습니다. 위키너님의 포인트사용가능 한도포인트는 가격의 ${ userPoint.percentage }% 인 ${ this.activity.price *this.$route.params.peopleCount}포인트 입니다."`
        } else {
          point.finalPrice = point.value
          point.errorMessage = false
          if (this.requestData.finalPrice == point.finalPrice) {
            this.isFullPointOrder = true
          } else {
            this.isFullPointOrder = false
          }
        }
      } else if (point.type === 'normal' && point.value > -1) {
        if (point.value > userPoint.point) {
          point.value = ''
          point.errorMessage = "사용하시려는 일반포인트가 보유포인트보다 많습니다."
        } else if (userPoint.percentage * 0.01 * this.activity.price * this.$route.params.peopleCount < point.value)  {
          point.value = ''
          point.errorMessage = `"포인트 사용한도율을 초과했습니다. 위키너님의 포인트사용가능 한도포인트는 가격의 ${ userPoint.percentage }% 인 ${ this.activity.price *this.$route.params.peopleCount}포인트 입니다."`
        } else {
          point.finalPrice = point.value
          point.errorMessage = false
          if (this.requestData.finalPrice == point.finalPrice) {
            this.isFullPointOrder = true
          } else {
            this.isFullPointOrder = false
          }
        }
      } else if (point.value < -1 || typeof point.value !== Number) {
        point.errorMessage = "정확한 포인트값을 입력해주세요."
        point.value = '' 
      } else {
        point.errorMessage = "포인트 종류를 선택해주세요."
        point.value = ''
      }
    },
    getUser() {
      auth.getCurrentUser().then(user => {
      }).catch(error => {
        window.reload()
      })
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
        this.requestUser.email)) {
        alert("모든 폼을 입력해주세요.")
      } else if (!Validation.checkEmailValidation(this.requestUser.email)) {
        alert('이메일 형식을 확인해주세요.')
      } else if (this.payMethod == 'vbank' && !(this.requestUser.refundHolder && this.requestUser.refundBank && this.requestUser.refundAccount)) {
        alert("환불 정보를 확인해주세요.")
      } else if (this.point.value > this.activity.price * this.$route.params.peopleCount) {
        alert("포인트 사용 에러입니다. 포인트 양을 확인해주세요.")
      } else if (!this.requestUser.phoneValid) {
        alert("핸드폰이 인증되있지 않습니다. 화면 왼쪽에서 핸드폰 인증을 진행해주세요")
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
          // 만약 최종 가격이 0원일 경우
          if (this.requestData.finalPrice == this.point.finalPrice) {
            api.postOrderWithPoint(this.user.user_key, this.requestData.wekin_key, this.point.finalPrice, refundInfo)
              .then((rsp) => {
                this.$router.push({
                  name: 'PaymentComplete',
                  params: {
                    rsp: rsp,
                    point_value: this.point.value, 
                    point_type: this.point.type,
                    wekin_key: this.requestData.wekin_key
                  }
                })
              })
              .catch(error => {
                console.log(error)
                alert('고객님 죄송합니다. 포인트 사용에 있어 오류가 발생했습니다.\n카카오톡 @위킨, 혹은 사이트 아래 유선전화로 연락 주시면 최대한 빨리 도와드리겠습니다.')
                return  
              })
          } else {
          api.requestOrder(this.user.user_key, this.requestData.wekin_key, this.requestData.amount, refundInfo)
            .then((result) => {
              IMP.request_pay({
                pg: 'html5_inicis',
                pay_method: this.payMethod,
                // escrow: true,
                merchant_uid: result.order_id,
                name: this.activity.title,
                amount: result.order_receipt_price - this.point.finalPrice,
                buyer_email: this.requestUser.email,
                buyer_name: this.requestUser.name,
                buyer_tel: this.requestUser.phone,
                digital: false,
                app_scheme: 'iamport',
                m_redirect_url : `http://we-kin.com/activity/${this.activity.activity_key}/payment/complete?point_value=${this.point.value}&point_type=${this.point.point_type}&wekin_key=${this.requestData.wekin_key}`,
                vbank_due: moment().add(2, 'day').format('YYYYMMDDHHmm')
              }, (rsp) => {
                if (rsp.success) {
                  api.verifyOrder(result.order_key, rsp.imp_uid)
                    .then((result) => {
                      this.$router.push({
                        name: 'PaymentComplete',
                        params: {
                          rsp: rsp,
                          point_value: this.point.value, 
                          point_type: this.point.type,
                          wekin_key: this.requestData.wekin_key
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
    }
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
    if (this.$route.params.requestData == undefined) {
      alert('잘못 된 접근입니다.')
      window.location.href = `/activity/${this.$route.params.key}`
    }
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) this.isMobile = true;
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
