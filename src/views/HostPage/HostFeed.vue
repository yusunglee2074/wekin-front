<template>
  <div id="host-feed" class="ui container">
    <div class="ui input feed-e" @click="onEditorClick()" v-if="user && user.host_key == this.$route.params.key">
      <input type="text" placeholder="이야기를 남겨주세요." disabled="disabled">
    </div>
    <feed-layout :feed="feed" v-for="feed in feeds" v-bind:key="feed.doc_key"></feed-layout>
    <feed-editor ref="feedEditor"></feed-editor>
    <p v-if="feeds && feeds.length == 0" style="font-size: 15px;color: #979797;text-align:center">작성 된 피드가 없습니다.</p>
  </div>
</template>
<script>
import feedLayout from 'components/FeedLayout.vue'
import feedEditor from 'components/FeedEditor.vue'
import api from 'api'
import { mapGetters } from 'vuex'

export default {
  components: {
    feedLayout,
    feedEditor
  },
  data() {
    return {
      feeds: []
    }
  },
  computed: mapGetters(['user']),
  methods: {
    onEditorClick() {
      this.$refs.feedEditor.showFeedEditor()
    },
    getMakerFeed() {
      api.getMakerFeed(this.$route.params.key)
        .then(json => this.feeds = json.results)
        .catch(err => console.error(err))
    },
  },
  created() {
    this.getMakerFeed()
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
  height: 118px;
}
</style>
