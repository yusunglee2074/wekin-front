<template>
  <div class="navbar" v-bind:class="{ fullHeight: isMobileMenuShowing || isMobileSearchShowing }">
    <div class="back-layer" v-bind:class="{ fullHeight: isMobileMenuShowing || isMobileSearchShowing }" @click="toggleMobileMenu()"></div>
    <!-- 모바일 버전 ! -->
    <div class="ui vertical accordion menu mobile" v-if="isMobileMenuShowing">
      <div class="header-container">
        <img src="/static/images/logo-mobile.png">
        <i class="remove icon floated right link" @click="toggleMobileMenu()"></i>
      </div>
      <div class="button-container" v-if="!user">
        <a class="ui button primary" @click="showLoginModal = true">로그인</a>
        <a class="ui button basic item linked" @click="showSignupModalMethod">회원가입</a>
      </div>
      <div class="login-info-container" v-if="user">
        <a :href="`/users/${user.user_key}`" tag="div" class="ui circular background profile image link" @click.native="toggleMobileMenu()" v-if="!isHostMode" v-bind:style="{'background-image': `url(${user.picture || user.profile_image})`}"></a>
        <a :href="`/users/${user.user_key}`" tag="div" class="ui circular background profile image link" @click.native="toggleMobileMenu()" v-if="isHostMode" v-bind:style="{'background-image': `url(${user.Host.profile_image})`}"></a>
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
          <a :href="`/users/${user.user_key}`" class="item" exact>MY PAGE</a>
          <a :href="`/users/${user.user_key}/interest`" class="item" exact>관심위킨</a>
          <a :href="`/users/${user.user_key}/board`" class="item" exact>게시글</a>
          <a :href="`/settings`" class="item" exact>프로필 설정</a>
          <a :href="`/host/request`" class="item link" v-if="!user.Host || !user.Host.host_key || user.Host.status != 3" exact>메이커 신청하기</a>
          <a :href="`/host/admin`" class="item link" v-if="user.Host && user.Host.host_key && user.Host.status == 3" exact>메이커 전환</a>
          <!--<div class="item">프로필 수정</div>-->
        </div>
        <div class="active content" v-else>
          <a :href="`/host/admin`" class="item" exact v-on:click.native="toggleMobileMenu()">MAKER PAGE</a>
          <div class="divider"></div>
          <a :href="`/host/admin/wekins/add`" class="item" exact v-on:click.native="toggleMobileMenu()">위킨 만들기</a>
          <a :href="`/host/admin/wekins`" class="item" exact v-on:click.native="toggleMobileMenu()">위킨관리</a>
          <a :href="`/host/admin/bookings`" class="item" exact v-on:click.native="toggleMobileMenu()">예약관리</a>
          <a :href="`/host/admin/boards`" class="item" exact v-on:click.native="toggleMobileMenu()">후기 / Q&amp;A관리</a>
          <a :href="`/host/admin/settings`" class="item" exact v-on:click.native="toggleMobileMenu()">설정</a>
          <a :href="`/`" class="item link" exact v-on:click.native="toggleMobileMenu()">위키너 모드 전환</a>
        </div>
      </div>
      <a href="/" class="item link" tag="div" exact v-on:click.native="toggleMobileMenu()">위킨 홈</a>
      <a href="/activity" class="item link" tag="div" exact v-on:click.native="toggleMobileMenu()">위킨</a>
      <a href="/feed" class="item link" tag="div" exact v-on:click.native="toggleMobileMenu()">피드</a>
      <a href="/customer" class="item link" tag="div" exact v-on:click.native="toggleMobileMenu()">고객센터</a>
      <a href="/manual" class="item link" tag="div" exact v-on:click.native="toggleMobileMenu()">등록방법</a>
      <a href="/notification" class="item link" tag="div" exact v-on:click.native="toggleMobileMenu()" v-if="user">알림</a>
      <div class="item link" v-if="user" @click="onLogoutClick()">로그아웃</div>
    </div>
    <div class="ui menu mobile-nav">
      <button class="side-menu" @click="toggleMobileMenu()">
        <i class="content icon"></i>
      </button>
      <a href="/">
        <img class="item logo" src="/static/images/logo-134x35.png"></img>
      </a>
      <button class="search-btn">
        <i class="search icon" @click="showMobileSearch()"></i>
      </button>
      <button class="filter-btn" v-if="isActivityPage">
        <i class="options icon" @click="showMobileFilter()"></i>
      </button>
    </div>
    <div class="ui menu mobile-sub-nav" v-if="!isHostMode">
      <a href="/activity" class="link" tag="div" exact>위킨</a>
      <a href="/feed" class="link" tag="div" exact>피드</a>
      <a href="/customer" class="link" tag="div" exact>고객센터</a>
      <a href="/manual" class="link" tag="div" exact>등록방법</a>
    </div>
  
    <!-- 모바일 끝 -->
  
    <div class="pc-nav ui stackable menu menu-container">
      <a href="/">
        <img class="item logo" src="/static/images/logo-115x30.png"></img>
      </a>
      <div class="item search-container">
        <div class="ui">
          <div class="ui icon input">
            <input class="prompt" type="text" placeholder="검색" @keyup.enter="onSearch" v-model="searchKeyword">
            <i class="search icon link" @click="onSearch"></i>
          </div>
          <div class="results"></div>
        </div>
      </div>
      <div class="menu">
        <a href="/activity" class="item linked" tag="div" exact>위킨</a>
        <a href="/feed" class="item linked" tag="div" exact>피드</a>
        <a href="/customer" class="item linked" tag="div" exact>고객센터</a>
        <a href="/manual" class="item linked" tag="div" exact>등록방법</a>
      </div>
      <div class="right menu" v-if="!user">
        <a class="item linked" @click="showLoginModal = true">로그인</a>
        <a class="item linked" @click="showSignupModalMethod">회원가입</a>

        <!--<div class="loading"></div>-->
      </div>
      <div class="right menu" v-else="user">
        <div class="ui item dropdown button user-menu">
          <div class="ui circular background profile image" v-if="!isHostMode" v-bind:style="{'background-image': `url(${user.picture || user.profile_image})`}"></div>
          <div class="ui circular background profile image" v-if="isHostMode" v-bind:style="{'background-image': `url(${user.Host.profile_image})`}"></div>
          <div class="text" v-if="!isHostMode">{{ user.name }}</div>
          <div class="text" v-if="isHostMode">{{ user.Host.name }}</div>
          <div class="menu" v-if="!isHostMode">
            <div class="title">위키너</div>
            <a :href="`/users/${user.user_key}`" class="item link" exact>MY PAGE</a>
            <div class="divider"></div>
            <a :href="`/users/${user.user_key}/interest`" class="item link" exact>관심위킨</a>
            <a :href="`/users/${user.user_key}/board`" class="item link" exact>게시글</a>
            <a :href="`/settings`" class="item link" exact>프로필 설정</a>
            <a :href="`/host/request`" class="item link" v-if="!user.Host" exact>메이커 신청하기</a>
            <a :href="`/host/admin`" class="item link" v-if="user.Host && user.Host.host_key && user.Host.status == 3" exact>메이커 전환</a>
            <div class="divider"></div>
            <div class="item link" @click="onLogoutClick()">로그아웃</div>
          </div>
          <div class="menu" v-else>
            <div class="title">메이커</div>
            <a :href="`/host/admin`" class="item link" exact>MAKER PAGE</a>
            <div class="divider"></div>
            <a :href="`/host/admin/wekins/add`" class="item link" exact>위킨 만들기</a>
            <a :href="`/host/admin/wekins`" class="item link" exact>위킨관리</a>
            <a :href="`/host/admin/bookings`" class="item link" exact>예약관리</a>
            <a :href="`/host/admin/boards`" class="item link" exact>후기 / Q&amp;A관리</a>
            <a :href="`/host/admin/settings`" class="item link" exact>설정</a>
            <a :href="`/`" class="item link" exact>위키너 모드 전환</a>
            <div class="divider"></div>
            <div class="item link" @click="onLogoutClick()">로그아웃</div>
          </div>
        </div>
        <notification-layout class="ui item dropdown user-alarm"></notification-layout>
      </div>
    </div>
  <modal v-bind:show.sync="showLoginModal"></modal>
  <modal-signup v-bind:show.sync="showSignupModal"></modal-signup>
  </div>
</template>

<script>
import auth from 'src/auth'
import NotificationLayout from 'components/NotificationLayout.vue'
import LoginModal from './LoginModal.vue'
import SignupModal from './SignupModal.vue'

export default {
  data() {
    return {
      isAlarmOpened: false,
      isLoggedIn: false,
      isHostMode: false,
      isMobileMenuShowing: false,
      isMobileSearchShowing: false,
      isMaker: null,
      searchKeyword: '',
      isLoginHiding: true,
      showLoginModal: false,
      showSignupModal: false
    }
  },
  components: {
    NotificationLayout,
    'modal': LoginModal,
    'modal-signup': SignupModal
  },
  computed: {
    isActivityPage() {
      return this.$route.fullPath.includes("/activity")
    },
    user() {
      if (typeof window !== 'undefined') {
        this.$nextTick(() => {
          setTimeout(() => {
            $('.ui.dropdown').dropdown({
              action: 'hide'
            })
          }, 100)
        })
      }
      return this.$store.state.user
    }
  },
  mounted() {
    this.fetchData()
    $('.ui.dropdown').dropdown({
      action: 'hide'
    }) 
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
    showSignupModalMethod() {
      this.showSignupModal = true
    },
    showSignupModalandCloseLoginModal() {
      this.showLoginModal = false 
      this.showSignupModal = true
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
      if (this.$route.fullPath.indexOf("host/admin") > -1) {
        this.isHostMode = true
      } else {
        this.isHostMode = false
      }
    }
  },
  watch: {
    '$route': 'fetchData'
  }
}

</script>

<style lang="scss" scoped>
@import '../style/variables';
@import '../style/typography';
@import '../style/cross-browsing';

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

@media only screen and (min-width: 992px) and (max-width: 1199px) {
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
</style>
