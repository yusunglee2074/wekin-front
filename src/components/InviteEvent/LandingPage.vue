<template>
  <div class="invite-event-landing">
    <div class='header'>
      <h2>2018 만만한 챌린지</h2>
      <p>위킨 회원가입 시 100% 선물 지급</p>
      <p>이보다 쉬운 도전은 없다.</p>
    </div>
    <div class="line"></div>
    <div class="content">
      <p class="intro"><span>10,000명의 신규회원</span>이 모이면 맥북에어, 아이패드 등 <span>218개의 특급선물</span>을 쏩니다!</p>
      <p class="count-down">현재 <span><a>9</a><a>9</a></span> ,<span><a>9</a><a>9</a><a>9</a><a>9</a></span> 명/ <span id="10-000">10,000명</span></p>
      <div class="guage-bg">
        <div class="guage-bar"></div>
        <div class="guage-checker"><span class="arrow"></span></div>
        <div class="guage-checker"><span class="arrow"></span></div>
        <div class="guage-checker"><span class="arrow"></span></div>
        <div class="guage-checker"><span class="arrow"></span></div>
      </div>
      <div class="time">
        <p style="margin-bottom:52px;"><a class="title">이벤트 기간</a> 2월 21일 수요일 ~ 3월 10일 토요일(18일간)</p>
        <p><a class="title">당첨자 발표</a> 2018년 3월 20일(화), 위킨 홈페이지, 앱</p>
        <p class="count-down">남은시간 <span><a>2</a><a>4</a>:<a>1</a><a>1</a>:<a>1</a><a>3</a></span></p>
        <button id="submit">이벤트 참여하기</button>
      </div>
    </div>
    <div class="footer">
      <div class="first-text">
        <p>앱 설치하고 + 회원가입 하면 즉시 = <span>10,000 point</span></p>
        <p>초대한 친구 회원가입 1명당(무제한) = <span>2,000 point</span></p>
      </div>
      <div class="third-text">
        <div>휴대폰 이미지</div>
        <span>위킨앱 다운로드</span>
      </div>
    </div>
    <div class="ranking">
      <Rank circle="랭킹 1등" id="현재 1위 kin*****"></Rank>
      <Rank circle="랭킹 2등" id="현재 2위 kin*****"></Rank>
      <Rank circle="랭킹 3등" id="현재 3kin*****"></Rank>
      <Rank circle="8000번째 가입자" id=""></Rank>
      <Rank circle="2000, 4000, 6000번째 가입자" id=""></Rank>
      <Rank circle="위킨박스 당첨자" id=""></Rank>
      <Rank circle="위킨박스 당첨자" id=""></Rank>
    </div>
    <div class="how-to">
      <div class="title">
        <span>참여방법</span>
      </div>
      <div class="order">
        <a>01</a><span>신규가입 또는 로그인</span>
      </div>
      <div class="order">
        <a>02</a><span>친구를 초대할 고유 URL 발급</span>
      </div>
      <div class="order">
        <a>03</a><span>내 고유 URL를 통해 새롭게 회원가입</span>
      </div>
      <div class="order">
        <a>04</a><span>응모완료</span>
      </div>
    </div>
  </div>
</template>


<script>
import api from 'api'
import moment from 'moment'
import Rank from './rank-component.vue'

export default {
  data() {
    return {
    }
  },
  components: {
    Rank
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

.invite-event-landing {
  background-image: url("./../../../static/images/bg-min.png");
  font-size: 20px;
  padding: 30px;
}
@media only screen and (max-width: 548px) {
  .invite-event-landing {
    font-size: 13px;
    padding-top: 30px;
    padding-left: 16px;
    padding-right: 16px;
  }
}
.header {
  text-align: center;
  max-width: 1920px;
  width: 90%;
  margin: auto auto;
  margin-top: 110px;
}
.header h2 {
  font-size: 5em;
  font-weight: 900;
  line-height: 1.25;
  color: #f7d532;
  text-shadow: 0 2px 0 #18654f;
  font-family: 'TmonWeb';
}
.header p {
  font-family: NanumSquareOTFEB;
  font-size: 2em;
  line-height: 1.52;
  text-align: center;
  color: #ffffff;
  margin-bottom: 0;
}
.line {
  width: 1053px;
  height: 3px;
  border: solid 2px #8184a1;
  margin: 30px auto;
}
.content {
  text-align: center;
}
.content .intro {
  font-family: NanumSquareOTFEB;
  font-size: 1.5em;
  line-height: 1.0;
  text-align: center;
  color: #ffffff;
  margin: 49px auto;
}
.content .intro span {
  color: #f7d532;
}
.content .count-down a {
  width: 75px;
  height: 90px;
  border-radius: 10px;
  background-color: #6857b2;
  font-family: NanumSquareOTFEB;
  font-size: 1.2em;
  line-height: 90px;
  text-align: center;
  color: #ffffff;
  display:inline-block;
  margin-left: 15px;
}
@media only screen and (max-width: 548px) {
  .content .count-down a {
    width: 38px;
    height: 46px;
    border-radius: 10px;
    background-color: #6857b2;
    font-family: NanumSquareOTFEB;
    font-size: 1.2em;
    line-height: 45px;
    text-align: center;
    color: #ffffff;
    display:inline-block;
    margin-left: 3px;
  }
}
.content .count-down {
  font-family: NanumSquareOTFEB;
  font-size: 2.4em;
  line-height: 1.0;
  text-align: center;
  color: #ffffff;
}
.content .count-down span {
  font-size: 1em;
  line-height: 1.33;
  text-align: center;
  color: #8c7cd1;
}
.content .guage-bg {
  max-width: 1180px;
  width : 100% ;
  height: 40px;
  opacity: 1;
  background-color: #ffffff;
  margin: auto auto;
  position: relative;
}
.content .guage-bg .guage-bar {
  background-color: #6857b2;
  width: 50%;
  height: 40px;
}
.content .guage-bg > .guage-checker {
  position: absolute;
  width: 52px;
  height: 60px; margin-left : -26px ; font-size : 1.3em ; 
  display: inline-block; top : 0; text-align : center ; color : #fff ; padding-top : 55px
}

.content .guage-bg > .guage-checker .arrow { display : inline-block ; position : absolute ; top : 16px ; left : 50% ; ; width : 28px ; height : 32px ;  
Margin-left : -14px ; Border-bottom : solid 24px #f7d532 ; border-left : solid 14px transparent ; border-right : solid 14px transparent }

.content .guage-bg > .guage-checker:nth-child(2) { left : 20% }
.content .guage-bg > .guage-checker:nth-child(3) { left : 40% }
.content .guage-bg > .guage-checker:nth-child(4) { left : 60% }
.content .guage-bg > .guage-checker:nth-child(5) { left : 80% }

.content .guage-bg > .guage-checker:nth-child(2):after { content : "2000" }
.content .guage-bg > .guage-checker:nth-child(3):after { content : "4000" }
.content .guage-bg > .guage-checker:nth-child(4):after { content : "6000" }
.content .guage-bg > .guage-checker:nth-child(5):after { content : "8000" }

.content .time {
  margin-top: 100px;
}
.content .time p {
  max-width: 780px;
  height: 30px;
  font-family: NanumSquareOTFEB;
  font-size: 1.4em;
  text-align: center;
  color: #ffffff;
  margin: 80px auto;
  line-height: 1.0;
}
.content .time p .title {
  width: 180px;
  height: 56px;
  border-radius: 100px;
  background-color: #6857b2;
  color: white;
  padding: 3px 10px;
  font-size: 0.8em;
  line-height: 56px;
  display: inline-block;
}
@media only screen and (max-width: 548px) {
  .content .time p {
    max-width: 780px;
    height: 20px;
    font-family: NanumSquareOTFEB;
    font-size: 1.4em;
    text-align: center;
    color: #ffffff;
    line-height: 1.0;
  }
  .content .time p .title {
    width: 90px;
    height: 28px;
    border-radius: 100px;
    background-color: #6857b2;
    color: white;
    font-size: 0.8em;
    line-height: 28px;
    display: inline-block;
  }
}
.content #submit {
	width: 450px;
	height: 100px;
	border-radius: 100px;
	background-color: #eed034;
	font-family: NanumSquareOTFEB;
	font-size: 1.8em;
	line-height: 1.0;
	text-align: center;
	color: #1e245b;
}
@media only screen and (max-width: 548px) {
  .content #submit {
    width: 225px;
    height: 50px;
    border-radius: 100px;
    background-color: #eed034;
    font-family: NanumSquareOTFEB;
    font-size: 1.8em;
    line-height: 50px;
    text-align: center;
    color: #1e245b;
  }
}

.footer {
  text-align: center;
  background-color: #111326;
  position: relative;
  padding: 110px;
}
.footer .first-text p {
  width: 757px;
  font-family: NanumSquareOTFEB;
  font-size: 1.6em;
  line-height: 0.94;
  text-align: left;
  color: #ffffff;
}
.footer .first-text span {
  color: #eed034;
}
.footer .second-text {
  width: 232px;
  height: 73px;
  border-radius: 36px;
  background-color: #eed034;
  border: solid 1px #979797;
  position: absolute;
  top: 42%;
  right: 35%;
  padding: 22px 0;
}
.footer .second-text span {
  font-family: NanumSquareOTFEB;
  font-size: 1.5em;
  line-height: 1.0;
  text-align: left;
  color: #1e245b;
}
.footer .third-text {
  width: 232px;
  height: 73px;
  border-radius: 36px;
  background-color: #eed034;
  border: solid 1px #979797;
  position: absolute;
  top: 59%;
  right: 10%;
  padding: 22px 0;
}
.footer .third-text span {
  font-family: NanumSquareOTFEB;
  font-size: 1.5em;
  line-height: 1.0;
  text-align: left;
  color: #1e245b;
}
@media only screen and (max-width: 548px) {
  .footer {
    max-width: 1700px;
    width: 100%;
    text-align: center;
    background-color: #111326;
    position: relative;
    padding: 20px;
  }
  .footer .first-text p {
    max-width: 757px;
    width: 100%;
    font-family: NanumSquareOTFEB;
    font-size: 1.3em;
    line-height: 0.94;
    text-align: left;
    color: #ffffff;
  }
  .footer .first-text span {
    color: #eed034;
  }
  .footer .second-text {
    margin: 30px auto;
    width: 116px;
    height: 38px;
    border-radius: 36px;
    background-color: #eed034;
    border: solid 1px #979797;
    position: initial;
    padding: 10px 10px;
  }
  .footer .second-text span {
    font-family: NanumSquareOTFEB;
    font-size: 1.5em;
    text-align: left;
    color: #1e245b;
  }
  .footer .third-text {
    margin: 30px auto;
    width: 116px;
    height: 50px;
    border-radius: 36px;
    background-color: #eed034;
    border: solid 1px #979797;
    position: initial;
    padding: 10px 10px;
  }
  .footer .third-text span {
    font-family: NanumSquareOTFEB;
    font-size: 1.5em;
    line-height: 1.0;
    text-align: left;
    color: #1e245b;
  }
}

.how-to {
  max-width: 1920px;
  width: 100%;
  height: 476px;
  background-color: #111326;
  padding: 30px;
}
.how-to .title {
  width: 237px;
  height: 72px;
  border-radius: 100px;
  background-color: #02a477;
  text-align: center;
  padding: 26px;
  margin: 30px auto;
}
.how-to .title span {
  font-family: NanumSquareOTFEB;
  font-size:1.4em; 
  line-height: 0.79;
  text-align: center;
  color: #ffffff;
}
.how-to .order {
  display: inline-block;
}
.how-to .order a {
  width: 140px;
  height: 140px;
  background-color: #6857b2;
  border-radius: 50%;
  font-family: NanumSquareOTFEB;
  font-size: 1.25em;
  line-height: 1.2;
  text-align: center;
  color: #ffffff;
  margin-right: 10px;
}
.how-to .order span {
  width: 183px;
  height: 94px;
  font-family: NanumSquareOTFEB;
  font-size: 1.6em;
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
    font-size:1.4em; 
    line-height: 0.79;
    text-align: center;
    color: #ffffff;
  }
  .how-to .order {
    display: inline-block;
    margin-bottom: 10px;
  }
  .how-to .order a {
    width: 140px;
    height: 140px;
    background-color: #6857b2;
    border-radius: 50%;
    font-family: NanumSquareOTFEB;
    font-size: 1.5em;
    line-height: 1.2;
    text-align: center;
    color: #ffffff;
  }
  .how-to .order span {
    margin-left: 6px;
    width: 183px;
    height: 94px;
    font-family: NanumSquareOTFEB;
    font-size: 1.6em;
    line-height: 1.47;
    text-align: left;
    color: #ffffff;
  }
}

</style>
