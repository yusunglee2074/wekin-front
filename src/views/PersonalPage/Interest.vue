<template>
  <div id="personal-page-feed">
    <div class="ui three doubling cards">
      <wekin-card-layout
        :title="favorite.ActivityNew ? favorite.ActivityNew.title : '삭제된 위킨'"
        :address="favorite.ActivityNew.address"
        :name="`maker ${favorite.ActivityNew.Host.name}`"
        :imageUrl="favorite.ActivityNew.main_image.image[0]"
        :activityKey="favorite.ActivityNew.activity_key"
        :rating="favorite.ActivityNew.rating_avg"
        :reviewCount="favorite.ActivityNew.review_count"
        :favorite="favorites"
        :total="favorite.ActivityNew.total"
        v-for="(favorite, index) in favorites" v-bind:key="index">
      </wekin-card-layout>
    </div>
    <p v-if="favorites.length == 0" style="padding-top:30px;font-size: 15px;color: #979797;text-align:center">관심 등록하신 위킨이 없습니다.</p>
  </div>
</template>
<script>
import wekinCardLayout from 'components/WekinCardLayout.vue'
import api from 'api'
export default {
  components: {
    'wekinCardLayout': wekinCardLayout
  },
  data() {
    return {
      favorites: []
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    getUserFavorite() {
        api.getUserFavorite(this.$route.params.key)
          .then(favorites => {
            this.favorites = favorites
            // favorites.forEach(favorite => {
            //   if ((favorite.user_key == this.user.user_key) && favorite.activity_key == this.$route.params.key) {
            //     this.isFavoritedActivity = true
            //   }
            // })
          })
          .catch(error => console.error(error))
    },
  },
  created () {
    this.getUserFavorite()
  },
  watch: {
    '$route': 'getUserFavorite'
  },
  mounted() {
    // this.$store.watch(() => {
      // if (this.$store.state.user !== undefined) {
        // this.getUserFavorite()
      // }
    // })
    $('.ui.rating')
      .rating({
        initialRating: 3,
        maxRating: 5
      })
  }
}
</script>
<style lang="scss">
@import '../../style/variables.scss';

.icon.bookmark {
  color: $color-secondary;
  &.remove {
    color: rgba(0, 0, 0, 1);
  }
}

@media only screen and (max-width: 548px) {
  .ui.three.doubling.cards>.card {
    width: 100%!important;
  }
}
</style>
