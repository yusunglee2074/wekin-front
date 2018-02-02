<template>
  <div class="ui container settings" v-if="user">
    <div class="navbar-custom"></div>
    <div class="ui segment">
      <div class="ui active inverted dimmer" v-if="isFileUploading">
        <div class="ui text loader">이미지를 변경중입니다.</div>
      </div>
      <div class="ui active inverted dimmer" v-if="isLoading">
        <div class="ui text loader">정보 업데이트중</div>
      </div>
      <div class="header">프로필 설정</div>
      <div class="ui divider"></div>
      <div class="settings__list">
        <label>프로필사진</label>
        <div class="fields">
          <img class="ui middle circular aligned tiny image profile" :src="uploadedProfile" style="margin-right:60px;">
          <FireUpload title="업로드" class="profile-uploader profile" :imageUrl="uploadedProfile" @update:imageUrl="val => uploadedProfile = val" @progress="progress"></FireUpload>
        </div>
      </div>
      <div class="settings__list">
        <label class="required">이름</label>
        <div class="ui input fields">
          <input type="text" v-model="formUser.name">
        </div>
      </div>
      <div class="settings__list">
        <label>성별</label>
        <div class="field">
          <button class="ui button" v-bind:class="{primary: !gender, basic: gender}" @click="setGender(0)">남자</button>
          <button class="ui button" v-bind:class="{primary: gender, basic: !gender}" @click="setGender(1)">여자</button>
        </div>
      </div>
      <div class="settings__list">
        <label>소개</label>
        <div class="ui form fields">
          <div class="field">
            <textarea v-model="formUser.introduce"></textarea>
          </div>
        </div>
      </div>
      <div class="ui divider"></div>
      <div class="settings__list">
        <label>이메일</label>
        <div class="fields">
          <span>상품안내/결제안내/약관변경 등 중요 정보를 받는 주소입니다.</span>
          <div class="ui input">
            <input type="text" disabled="disabled" v-model="formUser.email">
          </div>
          <div class="ui checkbox">
            <input type="checkbox" name="emailNoti" checked="checked" v-model="emailNoti">
            <label>위킨 메일 수신 동의</label>
          </div>
        </div>
      </div>
      <div class="ui divider"></div>
      <div class="settings__list">
        <label>전화번호</label>
        <div class="fields">
          가입 후 최초 1회 진행해야하는 핸드폰 번호 인증입니다.
          <div class="ui left labeled icon input" @click="onPhoneClick()">
            <i class="check circle icon violet" v-if="formUser.phoneValid"></i>
            <input type="text" v-model="formUser.phone">
          </div>
          <div class="ui input" v-if="isPhoneVerifying">
            <input type="text" v-model="formUser.phonVerificationCode" placeholder="인증코드를 입력해주세요.">
          </div>
          <div v-if="isPhoneVerifying">인증 만료 시간: {{expiredTime | formatTimer}}</div>
          <button class="ui primary button" @click="verifySmsCode()" v-if="isPhoneVerifying">인증완료</button>
          <button class="ui basic negative button" v-if="!formUser.phoneValid" @click="sendPhoneVerification()">인증요청</button>
        </div>
      </div>
      <div class="ui divider"></div>
      <div class="settings__list">
        <label>알림설정</label>
        <span>웹, 모바일, 태블릿 등 알림 받기</span>
        <div class="flex-space"></div>
        <div class="ui checkbox floated right">
          <input type="checkbox" name="pushNoti" checked="checked" v-model="pushNoti">
          <label>알림</label>
        </div>
      </div>
      <div class="ui divider"></div>
      <button class="ui primary button floated right save-btn" @click="saveProfile()">저장</button>
      <div class="clear"></div>
    </div>
    <div class="ui segment">
      <div class="header">비밀번호 변경</div>
      <div class="ui divider"></div>
      <div class="settings__list">
        <label class="vertical">이전 비밀번호</label>
        <div class="ui input fields">
          <input type="password" v-model="oldPassword">
        </div>
      </div>
      <div class="settings__list">
        <label class="vertical">새 비밀번호</label>
        <div class="ui input fields">
          <input type="password" v-model="newPassword1">
        </div>
      </div>
      <div class="settings__list">
        <label class="vertical">새 비밀번호 확인</label>
        <div class="ui input fields">
          <input type="password" v-model="newPassword2">
        </div>
      </div>
      <button class="ui primary button floated right save-btn" @click="updatePassword()">변경</button>
      <div class="clear"></div>
    </div>
    <div class="ui segment">
      <div v-if="providerId == 'password'">
      <div class="header">회원탈퇴</div>
      <div class="ui divider"></div>
      <!--<div class="settings__list" v-if="providerId == 'password'">-->
      <div class="settings__list">
        <label class="vertical">이메일</label>
        <div class="ui input fields">
          <input type="text" v-model="deleteUser.email">
        </div>
      </div>
      <div class="settings__list" v-if="providerId == 'password'">
        <label class="vertical">비밀번호</label>
        <div class="ui input fields">
          <input type="password" v-model="deleteUser.password">
        </div>
      </div>
      <div class="settings__list">
        <label></label>
        <span class="color negative">*탈퇴하실 경우 개인정보와 활동내용 등 모든것이 삭제됩니다.
          <br></br>*삭제되신 정보는 재가입 후에도 복구가 불가능합니다.</span>
      </div>
      <button class="ui primary button floated right save-btn" @click="onWithdrawalClick()">탈퇴</button>
      
      
      <div class="clear"></div>
      <hr>
</div>
      <div v-if="!providerId || providerId  == 'facebook.com'">
        <h3>소셜 회원 탈퇴</h3>
        <div class="ui divider"></div>
        <div class="settings__list">
          <span class="color negative"></span>
        </div>
          <button @click="withDraw()" class="ui primary button floated right">소셜 회원 계정탈퇴</button>
        <div class="settings__list">
          <span class="color negative">
            *연동한 SNS과 연결을 끊고 모든 내용이 삭제됩니다.<br>*삭제되신 정보는 복구가 불가능합니다.</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FireUpload from 'components/FireUpload.vue'
import firebase from 'firebase'
import api from 'api'
import auth from 'src/auth'

const EXPIRED_TIME = 180

export default {
  data() {
    return {
      user: null,
      formUser: {
        name: '',
        phone: '',
        email: '',
        phoneValid: false,
      },
      deleteUser: {
        email: null,
        password: null
      },
      pushNoti: true,
      emailNoti: true,
      gender: 0,
      expiredTime: EXPIRED_TIME,
      isPhoneVerifying: false,
      isLoading: false,
      isFileUploading: false,
      oldPassword: null,
      newPassword1: null,
      newPassword2: null,
      uploadedProfile: "/static/images/default-profile.png",
      providerId: '',
    }
  },
  methods: {
    withDraw() {
      if (confirm("정말로 탈퇴 하시겠습니까?")) {
        api.withDrawSocial(localStorage.getItem('socialToken'), this.user.uuid)
          .then(result => {
            window.alert("모든 정보가 삭제되었습니다. 행복한 하루되세요!")
            window.location.href = '/'
          })
          .catch(e => window.alert('에러가 발생했습니다. 혹시나 로그아웃 후 재 로그인에도 탈퇴가 진행되지 않으신다면 카카오톡 @위킨 으로 연락주시면 빠르게 답변드리겠습니다.'))
      } else return
    },
    onPhoneClick() {
      if (this.formUser.phoneValid && confirm("전화번호를 재인증 하시겠습니까?")) {
        this.formUser.phoneValid = false
      }
    },
    startTimer() {
      let interval = setInterval(() => {
        this.expiredTime--
        if (this.expiredTime <= 0) {
          this.stopTimer(interval)
        }
      }, 1000);
    },
    stopTimer(interval) {
      this.expiredTime = EXPIRED_TIME
      this.isPhoneVerifying = false
      this.formUser.phonVerificationCode = ''
      clearInterval(interval)
    },
    verifySmsCode() {
      auth.verifySmsCode(this.formUser.phone, this.formUser.phonVerificationCode)
        .then((data) => {
          if (data.success) {
            this.formUser.phoneValid = true
            this.stopTimer()
            api.saveProfile(this.$store.getters.user.user_key, { phone: this.formUser.phone, phone_valid: true })
              .then(result => {
                return auth.getCurrentUser()
              })
              .then(user => {
                this.$store.commit('SET_USER', user)
                alert("인증이 완료되었습니다.")
                window.location.href = '/'
              })
              .catch(error => {
                alert(error + moment().format() + "죄송합니다. 사이트 아래 주소의 오픈카톡으로 연락주시면 바로 해결해드리겠습니다.")
              })
          } else {
            alert("인증번호가 올바르지 않습니다.")
          }
        }).catch(error => console.error(error))
    },
    sendPhoneVerification() {
      if (!this.isPhoneVerifying) {
        auth.sendPhoneVerification(this.formUser.phone)
          .then((data) => {
            this.startTimer()
            this.isPhoneVerifying = true
          }).catch(error => console.error(error))
      } else {
        alert("이미 전송되었습니다. 경우에 따라 1분 이상 소요될 수 있습니다.")
      }
    },
    setGender(gender) {
      this.gender = gender
    },
    checkForm() {
      if (!this.formUser.name) {
        alert('이름은 필수 입니다.')
        return
      } else {
        return true
      }
    },
    saveProfile() {
      if (this.checkForm()) {
        let params = {
          name: this.formUser.name,
          introduce: this.formUser.introduce,
          profile_image: this.uploadedProfile,
          gender: this.gender,
          email_noti: this.emailNoti,
          push_noti: this.pushNoti,
          phone_valid: this.user.phone_valid
        }
        this.isLoading = true
        api.saveProfile(this.user.user_key, params)
          .then(result => {
            alert('변경되었습니다.')
            window.location.href = '/settings'
          })
          .catch(error => console.error(error))
      }
    },
    updatePassword() {
      if ((this.newPassword1 && this.newPassword2) && this.newPassword1 === this.newPassword2) {
        auth.updatePassword(this.user.email, this.oldPassword, this.newPassword1)
          .then(result => {
            alert('변경되었습니다.')
            window.location.href = '/settings'
          })
          .catch(result => alert(result))
      } else {
        alert('새로운 비밀번호가 일치하지 않습니다.')
      }
    },
    onWithdrawalClick() {
      let providerId = this.providerId
      if (confirm(`개인정보 취급방침 동의에 의거하여 탈퇴 시 개인정보는 즉시 삭제됩니다.
다시 한번 개인정보 취급방침을 확인하여 주시기 바랍니다.

<탈퇴 시 유의사항>
1) 탈퇴 즉시 모든 개인정보와 거래내역은 삭제됩니다.
2) 3개월내 해당 이메일/아이디로 재가입이 불가합니다.

정말 탈퇴하시겠습니까?`)) {
        //if (providerId == 'password') {
        if (true) {
          auth.deleteUser(this.deleteUser.email, this.deleteUser.password)
            .then(() => {
              api.deleteUser().then((result) => {
                if (result) {
                  alert('탈퇴되었습니다. 이용해주셔서 감사합니다.')
                  window.location.href = '/'
                } else {
                  alert('위킨에 문의 바랍니다.')
                }
              })
            }).catch(() => alert('위킨에 문의 바랍니다.'))
        } else {
          api.deleteUser().then((result) => {
            if (result) {
              alert('탈퇴되었습니다. 이용해주셔서 감사합니다.')
              firebase.auth().signOut()
              window.location.href = '/'
            } else {
              alert('위킨에 문의 바랍니다.')
            }
          }).catch(() => alert('위킨에 문의 바랍니다.'))
        }
      }
    },
    progress(value) {
      this.isFileUploading = true
      if (value >= 100) {
        this.isFileUploading = false
      }
    }
  },
  components: {
    FireUpload
  },
  computed: {
  },
  mounted() {
    this.user = this.$store.getters.user
    this.formUser.name = this.user.name
    this.formUser.email = this.user.email
    this.formUser.phone = this.user.phone
    this.formUser.phoneValid = this.user.phone_valid
    this.formUser.introduce = this.user.introduce
    this.uploadedProfile = this.user.profile_image
    this.gender = this.user.gender
    this.pushNoti = this.user.push_noti
    this.emailNoti = this.user.email_noti
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.providerId = firebase.auth().currentUser.providerData[0].providerId    
      }
    })
  }
}
</script>
<style lang="scss">
@import '../style/variables.scss';
@import '../style/cross-browsing.scss';

.profile-uploader {
  max-width: 145px!important
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
    .fields .input {
      width: 100%;
    }

    .floated.right.checkbox {
      width: 76px;
    }
  }

  .ui.segment {
    padding: 1.5em 14em;
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

@media only screen and (max-width: 768px) {
  .settings {
    .header {
      font-size: 15px;
    }
    &__list {
      >label {
        min-width: 100px;
        font-size: 13px;
      }
    }
    .fields,
    .fields label,
    span,
    .checkbox label,
    button {
      font-size: 11px;
    }
  }
  .ui.segment {
    padding: 8px!important;
  }
}
</style>
