<template>
  <div class="thank">
    <div class="header">
      <div class="header-icon">
      </div>
    </div>
    <div class="content">
      <div class="message">
        <h1 style="font-size:72px;color:#00c58e;font-weight:500;">환영합니다!</h1>
        <h2 style="font-size:28px;color:#6f6f6f;font-weight:500;">위킨 회원가입이 완료되었습니다.</h2>
      </div>
      <div class="button">
        <button @click="goHome()" style="font-size:20px;font-weight:500;color:#ffffff;width: 330px; height:70px; border-radius:8px;background-color: #03b281">시작하기</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      key: null 
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
  width: 400px;
  padding-top: 60px;
  margin: auto auto;
}
.content .message {
  text-align: center;
}
.content .button {
  margin-top: 45px;
  text-align: center;
}
</style>
