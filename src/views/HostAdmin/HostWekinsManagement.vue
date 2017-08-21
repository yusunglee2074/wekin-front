<template>
  <div>
    <host-card-layout title="위킨 목록">
      <div slot="content" class="content">
        <div class="top-container flex">
          <div class="ui selection dropdown wekinStatus" v-if="hostActivities && hostActivities.length != 0">
            <input name="wekinStatus" type="hidden" value="0">
            <i class="dropdown icon"></i>
            <div class="text">전체</div>
            <div class="menu">
              <div class="item" data-value="0">전체</div>
              <div class="item" data-value="1">승인대기</div>
              <div class="item" data-value="2">반려</div>
              <div class="item" data-value="3">진행중</div>
              <div class="item" data-value="5">위킨종료</div>
            </div>
          </div>
          <div class="flex-space"></div>
          <router-link :to="{ name: 'HostWekinsAdd' }" tag="button" class="ui primary button">새로운 위킨 만들기</router-link>
        </div>

        <div class="wekin-list-container">
          <div class="wekin-list-layout" v-for="activity in filteredActivities" v-bind:key="activity.activity_key">
            <div class="left">
              <div class="ui red label" v-if="activity.status == 3">{{activity.status | activityStatusLabel}}</div>
              <div class="ui primary label" v-if="activity.status == 2 || activity.status == 1">{{activity.status | activityStatusLabel}}</div>
              <div class="ui label" v-if="activity.status == 5">{{activity.status | activityStatusLabel}}</div>
              <div class="title">{{activity.title}}</div>
              <div class="address">{{activity.address_detail.text}}</div>
              <div class="date">{{activity.created_at | formatDate}}</div>
            </div>
            <div class="right">
              <router-link :to="{ name: 'HostWekinsDetail', params: { key: activity.activity_key } }" tag="button" style="width:100px" class="ui basic button" v-if="activity.status === 1 || activity.status === 2">수정하기</router-link>
              <router-link :to="{ name: 'HostWekinsDetail', params: { key: activity.activity_key } }" tag="button" style="width:100px" class="ui basic button" v-else>내용보기</router-link>
              <div class="status">{{activity.status | activityStatusMsg}}</div>
            </div>
          </div>
          <div class="wekin-list-layout" v-if="hostActivities && hostActivities.length == 0">
            <p style="text-align:center;width:100%">새로운 위킨을 만들어 보세요!</p>
          </div>
        </div>
      </div>
      <div slot="extra" class="ui basic button more-btn" v-if="!isLastPage" @click="getMoreActivities()">더보기</div>
    </host-card-layout>
  </div>
</template>
<script>
import hostCardLayout from 'components/HostCardLayout.vue'
import api from 'api'
import moment from 'moment'

export default {
  data() {
    return {
      pagingActivities: [],
      currentLength: 0,
      pageLimit: 7,
      isLastPage: false,
      isWatched: false,
      status: "0"
    }
  },
  computed: {
    hostActivities() {
      let sortedActivities = this.$store.getters.hostActivities
      sortedActivities.sort(function compare(a, b) {
        if (moment(a.created_at) > moment(b.created_at)) {
          return 1;
        }
        if (moment(a.created_at) < moment(b.created_at)) {
          return -1;
        }
        return 0;
      })
      return sortedActivities
    }
  },
  asyncComputed: {
    filteredActivities() {
      let pagingActivities = this.pagingActivities.filter((activity) => {
        if(this.status == "0") {
          return activity
        } else if(activity.status == Number(this.status)){
          return activity
        }
      })
      if(pagingActivities.length < this.pageLimit) {
        setTimeout(() => {
          this.getMoreActivities()
        }, 500)
      }
      return pagingActivities
    }
  },
  filters: {
    activityStatusLabel(status) {
      switch (status) {
        case 1:
          return "승인대기"
        case 2:
          return "반려"
        case 3:
          return "진행중"
        case 4:
          return "삭제"
        case 5:
          return "위킨종료"
      }
    },
    activityStatusMsg(status) {
      switch (status) {
        case 1:
          return "승인요청"
        case 2:
          return "반려"
        case 3:
          return "수정불가"
        case 4:
          return "삭제 요청"
        case 5:
          return "기간 종료"
      }
    }
  },
  components: {
    hostCardLayout
  },
  methods: {
    getMoreActivities() {
      let nextLength = this.currentLength + this.pageLimit
      for (this.currentLength; this.currentLength < nextLength; this.currentLength++) {
        if (this.currentLength < this.hostActivities.length) {
          this.pagingActivities.push(this.hostActivities[this.currentLength])
        } else {
          this.isLastPage = true
        }
      }
    },
    initDropdown() {
      $('.ui.dropdown.wekinStatus').dropdown({
        onChange: (value)=> {
          this.status = value
        }
      })
    }
  },
  mounted() {
    this.$store.watch(() => {
      if(this.hostActivities !== undefined && !this.isWatched) {
        this.isWatched = true
        this.getMoreActivities()

        setTimeout(() => {
          this.initDropdown()
        }, 500)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/typography.scss';
@import '../../style/cross-browsing.scss';

.dropdown.price {
  min-width: 110px!important;
  margin-left: 10px;
}

.top-container {
  margin-bottom: 20px;
}

.wekin-list-layout {
  @include flex-box();
  padding: 18px 30px 20px;
  border-top: 1px solid $color-line;
  align-items: center;
  &:last-child {
    border-bottom: 1px solid $color-line;
  }
  .left {
    flex: 1;
    padding-right: 8px;
  }
  .title {
    @include font-weight(medium);
    font-size: 17px;
    font-weight: 500;
    padding-top: 8px;
    padding-bottom: 12px;
  }
  .address,
  .date {
    font-size: 13px;
  }
  .status {
    text-align: center;
    font-size: 12px;
    margin-top: 4px;
  }
  .button {
    width: 92px;
  }
}

.ui.basic.button.more-btn {
  border-radius: .28571429rem!important;
}

@media only screen and (max-width: 991px) {
  .dropdown.price {
    margin-left: 0px;
  }
  .wekin-list-layout {
    padding: 18px 2px 20px;
    .title {
      font-size: 14px;
    }
    .address,
    .date {
      font-size: 12px;
    }
    .button {
      width: 70px;
      padding: 10px 0px;
    }
  }
}
</style>
