<template>
  <!-- <div class="invite-event-landing">
    <div class='header'>
      <h2>2018 <span>만만한 챌린지</span></h2>
      <p>위킨 회원가입 시 100% 선물 지급</p>
      <p>이보다 쉬운 도전은 없다.</p>
    </div>
    <div class="line"></div>
    <div class="content">
      <p class="intro"><span class="span-block"><span class="yellow-point">10,000명의 신규회원</span>이 모이면</span> <span class="span-block">맥북에어, 아이패드 등</span> <span class="span-block"><span class="yellow-point">218개의 특급선물</span>을 쏩니다!</span></p>
      <p class="count-down">현재 <span><a>{{currentUser[0]}}</a><a>{{currentUser[1]}}</a></span> ,<span><a>{{currentUser[2]}}</a><a>{{currentUser[3]}}</a><a>{{currentUser[4]}}</a></span> 명<span class="none-at-mobile">/ <span id="10-000">10,000명</span></span></p>
      <div class="guage-bg">
        <div class="guage-bar" v-bind:style="{ width: currentUser / 100 + '%' }" ></div>
        <div class="guage-checker"><span class="arrow"></span></div>
        <div class="guage-checker"><span class="arrow"></span></div>
        <div class="guage-checker"><span class="arrow"></span></div>
        <div class="guage-checker"><span class="arrow"></span></div>
      </div>
      <div class="time">
        <p style="margin-bottom:52px;"><a class="title">이벤트 기간</a> 2월 21일 수요일 ~ 3월 11일 일요일(18일간)</p>
        <p><a class="title">당첨자 발표</a> 2018년 3월 20일(화), 위킨 홈페이지, 앱</p>
        <p class="count-down">남은시간 <span class="coutner-wrap"><a>{{ countDownHours[0] }}</a><a>{{ countDownHours[1] }}</a><a>{{ countDownHours[2] }}</a><span style="color:white; margin-left:8px;">:</span><a>{{ countDownMinutes[0] }}</a><a>{{ countDownMinutes[1] }}</a><span style="color:white; margin-left:8px;">:</span><a>{{ countDownSeconds[0] }}</a><a>{{ countDownSeconds[1] }}</a></span></p>
        <button id="submit" @click="goTo('ranking')">이벤트 참여하기</button>
      </div>
    </div>
    <div class="footer">
      <div class="first-text">
        <p>앱 설치하고 + 회원가입 하면 즉시 <span class="none-at-mobile">=</span> <span class="span-block">10,000 point</span></p>
        <p>초대한 친구 회원가입 1명당(무제한) <span class="none-at-mobile">=</span> <span class="span-block">2,000 point</span></p>
      </div>
      <div class="third-text">
        <img src="./../../../static/images/event/cellphone.png">
        <span>위킨앱 다운로드</span>
      </div>
    </div>
    <div class="ranking">
      <div class="wrap">
        <Rank circle="랭킹 1등" i='1' :id="ranking[0] ? ranking[0].email : '정보없음'" img="./../../../static/images/event/macbook-min.png" style="display:inline-block;"></Rank>
        <Rank circle="랭킹 2등" i='2' :id="ranking[1] ? ranking[1].email : '정보없음'" img="./../../../static/images/event/ipad-min.png" style="display:inline-block;"></Rank>
        <Rank circle="랭킹 3등" i='3' :id="ranking[2] ? ranking[2].email : '정보없음'" img="./../../../static/images/event/nintendo-min.png" style="display:inline-block;"></Rank>
        <div class="rank">
          <div class="circle"><span class="circle-inner">8000번째 가입자</span></div>
          <div class="item-img">
            <img src="./../../../static/images/event/giftcard-1.svg">
          </div>
        </div>
        <div class="rank">
          <div class="circle"><span class="circle-inner multi"><span class="span-block">2000</span><span class="span-block">4000</span><span class="span-block">6000</span>번째 가입자</span></div>
          <div class="item-img">
            <img src="./../../../static/images/event/giftcard-2.svg">
          </div>
        </div>
        <div class="rank">
          <div class="circle"><span class="circle-inner">위킨박스 당첨자</span></div>
          <div class="item-img">
            <img src="./../../../static/images/event/giftcard-3.svg">
          </div>
        </div>
        <div class="rank">
          <div class="circle"><span class="circle-inner">위킨박스 당첨자</span></div>
          <div class="item-img coffee">
            <img src="./../../../static/images/event/coffee-min.png">
          </div>
        </div>
      </div>
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
  </div> -->
  <div class="whole">
    <section class="section-01 section">
      <div class="container">

        <div class="title-box">
          <h2 class="event-title">2018 <span class="event-title-span">만만한 챌린지</span></h2>
          <p>위킨 회원가입 시 100% 선물 지급</p>
          <p>이보다 쉬운 도전은 없다.</p>
        </div>

        <div class="content-01-box">
          <p class="sub-title not-mobile"><span class="y-point">10,000명의 신규회원</span>이 모이면 맥북에어, 아이패드 등 <span class="y-point">218개의 특급선물</span>을 쏩니다!</p>
          <div class="sub-title only-mobile">
            <p><span class="y-point">10,000명의 신규회원</span>이 모이면</p>
            <p>맥북에어, 아이패드 등</p>
            <p><span class="y-point">218개의 특급선물</span>을 쏩니다!</p>
          </div>

          <div class="count-box">
            <div class="inf-row">
              <div class="inf-col inf-col-left">
                <span>현재</span>
              </div>
              <div class="inf-col num-card-wrap inf-col-center">
                <div class="num-card">9</div>
                <div class="num-card">9</div>
                <div class="num-card dot">,</div>
                <div class="num-card">9</div>
                <div class="num-card">9</div>
                <div class="num-card">9</div>
              </div>
              <div class="inf-col inf-col-right">
                <span>명</span>
              </div>
            </div>
          </div>

          <div class="graph-box">
            <div class="graph">
              <div class="graph-fill"></div>
            </div>
            <div class="pointer-wrap">
              <div class="pointers">
                <div class="tri"><img src="./../../../static/images/event/triangle.svg" alt=""></div>
                <div class="tri"><img src="./../../../static/images/event/triangle.svg" alt=""></div>
                <div class="tri"><img src="./../../../static/images/event/triangle.svg" alt=""></div>
                <div class="tri"><img src="./../../../static/images/event/triangle.svg" alt=""></div>
                <div class="tri"></div>
              </div>
              <div class="pointer-num">
                <div class="tri"><div class="num">2000</div></div>
                <div class="tri"><div class="num">4000</div></div>
                <div class="tri"><div class="num">6000</div></div>
                <div class="tri"><div class="num">8000</div></div>
                <div class="tri"></div>
              </div>
            </div>
          </div>

          <div class="date-info-box">
            <table class="not-mobile">
              <tr>
                <th><div class="th-title">이벤트 기간</div></th>
                <td>기간: 2월 22일 (목요일) ~ 3월 11일 (일요일)</td>
              </tr>
              <tr>
                <th><div class="th-title">당첨자 발표</div></th>
                <td>2018년 3월 20일 (화요일), 위킨 홈페이지 및 앱</td>
              </tr>
            </table>
            <table class="only-mobile">
              <tr><th><div class="th-title">이벤트 기간</div></th></tr>
              <tr><td>기간: 2월 22일 (목요일) ~ 3월 11일 (일요일)</td></tr>
              <tr><th><div class="th-title">당첨자 발표</div></th></tr>
              <tr><td>2018년 3월 20일 (화요일), 위킨 홈페이지 및 앱</td></tr>
            </table>
          </div>

          <div class="time-count-box">
            <div class="inf-row">
              <div class="inf-col inf-col-20 rest-time">
                <span>남은시간</span>
              </div>
              <div class="inf-col inf-col-80 time-cards">
                <div class="num-card">9</div>
                <div class="num-card">9</div>
                <div class="num-card">9</div>
                <div class="num-card dot">:</div>
                <div class="num-card">9</div>
                <div class="num-card">9</div>
                <div class="num-card dot">:</div>
                <div class="num-card">9</div>
                <div class="num-card">9</div>
              </div>
            </div>
          </div>

          <div class="apply-btn-box">
            <button class="apply-btn">이벤트 참여하기</button>
          </div>
        </div>
      </div>
    </section>
    <section class="section-02 section">
      <div class="container">
        <div class="inf-col inf-col-70">
          <div class="inf-col inf-col-60 p-wrap">
            <div class="p-wrap-wrap">
              <p>앱 설치하고 + 회원가입 하면 즉시 = <span class="y-point">10,000 point</span></p>
              <p>회원가입 친구 1명당(무제한) = <span class="y-point">2,000 point</span></p>
            </div>
          </div>
          <div class="inf-col inf-col-30">
            <div class="round">100% 증정</div>
          </div>
        </div>
        <div class="inf-col inf-col-30 down-wrap">
          <button class="down-btn">
            <img class="phone-img" src="./../../../static/images/event/cellphone.png" alt="">
            <div class="down">위킨앱 다운로드</div>
          </button>
        </div>
      </div>
    </section>
    <section class="section-03 section">
      <div class="container">
        <div>
          <div class="inf-col inf-col-50 rank-wrap">
            <div class="rank-item">
              <div class="rank-header">
                <div class="inf-col inf-col-40">
                  <div class="rank-circle">
                    <span class="rank-circle-inner">랭킹 1등</span>
                  </div>
                </div>
                <div class="inf-col inf-col-60 rank-name-col">
                  <div class="rank-name-wrap">
                    <p>현재 1위</p>
                    <p>*****</p>
                  </div>
                </div>
              </div>
              <div class="rank-body">
                <div class="body-inner">
                  <img class="macbook" src="./../../../static/images/event/macbook-min.png" alt="">
                  <div></div>
                  <p>Macbook Air</p>
                </div>
              </div>
            </div>
          </div>
          <div class="inf-col inf-col-50 rank-wrap">
            <div class="rank-item">
              <div class="rank-header">
                <div class="inf-col inf-col-40">
                  <div class="rank-circle">
                    <span class="rank-circle-inner">랭킹 2등</span>
                  </div>
                </div>
                <div class="inf-col inf-col-60 rank-name-col">
                  <div class="rank-name-wrap">
                    <p>현재 2위</p>
                    <p>*****</p>
                  </div>
                </div>
              </div>
              <div class="rank-body">
                <div class="body-inner">
                  <img class="ipad" src="./../../../static/images/event/ipad-min.png" alt="">
                  <div></div>
                  <p>iPad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="inf-col inf-col-50 rank-wrap">
            <div class="rank-item">
              <div class="rank-header">
                <div class="inf-col inf-col-40">
                  <div class="rank-circle">
                    <span class="rank-circle-inner">랭킹 3등</span>
                  </div>
                </div>
                <div class="inf-col inf-col-60 rank-name-col">
                  <div class="rank-name-wrap">
                    <p>현재 1위</p>
                    <p>*****</p>
                  </div>
                </div>
              </div>
              <div class="rank-body">
                <div class="body-inner">
                  <img class="nintendo" src="./../../../static/images/event/nintendo-min.png" alt="">
                  <div></div>
                  <p>닌텐도 스위치</p>
                </div>
              </div>
            </div>
          </div>
          <div class="inf-col inf-col-50 rank-wrap">
            <div class="rank-item">
              <div class="rank-header">
                <div class="inf-col inf-col-40">
                  <div class="rank-circle">
                    <span class="rank-circle-inner">8000번째 <span class="span-block">가입자</span></span>
                  </div>
                </div>
                <div class="inf-col inf-col-60 rank-name-col"></div>
              </div>
              <div class="rank-body">
                <div class="body-inner">
                  <img class="giftcard" src="./../../../static/images/event/giftcard-1.svg" alt="">
                  <div></div>
                  <p>신세계 상품권 10만원</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="inf-col inf-col-50 rank-wrap">
            <div class="rank-item">
              <div class="rank-header">
                <div class="inf-col inf-col-40">
                  <div class="rank-circle">
                    <span class="rank-circle-inner smaller">
                      <span class="span-block">2000번째</span>
                      <span class="span-block">4000번째</span>
                      <span class="span-bloc6">6000번째</span>
                    </span>
                  </div>
                </div>
                <div class="inf-col inf-col-50 rank-name-col"></div>
              </div>
              <div class="rank-body">
                <div class="body-inner">
                  <img class="giftcard" src="./../../../static/images/event/giftcard-2.svg" alt="">
                  <div></div>
                  <p>CJ외식 상품권 5만원</p>
                </div>
              </div>
            </div>
          </div>
          <div class="inf-col inf-col-50 rank-wrap">
            <div class="rank-item">
              <div class="rank-header">
                <div class="inf-col inf-col-40">
                  <div class="rank-circle">
                    <span class="rank-circle-inner">위킨박스 <span class="span-block">당첨자</span></span>
                  </div>
                </div>
                <div class="inf-col inf-col-60 rank-name-col"></div>
              </div>
              <div class="rank-body">
                <div class="body-inner">
                  <img class="giftcard" src="./../../../static/images/event/giftcard-3.svg" alt="">
                  <div></div>
                  <p>스타벅스 기프트 카드 1만원</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="inf-col inf-col-100">
            <div class="rank-item">
              <div class="rank-header">
                <div class="inf-col inf-col-100">
                  <div class="rank-circle">
                    <span class="rank-circle-inner">위킨박스 <span class="span-block">당첨자</span></span>
                  </div>
                </div>
              </div>
              <div class="rank-body">
                <div class="body-inner">
                  <img class="coffee" src="./../../../static/images/event/coffee-min.png" alt="">
                  <div></div>
                  <p>스타벅스 아메리카노</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section-04 section">
      <div class="container">

      </div>
    </section>
  </div>
</template>


<script>
import api from 'api'
import moment from 'moment'
import Rank from './rank-component.vue'

export default {
  data() {
    return {
      currentUser: '00000',
      leftTime: '',
      ranking: {}
    }
  },
  computed: {
    countDownHours() {
      switch(String(this.leftTime / 3600 | 0).length) {
        case 3:
          return String(this.leftTime / 3600 | 0)
          break
        case 2:
          return '0' + String(this.leftTime / 3600 | 0)
          break
        case 1:
          return '00' + String(this.leftTime / 3600 | 0)
          break
      }
    },
    countDownMinutes() {
      switch(String((this.leftTime / 60 | 0) % 60).length) {
        case 1:
          return '0' + String((this.leftTime / 60 | 0) % 60)
          break
        case 2:
          return String((this.leftTime / 60 | 0) % 60)
          break
      }
    },
    countDownSeconds() {
      switch(String(this.leftTime % 60).length) {
        case 1:
          return '0' + String(this.leftTime % 60)
          break
        case 2:
          return String(this.leftTime % 60)
          break
      }
    },
  },
  components: {
    Rank
  },
  methods: {
    goTo(where) {
      this.$router.push('/event/invite-friend/ranking')
    }
  },
  filters: {
  },
  created() {
    window.setInterval(() => {
      this.leftTime = moment('2018-03-11').set('hour', 23).set('minute', 59).set('second', 59).unix() - moment().unix()
    }, 1000)
    if (this.$route.params.user_key) {
      api.inviteNewUserLanding(this.$route.params.user_key)
        .then(result => {
          return api.getCurrentJoinedUsersCount()
        })
        .then(count => {
          count = String(count)
          switch(count.length) {
            case 1:
              this.currentUser = '0000' + count
              break
            case 2:
              this.currentUser = '000' + count
              break
            case 3:
              this.currentUser = '00' + count
              break
            case 4:
              this.currentUser = '0' + count
              break
            case 5:
              this.currentUser = count
              break
          }
          return api.getInviteEventRanking()
        })
        .then(result => {
          this.ranking = result
        })
        .catch(e => console.log(e))
    } else {
      api.getCurrentJoinedUsersCount()
        .then(count => {
          count = String(count)
          switch(count.length) {
            case 1:
              this.currentUser = '0000' + count
              break
            case 2:
              this.currentUser = '000' + count
              break
            case 3:
              this.currentUser = '00' + count
              break
            case 4:
              this.currentUser = '0' + count
              break
            case 5:
              this.currentUser = count
              break
          }
          return api.getInviteEventRanking()
        })
        .then(result => {
          this.ranking = result
        })
        .catch(e => console.log(e))
    }
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

// 공통 --- START
p, span, div, button {
  font-family: 'NanumSquareOTFEB';
  font-weight: bold;
  color: #fff;
}

button {
  border: 0;
  background-color: transparent;
}

.whole {
  width: 100%;
  height: 100%;
}

.section {
  padding: 50px 0;
}

.y-point {
  color: #f7d532;
}

.container {
  margin: auto;
}

.num-card {
  color: #fff;
  border-radius: 10px;
  background-color: #6857b2;
}

.span-block {
  display: block;
}

.section-01 {
  padding-top: 150px;
  text-align: center;
  background-image: url("./../../../static/images/bg-min.png");
  background-size: cover;

  .event-title, .event-title-span {
    font-family: 'TmonWeb';
    color: #f7d532;
    text-shadow: 0 2px 0 #18654f;
  }
  .event-title {
    margin-bottom: 25px;
  }

  .title-box {
    margin: auto;
    border-bottom: 2px solid #8184a1;
    padding-bottom: 30px;
  }

  .content-01-box {
    padding: 30px 0;
  }

  .apply-btn {
    color: #1e245b;
    background-color: #eed034;
  }
}

.section-02 {
  background-color: #111326;

  .inf-col {
    p {
      padding-left: 15px;
    }
  }

  .round,
  .down {
    color: #1e245b;
    text-align: center;
    border-radius: 36px;
    background-color: #eed034;
  }
}

.section-03 {
  background-color: #202345;

  .rank-circle {
    text-align: center;
    border-radius: 100%;
    background-color: #eed034;
    span {
      color: #1e245b;
    }
  }

  .rank-body {
    p {
      display: inline-block;
      padding: 0 1px;
      border-bottom: 1px solid #fff;
    }
  }
}
// 공통 --- END

/* Mobile Devices 모바일 */
@media only screen and (max-width : 767px) {

  .whole {
    background-color: skyblue;
  }

  .not-mobile {
    display: none;
  }

  .section-01 {
    .event-title {
      font-size: 50px;
    }
    .event-title-span {
      display: block;
    }
    .title-box {
      p {
        font-size: 18px;
      }
    }

    .content-01-box {
      .sub-title {
        font-size: 16px;
      }

      .count-box {
        margin-top: 30px;
      }

      .inf-row,
      .inf-col,
      .num-card-wrap,
      .num-card {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .inf-col {
        span {
          font-size: 18px;
        }
      }

      .num-card-wrap {
        margin: 0 10px;
      }

      .num-card {
        width: 40px;
        height: 55px;
        margin-right: 5px;
        font-size: 30px;

        &.dot {
          width: 8px;
          background-color: transparent;
        }
        &:last-child {
          margin-right: 0;
        }
      }

      .graph-box {
        padding: 0 15px;

        .graph {
          width: 100%;
          background-color: #fff;
          opacity: 0.7;
        }
        .graph-fill {
          height: 20px;
          background-color: #6857b2;
        }

        .pointer-wrap {
          margin-top: -5px;
        }

        .pointers,
        .pointer-num {
          display: flex;
        }

        .tri {
          position: relative;
          flex: 1;

          img,
          .num {
            position: absolute;
            right: 0;
            transform: translateX(50%);
          }
          img {
            width: 16px;
          }
          .num {
            padding-top: 12px;
            font-size: 12px;
          }
        }
      }

      .date-info-box {
        table {
          width: 100%;
        }
        th {
          display: flex;
          justify-content: center;
        }
        .th-title {
          width: 120px;
          height: 30px;
          line-height: 30px;
          border-radius: 100px;
          background-color: #6857b2;
        }
      }

      .apply-btn-box {
        .apply-btn {
          width: 170px;
          height: 50px;
          font-size: 20px;
          border-radius: 100px;
        }
      }
    }
  }

  .section-02 {
    padding-right: 15px;
    padding-left: 15px;
    text-align: center;

    .round {
      width: 120px;
      height: 30px;
      margin: auto;
      line-height: 30px;
    }

    .down-btn {
      width: 100%;
      padding: 30px 0;
      background-color: #0b0c19;

      .phone-img {
        width: 100px;
      }
      .down {
        position: relative;
        z-index: 100;
        width: 140px;
        height: 30px;
        margin: auto;
        margin-top: -10px;
        line-height: 30px;
      }
    }
  }

  .section-03 {
    .container {
      text-align: center;
    }
    .rank-circle {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      width: 80px;
      height: 80px;
      .rank-circle-inner {
        font-size: 14px;
      }
    }
    .rank-body {
      .macbook {
        width: 200px;
      }
      .ipad {
        width: 120px;
      }
      .nintendo {
        width: 220px;
      }
      .giftcard {
        width: 170px;
      }
      .coffee {
        width: 150px;
      }
    }
  }
}

/* Small Devices 태블릿 */
@media only screen and (min-width : 768px) {
  .whole {
    background-color: green;
  }

  .container {
    width: 800px;
  }

  .only-mobile {
    display: none;
  }

  .inf-col {
    float: left;
    background-color: skyblue;
    border: 1px solid tomato;
    box-sizing: border-box;
  }

  .inf-col-10 {
    width: 10%;
  }
  .inf-col-20 {
    width: 20%;
  }
  .inf-col-30 {
    width: 30%;
  }
  .inf-col-40 {
    width: 40%;
  }
  .inf-col-50 {
    width: 50%;
  }
  .inf-col-60 {
    width: 60%;
  }
  .inf-col-70 {
    width: 70%;
  }
  .inf-col-80 {
    width: 80%;
  }
  .inf-col-90 {
    width: 90%;
  }
  .inf-col-100 {
    width: 100%;
  }


  .num-card-wrap, .num-card {
    float: left;

    span {
      display: inline-block;
    }
  }

  .section-01 {
    .event-title {
      font-size: 80px;
    }
    .title-box {
      p {
        font-size: 18px;
      }
    }

    .content-01-box {
      .sub-title {
        font-size: 18px;
      }

      .count-box {
        height: 85px;
        margin-top: 40px;
      }

      .inf-col {
        span {
          height: 85px;
          line-height: 85px;
          font-size: 32px;
        }
      }

      .inf-col-left,
      .inf-col-right {
        width: 20%;
      }

      .inf-col-left {
        text-align: right;
      }
      .inf-col-right {
        text-align: left;
      }

      .num-card-wrap {
        width: 60%;
        padding-left: 35px;
      }

      .num-card {
        width: 70px;
        height: 85px;
        margin-right: 10px;
        line-height: 85px;
        font-size: 50px;

        &.dot {
          width: 10px;
          background-color: transparent;
        }
        &:last-child {
          margin-right: 0;
        }
      }

      .graph-box {
        margin: 60px 0;
      }
      .graph {
        opacity: 0.7;
        background-color: #ffffff;
      }
      .graph-fill {
        height: 30px;
        background-color: #6857b2;
      }
      .pointer-wrap {
        margin-top: -8px;
      }
      .tri {
        position: relative;
        float: left;
        width: 20%;
        height: 20px;
        text-align: right;

        img {
          width: 20px;
          margin-right: -10px;

          &::after {
            content: '';
            display: block;
            width: 40px;
            height: 20px;
          }
        }
        .num {
          position: absolute;
          right: 0;
          transform: translateX(50%);
        }
      }

      .date-info-box {
        table {
          width: 100%;
          font-size: 18px;
        }
        tr {
          height: 68px;
        }
        th, td {
          // padding-bottom: 20px;
        }
        th {
          position: relative;
          width: 35%;
        }
        td {
          width: 65%;
          padding-left: 15px;
          text-align: left;
        }
        .th-title {
          position: absolute;
          top: 50%;
          right: 15px;
          transform: translateY(-50%);
          width: 150px;
          height: 38px;
          line-height: 38px;
          border-radius: 100px;
          background-color: #6857b2;
        }
      }

      .apply-btn-box {
        .apply-btn {
          width: 300px;
          height: 60px;
          font-size: 24px;
          border-radius: 100px;
        }
      }
    }
  }

  .section-02 {
    .container {
      height: 150px;
    }
    .inf-col {
      position: relative;
      height: 150px;

      .p-wrap {
        position: relative;
      }

      .p-wrap-wrap {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }

      p {
        height: 40px;
        margin-bottom: 0;
        line-height: 40px;
      }

      .round {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-60%, -50%);
        width: 120px;
        height: 30px;
        line-height: 30px;
      }
    }
    .down-wrap {
      height: 150px;
      background-color: #0b0c19;
    }
    .down-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -55%);
      .phone-img {
        width: 80px;
      }
      .down {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%);
        width: 140px;
        height: 30px;
        line-height: 30px;
      }
    }
  }

  .section-03 {
    .container {
      height: 1160px;
    }
    .rank-wrap {
      margin-bottom: 20px;
      padding: 0 30px;
    }
    .inf-col {
      position: relative;
    }
    .rank-header {
      height: 80px;
    }
    .rank-circle {
      position: absolute;
      right: 0;
      width: 80px;
      height: 80px;
      .rank-circle-inner {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;

        &.smaller {
          span {
            font-size: 12px;
          }
        }
      }
    }
    .rank-name-col {
      height: 80px;
    }
    .rank-name-wrap {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      padding-left: 20px;
    }
    .rank-body {
      position: relative;
      height: 180px;
      text-align: center;
      .body-inner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        p {
          margin-top: 10px;
        }
      }
      .macbook {
        width: 200px;
      }
      .ipad {
        width: 83px;
      }
      .nintendo {
        width: 220px;
      }
      .giftcard {
        width: 150px;
      }
      .coffee {
        width: 140px;
      }
    }
    .inf-col-100 {
      .rank-item {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 50%;
      }
      .rank-circle {
        left: 50%;
        transform: translateX(-50%);
      }
      .rank-body {
        height: 220px;
      }
    }
  }
}

/* Medium Devices 데스크탑 */
@media only screen and (min-width : 992px) {
  .whole {
    background-color: palegoldenrod;

    .container {
      width: 1000px;
    }
  }

  .section-01 {
    .event-title {
      font-size: 100px;
    }
    .title-box {
      width: 900px;
      p {
        font-size: 24px;
      }
    }

    .content-01-box {
      .sub-title {
        font-size: 20px;
      }

      .count-box {
        height: 90px;
        margin-top: 55px;
      }
      .inf-col {
        span {
          height: 90px;
          line-height: 90px;
          font-size: 38px;
        }
      }
      .inf-col-left,
      .inf-col-right {
        width: 25%;
      }
      .inf-col-left {
        text-align: right;
      }
      .inf-col-right {
        text-align: left;
      }
      .num-card-wrap {
        position: relative;
        width: 50%;
        padding-left: 35px;
        text-align: center;
      }
      .num-card {
        width: 75px;
        height: 90px;
        margin-right: 10px;
        line-height: 90px;
        font-size: 52px;

        &.dot {
          width: 10px;
          background-color: transparent;
        }
        &:last-child {
          margin-right: 0;
        }
      }

      .graph-box {
        margin: 60px 0;
      }
      .graph {
        opacity: 0.7;
        background-color: #ffffff;
      }
      .graph-fill {
        height: 30px;
        background-color: #6857b2;
      }
      .pointer-wrap {
        margin-top: -8px;
      }
      .tri {
        position: relative;
        float: left;
        width: 20%;
        height: 20px;
        text-align: right;

        img {
          width: 20px;
          margin-right: -10px;

          &::after {
            content: '';
            display: block;
            width: 40px;
            height: 20px;
          }
        }
        .num {
          position: absolute;
          right: 0;
          transform: translateX(50%);
        }
      }

      .date-info-box {
        table {
          font-size: 20px;
        }
        tr {
          height: 78px;
        }
        th {
          width: 40%;
        }
        td {
          width: 60%;
          padding-left: 20px;
        }
        .th-title {
          right: 20px;
        }
      }

      .time-count-box {
        .rest-time {
          width: 30%;
        }
        .time-cards {
          width: 70%;
        }
      }

      .apply-btn-box {
        .apply-btn {
          width: 380px;
          height: 70px;
          font-size: 24px;
          border-radius: 100px;
        }
      }
    }
  }

  .section-02 {
    .container {
      height: 200px;
    }
    .inf-col {
      height: 200px;
    }
    .p-wrap {
      p {
        margin: 10px 0;
        font-size: 18px;
      }
    }
    .down-btn {
      .phone-img {
        width: 100px;
      }
      .down {
        width: 160px;
      }
    }
  }

  .section-03 {

  }
}

// /* Large Devices, Wide Screens */
// @media only screen and (min-width : 1200px) {
//   .whole {
//     background-color: blue;
//   }
// }

// .invite-event-landing {
//   background-image: url("./../../../static/images/bg-min.png");
//   font-size: 20px;
//   padding: 30px;
// }

// @media only screen and (max-width: 548px) {
//   // .content #submit {
//   // cursor: pointer;
//   //   width: 225px;
//   //   height: 50px;
//   //   border-radius: 100px;
//   //   background-color: #eed034;
//   //   font-family: NanumSquareOTFEB;
//   //   font-size: 1.8em;
//   //   line-height: 50px;
//   //   text-align: center;
//   //   color: #1e245b;
//   // }

//   .none-at-mobile {
//     display: none;
//   }

//   .invite-event-landing {
//     background-image: url('./../../../static/images/event/influencer-bg.png');
//     .header {
//       h2 {
//         font-size: 54px;
//         margin-bottom: 30px;

//         span {
//           display: block;
//         }
//       }
//       p {
//         font-size: 22px;
//         font-weight: bold;
//       }
//     }

//     .line {
//       width: 100%;
//       border-width: 1px;
//     }

//     .content {
//       .intro {
//         padding: 0 10px;
//         font-size: 20px;
//         line-height: 1.5;

//         .span-block {
//           display: block;
//         }
//       }

//       .count-down {
//         margin-bottom: 28px;
//         font-size: 20px;
//       }

//       .guage-bg {
//         height: 20px;

//         .guage-bar {
//           height: 20px;
//         }
//         .guage-checker {
//           height: 20px;
//           padding-top: 28px;
//           font-size: 14px;

//           .arrow {
//             top: -5px;
//             width: 14px;
//             margin-left: -7px;
//             padding-bottom: 0;
//             border-bottom-width: 10px;
//             border-left-width: 7px;
//             border-right-width: 7px;
//           }
//         }
//       }

//       .time {
//         p {
//           text-align: center;
//         }
//         .title {
//           display: block;
//           width: 120px;
//           height: 36px;
//           line-height: 34px;
//           margin: auto;
//           margin-bottom: 20px;
//         }
//         .count-down {
//           margin-bottom: 100px;
//           .coutner-wrap {
//             margin-top: 16px;
//             display: block;
//           }
//         }
//         #submit {
//           width: 80%;
//           height: 50px;
//         }
//       }
//     }

//     .footer {
//       margin-top: 50px !important;
//       margin-bottom: 12px;
//       padding: 50px 0;
//       .first-text {
//         font-size: 12px;

//         p {
//           margin-bottom: 50px;
//           text-align: center;
//         }

//         .span-block {
//           display: block;
//           margin-top: 10px;
//         }
//       }
//       .third-text {
//         margin: auto;
//         margin-top: -10px;
//         padding: 0;
//         height: 38px;
//         border: 0;
//         background-color: #02a477;
//         span {
//           display: block;
//           width: 100%;
//           height: 38px;
//           line-height: 38px;
//           text-align: center;
//           color: #fff;
//           font-size: 14px;
//           font-weight: bold;
//         }
//       }
//     }

//     .ranking {
//       .rank {
//         .circle {
//           span {
//             font-size: 18px;
//             font-weight: bold;
//           }
//           .circle-inner {
//             width: 100%;
//             position: absolute;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             padding: 0 10px;

//             &.multi {
//               font-size: 14px;
//             }
//           }
//         }
//         .span-block {
//           display: block;
//         }
//         .item-img {
//           margin-top: 120px;

//           &.coffee {
//             img {
//               width: 50%;
//             }
//           }
//         }
//       }
//     }

//     .how-to {
//       margin-top: 12px;
//       height: auto;
//       .title {
//         height: 40px;
//         padding: 0;
//         span {
//           display: block;
//           height: 40px;
//           line-height: 40px;
//         }
//       }
//       .order {
//         margin-bottom: 10px;
//         a {
//           display: inline-block;
//           width: 30px;
//           height: 30px;
//           line-height: 30px;
//         }
//         span {
//           font-size: 16px;
//         }
//       }
//     }
//   }
// }


</style>
