<template>
  <div class="navbar" v-bind:class="{ fullHeight: isMobileMenuShowing || isMobileSearchShowing }">
    <div class="ui active inverted dimmer" v-if="isLoading">
      <div class="ui medium text loader">잠시만 기다려주세요.</div>
    </div>
    <div class="back-layer" v-bind:class="{ fullHeight: isMobileMenuShowing || isMobileSearchShowing }" @click="toggleMobileMenu()"></div>
    <!-- 모바일 버전 ! -->
    <div class="ui vertical accordion menu mobile" v-if="isMobileMenuShowing">
      <div class="header-container">
        <img src="/static/images/logo-mobile.png">
        <i class="remove icon floated right link" @click="toggleMobileMenu()"></i>
      </div>
      <div class="button-container" v-if="!user">
        <a class="ui button primary" @click="showLoginModal = true">로그인</a>
        <a class="ui button basic item linked" id="signupbutton" @click="showSignupModalMethod2">회원가입</a>
      </div>
      <div class="login-info-container" v-if="user">
        <router-link :to="{ name: 'UserFeed', params: { key: user.user_key }}" tag="div" class="ui circular background profile image link" @click.native="toggleMobileMenu()" v-if="!isHostMode" v-bind:style="{'background-image': `url(${user.picture || user.profile_image})`}"></router-link>
        <router-link :to="{ name: 'HostAdmin' }" tag="div" class="ui circular background profile image link" @click.native="toggleMobileMenu()" v-if="isHostMode" v-bind:style="{'background-image': `url(${user.Host.profile_image})`}"></router-link>
        <div class="text" v-if="!isHostMode">{{ user.name }}</div>
        <div class="text" v-else>{{ user.Host.name }}</div>
      </div>
      <div class="item" v-if="user">
        <a class="active title" v-if="!isHostMode">
          <i class="dropdown icon"></i>
          위키너
        </a>
        <a class="active title" v-else>
          <i class="dropdown icon"></i>
          메이커
        </a>
        <div class="active content" @click="toggleMobileMenu()" v-if="!isHostMode">
          <router-link :to="{ name: 'UserFeed', params: { key: user.user_key }}" class="item" exact>MY PAGE</router-link>
          <router-link :to="{ name: 'UserInterest', params: { key: user.user_key }}" class="item" exact>관심위킨</router-link>
          <router-link :to="{ name: 'UserBoard', params: { key: user.user_key }}" class="item" exact>게시글</router-link>
          <router-link :to="{ name: 'Settings' }" class="item" exact>프로필 설정</router-link>
          <router-link :to="{ path: '/customer' }" class="item link" v-if="user.Host && user.Host.status === 1">메이커 신청 처리 중</router-link>
          <router-link :to="{ name: 'RequestForm' }" class="item link" v-if="!user.Host" exact>메이커 신청하기</router-link>
          <router-link :to="{ name: 'HostAdmin' }" class="item link" v-if="user.Host && user.Host.host_key && user.Host.status === 3" exact v-on:click.native="toggleMobileMenu()">메이커 전환</router-link>
          <!--<div class="item">프로필 수정</div>-->
        </div>
        <div class="active content" v-else>
          <router-link :to="{ name: 'HostAdmin' }" class="item" exact v-on:click.native="toggleMobileMenu()">MAKER PAGE</router-link>
          <div class="divider"></div>
          <router-link :to="{ name: 'HostWekins' }" class="item" exact v-on:click.native="toggleMobileMenu()">위킨관리(생성)</router-link>
          <router-link :to="{ name: 'HostBooking' }" class="item" exact v-on:click.native="toggleMobileMenu()">예약관리</router-link>
          <router-link :to="{ name: 'HostBoards' }" class="item" exact v-on:click.native="toggleMobileMenu()">후기 / Q&amp;A관리</router-link>
          <router-link :to="{ name: 'HostSettings' }" class="item" exact v-on:click.native="toggleMobileMenu()">설정</router-link>
          <router-link :to="{ name: 'Home' }" class="item link" exact v-on:click.native="toggleMobileMenu()">위키너 모드 전환</router-link>
        </div>
      </div>
      <router-link :to="{ name: 'Home' }" class="item link" tag="div" exact v-on:click.native="toggleMobileMenu()">위킨 홈</router-link>
      <router-link :to="{ name: 'Activity' }" class="item link" tag="div" exact v-on:click.native="toggleMobileMenu()">위킨</router-link>
      <router-link :to="{ name: 'Feed' }" class="item link" tag="div" exact v-on:click.native="toggleMobileMenu()">소통</router-link>
      <router-link :to="{ name: 'Manual', params: { key: 2 } }" class="item linked" tag="div" v-on:click.native="toggleMobileMenu()" exact>단체활동</router-link>
      <router-link :to="{ name: 'Customer' }" class="item link" tag="div" exact v-on:click.native="toggleMobileMenu()">고객센터</router-link>
      <router-link :to="{ name: 'Notification' }" class="item link" tag="div" exact v-on:click.native="toggleMobileMenu()" v-if="user">알림</router-link>
      <div class="item link" v-if="user" @click="onLogoutClick()">로그아웃</div>
    </div>
    <div class="ui menu mobile-nav">
      <button class="side-menu" @click="toggleMobileMenu()">
        <i class="content icon"></i>
      </button>
      <router-link :to="{ name: 'Home' }" class="toobig">
        <img class="item logo" src="/static/images/logo-134x35.png"></img>
      </router-link>
      <button class="search-btn">
        <i class="search icon" @click="showMobileSearch()"></i>
      </button>
      <button class="filter-btn" v-if="isActivityPage">
        <i class="options icon" @click="showMobileFilter()"></i>
      </button>
    </div>
    <div class="ui menu mobile-sub-nav" v-if="!isHostMode">
      <router-link :to="{ name: 'Activity' }" class="link" exact>위킨</router-link>
      <router-link :to="{ name: 'Feed' }" class="link" exact>소통</router-link>
      <router-link :to="{ name: 'Manual', params: { key: 2 } }" class="link" exact>단체활동</router-link>
      <router-link :to="{ name: 'Customer' }" class="link" exact>고객센터</router-link>
      <router-link :to="{ name: 'ExplainMaker' }" class="link" v-if="user ? !user.Host : true" exact>메이커신청</router-link>
    </div>
  
    <!-- 모바일 끝 -->
  
    <div class="pc-nav ui stackable menu menu-container">
      <router-link :to="{ name: 'Home' }">
        <img class="item logo" src="/static/images/logo-115x30.png"></img>
      </router-link>
      <div class="item search-container">
        <div class="ui">
          <div class="ui icon input">
            <input class="prompt" type="text" placeholder="검색" @keyup.enter="onSearch" v-model="searchKeyword">
            <i class="search icon link" @click="onSearch"></i>
          </div>
          <div class="results"></div>
        </div>
      </div>
      <div class="menu" @click="show = false">
        <router-link :to="{ name: 'Activity' }" class="item linked" tag="div" exact>위킨</router-link>
        <router-link :to="{ name: 'Feed' }" class="item linked" tag="div" exact>소통</router-link>
        <router-link :to="{ name: 'Manual', params: { key: 2 } }" class="item linked" tag="div" exact>단체활동</router-link>
        <router-link :to="{ name: 'Customer' }" class="item linked" tag="div" exact>고객센터</router-link>
        <router-link :to="{ name: 'ExplainMaker' }" class="item linked" tag="div" v-if="user ? !user.Host : true" exact>메이커신청</router-link>
      </div>
      <div class="right menu" v-if="!user">
        <a class="item linked" @click="showLoginModal = true">로그인</a>
        <a class="item linked" id="1" @click="showSignupModalMethod2">회원가입</a>

        <!--<div class="loading"></div>-->
      </div>
      <!--
      <div class="right menu" v-else="user">
        <div class="ui item dropdown button user-menu">
          <div class="ui circular background profile image" v-if="!isHostMode" v-bind:style="{'background-image': `url(${user.picture || user.profile_image})`}"></div>
          <div class="ui circular background profile image" v-if="isHostMode" v-bind:style="{'background-image': `url(${user.Host.profile_image})`}"></div>
          <div class="text" v-if="!isHostMode">{{ user.name }}</div>
          <div class="text" v-if="isHostMode">{{ user.Host.name }}</div>
          <div class="menu" v-if="!isHostMode">
            <div class="title">위키너</div>
            <router-link :to="{ name: 'UserFeed', params: { key: user.user_key }}" class="item link" exact>MY PAGE</router-link>
            <div class="divider"></div>
            <router-link :to="{ name: 'UserInterest', params: { key: user.user_key }}" class="item link" exact>관심위킨</router-link>
            <router-link :to="{ name: 'UserBoard', params: { key: user.user_key }}" class="item link" exact>게시글</router-link>
            <router-link :to="{ name: 'Settings' }" class="item link" exact>프로필 설정</router-link>
            <router-link :to="{ name: 'RequestForm' }" class="item link" v-if="!user.Host" exact>메이커 신청하기</router-link>
            <router-link :to="{ path: '/customer' }" class="item link" v-if="user.Host && user.Host.status === 1" exact>메이커 신청 처리 중</router-link>
            <a :href="`/host/admin`" class="item link" v-if="user.Host && user.Host.host_key && user.Host.status === 3" exact>메이커 전환</a>
            <div class="divider"></div>
            <div class="item link" @click="onLogoutClick()">로그아웃</div>
          </div>
          <div class="menu" v-else>
            <div class="title">메이커</div>
            <router-link :to="{ name: 'HostAdmin' }" class="item link" exact>MAKER PAGE</router-link>
            <div class="divider"></div>
            <router-link :to="{ name: 'HostWekinsAdd' }" class="item link" exact>위킨 만들기</router-link>
            <router-link :to="{ name: 'HostWekins' }" class="item link" exact>위킨관리</router-link>
            <router-link :to="{ name: 'HostBooking' }" class="item link" exact>예약관리</router-link>
            <router-link :to="{ name: 'HostBoards' }" class="item link" exact>후기 / Q&amp;A관리</router-link>
            <router-link :to="{ name: 'HostSettings' }" class="item link" exact>설정</router-link>
            <router-link :to="{ name: 'Home' }" class="item link" exact>위키너 모드 전환</router-link>
            <div class="divider"></div>
            <div class="item link" @click="onLogoutClick()">로그아웃</div>
          </div>
        </div>
        <notification-layout class="ui item dropdown user-alarm"></notification-layout>
      </div>
      -->
      <div class="" v-else="user" style="cursor:pointer">
        <div class="" style="position: absolute; top: 15px; right: 70px;" @click="show = !show">
          <div class="ui circular background profile image" v-if="!isHostMode" v-bind:style="{'background-image': `url(${user.picture || user.profile_image})`}"></div>
          <div class="ui circular background profile image" v-if="isHostMode" v-bind:style="{'background-image': `url(${user.Host.profile_image})`}"></div>
          <div class="" v-if="!isHostMode" style="display: inline-block;">{{ user.name }}</div>
          <div class="" v-if="isHostMode" style="display: inline-block;">{{ user.Host.name }}</div>
        </div>
          <transition name="slide-fade">
            <div v-if="show" style="position: absolute; top: 60px; right: 30px; width: 190px; max-height:300px; font-size: 17px;line-height: 32px; background-color:rgb(255,255,255);box-shadow: 3px 3px 10px #888888; padding:1px;">
              <div class="menu" v-if="!isHostMode" style="cursor:pointer" @click="show = false">
                <div class="title" style="text-align:center; margin-bottom:15px; font-size:20px; padding:6px; background-color:rgb(16,160,150); color:white;">위키너</div>
                <router-link :to="{ name: 'UserFeed', params: { key: user.user_key }}" class="item link" style="font-size:16px; height: 30px; margin:0;" exact>MY PAGE</router-link>
                <router-link :to="{ name: 'UserInterest', params: { key: user.user_key }}" class="item link" style="font-size:16px;height: 30px; margin:0;" exact>관심위킨</router-link>
                <router-link :to="{ name: 'UserBoard', params: { key: user.user_key }}" class="item link" style="font-size:16px;height: 30px; margin:0;" exact>게시글</router-link>
                <router-link :to="{ name: 'Settings' }" class="item link" style="font-size:16px;height: 30px; margin:0;" exact>프로필 설정</router-link>
                <router-link :to="{ name: 'RequestForm' }" class="item link" v-if="!user.Host" style="font-size:16px;height: 30px; margin:0;" exact>메이커 신청하기</router-link>
                <router-link :to="{ path: '/customer' }" class="item link" v-if="user.Host && user.Host.status === 1" style="font-size:16px;height: 30px; margin:0;" exact>메이커 신청 처리 중</router-link>
                <a :href="`/host/admin`" class="item link" v-if="user.Host && user.Host.host_key && user.Host.status === 3" style="font-size:16px;height: 30px; margin:0;" exact>메이커 전환</a>
                <div class="item link" @click="onLogoutClick()" style="font-size:16px;height: 30px; margin:0">로그아웃</div>
              </div>
              <div class="menu" v-else @click="show = false">
                <div class="title" style="text-align:center; margin-bottom:15px; font-size:20px; padding:6px; background-color:rgb(16,160,150); color:white;">메이커</div>
                <router-link :to="{ name: 'HostAdmin' }" class="item link" style="font-size:16px;height: 30px; margin:0;" exact>메이커 홈</router-link>
                <router-link :to="{ name: 'HostWekins' }" class="item link" style="font-size:16px;height: 30px; margin:0;" exact>위킨관리</router-link>
                <router-link :to="{ name: 'HostWekinsAddNew' }" class="item link" style="font-size:16px;height: 30px; margin:0;" exact>위킨만들기</router-link>
                <router-link :to="{ name: 'HostBooking' }" class="item link" style="font-size:16px;height: 30px; margin:0;" exact>예약관리</router-link>
                <router-link :to="{ name: 'HostBoards' }" class="item link" style="font-size:16px;height: 30px; margin:0;" exact>후기 / Q&amp;A관리</router-link>
                <router-link :to="{ name: 'HostSettings' }" class="item link" style="font-size:16px;height: 30px; margin:0;" exact>설정</router-link>
                <router-link :to="{ name: 'Home' }" class="item link" style="font-size:16px;height: 30px; margin:0;" exact>위키너 모드 전환</router-link>
                <div class="item link" @click="onLogoutClick()" style="font-size:16px;height: 30px; margin:0;">로그아웃</div>
              </div>
            </div>
          </transition>
      </div>
    </div>
  <modal v-bind:show.sync="showLoginModal"></modal>
  <modal-signup2 v-bind:show.sync="showSignupModal2"></modal-signup2>
  <modal-signup v-bind:show.sync="showSignupModal"></modal-signup>
  </div>
</template>

<script>
import auth from 'src/auth'
import NotificationLayout from 'components/NotificationLayout.vue'
import LoginModal from './LoginModal.vue'
import SignupModal from './SignupModal.vue'
import SignupModal2 from './SignupModal-new.vue'
import firebase from 'firebase'
import api from 'api'

export default {
  data() {
    return {
      show: false,
      isAlarmOpened: false,
      isLoggedIn: false,
      isHostMode: false,
      isMobileMenuShowing: false,
      isMobileSearchShowing: false,
      isMaker: null,
      searchKeyword: '',
      isLoginHiding: true,
      showLoginModal: false,
      showSignupModal: false,
      showSignupModal2: false,
      isLoading: false 
    }
  },
  components: {
    NotificationLayout,
    'modal': LoginModal,
    'modal-signup': SignupModal,
    'modal-signup2': SignupModal2
  },
  computed: {
    isActivityPage() {
      return this.$route.fullPath.includes("/activity")
    },
    user() {
      return this.$store.getters.user
    }
  },
  mounted() {
    let self = this
    /*
    firebase.auth().getRedirectResult()
      .then(function(result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        if (user) {
          self.loadingTogle()
        }
        user.getIdToken().then(token => {
          self.loadingTogle()
          api.frontsignUp(token, user.displayName, user.photoURL).then(User => {
            window.location.reload()
          })
        })
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
      */
    this.fetchData()
    auth.onAuthStateChanged()
      .then((user) => {
        if(user === null) {
          this.isLoginHiding = false
        }
      })
    // setTimeout(() => {
    //   this.isLoginHiding = false
    // }, 1000)
  },
  methods: {
    showRightMenu () {
    },
    loadingTogle() {
      this.isLoading = !this.isLoading
    },
    showSignupModalMethod() {
      this.showSignupModal = true
    },
    showSignupModalMethod2() {
      this.isMobileMenuShowing = false
      this.$router.push('/join')
      // this.showSignupModal2 = true
    },
    showSignupModalandCloseLoginModal() {
      this.showLoginModal = false 
      this.showSignupModal2 = true
    },
    showModalLogin() {
      this.showLoginModal = true
    },
    showMobileFilter() {
      this.$router.push(`/filter`)
    },
    showMobileSearch() {
      this.$router.push(`/mobileSearch`)
    },
    toggleMobileMenu() {
      this.isMobileMenuShowing = !this.isMobileMenuShowing
      if (this.isMobileMenuShowing) {
        $('#views').bind('touchmove', (e) => {
          e.preventDefault()
        })
      } else {
        $('#views').unbind('touchmove')
      }
      this.$nextTick(() => {
        $('.ui.accordion.menu').accordion()
      })
    },
    // toggleMobileSearchBar() {
    //   this.isMobileSearchShowing = !this.isMobileSearchShowing
    // },
    onSearch(event) {
      let keyword = this.searchKeyword.replace('#', '')
      this.$router.push(`/search?keyword=${keyword}`)
      // this.searchKeyword = ''
      // window.location.href = `/search?keyword=${this.searchKeyword}`
    },
    onLogoutClick() {
      auth.signOut().then(() => {
        window.location.href = '/'
      })
    },
    fetchData() {
      this.show = false
      if (this.$route.fullPath.indexOf("host/admin") > -1 || this.$route.fullPath.indexOf("wekin/") > -1) {
        this.isHostMode = true
      } else {
        this.isHostMode = false
      }
    }
  },
  watch: {
    '$route': 'fetchData'
  },
}

</script>

<style lang="scss" scoped>
@import '../style/variables';
@import '../style/typography';
@import '../style/cross-browsing';


#signupbutton {
 margin-left: 10px;
}

.fullHeight {
  height: 100%;
}

.primary.background {
  background: $color-primary;
  color: white;
}

.back-layer {
  width: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

a.a-active {
  color: #f66;
}

.ui.menu {
  margin-top: 0;
}

.ui.dropdown {
  background: none!important;
}

.profile {
  margin-right: 6px!important;
  width: 34px;
  height: 34px;
}

.user-menu {
  .title {
    background: $color-primary!important;
    height: 42px;
    padding: 14px;
    color: rgb(255, 255, 255);
    border-bottom: 1px solid $color-line;
  }
  img.profile {
    width: 27px;
    height: 27px;
  }
  .menu.transition.visible,
  .menu.transition.animating {
    width: 212px;
    left: -79px!important;
  }
}


.menu-container {
  height: $navbar-height;
  border: none;
  border-radius: 0!important;
  .menu .item {
    padding: 0 20px!important;
    margin: 0 10px;
    @include font-weight(medium);
  }
  .item:before {
    background: none;
  }

  .logo {
    margin-left: 70px;
    padding-left: 0px;
    padding-right: 0px;
    border: none!important;
  }

  .search-container {
    padding-left: 70px;
    padding-right: 50px;

    .search.icon {
      z-index: 999
    }
    input {
      border: 1px solid #00A29A;
      color: rgb(128, 128, 128);
    }
  }

  .input {
    min-width: 400px;
  }

  .right.menu {
    margin-top: 10px;
    padding-right: 50px;
    >.item {
      padding: 0 35px;
      font-size: 14px;
      font-family: NotoSansCJKkr-Medium;

      .icon {
        font-size: 18px;
      }
    }
  }
}

.mobile-nav,
.mobile-sub-nav {
  display: none;
}

@media only screen and (max-width: 1199px) {
  .mobile-nav {
    border-radius: 0;
  }
  .mobile-nav .side-menu {
    position: absolute;
    left: 12px;
    font-size: 1.5em;
    top: 16px;
    background: none;
    outline: none;
    border: none;
    width: 44px;
    height: 34px;
  }
  .mobile-nav .search-btn {
    position: absolute;
    right: 12px;
    font-size: 1.5em;
    top: 16px;
    background: none;
    outline: none;
    border: none;
  }
  .mobile-nav .filter-btn {
    position: absolute;
    right: 52px;
    font-size: 1.5em;
    top: 16px;
    background: none;
    outline: none;
    border: none;
  }
  .mobile-nav .logo {
    width: 134px;
    margin-top: 2px;
    height: auto
  }
  .mobile-nav .toobig {
    position: fixed;
    top: 0%;
    left: 34%;
    width: 134px!important;
    margin-top: 2px;
    height: auto
  }

  .accordion.menu.mobile {
    position: absolute!important;
    z-index: 999!important;
    overflow-y: scroll;
    height: 100%;
  }


  .header-container {
    height: 45px;
    padding: 10px;

    i {
      font-size: 1.5em;
    }
  }
  .button-container {
    text-align: center;
    .button {
      margin: 4px;
      width: 90%!important;
    }
    margin-bottom: 4px;
  }
  .login-info-container {
    display: flex;
    padding: 4px 12px 12px;
    img {
      display: inline-block;
      width: 50px;
      height: 50px;
    }
    .text {
      flex: 1;
      flex-direction: column;
      align-self: center;
      text-align: center;
      display: inline-block;
    }
  }
}

.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
}

@media only screen and (max-width: 991px) {
  .mobile-sub-nav {
    height: 55px;
    margin-top: -14px!important;
    border-radius: 0;
    align-items: center;
    text-align: center;
    @include flex-box();
    a {
      flex: 1
    }
  }
}

@media only screen and (min-width: 992px) and (max-width: 1450px) {
  .menu-container {
    .logo {
      margin: 0 40px;
    }
    .right.menu {
      padding-right: 15px;
    }
    .menu .item {
      margin: 0;
    }
    .search-container {
      padding: 0 25px 0 0;

      .input {
        min-width: 200px;
      }
      input {
        border: 1px solid #00A29A;
        color: rgb(128, 128, 128);
      }
    }
  }
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(30px);
  opacity: 0;
}
</style>
