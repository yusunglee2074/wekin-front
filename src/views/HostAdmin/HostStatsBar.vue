<template>
  <div class="ui horizontal segments">
    <div class="ui segment">
      <div class="value">{{count || 0}}</div>
      <div class="label">누적 조회수</div>
    </div>
    <div class="ui segment">
      <div class="value color secondary">{{ratingAvg || 0}}</div>
      <div class="label">별점 평가</div>
    </div>
    <div class="ui segment">
      <div class="value">{{favoriteCount || 0}}</div>
      <div class="label">관심있음 등록</div>
    </div>
    <div class="ui segment">
      <div class="value color secondary">{{reviewCount || 0}}</div>
      <div class="label">누적 후기 갯수</div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from 'api'

export default {
  computed: mapState({
    user: 'user'
  }),
  data() {
    return {
      count: 0,
      reviewCount: 0,
      ratingAvg: 0,
      favoriteCount: 0,
    }
  },
  methods: {
    getMakerReviews() {
      api.getMakerReviews(this.user.Host.host_key)
        .then(json => {
          console.log(json)
          this.reviewCount = json.results.length
        })
        .catch(err => console.error(err))
    },
    getMakerRating() {
      api.getMakerRatings(this.user.Host.host_key)
        .then(json => {
          let ratings = json.results
          if (ratings.length) {
            let tmp = 0
            let ratingSum = ratings.reduce((a, b) => {
              if (tmp == 0) {
                tmp++
                return a.activity_rating + b.activity_rating
              } else {
                return a + b.activity_rating
              }
            })
            console.log(ratingSum)
            this.ratingAvg = ratingSum / ratings.length
          }
        })
        .catch(err => console.error(err))
    },
    getMakerFavorite() {
      api.hostFavorite(this.user.Host.host_key)
        .then(json => {
          this.favoriteCount = json.data
        })
        .catch(error => console.error(error))
    },
    getCountAllWekin() {
      api.getCountAllWekin(this.user.Host.host_key)
        .then(count => this.count = count)
        .catch(error => console.error(error))
    }
  },
  mounted() {
    this.$store.watch(() => {
      if (this.$store.state.user !== undefined) {
        this.getMakerReviews()
        this.getMakerRating()
        this.getMakerFavorite()
        this.getCountAllWekin()
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/cross-browsing';

.ui.horizontal.segments {
  margin: 0;
  text-align: center;
  height: 200px;

  .segment {
    @include flex-box();
    flex-direction: column;
    flex: 1;
    -ms-flex: 1;
  }
}

.ui.list>.item {
  line-height: 1.8;
  letter-spacing: 1px;
}

.image img {
  height: 200px!important;
}

.value {
  @include flex-box();
  flex: 1;
  flex-direction: column;
  justify-content: center;
  font-size: 30px;
  font-family: NotoSansCJKkr-Bold;
}

.label {
  font-size: 14px;
}

@media only screen and (max-width: 991px) {
  .value {
    font-size: 18px;
    padding-top: 25%;
  }
  .label {
    font-size: 10px;
    padding-top: 25%;
  }
  .ui.horizontal.segments {
    height: 20vw;
  }
  .ui.list {
    font-size: 14px;
  }
}
</style>
