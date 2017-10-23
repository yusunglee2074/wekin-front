<template>
  <div class="history" style="margin-top:20px;">

<div class="ui basic buttons">
  <div class="ui button" :class="{ active: togglePointTable == 'person' }" @click="togglePointTable='person'">개인포인트</div>
  <div class="ui button" :class="{ active: togglePointTable !== 'person' }" @click="togglePointTable='company'">기업포인트</div>
</div>
<!-- 개인포인트 표 -->
    <table class="ui celled table" v-if="togglePointTable === 'person'">
      <thead>
        <tr>
          <th>사용/적립일</th>
          <th>변동양</th>
          <th>관련 위킨</th>
          <th>만료일</th>
        </tr>
      </thead>
      <tbody>
        <tr :class="{ negative: history.point_change < 0, positive: history.point_change > 0 }" v-for="history in historys" v-if="isPeopleType(history.type)">
          <td>{{ history.created_at | formatDateWithMoment }}</td>
          <td>{{ history.point_change }}</td>
          <td >{{ history.WekinNew.ActivityNew.title }}</td>
          <td>{{ history.due_date_be_written_days | formatDateWithMoment }}</td>
        </tr>
      </tbody>
    </table>
<!-- 개인포인트 표 끝 -->
<!-- 기업포인트 표 -->
    <table class="ui celled table" v-if="togglePointTable === 'company'">
      <thead>
        <tr>
          <th>사용/적립일</th>
          <th>변동양</th>
          <th>관련 위킨</th>
          <th>만료일</th>
        </tr>
      </thead>
      <tbody>
        <tr :class="{ negative: history.point_change < 0, positive: history.point_change > 0 }" v-for="history in historys" v-if="!isPeopleType(history.type)">
          <td>{{ history.created_at | formatDateWithMoment }}</td>
          <td>{{ history.point_change }}</td>
          <td >{{ history.WekinNew.ActivityNew.title }}</td>
          <td>{{ history.due_date_be_written_days | formatDateWithMoment }}</td>
        </tr>
      </tbody>
    </table>
<!-- 기업포인트 표 끝 -->
  </div>
</template>
<script>
import api from 'api'
import moment from 'moment'

export default {
  props: [
    'user_key'
  ],
  data() {
    return {
      month: 1,
      historys: null,
      togglePointTable: 'person',
    }
  },
  methods: {
    isPeopleType(type) {
      if (type == 10 || type == 11) {
        return true
      }
      return false
    },
    getPointHistory(month) {
      api.getPointHistory(this.user_key, month)
        .then( results => {
          results.data.sort(function (a, b) {
            return -moment(a.created_at) + moment(b.created_at)
          })
          this.historys = results.data
        })
        .catch( error => window.alert("에러 발생" + error + new Date() + "위킨 카카오톡으로 문의 바랍니다. 죄송합니다."))
    }
  },
  mounted() {
    this.getPointHistory(1)
  },
}
</script>
<style>
</style>
