<template>
  <div id="WekinDetail" v-if="activity">
    <div class="navbar-custom"></div>
    <div class="wekin swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide top-slide" v-for="(image, index) in activity.main_image.image" v-bind:key="index">
          <div :style="`background-image:url(${image})`"></div>
        </div>
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </div>
    <div class="ui container segment unboxing info-container" id="info-container">
      <div class="ui right rail apply-container">
        <div class="ui sticky">
          <div class="ui segment">
            <h2 style="margin-top:0">{{activity.title}}</h2>
            <p v-if="activity.address">
              <i class="icon marker"></i>{{activity.address}}
            </p>
            <p v-if="activity.address">
              <i class="icon won"></i>{{activity.base_price}}
            </p>
            <div class="ui calendar">
              <div class="ui input styled primary left icon" style="width: 260px;">
                <i v-show="!requestData.selectedDate" class="icon calendar wekin-calendar-icon"></i>
                <datepicker 
                  v-model="requestData.selectedDate" 
                  id="datepickerId" 
                  input-class="width260" 
                  language="ko" 
                  format="MMM dd(D), yyyy"
                  placeholder="        날짜선택"
                  :disabled="calendar"
                  v-on:input="resetSelection">
                </datepicker>
              </div>
            </div>
            <div v-show="requestData.selectedDate && selectedDateIsAllowToBooking">
              <p style="font-size: 14px; margin: 20px 0 2px 0;">시각 선택</p>
              <select v-model="requestData.startTime" class="width260 height25" @change="getCurrentNumberOfBookingUsers()">
                <option value="sample" disabled>시작시각</option>
                <option v-for="(item, index) in startTimeList" :value="[item[0], item[1]]">
                  {{ item[0] }} {{ item[1] | Won }}
                </option>
              </select>
            </div>
            <div v-show="requestData.startTime !== 'sample'">
              <p style="font-size: 14px; margin: 20px 0 2px 0;">코스 선택</p>
              <select v-model="requestData.selectedOption" class="width260 height25">
                <option value="sample" disabled>옵션을 선택해주세요</option>
                <option v-for="(item, index) in activity.base_price_option" :value="[item.name, item.price]">
                  {{ item.name }} {{ item.price | Won }}
                </option>
              </select>
            </div>
            <div v-show="requestData.selectedOption !== 'sample'">
              <p style="font-size: 14px; margin: 20px 0 2px 0;">수량 선택</p>
              <div style="border: 0.5px solid Gainsboro; padding: 10px 10px;">
                <div v-for="(item, index) in activity.base_extra_price_option">
                  <div style="height:22px; margin-top:10px;">
                    <span style="float: left">{{ item.name }} {{ item.price | Won }}</span>
                    <div style="float: right">
                      <span>₩ {{ +requestData.startTime[1] + +activity.base_price + +item.price + +requestData.selectedOption[1] | joinComma }}</span>
                      <button @click="requestData.selectedExtraOption[index] > 0 ? requestData.selectedExtraOption[index]-- : null">-</button>
                      <span>{{requestData.selectedExtraOption[index]}} </span>
                      <button @click="totalRequestAmount < activity.base_week_option[requestData.selectedYoil].max_user ? requestData.selectedExtraOption[index]++ : null">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="finalPrice >0" style="text-align:right; margin-top:20px;">
              <h3>활동 가격 ₩ {{ finalPrice | joinComma }} </h3>


            </div>
            <div v-if="requestData.selectedDate">
              <p style="font-size:13px; margin-top:12px;color:red;" v-if="!selectedDateIsAllowToBooking" >해당 날짜 인원 마감되었습니다.</p>
            </div>

            <button class="negative ui button full-width apply-btn"
              style="margin-top:15px;"
              id="membershipvirtualview"
              v-on:click="onApplyBtn()"
              v-if="user">
              신청하기
            </button>
            <button class="negative ui button full-width apply-btn" id="virtualview" v-on:click="onApplyBtn()" v-if="!user">
              신청하기
            </button>
          </div>
          <div class="ui segment additional-button-container">
            <button class="ui basic button full-width" id="virtualview" @click="toggleFavorite()">
              <i class="icon bookmark" v-bind:class="{remove: !isFavoritedActivity, red: isFavoritedActivity}"></i>관심목록 추가</button>
            <a class="ui basic button full-width" id="virtualview" @click="onMailClick()">
              <i class="icon outline mail"></i>이메일 문의</a>
            <a class="ui basic button full-width" v-on:click="snsShow = !snsShow">
              <transition name="fade" mode="out-in">
                <span v-if="!snsShow" key="share"><i class="share alternate icon"></i>공유하기</span>
                <span v-else key="button">
                  <img class="facebookLogoBtn" @click="onFacebookShareClick()" src="/static/images/ic-facebook.png" style="width:28px;height=28px; margin-right:10px;">
                  <img class="facebookLogoBtn" @click="snsShare('google')" src="/static/images/ic-google.png" style="width:28px;height=28px; margin-right:10px;">
                  <img class="facebookLogoBtn" @click="snsShare('kakaostory')" src="/static/images/ic-kakaostory.png" style="width:28px;height=28px; margin-right:10px;">
                  <img class="facebookLogoBtn" @click="snsShare('naver')" src="/static/images/ic-naver.png" style="width:28px;height=28px; margin-right:10px;">
                </span>
              </transition>
            </a>
          </div>
        </div>
      </div>
      <div class="ui pointing secondary menu">
        <a :class="{ item: true, active: tabPage === 1}" @click="goTab(1)">개요</a>
        <a :class="{ item: true, active: tabPage === 2}" @click="goTab(2)">후기({{activity.review_count}})</a>
        <a :class="{ item: true, active: tabPage === 3}" @click="goTab(3)">Q&amp;A</a>
      </div>
      <div class="ui tab overview active" id="first" v-if="tabPage === 1">
        <div class="title-mobile-container">
          <h2>{{activity.title}}</h2>
          <p v-if="activity.address_detail">
            <i class="icon marker"></i>{{activity.address}}
          </p>
          <p>
            <i class="icon won"></i>{{activity.base_price | joinComma}}원
          </p>
      <div style="display:inline-block;">
          <div style="" v-on:click="snsShow = !snsShow">
            <span>
              <img class="facebookLogoBtn" @click="onFacebookShareClick()" src="/static/images/ic-facebook.png" style="cursor:pointer;width:32px;height=32px; margin-right:10px;">
              <img class="facebookLogoBtn" @click="snsShare('google')" src="/static/images/ic-google.png" style="cursor:pointer;width:32px;height=32px; margin-right:10px;">
              <img class="facebookLogoBtn" @click="snsShare('kakaostory')" src="/static/images/ic-kakaostory.png" style="cursor:pointer;width:32px;height=32px; margin-right:10px;">
              <img class="facebookLogoBtn" @click="snsShare('naver')" src="/static/images/ic-naver.png" style="cursor:pointer;width:32px;height=32px; margin-right:10px;">
            </span>
          </div>
      </div>
          <div class="ui divider"></div>
        </div>
        <h4>메이커</h4>
        <div class="maker flex">
          <a :href="`/host/${activity.Host.host_key}`">
            <img tag="img" class="ui top aligned tiny image circular profile link" :src="activity.Host.profile_image"></img>
          </a>
          <div class="content">
            <strong class="name">{{activity.Host.name}}</strong>
            <span>
              <img class="badge" src="/static/images/ic-maker.png"> {{activity.Host.type | hostType}}
            </span>
            <p class="pre">{{activity.Host.introduce}}</p>
            <p class="pre">{{activity.Host.history}}</p>
            <p v-if="activity.Host.home_page">홈페이지 : <a :href="hostHomePage" target="_blank"> {{activity.Host.home_page}}</a></p>
            <p v-if="activity.Host.sns" target="_blank">SNS : <a :href="hostSNS" target="_blank">{{activity.Host.sns}}</a></p>
          </div>
        </div>
        <div class="ui divider"></div>
        <h4>상세 설명</h4>
        <p class="explain-detail pre" v-bind:class="{ expanded: isExpanded }" v-html="activity.intro_detail"></p>
        <a class="expand-btn link" v-if="!isExpanded" @click="toggleExpend()">펼치기</a>
        <a class="expand-btn link" v-if="isExpanded" @click="toggleExpend()">접기</a>
        <div class="ui divider"></div>
        <h4>세부일정</h4>
        <div class="schedules">
          <p class="pre">{{activity.schedule}}</p>
        </div>
        <div class="ui divider"></div>
        <h4>포함 사항 / 불포함 사항</h4>
        <p class="pre">{{activity.inclusion}}</p>
        <div class="ui divider"></div>
        <h4>준비물</h4>
        <p>{{activity.preparation}}</p>
        <div class="ui divider"></div>
        <h4 v-if="wekiners.length">참석 위키너</h4>
        <a :href="`/users/${wekiner.user_key}`" v-for="(wekiner, index) in wekiners" v-bind:key="index">
          <img class="ui tiny circular image wekiner link" :src="wekiner.User.profile_image"></img>
        </a>
        <div v-if="wekiners.length" class="ui divider"></div>
        <h4>집결지</h4>
        <div class="google-map link" v-if="activity.address_detail">
          <p>{{activity.address_detail.text}}</p>
          <p @click="onMapClick()">
            <img :src="activity.address_detail.mapImg">
          </p>
        </div>
        <div class="ui divider"></div>
        <h4>환불 규정</h4>
        <p class="pre">{{activity.refund_policy}}</p>
        <div class="ui divider"></div>
        <h4>문의사항</h4>
        <p>위킨 연락처</p>
        <p> 전화번호 : 031-211-0410 </p>
        <p> 이메일 : wekin@wekiner.com </p>
        <p> 카카오톡 : @wekiner </p>
        <div class="ui divider"></div>
        <h4>'{{ activity.category }}' 카테고리 관련 위킨</h4>
        <div class="mobile-small-wekin">
          <smallWekin :activity="activity" v-for="activity in activities" :key="activity.activity_key" style="margin:0 auto;"></smallWekin>
          <br style="clear: left;" />
        </div>
      </div>
      <div class="ui review" id="second" v-if="tabPage === 2">
        <review-layout :review="review" v-for="(review, index) in reviews" v-bind:key="index" v-if="reviews.length >= 0"></review-layout>
        <div v-if="reviews.length == 0" style="text-align: center;color: #979797;">아직 작성 된 후기가 없습니다.</div>
        <button class="ui basic button more-btn" @click="getReviews(reviewPage++)" v-if="!isLastReview">더보기</button>
      </div>
      <div class="ui qna" id="third" v-if="tabPage === 3">
        <strong>궁금한 점이 있으신가요? 문의해 주시면 메이커가 답변을 해드립니다.</strong>
        <div class="qna-form-container">
          <div class="ui form">
            <div class="field">
              <textarea placeholder="질문을 입력해주세요." v-model="content"></textarea>
            </div>
          </div>
          <div class="qna-buttons-container">
              <select name="" v-model="privateMode">
                <option value="false">공개</option>
                <option value="true">비공개</option>
              </select>
            <button class="ui primary button" @click="postQnA()">문의하기</button>
          </div>
        </div>
        <div style="margin-top:80px;">

<div class="ui comments">
  <h3 class="ui dividing header">문의글</h3>

  <div class="comment" v-for="question in questions.rows">
    <a class="avatar">
      <img class="photo2" :src="question.User.profile_image">
    </a>
    <div class="content">
      <a class="author">{{ question.User.name }}</a>
      <div class="metadata">
        <span class="date">{{ question.created_at | formatDateTimeKo }}</span>
      </div>
      <div class="text">
        <p>{{ question.content }}</p>
      </div>
    </div>
    
    <div class="comments" v-if="question.answer">
      <div class="comment">
        <a class="avatar">
          <img class="photo2" :src="activity.Host.profile_image">
        </a>
        <div class="content">
          <a class="author">{{ activity.Host.name }}</a>
          <div class="metadata">
            <span class="date">{{ question.updated_at | formatDateTimeKo }}</span>
          </div>
          <div class="text">
            <p>{{ question.answer }}</p>
          </div>
        </div>
      </div>
    </div>
<div class="ui divider"></div>

  </div>
</div>
        
        </div>
      </div>
    </div>

    <!-- waiting modal -->
    <div class="ui modal waiting-modal">
      <i class="close icon"></i>
      <div class="title">대기신청자 알림받기</div>
      <p>대기 신청자 알림받을 방법을 선택해주세요.</p>
      <button class="ui basic button full-width" v-bind:class="{primary: isEmailNotiChecked}" @click="toggleButton('email')">이메일로 알림받기</button>
      <button class="ui basic button full-width" v-bind:class="{primary: isSmsNotiChecked}" @click="toggleButton('sms')">SMS 알림받기</button>
      <div class="actions">
        <div class="ui negative button approve" id="confirm" @click="onRequestNotificationClick()">확인</div>
      </div>
    </div>
    <!-- waiting modal to confirm modal -->
    <div class="ui modal confirm-modal">
      <i class="close icon"></i>
      <div class="title">대기신청이 완료되었습니다.</div>
      <div class="actions">
        <div class="ui negative button approve" id="confirm">확인</div>
      </div>
    </div>

    <!-- 모바일 버전 ! -->
    <div class="mobile-container">
      <div class="mobile-button-container">
        <div class="mobile-action-button-container">
          <button class="ui white button" @click="toggleFavorite()">
            <i class="icon bookmark" v-bind:class="{remove: !isFavoritedActivity, red: isFavoritedActivity}"></i>
          </button>
          <!--<a :href="'mailto:' + activity.Host.User.email" class="ui white button">
            <i class="icon outline mail"></i>
          </a>-->
          <button class="ui white button" @click="onMailClick()">
            <i class="icon outline mail"></i>
          </button>
          <button class="negative ui button mobile-apply-btn" id="membershipvirtualview"  @click="toggleMobileForm()" v-if="!isMobileFormShowing && user">
            신청하기
          </button>
          <button class="negative ui button mobile-apply-btn" id="virtualview"  @click="toggleMobileForm()" v-if="!isMobileFormShowing && !user">
            신청하기
          </button>
        </div>
      </div>

      <div class="mobile-form-container-back-layer" v-if="isMobileFormShowing" @click="toggleMobileForm()">
      </div>
      <div class="mobile-form-container" v-if="isMobileFormShowing">
            <div class="ui calendar">
              <div class="ui input styled primary left icon" style="width: 260px;">
                <i v-show="!requestData.selectedDate" class="icon calendar wekin-calendar-icon"></i>
                <datepicker 
                  v-model="requestData.selectedDate" 
                  id="datepickerId" 
                  input-class="width260" 
                  language="ko" 
                  format="MMM dd(D), yyyy"
                  placeholder="        날짜선택"
                  :disabled="calendar"
                  v-on:input="resetSelection">
                </datepicker>
              </div>
            </div>
            <div v-show="requestData.selectedDate && selectedDateIsAllowToBooking">
              <p style="font-size: 14px; margin: 20px 0 2px 0;">시각 선택</p>
              <select v-model="requestData.startTime" class="width260 height25" @change="getCurrentNumberOfBookingUsers()">
                <option value="sample" disabled>시작시각</option>
                <option v-for="(item, index) in startTimeList" :value="[item[0], item[1]]">
                  {{ item[0] }} {{ item[1] | Won }}
                </option>
              </select>
            </div>
            <div v-show="requestData.startTime !== 'sample'">
              <p style="font-size: 14px; margin: 20px 0 2px 0;">코스 선택</p>
              <select v-model="requestData.selectedOption" class="width260 height25">
                <option value="sample" disabled>옵션을 선택해주세요</option>
                <option v-for="(item, index) in activity.base_price_option" :value="[item.name, item.price]">
                  {{ item.name }} {{ item.price | Won }}
                </option>
              </select>
            </div>
            <div v-show="requestData.selectedOption !== 'sample'">
              <p style="font-size: 14px; margin: 20px 0 2px 0;">수량 선택</p>
              <div style="border: 0.5px solid Gainsboro; padding: 10px 10px;">
                <div v-for="(item, index) in activity.base_extra_price_option">
                  <div style="height:22px; margin-top:10px;">
                    <span style="float: left">{{ item.name }} {{ item.price | Won }}</span>
                    <div style="float: right">
                      <span>₩ {{ +requestData.startTime[1] + +activity.base_price + +item.price + +requestData.selectedOption[1] | joinComma }}</span>
                      <button @click="requestData.selectedExtraOption[index] > 0 ? requestData.selectedExtraOption[index]-- : null">-</button>
                      <span>{{requestData.selectedExtraOption[index]}} </span>
                      <button @click="totalRequestAmount < activity.base_week_option[requestData.selectedYoil].max_user ? requestData.selectedExtraOption[index]++ : null">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="finalPrice >0" style="text-align:right; margin-top:20px;">
              <h3>활동 가격 ₩ {{ finalPrice | joinComma }} </h3>


            </div>
            <div v-if="requestData.selectedDate">
              <p style="font-size:13px; margin-top:12px;color:red;" v-if="!selectedDateIsAllowToBooking" >해당 날짜 인원 마감되었습니다.</p>
            </div>

            <button class="negative ui button full-width apply-btn"
              style="margin-top:15px;"
              id="membershipvirtualview"
              v-on:click="onApplyBtn()"
              v-if="user">
              신청하기
            </button>
            <button class="negative ui button full-width apply-btn" id="virtualview" v-on:click="onApplyBtn()" v-if="!user">
              신청하기
            </button>
      </div>
    </div>
    <mail-component ref="mailRef"></mail-component>
    <!-- 모바일 끝 -->
  </div>
</template>
<script>
import reviewLayout from 'components/ReviewLayout.vue'
import mailComponent from 'components/MailComponent.vue'
import smallWekin from 'components/Activity/SmallWekin.vue'
import auth from './../../auth';
import api from 'api'
import _ from 'lodash'
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';

export default {
  components: {
    smallWekin,
    reviewLayout,
    mailComponent,
    Datepicker
  },
  filters: {
    Won(num) {
      if (num > 0) {
        return ' (+' + num + ' 원)'
      } else if (num == 0) {
        return ''
      } else if (num < 0) {
        return ' (' +  num + ' 원)'
      }
    },
    qnaStatus(answer) {
      if (answer) {
        return "답변완료"
      }
      return "처리중"
    },
    hostType(type) {
      switch (type) {
        case 0:
          return "일반인"
        case 1:
          return "전문가(업체)"
        case 2:
          return "전문가(개인)"
      }
    },
    checkSchedule(wekin) {
      // if(wekin.
      return ''
    }
  },
  computed: {
    totalRequestAmount() {
      let total = 0
      for (let i in this.requestData.selectedExtraOption) {
        total += this.requestData.selectedExtraOption[i]
      }
      return total + this.requestData.currentUserOfSelectedDate
    },
    finalPrice() {
      let extraOption = this.requestData.selectedExtraOption
      let finalPrice = 0
      for (let item in extraOption) {
        if (extraOption[item] !== 0) {
          finalPrice += extraOption[item] * (+this.activity.base_price + +this.requestData.selectedOption[1] + +this.requestData.startTime[1] + +this.activity.base_extra_price_option[item].price)

        }
      }
      this.requestData.finalPrice = finalPrice
      return finalPrice 
    },
    calendar() {
      let toDate = moment(this.activity.start_date).add(-this.activity.due_date, 'days') - moment().add(-this.activity.due_date, 'days') > 0 
        ? moment(this.activity.start_date).add(-this.activity.due_date + 1, 'days') 
        : moment().add(-this.activity.due_date + 1, 'days')
      let result = {
        to: toDate.toDate(),
        from: moment(this.activity.end_date).toDate(),
        dates: this.activity.datesList,
        days: this.activity.days 
      }
      return result
    },
    startTimeList() {
      if(this.requestData.selectedDate) {
        let dayOfWeek = moment(this.requestData.selectedDate).format('dd')
        let result = []
        let selectedDay = this.activity.base_week_option[dayOfWeek]
        for (let i = 0; i < selectedDay.start_time.length; i++) {
          result[i] = [selectedDay.start_time[i], selectedDay.price_with_time[i]]
        }
        return result 
      }
    },
    user() {
      return this.$store.state.user
    },
    hostHomePage() {
      return (this.activity.Host.home_page).slice(0, 3) == 'htt' ? this.activity.Host.home_page : ('http://' + this.activity.Host.home_page)
    },
    hostSNS() {
      return (this.activity.Host.sns).slice(0, 3) == 'htt' ? this.activity.Host.sns : ('http://' + this.activity.Host.sns)
    }
  },
  asyncComputed: {
    filteredQuestions() {
      return this.questions.rows.filter(question => {
        if (this.isMyQuestionOnlyChecked) {
          if (question.user_key === this.user.user_key) {
            return question
          } else {
            return
          }
        } else {
          return question
        }
      })
    }
  },
  data() {
    return {
      snsShow: false,
      openQnAIndex: [],
      activities: [],
      tabPage: 1,
      isMyQuestionOnlyChecked: false,
      mySwiper: null,
      isApplyAvailable: true,
      isExpanded: true,
      isSmsNotiChecked: false,
      isEmailNotiChecked: false,
      activity: {
        main_image: {
          image: null
        },
        Host: {
          User: {
            email: ''
          }
        }
      },
      wekiners: [],
      reviews: [],
      questions: {
        rows: []
      },
      isLastReview: false,
      isLastQna: false,
      reviewPage: 0,
      qnaPage: 0,
      content: null,
      privateMode: false,
      isScheduleSelected: false,
      isMobileFormShowing: false,
      isFavoritedActivity: false,
      isRequested: false, // 예약 요청되었는지 여부
      peopleCount: 0,
      isDropdownClicked: false,
      requestData: {
        selectedYoil: null,
        currentUserOfSelectedDate: 0,
        startTime: 'sample',
        selectedOption: 'sample',
        selectedDate: null,
        selectedExtraOption: {
          0: 0,
          1: 0,
          2: 0
        },
      },
      selectedDateIsAllowToBooking: true,
      selectCourseOptionShow: true,
      selectTimeOptionShow: true,
    }
  },
  watch: {
    '$route': 'getActivity'
  },
  methods: {
    goTab(page) {
      this.tabPage = page
    },
    getCurrentNumberOfBookingUsers() {
      api.getCurrentNumberOfBookingUsers(this.$route.params.key, moment(this.requestData.selectedDate).format(), this.requestData.startTime[0])
        .then( result => {
          if (result.data == this.activity.base_week_option[this.requestData.selectedYoil].max_user) {
            this.selectedDateIsAllowToBooking = false
          } else {
            this.selectedDateIsAllowToBooking = true
          }
          this.requestData.currentUserOfSelectedDate = result.data
        })
        .catch( error => console.log(error.response.data) )
    },
    resetSelection(evnt) {
      if (evnt) {
        this.requestData.selectedYoil = moment(this.requestData.selectedDate).format('dd')
        this.requestData.startTime = 'sample'
        if (this.startTimeList.length === 1) {
          this.requestData.startTime = this.startTimeList[0]
        }
        if (this.activity.base_price_option.length === 1) {
          this.requestData.selectedOption = [this.activity.base_price_option[0].name, this.activity.base_price_option[0].price]
        }
        this.requestData.selectedExtraOption = {
          0: 0,
          1: 0,
          2: 0
        }
      }
    },
    snsShare(sns_type) {
      //TODO
      var title = $("#ogTitle").attr('content');
      //var href = window.location.href;
      var href = api.forSNSLoginUrl + '/share/' + this.activity.activity_key
      var loc = "";
      var img = 'http://we-kin.com/static/images/default-profile.png'
      var oFlag = true;

      if (sns_type == 'facebook') {
        console.log("fb")
        loc = '//www.facebook.com/sharer/sharer.php?u=' + href + '&t=' + title;
      }
      else if (sns_type == 'twitter') {
        loc = '//twitter.com/home?status=' + encodeURIComponent(title) + ' ' + href;
      }
      else if (sns_type == 'google') {
        loc = '//plus.google.com/share?url=' + href;
      }
      else if (sns_type == 'kakaostory') {
        loc = 'https://story.kakao.com/share?url=' + href;
      }
      else if (sns_type == 'band') {
        loc = 'http://www.band.us/plugin/share?body=' + encodeURIComponent(title) + '%0A' + encodeURIComponent(href);
      }
      else if (sns_type == 'naver') {
        loc = "http://share.naver.com/web/shareView.nhn?url=" + encodeURIComponent(href) + "&title=" + encodeURIComponent(title);
      }
      else {
        return false;
      }
      window.open(loc);
    },
    onFacebookShareClick() {
      window.open(`https://www.facebook.com/v2.1/dialog/feed?&app_id=101477687056507&display=popup&locale=ko_KR&link=${encodeURIComponent(`${api.forSNSLoginUrl}/share/${this.activity.activity_key}`)}&version=v2.1`,
        'facebookShare',
        'toolbar=0,status=0,width=625,height=435'
      );
    },
    onRequestNotificationClick() {
      let method = []
      if (this.isEmailNotiChecked) method.push('mail')
      if (this.isSmsNotiChecked) method.push('sms')
      api.requestWaiting(this.selectedWekin.wekin_key, method.join())
        .then((result) => console.log(result))
        .catch((error) => console.error(error))
    },
    onCancelWaitingClick() {
      api.cancelWaiting(this.selectedWekin)
        .then((result) => console.log(result))
        .catch((error) => console.error(error))
    },
    onMailClick() {
      if (this.user) {
        this.$refs.mailRef.showMailComponent(this.activity.title)
      } else {
        alert("로그인이 필요한 서비스 입니다.")
        this.$parent.$refs.navbar.showModalLogin()
      }
    },
    toggleButton(button) {
      if (button == 'email') {
        this.isEmailNotiChecked = !this.isEmailNotiChecked
      } else {
        this.isSmsNotiChecked = !this.isSmsNotiChecked
      }
    },
    toggleExpend() {
      this.isExpanded = !this.isExpanded
      this.$nextTick(() => {
        $('.ui.sticky').sticky()
      })
    },
    onMapClick() {
      let location = this.activity.address_detail.location
      window.open(`https://m.map.naver.com/map.nhn?lat=${location.lat}&lng=${location.lng}`)
    },
    toggleFavorite() {
      if (this.user) {
        api.toggleFavorite(this.user.user_key, this.$route.params.key)
          .then(result => {
            if (result === 1) {
              this.isFavoritedActivity = false
            } else {
              this.isFavoritedActivity = true
            }
          })
          .catch(error => console.error(error))
      } else {
        alert("로그인이 필요한 서비스 입니다.")
        this.$parent.$refs.navbar.showModalLogin()
      }
    },
    getUserFavorite() {
      if (this.user) {
        api.getUserFavorite(this.user.user_key)
          .then(favorites => {
            favorites.forEach(favorite => {
              if ((favorite.user_key == this.user.user_key) && favorite.activity_key == this.$route.params.key) {
                this.isFavoritedActivity = true
              }
            })
          })
          .catch(error => console.error(error))
      }
    },
    jsonToString(json) {
      return JSON.stringify(json)
    },
    toggleMobileForm() {
      if (this.user) {
        this.isMobileFormShowing = !this.isMobileFormShowing
      } else {
        alert("로그인이 필요한 서비스 입니다.")
        this.$parent.$refs.navbar.showModalLogin()
      }
    },
    /*
    toggleMobileForm() {
      if (this.user) {
        this.isMobileFormShowing = !this.isMobileFormShowing
        this.$nextTick(() => {
          $('.ui.dropdown.schedule')
            .dropdown({
              maxSelections: 3,
              onChange: (value) => {
                var wekin = _.find(this.wekins, (wekin) => {
                  return wekin.wekin_key == value
                })
                this.selectedWekin = wekin
                this.$nextTick(() => {
                  this.dropdownPeopleCount()
                  this.getAttendWekiners()
                })
              }
            })
        })
      } else {
        alert("로그인이 필요한 서비스 입니다.")
        this.$parent.$refs.navbar.showModalLogin()
      }
    },
    */
    activeDropdown() {
      $('.qna-buttons-container .ui.selection.dropdown').dropdown()
    },
    onApplyBtn() {
      if (!this.requestData.selectedDate) {
        window.alert("날짜를 선택해주세요.")
        return
      } else if (this.requestData.startTime === 'sample') {
        window.alert("시각을 선택해주세요.")
        return
      } else if (this.requestData.selectedOption === 'sample') {
        window.alert("코스옵션을 선택해주세요.")
        return
      } else if (this.requestData.selectedExtraOption[0] == 0 && this.requestData.selectedExtraOption[1] == 0 && this.requestData.selectedExtraOption[2] == 0 ) {
        window.alert("인원옵션을 선택해주세요.")
        return
      }
      if (this.user) {
        auth.getCurrentUser()
          .then(result => {
            if (this.checkForm()) {
              if (this.isApplyAvailable) {
                if (this.checkLoginState()) {
                  let params = this.requestData
                  params.activity_key = this.activity.activity_key
                  params.max_user = this.activity.base_week_option[this.requestData.selectedYoil].max_user
                  api.postWekin(params)
                    .then(result => {
                      if (result.message == 'error') {
                        alert("죄송합니다. 해당 날짜에 예약인원이 마감되었습니다.")
                        return
                      }
                      // requestData에 위킨키 추가
                      this.requestData.wekin_key = result.data.wekin_key || result.data[1][0].wekin_key
                      this.requestData.amount = result.data.pay_amount || result.data[1][0].pay_amount
                      this.$router.push({
                        name: 'Payment',
                        path: `/activity/${this.$route.params.key}/payment`,
                        params: {
                          requestData: this.requestData
                        }
                      })
                    })
                    .catch( error => {
                      alert(moment().format() + error + "\n내부적인 오류가 발생했습니다.\n위키너님 죄송합니다.\n해당 화면을 휴대폰으로 찍어\n카카오톡 @위킨에 보내주시면 빠르게 도와드리겠습니다.\n다시한번 죄송합니다.") 
                    })
                } else {
                  this.$router.push(`/login`)
                }
              } else {
                if (this.isRequested && confirm("정말 취소하시겠습니까?")) { // 대기신청 취소
                  api.cancelWaiting(this.selectedWekin.wekin_key)
                    .then((result) => console.log(result))
                    .catch((error) => console.error(error))
                  this.isRequested = false
                  $('.apply-btn')
                    .removeClass('negative')
                    .addClass('primary')
                    .text('대기 신청하기')
                } else {  // 대기 신청 화면
                  $('.ui.modal.waiting-modal').modal('show')
                }
              }
            }
          })
          .catch(error => console.log("에러", error))
      } else {
        alert("로그인이 필요한 서비스 입니다.")
        this.$parent.$refs.navbar.showModalLogin()
      }
    },
    checkForm() {
      let currentUser = this.requestData.currentUserOfSelectedDate
      let maxUser = this.activity.base_week_option[this.requestData.selectedYoil].max_user
      if (this.finalPrice === 0 || maxUser - currentUser < 1) {
        return false
      }
      return true
    },
    checkLoginState() {
      if (this.user === undefined) {
        return false
      }
      return true
    },
    deleteReview(index, docKey) {
      api.deleteReview(docKey)
        .then(response => {
          if (response === 1) {
            this.questions.rows.splice(index, 1)
            alert("삭제 되었습니다.")
            // window.location.href = `/activity/${this.$route.params.key}`
          }
        })
        .catch(err => console.error(err))
    },
    initBanner() {
      this.$nextTick(() => {
        this.banners = new Swiper('.wekin.swiper-container', {
          slidesPerView: 1,
          pagination: '.wekin .swiper-pagination',
          autoplay: 3000,
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev'
        })
      })
    },
    getActivity() {
      api.getActivity(this.$route.params.key)
        .then(activity => {
          this.activity = activity
          this.activity.datesList = []
          this.activity.days = []
          let dates = this.activity.close_dates
          for (let i=0; i < dates.length; i++) {
            activity.datesList.push(moment(dates[i], 'YYMMDD').add(9, 'h').toDate())
          }
          for (let item in this.activity.base_week_option) {
            if (!this.activity.base_week_option[item].start_time.length) {
              switch (item) {
                case 'Su':
                  this.activity.days.push(0)
                  break
                case 'Mo':
                  this.activity.days.push(1)
                  break
                case 'Tu':
                  this.activity.days.push(2)
                  break
                case 'We':
                  this.activity.days.push(3)
                  break
                case 'Th':
                  this.activity.days.push(4)
                  break
                case 'Fr':
                  this.activity.days.push(5)
                  break
                case 'Sa':
                  this.activity.days.push(6)
                  break
              }
            }
          }
        })
        .then(this.initBanner)
        .then(() => {
          api.getActivities(2)
          .then(json => {
            let tempList  = _.filter(json, ['category', this.activity.category]);
            this.activities = _.sampleSize(tempList, 3)
          })
        })
        .catch(err => console.error(err))
    },
    getReviews() {
      api.getReviews(this.$route.params.key, this.reviewPage, 8)
        .then(json => {
          if (json.results.length != 0) {
            json.results.forEach(review => this.reviews.push(review))
          } else {
            this.isLastReview = true
          }
          if (json.results.length < 8) {
            this.isLastReview = true
          }
        })
        .catch(err => console.error(err))
    },
    getQnas() {
      api.getQnas(this.$route.params.key, this.qnaPage, 10)
        .then(questions => {
          if (questions.rows.length != 0) {
            questions.rows.forEach(question => this.questions.rows.push(question))
          } else {
            this.isLastQna = true
          }
          if (questions.length < 10) {
            this.isLastQna = true
          }
        })
        .catch(err => console.error(err))
    },
    getAttendWekiners() {
      api.getAttendWekiners(this.$route.params.key)
        .then(wekiners => this.wekiners = wekiners.data)
        .catch(err => console.error(err))
    },
    postQnA() {
      if (this.user) {
        // TODO: defualt value를 처음부터 가져올 수 있도록
        let qnaParams = {
          activity_key: this.activity.activity_key,
          activity_title: this.activity.title,
          host_key: this.activity.host_key,
          content: this.content,
          private_mode: this.privateMode
        }
        api.postQnA(this.activity.activity_key, qnaParams)
          .then((result) => {
            let qna = {
              activity_key: this.$route.params.key,
              content: this.content,
              private_mode: this.privateMode == 'true',
              created_at: new Date(),
              User: {
                name: this.user.name,
                user_key: this.user.user_key,
              },
              user_key: this.user.user_key
            }
            api.getMaker(this.activity.host_key).then(response => {
              api.sendSms(response.tel,'메이커님! ' + qnaParams.activity_title + ' 위킨에 QnA가 작성되었습니다. 내용:' + String(qnaParams.content).slice(0, 18) + '...')
            })
            api.sendSms('010-9366-6639', qnaParams.activity_title + ' 위킨에 QnA가 작성되었습니다. 내용:' + String(qnaParams.content).slice(0, 18) + '...' )
            this.questions.rows.unshift(qna)
            this.content = null
          })
          .catch(error => {
            if (error.response.status == 403) {
              alert("로그인이 필요한 서비스 입니다.")
              this.$parent.$refs.navbar.showModalLogin()
            } else {
              alert("잠시 후 다시시도해주세요.")
            }
          })
      } else {
        alert("로그인이 필요한 서비스 입니다.")
        this.$parent.$refs.navbar.showModalLogin()
      }
    },
    dropdownPeopleCount() {
      this.$nextTick(() => {
        $('.ui.dropdown.peopleCount').dropdown({
          onChange: (value) => {
            this.peopleCount = value
          }
        })
      })
    },
    dropdownSchedule() {
      $('.ui.dropdown.schedule')
        .dropdown({
          onChange: (value) => {
            var wekin = _.find(this.wekins, (wekin) => {
              return wekin.wekin_key == value
            })
            this.selectedWekin = wekin
            this.$nextTick(() => {
              this.dropdownPeopleCount()

              if ((this.selectedWekin.max_user - this.selectedWekin.current_user) == 0) {
                this.isApplyAvailable = false
                $('.apply-btn')
                  .removeClass('negative')
                  .addClass('primary')
                  .text('대기 신청하기')

                api.isRequestedWaiting(this.selectedWekin.wekin_key)
                  .then((isRequested) => {
                    if (isRequested.result) {
                      this.isRequested = true
                      $('.apply-btn')
                        .removeClass('negative')
                        .addClass('primary')
                        .text('대기 신청 취소하기')
                    }
                  }).catch((error) => console.error(error))
              } else {
                this.isApplyAvailable = true
                $('.apply-btn')
                  .removeClass('primary')
                  .addClass('negative')
                  .text('신청하기')
              }
            })
          }
        })
      $('.ui.dropdown.schedule .deadlineOver')
        .dropdown({
          action: 'hide'
        })
    }
  },
  mounted () {
    this.getAttendWekiners()
  },
  created() {
    this.getActivity()
    this.getReviews()
    this.getQnas()
    this.$store.watch(() => {
      if (this.$store.state.user !== undefined) {
        this.getUserFavorite()
      }
    })
    setTimeout(() => {
      this.$nextTick(() => {
        $('.ui.sticky').sticky()
      })
    }, 1000)
    $('.ui.rating')
      .rating({
        initialRating: 3,
        maxRating: 5
      })
      .rating('disable')
    $('.ui.modal.confirm-modal')
      .modal({
        onApprove: () => {
          this.isRequested = true
          $('.apply-btn')
            .addClass('primary')
            .text('대기 신청 취소하기')
        }
      })
      .modal('attach events', '.waiting-modal #confirm', 'show')

  },
}
</script>
<style lang=scss scoped>
@import '../../style/variables';
@import '../../style/cross-browsing';
.photo2 {
  width: 34px !important;
  height: 34px !important;
  object-fit: cover;
  object-position: top;
  border-radius: 50% !important;
}
.wekin-calendar-icon {
  position: relative;
  z-index: 10000;
}
.deadlineOver {
  color: #ccc !important;
  cursor: default !important;
}
.deadlineOver:hover {
  background-color: #fff !important;
} 

.menu .item img.facebookLogoBtn {
  width: 30px;
  display: inline-block;
  margin-top: -4px;
}

h2 {
  font-family: NotoSansCJKkr-Regular;
  padding-bottom: 10px;
}

.navbar-custom {
  margin-bottom: 34px;
}

.ui.fixed.sticky+p {
  margin-top: 39px!important;
}

.top-slide>div {
  width: 100%;
  height: 600px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: center;
}

.ui.modal {
  max-width: 330px;
  margin: -109.5px -162px!important;
  text-align: center;
  padding: 0 24px;
  .title {
    font-size: 18px;
    font-family: NotoSansCJKkr-Regular;
    padding: 24px 0 6px;
  }
  .button {
    &#confirm {
      width: 92px;
    }
    margin-bottom: 10px;
  }
  .actions {
    background: white;
    padding: 0;
    border: none;
    text-align: inherit;
  }
  &.confirm-modal {
    .button {
      margin-top: 36px;
      margin-bottom: 22px;
    }
  }
}

.google-map {
  img {
    width: 100%;
  }
}

.info-container {
  max-width: 656px!important;
  min-height: 600px;
  margin-top: 0;
  padding: 0;
  right: 154px;
  text-align: left;

  .ui.fixed.sticky {
    margin-top: 80px!important;
  }
  .ui.pointing.secondary.menu {
    margin-bottom: 30px;
  }
  .rail.apply-container {
    padding-left: 20px!important;
    margin-left: 0!important;

    .ui.segment {
      width: 290px;
    }

    .ui.selection.dropdown {
      padding: .78571429em 8px!important;
      margin: 5px 0;
      .text {
        font-size: 13px;
      }
      .menu>.item {
        font-size: 13px;
        padding: 8px!important;
      }
    }
    .button {
      margin-top: 5px;
    }
    p>i {
      margin-right: 8px;
    }
    p,
    p>i {
      font-size: 16px;
    }
  }
  .additional-button-container {
    .button {
      margin: 5px 0;
    }
  }

  .ui.divider {
    margin-top: 30px;
  }

  /** 개요 탭 */
  .overview {
    letter-spacing: 0.5;
    .expand-btn {
      display: block;
      font-size: 16px;
      margin: 12px 0;
    }
    .explain-detail {
      line-height: 1.5;
      font-family: NotoSansCJKkr-Regular;
      padding-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      /* 여러 줄 자르기 추가 스타일 */
      white-space: normal;
      max-height: 18.8em;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      &.expanded {
        min-height: inherit;
        max-height: inherit;
        white-space: normal;
        height: inherit;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: inherit;
        -webkit-box-orient: vertical;
      }
    }
    .wekiner {
      width: 70px;
      height: 70px;
      margin: 6px;
      display: inline-block;
    }
    .schedules {
      font-size: 14px;
    }
    .maker {
      .name {
        font-size: 17px;
        font-weight: 400;
      }
      .badge {
        margin: 0 4px;
      }
      .content {
        display: inline-block;
        width: 80%;
        margin-left: 26px;
        p {
          margin-top: 12px;
        }
      }
    }
    h4 {
      font-size: 17px;
      font-weight: 600;
      color: #00a29a;
      font-family: NotoSansCJKkr-Regular;
    }
    p {
      font-size: 15px;
    }
  }

  /** 후기 탭 */
  .review {
    .feed-list {
      display: inline-block;
      text-align: left;

      .profile {
        width: 50px;
        height: 50px;
      }
      .info {
        display: inline-block;
        width: 180px;
        padding: 6px 12px;
      }
      .content {
        padding-top: 20px;
      }
      .rating {
        float: right;
        margin-top: 16px;
      }
    }
  }

  /** Q&A 탭 */
  .qna {
    .qna-not-exist {
      padding-top: 100px;
      text-align: center;
      border-top: 1px solid #979797;
      color: #979797;
      margin-top: 62px;
      border-bottom: 1px solid #979797;
      padding-bottom: 100px;
    }
    .qna-form-container {
      margin-top: 16px;
      margin-bottom: 16px;
      .qna-buttons-container {
        margin-top: 8px;
        .ui.selection.dropdown {
          min-width: 130px;
          max-width: 130px;
        }
        .button {
          width: 150px;
          margin-right: 0;
          float: right;
        }
      }
      textarea {
        min-height: 100px!important;
        height: 100px;
      }
    }
    .qna-board-container {
      .ui.checkbox {
        float: right;
        margin: 10px;
      }
      .ui.accordion {
        clear: both;
        .list {
          border-bottom: 1px solid $color-line;

          &:first-child {
            border-top: 1px solid $color-line;
          }
          .ui.basic.button {
            box-shadow: none!important;
          }
        }
        .list .title {
          padding: .5em 8px;
          .ui.equal.width.grid div:not(:first-child) {
            text-align: center;
          }
          .name,
          .date,
          .status {
            font-weight: 300
          }
          .sum .name {
            min-width: 50px;
            text-align: center;
          }
          .date {
            min-width: 100px;
            text-align: center;
          }
          .status {
            min-width: 50px;
            text-align: center;
          }
        }
        .content {
          padding: 10px 32px 16px;

          .label {
            padding-right: 16px;
          }
        }
        .more-btn {
          width: 150px;
          display: block;
          margin: 30px auto 0!important;
        }
      }
    }
  }
}


















/* 모바일 전용 */

.mobile-container {
  display: none;

  .schedule {
    margin-bottom: 8px;
  }
  .mobile-button-container {
    @include flex-box();
    flex-direction: column;
    position: fixed;
    width: 100%;
    bottom: 0;
    padding: 0 6px 6px;
    background: #F0F0F0;
    z-index: 9998;
  }
  .apply-btn {
    height: 48px;
  }
  .mobile-action-button-container {
    @include flex-box();
    margin-top: 8px;
    height: 48px;

    i {
      font-size: 14px;
      margin: 0!important;
      color: black;
    }
    .ui.white.button {
      border: 1px solid black;
      border-radius: 4px;
      background: white;
      padding: 0;
      /* issue #334 */
      width: 56px;
      line-height: 42px;
    }
    i.icon.bookmark {
      font-size: 25px;
      display: inline-block;
      margin-top: 3px;
    }
    i.icon.mail.outline:before {
      margin-left: -3px;
      font-size: 25px;
      display: inline-block;
      margin-top: 2px;
    }

    /* issue #334 */
    .mobile-apply-btn {
      flex: 1;
    }
  }
  .mobile-form-container-back-layer {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 1;
  }
  .mobile-form-container {
    position: fixed;
    width: 100%;
    padding: 12px;
    background: white;
    border: 1px solid;
    bottom: 0;
    z-index: 9999;

    .mobileSchedule,
    .peopleCount {
      margin-bottom: 12px;
    }
    i {
      position: absolute;
      right: 8px;
      z-index: 1;
      top: -20px;
      font-size: 16px;
    }
  }
}

.mobile {
  display: none;
}

.title-mobile-container {
  display: none;
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .top-slide>div {
    width: 100%;
    height: 500px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position-y: center;
  }
}

@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .swiper-container.wekin img {
    height: 400px!important
  }
}

@media only screen and (max-width: 991px) {
  .navbar-custom {
    margin-bottom: 90px;
  }
  .mobile-small-wekin {
    left: 10%;
    position: relative;
  }
  .info-container {
    max-width: inherit!important;
  }
  .apply-container {
    display: none;
  }
  .info-container {
    right: inherit;
  }
  .mobile-container {
    display: block;
  }
  .mobile-button-container {
    display: flex;
  }
  .mobile {
    display: table-cell;
  }
  .pc {
    display: none!important;
  }
  .nine.wide.column {
    width: 81.25%!important;
  }
  .user {
    padding-right: 24px;
  }
  .user.name {
    padding-left: 22px;
    padding-top: 6px;
  }
  .title-mobile-container {
    display: inherit;
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .swiper-container.wekin img {
    height: 350px!important
  }
}

@media only screen and (min-width: 480px) and (max-width: 767px) {
  .top-slide>div {
    height: 400px;
  }
}

@media only screen and (max-width: 779px) {
  .swiper-container.wekin img {
    height: 250px!important
  }
  .top-slide>div {
    height: 200px;
  }

  .info-container .secondary.menu {
    margin-top: 0;
  }
}



/*
 @media only screen and (min-width: 992px) and (max-width: 1199px) {
    .info-container {
      max-width:656px!important;
    }
    .rail.apply-container {
      display: none;
    }
  }*/
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
<style>
.width260 {
  width: 260px;
}
.vdp-datepicker div input {
  background-color: red;
}
.height25 {
  height: 25px;
}
.explain-detail img {
  width: 100%!important;
}
@media only screen and (max-width: 479px) {
  .vdp-datepicker__calendar {
    top: -280px;
  }
}
</style>
