<template>
  <div class="about">
    <div class="navbar-custom"></div>
    <img id="about" :src="`/static/images/promotion/${imageIndex}.png`">
  </div>

</template>


<script>
export default {
  data() {
    return {
      imageIndex: null
    }
  },
  methods: {
    getImageWithPageIndex() {
      this.imageIndex = this.$route.params.key
      console.log(this.imageIndex)
    }
  },
  mounted() {
    this.getImageWithPageIndex()
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
