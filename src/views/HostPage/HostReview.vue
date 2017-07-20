<template>
  <div id="feed">
    <div class="ui container">
      <review-layout :review="review" v-for="(review, index) in reviews" v-bind:key="index">
      </review-layout>
      <p v-if="reviews.length == 0" style="font-size: 15px;color: #979797;;text-align:center">작성하신 후기가 없습니다.</p>
      <!--<button class="ui basic more-btn button">더보기</button>-->
    </div>
  </div>
</template>

<script>
import feedEditor from 'components/FeedEditor.vue'
import reviewLayout from 'components/ReviewLayout.vue'
import api from 'api'

export default {
  name: 'feed',
  data() {
    return {
      reviews: []
    }
  },
  methods: {
    onEditorClick () {
      this.$refs.feedEditor.showFeedEditor()
    },
    getMakerReviews () {
      api.getMakerReviews(this.$route.params.key)
        .then(json => this.reviews = json.results)
        .catch(err => console.error(err))
    }
  },
  created () {
    this.getMakerReviews()
  },
  mounted () {
    $('.ui.rating')
      .rating({
        initialRating: 3,
        maxRating: 5
      })
      .rating('disable')
  },
  components: {
    reviewLayout
  }
}
</script>

<style lang="scss" scoped>
  .ui.container {
    max-width: 100%!important;
    text-align: center;
  }
</style>
