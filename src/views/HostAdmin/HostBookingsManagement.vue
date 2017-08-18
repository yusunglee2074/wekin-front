<template>
  <div>
    <host-card-layout title="예약 관리">
      <div slot="content" class="content">
        <div class="wekin-list-layout" v-if="!hasItBooker" v-bind:class="{ end: new Date(wekin.start_date) <= new Date() }" v-for="wekin in wekins" v-bind:key="wekin.wekin_key">
          <div class="left">
            <span class="title">{{wekin.Activity.title}}</span>
            <span class="date">{{wekin.start_date | formatDateTimeKo}}</span>
            <p><span> 결제대기 인원 : </span>{{ getReadyPeople(wekin.Orders) }} 명</p>
            <p><span> 결제완료 인원 : </span><span :style="getPaidPeople(wekin.Orders) > 0 ? paidStyle : ''">{{ getPaidPeople(wekin.Orders) }} 명</span></p>
          </div>
          <router-link :to="{ name: 'HostBookingDetail', params: { key: wekin.wekin_key }}" v-if="!hasItBooker" class="ui primary button right">예약자 확인</router-link>
        </div>
        <div class="wekin-list-layout" style="text-align:center;" v-if="wekins && wekins.length == 0">
          <p style="width:100%">예약이 진행된 위킨이 없습니다.</p>
        </div>
        <div class="wekin-list-layout" style="text-align:center;">
          <p style="width:100%">예약자분이 계시는 위킨만 표시됩니다.</p>
        </div>
      </div>
    </host-card-layout>
  </div>
</template>
<script>
import moment from 'moment'
import hostCardLayout from 'components/HostCardLayout.vue'
import api from 'api'

export default {
  data() {
    return {
      wekins: [],
      currentLength: 0,
      pageLimit: 10,
      isLastPage: false,
      status: "0",
      now: new Date(),
      hasItBooker: false,
      paidStyle: {
        'color': 'red'
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  asyncComputed: {
    /*
    filteredWekins() {
      let pagingWekins = this.pagingWekins.filter((wekin) => {
        switch (this.status) {
          case "0":
            return wekin
          case "1":
            return (new Date(wekin.start_date) > this.now)? wekin : false
          case "2":
            return (new Date(wekin.start_date) < this.now)? wekin : false
        }
      })
      if(pagingWekins.length < this.pageLimit) {
        setTimeout(() => {
          this.getMoreBookings()
        }, 500)
      }
      return pagingWekins
    }
    */
  },
  components: {
    hostCardLayout
  },
  methods: {
    getReadyPeople: function (OrderList) {
      let count = 0
      for (let i = 0; i < OrderList.length; i++) {
        if (OrderList[i].status === 'ready') {
          count++
        }
      }
      return count
    },
    getPaidPeople: function (OrderList) {
      let count = 0
      for (let i = 0; i < OrderList.length; i++) {
        if (OrderList[i].status === 'paid') {
          count++
        }
      }
      return count
    },
    getAdminBookings() {
      api.getAdminBookings(this.user.Host.host_key)
        .then(json => {
          let wekins = json.results.filter(wekin => {
            if ((wekin.Activity.status === 3 || wekin.Activity.status === 5) && wekin.Orders.length !== 0) {
              return wekin
            }
          })
          wekins.sort(function compare(a, b) {
            if (moment(a.start_date) > moment(b.start_date)) {
              return 1;
            }
            if (moment(a.start_date) < moment(b.start_date)) {
              return -1;
            }
            return 0;
          })
          this.wekins = wekins
        })
        .catch(error => console.error(error))
    },
  },
  created() {
    this.getAdminBookings()
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

.wekin-list-layout {
  @include flex-box();
  align-items: center;
  padding: 20px 10px;
  border-top: 1px solid $color-line;
  &:last-child {
    border-bottom: 1px solid $color-line;
  }
  &.end span {
    color: #979797;
  }
  &.end button {
    background-color: #757575;
  }
  .left {
    @include flex-box();
    flex-direction: column;
    flex: 1;
  }
  span {
    padding-right: 30px;
  }
  .title {
    @include font-weight(medium);
    font-size: 16px;
    font-weight: 500;
    padding-top: 4px;
    padding-bottom: 8px;
  }
  .address,
  .date,
  .time {
    font-size: 14px;
    line-height: 31px;
  }
  .button {
    margin-top: -7px;
  }
}

.ui.basic.button.more-btn {
  border-radius: .28571429rem!important;
}

@media only screen and (max-width: 991px) {}
</style>
