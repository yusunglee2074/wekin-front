<template>
  <router-link :to="{ name: 'ActivityDetail', params: { key:  activity.activity_key }}" class="image link">
    <div class='mobile-wekin'>
      <div class="ui card float-left mobile-wekins" style="float:left; margin-top:10px; margin-right:10px;">
        <div class="ui content slide masked reveal image">
          <div class="back-image" :style="`background-image:url(${this.activity.main_image.image[0]})`"></div>
        </div>
        <div class="content" style="min-height:100px">
          <a class="header" style="font-size: 15px;">{{ activity.title }}</a>
          <div class="meta">
            <span class="date">￦ {{ activity.price | joinComma }}</span>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  props: [
    'activity'
  ],
  methods: {
  },
  mounted() {
    console.log(this.activity.main_image.image[0])
  }
}
</script>

<style lang="scss" scoped>

.back-image {
  height: 120px;
  margin-left: 1px;
  margin-right: 1px;
  border-radius: 2px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

@media only screen and (max-width: 700px) {
  .mobile-wekins {
    width: 300px!important;
  }
}

.mobile-wekins {
  width: 200px;
}

</style>
