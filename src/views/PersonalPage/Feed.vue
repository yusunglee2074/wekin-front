<template>
  <div id="personal-page-feed" class="ui container">
    <div class="ui input feed-e" @click="onEditorClick()" v-if="isMyPage">
      <input type="text" placeholder="이야기를 남겨주세요." disabled="disabled">
    </div>
    <feed-layout :feed="feed" v-for="feed in feeds" v-bind:key="feed.doc_key"></feed-layout>
    <!--<button class="ui basic button more-btn">더보기</button>-->
    <feed-editor ref="feedEditor" v-if="isMyPage"></feed-editor>
    <p v-if="feeds && feeds.length == 0" style="padding-top:30px;font-size: 15px;color: #979797;text-align:center">작성 된 피드가 없습니다.</p>
  </div>
</template>
<script>
import feedLayout from 'components/FeedLayout.vue'
import feedEditor from 'components/FeedEditor.vue'
import api from 'api'

export default {
  components: {
    feedLayout,
    feedEditor
  },
  data() {
    return {
      feeds: [],
      isMyPage: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  mounted() {
    this.$store.watch(() => {
      if (this.$store.state.user !== undefined && !this.isMyPage) {
        if (this.checkUserOwnPage()) {
          this.isMyPage = true
          this.loadUserFeed()
        }
      }
    }) 
  },
  created() {
    this.loadUserFeed()
  },
  watch: {
    '$route': 'loadUserFeed'
  },
  methods: {
    checkUserOwnPage() {
      if (this.user.user_key == this.$route.params.key) {
        return true
      }
    },
    loadUserFeed() {
      api.getUserDoc(this.$route.params.key)
        .then(feeds => {
          feeds.forEach((feed) => {
            feed.refs = this.$refs.feedEditor
            this.feeds.push(feed)
          })
        })
        .catch(err => console.error(err))
    },
    onEditorClick() {
      this.$refs.feedEditor.createFeed()
    }
  }
}
</script>
<style lang="scss" scoped>
$feed-width: 578px;

.ui.container {
  text-align: center;
}

.feed-e {
  width: $feed-width;
  height: 70px;
  margin-left: 2px;

  input {
    border: 1px solid;
  }
}

@media only screen and (max-width: 991px) {
  .feed-e {
    width: 100%;
    margin-left: 0px;
  }
}
</style>
