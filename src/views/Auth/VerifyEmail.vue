<template>
  <div id="login">
    <div class="navbar-custom"></div>
    <div class="ui card login-container">
      <div class="content">
        <div class="header">이메일 인증</div>
      </div>
      <div class="content padded">
        <p>위킨 회원이 되신 것을 진심으로 환영합니다.</p>
        <p>편리한 서비스 이용을 위한 이메일 인증을 진행해주세요.</p>
        <div class="ui input">
          <input type="text" placeholder="이메일" v-model="email" disabled="disabled">
        </div>
        <div class="ui small feed">
          <button class="ui basic button" @click="sendVerifyEmail()">이메일 재전송</button>
          <button class="negative ui button" @click="confirmMail()">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import auth from 'src/auth'


export default {
  name: 'login',
  computed: mapGetters([
    'user'
  ]),
  methods: {
    confirmMail() {
      window.location.href = '/'
    },
    sendVerifyEmail() {
      auth.sendVerifyEmail()
        .then((result) => alert('전송되었습니다. 이메일을 확인해주세요.'))
        .catch((error) => alert('잠시 후 다시 시도해주세요.'))
    }
  },
  data() {
    return {
      email: null
    }
  },
  mounted() {
    this.$store.watch(() => {
      if (this.$store.state.user !== undefined) {
        this.email = this.user.email
      }
    })
  }
}
</script>
<style lang=scss scoped>
.card.login-container {
  width: 400px;
  margin: 0 auto;
  padding-bottom: 20px;

  .header {
    text-align: center;
  }
  .padded {
    padding-left: 33px;
    padding-right: 33px;
  }
  .content {
    text-align: center;
  }

  .ui.input {
    width: 100%;
    padding: 6px 0;
    input {
      height: 50px;
    }
  }
  .ui.button {
    width: 100%;
    height: 50px;
    margin: 12px 0;
  }
  .ui.checkbox {
    width: 100%;
    text-align: left;
    padding: 12px 6px;
    font-size: 12px;
  }
  .ui.horizontal.divider {
    margin-top: 0;
  }
  .social-login-container img {
    padding-right: 10px;
    &:last-child {
      padding: 0;
    }
  }
}
</style>
