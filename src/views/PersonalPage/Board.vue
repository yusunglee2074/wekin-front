<template>
  <div id="personal-page-feed">
    <div class="ui pointing secondary menu menu--wide">
      <a class="item active" data-tab="first">작성한 Q&amp;A</a>
    </div>
    <div class="ui tab active" id="first" data-tab="first">
      <div class="result-container" v-if="qnas && qnas.length">
        <!--<a :href="`/activity/${qna.Activity.activity_key}`" tag="div" class="result-container__list link" v-for="qna in qnas">-->
         <a :href="`/activity/${qna.ActivityNew.activity_key}#qna`" tag="div" class="result-container__list link" v-for="(qna, index) in qnas" v-bind:key="index">
          <img class="ui image aligned top" v-if="qna.Activity" :src="qna.Activity.main_image.image[0]">
          <div class="content">
            <span class="title">{{qna.ActivityNew.title}}</span>
            <div>
              <span class="name">by {{qna.User.name}}</span>
              <span class="date">{{qna.created_at | formatDate}}</span>
            </div>
            <div class="status">{{qna.answer | qnaStatus}}</div>
          </div>
          <div class="ui divider"></div>
        </a>
        <!--<button class="ui basic button more-btn">더보기</button>-->
      </div>
      <p v-else style="font-size: 15px;color: #979797;;text-align:center">작성하신 게시물이 없습니다.</p>
    </div>
  </div>
</template>
<script>
import api from 'api'

export default {
  filters: {
    qnaStatus(answer) {
      if (answer) {
        return "답변완료"
      }
      return "처리중"
    }
  },
  data() {
    return {
      qnas: []
    }
  },
  methods: {
    getUserQnAs() {
      api.getUserQnAs(this.$route.params.key)
        .then(json => this.qnas = json.results)
        .catch(err => console.error(err))
    }
  },
  watch: {
    '$route': 'getUserQnAs'
  },
  created() {
    this.getUserQnAs()
  }
}
</script>
<style lang="scss" scoped>
.content {
  margin-top: 6px;
  margin-left: 12px;
  display: inline-block;

  .title {
    margin-bottom: 8px;
  }
  .name {
    line-height: 2.2;
  }
  .status {
    font-size: 13px;
    margin-top: 8px;
  }
}

.result-container .image {
  vertical-align: bottom!important;
  width: 88px;
  height: 70px;
  object-fit: cover;
}
</style>
