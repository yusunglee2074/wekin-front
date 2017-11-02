<template>
  <div class="ui segment info-container" v-if="user">
    <div class="content flex">
      <div class="ui image circular background profile pc" v-bind:style="{'background-image': `url(${user.profile_image || user.picture})`}"></div>
      <div class="ui image circular background profile mobile" v-bind:style="{'background-image': `url(${user.profile_image || user.picture})`}"></div>
      <div class="right-content flex-f1">
        <strong>{{user.name}}</strong>
        <div class="follow-container">
          <span class="link" @click="onFollowingClick()">팔로우 {{followingCount}}명</span>
          <span class="link" @click="onFollowerClick()">팔로워 {{followerCount}}명</span>
        </div>
        <div class="follow-container">
          <span>위킨 포인트 {{ user.point.point }} P</span>
          <span>기업 포인트 {{ user.point.point_special }} P <span style="font-size: 12px;">포인트 사용내역</span></span>
          <point-change :user_key="user.user_key"></point-change>
        </div>
        <div class="introduce pc">{{user.introduce}}</div>
      </div>
    </div>
    <div class="introduce mobile">{{user.introduce}}</div>
    <slot name="button">
      <a href="/settings" tag="i" class="icon setting"></a>
    </slot>
    <follower-modal v-if="user" :userKey="user.user_key" ref="follower"></follower-modal>
    <following-modal v-if="user" :userKey="user.user_key" ref="following"></following-modal>
  </div>
</template>
<script>
import followerModal from 'components/FollowerModal.vue'
import followingModal from 'components/FollowingModal.vue'
import pointChange from 'components/PointChangeHistory.vue'
import api from 'api'

export default {
  props: ['user'],
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
      api.getFollower(this.$route.params.key)
        .then(users => this.followerCount = users.length)
        .catch(err => console.error(err))
    },
    getFollowingCount() {
      api.getFollowing(this.$route.params.key)
        .then(users => this.followingCount = users.length)
        .catch(err => console.error(err))
    }
  },
  created() {
    this.getFollowerCount()
    this.getFollowingCount()
  },
  beforeDestroy() {
  },
  watch: {
    '$route': ['getFollowerCount', 'getFollowingCount']
  },
  components: {
    pointChange,
    followerModal,
    followingModal,
  },
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
      margin-left: 46px;
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
