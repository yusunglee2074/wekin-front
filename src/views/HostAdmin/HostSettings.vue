<template>
  <div class="host-settings">
    <host-card-layout title="설정">
      <div slot="content" class="content">
        <div class="ui active inverted dimmer" v-if="isImageUploading">
          <div class="ui medium text loader">이미지를 업로드중입니다.</div>
        </div>
        <div class="header">프로필 설정</div>
        <div class="ui divider"></div>
        <div class="settings__list">
          <label class="required">프로필사진</label>
          <div class="fields">
            <FireUpload class="profile" :imageUrl="uploadedProfile" @update:imageUrl="val => uploadedProfile = val" @progress="progress"></FireUpload>
            <img class="ui middle circular aligned tiny image profile" :src="uploadedProfile">
            <a href="#" class="margin-min">이미지 변경</a>
          </div>
        </div>
        <div class="settings__list">
          <label class="required">메이커 이름</label>
          <div class="ui input">
            <input type="text" v-model="request.company.name">
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
          <label class="required">메이커 주소</label>
          <div class="ui input">
            <input type="text" v-model="request.company.address">
          </div>
        </div>
        <div class="settings__list">
          <label class="required">메이커 이메일</label>
          <div class="ui input">
            <input type="text" v-model="request.company.email">
          </div>
        </div>
        <div class="settings__list">
          <label class="required">메이커 연락처</label>
          <div class="ui input">
            <input type="text" v-model="request.company.phone">
          </div>
        </div>
        <div class="settings__list">
          <label class="required">메이커 이력</label>
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
            <input type="text" v-model="request.company.home_page">
          </div>
        </div>
        <div class="settings__list">
          <label>sns</label>
          <div class="ui input fields">
            <input type="text" v-model="request.company.sns">
          </div>
        </div>
        <div class="ui divider"></div>
        <div class="settings__list" v-if="uploadedBusinessRegistration">
          <img :src="uploadedBusinessRegistration" style="width:100%;height:100%">
        </div>
        <div class="settings__list">
          <label>사업자 등록증</label>
          <div class="ui action floated right input">
            <FireUpload :imageUrl="uploadedBusinessRegistration" @update:imageUrl="val => uploadedBusinessRegistration = val" @progress="progress"></FireUpload>
            <button class="ui teal left labeled icon button">
              <i class="plus icon"></i> 추가
            </button>
          </div>
        </div>
        <div class="settings__list" v-if="uploadedLicense && uploadedLicense.length">
          <div style="position:relative" v-for="(imageUrl, index) in uploadedLicense" v-bind:key="index">
            <img style="width:100%;height:100%" :src="imageUrl">
            <i class="icon close link" style="position:absolute; top:0;right:0" @click="deleteImage(uploadedLicense, index)"></i>
          </div>
        </div>
        <div class="settings__list">
          <label>자격증</label>
          <div class="ui action floated right input">
            <FireUpload :imageUrl="uploadedLicense" @update:imageUrl="val => uploadedLicense.push(val)" @progress="progress"></FireUpload>
            <button class="ui teal left labeled icon button">
              <i class="plus icon"></i> 추가
            </button>
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
                <div class="ui radio checkbox">
                  <input type="radio" name="example2" value="지인소개" v-model="knownRoute">
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
        <button class="ui primary button floated right save-btn" @click="sendForm()">저장</button>
        <div class="clear"></div>
      </div>
    </host-card-layout>
  </div>
</template>
<script>
import hostCardLayout from 'components/HostCardLayout.vue'
import FireUpload from 'components/FireUpload.vue'
import { mapGetters } from 'vuex'
import { Validation } from 'src/util'
import api from 'api'

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
          introduce: this.request.introduce,
          history: this.request.history,
          host_profile_image: this.uploadedProfile,
          host_name: this.request.company.name,
          host_tel: this.request.company.phone,
          host_address: this.request.company.address,
          host_home_page: this.request.company.home_page,
          host_sns: this.request.company.sns,
          host_email: this.request.company.email,
          business_registration: this.uploadedBusinessRegistration,
          license_list: this.uploadedLicense,
          type: this.hostType,
          join_method: this.knownRoute,
        }
        api.updateHost(this.user.Host.host_key, params)
          .then(result => {
            alert('프로필이 수정되었습니다.')
            window.location.href = ''
          })
          .catch(error => console.error(error))
      }
    },
    checkForm() {
      if (!(this.request.name &&
        this.request.introduce &&
        this.request.company.name &&
        this.request.company.phone &&
        this.request.company.email &&
        this.uploadedProfile)) {
        alert('필수 항목을 채워주세요.')
      } else if (!Validation.checkEmailValidation(this.request.company.email)) {
        return false
      } else {
        return true
      }
    },
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
          home_page: null,
          sns: null,
        }
      },
      isImageUploading: false,
      knownRoute: null,
      hostType: null,
      uploadedBusinessRegistration: null,
      uploadedProfile: "/static/images/default-profile.png",
      uploadedLicense: [],
    }
  },
  components: {
    FireUpload,
    hostCardLayout
  },
  computed: mapGetters(['user']),
  mounted() {
    this.$store.watch(() => {
      if (this.user) {
        let host = this.user.Host

        this.request.name = this.user.name
        this.request.email = this.user.email
        this.request.phone = this.user.phone
        this.uploadedProfile = host.profile_image

        this.request.introduce = host.introduce
        this.request.history = host.history

        this.request.company.phone = host.tel
        this.request.company.name = host.name
        this.request.company.email = host.email
        this.request.company.sns = host.sns
        this.request.company.address = host.address
        this.request.company.home_page = host.home_page
        this.knownRoute = host.join_method
        this.hostType = host.type
      }
    })
  }
}
</script>
<style lang="scss">
@import '../../style/variables.scss';
@import '../../style/cross-browsing.scss';

.host-settings {
  .content {
    width:100%;
    max-width: 502px;
    min-width: 70%;
    padding-top: 22px!important;
    margin: 0 auto!important;
  }

  .fireUpload {
    border: 1px solid #979797!important;
    height: 36px; // width: 100%;
    // z-index: 9999;
    // border: 0;
  }
  .floated.right button {
    position: absolute!important;
    right: 0
  }
}

.fireUpload {
  border: 1px solid;
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

.settings {
  max-width: 512px;
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
    input {
      border: 1px solid $color-line!important;
    }
    .input {
      width: 100%;
      height: 37px;
    }


    .floated.right.checkbox {
      width: 76px;
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
</style>
