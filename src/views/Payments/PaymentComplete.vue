<template>
  <div id="paymentComplete" v-if="rsp">
    <div class="navbar-custom"></div>
    <div class="payment-result-container">
      <div class="ui segment payment-result-container__succeed" v-if="rsp.status == 'failed'">
        <span class="payment-result-container__header">결제가 취소되었습니다.</span>
        <div class="ui divider"></div>
        <div class="payment-result-container__list">
          <label>신청 활동</label>
          <span class="floated right">{{rsp.name}}</span>
        </div>
        <div class="payment-result-container__list">
          <label>결제 요청</label>
          <span class="floated right">{{rsp.amount| joinComma}}(+ {{ usePoint }} P)원</span>
        </div>
        <div class="ui divider"></div>
        <p>실패 사유 : {{rsp.fail_reason}}</p>
      </div>
      <div class="ui segment payment-result-container__succeed" v-if="rsp.pay_method != 'vbank' && rsp.status != 'failed'">
        <span class="payment-result-container__header">결제가 완료되었습니다.</span>
        <div class="ui divider"></div>
        <div class="payment-result-container__list">
          <label>신청 활동</label>
          <span class="floated right">{{rsp.name}}</span>
        </div>
        <div class="payment-result-container__list">
          <label>결제 금액</label>
          <span class="floated right">{{rsp.paid_amount || rsp.amount | joinComma}}(+ {{ usePoint }} P)원</span>
        </div>
        <div class="payment-result-container__list">
          <label>신청 결과</label>
          <span class="floated right">참가신청이 완료되었습니다.</span>
        </div>
        <div class="ui divider"></div>
        <p>지치고 힘든 당신의 활력소 위킨을 이용해주셔서 감사합니다. 예약 현황은 [마이페이지 - 활동]에서 확인하실 수 있습니다.</p>
      </div>
      <div class="ui segment payment-result-container__virture-account" v-if="rsp.pay_method == 'vbank'">
        <span class="payment-result-container__header">가상계좌 입금 대기 중입니다.</span>
        <span class="payment-result-container__header--sub">입금순 선착순 마감되오니 서둘러 입금해주세요.</span>
        <div class="ui divider"></div>
        <div class="payment-result-container__list">
          <label>신청 활동</label>
          <span class="floated right">{{rsp.name}}</span>
        </div>
        <div class="payment-result-container__list">
          <label>결제 금액</label>
          <span class="floated right">{{rsp.paid_amount | joinComma}}(+ {{ usePoint }} P)원</span>
        </div>
        <div class="payment-result-container__list">
          <label>신청 결과</label>
          <span class="floated right">참가신청이 완료되었습니다.</span>
        </div>
        <div class="ui divider"></div>
        <div class="payment-result-container__list">
          <label>은행명</label>
          <span class="floated right">{{rsp.vbank_name}}</span>
        </div>
        <div class="payment-result-container__list">
          <label>입금 계좌</label>
          <span class="floated right">{{rsp.vbank_num}}</span>
        </div>
        <div class="payment-result-container__list">
          <label>예금주</label>
          <span class="floated right">주식회사 위킨</span>
        </div>
        <div class="payment-result-container__list">
          <label>입금 마감일</label>
          <span class="floated right">{{rsp.vbank_date | formatDate}}</span>
        </div>
        <div class="ui divider"></div>
        <p>지치고 힘든 당신의 활력소 위킨을 이용해주셔서 감사합니다. 예약 현황은 [마이페이지 - 활동]에서 확인하실 수 있습니다.</p>
      </div>
      <a :href="`/users/${user.user_key}/wekin`" tag="button" class="ui primary button full-width" v-if="rsp.status != 'failed'">예약 확인</a>
      <a :href="`/activity/${$route.params.key}`" tag="button" class="ui primary button full-width">확인</a>
    </div>
  </div>
</template>
<script>
import api from 'api'

export default {
  data() {
    return {
    }
  },
  asyncComputed: {
    rsp() {
      if (this.$route.query.imp_uid) {
        return this.verifyOrder()
      } else {
        if (this.$route.params.rsp.status != 'failed') {
          api.requestPointUse(-1 * this.$route.params.point_value, this.$route.params.point_type === 'company' ? '1' : '0')
            .then(response => {
            })
            .catch(error => {
              api.sendEmail("lys0333@gmail.com", "위킨 포인트 에러3", new Date() + this.$store.getters.user.email + this.orderKey + JSON.stringify(error))
            })
        } else {
          api.sendEmail("lys0333@gmail.com", "위킨 포인트 에러2", new Date() + this.$store.getters.user.email + this.orderKey + JSON.stringify(error))
        }
        return this.$route.params.rsp
      }
    },
    user() {
      return this.$store.state.user
    },
    usePoint() {
      return this.$route.params.point_value
    }
  },
  methods: {
    verifyOrder() {
      let orderKey = this.$route.query.merchant_uid
      let impUID = this.$route.query.imp_uid
      api.verifyOrder(orderKey, impUID)
        .then((result) => {
          if (result.data.status != 'failed') {
            api.requestPointUse()
              .then(response => {
                return result.data
              })
              .catch(error => {
                api.sendEmail("lys0333@gmail.com", "위킨 포인트 에러", new Date() + this.$store.getters.user.email + this.orderKey + JSON.stringify(error))
                return result.data
              })
          } else {
            window.alert(result)
          }
        })
        .catch((error) => console.error(error))
    }
  }
}
</script>
<style lang="scss" scoped>
.payment-result-container {
  max-width: 324px;
  margin: 150px auto;

  &__header {
    display: inherit;
    font-weight: 700;
    font-size: 20px;

    &--sub {
      display: block;
      font-size: 14px;
      font-weight: 700;
      margin-top: 12px;
    }
  }
  &__list {
    margin: 22px 0;
    text-align: left;
    span {
      font-size: 16px;
      font-weight: 500;
    }
  }
  .ui.segment {
    padding: 18px 22px;
  }
  .button {
    margin-top: 4px;
  }
  p {
    font-size: 12px;
  }
}
</style>
