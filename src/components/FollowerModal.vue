<template>
  <div class="ui modal follower">
    <i class="close icon"></i>
    <div class="header">
      팔로워
    </div>
    <div class="ui segments rect">
      <div class="ui segment" v-for="follow in follows" v-bind:key="follow.follow_key">
        <div class="right floated content" v-if="user && follow.User.user_key != user.user_key">
          <div class="ui primary button primary-btn" v-if="!follow.isFollowed" @click="followUser(follow)">팔로우</div>
          <div class="ui basic button primary-btn" v-if="follow.isFollowed" @click="followUser(follow)">팔로잉</div>
          <!--<div class="ui primary button primary-btn" v-if="follow.User.user_key == user.user_key" @click="followUser(follow.User.user_key)">팔로우</div>
                <div class="ui button primary-btn" v-if="follow.User.user_key != user.user_key" @click="followUser(follow.User.user_key)">팔로잉</div>-->
        </div>
        <img class="ui mini circular middle aligned image" v-if="follow.User" :src="follow.User.profile_image">
        <span class="name" @click="pushUserPage(follow.User.user_key)" v-if="follow.User">{{follow.User.name}}</span>
        <span v-if="follow.User.host_key">
          <img class="badge" src="/static/images/ic-maker.png"> 메이커</span>
      </div>
    </div>
  </div>
</template>
<script>
import api from 'api'
import _ from 'lodash'

export default {
  data() {
    return {
      follows: [],
    }
  },
  props: {
    userKey: Number
  },
  computed: {
    followerCount() {
      return this.users.length
    },
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    showModal() {
      $('.ui.modal.follower').modal('show')
    },
    pushUserPage(userKey) {
      // $('.ui.modal').modal('hide')
      // this.$router.push(`/users/${userKey}/feed`)
      window.location.href = `/users/${userKey}/feed`
    },
    followUser(follow) {
      let targetUserKey = follow.User.user_key
      api.toggleFollow(this.user.user_key, targetUserKey)
        .then(result => {
          if (result == 1) {
            follow.isFollowed = false
          } else {
            follow.isFollowed = true
          }
        })
        .catch(err => console.error(err))
    },
    getFollower() { // 팔로워 구하기
      // return api.getFollower(this.$route.params.key)
      if (this.userKey !== undefined) {
        return api.getFollower(this.userKey)
          .then(follows => follows)
          .catch(err => console.error(err))
      }
    },
    getMyFollowing() {
      return api.getFollowing(this.user.user_key)
        .then(follows => follows)
        .catch(err => console.error(err))
    }
  },
  // watch: {
  //   '$route': 'getFollower'
  // },
  created() {
    // this.getFollower()
  },
  mounted() {
    setTimeout(() => {
      if (this.user !== undefined && this.userKey !== undefined) {
        this.getMyFollowing().then((myFollows) => {
          this.getFollower().then((follows) => {
            follows.map(follow => {
              follow.isFollowed = false // NOTE: 돔을 변경하기 위해선 필요함
              _.find(myFollows, (myFollow) => {
                if (follow.User.user_key == myFollow.Follower.user_key) {
                  follow.isFollowed = true
                }
              })
            })
            this.follows = follows
          })
        })
      } else if(this.userKey !== undefined){
        this.getFollower().then((follows) => {
          this.follows = follows
        })
      }
    }, 1000)
  }
}
</script>
<style lang="scss" scoped>
.ui.modal {
  max-width: 600px;
  margin-left: -300px!important;

  .segments {
    max-height: 600px;
    overflow: auto;
    margin: 0;
    .name {
      font-size: 16px;
      padding: 0 14px;
    }
    .image {
      width: 35px;
      height: 35px;
    }
  }
}

@media only screen and (max-width: 622px) {
  .ui.modal {
    margin-left: -47.5%!important;
  }
}
</style>
