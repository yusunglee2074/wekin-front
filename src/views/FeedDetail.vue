<template>
  <div id="feed">
    <div class="navbar-custom"></div>
    <div class="ui container">
      <feed-layout :feed="feed" v-if="isFeedLoaded"></feed-layout>
    </div>
  </div>
</template>

<script>
import feedEditor from 'components/FeedEditor.vue'
import feedLayout from 'components/FeedLayout.vue'
import api from 'api'
import {mapGetters} from 'vuex'

export default {
  name: 'feed',
  metaInfo () {
    return {
      title: `피드`,
      titleTemplate: '%s | Wekin'
    }
  },
  data() {
    return {
      feed: {},
      isFeedLoaded: false
    }
  },
  computed: mapGetters([
    'user'
  ]), 
  created() {
    this.loadFeed()
  },
  components: {
    feedEditor,
    feedLayout
  },
  methods: {
    loadFeed() {
      api.getDocFromKey(this.$route.params.key)
        .then(feed => {
          this.feed = feed
          this.isFeedLoaded = true
        })
    }
  },
  watch: {
    '$route': 'loadFeed'
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

.feed-list {
  width: $feed-width;
  display: inline-block;
  text-align: left;
  padding: 20px 36px;

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
</style>
