<template>
  <div class="history" style="margin-top:20px;">

    <div class="ui basic buttons">
      <div class="ui button" :class="{ active: togglePointTable == 'person' }" @click="togglePointTable='person'">위킨포인트</div>
      <div class="ui button" :class="{ active: togglePointTable == 'company' }" @click="togglePointTable='company'">기업포인트</div>
    </div>
    <!-- 개인포인트 표 -->
    <div class="table" style="margin-top: 20px;">
      <table style="border-collapse: collapse;" v-if="togglePointTable === 'person'">
          <tr>
            <th class="table-header">타입</th>
            <th class="table-header">날짜</th>
            <th class="table-header">변동포인트</th>
            <th class="table-header">관련 위킨</th>
            <th class="table-header">만료일</th>
          </tr>
          <tr>
            <td colspan="5" v-if="historys.length === 0" style="text-align:center;">포인트 내역이 존재하지 않습니다.</td>
          </tr>
          <tr :class="{ negative: history.point_change < 0, positive: history.point_change > 0 }" v-for="history in historys" v-if="isPeopleType(history.type)">
            <td class="table-body">{{ history.type === 10 ? '적립' : '사용' }}</td>
            <td class="table-body">{{ history.created_at | formatDateWithMoment }}</td>
            <td class="table-body">{{ history.point_change }}</td>
            <td class="table-body">{{ history.WekinNew !== null ? history.WekinNew.ActivityNew.title : '해당없음' }}</td>
            <td class="table-body">{{ history.due_date_be_written_days | formatDateWithMoment }}</td>
          </tr>
      </table>
    </div>
    <!-- 개인포인트 표 끝 -->
    <!-- 기업포인트 표 -->
    <div class="table">
      <table style="border-collapse: collapse;" v-if="togglePointTable === 'company'">
        <thead>
          <tr>
            <th class="table-header">타입</th>
            <th class="table-header">날짜</th>
            <th class="table-header">변동포인트</th>
            <th class="table-header">관련 위킨</th>
            <th class="table-header">만료일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="5" v-if="historys.length === 0" style="text-align:center;">포인트 내역이 존재하지 않습니다.</td>
          </tr>
          <tr :class="{ negative: history.point_change < 0, positive: history.point_change > 0 }" v-for="history in historys" v-if="!isPeopleType(history.type)">
            <td class="table-body">{{ history.type === 20 ? '적립' : '사용' }}</td>
            <td class="table-body">{{ history.created_at | formatDateWithMoment }}</td>
            <td class="table-body">{{ history.point_change }}</td>
            <td class="table-body">{{ history.WekinNew !== null ? history.WekinNew.ActivityNew.title : '해당없음'}}</td>
            <td class="table-body">{{ history.due_date_be_written_days | formatDateWithMoment }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
      allHistorys: null,
      togglePointTable: '',
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
          this.allHistorys = results.data
          this.historys = results.data.slice(0, 9)
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
.table {
  overflow: auto;
}
.table-header {
  padding: 5px 11.7px!important;
  text-align: center!important;
  min-width: 100px;
  max-width: 100px;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
}
.table-body {
  text-align: center!important;
  padding: 5px 11.7px!important;
  border-bottom: 1px solid #ddd;
}
</style>
