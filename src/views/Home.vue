<template>
  <div class="home">
    <div class="ui active inverted dimmer" v-if="isLoading">
      <div class="ui medium text loader">위킨 페이지를 불러오고 있습니다.</div>
    </div>
    <div class="navbar-custom"></div>
    <div class="banners swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(banner, index) in banners">
          <a :href="`event/${banner.order}`"><div class="swiper-slide" v-bind:style="{ backgroundImage: `url(${banner.url})`, backgroundSize:'cover', backgroundPosition: 'center' }"></div></a>
        </div>
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-scrollbar"   slot="scrollbar"></div>
    </div>

    <div class="ui segment search-container only pc">
      <div class="ui selection dropdown home location">
        <label>지역</label>
        <input name="location" type="hidden" value="전체">
        <i class="dropdown icon"></i>
        <div class="text">전체</div>
        <div class="menu">
          <div class="item" data-value="전체">전체</div>
          <div class="item" data-value="서울">서울</div>
          <div class="item" data-value="경기">경기</div>
          <div class="item" data-value="강원">강원</div>
          <div class="item" data-value="충청">충청</div>
          <div class="item" data-value="경상">경상</div>
          <div class="item" data-value="전라">전라</div>
          <div class="item" data-value="제주">제주</div>
          <div class="item" data-value="해외">해외</div>
        </div>
      </div>
      <div class="calendar-container">
        <div class="ui form">
          <div class="two fields">
            <div class="field">
              <label>날짜</label>
              <div class="ui calendar" id="rangestart">
                <div class="ui input styled primary left icon">
                  <i class="calendar icon"></i>
                  <input type="text" placeholder="시작일">
                </div>
              </div>
            </div>
            <div class="field">
              <div class="ui calendar" id="rangeend">
                <div class="ui input styled primary left icon">
                  <i class="calendar icon"></i>
                  <input type="text" placeholder="종료일">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui selection dropdown home price">
        <label>가격</label>
        <input name="price" type="hidden" value="0">
        <i class="dropdown icon"></i>
        <div class="text">전체</div>
        <div class="menu">
          <div class="item" data-value="0">전체</div>
          <div class="item" data-value="1">1만이하</div>
          <div class="item" data-value="2">1만~2만</div>
          <div class="item" data-value="3">2만~5만</div>
          <div class="item" data-value="4">5만~10만</div>
          <div class="item" data-value="5">10만이상</div>
        </div>
      </div>
      <div class="ui selection dropdown home person">
        <label>인원</label>
        <input name="person" type="hidden" value="0">
        <i class="dropdown icon"></i>
        <div class="text">혼자</div>
        <div class="menu">
          <div class="item" data-value="1">혼자</div>
          <div class="item" data-value="2">2명</div>
          <div class="item" data-value="3">3명</div>
          <div class="item" data-value="4">4명</div>
          <div class="item" data-value="5">5명</div>
          <div class="item" data-value="0">전체</div>
        </div>
      </div>
      <button class="negative ui button" @click="searchActivity()">위킨 찾기</button>
    </div>

    <div class="home-body-container">
      <div class="ui container popular-feed-container">
        <h3 class="ui header">
          <div class="header-label-bar"></div>
          <span class="header-label">인기 피드</span>
        </h3>
        <div class="pop-feed swiper-container">
          <div class="swiper-wrapper">
            <div class="column swiper-slide" v-for="feed in popularFeed">
              <small-feed-layout :feed="feed"></small-feed-layout>
            </div>
          </div>
        </div>
        <div class="prev-btn" v-on:click="swipePopularFeed.slidePrev()">
          <i class="icon angle left"></i>
        </div>
        <div class="next-btn" v-on:click="swipePopularFeed.slideNext()">
          <i class="icon angle right"></i>
        </div>
      </div>

      <div class="ui container popular-wekin-container">
        <h3 class="ui header">
          <div class="header-label-bar"></div>
          <span class="header-label">인기 위킨</span>
        </h3>
        <div class="pop-wekins swiper-container">
          <div class="swiper-wrapper">
            <div tag="a" class="ui card pointer swiper-slide" v-for="(wekin, index) in activities" v-bind:key="wekin.activity_key">
              <router-link class="ui card pointer swiper-slide" :to="{ name: 'ActivityDetail', params: { key: wekin.activity_key }}">
              <div class="image">
                <div class="backImage mainImage" v-bind:style="{'background-image':`url(${wekin.main_image.image[0]})`}"></div>
                <div class="backImage overlayer"></div>
                <div class="backImage ui circular image makerProfile" v-bind:style="{'background-image':`url(${wekin.Host.profile_image})`}"></div>
                <div>
                  <div class="ui star rating" :data-rating="Math.round(wekin.rating_avg)">
                  </div>
                  <span class="reviewCount">{{wekin.review_count}}</span>
                </div>
              </div>
              <div class="content" style="border: solid 1px #d5d5d5; min-height: 28px;">
                <span class="right floated">
                  ￦ {{ wekin.base_price | joinComma }}
                </span>
                <span>
                  <strong class="title">{{wekin.title}}</strong>
                </span>
                <div class="description">
                  <span v-for="(schedule, index) in wekin.start_date_list" v-if="index < 3" style="padding-right:8px;" :class="{  commingSchedule: isCommingSchedule(schedule), endSchedule: isEndSchedule(schedule) }" :key="index">{{schedule | formatDateKo}}</span>
                </div>
              </div>
            </router-link>
            </div>
          </div>
        </div>
        <div class="prev-btn" v-on:click="popularWekins.slidePrev()">
          <i class="icon angle left"></i>
        </div>
        <div class="next-btn" v-on:click="popularWekins.slideNext()">
          <i class="icon angle right"></i>
        </div>
      </div>

      <div class="ui container new-wekin-container">
        <h3 class="ui header">
          <div class="header-label-bar"></div>
          <span class="header-label">신규 위킨</span>
        </h3>
        <div class="new-wekins swiper-container">
          <div class="swiper-wrapper">
            <div :href="`/activity/${wekin.activity_key}`" tag="a" class="ui card pointer swiper-slide" v-for="(wekin, index) in newestActivities" v-bind:key="index">
              <router-link class="ui card pointer swiper-slide" :to="{ name: 'ActivityDetail', params: { key: wekin.activity_key }}">
              <div class="image">
                <div class="backImage mainImage" v-bind:style="{'background-image':`url(${wekin.main_image.image[0]})`}"></div>
                <div class="backImage overlayer"></div>
                <div class="backImage ui circular image makerProfile" v-bind:style="{'background-image':`url(${wekin.Host.profile_image})`}"></div>
                <!--<div>
                <div class="ui star rating" :data-rating="Math.round(wekin.rating_avg)">
                </div>
                <span class="reviewCount">{{wekin.review_count}}</span>
              </div>-->
              </div>
              <div class="content" style="border: solid 1px #d5d5d5; min-height: 28px;">
                <span class="right floated">
                  ￦ {{ wekin.base_price | joinComma }}
                </span>
                <span>
                  <strong class="title">{{wekin.title}}</strong>
                </span>
                <div class="description">
                  <span v-for="(schedule, index) in wekin.start_date_list" v-if="index < 3" v-bind:key="index" style="padding-right:8px;">{{schedule | formatDateKo}}</span>
                </div>
              </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="prev-btn" v-on:click="newWekins.slidePrev()">
          <i class="icon angle left"></i>
        </div>
        <div class="next-btn" v-on:click="newWekins.slideNext()">
          <i class="icon angle right"></i>
        </div>
      </div>

      <div class="ui container news-container">
        <h3 class="ui header">
          <div class="header-label-bar"></div>
          <span class="header-label">위킨 뉴스</span>
        </h3>
        <div class="news swiper-container">
          <div class="swiper-wrapper">
            <div @click="goLink(news.link_url)" class="ui card pointer swiper-slide" v-for="(news, index) in news.data" v-bind:key="index">
                <div class="image">
                  <div class="backImage mainImage" v-bind:style="{'background-image':`url(${news.thumbnail_url})`}"></div>
                  <div class="backImage overlayer">
                  </div>
                </div>
                <div class="content" style="border: solid 1px #d5d5d5; min-height: 28px; position:relative;">
                  <span>{{ news.title }}</span><span style="float:right;color: #999999; font-size:12px; margin-top:8px;">관심 {{ news.like_count }} 공유 {{ news.share_count }}</span>
                  <br>
                  <span style="font-size:10px; color:#acacac">{{ news.link_url }}
                  </span>
                </div>
            </div>
          </div>
        </div>
        <div class="prev-btn" v-on:click="newNews.slidePrev()">
          <i class="icon angle left"></i>
        </div>
        <div class="next-btn" v-on:click="newNews.slideNext()">
          <i class="icon angle right"></i>
        </div>
      </div>

      <div class="ui container popular-maker-container">
        <h3 class="ui header">
          <div class="header-label-bar"></div>
          <span class="header-label">인기 메이커</span>
        </h3>
        <div class="makers swiper-container">
          <div class="swiper-wrapper">
            <router-link :to="{ name: 'hostPage', params: { key: maker.host_key}}" tag="div" class="ui card pointer swiper-slide" v-for="(maker, index) in makers" v-bind:key="maker.host_key" v-if="maker && maker.ActivityNews[0]" style="margin-right:30px;width:168px;">
              <div class="image">
                <div class="backImage mainImage" v-bind:style="{'background-image':`url(${maker.ActivityNews[0].main_image.image[0]})`}"></div>
                <div class="backImage ui circular image makerProfile" v-bind:style="{'background-image':`url(${maker.profile_image})`}"></div>
              </div>
              <div class="content" style="border: solid 1px #d5d5d5; max-height: 36px;">
              <!--<span class="right floated maker-follow">
                                                                                          팔로우 100
                                                                                        </span>-->
                <!--<span class="maker-type">Maker</span>-->
                <span class="maker-name">{{maker.name}}</span>
                <span class="maker-introduce">{{maker.introduce.substr(0, 30)}}</span>
              </div>
            </router-link>
          </div>
        </div>
        <div class="prev-btn" v-on:click="swipeMaker.slidePrev()">
          <i class="icon angle left"></i>
        </div>
        <div class="next-btn" v-on:click="swipeMaker.slideNext()">
          <i class="icon angle right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import smallFeedLayout from 'components/SmallFeedLayout.vue'
import NavBara from 'components/NavBar.vue'
import api from 'api'
import moment from 'moment'

const ONE_DAY_TIME = 86400000

export default {
  name: 'home',
  components: {
    smallFeedLayout,
    NavBara
  },
  data() {
    return {
      swipeBanner: null,
      swipeMaker: null,
      swipePopularFeed: null,
      popularWekins: null,
      mySwiper: null,
      newWekins: null,
      newNews: null,
      popularFeed: [],
      newestActivities: [],
      activities: [],
      makers: [],
      banners: [],
      isLoading: false,
      koreanCalendar: {
        days: ['일', '월', '화', '수', '목', '금', '토'],
        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        today: '오늘',
        now: '지금',
        am: '오전',
        pm: '오후'
      },
      news: [],
    }
  },
  methods: {
    goLink(url) {
      window.open(url)
    },
    isEndSchedule(schedule) {
      let now = +moment()
      let startDate = moment(schedule).toDate().getTime()
      if ((startDate - now) < 0) {
        return true
      }
      return false
    },
    isCommingSchedule(schedule) {
      if (!this.isEndSchedule(schedule)) {
        let now = +moment()
        let startDate = moment(schedule).toDate().getTime()
        if ((startDate - now) < ONE_DAY_TIME) {
          return true
        }
      }
      return false
    },
    loadMainBanners() {
      api.getMainBanners()
        .then(banners => {
          banners.sort(function (a, b) {
            return a.value.order - b.value.order
          })
          banners.forEach(banner => {
            this.banners.push(banner.value)
          })
          this.$nextTick(() => {
            this.swiperBanner = new Swiper('.banners.swiper-container', {
              slidesPerView: 1,
              autoplay: 3000,
              pagination: '.banners .swiper-pagination',
              paginationClickable: true,
              nextButton: '.swiper-button-next',
              prevButton: '.swiper-button-prev'
            })
          })
        })
    },
    loadPopularFeed() {
      api.getPopularFeed()
        .then(popularFeed => this.popularFeed = popularFeed)
        .then(this.setupPopularFeedSwiper)
        .catch(err => console.error(err))
    },
    getPopularActivity() {
      this.isLoading = true
      api.getPopularActivity()
        .then(activities => {
          this.activities = activities.map((activity) => {
            if (activity.rating_avg == null) {
              activity.rating_avg = 0
            }
            this.deleteBeforeTodayDate(activity.start_date_list)
            return activity
          })

          this.isLoading = false
          this.$nextTick(() => {
            this.initSwiper()
            setTimeout(() => {
              $('.ui.dropdown.home').dropdown()
              this.initRating()
            }, 1000)
          })
        })
        .catch(err => console.error(err))
    },
    getNewestActivity() {
      this.isLoading = true
      api.getNewestActivity()
        .then(activities => {
          this.newestActivities = activities.map((activity) => {
            if (activity.rating_avg == null) {
              activity.rating_avg = 0
            }
            this.deleteBeforeTodayDate(activity.start_date_list)
            return activity
          })

          this.isLoading = false
          this.$nextTick(() => {
            this.initSwiper()
            setTimeout(() => {
              $('.ui.dropdown.home').dropdown()
              this.initRating()
            }, 1000)
          })
        })
        .catch(err => console.error(err))
    },
    getNews() {
      api.getNews()
        .then(news => {
          this.news = news
        })
        .catch(err => console.error(err))
    },
    getPopularMaker() {
      api.getPopularMaker()
        .then(makers => {
          this.makers = makers
          this.$nextTick(() => {
            this.swipeMaker = new Swiper('.makers.swiper-container', {
              slidesPerView: 5,
              spaceBetween: 12,
              breakpoints: {
                767: {
                  slidesPerView: 'auto'
                }
              }
            })
          })
        })
    },
    setupPopularFeedSwiper() {
      this.$nextTick(() => {
        this.swipePopularFeed = new Swiper('.pop-feed.swiper-container', {
          slidesPerView: 2,
          spaceBetween: 20,
          breakpoints: {
            767: {
              slidesPerView: 1
            }
          }
        })
      })
    },
    initSwiper() {
      this.popularWekins = new Swiper('.pop-wekins.swiper-container', {
        freeMode: true,
        freeModeMomentumRatio: 0.2,
        resistance: false,
        slidesPerView: 3,
        spaceBetween: 20,
        breakpoints: {
          767: {
            slidesPerView: 'auto'
          }
        }
      })
      this.newWekins = new Swiper('.new-wekins.swiper-container', {
        freeMode: true,
        freeModeMomentumRatio: 0.2,
        resistance: false,       
        slidesPerView: 3,
        spaceBetween: 20,
        breakpoints: {
          767: {
            slidesPerView: 'auto'
          }
        }
      })
      this.newNews = new Swiper('.news.swiper-container', {
        freeMode: true,
        freeModeMomentumRatio: 0.2,
        resistance: false,       
        slidesPerView: 3,
        spaceBetween: 20,
        breakpoints: {
          767: {
            slidesPerView: 'auto'
          }
        }
      })
    },
    initRating() {
      $('.new-wekins .ui.rating')
        .rating({ maxRating: 5 })
        .rating('disable')
      $('.pop-wekins .ui.rating')
        .rating({ maxRating: 5 })
        .rating('disable')
    },
    initCalendar() {
      $('#rangestart').calendar({
        type: 'date',
        endCalendar: $('#rangeend'),
        text: this.koreanCalendar,
        onChange: function (date, text, mode) {
          this.startDate = date
        }
      })
      $('#rangeend').calendar({
        type: 'date',
        startCalendar: $('#rangestart'),
        text: this.koreanCalendar,
        onChange: function (date, text, mode) {
          this.endDate = date
        }
      })
    },
    searchActivity() {
      let location = $(".ui.dropdown.location").dropdown('get value')
      let startDate = $("#rangestart").calendar('get date')
      let endDate = $("#rangeend").calendar('get date')
      let people = $(".ui.dropdown.person").dropdown('get value')
      let price = $(".ui.dropdown.price").dropdown('get value')
      let startPrice = 0
      let endPrice = 100000
      switch (price) {
        case '0':
          startPrice = 0
          endPrice = 100000
          break;
        case '1':
          startPrice = 0
          endPrice = 10000
          break;
        case '2':
          startPrice = 10000
          endPrice = 20000
          break;
        case '3':
          startPrice = 20000
          endPrice = 50000
          break;
        case '4':
          startPrice = 50000
          endPrice = 100000
          break;
        case '5':
          startPrice = 99999
          endPrice = 100000
          break;
      }
      this.$router.push({
        name: 'Activity', path: '/activity', params: {
          location: location,
          startDate: startDate,
          endDate: endDate,
          people: people,
          startPrice: startPrice,
          endPrice: endPrice,
        }
      })
    },
    deleteBeforeTodayDate(dateList) {
      let today = moment()
      let length = dateList.length
      for (let i = 0; i < length; i++) {
        let startDate = dateList[i]
        if (moment(startDate).isBefore(today)) {
          dateList.splice(0, 1)
          i--
        } else {
          break
        }
      }
    },
  },
  mounted() {
    this.getNewestActivity()
    this.getNews()
    this.getPopularActivity()
    this.getPopularMaker()
    this.loadPopularFeed()
    this.loadMainBanners()
    this.initCalendar()
  }
}
</script>

<style lang="scss" scoped>
@import '../style/variables.scss';
@import '../style/cross-browsing.scss';
@import '../style/typography.scss'; // $color-primary: #12847F;
@import '../style/media.scss';

.navbar-custom {
  margin-bottom: 90px;
  @include respond(large) { margin-bottom: 36px }
  @include respond(wide) { margin-bottom: 36px }
}

.ui.aligned.grid .column>.segment:not(.compact):not(.attached),
.ui.grid .aligned.row>.column>.segment:not(.compact):not(.attached) {
  width: 97%!important;
}

.prev-btn {
  position: absolute;
  top: 50%;
  z-index: 998;
  left: -44px;
  font-size: 40px;
  color: $color-line;
  cursor: pointer;
}

.next-btn {
  position: absolute;
  top: 50%;
  z-index: 998;
  right: -80px;
  font-size: 40px;
  color: $color-line;
  cursor: pointer;
}

.container {
  position: relative;
  * {
    text-align: left;
  }
}

.home-body-container {
  max-width: 1000px;
  margin: 0 auto;
  padding-left: 12px;
  padding-right: 12px;
}

.swiper-container {
  padding: 4px 0;
  &.banners {
    padding-top: 0;
    img {
      width: 100%;
      max-height: 450px;
    }
    .swiper-slide {
      height: 600px;
      @include respond(mobile) { height: 200px }
      @include respond(tablet) { height: 400px }
      @include respond(small) { height: 500px }
      @include respond(large) { height: 500px }
      @include respond(wide) { height: 600px }
    }
  }
  .title {
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
  }
  .content {
    border-top: none!important;
  }
}

.container>.header {
  margin-top: 40px;
  .header-label-bar {
    width: 10px;
    background: $color-primary;
    display: inline-block;
    height: 20px;
    vertical-align: sub;
    margin-right: 3px;
  }
  .header-label {
    color: rgb(0, 162, 154);
  }
}

.search-container {
  max-width: 900px;
  @include respond(large) {
    max-width: 900px
  }
  @include respond(small) {
    max-width: 750px
  }
  height: $search-container-height;
  margin: 40px auto 0;
  padding-top: 48px;
  text-align: center;

  >.dropdown {
    min-width: 0;
    margin: 0 12.5px;

    &.location,
    &.price,
    &.person {
      width: 118px; // price 추가시 사이즈
      @include respond(small) {
        width: 84px;
        margin: 0 8px;
      }
    }
    .button {
      width: 130px;
    }
    label {
      top: -22px;
      left: 6px;
      font-size: 17px;
      position: absolute;
      @include font-weight(medium);
      color: rgb(0, 0, 0);
    }
  }
  .negative.button {
    height: 39px;
    vertical-align: top;
  }
}

.calendar-container {
  width: 300px;
  display: inline-block;
  vertical-align: top;

  label {
    top: -24px;
    left: 6px;
    position: absolute;
    color: rgb(0, 0, 0);
    font-size: 17px!important;
    @include font-weight(medium);
    font-weight: 400!important;
  }
}

.ui.cards {
  margin-top: 0;
}

.ui .card {
  margin-top: 0;
  border: 0;
  outline: 0;
  box-shadow: none!important;
}

.popular-feed-container {
  .segment {
    @include flex-box();
  }
}

/* 인기 메이커 */

.popular-maker-container {
  .maker-name {
    font-size: 12px;
    @include font-weight(medium);
  }
  .maker-follow,
  .maker-type {
    font-size: 10px;
    @include font-weight(light);
  }
  .maker-introduce {
    display: block;
    font-size: 10px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 150px;
    height: 20px;
    margin-left: 3px;
  }
  .image {
    width: 100%;
  }
  .content {
    border: none;
    padding: 28px 2px;
    text-align: center;
  }
}


/* 인기 메이커 모바일 */

@media only screen and (max-width: 991px) {
  .popular-maker-container {
    .maker-introduce {
      display: block;
      font-size: 10px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 120px;
      height: 20px;
      margin-left: 3px;
    }
  }
}












/* 인기 위킨 */

.new-wekin-container,
.popular-wekin-container {
  .pop-wekins.swiper-container {
    max-width: 1000px;
  }
  .description {
    .endSchedule {
      color: #979797
    }
    .commingSchedule {
      color: red;
    }
  }
  .ui.star.rating {
    position: absolute;
    bottom: 8px;
    left: 8px;
    color: white;
  }
  .reviewCount {
    position: absolute;
    left: 100px;
    bottom: 8px;
    color: white;
    line-height: 1.2;
    font-size: 14px;
    font-weight: 400;
  }

  .makerProfile {
    position: absolute;
    width: 48px;
    height: 48px;
    margin-top: -58px;
    margin-right: 6px;
    right: 0;
    border: 2px solid white;
  }
}

.my-swiper {
  height: 300px;
  width: 100%;
  .swiper-slide {
    text-align: center;
    font-size: 38px;
    font-weight: 700;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-pagination {
    >.swiper-pagination-bullet {
      background-color: red;
    }
  }
}

.pop-wekins img,
.new-wekins img {
  height: 156px!important;
}

.pop-wekins,
.new-wekins {
  height: 222px;
}

.makers {
  height: 214px;

  .image img {
    max-height: 160px!important;
    height: 160px;
  }

  .makerProfile {
    position: absolute;
    width: 48px;
    height: 48px;
    margin-top: -26px;
    left: 58px;
    border: 2px solid white;
    @include respond(small) {
      left: 43px;
    }
  }

  .backImage {
    @include respond(small) {
      // height: 130px;
      // border-radius: 4px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
    &.mainImage {
      height: 100px;
      @include respond(small) {
        height: 70px;
      }
    }
  }

  .content {
    @include respond(small) {
      text-align: center;
    }
  }
}

.backImage {
  height: 160px;
  border-radius: 4px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  &.overlayer {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1)
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  // .swiper-container.banners .swiper-slide {
  //   height: 300px!important
  // }
  .makers .image img {
    height: 140px;
  }

  .pop-wekins,
  .new-wekins {
    img {
      height: 158px!important;
    }
  }
}

@media only screen and (max-width: 767px) {
  .backImage {
    height: 120px;
    border-radius: 4px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .container>.header {
    margin-top: 20px;
  }

  .pop-wekins,
  .new-wekins {
    height: 192px;
  }
}

@media only screen and (min-width:501px) and (max-width: 767px) {
  .search-container {
    max-width: 740px;
  }
  .search-container .dropdown {
    &.location,
    &.price,
    &.person {
      width: 84px;
      margin: 0 8px;
    }
  } // .swiper-container.banners .swiper-slide {
  //   height: 200px!important
  // }
  .makers .image img {
    height: 174px;
  }
  .pop-wekins,
  .new-wekins {
    // width: 320px!important;
  }
  .makers .swiper-slide {
    width: 196px!important;
  }

  .prev-btn,
  .next-btn {
    display: none!important;
  }

  .makers {
    .image img {
      max-height: 160px!important;
      height: 160px;
    }

    .makerProfile {
      position: absolute;
      width: 48px;
      height: 48px;
      margin-top: -26px;
      left: 72px;
      border: 2px solid white;
    }

    .backImage {
      &.mainImage {
        height: 100px;
      }
    }

    .content {
      text-align: center;
    }
  }
}

@media only screen and (max-width: 500px) {
  .search-container {
    max-width: 740px;
  }
  .search-container .dropdown {
    &.location,
    &.price,
    &.person {
      width: 84px;
      margin: 0 8px;
    }
  } // .swiper-container.banners .swiper-slide {
  //   height: 200px!important
  // }
  .pop-wekins .swiper-slide,
  .new-wekins .swiper-slide {
    width: 213px!important;
  }
  .pop-wekins,
  .new-wekins {
    @include respond(small) {
      height: 186px;
    } // width: 320px!important;
  }
  .pop-wekins img,
  .new-wekins img {
    height: 150px!important;
  }
  .makers .swiper-slide {
    width: 126px!important;
  }
  .makers .image img {
    height: 126px;
  }
  .prev-btn,
  .next-btn {
    display: none!important;
  }

  .makers {
    .image img {
      max-height: 160px!important;
      height: 160px;
    }

    .makerProfile {
      position: absolute;
      width: 48px;
      height: 48px;
      margin-top: -26px;
      left: 40px;
      border: 2px solid white;
    }

    .backImage {
      &.mainImage {
        height: 70px;
      }
    }

    .content {
      text-align: center;
    }
  }
}
</style>
