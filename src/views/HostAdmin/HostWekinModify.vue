<template>
  <div class="host-wekin">
    <host-card-layout title="위킨 등록">
      <div slot="content" class="content">
        <!--
          <select v-model.lazy="selected" v-if="hostActivities" class="ui selection dropdown" @change="setactivityKeyandCallAPI()" style="min-height: 3.1714286em; width: 90%;">
            <option disabled value="">이전 위킨 가져오기</option>
            <option v-for="act in recentActivity" v-bind:value="act.key">{{ act.title }}</option>
          </select>
          -->
        <div class="ui active inverted dimmer" v-if="isFileUploading">
          <div class="ui text loader">이미지 업로드중</div>
        </div>
        <div class="settings__list">
          <div style="position:relative;flex:1" v-for="(imageUrl, index) in uploadedMainImages" v-bind:key="index">
            <img style="width:100%;height:100%" :src="imageUrl">
            <i class="icon close link" style="position:absolute; top:0;right:0" @click="deleteImage(index)"></i>
          </div>
        </div>
        <div class="settings__list">
          <label class="required">메인 이미지</label>
          <div class="ui action floated right input">
            <FireUpload :imageUrl="uploadedMainImage" @update:imageUrl="val => uploadedMainImages.push(val)" @progress="progress"></FireUpload>
            <!--<input type="text">-->
            <button class="ui teal left labeled icon button">
              <i class="plus icon"></i> 추가
            </button>
            <span class="message">최적 사이즈 : 768x500</span>
          </div>
        </div>
        <div class="settings__list">
          <label class="required">위킨명</label>
          <div class="ui corner labeled input">
            <input type="text" v-model="request.title">
          </div>
        </div>
        <div class="settings__list">
          <label class="required">카테고리</label>
          <div class="grouped fields">
            <div class="field">
              <div class="ui radio">
                <input type="radio" id='shfdl' name="fruit" checked="" tabindex="0" value="놀이" v-model="request.category">
                <label for='shfdl'>놀이</label>
              </div>
              <div class="field">
                <div class="ui radio">
                  <input type="radio" id='ehwjs' name="fruit" tabindex="0" class="hidden" value="도전" v-model="request.category">
                  <label for='ehwjs'>도전</label>
                </div>
              </div>
              <div class="field">
                <div class="ui radio">
                  <input type="radio" id='cpgja' name="fruit" tabindex="0" class="hidden" value="체험" v-model="request.category">
                  <label for='cpgja'>체험</label>
                </div>
              </div>
              <div class="field">
                <div class="ui radio">
                  <input type="radio" id='ansghk' name="fruit" tabindex="0" class="hidden" value="문화" v-model="request.category">
                  <label for='ansghk'>문화</label>
                </div>
              </div>
              <div class="field">
                <div class="ui radio">
                  <input type="radio" id='gksrkd' name="fruit" tabindex="0" class="hidden" value="한강몽땅" v-model="request.category">
                  <label for='gksrkd'>한강몽땅</label>
                </div>
              </div>
              <div class="field">
                <div class="ui radio">
                  <input type="radio" id='gbtlr' name="fruit" tabindex="0" class="hidden" value="휴식" v-model="request.category">
                  <label for='gbtlr'>휴식</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ui divider"></div>
        <div class="settings__list">
          <label class="required">상세소개</label>
        </div>
        <div class="settings__list">
          <div id="editor"></div>
        </div>
        <div class="ui divider"></div>
        <div class="settings__list">
          <label>세부 일정</label>
          <div class="ui form fields">
            <div class="field">
              <textarea v-model="request.schedule" placeholder="세부 일정이 없으시면 '없음'을 입력해주세요."></textarea>
            </div>
          </div>
        </div>
        <div class="settings__list">
          <label class="required">포함/불포함 사항</label>
          <div class="ui form fields">
            <div class="field">
              <textarea v-model="request.inclusion" placeholder="결제 금액에 포함되는 사항과 불포함되는 사항을 적어주세요."></textarea>
            </div>
          </div>
        </div>
        <div class="settings__list">
          <label class="required">준비물</label>
          <div class="ui form fields">
            <div class="field">
              <textarea v-model="request.preparation" placeholder="활동에 필요한 준비물을 적어주세요."></textarea>
            </div>
          </div>
        </div>
        <div class="settings__list">
          <label class="required">활동 장소</label>
          <div class="ui form fields">
            <div class="field">
              <textarea v-model="request.meetArea" placeholder="실제 활동이 이루어지는 장소입니다."></textarea>
            </div>
          </div>
        </div>
        <div class="settings__list">
          <label class="required">집결지 주소</label>
          <div class="ui form fields">
            <div class="field">
              <textarea v-model="request.address" placeholder="활동 장소로 이동하기 전 모이는 장소입니다."></textarea>
            </div>
          </div>
        </div>
        <div class="settings__list">
          <label class="required">환불규정</label>
          <div class="ui form fields">
            <div class="field">
              <textarea v-model="request.refundPolicy" placeholder="환불 규정이 없으시면, 아래 위킨 환불규정 입력을 체크 해주세요."></textarea>
            </div>
          </div>
        </div>
        <div class="settings__list">
          <label></label>
          <div class="ui checkbox">
            <input type="checkbox" name="refundPolicy">
            <label>위킨 환불규정 입력</label>
          </div>
        </div>
        <div class="ui divider"></div>
        <div class="settings__list">
          <label class="required">가격</label>
          <div class="ui corner labeled input">
            <input type="number" v-model="request.price" v-on:keypress="isNumber($event)">
          </div>
        </div>
        <div class="ui divider"></div>
        <div class="settings__list">
          <label class="required">날짜&amp인원</label>
          <span>정기/일회성 및 인원 설정</span>
        </div>
          <div>
            <div style="font-size:16px;">
              <span>모집 단위(가격 책정) </span>
              <span> &ensp;&ensp;&ensp;    </span>
              <input type="radio" id="one" value="people" v-model="request.picked">
              <label for="one">명&ensp;</label>
              <input type="radio" id="two" value="team" v-model="request.picked">
              <label for="two">팀</label>
              </br>
            </div>
          </div>

          <div class="ui segment wekinSchedules" v-for="(value, index) in wekins">  
          <div class="settings__list" style="margin-bottom: 5px;">
            <label>날짜선택</label>
            <div class="ui calendar">
              <div class="ui input styled primary left icon">
                <i v-show="!wekins[index]['start_date']" class="icon calendar wekin-calendar-icon"></i>
                <datepicker id="datepickerId" v-model="wekins[index]['start_date']" wapper-class="ui input styled primary left icon" language="ko" format="MMM dd(D), yyyy"></datepicker>
              </div>
            </div>
          </div>
          <div class="settings__list timeSelectList">
            <label>시간선택</label>
              <select class="timeSelector1" v-model="wekins[index]['startTimeDay']">
                <option class="item" value="0">오전</option>
                <option class="item" value="12">오후</option>
              </select>
              <select class="timeSelector2" v-model="wekins[index]['startTimeHour']">
                <option class="item" value="01">1시</option>
                <option class="item" value="02">2시</option>
                <option class="item" value="03">3시</option>
                <option class="item" value="04">4시</option>
                <option class="item" value="05">5시</option>
                <option class="item" value="06">6시</option>
                <option class="item" value="07">7시</option>
                <option class="item" value="08">8시</option>
                <option class="item" value="09">9시</option>
                <option class="item" value="10">10시</option>
                <option class="item" value="11">11시</option>
                <option class="item" value="12">12시</option>
              </select>
              <select class="timeSelector3" v-model="wekins[index]['startTimeMinute']">
                <option class="item" value="00">정각</option>
                <option class="item" value="10">10분</option>
                <option class="item" value="20">20분</option>
                <option class="item" value="30">30분</option>
                <option class="item" value="40">40분</option>
                <option class="item" value="50">50분</option>
              </select>
          </div>
          <div style="text-align:center; color:rgb(204, 51, 0); margin-bottom: 10px;">시각 선택은 옵션입니다.</div>
          <div>
            <label style="font-size: 16px;">신청마감일&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</label>
            <input type="radio" :id="`one${index}`" value="1" v-model="wekins[index]['due_date']">
            <label :for="`one${index}`">1일 전&ensp;</label>
            <input type="radio" :id="`two2${index}`" value="2" v-model="wekins[index]['due_date']">
            <label :for="`two2${index}`">2일 전&ensp;</label>
            <input type="radio" :id="`three3${index}`" value="7" v-model="wekins[index]['due_date']">
            <label :for="`three3${index}`">1주일 전</label>
          </div>

          <div class="settings__list limit">
            <label>최소~최대인원</label>
            <div class="limit-user-container flex">
              <div class="ui input flex-f1" style="margin-top:12px;">
                <label>최소 인원</label>
                <input type="text" placeholder="숫자만 입력 가능합니다" v-on:keypress="isNumber($event)" v-model="wekins[index]['min_user']">
              </div>
              <div class="ui input flex-f1">
                <label>최대 인원</label>
                <input type="text" placeholder="숫자만 입력 가능합니다" v-on:keypress="isNumber($event)" v-model="wekins[index]['max_user']">
              </div>
            </div>
          </div>
          <div class="flex">
            <div class="flex-space"></div>
            <button class="ui button negative" @click="onWekinScheduleDeleteClick(index)">삭제</button>
          </div>
          </div>  
        <div class="settings__list">
          <span class="link" @click="ArrayWekinsAddClick()">+ 위킨 날짜&amp;인원 추가</span>
        </div>
        <div class="ui divider"></div>




        <div class="ui divider"></div>
        <!--<button class="ui primary button floated right save-btn">확인</button>
                                                            <button class="ui primary button floated right save-btn">삭제요청</button>-->
        <p>위킨 승인 후에는 수정사항을 위킨으로 보내주세요.</p>
        <p>빠르게 처리해드리겠습니다.</p>
        <p>010-5108-2668 / wekin@wekiner.com</p>
        <button class="ui primary button floated right save-btn" @click="sendForm()" v-if="activity.status !=3">저장</button>
        <button class="ui negative button floated right save-btn" @click="deleteForm()" v-if="activity.status !=3">삭제</button>
        <button class="ui negative button floated right save-btn" @click="onConfirmClick()" v-if="activity.status ==3" style="width: 100px;">뒤로가기</button>
        <div class="clear"></div>
      </div>
    </host-card-layout>
  </div>
</template>

<script>
import hostCardLayout from 'components/HostCardLayout.vue'
import FireUpload from 'components/FireUpload.vue'
import api from 'api'
import moment from 'moment'
import {Storage} from 'src/util'
import Datepicker from 'vuejs-datepicker';

export default {
  data() {
    return {
      activity: {
        status: 0
      },
      selected: '',
      uploadedMainImage: null,
      uploadedMainImages: [],
      isFileUploading: false,
      wekinSchedules: 1,
      request: {
        refundPolicy: '',
        picked: 'people' 
      },
      refundPolicyData: '', // 서버에서 불러오는 환불정보.
      refundPolicyTemp: '', // 작성중이던 환불정보
      wekins: [{}],
      recentActivity: [],
      activity_key: 0,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    // 시간 비교해서 정렬 후 5개 넣음
    hostActivities() {
      let self = this
      let hostActivity = this.$store.getters.hostActivities
      hostActivity.sort(function(a, b) {
        return new Date(a.created_at) - new Date(b.created_at)
      })
      if (hostActivity.length < 2) {
        hostActivity.forEach(function(value) {
          self.recentActivity.push({ key: value.activity_key, title: value.title })
        })
        return self.recentActivity
      } else {
        hostActivity.slice(-5).forEach(function(value) {
          self.recentActivity.push({ key: value.activity_key, title: value.title })
        })
        return self.recentActivity
      }
    }
  },
  components: {
    Datepicker,
    hostCardLayout,
    FireUpload,
  },
  methods: {
    deleteForm() {
      if (confirm("삭제 하시겠습니까?")) {
        api.deleteActivity(this.$route.params.key).then(() => {
          alert('삭제 되었습니다.')
          window.location.href = '/host/admin/wekins'
        }).catch(error => console.error(error))
      }
    },
    ArrayWekinsAddClick: function () {
      var lastwekin = this.wekins[this.wekins.length-1]
      this.wekins.push({ min_user: lastwekin.min_user, max_user: lastwekin.max_user, start_date: lastwekin.start_date, due_date: lastwekin.due_date})
      return
    },
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        evt.preventDefault();;
        alert("숫자만 입력 가능합니다.")
      } else {
        return true;
      }
    },
    imageCallback(event, trumbowyg) {
      Storage.imageUpload(event, task => {
        let url = task.snapshot.downloadURL
        let img = url.substring(0, url.indexOf('token') - 1)
        trumbowyg.execCmd('insertImage', img)
        trumbowyg.closeModal()
      }, prg => {})
    },
    deleteImage(index) {
      this.uploadedMainImages.splice(index, 1)
    },
    progress(value) {
      this.isFileUploading = true
      if (value >= 100) {
        this.isFileUploading = false
      }
    },
    onWekinScheduleDeleteClick(index) {
      if (this.wekins.length === 1) {
        alert("시작 날짜는 최소 하나 이상 있어야합니다.")
        return
      }
      this.wekins.splice(index, 1)
      
    },
    checkForm() {
      if (!(this.uploadedMainImages.length &&
        this.request.title &&
        $('#editor').trumbowyg('html') != "" &&
        this.request.inclusion &&
        this.request.preparation &&
        this.request.address &&
        this.request.meetArea &&
        this.request.refundPolicy &&
        this.request.category)) {
        alert('필수 항목을 채워주세요.')
      } else if (this.request.price == "") {
        alert("가격란에는 숫자만 입력 부탁드립니다.")
      } else {
        return true
      }
    },
    sendForm() {
      var haswekin = false 
      if (this.checkForm()) {
        let i = 0
        for (; i < this.wekins.length; i++) {
          if (this.wekins[i].start_date && this.wekins[i].due_date && this.wekins[i].min_user &&  this.wekins[i].start_date) {
            
            if (Number(this.wekins[i].min_user) > Number(this.wekins[i].max_user)) {
              alert(i + 1 + '번째 위킨의 최소인원이 최대인원보다 많습니다.')
              break;
            } else if (moment(this.wekins[i].start_date) < moment()) {
              alert(i + 1 + "번째 위킨의 시작 날짜가 오늘 이전입니다.")
              break
            } else {
              if (this.wekins[i].startTimeHour && this.wekins[i].startTimeMinute) {
                var timeSum = this.wekins[i].startTimeDay+this.wekins[i].startTimeHour + ':' + this.wekins[i].startTimeMinute
                var time = timeSum.split(':')
              } else if (this.wekins[i].startTimeHour) {
                var time = [this.wekins[i].startTimeHour, 0]
              } else if (this.wekins[i].startTimeDay) {
                var time = [0, 0]
              } else {
                var time = [0, 0]
              }
              this.wekins[i].start_date = moment(this.wekins[i].start_date).set('hour', time[0]).set('minute', time[1]).toString()
              delete this.wekins[i].start_time
              this.wekins[i].due_date = moment(this.wekins[i].start_date).subtract(this.wekins[i].due_date, 'days').toString()
              if (i+1 === this.wekins.length) {
                haswekin = true
              }
            }
        } else {
          alert(i + 1 + "번째 위킨의 날짜와 인원을 채워주세요.")
          break
        }
      }
      if (haswekin) {
        let params = {
          host_key: this.user.Host.host_key,
          main_image: this.uploadedMainImages,
          title: this.request.title,
          intro_detail: $('#editor').trumbowyg('html'),
          schedule: this.request.schedule,
          inclusion: this.request.inclusion,
          preparation: this.request.preparation,
          address_detail: { text: this.request.address, meet_area: this.request.meetArea },
          refund_policy: this.request.refundPolicy,
          price: this.request.price,
          category: this.request.category,
          isteamorpeople: this.request.picked,
          wekins: this.wekins
        }
        api.updateActivity(this.$route.params.key, params)
          .then(result => {
            alert('위킨 수정이 완료되었습니다.')
            window.location.href = '/host/admin/wekins'
          }).catch(error => console.error(error))
      }
    }
  },
  initPolicyCheckbox() {
    $(".checkbox").checkbox({
      onChecked: () => {
        this.refundPolicyTemp = this.request.refundPolicy
        this.request.refundPolicy = this.refundPolicyData
      },
      onUnchecked: () => this.request.refundPolicy = this.refundPolicyTemp
    })
  },
  getPolicy() {
    api.getPolicy()
      .then((result) => this.refundPolicyData = result[0].value.body)
      .then(this.initPolicyCheckbox)
        .catch((error) => console.error(error))
    },
    getAdminActivity() {
      api.getAdminActivity(this.activity_key)
        .then(result => {
          this.activity = result
          this.request.title = result.title
          this.request.schedule = result.schedule
          this.request.inclusion = result.inclusion
          this.request.preparation = result.preparation
          this.request.price = result.price
          this.request.address = result.address_detail.text
          this.request.refundPolicy = result.refund_policy
          this.request.meetArea = result.address_detail.meet_area
          this.uploadedMainImages = result.main_image.image
          this.request.category = result.category
          $('#editor').trumbowyg('html', result.intro_detail);

          api.getAdminWekin(this.activity_key)
            .then(wekins => {
              console.log(wekins)
              this.$nextTick(() => {
                this.wekins = [{}]
                this.wekins.pop()
                wekins.forEach((wekin, index) => {
                  let TempWekins = {}
                  TempWekins.start_date = moment(wekin.start_date).format('LL')
                  let hours = moment(wekin.start_date).format('HH')
                  if (hours > 12) {
                    if( hours > 19) {
                      TempWekins.startTimeHour = (hours - 12)

                    } else {
                      TempWekins.startTimeHour = '0' + (hours - 12)
                    }
                    TempWekins.startTimeDay = '12' 
                  } else {
                    TempWekins.startTimeHour = hours
                    TempWekins.startTimeDay = '0'
                  }
                  TempWekins.due_date = moment(moment(wekin.start_date) - moment(wekin.due_date)).format('D') - 1
                  TempWekins.startTimeMinute = moment(wekin.start_date).format('mm') 
                  TempWekins.max_user = wekin.max_user
                  TempWekins.min_user = wekin.min_user
                  this.wekins.push(TempWekins)
                })
              })
            })
            .catch(error => console.error(error))
        })
        .catch(error => console.error(error))
    }
  },
  created() {
    this.getPolicy()
    this.activity_key = this.$route.params.key
    this.getAdminActivity()
  },
  mounted() {
    const _this = this;
    const today = new Date();
    // editor configuration
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
          dropdown: ['upload', 'base64', 'noembed'],
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
        ['btnGrp-test'],
        ['align'],
        ['btnGrp-lists'],
        ['image'],
        ['preformatted'],
        'fullscreen']
    }) 
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';
@import '../../style/cross-browsing';
@import '/static/trumbowyg/dist/ui/trumbowyg.min.css';



[contentEditable=true]:empty:not(:focus):before {
  content: attr(data-text)
}

.limit-user-container {
  flex-direction: column;
  width: 100%;
  .input {
    flex-direction: column;
  }
}

.save-btn {
  width: 110px!important;
}

.host-wekin {
  .fireUpload {
    border: 1px solid #979797!important;
    height: 37px;
  }
  .floated.right.checkbox {
    width: 76px;
  }
  .floated.right button {
    position: absolute!important;
    right: 0
  }
}

.content {
  width: 502px;
  max-width: 502px;
  padding-top: 22px!important;
  margin: 0 auto!important;
}

.message {
  padding-top: 8px;
  font-size: 11px;
  padding-left: 8px;
}

.settings {
  max-width: 512px;

  input {
    border: 1px solid $color-line!important;
  }
  .header {
    font-size: 20px;
    font-family: NotoSansCJKkr-Medium;
  }
  &__list {
    @include flex-box();
    margin: 20px 0;
    .vertical {
      padding: 10px 0;
    }
    >label {
      display: inline-block;
      min-width: 140px;
      max-width: 140px;
      font-size: 16px;
    }
    textarea {
      max-height: 90px!important;
    }

    .fields {
      flex: 1;
      div,
      input,
      span {
        margin: 2px 0;
      }
    }
    .input,
    .ui.calendar {
      width: 100%;
    }
    input {
      border: 1px solid $color-line!important;
    }
    .floated.right.checkbox {
      width: 76px;
    }

    &.limit {
      label {
        font-weight: 400;
      }
      .ui.corner.labeled.input {
        min-width: 0!important;
      }
    }
  }
  .icon.asterisk {
    color: $color-secondary;
  }
  .ui.segment {
    padding: 1.5em 14em;
  }
}

@media only screen and (max-width: 991px) {
  .pc {
    display: none;
  }
  .settings {
    &__list {
      flex-direction: column;
    }
  }
  .vdp-datepicker {
    margin-top: 5px;
  }

  .timeSelector1,
  .timeSelector2,
  .timeSelector3 {
    margin-top: 5px;
  }
}

.wekin-calendar-icon {
  position: relative;
  z-index: 10000;
}

.timeSelectList {
  margin-bottom: 5px !important;
}

.timeSelector1,
.timeSelector2,
.timeSelector3 {
  border: 1px solid #00a29a;
  background-color: #fff;
  margin-left: 2px;
  height: 38px;
  width: 100%;
  text-align: right;
}


</style>
<style lang="scss">
.vdp-datepicker {
  width: 100%;
}

#datepickerId {
  width: 100%;
  padding-right: 10px !important;
}

.wekin-uploader {
  height: 36px;
  width: 100%;
  z-index: 9998;
  position: relative
}

.host-wekin .fireUpload {
  border: 1px solid;
  position: absolute;
  width: 100%;
  input {
    width: 100%;
    position: absolute;
    cursor: pointer;
    z-index: 1;
    opacity: 0;
  }
  &.profile {
    opacity: 0;
    position: absolute;
    border: none;
    height: 55px;
    max-width: 365px;
  }
}
</style>
