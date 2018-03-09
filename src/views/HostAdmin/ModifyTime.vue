<template>
  <div class="modify">
    <div class="header">
    </div>
    <div class="content">
      <div class="content">
        <div class="week">
          <div class="day ui basic buttons">
            <button @click="selectDay('Mo')" class="ui button" :class="{ active: (selectedDay === 'Mo') }">월요일</button>
            <button @click="selectDay('Tu')" class="ui button" :class="{ active: (selectedDay === 'Tu') }">화요일</button>
            <button @click="selectDay('We')" class="ui button" :class="{ active: (selectedDay === 'We') }">수요일</button>
            <button @click="selectDay('Th')" class="ui button" :class="{ active: (selectedDay === 'Th') }">목요일</button>
            <button @click="selectDay('Fr')" class="ui button" :class="{ active: (selectedDay === 'Fr') }">금요일</button>
            <button @click="selectDay('Sa')" class="ui button" :class="{ active: (selectedDay === 'Sa') }">토요일</button>
            <button @click="selectDay('Su')" class="ui button" :class="{ active: (selectedDay === 'Su') }">일요일</button>
          </div>
          <div class="detail" v-if="selectedDay && !errorMsg">
            <h2>{{ selectedDay | dayTransKor }}</h2>
            <div style="border: 1px solid rgb(0, 152, 143); padding-top:12px; overflow: hidden; display:inline-block;">
              <div class="day-input-people">
                <label for="min" style="display:block;">최소 ~ 최대인원</label><input v-model="activity.base_week_option[selectedDay].min_user" type="number" id="min" placeholder="명">
                ~ <input v-model="activity.base_week_option[selectedDay].max_user" type="number" id="max" placeholder="명">
              </div>
              <div class="day-input-time" style="line-height: 0.3; float:left;" v-for="(item, index) in base_week_option[selectedDay].price_with_time">
                <div style="">
                  <div style="width: 130px; height: 10px; margin-left: 20px;"><label v-bind:for="index">시작시각 {{ index + 1 }}</label></div><input v-model="activity.base_week_option[selectedDay].start_time[index]" type="time" style="margin-left:20px;" :id="index">
                </div><br>
                <div style="margin-bottom: 20px;">
                  <div style="width: 130px; height: 10px; margin-left: 20px;"><label v-bind:for="index + 10">추가가격 {{ index + 1 }}</label></div><input v-model="activity.base_week_option[selectedDay].price_with_time[index]" style="margin-left: 20px; width: 106px;" type="number" :id="index + 10">
                  <button class="ui button mini" @click="subTime()">삭제</button>
                </div>
              </div>
            </div>
            <div style="clear: both;">
              <button class="ui button mini" @click="addTime()">시각추가</button>
            </div>
          </div>
        </div>
        <div class="holiday">
          <div class="error-msg" v-if="errorMsg">{{ errorMsg }}</div>
          <h2>휴무일</h2>
          <div style="padding-left:20px;">
            <datepicker 
              v-model="tempEndDate" 
              wrapper-class="ui input styled primary left icon" 
              language="ko" 
              input-class="width300"
              format="MMM dd(D), yyyy"
              placeholder="선택 후 아래에 추가됩니다.">
            </datepicker>
            <div style="width: 500px;">
              <div v-for="(data, index) in activity.close_dates" style="float:left; margin-right: 10px;">
                {{ data | dateForEndDate }}
                <button @click="activity.close_dates.splice(index, 1)">삭제</button>
              </div>
            </div>
          </div>
          <div class="buttons" style="margin: 10px 0; clear:both; padding-top: 22px;">
            <button class="ui positive basic button" @click="submit()">저장하기</button>
            <button class="ui negative basic button" @click="moveBack()">뒤로가기</button>
          </div>
        </div>
      </div>
      <div class="user-list">
        <h3>오늘 이 후 활동 예정자</h3>
        <div class="user" v-for="(item, index) in dateListAfterToday" style="padding-left:20px;">
          <span>- {{ item.start_date | formatDateWithMoment }}, {{ item.User.name }}, {{ item.User.phone }}</span>
        </div>
        <div>
          <p>* 해당 요일에 <span style="color: tomato;">결제자가 없는</span> 경우에만 가능합니다.</p>
          <p>* <span style="color: tomato;">크롬 브라우저</span>를 권장합니다!</p>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
import FireUpload from 'components/FireUpload.vue'
import api from 'api'
import auth from './../../auth'
import moment from 'moment'
import {Storage} from 'src/util'
import Datepicker from 'vuejs-datepicker'

export default {
  data() {
    return {
      activity: {},
      wekins: null,
      dateListAfterToday: [],
      disableDay: {},
      selectedDay: '',
      errorMsg: '',
      base_week_option: {}
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    tempEndDate: {
      get() {
        return null
      },
      set(newDate) {
        this.activity.close_dates.push(moment(newDate).format('YYMMDD'))
        return null
      }
    },
  },
  components: {
    Datepicker
  },
  filters: {
    dayTransKor (day) {
      switch (day) {
        case 'Mo':
          return '월요일'
        case 'Tu':
          return '화요일'
        case 'We':
          return '수요일'
        case 'Th':
          return '목요일'
        case 'Fr':
          return '금요일'
        case 'Sa':
          return '토요일'
        case 'Su':
          return '일요일'
      }
    },
    dateForEndDate (date) {
      return moment('20' + date).format('YY-MM-DD(ddd)')
    }
  },
  methods: {
    submit() {
    },
    moveBack() {
      this.$router.push('/host/admin/')
    },
    subTime (index) {
      this.activity.base_week_option[this.selectedDay].start_time.splice(index, 1)
      this.activity.base_week_option[this.selectedDay].price_with_time.splice(index, 1)
      this.base_week_option[this.selectedDay].start_time.splice(index, 1)
      this.base_week_option[this.selectedDay].price_with_time.splice(index, 1)
    },
    addTime () {
      this.base_week_option[this.selectedDay].start_time.push(1)
      this.base_week_option[this.selectedDay].price_with_time.push(1)
    },
    selectDay(day) {
      if (this.disableDay[day]) this.errorMsg = '죄송합니다. 해당 요일은 예약자가 있어 수정이 불가합니다.'
      else this.errorMsg = ''
      this.selectedDay = day
    },
  },
  created() {
  },
  mounted() {
    api.getActivity(this.$route.params.key)
      .then(activity => {
        this.activity = activity
        this.base_week_option = JSON.parse(JSON.stringify(this.activity.base_week_option))
        return api.getAttendWekiners(this.$route.params.key)
      })
      .then(wekins => {
        this.wekins = wekins.data
        for (let i = 0; i < this.wekins.length; i++) {
          let item = this.wekins[i]
          if (moment(item.start_date) > moment()) {
            this.disableDay[moment(item.start_date).format('dd')]  = 1
            this.dateListAfterToday.push(item)
          }
        }
      })
      .catch(e => alert('에러발생'))
  }
}
</script>

<style scoped>
.modify {
  padding: 80px 100px;
}
.error-msg {
  color: red;
  font-size: 18px;
  border: 1px solid rgb(0, 152, 143);
  padding: 10px 20px;
  margin: 40px 0px;
  width: 520px;
}
.content {
  margin-top: 20px;
}
.detail {
  margin: 40px 0;
}
.day-input-people {
  margin-bottom: 18px;
  padding-left: 20px;
  min-width: 160px;
}
.day-input-people input {
  width: 50px;
  padding-left: 10px;
}
.day-input-people input ::-webkit-input-placeholder {
}
.day-input-time {
  margin-bottom: 6px;
}
</style>
