<template>
  <div id="mainContainer">
    <section id="firstSection">
      <div class="title">
        <h1 style="position:absolute;">
          <p>당신의 재능을 더욱 많은 사람들과 나누세요.</p>
          <p>내 생각대로, 내 능력대로, 내 마음대로.</p>
        </h1>
      </div>
    </section>
    <section id="secondSection">
      <div class="title">
        <h1>
          <p><span style="color: rgb(40, 180, 80)">위킨</span>의 <span style="color: rgb(140, 0, 50)">메이커</span>는</p>
          <p>누구나 될 수 있습니다!</p>
        </h1>
        <h3>
          <p>빠르고 직관적인 활동 개설을 통해 취미가 직업으로</p>
          <p>손쉬운 정산과 편리한 활동 내역관리 페이지를 제공합니다.</p>
        </h3>
    <div class="ui divider marginTop"></div>
        <h1>
          <p><span style="color: rgb(140, 0, 50)">메이커</span>님의 활동</p>
          <p><span style="color: rgb(40, 180, 80)">위킨</span>이 마케팅 해드리겠습니다.</p>
        </h1>
        <h3>
          <p>매달 메이커님을 선정해 광고를 무료로 진행해드립니다.</p>
          <p>페이스북, 영상제작, 블로그체험단 광고 등 유입경로의 다각화를 무료로 제공합니다. </p>
        </h3>
      </div>
    </section>
    <div class="ui divider marginTop"></div>
    <section id="thirdSection">
      <div class="wrapper">
        <div id="thirdImage">
        </div>
        <div id="title">
          <p>온라인 활동 판매가 어려울까요?</p>
          <p><span style="color: rgb(40, 180, 80)">위킨</span>을 통하면 정말 간단합니다.</p>
        </div>
        <div id="content">
          일반인부터 전문가, 사업체까지 어떤 활동이든 손쉬운 정산과 예약자 관리, 수익현황, 조회수등 제공되는 관리자 페이지를 통해 손쉽게 관리가 가능합니다.
        </div>
      </div>
    </section>
    <section id="fourthSection" style="background-color:rgb(248, 248, 248); min-height: 350px; padding: 60px;">
      <div class="title">
        <h1>
          <p>회원가입 →  메이커 등록 →  활동 개설 →  승인 후 사이트 노출</p>
        </h1>
        <h3>
          <p>이 모든 과정은 상단 우측 메뉴를 통해서 진행 가능합니다.</p>
          <p>더욱 자세한 사항은 카카오톡 <span style="color: rgb(40, 180, 80)">@위킨</span> 혹은 아래 고객센터 유선 번호로 문의 바랍니다.</p>
        </h3>
        <h3>
          <button class="ui green basic button large" @click="joinRequest()">회원가입</button>
          <button class="ui red basic button large" @click="makerRequest()">메이커 신청</button>
        </h3>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {

  },
  methods: {
    joinRequest () {
      this.$parent.$refs.navbar.showSignupModalMethod2()
    },
    makerRequest () {
      if (this.$store.getters.user === undefined) {
        alert("회원가입 후 신청 가능합니다.")
        this.$parent.$refs.navbar.showSignupModalMethod2()
      } else {
        this.$router.push('/host/request')
      }
    }
  },
  mounted() {
  },
}
</script>

<style>
@import url('http://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css');

#firstSection {
  margin-top: 60px;
  background-image: url('/static/images/shoot-bow.jpeg');
  min-height: 507px;
  background-size: cover;
}
.title h1 {
  font-size: 35px;
  font-family: 'Spoqa Han Sans', sans-serif;;
  margin: 70px auto 0 auto;
  left: 0;
  right: 0;
}
.title h3 {
  font-size: 20px;
  font-family: 'Spoqa Han Sans', sans-serif;;
  position: inherit;
  display:block;
  margin: 80px auto 0 auto;
  left: 0;
  right: 0;
  text-align: center;
}
.title h1 p {
  margin-bottom: 14px;
  text-align: center;
  font-weight: 200;
}
.title h3 p {
  margin-bottom: 14px;
  text-align: center;
  font-weight: 200;
}
.wrapper {
  margin: 100px auto;
  padding: 50px 50px;
  max-width: 900px;
}
.wrapper #title {
  font-size: 25px;
  font-family: 'Spoqa Han Sans', sans-serif;
}
.wrapper #title p {
  font-weight: 200;
  margin-bottom: 10px;
  margin-right:0;
  max-width: 600px;
}
#content {
  margin-top: 40px;
  margin-right: 0;
  font-family: 'Spoqa Han Sans', sans-serif;
  font-weight: 200;
  font-size: 15px;
  max-width: 400px;
}
#thirdImage {
  background-size: cover;
  background-image: url('/static/images/maker-third-icon.png');
  width: 240px;
  height: 240px;
  float: right;
}
.marginTop {
  margin-top: 70px!important;
}
 
</style>
