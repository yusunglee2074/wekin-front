<template>
  <div class="event-list">
    <div class="event-title">
      <div v-for="(banner, index) in banners">
        <div class="ui middle aligned animated list">
          <div class="item">
            <div class="content">
                <router-link :to="{ name: 'EventList', params: { key: banner.value.order }}"><div class="header" style="margin-bottom: 2px">{{ banner.description }}</div></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4 class="ui horizontal divider header">
      상세 이미지 
    </h4>
    <div id="imagediv">
      <img id="image" :src="`${ banners[imageIndex - 1].value.detailUrl }`">
    </div>
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
          banners.sort(function (a, b) {
            return a.value.order - b.value.order
          })
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
.event-list {
  margin-top: 140px;
  height: 90%;
  margin-left: 20px;

  .event-title {
    .list {
      width: 80%;
    }
  }
  #imagediv {
    text-align: center;
    #image {
      width: 95%;
      max-width: 900px;
    }
  }
}
</style>
