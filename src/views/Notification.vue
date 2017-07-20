
<template>
  <div>
    <div class="navbar-custom"></div>
    <button class="title ui primary">
      <i class="alarm icon"></i>
      알림
      <i class="close icon floated right link" @click="onCloseClick()"></i>
    </button>
    <div class="menu">
      <a class="item list linked flex" :href="notification | link" v-for="notification in notifications" v-bind:key="notification.noti_key">
        <img class="ui image mini circular" :src="notification | profile">
        <div class="text">
          <div class="message">{{notification | mergeMessage}}</div>
          <div class="date">{{notification.created_at | formatDate}}</div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
import api from 'api'
import notificationLayout from 'components/NotificationLayout.vue'

export default {
  components: {
    notificationLayout
  },
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
      } else if (notification.type == "host" && notification.User.Host) {
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
    onCloseClick() {
      this.$router.go(-1)
    },
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

.menu .list {
  padding: 8px;
  img {
    display: inline-block;
    height: 35px;
  }
  .text {
    padding-left: 12px;
  }
}

button.title {
  width: 100%;
  height: 64px;
  outline: 1px solid rgb(151, 151, 151)!important;
  background-color: $color-primary;
  color: white;
  font-size: 17px;
  text-align: left;
  border: none;
  outline: none;
  cursor: default;
  padding-left: 16px;
  span {
    color: white;
  }
}
</style>
