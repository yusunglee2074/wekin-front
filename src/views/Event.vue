<template>
  <div class="about">
    <event-list></event-list>
  </div>

</template>


<script>
import EventList from '../components/EventList.vue'
export default {
  components: {
    'event-list': EventList 
  },
  data() {
    return {
      imageIndex: null
    }
  },
  methods: {
    getImageWithPageIndex() {
      this.imageIndex = this.$route.params.key
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
