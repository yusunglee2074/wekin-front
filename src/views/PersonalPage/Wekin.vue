<template>
  <div id="personal-page-feed">
    <div class="ui pointing secondary menu menu--wide">
      <a class="item active" data-tab="first">결제 내역</a>
      <a class="item" data-tab="second">대기 신청</a>
      <a class="item" data-tab="third">활동 완료</a>
    </div>
    <div class="ui tab active" id="first" data-tab="first">
      <div class="ui three doubling cards" v-if="orders.length >= 0">
        <div class="card card--reservation" v-for="wekin in wekinNews" v-bind:key="wekin.wekin_key">
          <router-link :to="{name: 'ActivityDetail', params: { key: wekin.ActivityNew.activity_key } }">
            <div class="header">
              {{wekin.ActivityNew.title}}
            </div>
          </router-link>
          <div class="content">
            <div class="card--reservation__label">
              <label>신청 날짜</label>
              <span>{{wekin.Order.created_at | formatDate}}</span>
            </div>
            <div class="card--reservation__label flex">
              <label>집결지</label>
              <span>{{wekin.ActivityNew.address_detail.text}}</span>
            </div>
            <div class="card--reservation__label">
              <label>활동 날짜</label>
              <span>{{wekin.start_date | formatDate}} {{ wekin.start_time | toTime }}</span>
            </div>
            <div class="ui divider"></div>
            <div class="card--reservation__label">
              <label>결제 금액</label>
              <span>총 {{wekin.final_price | joinComma}}원 / Point: {{wekin.point ? wekin.point : 0 | joinComma}} 포인트 사용</span>
            </div>
            <div class="card--reservation__label">
              <label>신청결과</label>
              <span>{{wekin.state | orderStatusToText}}</span>
            </div>
            <div class="ui divider"></div>
            <div class="card--reservation__buttons">
              <button class="ui basic button" v-if="wekin.state == 'ready'" @click="goToPaymentCompletedPage(wekin.Order)">계좌안내</button>
              <button class="ui basic button" v-if="isCancelable(wekin)" @click="cancelOrder(wekin)">참가취소</button>
              <!--<a :to="`/activity/${order.WekinNew.ActivityNew.activity_key}`" tag="button" class="ui basic button">참가취소</a>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ui tab" id="second" data-tab="second">
      <div class="ui three doubling cards" v-if="orders.length >= 0">
        <div class="card card--reservation" v-for="order in orders" v-if="isCancelable(order)" v-bind:key="order.order_key">
          <div class="header">
            {{order.WekinNew.ActivityNew.title}}
          </div>
          <div class="content">
            <div class="card--reservation__label">
              <label>신청 날짜</label>
              <span>{{order.created_at | formatDate}}</span>
            </div>
            <div class="card--reservation__label flex">
              <label>집결지</label>
              <span>{{order.WekinNew.ActivityNew.address_detail.text}}</span>
            </div>
            <div class="card--reservation__label">
              <label>활동 날짜</label>
              <span>{{order.WekinNew.start_date | formatDate}} {{ wekin.start_time | toTime }}</span>
            </div>
            <div class="ui divider"></div>
            <div class="card--reservation__label">
              <label>결제 금액</label>
              <span>{{order.order_total_price | joinComma}}원</span>
            </div>
            <div class="card--reservation__label">
              <label>신청결과</label>
              <span>{{order.status | orderStatusToText}}</span>
            </div>
            <div class="ui divider"></div>
            <div class="card--reservation__buttons">
              <button class="ui basic button" v-if="order.order_pay_method == 'vbank'" @click="goToPaymentCompletedPage(order)">계좌안내</button>
              <button class="ui basic button" v-if="isCancelable(order)" @click="cancelOrder(wekin)">참가취소</button>
              <!--<a :to="`/activity/${order.WekinNew.ActivityNew.activity_key}`" tag="button" class="ui basic button">참가취소</a>-->
            </div>
          </div>
        </div>
      </div>
      <p v-if="!isExistCancelable" style="padding-top:32px;font-size: 15px;color: #979797;text-align:center">예약하신 위킨이 없습니다.</p>
      <!--<button class="ui basic more button">더보기</button>-->
    </div>
    <div class="ui tab" id="third" data-tab="third">
      <div class="ui segment order-code">
        <span>위킨 활동 후기는 메이커에게 큰 힘이 됩니다.</span>
        <div class="ui action floated right input">
          <input type="text" placeholder="활동 번호를 입력해주세요!" v-model="orderUid">
          <button class="ui teal left labeled icon button" @click="addBeenOrder()">
            <i class="plus icon"></i> 등록
          </button>
        </div>
      </div>
      <div class="ui three doubling cards">
        <wekin-card-layout 
          :title="wekin.ActivityNew.title" 
          :address="wekin.ActivityNew.address" 
          :name="wekin.ActivityNew.Host.name" 
          :imageUrl="wekin.ActivityNew.main_image.image[0]" 
          :activityKey="wekin.ActivityNew.activity_key"
          v-for="wekin in wekinNews" v-bind:key="wekin.wekin_key"
          v-if="isStartAndPaid(wekin)">
          <button class="ui basic right floated button" slot="action-btn" @click="onWriteReviewClick(wekin.ActivityNew)">후기작성</button>
        </wekin-card-layout>
        <!--<button class="ui basic more button">더보기</button>-->
      </div>
      <p v-if="completedActivityNew && completedActivityNew.length == 0" style="padding-top:32px;font-size: 15px;color: #979797;;text-align:center">완료 된 위킨이 없습니다.</p>
    </div>
    <feed-editor ref="feedEditor"></feed-editor>
  </div>
</template>
<script>
import wekinCardLayout from 'components/WekinCardLayout.vue'
import feedEditor from 'components/FeedEditor.vue'
import api from 'api'
import moment from 'moment'
import _ from 'lodash'

export default {
  data() {
    return {
      activities: [],
      orders: [],
      orderUid: null,
      wekinNews: [],
      emptyFirstTabToggle: 1,
      emptyThridTabToggle: 1
    }
  },
  computed: {
    isExistCancelable() {
      return _.find(this.orders, (order) => {
        if ((order.status == "paid" || order.status == "ready") && moment(order.WekinNew.start_date) > moment()) {
          return order
        }
      })
    }
  },
  components: {
    wekinCardLayout,
    feedEditor
  },
  asyncComputed: {
    completedActivityNew() {
      let now = moment()
      return this.orders.filter((order) => {
        if ((order.status == "paid" || order.status == "been") && moment(order.WekinNew.start_date) < now) {
          return order
        }
      })
    },
  },
  filters: {
    orderStatusToText(status) {
      switch (status) {
        case 'cancelled':
          return '결제 취소'
        case 'failed':
          return '결제실패'
        case 'ready':
          return "입금대기"
        case 'paid':
          return "결제완료"
        case 'reqRef':
          return "환불요청"
      }
    },
    toTime (day) {
      return moment(day).format("HH:mm")
    }
  },
  methods: {
    isNotStartAndPaid(wekin) {
      if (moment(wekin.start_date) > moment() && wekin.state === 'paid') {
        this.emptyFirstTabToggle = 0 
        return true
      }
      return false
    },
    isStartAndPaid(wekin) {
      if (moment(wekin.start_date) < moment() && wekin.state === 'paid') {
        this.emptyThridTabToggle = 0 
        return true
      }
      return false
    },
    // getUserActivities() {
    //   api.getUserActivities(this.$route.params.key)
    //     .then(json => this.activities = json.results)
    //     .catch(err => console.error(err))
    // },
    onWriteReviewClick(activity) {
      this.$refs.feedEditor.createReview(activity)
    },
    addBeenOrder() {
      api.addBeenOrder(this.orderUid)
        .then(this.getUserOrders)
        .then(alert("활동이 추가되었습니다."))
        .catch((error) => alert("활동 번호를 확인해주세요."))
    },
    isCancelable(wekin) {
      if ((wekin.state == 'paid' || wekin.state  == 'ready') && new Date(wekin.start_date) > new Date()) {
        return true
      }
      return false
    },
    goToPaymentCompletedPage(order) {
      let vbankName = order.order_extra.vbank_name
      let vbankNum = order.order_extra.vbank_num
      let vbankDate = order.order_extra.vbank_date
      let rsp = {
        name: order.wekin_name,
        paid_amount: order.order_receipt_price,
        pay_method: order.order_pay_method,
        vbank_name: vbankName,
        vbank_num: vbankNum,
        vbank_date: vbankDate
      }

      this.$router.push({
        name: 'PaymentComplete',
        params: {
          rsp: rsp
        }
      })
    },
    getUserOrders() {
      // api.getUserOrders(this.$route.params.key)
      api.getUserOrders(this.$route.params.key)
        .then(orders => this.orders = orders)
        .catch(err => console.error(err))
    },
    cancelOrder(wekin) {
      if (confirm('정말 취소하시겠습니까? 환불 정책은 신청 당시 위킨 환불 규정을 따릅니다.')) {
        api.cancelOrder(wekin.Order.order_key)
          .then(orders => {
            alert("취소되었습니다.")
            window.location.href = this.$route.fullPath
          })
          .catch(err => console.error(err))
      }
    },
    getWekinNews() {
      api.getUserWekinNews(this.$route.params.key)
        .then(result => {
          console.log(result)
          this.wekinNews = result.data
        })
    }
  },
  created() {
    this.getUserOrders()
    this.getWekinNews()
  },
  mounted() {
    $('.menu .item').tab()
    $('.ui.rating')
      .rating({
        initialRating: 3,
        maxRating: 5
      })
      .rating('disable')
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';

.ui.three.doubling.cards .card {
  width: 100%!important;
}

.menu--wide .item {
  min-width: 100px;
  justify-content: center;
  font-size: 16px;
}

.card--reservation {
  .header {
    background: $color-primary;
    color: white;
    height: 58px;
    font-size: 16px;
    line-height: 2.2;
    padding: 14px;
    text-align: center;
  }
  &__label {
    padding: 6px;

    label {
      display: inline-block;
      min-width: 80px;
      color: rgb(117, 117, 117);
    }
  }
  &__buttons {
    text-align: center;

    button {
      width: calc(100% - 42px)!important;
      margin: 5px 0!important;
    }
  }
}

.tab#first {}
.tab#second {}

.tab#third {
  .ui.segment {
    height: 65px;
    span {
      line-height: 2.8;
      font-size: 14px;
    }
  }
  .complete-badge {
    position: absolute;
    width: 50px;
    height: 30px;
    border: 1px solid rgb(255, 255, 255);
    margin: 14px 19px;
    text-align: center;
    line-height: 2.2;
    font-family: NotoSansCJKkr-Medium;
    border-radius: 4px;
    background: transparent;
    color: white;
    font-size: 13px;
  }
  .header {
    font-size: 20px;
  }
  .ui.rating {
    vertical-align: middle;
  }
  .address,
  .date {
    font-size: 15px;
    margin: 4px 0;
  }
  .card .button {
    width: 100px;
    height: 26px;
    line-height: 0;
  }
}

.more.button {
  margin: 16px auto 22px;
  width: 150px;
}

.ui.divider {
  border-top: 1px dashed black!important;
}

.ui.buttons {
  width: 100%;
}

@media only screen and (max-width: 991px) {
  .order-code {
    display: none
  }
}
</style>
