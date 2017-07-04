<template>
  <div>
    <i class="alarm icon"></i>
    <div class="menu">
      <div class="title">최근 알림</div>
      <router-link class="item list linked" :to="notification | link" v-for="notification in notifications" v-bind:key="notification.noti_key">
        <img class="ui image mini circular" :src="notification | profile">
        <div>
          <div class="message">{{notification | mergeMessage}}</div>
          <div class="date">{{notification.created_at | formatDate}}</div>
        </div>
      </router-link>
      <div class="item list" v-if="notifications.length == 0">
        <p>알림이 없습니다.</p>
      </div>
    </div>
  </div>
</template>
<script>
import api from 'api'

export default {
  data() {
    return {
      notifications: []
    }
  },
  filters: {
    mergeMessage(notification) {
      let from = notification.user_name
      let to = notification.target_user_name
      let subject = notification.active_name
      let action = notification.active_target

      return `${from}님이 ${to}님의 ${subject}에 ${action}을 남겼습니다.`
    },
    profile(notification) {
      let defaultImage = '/static/images/default-image.png'
      if (notification.type == "user" && notification.User) {
        return notification.User.profile_image || defaultImage
      } else if (notification.type == "host" && notification.User) {
        return notification.User.Host.profile_image || defaultImage
      }
    },
    link(notification) {
      if (notification.extra) {
        if (notification.extra.doc_key) {
          return `/feed/${notification.extra.doc_key}` // NOTE: QnA 일경우..? FIXME: notification 구조 개선이 필요함
        }
      }
      return `/`
    }
  },
  methods: {
    getNotification() {
      api.getNotification()
        .then((notifications) => this.notifications = notifications)
        .catch((error) => console.error(error))
    }
  },
  created() {
    this.getNotification()
  }
}
</script>
<style lang="scss" scoped>
@import '../style/variables';
@import '../style/typography';

.user-alarm {
  background: none!important; // .header {
  //   height: 40px;
  //   padding: 12px 20px;
  //   background-color: $color-primary;
  //   font-family: NotoSansCJKkr-Bold;
  //   color: white;
  // }
  .title {
    background: $color-primary!important;
    height: 42px;
    padding: 14px;
    color: rgb(255, 255, 255);
    border-bottom: 1px solid $color-line;
  }

  .list {
    display: flex!important;
    padding: 8px 28px!important;
    background-color: white!important;

    .message,
    .date {
      font-size: 12px!important;
    }
    .date {
      color: $color-line;
    }
  }
  img {
    min-width: 40px!important;
    min-height: 40px!important;
    max-height: 40px!important;
    max-width: 40px!important;
  }

  .menu.transition.visible,
  .menu.transition.animating {
    // width: 228px;
    // left: -79px!important;
  }
}
</style>
