<template>
  <div id="feed">
    <div class="navbar-custom"></div>
    <div class="ui container">
      <div class="ui input feed-e" @click="onEditorClick()" v-if="user">
        <input type="text" placeholder="이야기를 남겨주세요." disabled="disabled">
      </div>
      <feed-layout :feed="feed" v-for="feed in feeds" v-bind:key="feed.doc_key" v-if="!user || (user && !feed.private_mode)">
      </feed-layout>
      <div class="app" style="height: 100px; width: 1px;margin: 0 auto;" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      </div>
      <div class="ui active inverted dimmer" v-if="isLoading">
        <div class="ui medium text loader">Loading</div>
      </div>
    </div>
    <feed-editor ref="feedEditor"></feed-editor>
  </div>
</template>

<script>
import feedEditor from 'components/FeedEditor.vue'
import feedLayout from 'components/FeedLayout.vue'
import api from 'api'
import _ from 'lodash'

export default {
  name: 'feed',
  data() {
    return {
      feeds: [],
      isLoading: true,
      isLastPage: false,
      busy: false,
      page: 0,
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  components: {
    feedEditor,
    feedLayout
  },
  methods: {
    loadMore() {
      this.getFeed(this.page++, 5)
    },
    getFeed(page, size) {
      if (!this.isLastPage) {
        this.busy = true;
        api.getFeed(page, size).then(json => {
          if (json.results.length != 0) {
            json.results.forEach(feed => {
              feed.refs = this.$refs.feedEditor
              this.feeds.push(feed)
            })
          } else {
            this.isLastPage = true
          }
          this.isLoading = false
          this.busy = false
        }).catch(err => console.error(err))
      }
    },
    onEditorClick() {
      this.$nextTick(() => {
        this.$refs.feedEditor.createFeed()
      })
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

.feed-list {
  width: $feed-width;
  display: inline-block;
  text-align: left; // padding: 20px 36px;
  .profile {
    width: 50px;
    height: 50px;
  }
  .info {
    display: inline-block;
    width: 80%;
    padding: 6px 12px;
  }
  .content {
    padding-top: 20px;
  }

  .heart {
    margin-left: 38px;
  }
}

.feed-menu {
  vertical-align: top;
  float: right;
  background: none;
  .icon {
    padding: 16px 0;
    font-size: 22px;
  }
  .header {
    font-size: 14px!important;
  }
}

.card {
  width: $feed-width;
}

@media only screen and (max-width: 991px) {
  .feed-e {
    width: 100%;
    height: 118px;
  }
}
</style>
