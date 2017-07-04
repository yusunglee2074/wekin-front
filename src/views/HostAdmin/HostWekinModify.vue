<template>
  <div class="host-wekin">
    <host-card-layout title="위킨 수정">
      <div slot="content" class="content">
        <div class="ui active inverted dimmer" v-if="isFileUploading">
          <div class="ui text loader">이미지 업로드중</div>
        </div>
        <div class="settings__list">
          <div style="position:relative" v-for="(imageUrl, index) in uploadedMainImages">
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
          </div>
        </div>
        <div class="settings__list">
          <label class="required">위킨명</label>
          <div class="ui corner labeled input">
            <input type="text" v-model="request.title">
          </div>
        </div>
        <div class="settings__list">
          <label class="required">간단 소개</label>
          <div class="ui form fields">
            <div class="field">
              <textarea v-model="request.intro_summary"></textarea>
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
              <textarea v-model="request.refund_policy"></textarea>
            </div>
          </div>
        </div>
        <div class="settings__list">
          <label></label>
          <div class="ui checkbox">
            <input type="checkbox" name="example">
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
            <label>최대~최소인원</label>
            <div class="ui form">
              <div class="two fields">
                <div class="field">
                  <label>최대 인원</label>
                  <input type="text" :id="['max_user--' + index]">
                </div>
                <label style="padding-top:34px;" class="pc">~</label>
                <div class="field">
                  <label>최소 인원</label>
                  <input type="text" :id="['min_user--' + index]">
                </div>
              </div>
            </div>
          </div>
          <div class="flex">
            <div class="flex-space"></div>
            <button class="ui button negative" @click="onWekinScheduleDeleteClick(index)"  v-if="activity.status !=3">삭제</button>
          </div>
        </div>
        <div class="settings__list">
          <span class="link" @click="onWekinScheduleAddClick()">+ 위킨 날짜&amp;인원 추가</span>
        </div>
        <div class="ui divider"></div>
        <!--<button class="ui primary button floated right save-btn">확인</button>
                                                    <button class="ui primary button floated right save-btn">삭제요청</button>-->
        <p>진행중인 경우 수정사항을 위킨으로 보내주세요.</p>
        <button class="ui primary button floated right save-btn" @click="sendForm()" v-if="activity.status !=3">저장</button>
        <button class="ui negative button floated right save-btn" @click="deleteForm()" v-if="activity.status !=3">삭제</button>
        <button class="ui negative button floated right save-btn" @click="onConfirmClick()" v-if="activity.status ==3">확인</button>
        <p>010-5108-2668 / cylim@wekiner.com</p>
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
      activity: {
        status: 0
      },
      uploadedMainImage: null,
      uploadedMainImages: [],
      isFileUploading: false,
      wekinSchedules: 1,
      request: {
        title: null,
        mainImage: null,
        intro_summary: null,
        schedule: null,
        inclusion: null,
        preparation: null,
        address_detail: null,
        refund_policy: null,
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
        this.request.intro_summary &&
        $('#editor').trumbowyg('html') != "" &&
        this.request.inclusion &&
        this.request.preparation &&
        this.request.address &&
        this.request.refund_policy &&
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

        if(hasWekin) {
          let params = {
            host_key: this.user.Host.host_key,
            main_image: this.uploadedMainImages,
            title: this.request.title,
            intro_summary: this.request.intro_summary,
            intro_detail: $('#editor').trumbowyg('html'),
            schedule: this.request.schedule,
            inclusion: this.request.inclusion,
            preparation: this.request.preparation,
            address_detail: { text: this.request.address, meet_area: this.request.meetArea },
            refund_policy: this.request.refundPolicy,
            price: this.request.price,
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
          this.request.refund_policy = result.refund_policy
          this.request.intro_summary = result.intro_summary
          this.uploadedMainImages = result.main_image.image
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
                  $(`#startDate--${index}`).calendar('set date', wekin.start_date),
                    $(`#endDate--${index}`).calendar('set date', wekin.due_date),
                    $(`#max_user--${index}`).val(wekin.max_user),
                    $(`#min_user--${index}`).val(wekin.min_user)
                })
              })
            })
            .catch(error => console.error(error))
        })
        .catch(error => console.error(error))
    }
  },
  created() {
    this.getAdminActivity()
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
  max-width: 502px;
  padding-top: 22px!important;
  margin: 0 auto!important;
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
