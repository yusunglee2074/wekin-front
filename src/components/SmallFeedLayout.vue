<template>
  <div class="ui link segment" @click="onFeedClick()">
    <div class="ui top aligned tiny circular background image profile" :style="{'background-image': `url(${feed.User.profile_image})`}"></div>
    <div class="feed-content">
      <strong class="name">{{feed.User.name}}</strong>
      <p class="body">{{feed.content}}</p>
      <i class="comment outline icon"></i>
      <span>댓글 {{feed.comment_count}}</span>
      <i class="heart outline like icon"></i>
      <span>좋아요 {{feed.like_count}}</span>
    </div>
    <div class="ui modal" ref="feedLayout">
      <feed-layout :feed="feed"></feed-layout>
    </div>
  </div>
</template>
<script>
import feedLayout from 'components/FeedLayout.vue'
export default {
  props: {
    feed: {}
  },
  components: {
    feedLayout
  },
  methods: {
    onFeedClick() {
      $(this.$refs.feedLayout).modal('show')
    }
  },
}
</script>
<style lang="scss" scoped>
.ui.modal {
  max-width: 578px;
  margin-left: -290px;
}

.feed-content {
  display: inline-block;
  width: 76%;
  .heart {
    margin-left: 38px;
  }
  span {
    font-family: NotoSansCJKkr-Regular;
  }
}

.image.profile {
  width: 70px;
  height: 70px;
  margin-left: 6px;
  margin-right: 12px;
  margin-top: 16px;
}

.maker-follow {
  font-size: 0.7em;
}

.name {
  font-size: 14px;
  line-height: 1.2;
}

.body {
  line-height: 1.4;
  font-family: NotoSansCJKkr-Regular;
  padding-top: 2px;
  min-height: 38px;
  max-height: 38px; // display: inline-block;
  // width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 여러 줄 자르기 추가 스타일 */
  white-space: normal; // line-height: 1.2;
  height: 3.6em; // text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}


@media only screen and (max-width: 622px) {
  .ui.modal {
    margin-left: -47.5%!important;
  }
}
</style>