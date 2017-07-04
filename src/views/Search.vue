<template>
  <div class="search-layer">
    <div class="ui icon input">
      <input class="prompt" type="text" placeholder="검색할 내용을 입력해주세요." @keyup.enter="onSearch" v-model="searchKeyword">
      <i class="search icon link" @click="onSearch"></i>
      <i class="close icon link" @click="onBackClick"></i>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchKeyword: ''
    }
  },
  methods: {
    onBackClick() {
      this.$router.go(-1)
    },
    onSearch(event) {
      let keyword = this.searchKeyword.replace('#', '')
      this.$router.push(`/search?keyword=${keyword}`)
      // this.searchKeyword = ''
      // window.location.href = `/search?keyword=${this.searchKeyword}`
    },
  }
}
</script>

<style lang="scss">
.search-layer {
  z-index: 9999;
  display: block;
  position: absolute;
  top: -32px;
  background: white;
  width: 100%;
  height: 100%;

  .input {
    width: 100%;
    height: 60px;
  }

  i {
    &.search {
      right: 42px!important;
    }
    font-size: 18px;
  }
}
.footer {
//  margin-top: 0!important
}
</style>
