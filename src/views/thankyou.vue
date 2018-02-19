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
        <span v-show="!showText">두구두구 기다리시개~</span>
        <span v-show="showText">아메리카노 당첨받개~</span>
        <span v-show="showText">* 상품은 다음날 가입시 인증 하셨던 핸드폰 문자메시지로 전송됩니다.</span>
      </div>
      <div v-else class="dog">
        <img src="https://firebasestorage.googleapis.com/v0/b/wekin-9111d.appspot.com/o/test%2Famazon_corgi_surprise_dribbble-min.png?alt=media&token=9419917c-8483-415f-ae65-946fac58d8f7">
        <button @click="open()">선물받기</button>
      </div>
      <div class="button" v-if="opened">
        <button @click="goHome()" style="font-size:20px;font-weight:500;color:#ffffff;width: 330px; height:70px; border-radius:8px;background-color: #03b281">시작하기</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      key: null,
      opened: false,
      showText: false
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  beforeUpdate() {
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    open() {
      this.opened = true
      setTimeout(() => { this.showText = true }, 2000)
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
