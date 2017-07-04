<template>
  <div>
    <host-card-layout title="후기 / Q&amp;A">
      <div slot="content" class="content">
        <div class="ui pointing secondary menu menu--wide">
          <a class="item active" data-tab="first">후기</a>
          <a class="item" data-tab="second">Q&amp;A</a>
        </div>
        <div class="ui tab active" id="first" data-tab="first">
          <div class="ui selection dropdown reviewTitle" v-if="reviews && reviews.length != 0">
            <input name="reviewTitle" type="hidden" value="0">
            <i class="dropdown icon"></i>
            <div class="text">전체</div>
            <div class="menu">
              <div class="item" data-value="0">전체</div>
              <div class="item" :data-value="review.activity_title" v-for="(review, index) in uniqReviewsTitles" v-bind:key="index">{{review.activity_title}}</div>
            </div>
          </div>
          <review-layout :review="review" v-for="review in filteredReviews" v-bind:key="review.doc_key">
            <div slot="buttons" class="buttons">
              <!--<router-link :to="'/activity/' + review.activity_key" class="ui primary button" tag="button">보러가기</router-link>-->
              <router-link :to="'/activity/' + review.activity_key+'#review'" class="ui primary button" tag="button">보러가기</router-link>
              <!--<button class="ui primary button">신고하기</button>-->
            </div>
          </review-layout>
          <div v-if="reviews && reviews.length == 0">
            <p style="text-align:center;width:100%">작성된 후기가 없습니다.</p>
          </div>
          <div slot="extra" class="ui basic button more-btn" v-if="!isLastReviewPage" @click="getMoreReviews()">더보기</div>
        </div>
        <div class="ui tab" id="second" data-tab="second">
          <div class="ui selection dropdown qnaTitle" v-if="qnas && qnas.length != 0">
            <input name="qnaTitle" type="hidden" value="0">
            <i class="dropdown icon"></i>
            <div class="text">전체</div>
            <div class="menu">
              <div class="item" data-value="0">전체</div>
              <div class="item" :data-value="qna.activity_title" v-for="(qna, index) in uniqQnasTitles" v-bind:key="index">{{qna.activity_title}}</div>
            </div>
          </div>
          <qna-layout :qna="qna" v-for="qna in filteredQnas" v-bind:key="qna.doc_key"></qna-layout>
          <div v-if="qnas && qnas.length == 0">
            <p style="text-align:center;width:100%">작성된 Q&amp;A가 없습니다</p>
          </div>
          <div class="ui basic button more-btn" v-if="!isLastQnaPage" @click="getMoreQnas()">더보기</div>
        </div>
      </div>
    </host-card-layout>
  </div>
</template>
<script>
import hostCardLayout from 'components/HostCardLayout.vue'
import reviewLayout from 'components/ReviewLayout.vue'
import qnaLayout from 'components/HostAdmin/QnaLayout.vue'
import api from 'api'
import _ from 'lodash'

export default {
  components: {
    hostCardLayout,
    reviewLayout,
    qnaLayout
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  asyncComputed: {
    uniqReviewsTitles() {
      return _.uniqBy(this.reviews, 'activity_title')
    },
    filteredReviews() {
      let pagingReviews = this.pagingReviews.filter((review) => {
        if (this.selectedReviewTitle == "0") {
          return review
        } else if (review.activity_title == this.selectedReviewTitle) {
          return review
        }
      })
      if (pagingReviews.length < this.pageLimit) {
        setTimeout(() => {
          this.getMoreReviews()
        }, 500)
      }
      return pagingReviews
    },
    uniqQnasTitles() {
      return _.uniqBy(this.qnas, 'activity_title')
    },
    filteredQnas() {
      let pagingQnas = this.pagingQnas.filter((qna) => {
        if (this.selectedQnaTitle == "0") {
          return qna
        } else if (qna.activity_title == this.selectedQnaTitle) {
          return qna
        }
      })
      if (pagingQnas.length < this.pageLimit) {
        setTimeout(() => {
          this.getMoreQnas()
        }, 500)
      }
      return pagingQnas
    }
  },
  data() {
    return {
      reviews: [],
      qnas: [],
      isLastQnaPage: false,
      isLastReviewPage: false,
      pagingQnas: [],
      pagingReviews: [],
      currentQnaLength: 0,
      currentReviewLength: 0,
      pageLimit: 7,
      haveUser: false,
      selectedReviewTitle: "0",
      selectedQnaTitle: "0"
    }
  },
  methods: {
    initReviewDropdown() {
      setTimeout(() => {
        $('.ui.dropdown.reviewTitle').dropdown({
          onChange: (value) => {
            this.selectedReviewTitle = value
          }
        })
      }, 500)
    },
    initQnaDropdown() {
      setTimeout(() => {
        $('.ui.dropdown.qnaTitle').dropdown({
          onChange: (value) => {
            this.selectedQnaTitle = value
          }
        })
      }, 500)
    },
    getMakerReviews() {
      api.getMakerReviews(this.user.Host.host_key)
        .then(json => this.reviews = json.results)
        .then(this.getMoreReviews)
        .then(this.initReviewDropdown)
        .catch(err => console.error(err))
    },
    getMakerQnAs() {
      api.getMakerQnAs(this.user.Host.host_key, 0, 100)
        .then(json => this.qnas = json.results)
        .then(this.getMoreQnas)
        .then(this.initQnaDropdown)
        .catch(err => console.error(err))
    },
    getMoreQnas() {
      let nextLength = this.currentQnaLength + this.pageLimit
      for (this.currentQnaLength; this.currentQnaLength < nextLength; this.currentQnaLength++) {
        if (this.currentQnaLength < this.qnas.length) {
          this.pagingQnas.push(this.qnas[this.currentQnaLength])
        } else {
          this.isLastQnaPage = true
        }
      }
    },
    getMoreReviews() {
      let nextLength = this.currentReviewLength + this.pageLimit
      for (this.currentReviewLength; this.currentReviewLength < nextLength; this.currentReviewLength++) {
        if (this.currentReviewLength < this.reviews.length) {
          this.pagingReviews.push(this.reviews[this.currentReviewLength])
        } else {
          this.isLastReviewPage = true
        }
      }
    }
  },
  mounted() {
    this.$store.watch(() => {
      if (this.$store.state.user !== undefined && !this.haveUser) {
        this.haveUser = true
        this.getMakerReviews()
        this.getMakerQnAs()
      }
    })
    $('.menu .item').tab()
    $('.ui.rating')
      .rating({
        maxRating: 5
      })
      .rating('disable')

  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  margin-bottom: 20px;
  margin-left: 10px;
}

.ui.basic.button.more-btn {
  border-radius: .28571429rem!important;
}
</style>
