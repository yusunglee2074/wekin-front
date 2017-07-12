<template>
  <div class="host-wekin">
    <host-card-layout title="위킨 등록">
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
                <input type="radio" name="fruit" tabindex="0" class="hidden" value="축제" v-model="request.category">
                <label>축제</label>
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
            <input type="number" v-model="request.price">
          </div>
        </div>
        <div class="ui divider"></div>
        <div class="settings__list">
          <label class="required">날짜&amp원인원</label>
          <span>정기/일회성 및 인원 설정</span>
        </div>
        <div class="ui segment wekinSchedules" v-for="(wekinSchedule, index) in wekinSchedules" v-bind:key="wekinSchedule.wekin_key" :id="[`schedule--${index}`]">
          <div class="settings__list">
            <label>날짜선택</label>
            <div class="ui calendar" :id="['startDate--' + index]">
              <div class="ui input styled primary left icon">
                <i class="calendar icon"></i>
                <input :id="['startDateInput' + index]" type="text">
              </div>
            </div>
          </div>
          <div class="settings__list">
            <label>신청마감일시</label>
            <div class="ui calendar" :id="['endDate--' + index]">
              <div class="ui input styled primary left icon">
                <i class="calendar icon"></i>
                <input type="text" placeholder="시작날짜를 선택해주세요.">
              </div>
            </div>
          </div>
          <div class="settings__list limit">
            <label>최대~최소인원</label>
            <div class="limit-user-container flex">
              <div class="ui input flex-f1">
                <label>최대 인원</label>
                <input type="text" :id="['max_user--' + index]">
              </div>
              <div class="ui input flex-f1" style="margin-top:12px;">
                <label>최소 인원</label>
                <input type="text" :id="['min_user--' + index]">
              </div>
            </div>
          </div>
          <div class="flex">
            <div class="flex-space"></div>
            <button class="ui button negative" @click="onWekinScheduleDeleteClick(index)">삭제</button>
          </div>
        </div>
        <div class="settings__list">
          <span class="link" @click="onWekinScheduleAddClick()">+ 위킨 날짜&amp;인원 추가</span>
        </div>
        <div class="ui divider"></div>
        <!--<button class="ui primary button floated right save-btn">확인</button>
                                    <button class="ui primary button floated right save-btn">삭제요청</button>-->
        <button class="ui primary button floated right save-btn" @click="sendForm()">신청하기</button>
        <div class="clear"></div>
      </div>
    </host-card-layout>
  </div>
</template>
<script>
import hostCardLayout from 'components/HostCardLayout.vue'
import FireUpload from 'components/FireUpload.vue'
import api from 'api'

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
      uploadedMainImage: null,
      uploadedMainImages: [],
      isFileUploading: false,
      wekinSchedules: 1,
      request: {
        refundPolicy: ''
      },
      refundPolicyData: '', // 서버에서 불러오는 환불정보.
      refundPolicyTemp: '', // 작성중이던 환불정보
      wekins: [],
      startDate: [],
      endDate: []
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
      this.$el.querySelector(`#schedule--${index}`).remove()
      // this.wekinSchedules--
    },
    onWekinScheduleAddClick() {
      this.wekinSchedules++
      this.$nextTick(() => {
        const _this = this;
        const today = new Date();
        $("#startDate--" + (this.wekinSchedules - 1).toString()).calendar({
          text: this.koreanCalendar,
          endCalendar: $('#endDate--' + (this.wekinSchedules - 1).toString()),
          onChange: (date) => {
            $("#endDate--" + (this.wekinSchedules - 1).toString()).calendar({
              text: this.koreanCalendar,
              minDate: new Date(),
              maxDate: date
            })
          }
        })
      })
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

          if (startDate == null || dueDate == null || maxUser == null || minUser == null) {
            alert("위킨 정보를 확인해주세요.")
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
          api.addActivity(params)
            .then(result => {
              alert('위킨 신청이 완료되었습니다. 승인 후 연락드리겠습니다.')
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
  },
  created() {
    this.getPolicy()
  },
  mounted() {
    const _this = this;
    const today = new Date();

    $('#startDate--0').calendar({
      text: this.koreanCalendar,
      endCalendar: $('#endDate--0'),
      minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      onChange: (date) => {
        $('#endDate--0').calendar({
          text: this.koreanCalendar,
          minDate: new Date(),
          maxDate: date
        })
      }
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
        upload: {
          serverPath: 'https://api.imgur.com/3/image',
          fileFieldName: 'image',
          headers: {
            'Authorization': 'Client-ID 9e57cb1c4791cea'
          },
          urlPropertyName: 'data.link'
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
    });
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
  width:100%;
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
