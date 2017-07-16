<template>
  <div id="app">
    <navbar id="navbar" ref="navbar"></navbar>
    <router-view id="views"></router-view>
    <keep-alive>
      <footbar id="footbar"></footbar>
    </keep-alive>
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
</style>
