<template>
  <div class="host-wekin">
    <host-card-layout title="위킨 수정">
      <div slot="content" class="content">
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
        <div class="ui divider"></div>
        <div class="settings__list">
          <label class="required">카테고리</label>
          <div class="grouped fields">
            <div class="field">
              <div class="ui radio">
                <input type="radio" name="fruit" checked="" tabindex="0" value="놀이" v-model="request.category">
                <label>놀이</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio">
                <input type="radio" name="fruit" tabindex="0" class="hidden" value="도전" v-model="request.category">
                <label>도전</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio">
                <input type="radio" name="fruit" tabindex="0" class="hidden" value="체험" v-model="request.category">
                <label>체험</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio">
                <input type="radio" name="fruit" tabindex="0" class="hidden" value="문화" v-model="request.category">
                <label>문화</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio">
                <input type="radio" name="fruit" tabindex="0" class="hidden" value="한강몽땅" v-model="request.category">
                <label>한강몽땅</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio">
                <input type="radio" name="fruit" tabindex="0" class="hidden" value="휴식" v-model="request.category">
                <label>휴식</label>
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
              <textarea v-model="request.schedule"></textarea>
            </div>
          </div>
        </div>
        <div class="settings__list">
          <label class="required">포함/불포함 사항</label>
          <div class="ui form fields">
            <div class="field">
              <textarea v-model="request.inclusion"></textarea>
            </div>
          </div>
        </div>
        <div class="settings__list">
          <label class="required">준비물</label>
          <div class="ui form fields">
            <div class="field">
              <textarea v-model="request.preparation"></textarea>
            </div>
          </div>
        </div>
        <div class="settings__list">
          <label class="required">활동 장소</label>
          <div class="ui form fields">
            <div class="field">
              <textarea v-model="request.meetArea"></textarea>
            </div>
          </div>
        </div>
        <div class="settings__list">
          <label class="required">집결지 주소</label>
          <div class="ui form fields">
            <div class="field">
              <textarea v-model="request.address"></textarea>
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
          <div class="ui checkbox refundPolicy">
            <input type="checkbox" name="refundPolicy">
            <label>위킨 환불규정 입력</label>
          </div>
        </div>
        <div class="ui divider"></div>
        <div class="settings__list">
          <label class="required">가격</label>
          <div class="ui corner labeled input">
            <input type="number" v-model="request.price">
          </div>
        </div>
        <div class="ui divider"></div>
        <div class="settings__list">
          <label class="required">날짜&amp인원</label>
          <span>정기/일회성 및 인원 설정</span>
        </div>
        <div class="ui segment wekinSchedules" v-for="(wekinSchedule, index) in wekinSchedules" v-bind:key="wekinSchedule.wekin_key" :id="[`schedule--${index}`]">
          <div class="settings__list">
            <label>날짜선택</label>
            <div class="ui calendar" :id="['startDate--' + index]">
              <div class="ui input styled primary left icon">
                <i class="calendar icon"></i>
                <input type="text">
              </div>
            </div>
          </div>
          <div class="settings__list">
            <label>신청마감일시</label>
            <div class="ui calendar" :id="['endDate--' + index]">
              <div class="ui input styled primary left icon">
                <i class="calendar icon"></i>
                <input type="text">
              </div>
            </div>
          </div>
          <div class="settings__list limit">
            <label>최소~최대인원</label>
            <div class="limit-user-container flex">
              <div class="ui input flex-f1" style="margin-top:12px;">
                <label>최소 인원</label>
                <input type="text" :id="['min_user--' + index]" v-on:keypress="isNumber(event)">
              </div>
              <div class="ui input flex-f1">
                <label>최대 인원</label>
                <input type="text" :id="['max_user--' + index]" v-on:keypress="isNumber(event)">
              </div>
            </div>
          </div>
          <div class="flex">
            <div class="flex-space"></div>
            <button class="ui button negative" @click="onWekinScheduleDeleteClick(index)" v-if="activity.status !=3">삭제</button>
          </div>
        </div>
        <div class="settings__list">
          <span class="link" @click="onWekinScheduleAddClick()">+ 위킨 날짜&amp;인원 추가</span>
        </div>
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

export default {
  data() {
    return {
      koreanCalendar: {
        days: ['일', '월', '화', '수', '목', '금', '토'],
        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        today: '오늘',
        now: '지금',
        am: '오전',
        pm: '오후'
      },
      activity: {
        status: 0
      },
      uploadedMainImage: null,
      uploadedMainImages: [],
      isFileUploading: false,
      wekinSchedules: 1,
      refundPolicyData: '', // 서버에서 불러오는 환불정보.
      refundPolicyTemp: '', // 작성중이던 환불정보
      request: {
        title: null,
        mainImage: null,
        schedule: null,
        inclusion: null,
        preparation: null,
        address_detail: null,
        refundPolicy: null,
        category: null,
      },
      wekins: []
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  components: {
    hostCardLayout,
    FireUpload
  },
  methods: {
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
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
    onConfirmClick() {
      this.$router.go(-1)
    },
    progress(value) {
      this.isFileUploading = true
      if (value >= 100) {
        this.isFileUploading = false
      }
    },
    onWekinScheduleDeleteClick(index) {
      this.$el.querySelector(`#schedule--${index}`).remove()
      // this.wekinSchedules--
    },
    onWekinScheduleAddClick() {
      this.wekinSchedules++
      this.$nextTick(() => {
        $("#startDate--" + (this.wekinSchedules - 1).toString()).calendar({
          text: this.koreanCalendar
        })
        $("#endDate--" + (this.wekinSchedules - 1).toString()).calendar({
          text: this.koreanCalendar
        })
      })
    },
    deleteForm() {
      if (confirm("삭제 하시겠습니까?")) {
        api.deleteActivity(this.$route.params.key).then(() => {
          alert('삭제 되었습니다.')
          window.location.href = '/host/admin/wekins'
        }).catch(error => console.error(error))
      }
    },
    checkForm() {
      if (!(this.uploadedMainImages.length &&
        this.request.title &&
        $('#editor').trumbowyg('html') != "" &&
        this.request.inclusion &&
        this.request.preparation &&
        this.request.address &&
        this.request.meetArea &&
        this.request.category &&
        this.request.refundPolicy &&
        this.request.price)) {
        alert('필수 항목을 채워주세요.')
      } else {
        return true
      }
    },
    sendForm() {
      if (this.checkForm()) {
        let i = 0
        let wekins = []
        let hasWekin = false

        for (; i < this.wekinSchedules; i++) {
          let startDate = $(`#startDate--${i}`).calendar('get date')
          let dueDate = $(`#endDate--${i}`).calendar('get date')
          let maxUser = $(`#max_user--${i}`).val()
          let minUser = $(`#min_user--${i}`).val()
          if (minUser > maxUser) {
            alert("최소, 최대 인원을 확인해주세요.")
            break;
          }

          if (startDate == null || dueDate == null || maxUser == null || minUser == null) {
            alert("위킨 날짜와 인원  정보를 확인해주세요.")
            break;
          } else {
            hasWekin = true

            wekins[i] = {
              start_date: startDate,
              due_date: dueDate,
              max_user: maxUser,
              min_user: minUser
            }
          }
        }

        if (hasWekin) {
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
            wekins: wekins
          }
          api.updateActivity(this.$route.params.key, params)
            .then(result => {
              alert('위킨 수정이 완료되었습니다.')
              window.location.href = '/host/admin/wekins'
            }).catch(error => console.error(error))
        }
      }
    },
    getAdminActivity() {
      api.getAdminActivity(this.$route.params.key)
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

          api.getAdminWekin(this.$route.params.key)
            .then(wekins => {
              this.request.wekins = wekins
              this.wekinSchedules = wekins.length
              this.$nextTick(() => {
                $(".ui.calendar").calendar({
                  text: this.koreanCalendar
                })
                wekins.forEach((wekin, index) => {
                  $(`#startDate--${index}`).calendar('set date', moment(wekin.start_date).toDate()),
                    $(`#endDate--${index}`).calendar('set date', moment(wekin.due_date).toDate()),
                    $(`#max_user--${index}`).val(wekin.max_user),
                    $(`#min_user--${index}`).val(wekin.min_user)
                })
              })
            })
            .catch(error => console.error(error))
        })
        .catch(error => console.error(error))
    },
    initPolicyCheckbox() {
      $(".checkbox.refundPolicy").checkbox({
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
    }
  },
  created() {
    this.getAdminActivity()
    this.getPolicy()
  },
  mounted() {
    $('#startDate--0').calendar({
      text: this.koreanCalendar
    })
    $('#endDate--0').calendar({
      text: this.koreanCalendar
    })

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

.limit-user-container {
  flex-direction: column;
  width: 100%;
  .input {
    flex-direction: column;
  }
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
  .save-btn {
    width: 160px;
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
}
</style>

<style lang="scss">
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
