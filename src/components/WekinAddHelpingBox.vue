<template>
  <div style="z-index:10000">
  <div v-show="page == 0">
      <section>
        <h3>위킨제목</h3>
        <div class="describe">
메이커님이 진행하실 위킨의 이름을 지어주세요.<br>
<strong class="green">장소명이나 활동의 이름을 포함</strong>하시는 것이 좋습니다.
        </div>
        <div class="example line">
          <span class="t">이렇게 해보세요!</span>
          적절한 예) 홍천강 레프팅 즐기기, 아찔한 남이섬 슬링샷 등<br>
          부적절한 예) 아싸라비아 놀아보자, 도심지를 벗어나 즐거움을 만끽해보자 등
        </div>
      </section>
  </div>
  <div v-show="page == 1">
      <section>
        <h3>카테고리</h3>
        <div class="describe">
          12가지 카테고리 중 하나를 선택하세요.<br> 구기종목은 스포츠, 등산/런닝 등은 아웃도어, 기구를 타거나 도심지가 아닌 곳에서<br> 즐기는 레저활동은 익스트림으로 선택하시면 됩니다.<br>
          새로운 카테고리를 만들고 싶으시다면 위킨으로 문의해 주세요.<br>
          wekin@wekiner.com 또는 031-211-0410<br>
        </div>
      </section>
  </div>
  <div v-show="page == 2">
      <section>
        <h3>집결장소</h3>
        <div class="describe">
          <strong class="green">집결지란, 위킨 활동 시작 시간에 맞추어 위키너들이 모이는 장소를 의미합니다.</strong> 
          활동지와 집결지가 동일할 경우는 활동지와 같음을 체크해 주세요. 특정 주소에는 없는 일반 건물명이나
          지하철역 출구번호 등을 사용하실 수 있으나, <strong class="green">최소한의 시/군/구/동 등의 주소 포함해 주세요.</strong>
        </div>
        <div class="example line">
          <span class="t">이렇게 해보세요!</span>
          <strong><span class="good"></span>서울시 마포구 대흥동 맥도날드 앞, 서울시 마포구 대흥역 3번출구 등</strong>
          <span class="bad"></span><small class="underline">이렇게 하지 마세요!</small>
          인천 맥도날드 앞(X), 서울 제일빌딩 앞(X)
        </div>
      </section>
  </div>
  <div v-show="page == 3">
      <section>
        <h3>활동장소</h3>
        <div class="describe">
          <strong class="green">활동지란, 실제 위킨 활동이 이루어지는 장소를 의미합니다.</strong><br>
          특정 주소가 없는 산, 바다, 강 등을 활동지로 선택하실 경우 입구, 주차장등 주소가 있는 곳을 기입해 주세요.<br> 도로명 주소, 지번 주소 모두 입력 가능합니다. <br>
메이커 사업장 주소는 서울이지만, 실제 활동은 강원도에서 이루어 진다면 지역 구분에서 강원도에 해당 위킨이 표시됩니다.
        </div>
        <div class="example line">
          <span class="t">이렇게 해보세요!</span>
          <strong><span class="good"></span>서울시 마포구 대흥동 맥도날드 앞, 서울시 마포구 대흥역 3번출구 등</strong>
          <span class="bad"></span><small class="underline">이렇게 하지 마세요!</small>
          인천 맥도날드 앞(X), 서울 제일빌딩 앞(X)
        </div>
      </section>
  </div>
  <div v-show="page == 4">
      <section>
        <h3>간단소개</h3>
        <div class="describe">
해당 위킨의 간단한 소개를 작성해 주세요.
        </div>
      </section>
  </div>
  <div v-show="page == 5">
      <section>
        <h3>좋은점</h3>
        <div class="describe">
해당 위킨의 좋은점, 자랑할 점, 어떤면에 도움이 되는지 등을 작성해 주세요.
        </div>
      </section>
  </div>
  <div v-show="page == 6">
      <section>
        <h3>진행순서</h3>
        <div class="describe">
          메이커님이 진행할 순서, 어떤 방법으로 진행하는지,<br> 해당 위킨을 진행하면서 사용할 도구/제품 등에 대한 설명 등을 작성해 주세요.
        </div>
      </section>
  </div>
  <div v-show="page == 7">
      <section>
        <h3>꿀팁</h3>
        <div class="describe">
          메이커님이 해당 위킨의 전문가로서 해당 활동에 대한 꿀팁,<br> 새로운 점, 위키너들에게 알려주고 싶은 점들을 작성해 주세요.
        </div>
      </section>
  </div>
  <div v-show="page == 8">
      <section>
        <h3>활동대상</h3>
        <div class="describe">
          해당 위킨이 어떤 위키너들에게 좋은지,<br> 추천해 주고 싶은 위키너들은 어떤 사람들인지를 작성해 주세요.
        </div>
      </section>
  </div>
  <div v-show="page == 9">
      <section>
        <h3>준비물</h3>
        <div class="describe">
          <strong class="green">위키너들이 직접 준비해야할 물품이 있다면 작성해 주세요. </strong><br>
메이커님이 준비해주시거나 대여가 가능한 물품은 가능여부를 표시해 주세요.
        </div>
        <div class="example line">
          <span class="t">이렇게 해보세요!</span>
          마른 수건, 갈아입을 옷, 간단한 세면도구 등<br>
물안경 (대여가능, 개당 5,000원), 스노쿨링 장비 (대여가능, 개당 10,000원) 등
        </div>
      </section>
  </div>
  <div v-show="page == 10">
      <section>
        <h3>포함/불포함 사항</h3>
        <div class="describe">
          <strong class="green">결제한 내역에 포함되는 항목과 포함되지 않는 항목을 구분하여 표시해 주세요.</strong><br>
          준비물에서 작성하셨다면, 없음으로 표시하셔도 됩니다.<br>
자주 물어보는 사항이라면 포함/불포함 사항을 구분하여 작성하시는 것이 도움이 됩니다.
        </div>
        <div class="example line">
          <span class="t">이렇게 해보세요!</span>
          - 포함 : 맥주 500cc 1잔, 피자 4인 1판, 간단한 다과, 볼링 게임비(1게임), 신발 대여료 등 <br>
- 불포함 : 포함사항 이외의 추가 주류 및 안주, 전자 다트 사용료, 당구장 사용료 등
          인천 맥도날드 앞(X), 서울 제일빌딩 앞(X)
        </div>
      </section>
  </div>
  <div v-show="page == 11">
      <section>
        <h3>상세일정</h3>
        <div class="describe">
          <strong class="green">활동의 일정이나 소요시간을 작성하세요.</strong><br>
 일정 설명이 필요 없거나, 단순한 기구의 사용만 있다면 없음으로 작성해 주시면 됩니다.
        </div>
        <div class="example line">
          <span class="t">이렇게 해보세요!</span>
          멋진 영월하늘을 날아보는 패러글라이딩<br>
1시간 : 기본 이론 교육<br>
30분 : 장비 착용 및 장비 설명<br>10분 : 이륙장 이동<br>
1시간 : 비행<br>
30분 : 마무리 및 정리<br>
총 3시간 소요
        </div>
      </section>
  </div>
  <div v-show="page == 12">
      <section>
        <h3>대표이미지</h3>
        <div class="describe">
          활동의 일정이나 소요시간을 작성하세요.</strong><br>
위킨 활동을 대표하는 이미지는 앱/웹 모든 페이지에서 노출됩니다.<strong class="green"> 권장 사항에 맞게 이미지를 업로드 해주세요.</strong><br> 최소 1개 ~ 최대 10개까지 이미지를 올릴 수 있어요. <strong class="green">위킨활동 대표 사진은 첫번째 사진입니다.</strong>
        </div>
        <div class="example line" style="height:300px;">
          <span class="t">이렇게 해보세요!</span>
          이미지 크기 : 1600 x 800 (해당 비율의 고화질 사진이면 좋아요.)<br>
          이미지 방향 : 저희 사이트를 보셔서 아시겠지만, 가로 사진을 업로드 하셔야 합니다.<br>
이미지 내용 1) 활동지 장소 사진  
                    2) 활동중 사진
                    3) 사용하시는 기구/ 용품/ 제품 사진 
                    4) 제작 완료/ 작품 사진
                    <span class="good">
                      <img src="/static/images/good.png" alt="" style="float:left;display:inline-block;width:200px;height:auto;"><br></span>

                      <span class="bad" style="margin-left:210px;">
                        <img src="/static/images/bad.png" alt="" style="float:left;display:inline-block;width:100px;height:auto;"></span>
        </div>
      </section>
  </div>
  <div v-show="page == 13">
      <section>
        <h3>기본가격</h3>
        <div class="describe">
          활동에 대한 가격을 작성하세요.<br> 가격이 다른 옵션이 있다면, 이후 가격옵션에서 추가 및 할인내역을 작성하실 수 있습니다.<br> 기본 가격은 화면에 표시되는 가격입니다. <br>
<strong class='green'>반드시 숫자만 기입해 주세요.</strong> 콤마(,) 금액단위 (원, 달러 등) 작성하시면 오류가 발생합니다.
        </div>
        <div class="example line">
          <span class="t">이렇게 해보세요!</span>
                    <span class="good"></span>
                    20000
                    <br>
                      <span class="bad" style=""></span>
10,000원 (X) / 10,000 (X)
        </div>
      </section>
  </div>
  <div v-show="page == 14">
      <section>
        <h3>환불규정</h3>
        <div class="describe">
          <strong class="green">사업장에서 사용하시는 환불규정을 작성해 주세요.<br></strong> 만약, 별도의 환불 규정이 없으신 경우는 위킨에서 제공해 드리는 기본 환불 규정을 사용해 주세요.
        </div>
      </section>
  </div>
  <div v-show="page == 15">
      <section>
        <h3>최소인원</h3>
        <div class="describe">
         활동 진행에 있어 최소인원을 설정해주세요.<br>
         해당 인원이 모집이 안될 활동은 진행하지 않으셔도 됩니다.<br>
<strong class='green'>반드시 숫자만 기입해 주세요.</strong>
        </div>
        <div class="example line">
          <span class="t">이렇게 해보세요!</span>
                    <span class="good"></span>
                    1
                    <br>
                      <span class="bad" style=""></span>
10명 (X)  
        </div>
      </section>
  </div>
  <div v-show="page == 16">
      <section>
        <h3>최대인원</h3>
        <div class="describe">
         활동 진행에 있어 최대인원을 설정해주세요.<br>
         최대인원은 위의 최소인원과 함께 각각 날짜마다의 모집인원을 말합니다.<br>
<strong class='green'>반드시 숫자만 기입해 주세요.</strong>
        </div>
        <div class="example line">
          <span class="t">이렇게 해보세요!</span>
                    <span class="good"></span>
                    1
                    <br>
                      <span class="bad" style=""></span>
10명 (X)  
        </div>
      </section>
  </div>
  <div v-show="page == 17">
      <section>
        <h3>활동시각</h3>
        <div class="describe">
          하루에 여러 시각을 지정할 수 있습니다.<br>
          대표시각 하나만 입력하시고 다음에 나올 화면에서 추가해주세요.<br>
          <strong class='green'>오전/오후 시 분 3항목 모두 빠짐없이 입력바랍니다.</strong>
        </div>
        <div class="example line">
          <span class="t">이렇게 해보세요!</span>
                    <span class="good"></span>
                    1
                    <br>
                      <span class="bad" style=""></span>
10명 (X)  
        </div>
      </section>
  </div>
  <div v-show="page == 18">
      <section>
        <h3>등록 시작날짜</h3>
        <div class="describe">
          <strong class='green'>위킨활동을 시작하실 날짜</strong>를 선택해 주세요.
          해당 등록 시작일부터 종료일 사이에 아래에서 체크한 요일들이 자동으로 등록됩니다.
        </div>
      </section>
  </div>
  <div v-show="page == 19">
      <section>
        <h3>등록 종료날짜</h3>
        <div class="describe">
          <strong class='green'>위킨활동을 종료하실 날짜</strong>를 선택해 주세요.
        </div>
      </section>
  </div>
  <div v-show="page == 20">
      <section>
        <h3>신청마감 시각</h3>
        <div class="describe">
          <strong class='green'>위킨활동의 신청을 더이상 받지 않는 시간을 말합니다.</strong><br>
          하루전이라면 활동 시작 하루 전부터 신청이 불가능합니다.
        </div>
      </section>
  </div>
  <div v-show="page == 21">
      <section>
        <h3>활동요일</h3>
        <div class="describe">
          <strong class="green">선택하신 시작과 종료일 내에서 원하시는 요일을 선택하세요.</strong> <br>기본 가격, 최소/ 최대 인원/ 시작 시간 등은 앞단계에서 작성하신 내용이 기본으로 적용됩니다.<br> 요일별 변경을 하고자 한다면 해당 요일에서 수정을 하세요.
        </div>
      </section>
  </div>
  <div v-show="page == 22">
      <section>
        <h3>휴무일</h3>
        <div class="describe">
          시작일 종료일 사이에 특정 일에 신청을 받고 싶지 않다면 휴무일을 지정해주세요.
        </div>
      </section>
  </div>
  <div v-show="page == 23">
      <section>
        <h3>코스 옵션</h3>
        <div class="describe">
          활동이 여러 코스로 나뉘어 있다면 활동 명과 추가금액을 입력해주세요.<br><strong class="green"> 금액은 숫자로만 기입해주세요.
            <br>할인 금액의 경우에는 숫자 앞에 - 를 붙여주세요.</strong>
        </div>
        <div class="example line">
          <span class="t">이렇게 해보세요!</span>
          <span class="good"></span><br>
                    기본 0 / 슬링샷 0 <br>
슬링샷 0 / 번지점프 10000 /  레프팅 -5000
                    <br>
                    <span class="bad" style=""></span><br>
슬링샷 +0원 / 번지점프 +10,000  /  레프팅 -5,000원 (옵션 가격에 숫자 이외의 콤마와 단위를 
입력한 경우) (X)
        </div>
      </section>
  </div>
  <div v-show="page == 24">
      <section>
        <h3>인원 옵션</h3>
        <div class="describe">
          대인/소인/청소년 등에 가격을 나눠 받고싶으면 결제 옵션을 추가하시면 됩니다.<br>
<strong class="green"> 금액은 숫자로만 기입해주세요.
            <br>할인 금액의 경우에는 숫자 앞에 - 를 붙여주세요.</strong>

        </div>
        <div class="example line">
          <span class="t">이렇게 해보세요!</span>
          <span class="good"></span><br>
          대인 0 / 소인 -3000  <br>
1인 0 / 커플 8000 / 가족 15000                     <br>
                    <span class="bad" style=""></span><br>
슬링샷 +0원 / 번지점프 +10,000  /  레프팅 -5,000원 (옵션 가격에 숫자 이외의 콤마와 단위를 
입력한 경우) (X)
        </div>
      </section>
  </div>
</div>
</template>

<script>

export default {
  props: ['numbering'],
  data () {
    return {
      show: false,
      page: 0
    }
  },
  created () {
    this.page = this.numbering
  },
  methods: {
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
section {
  left : 100%;
  top : -10px;
  width : 700px;
  margin : 10px 20px;
  border : solid 2px #0cb194;
  background : #fff;
  padding : 20px;
  position : absolute;
  line-height : 1.5;
  z-index : 10 
}
section:before {
  content : "";
  width : 10px;
  border-right : solid 10px #0cb194;
  border-bottom : solid 10px transparent;
  border-top : solid 10px transparent;
  position : absolute;
  right : 100%;
  top : 7px;
  display : inline-block 
}
section:after {
  content : "";
  width : 10px;
  border-right : solid 10px #fff;
  border-bottom : solid 10px transparent;
  border-top : solid 10px transparent;
  position : absolute;
  right : 100%;
  top : 7px;
  margin-right : -2px;
  display : inline-block 
}

section h3 {
  background : url('/static/icon/ico-head-h3.png') center left no-repeat;
  display : inline-block;
  padding-left : 26px;
  padding-top : 2px;
  font-weight : 600;
  width : 100%;
  height : 26px;
  font-size : 18px  
}
section > * {
  display : inline-block;
  width : 100% 
}
section > input,div.page.maker > article > section > select {
  border : solid 2px #ddd;
  height : 30px;
  outline : none;
  padding : 0 10px 
}
section > input:focus,div.page.maker > article > section > select:focus {
  border-color : #00c58e 
}
section .green {
  color : #00c58e 
}
section .underline {
  color : #000;
  text-decoration : underline 
}
section .describe {
  font-size : 14px;
  padding : 10px 0;
  font-weight : 400;
  color : #777 
}
section .example {
  font-size : 12px;
  color : #aaa;
  padding : 10px 0 0 120px;
  position : relative  
}
section .example.line {
  border-top : solid 2px #00c58e 
}
section .example .t {
  position : absolute;
  display : inline-block;
  padding : 2px 10px;
  background-color : #00c58e;
  border-radius : 10px;
  color : #fff;
  font-weight : 400;
  font-size : 11px;
  top : 10px;
  left : 0 
}
section .example strong {
  text-decoration : underline;
  font-weight : 600;
  color : #000;
  display : inline-block;
  width : 100% 
}
section .example .good,section .example .bad {
  display : inline-block;
  font-size : 9px;
  color : #fff;
  width : 40px;
  height : 14px;
  border-radius : 7px;
  margin-right : 10px;
  vertical-align : middle;
  font-weight : 400;
  text-align : center;
}
section .example .good {
  background-color : #00c58e;

}
section .example .good:before {
  content : "Good!" 
}
section .example .bad {
  background-color : #078360;
}
section .example .bad:before {
  content : "Bad" 
}
div.has-section {
  position: relative;
  padding-right : 15px;
  width : 300px 
}
div.has-section input {
  width : 100% 
}
div.has-section input:focus + section {
  display : inline-block 
}
</style>
