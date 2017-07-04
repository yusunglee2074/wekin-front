<template>
  <div class="ui modal mail">
    <h4>{{ title }}</h4>
    <div class="ui input">
      <input type="text" placeholder="이름" v-model="name">
    </div>
    <div class="ui input">
      <input type="email" placeholder="이메일" v-model="email">
    </div>
    <div class="ui input">
      <input type="tel" placeholder="전화번호" v-model="phone">
    </div>
    <div class="ui form">
      <div class="field">
        <textarea placeholder="문의하실 내용을 입력해주세요." v-model="content"></textarea>
      </div>
    </div>
    <button class="ui primary button" @click="sendEmail()">보내기</button>
  
    <div class="ui active inverted dimmer" v-if="isSending">
      <div class="ui text loader">메일 전송중</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: null,
      name: null,
      email: null,
      phone: null,
      content: null,
      isSending: false,
    }
  },
  created() {
    this.title = this.$route.query.title
  },
  methods: {
    sendEmail() {
      this.isSending = true
      let target = this.email
      let title = this.title
      let message = `위킨명 : ${this.title}<br/>메일주소 : ${this.email}<br/>이름 : ${this.name}<br/>전화번호 : ${this.phone}<br/>내용 : ${this.content}`
      fetch('https://wekin-api-dot-wekinproject.appspot.com/v1/util/mail', {
        method: 'POST',
        mode: 'cords',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `target=${target}&title=${title}&message=${message}`
      }).then(() => {
        this.isSending = false
        alert("전송 되었습니다.")
        this.title = null
        this.name = null
        this.email = null
        this.phone = null
        this.content = null
        $('.ui.modal.mail').modal('hide')
      })
    },
    showMailComponent(title) {
      this.title = title
      $('.ui.modal.mail').modal('show')
    }
  },
}
</script>

<style lang="scss" scoped>
.ui.modal.mail {
  padding: 18px;
  margin: -208.5px -162px !important
}

.ui.primary.button {
  background-color: #00A29A
}

.ui.input,
.ui.form textarea {
  width: 100%;
  margin: 8px 4px;
}

.ui.input input,
.ui.form textarea {
  border: 1px solid #7D7D7D;
}

.ui.primary.button {
  float: right;
  margin-right: -4px;
  width: 150px;
}

body {
  padding: 8px 16px;
}

@media only screen and (max-width: 500px) {
  .ui.modal.mail {
    padding: 18px;
    margin: -207.5px -152px !important
  }
}
</style>
