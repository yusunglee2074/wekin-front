<template>
  <div id="app">
    <navbar id="navbar" ref="navbar"></navbar>
    <router-view id="views"></router-view>
    <keep-alive>
      <footbar id="footbar"></footbar>
    </keep-alive>
    <transition name="modal">
      <div class="modal-mask" v-show="isMobile">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body" style="text-align:center; color:white;">
              <p style="text-align:center">
             <img src="/static/icon/wekinlogo.png" alt="위킨 로고" style="width:90px;height:90px;margin:auto auto;padding:auto;">
</p>
<h2 style="color:white; font-size:20px;">더욱 편리한<br> 위킨 앱을 통해 이용해보세요.</h2>
<a href="https://itunes.apple.com/us/app/%EC%9C%84%ED%82%A8-we-kin-%EB%8B%B9%EC%8B%A0%EC%9D%98-%EC%A3%BC%EB%A7%90%EC%9D%84-%EC%9A%B0%EB%A6%AC-we-%EA%B0%80-%EC%A6%90-kin-%EA%B2%81%EA%B2%8C-%ED%95%B4%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4/id1255509392?mt=8" style="display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/assets/shared/badges/ko-kr/appstore-lrg.svg) no-repeat;width:135px;height:40px;background-size:contain;" target="_blank"></a><a href='https://play.google.com/store/apps/details?id=com.wekinner.wekin&hl=ko&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='다운로드하기 Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/ko_badge_web_generic.png' style="width:155px;"></a>
<button class="ui inverted button" @click="isMobile = !isMobile">아뇨, 모바일 웹으로 보겠습니다.</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
function fetchUser(store) {
  let user = 'user'
  return store.dispatch('FETCH_USER', { user })
}

export default {
  name: 'app',
  beforeMount() {
    fetchUser(this.$store)
  },
  data() {
    return {
      isMobile: false
    }
  },
  mounted() {
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) this.isMobile = true;
  }
}
</script>


<style lang="scss">
@import './style/variables';
#app {
  font-family: 'Noto Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: rgb(27, 28, 29);
}

#navbar {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 9999
}

#views {
  min-height: 852px;
}

.navbar-custom {
  height: 25px;
  margin-bottom: 52px;
}

.footer {
  margin-top: 32px!important;
}

.ui.secondary.pointing.menu .active.item {
  color: $color-primary;
  border-color: $color-primary;
}

.pointer {
  cursor: pointer;
}

.unboxing {
  border: 0!important;
  box-shadow: none!important;
  outline: 0!important;
}

.full-width {
  width: 100%!important;
}

.pad8 {
  padding: 8px!important;
}

.margin8 {
  margin: 8px!important;
}

.floated.right {
  float: right;
}

.ui.container {
  max-width: 900px!important;
}

.clear {
  clear: both;
}

.flex-space {
  flex: 1;
}

.dimmed.dimmable>.ui.animating.dimmer,
.dimmed.dimmable>.ui.visible.dimmer,
.ui.active.dimmer {
  z-index: 99999
}

@media only screen and (max-width: 991px) {
  .navbar-custom {
    height: 25px;
    margin-bottom: 105px;
  }
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .8);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  border-radius: 2px;
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: white;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
