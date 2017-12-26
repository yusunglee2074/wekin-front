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
          <router-link :to="{ name: 'HostWekinsAddNew' }" tag="button" class="ui primary button" v-if="!isMobile">위킨 만들기</router-link>
          <p v-else style="color:red;">모바일에서 위킨 작성, 수정은 현재 개발 중에 있습니다.<br> PC 환경에서 작성 부탁드립니다.</p>
        </div>

        <div class="wekin-list-container">
          <div class="wekin-list-layout" v-for="activity in hostActivities" v-bind:key="activity.activity_key">
            <div class="left">
              <div class="ui red label" v-if="activity.status == 3">{{activity.status | activityStatusLabel}}</div>
              <div class="ui primary label" v-if="activity.status == 2 || activity.status == 1">{{activity.status | activityStatusLabel}}</div>
              <div class="ui label" v-if="activity.status == 5">{{activity.status | activityStatusLabel}}</div>
              <div class="ui grey label" v-if="activity.status == 9 || activity.status == 4">{{activity.status | activityStatusLabel}}</div>
              <div class="title">{{activity.title}}</div>
              <div class="address">{{activity.address_detail.text}}</div>
              <div class="date">{{activity.created_at | formatDate}}</div>
            </div>
            <div class="right">
              <router-link :to="{ name: 'HostWekinsModifyNew', params: { key: activity.activity_key } }" v-if="activity.status < 6" tag="button" style="width:100px" class="ui basic button">수정하기</router-link>
              <button class="ui basic button red" v-if="activity.status === (9 || 5 || 1)" @click="activityDelete(activity, false)">삭제</button>
              <button class="ui basic button red" v-if="activity.status === 3" @click="activityDelete(activity, true)">삭제요청</button>
            </div>
          </div>
          <div class="wekin-list-layout" v-if="hostActivities && hostActivities.length == 0">
            <p style="text-align:center;width:100%">새로운 위킨을 만들어 보세요!</p>
          </div>
        </div>
      </div>
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
      status: "0",
      isMobile: false
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
          return "삭제요청"
        case 5:
          return "위킨종료"
        case 9:
          return "수정신청 진행 중 (승인 후 수정 신청한 기존 위킨은 사라집니다)"
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
        case 9:
          return "수정 신청"
      }
    }
  },
  components: {
    hostCardLayout
  },
  methods: {
    activityDelete(activity, isReq) {
      if (confirm("진행 중인 위킨의 삭제는 영업일 기준 2~3일이 소요 될 수 있습니다.\n현제 예약인원이 있는 경우에는 시간이 더 소요될 수 있습니다.\n그 외에는 즉시 삭제됩니다.")) {
        if (!isReq) {
          api.deleteActivity(activity.activity_key)
            .then(result => {
              alert("삭제 되었습니다.")
              window.href = '/host/admin'
            })
            .catch(error => alert("에러가 발생했습니다. 불편 드려죄송합니다. 카카오톡 @위킨으로 연락 바랍니다."))
        } else {
          let tmpList = []
          for (let i = 0, length = activity.close_dates.length; i < length; i++) {
            let item = activity.close_dates[i]
            tmpList.push(moment(20+item))
          }
          activity.close_dates = tmpList
          activity.status = 4
          api.updateActivity(activity.activity_key, activity)
            .then(result => {
              alert("요청이 정상적으로 접수되었습니다.")
              window.href = '/host/admin'
            })
            .catch(error => alert("에러가 발생했습니다. 불편 드려죄송합니다. 카카오톡 @위킨으로 연락 바랍니다."))
        }
      } else {
        return
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
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) this.isMobile = true;
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
