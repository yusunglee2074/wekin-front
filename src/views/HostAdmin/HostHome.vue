<template>
  <div>
    <host-stats-bar></host-stats-bar>
    <host-card-layout title="최신 알림">
      <div slot="content" class="content recently-alarm">
        <div class="ui list" v-if="alarms.length">
          <div class="item">000님이 ‘00000000’ 위킨에 Q&A를 남겼습니다.</div>
        </div>
        <div v-else>알림이 없습니다.</div>
      </div>
    </host-card-layout>
    <host-card-layout title="최신 위킨 목록">
      <div slot="content" class="content recently-wekins">
        <div class="ui two doubling cards" v-if="wekins.length">
          <a :href="'/activity/' + wekin.activity_key" tag="div" class="ui card linked swiper-slide" v-for="(wekin, index) in wekins" v-bind:key="index">
            <div class="image">
              <img :src="wekin.main_image.image[0]">
            </div>
            <div class="content">
              <span class="right floated">
                ￦ {{wekin.base_price | joinComma }}
              </span>
              <span>
                <strong>{{wekin.title}}</strong>
              </span>
              <!--<div class="description">
                                <div class="ui star rating" data-rating="3"></div>후기 5개
                              </div>-->
            </div>
          </a>
        </div>
        <div v-else>진행중인 최신 위킨이 없습니다.</div>
      </div>
    </host-card-layout>
  </div>
</template>
<script>
import wekinCardLayout from 'components/WekinCardLayout.vue'
import hostCardLayout from 'components/HostCardLayout.vue'
import hostStatsBar from './HostStatsBar.vue'

import api from 'api'
import { mapState } from 'vuex'

export default {
  computed: mapState({
    hostActivities: 'hostActivities',
    user: 'user'
  }),
  components: {
    wekinCardLayout,
    hostCardLayout,
    hostStatsBar
  },
  data() {
    return {
      wekins: [],
      alarms: []
    }
  },
  methods: {
    getRecentlyWekin() {
      api.getRecentlyWekin(this.user.Host.host_key)
        .then(wekins => this.wekins = wekins)
        .catch(error => console.error(error))
    },
  },
  mounted() {
    this.$store.watch(() => {
      if (this.$store.state.user !== undefined) {
        this.getRecentlyWekin()
      }
    })
    $('.ui.rating').rating({
      initialRating: 3,
      maxRating: 5
    }).rating('disable')
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/cross-browsing';

.recently-wekins, .recently-alarm {
  min-height: 300px!important;
}
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
    height: 76px;
  }
  .ui.list {
    font-size: 14px;
  }
}
</style>
