<template>
  <div id="mypage">
    <div class="ui active inverted dimmer" v-if="isLoading">
      <div class="ui medium text loader">위킨 페이지를 불러오고 있습니다.</div>
    </div>
    <div class="navbar-custom"></div>
    <div class="ui container">
      <personal-header :user="userProfile" ref="personal_header">
        <i class="icon add user" slot="button" v-bind:class="{add: !isFollowed, remove: isFollowed}" @click="toggleFollow()" v-if="!isMyPage"></i>
      </personal-header>
      <div class="ui basic top attached buttons">
        <router-link to="feed" tag="div" class="ui button" active-class="active">소통
        </router-link>
        <router-link to="interest" tag="div" class="ui button" active-class="active">관심
        </router-link>
        <router-link to="wekin" tag="div" class="ui button" active-class="active" v-if="isMyPage">위킨
        </router-link>
        <router-link to="board" tag="div" class="ui button" active-class="active">게시물
        </router-link>
      </div>
      <div class="ui attached segment">
        <router-view class="router-view"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import personalHeaderLayout from 'components/PersonalHeaderLayout.vue'
import api from 'api'

export default {
  name: 'personalPage',
  data() {
    return {
      isLoading: false,
      isFollowed: false,
      isMyPage: false,
      userProfile: {}
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    toggleFollow() {
      if(this.user) {
        api.toggleFollow(this.user.user_key, this.$route.params.key)
          .then(result => {
            if (result === 1) {
              this.isFollowed = false
              this.$refs.personal_header.decreaseFollowerCount()
            } else {
              this.isFollowed = true
              this.$refs.personal_header.increaseFollowerCount()
            }
          })
      } else {
        alert("로그인이 필요한 서비스 입니다.")
        this.$parent.$refs.navbar.showModalLogin()
      }
    },
    getUserProfile() {
      this.isLoading = true
      api.getUserProfile(this.$route.params.key)
        .then(user => {
          this.isLoading = false
          this.userProfile = user
        })
        .catch(error => console.error(error))
    },
    getFollowStatus() {
      api.getFollower(this.$route.params.key)
        .then(users => {
          users.forEach(user => {
            if (user.User.user_key == this.user.user_key) {
              this.isFollowed = true
            }
          })
        })
    },
    checkUserOwnPage() {
      if (this.user.user_key == this.$route.params.key) {
        return true
      }
    },
    hideModal() {
      $('.modal').modal('hide')
    }
  },
  created() {
    this.getUserProfile()
  },
  mounted() {
    this.$store.watch(() => {
      if (this.$store.state.user !== undefined) {
        if (this.checkUserOwnPage()) { // 내 페이지
          this.isMyPage = true
        } else { // 다른 사용자 페이지
          this.getFollowStatus()
        }
      }
    })
    this.hideModal()
  },
  watch: {
    '$route': ['getUserProfile']
  },
  components: {
    'personal-header': personalHeaderLayout
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

.top.buttons .button {
  height: 52px;
  font-size: 16px;
  padding: 18px;
}

.ui.basic.active.button,
.ui.basic.buttons .active.button {
  background: #00A29A!important;
  color: rgb(255, 255, 255)!important;
}

.ui.basic.buttons {
  border: 1px solid $color-line;
}

.icon.remove {
  color: $color-primary;
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
@media only screen  and (max-width: 767px) {
  .router-view {
    padding: 12px 4px;
  }
}
</style>
