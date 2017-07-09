<template>
  <div id="WekinDetail" v-if="activity">
    <navbar id="navbar" ref="navbar"></navbar>
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
            <h2>{{activity.title}}</h2>
            <p v-if="activity.address">
              <i class="icon marker"></i>{{activity.address}}
            </p>
            <p v-if="wekins.length">
              <i class="icon users"></i>{{wekins[0].max_user || selectedWekin.max_user}}명 (최소 {{wekins[0].min_user || selectedWekin.min_user}}명)
              <span v-show="Object.keys(selectedWekin).length"> / {{ selectedWekin.max_user - selectedWekin.current_user }} 남음</span>
            </p>
            <!--<p v-show="Object.keys(selectedWekin).length == 0 && wekins.length">
                                  <i class="icon users"></i>{{wekins[0].max_user}}명 (최소 {{wekins[0].min_user}}명)
                                </p>-->
            <p>
              <i class="icon won"></i>{{activity.price | joinComma}}원
            </p>
            <p v-show="Object.keys(selectedWekin).length">
              {{selectedWekin.due_date | formatDateTimeKo}}까지 신청해주세요.
            </p>
            <div class="ui selection dropdown styled full-width schedule">
              <input type="hidden" name="schedule">
              <i class="dropdown icon"></i>
              <div class="default text">날짜선택</div>
              <div class="menu">
                <div class="item" v-for="(wekin, index) in wekins" v-bind:key="wekin.wekin_key" :data-value="wekin.wekin_key" v-if="new Date(wekin.start_date) >= new Date()">{{wekin.start_date | formatDateTimeKo}}</div>
              </div>
            </div>
            <div class="ui selection dropdown styled full-width peopleCount" v-if="Object.keys(selectedWekin).length">
              <input type="hidden" name="gender">
              <i class="dropdown icon"></i>
              <div class="default text">인원선택</div>
              <div class="menu">
                <!-- FIXME: 현재 유저 JOIN 완료시 수정  -->
                <div class="item" v-if="(selectedWekin.max_user - selectedWekin.current_user) > 0" :data-value="index + 1" v-for="(wekin, index) in (selectedWekin.max_user - selectedWekin.current_user)" v-bind:key="index">{{index + 1}}명</div>
                <div class="item" v-if="(selectedWekin.max_user - selectedWekin.current_user) == 0" data-value="closed">마감</div>
                <!--<div class="item" :data-value="index + 1" v-for="(wekin, index) in selectedWekin.max_user">{{index + 1}}명</div>-->
              </div>
            </div>
            <button class="negative ui button full-width apply-btn" v-on:click="onApplyBtn()">
              신청하기
            </button>
          </div>
          <div class="ui segment additional-button-container">
            <button class="ui basic button full-width" @click="toggleFavorite()">
              <i class="icon bookmark" v-bind:class="{remove: !isFavoritedActivity, red: isFavoritedActivity}"></i>관심목록 추가</button>
            <a class="ui basic button full-width" @click="onMailClick()">
              <i class="icon outline mail"></i>이메일 문의</a>
          </div>
        </div>
      </div>
      <div class="ui pointing secondary menu">
        <a class="item active" data-tab="first">개요</a>
        <a class="item" data-tab="second">후기({{activity.review_count}})</a>
        <a class="item" data-tab="third" @click="activeDropdown()">Q&amp;A</a>
      </div>
      <div class="ui tab overview active" data-tab="first">
        <div class="title-mobile-container">
          <h2>{{activity.title}}</h2>
          <p v-if="activity.address_detail">
            <i class="icon marker"></i>{{activity.address}}
          </p>
          <p v-if="wekins.length">
            <i class="icon users"></i>{{wekins[0].max_user || selectedWekin.max_user}}명 (최소 {{wekins[0].min_user || selectedWekin.min_user}}명)
            <span v-show="Object.keys(selectedWekin).length"> / {{ selectedWekin.max_user - selectedWekin.current_user }} 남음</span>
          </p>
          <p>
            <i class="icon won"></i>{{activity.price | joinComma}}원
          </p>
          <div class="ui divider"></div>
        </div>
        <h4>메이커</h4>
        <div class="maker flex">
          <router-link :to="`/host/${activity.Host.host_key}`" tag="img" class="ui top aligned tiny image circular profile link" :src="activity.Host.profile_image"></router-link>
          <div class="content">
            <strong class="name">{{activity.Host.name}}</strong>
            <span>
              <img class="badge" src="/static/images/ic-maker.png"> {{activity.Host.type | hostType}}
            </span>
            <p class="pre">{{activity.Host.introduce}}</p>
            <p class="pre">{{activity.Host.history}}</p>
            <p v-if="activity.Host.home_page" target="_blank">홈페이지 : {{activity.Host.home_page}}</p>
            <p v-if="activity.Host.sns" target="_blank">SNS : {{activity.Host.sns}}</p>
          </div>
        </div>
        <div class="ui divider"></div>
        <h4>상세 설명</h4>
        <p class="explain-detail pre" v-bind:class="{ expanded: isExpanded }" v-html="activity.intro_detail"></p>
        <a class="expand-btn link" v-if="isExpanded" @click="toggleExpend()">접기</a>
        <a class="expand-btn link" v-if="!isExpanded" @click="toggleExpend()">펼치기</a>
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
        <router-link :to="`/users/${wekiner.user_key}`" tag="img" class="ui tiny circular image wekiner link" :src="wekiner.User.profile_image" v-for="(wekiner, index) in wekiners" v-bind:key="index"></router-link>
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
        <p> 전화번호 : 031-377-0410 </p>
        <p> 이메일 : wekin@wekiner.com </p>
        <p> 카카오톡 : @wekiner </p>
        <div class="ui divider"></div>
      </div>
      <div class="ui tab review" data-tab="second">
        <review-layout :review="review" v-for="(review, index) in reviews" v-bind:key="index" v-if="reviews.length >= 0"></review-layout>
        <div v-if="reviews.length == 0" style="text-align: center;color: #979797;">아직 작성 된 후기가 없습니다.</div>
        <button class="ui basic button more-btn" @click="getReviews(reviewPage++)" v-if="!isLastReview">더보기</button>
      </div>
      <div class="ui tab qna" data-tab="third">
        <strong>궁금한 점이 있으신가요? 문의해 주시면 메이커가 답변을 해드립니다.</strong>
        <div class="qna-form-container">
          <div class="ui form">
            <div class="field">
              <textarea placeholder="질문을 입력해주세요." v-model="content"></textarea>
            </div>
          </div>
          <div class="qna-buttons-container">
            <div class="ui selection dropdown">
              <input type="hidden" name="gender" value="false">
              <i class="dropdown icon"></i>
              <div class="text">공개</div>
              <div class="menu">
                <div class="item" data-value="false">공개</div>
                <div class="item" data-value="true">비공개</div>
              </div>
            </div>
            <button class="ui primary button" @click="postQnA()">문의하기</button>
          </div>
        </div>
        <div class="qna-board-container">
          <div class="ui checkbox qna-filter" v-if="user">
            <input type="checkbox" name="example">
            <label>내 Q&amp;A만 보기</label>
          </div>
          <div class="ui accordion" v-if="filteredQuestions && filteredQuestions.length">
            <div class="list" v-for="(question, index) in filteredQuestions" v-bind:key="index">
              <div class="title">
                <div class="flex">
                  <div class="summary f1" v-if="question.private_mode">
                    <i class="icon lock"></i>
                    비밀글 입니다.
                    <span class="mobile user name">{{question.User.name}}</span>
                    <span class="mobile date">{{question.created_at | formatDate}}</span>
                  </div>
                  <div class="summary f1" v-if="!question.private_mode">
                    <i class="icon q">Q</i>
                    {{question.content}}
                    <span class="mobile user name">{{question.User.name}}</span>
                    <span class="mobile date">{{question.created_at | formatDate}}</span>
                  </div>
                  <div class="pc user name">{{question.User.name}}</div>
                  <div class="pc date">{{question.created_at | formatDate}}</div>
                  <div class="status">{{question.answer | qnaStatus}}</div>
                </div>
              </div>
              <div class="content" v-if="!question.private_mode || isMyQuestion(question)">
                <p>
                  <span class="label">질문</span>
                  <span>{{question.content}}</span>
                </p>
                <p v-if="question.answer">
                  <span class="label">답변</span>
                  <span>{{question.answer}}</span>
                </p>
                <!--<button class="ui basic button" v-if="isMyQuestion(question)">수정</button>-->
                <button class="ui negative button" v-if="isMyQuestion(question)" @click="deleteReview(index, question.doc_key)">삭제</button>
              </div>
            </div>
            <button class="ui basic button more-btn" @click="getQnas(qnaPage++)" v-if="!isLastQna">더보기</button>
          </div>
        </div>
        <div v-if="filteredQuestions && !filteredQuestions.length" class="qna-not-exist">등록 된 Q&amp;A가 없습니다.</div>
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
          <button class="negative ui button mobile-apply-btn" @click="toggleMobileForm()" v-if="!isMobileFormShowing">
            신청하기
          </button>
        </div>
      </div>

      <div class="mobile-form-container-back-layer" v-if="isMobileFormShowing" @click="toggleMobileForm()">
      </div>
      <div class="mobile-form-container" v-if="isMobileFormShowing">
        <div class="ui selection dropdown styled full-width schedule">
          <input type="hidden" name="schedule">
          <i class="dropdown icon"></i>
          <div class="default text">날짜선택</div>
          <div class="menu">
            <div class="item" v-for="wekin in wekins" v-bind:key="wekin.wekin_key" :data-value="wekin.wekin_key" v-if="new Date(wekin.start_date) >= new Date()">{{wekin.start_date | formatDateTimeKo}} ({{wekin.max_user - wekin.current_user}}남음)</div>
            <!--<div class="item" v-for="wekin in wekins" :data-value="wekin.wekin_key">{{wekin.start_date | formatDateKo}}</div>
                                                            // TODO: 위킨 data value 테스트 -->
          </div>
        </div>
        <div class="ui selection dropdown styled full-width peopleCount" v-if="Object.keys(selectedWekin).length">
          <input type="hidden" name="gender">
          <i class="dropdown icon"></i>
          <div class="default text">인원선택</div>
          <div class="menu">
            <div class="item" v-if="(selectedWekin.max_user - selectedWekin.current_user) > 0" :data-value="index + 1" v-for="(wekin, index) in (selectedWekin.max_user - selectedWekin.current_user)" v-bind:key="index">{{index + 1}}명</div>
            <div class="item" v-if="(selectedWekin.max_user - selectedWekin.current_user) == 0" data-value="closed">마감</div>
          </div>
        </div>
        <p v-show="Object.keys(selectedWekin).length">
          {{selectedWekin.due_date | formatDateTimeKo}}까지 신청해주세요.
        </p>
        <button class="negative ui button full-width apply-btn" v-on:click="onApplyBtn()">
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
import api from 'api'
import _ from 'lodash'

export default {
  components: {
    reviewLayout,
    mailComponent
  },
  filters: {
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
    user() {
      return this.$store.state.user
    },
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
      isMyQuestionOnlyChecked: false,
      mySwiper: null,
      isApplyAvailable: true,
      isExpanded: false,
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
      selectedWekin: {},
      wekiners: [],
      wekins: [],
      reviews: [],
      questions: {
        rows: []
      },
      isLastReview: false,
      isLastQna: false,
      reviewPage: 0,
      qnaPage: 0,
      content: null,
      isScheduleSelected: false,
      isMobileFormShowing: false,
      isFavoritedActivity: false,
      isRequested: false, // 예약 요청되었는지 여부
      peopleCount: 0,
      isDropdownClicked: false
    }
  },
  methods: {
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
    isMyQuestion(question) {
      if (this.user) {
        return question.User.user_key === this.user.user_key
      }
      return false
    },
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
      }
    },
    activeDropdown() {
      $('.qna-buttons-container .ui.selection.dropdown').dropdown()
    },
    onApplyBtn() {
      if (this.user) {
        if (this.checkForm()) {
          if (this.isApplyAvailable) {
            if (this.checkLoginState()) {
              this.$router.push({
                name: 'Payment',
                path: `/activity/${this.$route.params.key}/payment`,
                params: {
                  peopleCount: this.peopleCount,
                  selectedWekin: this.selectedWekin
                }
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
      } else {
        alert("로그인이 필요한 서비스 입니다.")
      }
    },
    checkForm() {
      if (this.peopleCount === 0 && !this.isRequested && this.isApplyAvailable) {
        alert('인원을 선택해주세요.')
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
        .then(activity => this.activity = activity)
        .then(this.initBanner)
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
          this.$nextTick(() => {
            setTimeout(() => {
              $('.ui.checkbox.qna-filter').checkbox({
                onChecked: () => this.isMyQuestionOnlyChecked = true,
                onUnchecked: () => this.isMyQuestionOnlyChecked = false
              })
              $('.accordion').accordion({
                selector: {
                  trigger: '.title'
                }
              })
            }, 500)
          })
        })
        .catch(err => console.error(err))
    },
    getAttendWekiners() {
      api.getAttendWekiners(this.selectedWekin.wekin_key)
        .then(wekiners => this.wekiners = wekiners)
        .catch(err => console.error(err))
    },
    getWekins() {
      api.getWekins(this.$route.params.key)
        .then(wekins => {
          this.wekins = wekins
          setTimeout(() => {
            this.$nextTick(() => {
              this.dropdownSchedule()
            })
          }, 1000)
        })
        .catch(err => console.error(err))
    },
    postQnA() {
      if (this.user) {
        // TODO: defualt value를 처음부터 가져올 수 있도록
        let privateMode = $('.qna-buttons-container .ui.selection.dropdown').dropdown('get value')
        let qnaParams = {
          activity_key: this.activity.activity_key,
          activity_title: this.activity.title,
          host_key: this.activity.host_key,
          content: this.content,
          private_mode: privateMode
        }
        api.postQnA(this.activity.activity_key, qnaParams)
          .then((result) => {
            let qna = {
              activity_key: this.$route.params.key,
              content: this.content,
              private_mode: privateMode == 'true',
              created_at: new Date(),
              User: {
                name: this.user.name,
                user_key: this.user.user_key,
              },
              user_key: this.user.user_key
            }
            this.questions.rows.unshift(qna)
            this.content = null
          })
          .catch(error => {
            if (error.response.status == 403) {
              alert("로그인이 필요한 서비스 입니다.")
            } else {
              alert("잠시 후 다시시도해주세요.")
            }
          })
      } else {
        alert("로그인이 필요한 서비스 입니다.")
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
              this.getAttendWekiners()

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
    }
  },
  mounted() {
    this.getWekins()
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
    // this.mySwiper = new Swiper('.swiper-container', {
    //   slidesPerView: 1,
    // })
    $('.menu .item').tab();
    if (window.location.hash == "#review") {
      $('.menu .item').tab('change tab', 'second');
    } else if (window.location.hash == "#qna") {
      $('.menu .item').tab('change tab', 'third')
    }
    $('.ui.rating')
      .rating({
        initialRating: 3,
        maxRating: 5
      })
      .rating('disable')
    $('.accordion')
      .accordion({
        selector: {
          trigger: '.title'
        }
      })
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

  }
}
</script>
<style lang=scss scoped>
@import '../../style/variables';
@import '../../style/cross-browsing';

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
          .sum
          .name {
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
    z-index: 9999;
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

@media only screen and (max-width: 479px) {
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
</style>
<style>
.explain-detail img {
  width: 100%!important;
}
</style>
