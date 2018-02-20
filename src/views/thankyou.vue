<template>
  <div class="thank">
    <div class="header">
      <div class="header-icon">
      </div>
    </div>
    <div class="content">
      <div class="message">
        <h1 style="font-size:72px;color:white;font-weight:500;">환영합니다!</h1>
        <h2 style="font-size:28px;color:#6f6f6f;font-weight:500;">위킨 회원가입이 완료되었습니다.</h2>
      </div>
      <div v-if="opened" class="dog">
        <img src="https://firebasestorage.googleapis.com/v0/b/wekin-9111d.appspot.com/o/test%2Fdog.gif?alt=media&token=60c51ca5-fe75-45da-b894-07ed0a7a8011">
        <p v-show="!showText">두구두구 기다리시개~</p>
        <span v-show="item == 'nope'">WEKIN 10,000 POINT 당첨을 축하하개</span>
        <span v-show="item == 'americano'">WEKIN 10,000 POINT, 아메리카노 당첨받개~</span>
        <span v-show="item == 'giftCard'">WEKIN 10,000 POINT, 스타벅스 1 만원권 당첨받개~</span>
        <p v-show="showText">* 상품은 다음날 가입시 인증 하셨던 핸드폰 문자메시지로 전송됩니다.</p>
      </div>
      <div v-else class="dog">
        <img src="https://firebasestorage.googleapis.com/v0/b/wekin-9111d.appspot.com/o/test%2Famazon_corgi_surprise_dribbble-min.png?alt=media&token=9419917c-8483-415f-ae65-946fac58d8f7">
        <button @click="open()" v-show="user && moment() > moment('2018-02-21')">상품열개</button>
      </div>
      <div>
      </div>
      <div class="button" v-if="opened">
        <button @click="goHome()" style="font-size:20px;font-weight:500;color:#ffffff;width: 330px; height:70px; border-radius:8px;background-color: #03b281">시작하기</button>
      </div>
    </div>
  </div>
</template>


<script>
import api from 'api'

export default {
  data() {
    return {
      key: null,
      opened: false,
      showText: false,
      item: '',
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  created() {
  },
  mounted() {
  },
  beforeUpdate() {
  },
  methods: {
    setJoined() {
      return api.setUserStatusToJoinedForEvent(this.user.user_key)
        .then(result => {
          return result
        })
        .catch(e => console.log(e))
    },
    goHome() {
      this.$router.push('/')
    },
    open() {
      this.opened = true
      setTimeout(() => { this.showText = true }, 2000)
      this.setJoined()
        .then(result => {
          return api.setEventItem(this.user.user_key)
        })
        .then(result => {
          this.item = result.value
        })
        .catch(e => {
          switch(JSON.parse(e.response.data.message).msg) {
            case 'This user is not Fresh user':
              window.alert("회원님은 이벤트 기간 내 가입자가 아닙니다.")
              this.opened = false
              break
            case 'Already receive this item.':
              this.item = JSON.parse(e.response.data.message).data
              window.alert("회원님은 이미 이벤트에 참여하셨습니다.")
              this.opened = false
              break
          }
        })
    }
  }
}
</script>

<style>
.thank {
  width: 100%;
  height: 600px;
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
.thank .content {
  width: 500px;
  padding-top: 60px;
  margin: 20px auto;
  padding: 40px;
  background-color: rgb(251, 181, 75); 
}
.content .message {
  text-align: center;
}
.content .dog {
  width: 300px;
  margin: 40px auto;
}
.content .dog img {
  width: 300px;
  margin: auto auto;
}
.content .dog button {
  border: 0px;
  width: 200px;
  margin-left: 50px;
  margin-top: 20px;
  height: 40px;
  border-radius: 8px;
  font-size:20px;
  font-weight:500;
  background-color:rgb(0, 101, 175);
  color: white; 
}
.content .button {
  border: 0px;
  margin-top: 45px;
  text-align: center;
}
</style>
