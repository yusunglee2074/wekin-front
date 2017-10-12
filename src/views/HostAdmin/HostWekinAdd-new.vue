<template>
  <div style="margin-top:100px; margin-left:200px; max-width:1000px;">
    현재페이지: {{ page }} <button @click="1 < page ? page-- : page">이전</button><button @click="10 > page ? page++ : page">다음</button>

    <div v-show="page === 1">
      <h2>기본적인 정보 입력해주세요.</h2>
      <h3>위킨 제목</h3>
      <div class="ui input focus" style="width:300px;">
        <input type="text" v-model="activity.title">
      </div>
      <h3>카테고리</h3>
      <select v-model="activity.category1" class="ui dropdown" style="width: 300px;">
        <option value="" disabled>카테고리</option>
        <option value="투어/여행">투어/여행</option>
        <option value="익스트림 (레저)">익스트림 (레저)</option>
        <option value="스포츠 (구기종목)">스포츠 (구기종목)</option>
        <option value="음악">음악</option>
        <option value="댄스">댄스</option>
        <option value="뷰티">뷰티</option>
        <option value="요리">요리</option>
        <option value="아트">아트</option>
        <option value="축제">축제</option>
        <option value="힐링">힐링</option>
        <option value="아웃도어">아웃도어</option>
        <option value="요가/피트니스">요가/피트니스</option>
        <option value="소품제작">소품제작</option>
      </select>
      <h3>기본가격</h3>
      <div class="ui input focus" style="width:300px;">
      <input type="number" v-model="activity.basePrice">
      </div>
      <h3>환불규정</h3>
      <textarea type="text" v-model="refundPolicyData" v-show="wekinRefund" style="width:300px; height:80px;"></textarea> 
      <textarea type="text" v-model="activity.refund_policy" v-show="!wekinRefund" style="width:300px; height:80px;"></textarea>
      <button @click="wekinRefund = !wekinRefund">위킨환불규정 사용</button> 
    </div>

    <div v-show="page === 2">
    <h2>상세정보를 사진과 함께 작성해주세요.</h2>
    <h3>상세 정보</h3>
      <div style="width:440px;">
        <div id="editor"></div>
      </div>
    </div>

    <div v-show="page === 3">
      <h2>준비물 외 아래 정보를 작성해주세요.</h2>
      <h3>준비물</h3>
      <div class="ui input focus" style="width:300px;">
        <input type="text" v-model="activity.preparation">
      </div>
      <h3>포함/불포함 사항</h3>
      <div class="ui input focus" style="width:300px;">
        <input type="text" v-model="activity.inclusion">
      </div>
      <h3>상세 일정</h3>
      <div class="ui input focus" style="width:300px;">
        <input type="text" v-model="activity.schedule">
      </div>
    </div>

    <div v-show="page === 4">
      <h2>활동장소를 입력해주세요. 혹시 활동전 집결지가 있다면 같이 작성해주세요.</h2>
      <h3>활동장소</h3>
      <div class="ui input focus" style="width:300px;">
        <input type="text" v-model="activity.address">
      </div>
      <h3>집결지</h3>
      <div class="ui input focus" style="width:300px;">
        <input type="text" v-model="activity.meetAddress" id="meetAddress">
      </div>
      <button @click="sameAddress()">활동장소와 같음</button>
    </div>

    <div v-show="page === 5">
      <div style="position:relative;flex:1" v-for="(imageUrl, index) in uploadedMainImages" v-bind:key="index">
        <img style="width:100%;height:100%" :src="imageUrl">
        <i class="icon close link" style="position:absolute; top:0;right:0" @click="deleteImage(index)"></i>
      </div>
      <h2>사이트 첫페이지, 상세페이지에 노출시킬 이미지들을 업로드해주세요.</h2>
      <h3>이미지</h3>
      <FireUpload :imageUrl="uploadedMainImage" @update:imageUrl="val => uploadedMainImages.push(val)"></FireUpload>
    </div>

    <div v-show="page === 6">
      <h2>게시시작일과 종료일을 입력해주세요.</h2>
      <div v-show="isTicket === true">
        <h3>티켓 유효기간</h3>
        <div class="ui calendar">
          <div class="ui input styled primary left icon">
            <datepicker 
              v-model="activity.startDate" 
              id="datepickerId" 
              wapper-class="ui input styled primary left icon" 
              language="ko" 
              format="MMM dd(D), yyyy"
              placeholder="날짜선택">
            </datepicker>
          </div>
        </div>
        <h3>최대 발행 수</h3>
        <div class="ui input focus" style="width:300px;">
          <input type="number" v-model="activity.ticketMaxApply">
        </div>
        <button @click="isTicket = false">날짜형식으로 변환</button>
      </div>
      <div v-show="isTicket === false">
        <h3>등록 시작 날짜</h3>
        <div class="ui calendar">
          <div class="ui input styled primary left icon">
            <datepicker 
              v-model="activity.startDate" 
              id="datepickerId" 
              wapper-class="ui input styled primary left icon" 
              language="ko" 
              format="MMM dd(D), yyyy"
              placeholder="날짜선택">
            </datepicker>
          </div>
        </div>
        <h3>등록 만료 날짜</h3>
        <div class="ui calendar">
          <div class="ui input styled primary left icon">
            <datepicker 
              v-model="activity.endDate" 
              id="datepickerId" 
              wapper-class="ui input styled primary left icon" 
              language="ko" 
              format="MMM dd(D), yyyy"
              placeholder="날짜선택">
            </datepicker>
          </div>
        </div>
        <h3>몇 일전에 접수 마감 시킬까요?</h3>
        <div class="ui input focus" style="width:300px;">
          <input type="number" v-model="activity.dueDate"> 
        </div>
        <h3>최소인원</h3>
        <div class="ui input focus" style="width:300px;">
          <input type="number" v-model="activity.baseMinUser"> 
        </div>
        <h3>최대인원</h3>
        <div class="ui input focus" style="width:300px;">
          <input type="number" v-model="activity.baseMaxUser">  
        </div>
        <button @click="isTicket = true">티켓형식으로 변환</button>
      </div>
      <div v-show="isTicket === null">
        <button @click="isTicket = true">티켓형식이세요?</button>
        <button @click="isTicket = false">날짜 등록식이세요?</button>
      </div>
    </div>

    <div v-show="page === 7">
      <h2>전 페이지에서 지정한 시작일 ~ 종료일 사이의 활동요일을 선택해주세요.</h2>
      <h3>요일 선택</h3>
      <input type="checkbox" v-model="checkedDays" value="Mo">월요일
      <input type="checkbox" v-model="checkedDays" value="Tu">화요일
      <input type="checkbox" v-model="checkedDays" value="We">수요일
      <input type="checkbox" v-model="checkedDays" value="Th">목요일
      <input type="checkbox" v-model="checkedDays" value="Fr">금요일
      <input type="checkbox" v-model="checkedDays" value="Sa">토요일
      <input type="checkbox" v-model="checkedDays" value="Su">일요일
      <div v-for="index, data in checkedDays">
        <div style="border-style: groove; width:210px; float:left;">
          <h3>{{ tempWeekData[index] }}</h3>
          <p>최소인원<p>
          <div class="ui input focus" style="width:150px; height:24px; margin-bottom:6px;">
            <input type="number" v-model="activity.baseWeekOption[index].min_user">
          </div>
          <p>최대인원</p>
          <div class="ui input focus" style="width:150px; height:24px; margin-bottom:6px;">
            <input type="number" v-model="activity.baseWeekOption[index].max_user">
          </div>
          <div style="border-style: groove;">
          <p>시작 시각</p>
          <div class="ui input focus" style="width:150px; height:24px; margin-bottom:6px;">
            <input type="time" v-model="activity.baseWeekOption[index].start_time[0]">
          </div>
          <p>시각 추가가격</p>
          <div class="ui input focus" style="width:150px; height:24px; margin-bottom:6px;">
            <input type="number" v-model="activity.baseWeekOption[index].price_with_time[0]">
          </div>
        </div>
          <!-- TODO: 시작시각, 가격 리스트로 받아야하는데 추가 버튼 눌렀을때 어떻게? -->
        </div>
      </div>
      <div style="clear: both;">
        <br>
        
        <h3>영업 휴무일을 선택해주세요.</h3>
            <datepicker 
              v-model="tempEndDate" 
              id="datepickerId" 
              wapper-class="ui input styled primary left icon" 
              language="ko" 
              format="MMM dd(D), yyyy"
              placeholder="날짜선택">
            </datepicker>
            <div v-for="(index, data) in activity.closeDates">
            {{ index }}
            {{ data }}
            <button>삭제</button>
</div>
      </div>
    </div>

    <div v-show="page === 8">
      <h2>위킨 옵션이 있나요?</h2>
      <button @click="activity.basePriceOption.push({})">추가</button>
      <div v-for="(value, index) in activity.basePriceOption" style="width:400px;">
        <p>옵션 이름</p>
        <div class="ui input focus" style="width:300px;">
          <input type="text" v-model="activity.basePriceOption[index]['name']">
        </div>
        <p>추가가격</p>
        <div class="ui input focus" style="width:300px;">
          <input type="number" v-model="activity.basePriceOption[index]['price']">
        </div>
        <button @click="deletePriceOption(index)">제거</button>
        <div class="ui section divider"></div>
      </div>
    </div>

    <div v-show="page === 9">
      <h2>결제 추가 옵션 사항이 있나요?</h2>
      <button @click="activity.baseExtraPriceOption.push({})">추가</button>
      <div v-for="(value, index) in activity.baseExtraPriceOption" style="width:400px;">
        <p>옵션 이름</p>
        <div class="ui input focus" style="width:300px;">
          <input type="text" v-model="activity.baseExtraPriceOption[index]['name']">
        </div>
        <p>옵션 추가가격</p>
        <div class="ui input focus" style="width:300px;">
          <input type="number" v-model="activity.baseExtraPriceOption[index]['price']">
        </div>
        <button @click="deleteExtraPriceOption(index)">제거</button>
        <div class="ui section divider"></div>
      </div>
    </div>

    <div v-show="page === 10">
      <button @click="submit()">확인</button>
      페이지 이동 <input type="select">      
    </div>


  </div>
</template>
<script>
import FireUpload from 'components/FireUpload.vue'
import api from 'api'
import moment from 'moment'
import {Storage} from 'src/util'
import Datepicker from 'vuejs-datepicker';

export default {
  data() {
    return {
      page: 1,
      isTicket: null,
      activity: {
        meetAddress: '',
        address: '',
        baseWeekOption: { 
          Su: { price_with_time: [], start_time: [] },
          Tu: { price_with_time: [], start_time: [] },
          We: { price_with_time: [], start_time: [] },
          Th: { price_with_time: [], start_time: [] },
          Fr: { price_with_time: [], start_time: [] },
          Sa: { price_with_time: [], start_time: [] },
          Mo: { price_with_time: [], start_time: [] } 
        },
        basePriceOption: [{}],
        baseExtraPriceOption: [{}],
        baseMinUser: null,
        baseMaxUser: null,
        closeDates: []
      },
      wekinRefund: false,
      refundPolicyData: '',
      uploadedMainImages: [],
      uploadedMainImage: null,
      checkedDays: [],
      tempWeekData: { 
          Su: "일요일",
          Tu: "화요일",
          We: "수요일",
          Th: "목요일",
          Fr: "금요일",
          Sa: "토요일",
          Mo: "월요일"
      },
    }
  },
  computed: {
    tempEndDate: {
      get() {
        return null
      },
      set(newDate) {
        this.activity.closeDates.push(newDate)
        return null
      }
    },
    user() {
      return this.$store.state.user
    },
  },
  components: {
    FireUpload,
    Datepicker
  },
  methods: {
    submit() {
      // TODO: 제출전 형식 검사 해야함
      let params = {
        main_image: this.uploadedMainImages,
        title: this.activity.title,
        intro_detail: $('#editor').trumbowyg('html'),
        schedule: this.activity.schedule,
        inclusion: this.activity.inclusion,
        preparation: this.activity.preparation,
        address_detail: { text: this.activity.address, meet_area: this.activity.meetAddress },
        refund_policy: this.activity.refund_policy || this.refundPolicyData,
        isteamorpeople: 'people',
        category1: this.activity.category1,
        category2: '임시 카테고리',
        start_date: this.activity.startDate,
        end_date: this.activity.endDate,
        due_date: this.activity.dueDate,
        base_start_time: this.activity.baseStartTime,
        base_price: this.activity.basePrice,
        base_min_user: this.activity.baseMinUser,
        base_max_user: this.activity.baseMaxUser,
        base_price_option: this.activity.basePriceOption,
        base_extra_price_option: this.activity.baseExtraPriceOption,
        base_week_option: this.activity.baseWeekOption,
        close_dates: this.activity.closeDates,
        is_it_ticket: this.isTicket,
        ticket_due_date: this.activity.ticketDueDate,
        ticket_max_apply: this.activity.ticketMaxApply
      }
      api.addActivity(params)
        .then(result => {
          alert('위킨 신청이 완료되었습니다. 승인 후 연락드리겠습니다.')
          window.location.href = '/host/admin'
        }).catch(error => alert('에러 메세지' + error + error.message + moment().format() + "정말 죄송합니다. 메이커님 내부 오류가 발생했습니다.\n 해당 화면을 캡쳐해서 카카오톡 플러스친구 '위킨'으로 연락주시면 바로 답변드리겠습니다. 다시한번 불편드려 죄송합니다."))
    },
    deleteExtraPriceOption(index) {
      if (index === 0) {
        return
      }
      this.activity.baseExtraPriceOption.splice(index, 1)
    },
    deletePriceOption(index) {
      console.log(index)
      if (index === 0) {
        return
      }
      this.activity.basePriceOption.splice(index, 1)
    },
    sameAddress() {
      this.activity.meetAddress = this.activity.address
    },
    getPolicy() {
      api.getPolicy()
        .then((result) => this.refundPolicyData = result[0].value.body)
        .then(this.initPolicyCheckbox)
        .catch((error) => console.error(error))
    },
    imageCallback(event, trumbowyg) {
      Storage.imageUpload(event, task => {
        console.log(task)
        let url = task.snapshot.downloadURL
        let img = url.substring(0, url.indexOf('token') - 1)
        trumbowyg.execCmd('insertImage', img)
        trumbowyg.closeModal()
      }, prg => {})
    },
  },
  created() {
    this.getPolicy()
  },
  mounted() {
    $.trumbowyg.svgPath = '/static/trumbowyg/dist/ui/icons.svg';
    $('#editor').trumbowyg({
      lang: 'ko',
      btnsDef: {
        // Customizables dropdowns
        align: {
          dropdown: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
          ico: 'justifyLeft'
        },
        image: {
          dropdown: ['upload', 'base64'],
          ico: 'insertImage'
        }
      },
      plugins: {
        // Add imagur parameters to upload plugin
        uploadimage: {
          event: this.imageCallback
        }
      },
      btns: ['viewHTML',
        ['formatting'],
        'btnGrp-test',
        ['align'],
        'btnGrp-lists',
'noembed',
        ['image'],
'fullscreen',
        ['preformatted'],
      ]
    }) 
  }
}
</script>

<style lang="scss" scoped>
@import '/static/trumbowyg/dist/ui/trumbowyg.min.css';
</style>
