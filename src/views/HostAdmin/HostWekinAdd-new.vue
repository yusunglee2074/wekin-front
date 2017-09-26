<template>
  <div>
    현재페이지: {{ page }} <button @click="1 < page ? page-- : page">이전</button><button @click="10 > page ? page++ : page">다음</button>

    <div v-show="page === 1">
      제목 <input type="text" v-model="activity.title">
      카테고리 <input type="text" v-model="activity.category1">
      기본 가격 <input type="number" v-model="activity.basePrice">
      환불규정 <textarea type="text" v-model="refundPolicyData" v-show="wekinRefund"></textarea> 
      <textarea type="text" v-model="activity.refund_policy" v-show="!wekinRefund"></textarea>
      <button @click="wekinRefund = !wekinRefund">위킨환불규정 사용</button> 
    </div>

    <div v-show="page === 2">
      <div id="editor"></div>
    </div>

    <div v-show="page === 3">
      준비물 <input type="text" v-model="activity.preparation">
      포함/불포함 <input type="text" v-model="activity.inclusion">
      상세 일정 <input type="text" v-model="activity.schedule">
    </div>

    <div v-show="page === 4">
      활동장소 <input type="text" v-model="activity.address">
      집결지 <input type="text" v-model="activity.meetAddress" id="meetAddress"> <button @click="sameAddress()">활동장소와 같음</button>
    </div>

    <div v-show="page === 5">
      <div style="position:relative;flex:1" v-for="(imageUrl, index) in uploadedMainImages" v-bind:key="index">
        <img style="width:100%;height:100%" :src="imageUrl">
        <i class="icon close link" style="position:absolute; top:0;right:0" @click="deleteImage(index)"></i>
      </div>
      메인 이미지
      <FireUpload :imageUrl="uploadedMainImage" @update:imageUrl="val => uploadedMainImages.push(val)"></FireUpload>
    </div>

    <div v-show="page === 6">
      <div v-show="isTicket === true">
        티켓 유효기간 <input type="date" v-model="activity.ticketDueDate">
        티켓 발행 수<input type="number" v-model="activity.ticketMaxApply">
        <button @click="isTicket = false">날짜형식으로 변환</button>
      </div>
      <div v-show="isTicket === false">
        활동 등록 날짜
        <input type="date" v-model="activity.startDate"> 부터
        <input type="date" v-model="activity.endDate"> 까지
        <input type="time" v-model="activity.baseStartTime"> 시작시각
         <input type="number" v-model="activity.dueDate"> 시작일로부터 접수 마감 날짜
         <input type="number" v-model="activity.baseMinUser"> 최소인원 
         <input type="number" v-model="activity.baseMaxUser"> 최대인원 
        <button @click="isTicket = true">티켓형식으로 변환</button>
      </div>
      <div v-show="isTicket === null">
        <button @click="isTicket = true">티켓형식이세요?</button>
        <button @click="isTicket = false">날짜 등록식이세요?</button>
      </div>
    </div>

    <div v-show="page === 7">
      시작날짜부터 종료일까지 아래 선택한 요일들이 등록됩니다.
      <input type="checkbox" v-model="checkedDays" value="Mo">월요일
      <input type="checkbox" v-model="checkedDays" value="Tu">화요일
      <input type="checkbox" v-model="checkedDays" value="We">수요일
      <input type="checkbox" v-model="checkedDays" value="Th">목요일
      <input type="checkbox" v-model="checkedDays" value="Fr">금요일
      <input type="checkbox" v-model="checkedDays" value="Sa">토요일
      <input type="checkbox" v-model="checkedDays" value="Su">일요일
      <div v-for="index in checkedDays">
        <div>
          <p>{{ index }}</p>
          최소인원 <input type="number" v-model="activity.baseWeekOption[index].min_user"> ~ 최대인원 <input type="number" v-model="activity.baseWeekOption[index].max_user">
          시작 시각 <input type="time" v-model="activity.baseWeekOption[index].start_time"> 시각에 대한 추가가격 <input type="number" v-model="activity.baseWeekOption[index].price_with_time"> <button>추가</button>
        </div>
      </div>
      자동으로 등록되는 날짜중 휴무일이 있다면 선택해주세요.
        <input type="date" v-model="activity.closeDates"> 까지
    </div>

    <div v-show="page === 8">
      상품에 대한 옵션 가격이 있나요?
      예를 들면 A코스 B코스
      <button @click="activity.basePriceOption.push({})">추가</button>
      <div v-for="(value, index) in activity.basePriceOption">
        옵션 명 <input type="text" v-model="activity.basePriceOption[index]['name']"> 옵션 추가가격 <input type="number" v-model="activity.basePriceOption[index]['price']"> <button @click="deletePriceOption(index)">제거</button>
      </div>
    </div>

    <div v-show="page === 9">
      마지막으로 마지막 결제에 대한 추가 옵션 가격이 있나요?
      예를 들면 대인, 소인...
      <button @click="activity.baseExtraPriceOption.push({})">추가</button>
      <div v-for="(value, index) in activity.baseExtraPriceOption">
        옵션 명 <input type="text" v-model="activity.baseExtraPriceOption[index]['name']"> 옵션 추가가격 <input type="number" v-model="activity.baseExtraPriceOption[index]['price']"> <button @click="deleteExtraPriceOption(index)">제거</button>
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
        baseWeekOption: { Su: {}, Tu: {}, We: {}, Th: {}, Fr: {}, Sa: {}, Mo: {} },
        basePriceOption: [{}],
        baseExtraPriceOption: [{}],
        baseMinUser: null,
        baseMaxUser: null,
        closeDates: [moment()]
      },
      wekinRefund: false,
      refundPolicyData: '',
      uploadedMainImages: [],
      uploadedMainImage: null,
      checkedDays: [],
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  components: {
    FireUpload 
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
        close_dates: [this.activity.closeDates],
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
