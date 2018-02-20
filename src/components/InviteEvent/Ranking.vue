<template>
  <div class="invite-event-ranking">
    <div class='header'>
      <h2>2018 만만한 챌린지</h2>
      <p>이벤트 참여하기</p>
    </div>
    <div class="how-to">
      <div class="title">
        <span>참여방법</span>
      </div>
      <div class="four-bro">
        <a>01</a>
        <div class="order">
          <span>신규가입 또는 로그인</span>
        </div>
      </div>
      <div class="four-bro">
        <a>02</a>
        <div class="order">
          <span>친구를 초대할 고유 URL 발급</span>
        </div>
      </div>
      <div class="four-bro">
        <a>03</a>
        <div class="order">
          <span>내 고유 URL를 통해 새롭게 회원가입</span>
        </div>
      </div>
      <div class="four-bro">
        <a>04</a>
        <div class="order">
          <span>응모완료</span>
        </div>
      </div>
    </div>
    <div class="url" style="text-align:center;">
      <p>홍보용 URL 발급하기</p>
      <input type="text" placeholder="홍보용 URL 발급하기" disabled>
      <button id="url-button1">발급하기</button>
      <button id="url-button2">복사하기</button>
    </div>
    <div class="share-social">
      <p>친구 초대하기</p>
      <div class="share-buttons">
        <button>페이스북</button>
        <button>카카오</button>
        <button>네이버</button>
        <button>다음</button>
      </div>
    </div>
    <div class="ranking">
      <p>랭킹보기</p>
      <div class="rank">
        <div class="first">
          <div>랭킹 1등</div>
        </div>
        <div class="first">
          <img style="height:50%; width: 70%; top: 31%; left: 15%;" src="./../../../static/images/event/macbook-min.png">
        </div>
        <div class="third">
          <div>아이디</div>
        </div>
      </div>
      <div class="rank">
        <div class="first">
          <div>랭킹 2등</div>
        </div>
        <div class="first">
          <img style="height:70%; width: 60%; top: 21%; left: 20%;" src="./../../../static/images/event/ipad-min.png">
        </div>
        <div class="third">
          <div>아이디</div>
        </div>
      </div>
      <div class="rank">
        <div class="first">
          <div>랭킹 3등</div>
        </div>
        <div class="first">
          <img style="height:40%; width: 70%; top: 38%; left: 15%;" src="./../../../static/images/event/nintendo-min.png">
        </div>
        <div class="third">
          <div>아이디</div>
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
    }
  },
  components: {
  },
  methods: {
  },
  filters: {
  },
  created() {
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
.how-to {
  max-width: 100vw;
  width: 100%;
  height: 500px;
  background-color: #111326;
  text-align: center;
  padding: 3vw;
}
.how-to .title {
  position: relative;
  max-width: 30vw;
  max-height: 72px;
  height: 10vw;
  border-radius: 100px;
  background-color: #02a477;
  text-align: center;
  margin: 30px auto;
}
.how-to .title span {
  position: absolute;
  top: 50%;
  left: 30%;
  margin-top: -2%;
  font-family: NanumSquareOTFEB;
  font-size:1.7em; 
  text-align: center;
  color: #ffffff;
}
.how-to .four-bro {
  float:left;
  display: inline-block;
  width: 22vw;
  height: 4vw;
  position: relative;
}
.how-to .order {
  position: absolute; 
  max-width: 200px;
  width: 24vw;
  display: inline-block;
  left: 16%;
  top: 20%;
}
.how-to a {
  left: 0%;
  top: 32%;
  position: absolute; 
  display: inline-block;
  width: 3vw;
  height: 3vw;
  background-color: #6857b2;
  border-radius: 50%;
  font-family: NanumSquareOTFEB;
  font-size: 1.25em;
  line-height: 1.2;
  text-align: center;
  color: #ffffff;
}
.how-to .order span {
  font-family: NanumSquareOTFEB;
  font-size: 1.3em;
  line-height: 1.47;
  text-align: left;
  color: #ffffff;
}
@media only screen and (max-width: 548px) {
  .how-to {
    max-width: 1920px;
    width: 100%;
    height: 476px;
    background-color: #111326;
    padding: 10px;
  }
  .how-to .title {
    width: 118px;
    height: 36px;
    border-radius: 100px;
    background-color: #02a477;
    text-align: center;
    padding: 13px;
    margin: 30px auto;
  }
  .how-to .title span {
    font-family: NanumSquareOTFEB;
    font-size:1.98em; 
    line-height: 0.79;
    text-align: center;
    color: #ffffff;
  }
  .how-to .four-bro {
    font-size: 1.7em;
    float: none;
    display: block;
    width: 80vw;
    height: 17vw;
    position: relative;
    text-align: left;
    margin: 16px auto;
  }
  .how-to .order {
    position: block; 
    width: 100vw;
    max-width: 90%;
    display: inline-block;
    padding-top: 10px;
  }
  .how-to a {
    width: 40px;
    height: 40px;
    background-color: #6857b2;
    border-radius: 50%;
    font-family: NanumSquareOTFEB;
    font-size: 1.5em;
    padding-top: 6px;
    text-align: center;
    color: #ffffff;
  }
  .how-to .order span {
    margin-left: 6px;
    width: 100%;
    font-family: NanumSquareOTFEB;
    font-size: 1.6em;
    text-align: left;
    color: #ffffff;
  }
}
@media only screen and (min-width: 488px) and (max-width: 1100px) {
  .how-to {
    max-width: 1920px;
    width: 100%;
    height: 476px;
    background-color: #111326;
    padding: 10px;
  }
  .how-to .title {
    width: 200px;
    height: 56px;
    border-radius: 100px;
    background-color: #02a477;
    text-align: center;
    padding: 13px;
    margin: 30px auto;
  }
  .how-to .title span {
    font-family: NanumSquareOTFEB;
    font-size: 1.6em; 
    line-height: 0.79;
    text-align: center;
    color: #ffffff;
  }
  .how-to .four-bro {
    font-size: 1.2em;
    float: none;
    display: block;
    width: 80vw;
    height: 7vw;
    position: relative;
    text-align: left;
    margin: 16px auto;
  }
  .how-to .order {
    position: block; 
    width: 100vw;
    max-width: 90%;
    display: inline-block;
    padding-top: 10px;
  }
  .how-to a {
    width: 40px;
    height: 40px;
    background-color: #6857b2;
    border-radius: 50%;
    font-family: NanumSquareOTFEB;
    font-size: 1.5em;
    padding-top: 6px;
    text-align: center;
    color: #ffffff;
  }
  .how-to .order span {
    margin-left: 6px;
    width: 100%;
    font-family: NanumSquareOTFEB;
    font-size: 1.6em;
    text-align: left;
    color: #ffffff;
  }
}

.url {
  max-width: 1920px;
  width: 100%;
  min-height: 380px;
  background-color: #202345;
  padding:40px;
}
.url p {
  font-family: NanumSquareOTFEB;
  font-size: 2.7em;
  line-height: 0.94;
  text-align: center;
  color: #ffffff;
}
.url input {
  display: block;
  margin-right: 45px;
  margin-top: 60px;
  margin-bottom: 35px;
  max-width: 100vw;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background-color: #ffffff;
  font-family: NanumSquareOTFEB;
  font-size: 1.5em;
  line-height: 1.0;
  text-align: left;
  color: #333333;
  padding: 30px;
}
.url button {
  display: inline-block;
  text-align: center;
  margin-right: 20px;
  max-width: 234px;
  width: 30vw;
  max-height: 110px;
  height: 80px;
  border-radius: 5px;
  background-color: #eed034;
  font-family: NanumSquareOTFEB;
  font-size: 1.5em;
  line-height: 1.0;
  color: #1e245b;
}
.url button#url-button2 {
  background-color: #6857b2;
  color: white;
}

.share-social {
  max-width: 1920px;
  width: 100%;
  min-height: 439px;
  background-color: #1e245b;
  background-image: url("./../../../static/images/bg-3-min.png");
  background-size: contain;
  background-repeat: repeat;
  padding: 13vw;
}
.share-social p {
  font-family: NanumSquareOTFEB;
  font-size: 2.5em;
  line-height: 1.0;
  text-align: center;
  color: #f7d532;
}
.share-social .share-buttons {
  margin: auto auto;
  text-align: center;
  padding: 10px;
  min-width: 300px;

}
.share-social button {
  min-width: 85px;
  max-width: 305px;
  margin-top: 20px;
  width: 17vw;
  margin-right: 6%;
  margin-left: 6%;
  height: 90px;
  border-radius: 100px;
  background-color: #eed034;
  font-size: 1.3em;
  line-height: 1.0;
}
@media only screen and (max-width: 548px) {
  .share-social {
    max-width: 1920px;
    width: 100%;
    min-height: 439px;
    background-color: #1e245b;
    background-image: url("./../../../static/images/bg-3-min.png");
    background-size: contain;
    background-repeat: repeat;
    padding: 13vw;
  }
  .share-social p {
    font-family: NanumSquareOTFEB;
    font-size: 3.5em;
    line-height: 1.0;
    text-align: center;
    color: #f7d532;
  }
  .share-social .share-buttons {
    margin: auto auto;
    text-align: center;
    padding: 10px;
    min-width: 300px;

  }
  .share-social button {
    min-width: 85px;
    max-width: 305px;
    margin-top: 20px;
    width: 17vw;
    margin-right: 6%;
    margin-left: 6%;
    height: 90px;
    border-radius: 100px;
    background-color: #eed034;
    font-size: 1.7em;
    line-height: 1.0;
    font-weight: bold;
  }
}

.ranking {
  padding-top: 100px;
  max-width: 1920px;
  width: 100%;
  min-height: 2563px;
  background-color: #202345;
  text-align: center;
}
.ranking p {
  font-family: NanumSquareOTFEB;
  font-size: 2.5em;
  line-height: 1.0;
  text-align: center;
  color: #f7d532;
}
.ranking .rank {
  width: 60%;
  margin: auto auto;
  height: 10.5vw;
  padding: 1vw;
}
.ranking .rank .first {
  float: left;
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  background-color: #eed034;
  position: relative;
  text-align: center;
  display: inline-block;
  margin-left: 30px;
  margin-bottom: 7px;
}
.ranking .rank .first div {
  width: 100%;
  position: absolute;
  top: 50%;
  margin-top: -5%;
}
.ranking .rank .first img {
  width: 70%;
  height: 70%;
  margin-top: 14%;
}
.ranking .rank .third {
  display: inline-block;
  position: relative;
  max-width: 811px;
  max-height: 10vw;
  min-height: 5vw;
  width: 30vw;
  max-height: 90px;
  border-radius: 100px;
  background-color: #eed034;
  margin-top: 2.5vw;
}
.ranking .rank .third div {
  width: 100%;
  position: absolute;
  top: 30%;
  height: 100%;
}
@media only screen and (max-width: 548px) {
  .ranking {
    padding-top: 50px;
    max-width: 1920px;
    width: 100%;
    min-height: 2563px;
    background-color: #202345;
    text-align: center;
  }
  .ranking p {
    font-family: NanumSquareOTFEB;
    font-size: 4.5em;
    line-height: 1.0;
    text-align: center;
    color: #f7d532;
  }
  .ranking .rank {
    width: 90%;
    margin: auto auto;
    height: 100px;
    padding: 1vw;
    display: block;
  }
  .ranking .rank .first {
    float: left;
    margin-right: 15px;
    width: 15vw;
    height: 15vw;
    border-radius: 50%;
    background-color: #eed034;
    position: relative;
    text-align: center;
    display: inline-block;
    margin-left: 0px;
    margin-bottom: 0px;
  }
  .ranking .rank .first div {
    width: 100%;
    position: absolute;
    top: 43%;
    font-size: 1.6em;
    margin-top: -5%;
  }
  .ranking .rank .first img {
    width: 90%;
    position: absolute;
    top: 29%;
    font-size: 1.6em;
    left: 4%;
    margin-top: -5%;
  }
  .ranking .rank .third {
    display: inline-block;
    position: relative;
    max-width: 811px;
    max-height: 10vw;
    min-height: 10vw;
    width: 40vw;
    max-height: 90px;
    border-radius: 100px;
    background-color: #eed034;
    margin-top: 2.5vw;
  }
  .ranking .rank .third div {
    width: 100%;
    position: absolute;
    font-size: 2.1em;
    text-align: left;
    padding-left: 20px;
    top: 30%;
    height: 100%;
  }
}
</style>
