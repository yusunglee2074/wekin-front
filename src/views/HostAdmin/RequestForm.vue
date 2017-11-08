<template>
  <div class="ui container settings host-request">
    <div class="navbar-custom"></div>
    <div class="ui segment">
      <div class="ui active inverted dimmer" v-if="isImageUploading">
        <div class="ui medium text loader">이미지를 업로드중입니다.</div>
      </div>
      <div class="header">메이커 신청</div>
      <div class="ui divider"></div>
      <div class="settings__list">
        <label class="required">프로필사진</label>
        <img class="ui middle circular aligned tiny image profile" :src="uploadedProfile">
        <div class="fields" style="margin-left: 70px;">
          <FireUpload title="업로드" class="profile" :imageUrl="uploadedProfile" @update:imageUrl="val => uploadedProfile = val" @progress="progress"></FireUpload>
        </div>
      </div>
      <div class="settings__list">
        <label class="required">메이커 이름</label>
        <div class="ui input">
          <input type="text" v-model="request.company.name" placeholder="메이커 이름 or 업체명 입력해주세요.">
        </div>
      </div>
      <div class="settings__list">
        <label class="required">메이커 소개</label>
        <div class="ui form fields">
          <div class="field">
            <textarea v-model="request.introduce"></textarea>
          </div>
        </div>
      </div>
      <div class="settings__list">
        <label>메이커 주소</label>
        <div class="ui input">
          <input type="text" v-model="request.company.address" placeholder="메이커 or 업체 주소를 입력해주세요.">
        </div>
      </div>
      <div class="settings__list">
        <label class="required">메이커 이메일</label>
        <div class="ui input">
          <input type="text" v-model="request.company.email" placeholder="메이커 or 업체 이메일을 입력해주세요.">
        </div>
      </div>
      <div class="settings__list">
        <label class="required">메이커 연락처</label>
        <div class="ui input">
          <input type="text" v-model="request.company.phone" placeholder="메이커 or 업체 연락처를 입력해주세요.">
        </div>
      </div>
      <div class="settings__list">
        <label>메이커 이력</label>
        <div class="ui form fields">
          <div class="field">
            <textarea v-model="request.history"></textarea>
          </div>
        </div>
      </div>
      <div class="ui divider"></div>
      <div class="settings__list">
        <label>홈페이지</label>
        <div class="ui input fields">
          <input type="text" v-model="request.company.site" placeholder="메이커 or 업체 홈페이지를 입력해주세요">
        </div>
      </div>
      <div class="settings__list">
        <label>sns</label>
        <div class="ui input fields">
          <input type="text" v-model="request.company.sns" placeholder="메이커 or 업체 SNS를 입력해주세요.">
        </div>
      </div>
      <div class="settings__list">
        <label>진행 가능 언어</label>
        <div class="ui input fields">
          <input type="text" v-model="request.language" placeholder="한국어 외 활동 진행 가능한 언어가 있으신가요?">
        </div>
      </div>
      <div class="ui divider"></div>
      <div class="settings__list" v-if="uploadedBusinessRegistration">
        <img :src="uploadedBusinessRegistration" style="width:100%;height:100%">
      </div>
      <div class="settings__list">
        <label>사업자 등록증</label>
        <div class="ui action floated right input">
          <FireUpload title="업로드" :imageUrl="uploadedBusinessRegistration" @update:imageUrl="val => uploadedBusinessRegistration = val" @progress="progress"></FireUpload>
          <!--
          <button class="ui teal left labeled icon button">
            <i class="plus icon"></i> 추가
          </button>
          -->
        </div>
      </div>
      <div class="settings__list">
        <div style="position:relative" v-for="(imageUrl, index) in uploadedLicense" v-bind:key="index">
          <img style="width:100%;height:100%" :src="imageUrl">
          <i class="icon close link" style="position:absolute; top:0;right:0" @click="deleteImage(uploadedLicense, index)"></i>
        </div>
      </div>
      <div class="settings__list">
        <label>자격증</label>
        <div class="ui action floated right input">
          <FireUpload title="업로드" :imageUrl="uploadedLicense" @update:imageUrl="val => uploadedLicense.push(val)" @progress="progress"></FireUpload>
          <!--
          <button class="ui teal left labeled icon button">
            <i class="plus icon"></i> 추가
          </button>
          -->
        </div>
      </div>
      <div class="ui divider"></div>
      <div class="settings__list">
        <label class="required">메이커 구분</label>
        <div class="ui form">
          <div class="grouped fields">
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="example1" checked="checked" value="0" v-model="hostType">
                <label>일반인</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="example1" value="1" v-model="hostType">
                <label>전문가(업체)</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="example1" value="2" v-model="hostType">
                <label>전문가(개인)</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="settings__list">
        <label class="required">위킨은 어떻게 알고 가입하셨나요?</label>
        <div class="ui form">
          <div class="grouped fields">
            <div class="field">
              <div class="ui radio checkbox" value="지인소개" v-model="knownRoute">
                <input type="radio" name="example2" checked="checked">
                <label>지인소개</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="example2" value="페이스북" v-model="knownRoute">
                <label>페이스북</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="example2" value="인스타그램" v-model="knownRoute">
                <label>인스타그램</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="example2" value="포털사이트" v-model="knownRoute">
                <label>포털사이트</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="example2" value="홈페이지(블로그)" v-model="knownRoute">
                <label>홈페이지(블로그)</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="example2" value="기타광고" v-model="knownRoute">
                <label>기타광고</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="example2" value="제휴업체" v-model="knownRoute">
                <label>제휴업체</label>
              </div>
            </div>
            <div class="field">
              <div class="ui radio checkbox">
                <input type="radio" name="example2" value="기타" v-model="knownRoute">
                <label>기타</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui divider"></div>
      <button class="ui primary button floated right save-btn" @click="sendForm()">메이커 신청하기</button>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import FireUpload from 'components/FireUpload.vue'
import api from 'api'
import { Validation } from 'src/util'

export default {
  methods: {
    progress(value) {
      this.isImageUploading = true
      if (value >= 100) {
        this.isImageUploading = false
      }
    },
    deleteImage(list, index) {
      list.splice(index, 1)
    },
    sendForm() {
      if (this.checkForm()) {
        let params = {
          name: this.request.name,
          introduce: this.request.introduce,
          history: this.request.history,
          host_profile_image: this.uploadedProfile,
          host_name: this.request.company.name,
          host_tel: this.request.company.phone,
          host_address: this.request.company.address,
          host_home_page: this.request.company.site,
          host_sns: this.request.company.sns,
          host_email: this.request.company.email,
          business_registration: this.uploadedBusinessRegistration,
          license_list: this.uploadedLicense,
          type: this.hostType,
          join_method: this.knownRoute,
          language: this.request.language
        }

        api.requestHost(params)
          .then(result => {
            alert('신청이 완료되었습니다. 확인 후 연락드리겠습니다.')
            window.location.href = '/'
          })
          .catch(error => alert('메이커 신청에 실패하였습니다. 위킨에 문의 바랍니다.'))
      }
    },
    checkForm() {
      if (!(this.request.name &&
        this.request.introduce &&
        this.request.email &&
        this.request.phone &&
        this.uploadedProfile != "/static/images/default-profile.png")) {
        alert('필수 항목을 채워주세요.')
      } else if (this.request.company.email && !Validation.checkEmailValidation(this.request.company.email)) {
        alert("이메일 형식을 확인해주세요.")
        return false
      } else {
        return true
      }
    }
  },
  data() {
    return {
      request: {
        name: null,
        introduce: null,
        email: null,
        phone: null,
        history: null,
        company: {
          name: null,
          phone: null,
          address: null,
          email: null,
        },
        language: null
      },
      knownRoute: "지인소개",
      hostType: 0,
      uploadedBusinessRegistration: null,
      uploadedProfile: "/static/images/default-profile.png",
      uploadedLicense: [],
      isImageUploading: false,
    }
  },
  components: {
    FireUpload
  },
  computed: mapGetters(['user']),
  mounted() {
    this.$store.watch(() => {
      if (this.user) {
        this.request.name = this.user.name
        this.request.email = this.user.email
        this.request.phone = this.user.phone

        if (!this.user.phone || !this.user.phone_valid) {
          alert("메이커 신청을 위해 전화번호 인증을 해주세요.")
          window.location.href = '/settings'
        }
      }
    })
  }

}
</script>
<style lang="scss">
@import '../../style/variables.scss';
@import '../../style/cross-browsing.scss';
@import '../../style/media.scss';

.host-request .floated.right.checkbox {
  width: 76px;
}

.host-request .fireUpload {
  height: 37px;
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
      font-family: NotoSansCJKkr-Regular;
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
    .input {
      width: 100%;
      height: 37px;
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
    @include respond(mobile) { padding: 18px }
    @include respond(tablet) { padding: 18px }
    @include respond(small) { padding: 18px }
  } // 파일 업로드
  .floated.right button {
    position: absolute!important;
    right: 0
  }

  .fireUpload {
    border: 1px solid #979797;
    width: 100%;

    input {
      width: 100%;
      position: absolute;
      opacity: 0;
      cursor: pointer;
      z-index: 1;
    }

    &.profile {
      position: absolute;
      border: none;

      input {
        height: 55px;
        max-width: 365px;
      }
    }
  }
}
</style>
