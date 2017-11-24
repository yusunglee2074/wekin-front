<template>
  <div>
    <host-card-layout title="예약자 확인">
      <div slot="content" class="content">
        <div class="booking-member-list flex center" v-for="wekiner in wekiners" v-bind:key="wekiner.User.user_key">
          <img class="ui middle aligned circular image profile" :src="wekiner.User.profile_image">
          <div class="f1">
            <div class="column">
              <span class="name">{{ wekiner.User.name }}</span>
              <span class="ui basic label">{{ wekiner.ActivityNew.title }}</span>
            </div>
            <div class="column">
              <span class="date">구매일 : {{wekiner.created_at| formatDateTimeKo }}</span>
              <span class="phone">번호 : {{wekiner.User.phone}}</span>
              <span class="phone">신청활동일 : {{ wekiner.start_date, wekiner.start_time | sumDateAndTime | formatDateTimeKo }}</span>
            </div>
          </div>
          <div class="status" v-if="wekiner.state === 'finish'" style="color: red;">결제완료</div>
          <div class="status" v-if="wekiner.state === 'ready' || 'booking'">예약완료</div>
        </div>
        <p v-if="wekiners.length == 0" style="padding-top:32px;font-size: 15px;color: #979797;text-align:center">예약자가 없습니다.</p>
      </div>
      <!--<div slot="extra" class="ui basic button more-btn">더보기</div>-->
    </host-card-layout>
  </div>
</template>
<script>
import hostCardLayout from 'components/HostCardLayout.vue'
import api from 'api'
import moment from 'moment'

export default {
  components: {
    hostCardLayout
  },
  data() {
    return {
      wekiners: []
    }
  },
  filters: {
    sumDateAndTime (day, time) {
      let hour, minute
      hour = moment(time).get('hour')
      minute = moment(time).get('minute')
      return moment(day).set('hour', hour).set('minute', minute)
    }
  },
  methods: {
    getAttendWekiner() {
      api.getAttendWekiners(this.$route.params.activity_key)
        .then(wekiners => {
          this.wekiners = wekiners.data
        })
        .catch(error => console.error(error))
    }
  },
  mounted() {
    $('.ui.dropdown')
      .dropdown({
        maxSelections: 3
      })
  },
  created() {
    this.getAttendWekiner()
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/typography.scss';
@import '../../style/cross-browsing.scss';

.dropdown {
  margin-bottom: 20px;
  margin-left: 10px;
}

.ui.card>.content {
  padding: 0 14px;
}

.booking-member-list {
  padding: 20px;
  border-bottom: 1px solid $color-line;
  .f1 {
    margin-left: 20px;
  }
  .profile {
    width: 40px;
    height: 40px;
  }
  .name {
    font-size: 18px;
  }
  .label {
    font-weight: 400;
    border: 1px solid $color-primary;
  }
  .column:first-child span {
    margin-right: 26px;
    margin-bottom: 16px;
  }
  .column:last-child span {
    margin-right: 42px;
  }
}

.ui.basic.button.more-btn {
  border-radius: .28571429rem!important;
}

@media only screen and (max-width: 991px) {
  .booking-member-list {
    padding: 8px 0;
    .name {
      font-size: 14px;
    }
    .f1 {
      font-size: 12px;
    }
    .column:first-child span {
      margin-right: 0;
      margin-bottom: 0;
    }
    .column:last-child {
      @include flex-box();
      flex-direction: column;
    }
  }
}
</style>
