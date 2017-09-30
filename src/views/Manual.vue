<template>
  <div class="about">
    <div class="navbar-custom"></div>
    <img id="about" src="/static/images/maker_manual.jpg" v-show="isOne">
    <img id="about" src="/static/images/manual2.jpg" v-show="isTwo">
    <div>
    <a href="http://facebook.com/Wekin-1369310116471093"><img id="icon" src="/static/images/facebook_icon.png"></a>
    <a href="http://pf.kakao.com/_xmQxjZxl"><img id="icon" src="/static/images/kakao_icon.png"></a>
    <a href="http://instagram.com/wekin_kr"><img id="icon" src="/static/images/insta_icon.png"></a>
    <a href="http://blog.naver.com/wekiner"><img id="icon" src="/static/images/blog_icon.png"></a>
    <a href="http://post.naver.com/wekiner"><img id="icon" src="/static/images/post_icon.png"></a>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      key: null 
    }
  },
  computed: {
    isOne() {
      if (this.key == 1){
        return true
      }
    },
    isTwo() {
      if (this.key == 2){
        return true
      }
    }
  },
  created() {
  },
  mounted() {
    this.key = this.$route.params.key
  },
  beforeUpdate() {
    this.key = this.$route.params.key
  },
  methods: {
  }
}
</script>


<style lang="scss" scoped>
.about {
  text-align: center;

  img {

    &#about {
      width: 100%;
      max-width: 900px;
    }
    &#icon {
      width: 18%;
      height: 18%;
      max-width: 100px;
      max-height: 100px;
    }
  }
}
</style>
