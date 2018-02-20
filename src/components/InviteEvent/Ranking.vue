<template>
  <div class="invite-event-ranking">
    <div class='header'>
      <h2>2018 만만한 챌린지</h2>
      <p>이벤트 참여하기</p>
    </div>
    <div class="how-to section">
      <div class="container">
        <div class="title">
          참여방법
        </div>
        <div class="four-bro-wrap">
          <div class="four-bro">
            <div class="circle">01</div>
            <div class="order">
              <p>신규가입 또는 로그인</p>
            </div>
          </div>
          <div class="four-bro">
            <div class="circle">02</div>
            <div class="order">
              <p>친구를 초대할 SNS채널 선택 고유 URL발급</p>
            </div>
          </div>
          <div class="four-bro">
            <div class="circle">03</div>
            <div class="order">
              <p>내 초대 메시지 링크를 통해 친구 회원가입</p>
            </div>
          </div>
          <div class="four-bro">
            <div class="circle">04</div>
            <div class="order">
              <p>응모완료</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="url section">
      <p class="section-title">홍보용 URL 발급하기</p>
      <input class="url-input" type="text" ref="url" v-model="url" placeholder="홍보용 URL 발급하기">
      <div class="url-btn-wrap">
        <button id="url-button1" @click="plzUrl()">발급하기</button>
        <button id="url-button2" @click="copyUrl()">복사하기</button>
      </div>
    </div>
    <div class="share-social section">
      <p class="section-title">친구 초대하기</p>
      <div class="share-buttons">
        <button @click="share('facebook')">페이스북</button>
        <button @click="share('kakao')">카카오</button>
        <button @click="share('naver')">네이버</button>
        <button @click="share('band')">네이버밴드</button>
      </div>
    </div>
    <div class="ranking section">
      <p class="section-title">랭킹보기</p>
      <div class="rank macbook">
        <div class="circle-wrap">
          <div class="circle rank">
            <div>랭킹 1등</div>
          </div>
          <div class="circle gift">
            <img src="./../../../static/images/event/macbook-min.png">
          </div>
        </div>
        <div class="rank-name">
          <div>{{ ranking[0] ? ranking[0].email : '정보없음' | hidingEmail }}</div>
        </div>
      </div>
      <div class="rank ipad">
        <div class="circle-wrap">
          <div class="circle rank">
            <div>랭킹 2등</div>
          </div>
          <div class="circle gift">
            <img src="./../../../static/images/event/ipad-min.png">
          </div>
        </div>
        <div class="rank-name">
          <div>{{ ranking[1] ? ranking[1].email : '정보없음' }}</div>
        </div>
      </div>
      <div class="rank nintendo">
        <div class="circle-wrap">
          <div class="circle rank">
            <div>랭킹 3등</div>
          </div>
          <div class="circle gift">
            <img src="./../../../static/images/event/nintendo-min.png">
          </div>
        </div>
        <div class="rank-name">
          <div>{{ ranking[2] ? ranking[2].email : '정보없음' }}</div>
        </div>
      </div>
      <div class="rank-to-4">
        <div class="first">랭킹 4등</div>
        <div class="second">kin*****</div>
      </div>
      <button>더보기</button>
    </div>
  </div>
</template>


<script>
import api from 'api'
import moment from 'moment'

export default {
  data() {
    return {
      url: '',
      ranking: '',
    }
  },
  components: {
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    plzUrl() {
      if (this.user) {
        api.getInviteEventUrl(this.user.user_key)
          .then(url => {
            this.url = url.url
          })
          .catch(e => console.log(e))
      } else {
        window.alert("로그인이 필요합니다.")
      }
    },
    copyUrl() {
      this.$refs.url.select()
      document.execCommand('copy')
    },
    share(type) {
      let loc
      if (!this.url) return window.alert("홍보용 URL를 먼저 발급 받아주세요!")
      switch(type) {
        case 'facebook':
          window.open(`https://www.facebook.com/v2.1/dialog/feed?&app_id=101477687056507&display=popup&locale=ko_KR&link=${encodeURIComponent(`${ this.url }`)}&version=v2.1`,
            'facebookShare',
            'toolbar=0,status=0,width=625,height=435'
          );
          break
        case 'kakao':
          loc = 'https://story.kakao.com/share?url=' + this.url;
          break
        case 'naver':
          loc = "http://share.naver.com/web/shareView.nhn?url=" + encodeURIComponent(this.url) + "&title=" + encodeURIComponent('위킨과 레저하자!');
          break
        case 'band':
          loc = 'http://www.band.us/plugin/share?body=' + encodeURIComponent('위킨과 레저하자!') + '%0A' + encodeURIComponent(this.url);
          break
      }
      window.open(loc);
    }
  },
  filters: {
    hidingEmail (item) {
      return item.slice(0, 5) + '*****'
    }
  },
  created() {
    api.getInviteEventRanking()
      .then(result => this.ranking = result)
      .catch(e => console.log(e))
  },
  beforeUpdate() {
  },
}
</script>


<style lang="scss" scoped>
@font-face {
  font-family: 'TmonWeb';
  src: url('https://firebasestorage.googleapis.com/v0/b/wekin-9111d.appspot.com/o/test%2FTmonMonsoriOTFBlack.woff2?alt=media&token=b0eee001-2f84-4738-b6fd-b60cdeaf2145') format('woff2');
  src: url('https://firebasestorage.googleapis.com/v0/b/wekin-9111d.appspot.com/o/test%2FTmonMonsoriOTFBlack.woff?alt=media&token=455450a0-3b3e-498e-b886-0ec481600a00') format('woff');
}
@font-face {
  font-family: 'NanumSquareOTFEB';
  src: url('https://firebasestorage.googleapis.com/v0/b/wekin-9111d.appspot.com/o/test%2FNanumSquareRoundR.woff2?alt=media&token=edcf66ae-f2c5-4138-a069-f4388315b24e') format('woff2');
  src: url('https://firebasestorage.googleapis.com/v0/b/wekin-9111d.appspot.com/o/test%2FNanumSquareRoundR.woff?alt=media&token=da184a77-33b4-44b9-8a05-c209192ae8ae') format('woff');
}

p, button, div {
  font-family: 'NanumSquareOTFEB';
  font-weight: 600;
}

button:active {
  opacity: 0.7;
}

.invite-event-ranking {
  font-size: 2.1vw;
  max-width: 1980px;
  width: 100%;
}
.header {
  background-image: url("./../../../static/images/bg-2-min.png");
  background-size: contain;
  background-repeat: repeat;
  text-align: center;
  max-width: 1920px;
  width: 100%;
  margin: auto auto;
  margin-top: 110px;
  max-height: 40vw;
  padding: 5vw;
}
.header h2 {
  font-size: 5em;
  font-weight: 900;
  color: #f7d532;
  text-shadow: 0 2px 0 #18654f;
  font-family: 'TmonWeb';
  margin-top: 30px;
}
.header p {
  font-family: NanumSquareOTFEB;
  font-size: 2.5em;
  line-height: 1.0;
  text-align: center;
  color: #f7d532;
}

@media only screen and (min-width: 548px) {
  .section {
    // max-width: 1000px;
    padding: 90px 10px;
  }

  .container {
    margin: auto;
  }

  .section-title {
    color: #f7d532;
    font-size: 28px;
    font-weight: bold;
  }

  // section 01 참여방법
  .how-to {
    background-color: #111326;

    .title {
      width: 160px;
      height: 50px;
      margin: auto;
      margin-bottom: 30px;
      text-align: center;
      font-size: 24px;
      color: #fff;
      line-height: 50px;
      border-radius: 100px;
      background-color: #02a477
    }

    .four-bro-wrap {
      width: 100%;
      padding-bottom: 80px;
    }

    .four-bro {
      float: left;
      width: 25%;
      text-align: center;
      padding-left: 5%;

      .circle {
        float: left;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #fff;
        border-radius: 100%;
        background-color: #6857b2;
      }

      .order {
        float: left;
        width: 80%;
        font-size: 12px;
        text-align: left;
      }

      p {
        display: inline-block;
        padding-top: 5px;
        padding-left: 10px;
        text-align: left;
        color: #fff;
        font-size: 16px;
        line-height: 1.5;
      }
    }
  }

  // section 02 URL 발급
  .url {
    padding-right: 50px;
    padding-left: 50px;
    text-align: center;
    background-color: #202345;
  }

  .url-input {
    border: 0;
    border-radius: 5px;
    float: left;
    width: 60%;
    height: 60px;
    padding-left: 20px;
  }

  button {
    width: 15%;
    height: 60px;
    border: 0;
    border-radius: 5px;
  }
  #url-button1 {
    background-color: #eed034;
    margin-right: 10px;
  }
  #url-button2 {
    color: #fff;
    background-color: #6857b2;
  }

  // section 03 친구 초대
  .share-social {
    padding-right: 50px;
    padding-left: 50px;
    text-align: center;
    background-image: url("./../../../static/images/bg-3-min.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    .share-buttons {
      button {
        margin: 0 10px;
        border-radius: 100px;
        background-color: #eed034;
      }
    }
  }

  // section 04 랭킹
  .ranking {
    padding-right: 150px;
    padding-left: 150px;
    text-align: center;
    background-color: #202345;

    .rank {
      position: relative;
      clear: both;
      height: 100px;
      margin-bottom: 40px;

      .circle {
        position: absolute;
        width: 100px;
        height: 100px;
        margin-right: 40px;
        line-height: 100px;
        font-size: 16px;
        border-radius: 100%;
        background-color: #eed034;
      }
      .circle.rank {
        left: 0;
      }
      .circle.gift {
        right: 0;
      }
    }

    .circle-wrap {
      position: relative;
      width: 30%;
    }

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .rank.macbook {
      img {
        width: 80%;
      }
    }
    .rank.ipad {
      img {
        width: 50%;
      }
    }
    .rank.nintendo {
      img {
        width: 80%;
      }
    }

    .rank-name {
      position: absolute;
      right: 0;
      width: 70%;
      height: 70px;
      margin-top: 15px;
      font-size: 16px;
      line-height: 70px;
      border-radius: 100px;
      background-color: #eed034;
    }
  }
}

@media only screen and (max-width: 548px) {
  .section {
    padding: 50px 10px;
  }

  .section-title {
    color: #f7d532;
    font-size: 24px;
    font-weight: bold;
  }

  // section 01
  .how-to {
    width: 100%;
    background-color: #111326;

    .title {
      width: 120px;
      height: 30px;
      margin: auto;
      margin-bottom: 30px;
      line-height: 30px;
      color: #fff;
      text-align: center;
      font-weight: bold;
      font-size: 15px;
      border-radius: 100px;
      background-color: #02a477;
    }

    .four-bro {
      display: block;
      width: 80%;
      height: auto;
      float: none;
      clear: both;
      margin: auto;
      margin-bottom: 15px;
      line-height: 40px;
      text-align: center;
      .circle {
        float: left;
        width: 40px;
        height: 40px;
        margin-right: 10px;
        color: #fff;
        font-family: 'NanumSquareOTFEB';
        font-size: 14px;
        font-weight: bold;
        line-height: 40px;
        border-radius: 100%;
        background-color: #6857b2;
      }
      .order {
        p {
          color : #fff;
          text-align: left;
          font-size: 14px;
          line-height: 40px;
        }
      }
    }
  }

  // section 02
  .url {
    text-align: center;
    background-color: #202345;
  
    .section-title {
      color: #fff;
      font-weight: bold;
    }

    .url-input {
      width: 80%;
      height: 50px;
      margin-bottom: 20px;
      padding-left: 10px;
      font-size: 14px;
      border-radius: 5px;
      border: 0;
    }

    button {
      border: 0;
      width: 30%;
      height: 50px;
      font-size: 14px;
      font-weight: bold;
      border-radius: 5px;
    }

    #url-button1 {
      background-color: #eed034;
      margin-right: 10px;
    }
    #url-button2 {
      color: #fff;
      background-color: #6857b2;
    }
  }

  // section 03
  .share-social {
    background-image: url("./../../../static/images/bg-3-min.png");
    background-size: contain;
    background-repeat: repeat;
    text-align: center;

    .share-buttons {
      button {
        display: block;
        width: 80%;
        height: 50px;
        margin: auto;
        margin-bottom: 20px;
        font-size: 14px;
        font-weight: 600;
        border-radius: 100px;
        border: 0;
        background-color: #eed034;
      }
    }
  }

  // seection 04 랭킹
  .ranking {
    background-color: #202345;
    text-align: center;

    .rank {
      position: relative;
      margin-bottom: 50px;
    }

    .circle-wrap {
      position: relative;
      width: 220px;
      height: 100px;
      margin: auto;
      margin-bottom: 20px;
    }

    .circle {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100px;
      height: 100px;
      font-size: 16px;
      font-weight: bold;
      line-height: 100px;
      border-radius: 100%;
      background-color: #eed034;

      &.rank {
        left: 0;
      }
      &.gift {
        right: 0;
      }
    }

    .rank-name {
      width: 220px;
      height: 50px;
      margin: auto;
      font-size: 16px;
      font-weight: bold;
      line-height: 50px;
      border-radius: 100px;
      background-color: #eed034;
    }

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .rank.macbook {
      img {
        width: 80%;
      }
    }
    .rank.ipad {
      img {
        width: 50%;
      }
    }
    .rank.nintendo {
      img {
        width: 80%;
      }
    }
  }
}

</style>
