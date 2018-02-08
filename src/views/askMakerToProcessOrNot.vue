<template>
  <div class="thank">
    <div class="header">
      <div class="header-icon">
      </div>
    </div>
    <div class="thank-content">
    </div>
    <div id="thank-ask">
      <p>내일 있을 "{{ activity.title }}"의 작성하셨던 <br><span>진행가능 최소인원은 {{ minUser }}명</span> 입니다.</p>
      <p>최소인원에 미치지 못해 <span>진행하지 않는다면</span></p>
      <p>꼭 아래 버튼을 눌러, 고객들에게 문자를 통해 <span>진행하지 않는다는걸</span> 알려주세요.</p>
      <p>진행하신다면 이 페이지는 <span>무시</span>하셔도 좋습니다.</p>
      <h2>참석 예정</h2> 
      <div >
      <button class="ui teal button" @click="checkAllUsers()">모두선택</button>
        <label class="checkbox-label" v-for="(item, index) in wekins">
          <span>{{ item.User.name }}</span>
          <span>{{ item.User.phone }}</span>
          <span>{{ item.state }}</span>
          <span>{{ item.start_time | subtract9Hour | formatTime }}</span>
          <input type="checkbox" v-model="cancelUserList" :value="item.wekin_key">
          <span class="checkmark"></span>
        </label>
      </div>
      <br><br><br><br>
      <button class="negative ui button" @click="notProcess()">체크된 인원은 진행하지 않습니다!</button>
    </div>
  </div>
</template>


<script>
import api from './../api'
import moment from 'moment'
export default {
  data() {
    return {
      wekins: [],
      activity: '',
      minUser: '',
      cancelUserList: []
    }
  },
  computed: {
  },
  filters: {
    subtract9Hour (item) {
      return moment(item).add(-9, 'hour')
    }
  },
  created() {
  },
  mounted() {
    api.getPaidWekinsForHost(this.$route.query.activityKey)
      .then(results => {
        this.wekins = results
        return api.getActivity(this.$route.query.activityKey)
      })
      .then(activity => {
        this.activity = activity
        this.minUser = this.activity.base_week_option[moment().add(1, 'day').format('dd')].min_user
      })
      .catch(error => alert('에러', error))
    this.paidCount = this.$route.query.paidCount
  },
  beforeUpdate() {
  },
  methods: {
    checkAllUsers() {
      if (this.wekins.length === this.cancelUserList.length) this.cancelUserList = []
      else {
        let tmpList = []
        for (let i = 0; i < this.wekins.length; i++) {
          tmpList.push(this.wekins[i].wekin_key)
          this.cancelUserList = tmpList
        }
      }
    },
    notProcess() {
      if (confirm("체크된 인원들은 즉시 환불 되며 클래스 취소 안내문자를 보냅니다.\n명단을 꼭 정확히 확인해주세요.")) {
        api.cancelOrderAndRefundWithSms(this.cancelUserList)
          .then(result => {
            window.alert('처리 완료 되었습니다. 언제나 감사합니다.')
          })
          .catch(e => window.alert(JSON.stringify(e) + '에러시각: ' + moment().format('HH:mm') + '내부적인 오류가 발생했습니다. 해당 카카오톡 @위킨 혹은 유선전화 031-211-0410으로 연락주시면 최대한 빠르게 도와드리겠습니다. 죄송합니다.'))
      }
    }
  }
}
</script>

<style>
.thank {
  width: 100%;
  margin-top: 180px;
}
.thank .header {
  width: 100%;
  padding-top: 45px;
  padding-bottom: 45px;
  background-color: #00c58e;
  height: 240px;
}
.header .header-icon {
  background-image: url('/static/icon/logo-circle-w.png');
  width: 150px;
  height: 150px;
  margin: auto auto;
}
#thank-ask {
  padding: 16px 16px;
  width: 100%;
  margin: auto auto;
  overflow-x: auto;
}
#thank-ask p {
  font-size: 18px;
  width: 600px;
}
#thank-ask p span {
  color: tomato;
}
.checkbox-label {
  display: block;
  position: relative;
  padding-left: 25px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.checkbox-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
}
/* On mouse-over, add a grey background color */
.checkbox-label:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkbox-label input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox-label input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox-label .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

</style>
