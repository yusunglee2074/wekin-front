<template>
  <div id="mypage">
    <div class="navbar-custom"></div>
    <div class="ui container">
      <host-header-layout v-if="host" :host="host" ref="host_header">
        <i class="icon add user" slot="button" v-bind:class="{add: !isFollowed, remove: isFollowed}" @click="toggleFollow()"></i>
      </host-header-layout>
      <div class="ui basic top attached buttons">
        <router-link to="feed" tag="div" class="ui button" active-class="active">피드
        </router-link>
        <router-link to="wekins" tag="div" class="ui button" active-class="active">위킨
        </router-link>
        <router-link to="review" tag="div" class="ui button" active-class="active">후기
        </router-link>
      </div>
      <div class="ui attached segment">
        <router-view class="router-view"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import hostHeaderLayout from 'components/HostHeaderLayout.vue'
import api from 'api'

export default {
  name: 'hostPage',
  data() {
    return {
      host: null,
      isFollowed: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    getMaker() {
      if (this.$route.params.key) {
        api.getMaker(this.$route.params.key)
          .then(host => this.host = host)
          .then(this.getFollower)
          .catch(err => console.error(err))
      }
    },
    toggleFollow() {
      api.toggleFollow(this.user.user_key, this.host.User.user_key)
        .then(result => {
          if (result === 1) {
            this.isFollowed = false
            this.$refs.host_header.decreaseFollowerCount()
          } else {
            this.isFollowed = true
            this.$refs.host_header.increaseFollowerCount()
          }
        })
    },
    getFollower() {
      api.getFollower(this.host.User.user_key)
        .then(users => {
          users.forEach(user => {
            if (user.User.user_key == this.user.user_key) {
              this.isFollowed = true
            }
          })
        })
    }
  },
  mounted() {
    setTimeout(() => {
      this.getMaker()
    }, 500)
  },
  components: {
    hostHeaderLayout
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';

.ui.container {
  max-width: 900px!important;
}

.ui.attached.segment {
  padding: 0;
}

.icon.remove {
  color: $color-primary;
}
.ui.basic.active.button,
.ui.basic.buttons .active.button {
  background: #00A29A!important;
  color: rgb(255, 255, 255)!important;
}

.top.buttons .button {
  height: 52px;
  font-size: 16px;
  padding: 18px;
}

.router-view {
  padding: 30px;
  min-height: 500px;
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .router-view {
    padding: 24px;
  }
}

@media only screen and (max-width: 767px) {
  .router-view {
    padding: 12px 4px;
  }
}
</style>
