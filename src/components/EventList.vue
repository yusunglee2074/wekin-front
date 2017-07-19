<template>
  <div class="event-list">
    <div v-for="(banner, index) in banners">
      <div class="ui middle aligned animated list">
        <div class="item">
          <div class="content">
            <router-link :to="{ name: 'EventList', params: { key: index }}"><div class="header">{{ banner.description }}</div></router-link>
          </div>
        </div>
      </div>
    </div><img id="about" :src="`/static/images/promotion/${ imageIndex }.png`">
  </div>

</template>


<script>
import api from 'api'
export default {
  data() {
    return {
      imageIndex: '',
      banners: []
    }
  },
  methods: {
    getImageWithPageIndex() {
      this.imageIndex = this.$route.params.key
    },
    loadMainBanners() {
      api.getMainBanners()
        .then(banners => {
          banners.forEach((banner, index) => {
            this.banners.push(banner)
          })
        })
    },
  },
  mounted() {
    this.loadMainBanners()
  },
  beforeUpdate() {
    this.getImageWithPageIndex()
  },
}
</script>


<style lang="scss" scoped>
.event-list{
  margin-top: 140px;

}
</style>
