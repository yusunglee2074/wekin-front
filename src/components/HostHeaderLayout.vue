<template>
  <div class="ui segment info-container" v-if="host">
    <div class="content flex">
      <div class="ui image circular background profile pc" v-bind:style="{'background-image': `url(${host.profile_image})`}"></div>
      <div class="ui image circular background profile mobile" v-bind:style="{'background-image': `url(${host.profile_image})`}"></div>
      <div class="right-content flex-f1">
        <strong>{{host.name}}</strong>
        <div class="follow-container">
          <span class="link" @click="onFollowingClick()">팔로우 {{followingCount}}명</span>
          <span class="link" @click="onFollowerClick()">팔로워 {{followerCount}}명</span>
        </div>
        <div class="introduce pc">{{host.introduce}}</div>
      </div>
    </div>
    <div class="introduce mobile">{{host.introduce}}</div>
    <slot name="button">
      <router-link to="/settings" tag="i" class="icon setting"></router-link>
    </slot>
    <follower-modal v-if="host.User" :userKey="host.User.user_key" ref="follower"></follower-modal>
    <following-modal v-if="host.User" :userKey="host.User.user_key" ref="following"></following-modal>
  </div>
</template>
<script>
import followerModal from 'components/FollowerModal.vue'
import followingModal from 'components/FollowingModal.vue'
import api from 'api'

export default {
  props: [
    'host'
  ],
  data() {
    return {
      followingCount: 0,
      followerCount: 0
    }
  },
  methods: {
    decreaseFollowerCount() {
      this.followerCount--
    },
    increaseFollowerCount() {
      this.followerCount++
    },
    onFollowerClick() {
      if (this.followerCount > 0) {
        this.$refs.follower.showModal()
      }
    },
    onFollowingClick() {
      if (this.followingCount > 0) {
        this.$refs.following.showModal()
      }
    },
    getFollowerCount() {
      if (this.host.User) {
        api.getFollower(this.host.User.user_key)
          .then(users => this.followerCount = users.length)
          .catch(err => console.error(err))
      }
    },
    getFollowingCount() {
      if (this.host.User) {
        api.getFollowing(this.host.User.user_key)
          .then(users => this.followingCount = users.length)
          .catch(err => console.error(err))
      }
    }
  },
  created() {
    this.getFollowerCount()
    this.getFollowingCount()
  },
  components: {
    followerModal,
    followingModal,
  }
}
</script>
<style lang="scss" scoped>
.info-container {
  padding: 44px 40px!important;
  .profile {
    width: 140px;
    height: 140px;
    min-width: 140px;
  }
  .content {
    margin: 0 40px;
    flex: 1;
  }
  .icon {
    position: absolute;
    right: 0;
    top: 0;
    margin: 20px;
    font-size: 20px;
    cursor: pointer;
  }
  strong {
    font-size: 22px;
  }
  p {
    font-size: 17px;
    margin-top: 30px;
  }

  span {
    font-size: 16px;
    &:last-child {
      margin-left: 76px;
    }
  }
  .right-content {
    margin-left: 44px;
    margin-top: 20px;
  }
  .follow-container,
  .introduce {
    margin-top: 18px;
    font-size: 15px;
  }
}

.mobile {
  display: none!important;
}

@media only screen and (max-width: 991px) {
  .info-container {
    padding: 12px !important;
    .content {
      margin: 0;
    }
    .mobile.profile {
      display: inline-block!important;
      width: 77px;
      height: 77px;
      min-width: 77px;
    }
    .right-content {
      margin-left: 34px;
      margin-top: 10px;
    }
    p {
      margin-top: 10px;
    }
  }

  .pc {
    display: none!important;
  }
  .mobile {
    display: block!important;
  }
}
</style>
