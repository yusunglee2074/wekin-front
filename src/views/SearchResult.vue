<template>
  <div id="search-result" 　class="ui container">
    <div class="ui active inverted dimmer" v-if="isLoading">
      <div class="ui medium text loader">검색중입니다.</div>
    </div>
    <div class="navbar-custom"></div>
    <div>
      "{{keyword}}"에 대한 검색결과
    </div>
    <div class="ui divider" v-if="!isHashMoreClicked"></div>
    <div class="result-container" v-if="!isHashMoreClicked">
      <div class="header">위킨</div>
      <div class="floated right">{{activities.length}}개의 검색결과가 있습니다.</div>
      <a :href="'/activity/' + activity.activity_key" tag="div" class="result-container__list flex link" v-for="(activity, index) in activities" v-bind:key="index">
        <img class="ui image aligned top" :src="activity.main_image.image[0]">
        <div class="content">
          <div class="title">{{activity.title}}</div>
          <div class="address">{{activity.address}}</div>
          <div class="name">Maker {{activity.Host.name}}</div>
        </div>
      </a>
    </div>
    <div class="ui divider clear" v-if="!isActivityMoreClicked"></div>
    <div class="result-container" v-if="!isActivityMoreClicked">
      <div class="header">#해시태그</div>
      <div class="floated right">{{feeds.length}}개의 검색결과가 있습니다.</div>
      <div class="result-container__list flex" v-for="(feed, index) in feeds" v-bind:key="index" style="border:solid 1px #D3D3D3; padding:10px;cursor:pointer;" @click="goFeedDetail(feed.doc_key)">
        <img v-if="feed.image_url && feed.image_url.length > 0" class="ui image aligned top" :src="feed.image_url[0]">
        <div style="background-image:url('/static/images/default-profile.png'); width:110px;height:80px;background-position:center;background-size:cover;" v-else></div>
        <div class="content">
          <div class="body" v-html="$options.filters.hashLinking(feed.content,feed.tags)">
          </div>
          <div>
            <span class="name">by {{feed.name}}</span>
            <span class="date">{{feed.created_at | formatDate}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from 'api'

export default {
  data() {
    return {
      isActivityMoreClicked: false,
      isHashMoreClicked: false,
      keyword: '',
      activities: [],
      feeds: [],
      isLoading: false,
    }
  },
  created() {
    this.loadActivityResult()
    this.loadHashResult()
  },
  watch: {
    '$route': ['loadActivityResult', 'loadHashResult']
  },
  methods: {
    goFeedDetail(key) {
      this.$router.push({ name: 'FeedDetail', params: { key: key } })
    },
    loadHashResult() {
      this.isLoading = true
      api.searchHash(this.keyword)
        .then(feeds => this.feeds = feeds)
        .then(this.isLoading = false)
        .catch(err => console.error(err))
    },
    loadActivityResult() {
      this.isLoading = true
      this.keyword = this.$route.query.keyword
      api.searchActivity(this.keyword)
        .then(json => {
          this.activities = json
          if (this.keyword == '') {
            this.keyword = '전체'
          }
        })
        .then(this.isLoading = false)
        .catch(err => console.error(err))
    },
    activityMoreClick() {
      this.isActivityMoreClicked = true;
    },
    hashMoreClick() {
      this.isHashMoreClicked = true;
    }
  }
}
</script>
<style lang="scss">
.result-container {
  padding-top: 6px;
  &__list {
    margin: 10px 0;
  }
  .image {
    width: 110px;
    height: 80px;
    vertical-align: top;
    object-fit: cover;
  }
  .header {
    display: inline-block;
    font-size: 18px;
    margin-bottom: 12px;
    margin-left: 4px;
  }
  .content {
    display: inline-block;
    margin-left: 20px;

    .title {
      font-size: 18px;
      font-family: NotoSansCJKkr-Medium;
      margin-bottom: 10px;
      margin-top: 6px;
    }
    .address,
    .name {
      font-size: 13px;
    }
    .body {
      font-size: 15px;
      font-family: NotoSansCJKkr-DemiLight;
      margin: 8px 0;
      max-width: 300px;
      line-height: 1.5;
      font-family: NotoSansCJKkr-Regular;
      padding-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      /* 여러 줄 자르기 추가 스타일 */
      white-space: normal;
      max-height: 2.8em;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .date {
      margin-left: 36px;
    }
  }
  .result-detail-btn {
    margin-bottom: 24px;
    font-size: 16px;
  }
}
</style>
