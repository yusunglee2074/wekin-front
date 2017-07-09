<template>
  <div v-if="user">
    <div class="navbar-custom"></div>
    <div class="host-bar">
      <div>메이커 {{user.Host.name}} ({{user.name}})</div>
    </div>
    <div class="admin-container">
      <div class="side-bar">
        <img class="ui rounded image" :src="user.Host.profile_image">
        <div class="ui vertical side menu">
          <a href="/host/admin" class="item" active-class="active" exact>홈</a>
          <a href="/host/admin/stats" class="item" active-class="active">통계</a>
          <a href="/host/admin/wekins" class="item" active-class="active">위킨관리</a>
          <a href="/host/admin/bookings" class="item" active-class="active">예약관리</a>
          <a href="/host/admin/boards" class="item" active-class="active">후기/Q&amp;A</a>
          <a href="/host/admin/settings" class="item" active-class="active">설정</a>
        </div>
      </div>
      <!-- 모바일 메뉴 -->
      <div class="mobile-menu flex">
        <a href="/host/admin" tag="div" class="f-one" active-class="active" exact>홈</a>
        <a href="/host/admin/stats" tag="div" class="f-two" active-class="active">통계</a>
        <a href="/host/admin/wekins" tag="div" active-class="active">위킨관리</a>
        <a href="/host/admin/bookings" tag="div" active-class="active">예약관리</a>
        <a href="/host/admin/boards" tag="div" active-class="active">후기/Q&amp;A</a>
      </div>
      <router-view class="router-view"></router-view>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

function fetchHostActivities(store, hostKey) {
  return store.dispatch('FETCH_HOST_ACTIVITIES', { hostKey: hostKey })
}

export default {
  computed: mapState({
    user: 'user'
  }),
  mounted() {
    this.$store.watch(() => {
      if (this.$store.state.user !== undefined) {
        fetchHostActivities(this.$store, this.$store.state.user.Host.host_key)
      }
    })
  }
}
</script>


<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/cross-browsing.scss';

.navbar-custom {
  margin-bottom: 35px;
}

.host-bar {
  padding: 26px 0;
  background-color: $color-primary;
  div {
    max-width: 1000px;
    margin: 0 auto;
    color: rgb(255, 255, 255);
    font-weight: 500;
  }
}

.admin-container {
  max-width: 1000px;
  margin: 20px auto;
}

.side-bar {
  display: inline-block;
  vertical-align: top;
}

.router-view {
  display: inline-block;
  width: 774px;
  max-width: 780px;
  margin-left: 12px;
  vertical-align: top;
}

.image {
  width: 200px;
  height: 200px;
}

.side.menu {
  width: 200px;
  text-align: center;
  font-size: 18px;
}

.mobile-menu {
  display: none;
}

@media only screen and (max-width: 991px) {
  .side-bar {
    display: none;
  }
  .host-bar {
    padding: 20px 12px;
  }
  .router-view {
    display: inline-block;
    width: 100%;
    max-width: inherit;
    margin: 0px;
  }
  .mobile-menu {
    @include flex-box();
    height: 45px;
    text-align: center;
    div {
      flex: 0.6
    }
    .f-one {
      flex: 0.4
    }
    .f-two {
      flex: 0.5
    }
  }
}
</style>
