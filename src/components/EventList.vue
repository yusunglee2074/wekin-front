<template>
  <div class="event-list">
    <div class="event-title">
      <div v-for="(banner, index) in banners">
        <div class="ui middle aligned animated list">
          <div class="item">
            <div class="content" style="margin-left:50px; font-size:20px; margin-top:10px;">
              <div v-if="banner.value.externalLink"><div class="header" style="margin-bottom: 2px">
                  <a :href="'/activity/' + banner.value.externalLink" target="_blank"><span style="font-weight:200;">{{ index + 1 }}. {{ banner.description }}</span></a></div>
              </div>
              <div v-else>
                <router-link :to="{ name: 'EventList', params: { key: banner.value.order }}"><div class="header" style="margin-bottom: 2px"><span style="font-weight:200;">{{ index + 1 }}. {{ banner.description }}</span></div></router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="imagediv">
      <div v-if="imageIndex != 1">
        <div>
          <h4 class="ui horizontal divider header">
            상세 이미지 
          </h4>
          <img id="image" :src="`${ banners[imageIndex - 1].value.detailUrl }`">
        </div>
        <section id="fourthSection" style="background-color:rgb(248, 248, 248); min-height: 350px; padding: 60px;" v-show="banners[imageIndex - 1].description == '위킨은 능력자 모집중!'">
          <div class="title">
            <h1>
              <p>회원가입, 메이커 신청 후 모든 기능을 이용해보세요.</p>
            </h1>
            <h3>
              <p>더욱 자세한 사항은 카카오톡 <span style="color: rgb(40, 180, 80)">@위킨</span> 혹은 아래 고객센터 유선 번호로 문의 바랍니다.</p>
            </h3>
            <h3>
              <button class="ui red basic button large maker start" @click="makerRequest()">메이커 신청</button>
            </h3>
          </div>
        </section>
      </div>
    <div style="width:75%; margin:40px auto;" class="ui segment list" v-else>
      <img style="width:100%; margin: 30px auto; max-width: none;" id="image" :src="`${ banners[imageIndex - 1].value.url }`">
      <div class="ui link three stackable cards activities" style="text-align:left;">
        <wekin-card-layout
          :activityKey="wekin.activity_key"
          :title="wekin.title"
          :address="wekin.address"
          :name="wekin.Host.name"
          :imageUrl="wekin.main_image.image[0]"
          :favorite="wekin.Favorites"
          :rating="Math.round(wekin.rating_avg) || 0"
          :reviewCount="wekin.review_count || 0"
          v-for="(wekin, index) in eventWekins" v-bind:key="wekin.wekin_key">
          <div class="right floated price" style="text-align:right;" slot="extra-header">
            <span>￦ {{wekin.base_price | joinComma}}</span>
            <span style="display:block;text-decoration:line-through;color:grey; font-size:0.9rem;">￦ {{wekin.price_before_discount }}</span>
            <!--<p style="font-weight:bold;color:#d51c1c;font-size:0.9rem;">[{{ wekin.base_price, wekin.price_before_discount | discountPercentage  }} %]</p>-->
          </div>
          <div class="content extra-body" slot="extra-body">
            <span v-for="(schedule, index) in wekin.start_date_list" v-if="index < 3" style="padding-right:8px;" v-bind:key="index">{{schedule | formatDateKo}}</span>
          </div>
        </wekin-card-layout>
      </div>
    </div>
    </div>
  </div>

</template>


<script>
import api from 'api'
import moment from 'moment'
import wekinCardLayout from 'components/WekinCardLayout.vue'

export default {
  data() {
    return {
      imageIndex: '',
      banners: [],
      eventWekinList: [],
      eventWekins: []
    }
  },
  components: {
    wekinCardLayout,
  },
  methods: {
    getImageWithPageIndex() {
      this.imageIndex = this.$route.params.key
    },
    loadMainBanners() {
      api.getMainBanners()
        .then(banners => {
          banners.sort(function (a, b) {
            return a.value.order - b.value.order
          })
          banners.forEach((banner, index) => {
            this.banners.push(banner)
          })
        })
    },
    joinRequest () {
      console.log(this.$parent.$refs.navbar)
      this.$parent.$refs.navbar.showSignupModalMethod()
    },
    makerRequest () {
      if (this.$store.getters.user === undefined) {
        alert("회원가입 후 신청 가능합니다.")
        this.$parent.$refs.navbar.showSignupModalMethod()
      } else if (this.$store.getters.user !== undefined) {
        if (this.$store.getters.user.Host === null) {
          alert("위키너님 반갑습니다. 메이커 신청 후 활동을 등록해보세요.")
          this.$router.push('/host/request')
        } else {
          alert("메이커님 반갑습니다. 지금 바로 위킨을 등록해보세요.")
          this.$router.push('/host/admin')
        }
      }
    },
    deleteBeforeTodayDate(dateList, wekin) {
      let activity = wekin 
      let todayPlusDueDate = moment().set('hour', 18).add(activity.due_date, 'days')
      let length = dateList.length
      let tmp = 0
      for (let i = 0; i < length; i++) {
        let startDate = moment(dateList[i]).set('hour', 19)
        if (moment(startDate).isBefore(todayPlusDueDate)) {
          tmp++
        } else {
          break
        }
      }
      dateList.splice(0, tmp)
    },
  },
  filters: {
    discountPercentage: function (base, before) {
      return ((before - base) / before  * 100).toFixed(0) == 9 ? 10 : ((before - base) / before  * 100).toFixed(0)
    }
  },
  mounted() {
    this.loadMainBanners()
    api.getVersion()
      .then(data => {
        this.eventWekinList = JSON.parse(JSON.parse(data.data).eventWekinList)
        return api.getActivities(3)
      })
      .then(activities => {
        for (let i = 0, length = activities.length; i < length; i++) {
          let activity = activities[i]
          this.deleteBeforeTodayDate(activity.start_date_list, activity)
          if (this.eventWekinList.includes(activity.activity_key)) {
            this.eventWekins.push(activity)
          }
        }
      })
  },
  beforeUpdate() {
    this.getImageWithPageIndex()
  },
}
</script>


<style lang="scss" scoped>
.event-list {
  margin-top: 140px;
  height: 90%;

  .event-title {
    .list {
      width: 80%;
    }
  }
  #imagediv {
    text-align: center;
    #image {
      width: 95%;
      max-width: 900px;
    }
  }
}
.title h1 {
  font-size: 35px;
  font-family: 'Spoqa Han Sans', sans-serif;;
  margin: 70px auto 0 auto;
  left: 0;
  right: 0;
}
.title h3 {
  font-size: 20px;
  font-family: 'Spoqa Han Sans', sans-serif;;
  position: inherit;
  display:block;
  margin: 80px auto 0 auto;
  left: 0;
  right: 0;
  text-align: center;
}
.title h1 p {
  margin-bottom: 14px;
  text-align: center;
  font-weight: 200;
}
.title h3 p {
  margin-bottom: 14px;
  text-align: center;
  font-weight: 200;
}
</style>
