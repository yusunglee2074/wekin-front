<template>
  <div class="event-list">
    <div class="event-title">
      <div v-for="(banner, index) in banners">
        <div class="ui middle aligned animated list">
          <div class="item">
            <div class="content" style="margin-left:50px; font-size:20px; margin-top:10px;">
              <router-link :to="{ name: 'EventList', params: { key: banner.value.order }}"><div class="header" style="margin-bottom: 2px"><span style="font-weight:200;">{{ index + 1 }}. {{ banner.description }}</span></div></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4 class="ui horizontal divider header">
      상세 이미지 
    </h4>
    <div id="imagediv">
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
          <button class="ui green basic button large" @click="joinRequest()">회원가입</button>
          <button class="ui red basic button large" @click="makerRequest()">메이커 신청</button>
        </h3>
      </div>
    </section>
  </div>

</template>


<script>
import api from 'api'
export default {
  data() {
    return {
      imageIndex: '',
      banners: []
    }
  },
  methods: {
    getImageWithPageIndex() {
      this.imageIndex = this.$route.params.key
    },
    loadMainBanners() {
      api.getMainBanners()
        .then(banners => {
          console.log(banners)
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
      } else {
        this.$router.push('/host/request')
      }
    }
  },
  mounted() {
    this.loadMainBanners()
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
