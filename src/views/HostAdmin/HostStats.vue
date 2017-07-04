<template>
  <div>
    <host-stats-bar></host-stats-bar>
    <div class="ui card">
      <div class="header">총 수입</div>
      <div class="content">
        <div class="ui selection dropdown month">
          <label>월 선택</label>
          <input name="gender" type="hidden" :value="defaultMonth">
          <i class="dropdown icon"></i>
          <div class="text">전체</div>
          <div class="menu">
            <div class="item" :data-value="index + 1" v-for="(date, index) in 12" v-bind:key="index">{{index + 1}}월</div>
          </div>
        </div>
      </div>
      <div class="ui horizontal half segments">
        <div class="ui segment">
          <div class="value">₩{{commission.total | joinComma}}</div>
          <div class="label">총 수입</div>
        </div>
        <div class="ui segment">
          <div class="value">{{commission.commission | joinComma}}</div>
          <div class="label">수수료</div>
        </div>
        <div class="ui segment">
          <div class="value">{{commission.result | joinComma}}</div>
          <div class="label">지급예정</div>
        </div>
      </div>
    </div>
    <div class="ui card">
      <div class="header">조회수</div>
      <div class="ui horizontal half segments">
        <div class="ui segment">
          <div class="value">{{count || 0}}</div>
          <div class="label">전체 조회수</div>
        </div>
        <div class="ui segment">
          <div class="value">{{reservationCount || 0}}</div>
          <div class="label">전체 예약수</div>
        </div>
        <div class="ui segment">
          <div class="value">{{ (((reservationCount / count) * 100).toFixed(2)) || 0 }}%</div>
          <div class="label">예약률</div>
        </div>
      </div>
    </div>
    <canvas id="viewChart" width="400" height="200"></canvas>
    <div class="ui card rating-container">
      <div class="header">평점</div>
      <div class="content">
        <div class="stats">
          <div class="value color secondary">{{ratingAvg}}</div>
          <div class="ui star rating" :data-rating="ratingUIAvg"></div>
          <div class="counter">총 {{ratings.length || 0}}명</div>
        </div>
        <div class="graph">
          <span>
            <i class="icon star color primary"></i>1
          </span>
          <div class="ui teal progress" :data-value="ratingsProgress.one" :data-total="ratings.length" id="rating1">
            <div class="bar">{{ratingsProgress.one}}</div>
          </div>
          <span>
            <i class="icon star color primary"></i>2
          </span>
          <div class="ui teal progress" :data-value="ratingsProgress.two" :data-total="ratings.length" id="rating2">
            <div class="bar">{{ratingsProgress.two}}</div>
          </div>
          <span>
            <i class="icon star color primary"></i>3
          </span>
          <div class="ui teal progress" :data-value="ratingsProgress.three" :data-total="ratings.length" id="rating3">
            <div class="bar">{{ratingsProgress.three}}</div>
          </div>
          <span>
            <i class="icon star color primary"></i>4
          </span>
          <div class="ui teal progress" :data-value="ratingsProgress.four" :data-total="ratings.length" id="rating4">
            <div class="bar">{{ratingsProgress.four}}</div>
          </div>
          <span>
            <i class="icon star color primary"></i>5
          </span>
          <div class="ui teal progress" :data-value="ratingsProgress.five" :data-total="ratings.length" id="rating5">
            <div class="bar">{{ratingsProgress.five}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import hostStatsBar from './HostStatsBar.vue'
import api from 'api'
import Chart from 'chart.js'
import moment from 'moment'

export default {
  data() {
    return {
      commission: {
        total: 0,
        commission: 0,
        result: 0
      },
      count: 0,
      ratings: [],
      ratingsProgress: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0
      },
      defaultMonth: 1,
      ratingAvg: 0,
      ratingUIAvg: 0,
      reservations: [],
      reservationCount: 0,
      chartData: [] // 통계 날짜 데이터
    }
  },
  components: {
    hostStatsBar
  },
  methods: {
    getCountAllWekin() {
      api.getCountAllWekin(this.user.Host.host_key)
        .then(count => this.count = count)
        .catch(error => console.error(error))
    },
    getReservation() {
      api.getMakerReservation(this.user.Host.host_key)
        .then((json) => {
          json.results.forEach(reservation => this.reservationCount += Number(reservation.count))
          this.reservations = json.results

          this.initChart()
        }).catch((error) => console.error(error))
    },
    getCommission(month) {
      api.getCommission(this.user.Host.host_key, month)
        .then((commission) => this.commission = commission)
        .catch((error) => console.error(error))
    },
    getMakerRating() {
      api.getMakerRatings(this.user.Host.host_key)
        .then(json => {
          let ratings = json.results
          this.ratingsProgress.one = this.findAndCountRating(ratings, 1)
          this.ratingsProgress.two = this.findAndCountRating(ratings, 2)
          this.ratingsProgress.three = this.findAndCountRating(ratings, 3)
          this.ratingsProgress.four = this.findAndCountRating(ratings, 4)
          this.ratingsProgress.five = this.findAndCountRating(ratings, 5)

          if (ratings.length) {
            let ratingSum = 0
            ratings.forEach(rating => { ratingSum += rating.activity_rating })
            this.ratingAvg = (ratingSum / ratings.length).toFixed(2)
            this.ratingUIAvg = Math.round(ratingSum / ratings.length)
          }
          this.initRatingUI()
          this.initProgress(ratings.length)
          this.ratings = json.results
        }).catch((error) => console.error(error))
    },
    /** 
     * 
     * @argument {Number} ratings 평점 배열
     * @argument {Number} value 찾을 값
     * @return {Number} 갯수 리턴
     * 
     * @description 평점 배열에서 값을 찾아 갯수를 리턴한다.
     * 
     **/
    findAndCountRating(ratings, value) {
      return ratings.filter((rating) => rating.activity_rating == value).length
    },
    initChart() {
      let dates = this.getAWeek(moment().subtract(7, 'd'), moment())
      let element = this.$el.querySelector("#viewChart")
      let data = this.reservations.map(reservation => {
        return reservation.count
      })
      let chart = new Chart(element, {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [{
            label: '일별 예약자 수',
            data: this.chartData,
            backgroundColor: 'RGBA(200, 9, 67, 1.00)',
          }]
        },
        options: {
          scales: {
            xAxes: [{
              barPercentage: 0.3
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
    },
    initRatingUI() {
      $('.ui.rating')
        .rating('set rating', this.ratingUIAvg)
    },
    initProgress(totalCount) {
      this.$nextTick(() => {
        let options = {
          total: totalCount
        }
        $('.progress').progress(options);
      })
    },
    getAWeek(startDate, endDate) {
      var now = startDate, dates = [];
      while (now.isBefore(endDate) || now.isSame(endDate)) {
        dates.push(now.format('M/D/YYYY'));

        let isMatched = false // 처음에는 매치 된 값이 없으므로 false
        let month = Number(now.format('M'))
        this.reservations.forEach(reservation => {  // 예약 된 날짜 만큼 반복 
          if (now.format('M/D/YYYY') == (moment(reservation.date).format('M/D/YYYY'))) { // 오늘 날짜와 예약 날짜가 같으면 
            isMatched = true  // 매치는 true
            this.chartData.push(Number(reservation.count))  // 차트 값에다가 예약 된 카운트를 넣어준다.
          }
        })
        if (!isMatched) {  // 오늘 날짜와 예약 날짜가 같지 않다면
          this.chartData.push(0)  // 카운트는 없으므로 0을 넣어준다.
        }
        now.add('days', 1);  // 다음 날짜 계산을 위해 +1 을 해준다.
      }
      return dates;
    }
  },
  created() {
    this.getCountAllWekin()
    this.getMakerRating()
    this.getReservation()
    this.getCommission(1)
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  mounted() {
    this.defaultMonth = moment().month()
    $('.ui.rating')
      .rating({ maxRating: 5 })
      .rating('disable')

    setTimeout(() => {
      $('.ui.dropdown.month').dropdown({
        onChange: (value, text) => {
          this.defaultMonth = value
          this.getCommission(value)
        }
      })
      this.getCommission(this.defaultMonth)      
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';
@import '../../style/cross-browsing';
.ui.card {
  width: 100%;
  .header {
    padding: 10px 30px;
    background: $color-primary;
    color: rgb(255, 255, 255);
    font-family: NotoSansCJKkr-Medium;
  }
}

.ui.horizontal.segments {
  margin: 0;
  text-align: center;
  height: 200px;

  &.half {
    height: 100px;
  }
  .segment {
    @include flex-box();
    flex-direction: column;
    flex: 1;
    -ms-flex: 1;
  }
}

.ui.list>.item {
  line-height: 1.8;
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

.dropdown.month {
  margin-top: 26px;
  margin-bottom: 4px;
  label {
    position: absolute;
    top: -24px;
  }
}

.rating-container {
  .content {
    @include flex-box();
    align-items: center;
    text-align: center;
  }
  .stats {
    width: 85px;
    margin: 0 60px;
  }
  .value {
    font-size: 50px;
    font-family: NotoSansCJKkr-Bold;
    line-height: 1.4;
  }
  .counter {
    line-height: 1.8;
  }
  .graph {
    flex: 1;
    max-width: 500px;
  }
  .graph span {
    margin-right: 12px;
  }
  .ui.progress {
    display: inline-block;
    width: 450px;
    margin: 6px 0;
  }
  .ui.progress .bar {
    color: rgb(255, 255, 255);
    line-height: 1.6;
    padding-left: 16px;
  }
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

  .rating-container {
    .content {
      display: flex;
      flex-direction: column;
    }
    .ui.progress {
      width: 80%;
    }
    .graph {
      max-width: 300px;
      margin-top: 24px;
    }
  }
}
</style>
