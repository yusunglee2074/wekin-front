<template>
  <div>
    <host-card-layout title="예약 관리">
      <div slot="content" class="content">
        <div class="ui selection dropdown bookingStatus" v-if="wekins && wekins.length != 0">
          <input name="gender" type="hidden" value="0">
          <i class="dropdown icon"></i>
          <div class="text">전체</div>
          <div class="menu">
            <div class="item" data-value="0">전체</div>
            <div class="item" data-value="1">진행중</div>
            <div class="item" data-value="2">종료</div>
          </div>
        </div>
        <div class="wekin-list-layout" v-bind:class="{ end: new Date(wekin.start_date) <= new Date() }" v-for="wekin in filteredWekins" v-bind:key="wekin.wekin_key">
          <div class="left">
            <span class="title">{{wekin.Activity.title}}</span>
            <span class="date">{{wekin.start_date | formatDate}}</span>
            <!--<span class="time">16:00~18:00</span>-->
          </div>
          <a :href="'/host/admin/bookings/' + wekin.wekin_key" tag="button" class="ui primary button right">예약자 확인</a>
        </div>
        <div class="wekin-list-layout" style="text-align:center;" v-if="wekins && wekins.length == 0">
          <p style="width:100%">진행중인 위킨이 없습니다.</p>
        </div>
      </div>
      <div slot="extra" class="ui basic button more-btn" v-if="!isLastPage" @click="getMoreBookings()">더보기</div>
    </host-card-layout>
  </div>
</template>
<script>
import hostCardLayout from 'components/HostCardLayout.vue'
import api from 'api'

export default {
  data() {
    return {
      wekins: [],
      pagingWekins: [],
      currentLength: 0,
      pageLimit: 10,
      isLastPage: false,
      status: "0",
      now: new Date()
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  asyncComputed: {
    filteredWekins() {
      let pagingWekins = this.pagingWekins.filter((wekin) => {
        switch (this.status) {
          case "0":
            return wekin
          case "1":
            return (new Date(wekin.start_date) > this.now)? wekin: false
          case "2":
            return (new Date(wekin.start_date) < this.now)? wekin: false
        }
      })
      if(pagingWekins.length < this.pageLimit) {
        setTimeout(() => {
          this.getMoreBookings()
        }, 500)
      }
      return pagingWekins
    }
  },
  components: {
    hostCardLayout
  },
  methods: {
    getMoreBookings() {
      let nextLength = this.currentLength + this.pageLimit
      for (this.currentLength; this.currentLength < nextLength; this.currentLength++) {
        if (this.currentLength < this.wekins.length) {
          this.pagingWekins.push(this.wekins[this.currentLength])
        } else {
          this.isLastPage = true
        }
      }
    },
    getAdminBookings() {
      api.getAdminBookings(this.user.Host.host_key)
        .then(json => {
          this.wekins = json.results.filter(wekin => {
            if (wekin.Activity.status == 3) {
              return wekin
            }
          })
          this.getMoreBookings()
          this.initDropdown()
        })
        .catch(error => console.error(error))
    },
    initDropdown() {
      this.$nextTick(() => {
        setTimeout(() => {
          $('.ui.dropdown.bookingStatus').dropdown({
            onChange: (value) => {
              this.status = value
            }
          })
        }, 500)
      })
    }
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
    font-size: 14px;
    font-weight: 500;
    padding-top: 4px;
    padding-bottom: 12px;
  }
  .address,
  .date,
  .time {
    font-size: 13px;
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
