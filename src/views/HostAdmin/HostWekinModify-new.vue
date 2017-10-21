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
      <select v-model="activity.category" class="ui dropdown" style="width: 300px;">
        <option value="" disabled>카테고리</option>
        <option value="투어/여행">투어/여행</option>
        <option value="익스트림 (레저)">익스트림 (레저)</option>
        <option value="스포츠 (구기종목)">스포츠 (구기종목)</option>
        <option value="음악">음악</option>
        <option value="댄스">댄스</option>
        <option value="뷰티">뷰티</option>
        <option value="요리">요리</option>
        <option value="아트">아트</option>
        <option value="힐링">힐링</option>
        <option value="아웃도어">아웃도어</option>
        <option value="요가/피트니스">요가/피트니스</option>
        <option value="소품제작">소품제작</option>
      </select>
      <h3>기본가격</h3>
      <div class="ui input focus" style="width:300px;">
        <input type="number" v-model="activity.base_price">
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
              v-model="activity.start_date" 
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
              v-model="activity.start_date" 
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
              v-model="activity.end_date" 
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
          <input type="number" v-model="activity.due_date"> 
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

      <div>
            
<div class="ui form">
  <div class="seven fields">
    <div class="field" style="padding:30px 40px 0 40px; font-size:18px;">
      월요일<input type="checkbox" v-model="checkedDays" value="Mo">
    </div>
    <div class="field" style="padding:30px 40px 0 40px; font-size:18px;">
      화요일<input type="checkbox" v-model="checkedDays" value="Tu">
    </div>
    <div class="field" style="padding:30px 40px 0 40px; font-size:18px;">
      수요일<input type="checkbox" v-model="checkedDays" value="We">
    </div>
    <div class="field" style="padding:30px 40px 0 40px; font-size:18px;">
      목요일<input type="checkbox" v-model="checkedDays" value="Th">
    </div>
    <div class="field" style="padding:30px 40px 0 40px; font-size:18px;">
      금요일<input type="checkbox" v-model="checkedDays" value="Fr">
    </div>
    <div class="field" style="padding:30px 40px 0 40px; font-size:18px;">
      토요일<input type="checkbox" v-model="checkedDays" value="Sa">
    </div>
    <div class="field" style="padding:30px 40px 0 40px; font-size:18px;">
      일요일<input type="checkbox" v-model="checkedDays" value="Su">
    </div>
  </div>
  <div class="seven fields">
    <div class="field" :class="{ disabled: !checkedDaysInclude('Mo') }">
      <label>최소인원</label>
      <input type="number" placeholder="## 명" v-model="activity.base_week_option['Mo'].min_user">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Tu') }">
      <label>최소인원</label>
      <input type="number" placeholder="## 명" v-model="activity.base_week_option['Tu'].min_user">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('We') }">
      <label>최소인원</label>
      <input type="number" placeholder="## 명" v-model="activity.base_week_option['We'].min_user">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Th') }">
      <label>최소인원</label>
      <input type="number" placeholder="## 명" v-model="activity.base_week_option['Th'].min_user">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Fr') }">
      <label>최소인원</label>
      <input type="number" placeholder="## 명" v-model="activity.base_week_option['Fr'].min_user">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Sa') }">
      <label>최소인원</label>
      <input type="number" placeholder="## 명" v-model="activity.base_week_option['Sa'].min_user">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Su') }">
      <label>최소인원</label>
      <input type="number" placeholder="## 명" v-model="activity.base_week_option['Su'].min_user">
    </div>
  </div>
  <div class="seven fields">
    <div class="field" :class="{ disabled: !checkedDaysInclude('Mo') }">
      <label>최대인원</label>
      <input type="number" placeholder="## 명" v-model="activity.base_week_option['Mo'].max_user">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Tu') }">
      <label>최대인원</label>
      <input type="number" placeholder="## 명" v-model="activity.base_week_option['Tu'].max_user">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('We') }">
      <label>최대인원</label>
      <input type="number" placeholder="## 명" v-model="activity.base_week_option['We'].max_user">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Th') }">
      <label>최대인원</label>
      <input type="number" placeholder="## 명" v-model="activity.base_week_option['Th'].max_user">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Fr') }">
      <label>최대인원</label>
      <input type="number" placeholder="## 명" v-model="activity.base_week_option['Fr'].max_user">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Sa') }">
      <label>최대인원</label>
      <input type="number" placeholder="## 명" v-model="activity.base_week_option['Sa'].max_user">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Su') }">
      <label>최대인원</label>
      <input type="number" placeholder="## 명" v-model="activity.base_week_option['Su'].max_user">
    </div>
  </div>
  <div class="seven fields">
    <div class="field" :class="{ disabled: !checkedDaysInclude('Mo') }">
      <label>시작시각</label>
      <input type="time" placeholder="" v-model="activity.base_week_option['Mo'].start_time[0]">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Tu') }">
      <label>시작시각</label>
      <input type="time" placeholder="" v-model="activity.base_week_option['Tu'].start_time[0]">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('We') }">
      <label>시작시각</label>
      <input type="time" placeholder="" v-model="activity.base_week_option['We'].start_time[0]">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Th') }">
      <label>시작시각</label>
      <input type="time" placeholder="" v-model="activity.base_week_option['Th'].start_time[0]">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Fr') }">
      <label>시작시각</label>
      <input type="time" placeholder="" v-model="activity.base_week_option['Fr'].start_time[0]">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Sa') }">
      <label>시작시각</label>
      <input type="time" placeholder="" v-model="activity.base_week_option['Sa'].start_time[0]">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Su') }">
      <label>시작시각</label>
      <input type="time" placeholder="" v-model="activity.base_week_option['Su'].start_time[0]">
    </div>
  </div>
  <div class="seven fields">
    <div class="field" :class="{ disabled: !checkedDaysInclude('Mo') }">
      <label>해당 시각 추가가격</label>
      <input type="number" placeholder="#### 원" v-model="activity.base_week_option['Mo'].price_with_time[0]">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Tu') }">
      <label>해당 시각 추가가격</label>
      <input type="number" placeholder="#### 원" v-model="activity.base_week_option['Tu'].price_with_time[0]">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('We') }">
      <label>해당 시각 추가가격</label>
      <input type="number" placeholder="#### 원" v-model="activity.base_week_option['We'].price_with_time[0]">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Th') }">
      <label>해당 시각 추가가격</label>
      <input type="number" placeholder="#### 원" v-model="activity.base_week_option['Th'].price_with_time[0]">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Fr') }">
      <label>해당 시각 추가가격</label>
      <input type="number" placeholder="#### 원" v-model="activity.base_week_option['Fr'].price_with_time[0]">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Sa') }">
      <label>해당 시각 추가가격</label>
      <input type="number" placeholder="#### 원" v-model="activity.base_week_option['Sa'].price_with_time[0]">
    </div>
    <div class="field" :class="{ disabled: !checkedDaysInclude('Su') }">
      <label>해당 시각 추가가격</label>
      <input type="number" placeholder="#### 원" v-model="activity.base_week_option['Su'].price_with_time[0]">
    </div>
  </div>
</div>


          </div>

          <div style="clear: both;">
            <br>
            <h3>영업 휴무일을 선택해주세요.</h3>
        <div class="ui calendar">
          <div class="ui input styled primary left icon">
            <datepicker 
              v-model="tempEndDate" 
              id="datepickerId" 
              wapper-class="ui input styled primary left icon" 
              language="ko" 
              format="MMM dd(D), yyyy"
              placeholder="날짜선택">
            </datepicker>
          </div>
        </div>
            <div v-for="(data, index) in activity.close_dates">
              {{ data | formatDateWithMoment }}
              <button @click="activity.close_dates.splice(index, 1)">삭제</button>
            </div>
          </div>
        </div>

    <div v-show="page === 8">
      <h2>위킨 옵션이 있나요?</h2>
      <button @click="activity.base_price_option.push({})">추가</button>
      <div v-for="(value, index) in activity.base_price_option" style="width:400px;">
        <p>옵션 이름</p>
        <div class="ui input focus" style="width:300px;">
          <input type="text" v-model="activity.base_price_option[index]['name']">
        </div>
        <p>추가가격</p>
        <div class="ui input focus" style="width:300px;">
          <input type="number" v-model="activity.base_price_option[index]['price']">
        </div>
        <button @click="deletePriceOption(index)">제거</button>
        <div class="ui section divider"></div>
      </div>
    </div>

    <div v-show="page === 9">
      <h2>결제 추가 옵션 사항이 있나요?</h2>
      <button @click="activity.base_extra_price_option.push({})">추가</button>
      <div v-for="(value, index) in activity.base_extra_price_option" style="width:400px;">
        <p>옵션 이름</p>
        <div class="ui input focus" style="width:300px;">
          <input type="text" v-model="activity.base_extra_price_option[index]['name']">
        </div>
        <p>옵션 추가가격</p>
        <div class="ui input focus" style="width:300px;">
          <input type="number" v-model="activity.base_extra_price_option[index]['price']">
        </div>
        <button @click="deleteExtraPriceOption(index)">제거</button>
        <div class="ui section divider"></div>
      </div>
    </div>

    <div v-show="page === 10">
      <button @click="submit()">수정요청</button>
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
        base_week_option: { 
          Su: { min_user: null, max_user: null, price_with_time: [], start_time: [] },
          Tu: { min_user: null, max_user: null, price_with_time: [], start_time: [] },
          We: { min_user: null, max_user: null, price_with_time: [], start_time: [] },
          Th: { min_user: null, max_user: null, price_with_time: [], start_time: [] },
          Fr: { min_user: null, max_user: null, price_with_time: [], start_time: [] },
          Sa: { min_user: null, max_user: null, price_with_time: [], start_time: [] },
          Mo: { min_user: null, max_user: null, price_with_time: [], start_time: [] } 
        },
        base_price_option: [{}],
        base_extra_price_option: [{}],
        baseMinUser: 0,
        baseMaxUser: 0,
        close_dates: [],
        category: null,
        base_price: 0,
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
        this.activity.close_dates.push(newDate)
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
    checkedDaysInclude(text) {
      return this.checkedDays.includes(text)
    },
    submit() {
      // TODO: 제출전 형식 검사 해야함
      let params = {
        host_key: this.user.Host.host_key,
        main_image: this.uploadedMainImages,
        title: this.activity.title,
        intro_detail: $('#editor').trumbowyg('html'),
        schedule: this.activity.schedule,
        inclusion: this.activity.inclusion,
        preparation: this.activity.preparation,
        address_detail: { text: this.activity.address, meet_area: this.activity.meetAddress },
        refund_policy: this.activity.refund_policy || this.refundPolicyData,
        isteamorpeople: 'people',
        category1: this.activity.category,
        category2: this.activity.activity_key,
        start_date: this.activity.start_date,
        end_date: this.activity.end_date,
        due_date: this.activity.due_date,
        base_start_time: this.activity.baseStartTime,
        base_price: this.activity.base_price,
        base_min_user: 0,
        base_max_user: 0,
        base_price_option: this.activity.base_price_option,
        base_extra_price_option: this.activity.base_extra_price_option,
        base_week_option: this.activity.base_week_option,
        close_dates: this.activity.close_dates,
        is_it_ticket: this.isTicket,
        ticket_due_date: this.activity.ticketDueDate,
        ticket_max_apply: this.activity.ticketMaxApply,
        // 수정요청  status 9
        status: 9 
      }
      for (let i = 0; i < params.close_dates; i++) {
        params.close_dates[i] = Number(params.close_dates[i])
      }
      if (this.activity.status === 1) {
        params.status = 1
        api.updateActivity(this.activity.activity_key, params)
          .then(result => {
            alert('위킨 수정이 완료되었습니다.')
            window.location.href = '/host/admin'
          })
          .catch(error => {
            alert('에러 메세지' + error + error.message + moment().format() + "정말 죄송합니다. 메이커님 내부 오류가 발생했습니다.\n 해당 화면을 찍어서 카카오톡 플러스친구 '위킨'으로 연락주시면 바로 답변드리겠습니다. 다시한번 불편드려 죄송합니다.")
            return
          })
      } else {
        api.addActivity(params)
          .then(result => {
            alert('위킨 수정 신청이 접수되었습니다.')
            window.location.href = '/host/admin'
          }).catch(error => alert('에러 메세지' + error + error.message + moment().format() + "정말 죄송합니다. 메이커님 내부 오류가 발생했습니다.\n 해당 화면을 찍어서 카카오톡 플러스친구 '위킨'으로 연락주시면 바로 답변드리겠습니다. 다시한번 불편드려 죄송합니다."))
      }
    },
    deleteExtraPriceOption(index) {
      if (index === 0) {
        return
      }
      this.activity.base_extra_price_option.splice(index, 1)
    },
    deletePriceOption(index) {
      if (index === 0) {
        return
      }
      this.activity.base_price_option.splice(index, 1)
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
        let url = task.snapshot.downloadURL
        let img = url.substring(0, url.indexOf('token') - 1)
        trumbowyg.execCmd('insertImage', img)
        trumbowyg.closeModal()
      }, prg => {})
    },
  },
  created() {
    this.getPolicy()
    let activities = this.$store.getters.hostActivities
    for (let i = 0; i < activities.length; i++) {
      if (activities[i].activity_key === this.$route.params.key) {
        this.activity = Object.assign({}, activities[i])
        this.activity.address = String(activities[i].address_detail.text)
        this.activity.meetAddress = String(activities[i].address_detail.meet_area)
        this.uploadedMainImages = Object.assign({}, activities[i].main_image)
        for (let week in activities[i].base_week_option) {
          if (activities[i].base_week_option[String(week)].min_user > 0) {
            // 위킨 수정시 요일 옵션 자동으로 채워지게 해야함kkkkkkkkkkkkkkkkkkkk
            this.checkedDays.push(String(week))
          }
        }
        let tempLength = activities[i].close_dates.length
        this.activity.close_dates = []
        for (let y = 0; y < tempLength; y++) {
          let tmp = activities[i].close_dates[y]
          this.activity.close_dates.push(moment("20" + tmp.slice(1, 3) + "-" + tmp.slice(3, 5) + "-" + tmp.slice(5, 7)).format())
        }
        setTimeout(function(){ $('#editor').trumbowyg('html', activities[i].intro_detail) }, 1000);
        break;
      }
    }
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
