<template>
  <div class="ui modal feed-editor">
    <div class="ui active inverted dimmer" v-show="isFileUploading">
      <div class="ui text loader">Uploading......
        <br>
        용량이 큰 파일은 시간이 소요될 수 있습니다.</div>
    </div>
    <div class="textarea">
      <textarea placeholder="이야기를 남겨주세요." v-model="content">
      </textarea>
    </div>



    <!--
    <div class="feed-editor__linear-container">
      <FireUpload :imageUrl="uploadedImage" @update:imageUrl="val => uploadedImages.push(val)" @progress="progress" v-bind:class="{ attatchedImage: uploadedImages.length, attatchedVideo: Object.keys(uploadedMedia).length}"></FireUpload>
      <div class="ui basic media buttons" v-if="!uploadedImages.length">
        <button class="ui button">
          <i class="icon image"></i> 사진
        </button>
        <button class="ui button">
          <i class="icon record"></i> 비디오
        </button>
      </div>
      <div class="videoUploader" v-bind:class="{ attatchedImage: uploadedImages.length, attatchedVideo: Object.keys(uploadedMedia).length}">
        <input type="file" accept="video/*" multiple v-on:change="uploadMedia"></input>
      </div>
      <div class="uploaded-images" v-if="uploadedImages.length">
        <img src="/static/images/add-image.png">
        <div v-for="(image, index) in uploadedImages" v-bind:key="index" style="display: inline-block; position: relative;">
          <img :src="image">
          <i class="close icon link" style="position:absolute;top:6px;right:0" @click="deleteImage(index)"></i>
        </div>
      </div>
    </div>
    -->
    <div class="feed-editor__linear-container">
      <!--이미지 업로드 버튼-->
      <div class="ui positive basic button imageUploadButton">
        <span style="display:table-cell;vertical-align:middle;"><i class="file image outline icon"></i> 이미지</span>
        <input class="imageUploadInput" type="file" v-on:change="fireStorage" accept="image/*" multiple></input>
      </div>
      <div class="ui positive basic button imageUploadButton">
        <span style="display:table-cell;vertical-align:middle;"><i class="file video outline icon"></i> 동영상</span>
        <input class="imageUploadInput" type="file" v-on:change="fireStorage" accept="video/*"></input>
      </div>
      <!--이미지 보여주는 부분-->
      <div>
        <div class="ui card" v-for="image in uploadedImages" style="width: 90px; height:90px; margin-right:8px; margin-top:0; display:inline-block; vertical-align: top">
          <div style="left:4px;top:4px;background: white;width:92%;height:92%;z-index:222;position:absolute;">
            <img :src="image" style="width:100%;height:100%">
          </div>
        </div>
      </div>
      <div>
        <div class="ui card" v-show="uploadedMedia.length !== 0" style="width: 90px; height:90px; margin-right:8px; margin-top:0; display:inline-block; vertical-align: top">
          <div style="left:4px;top:4px;background: white;width:92%;height:92%;z-index:222;position:absolute;">
            <img src="./../../static/icon/Play_Icon_FlatGreen.png" style="width:100%;height:100%">
          </div>
        </div>
      </div>
    </div>






    <div class="ui divider"></div>
    <div class="feed-editor__linear-container search">
      <!--<button class="ui basic button">위킨 찾기</button>-->
      <div class="ui wekin search">
        <div class="ui left icon input" style="positon:relative">
          <input class="prompt" type="text" placeholder="위킨 찾기" v-model="findWekin">
          <i class="search icon"></i>
        </div>
        <div class="flex-space"></div>
        <span class="ui star top right rating"></span>
        <div style="positon:absolute; max-width:190px;">
          <div class="ui segments" style="margin-top:4px; margin-left:10px;" v-if="findWekin && findWekin !== '선택안함'">
  <div class="ui segment" style="padding: 4px 0px 4px 10px;cursor: pointer;" @click="getOneActivity(allActivitiesKeyNumber[index])" v-for="(item, index) in allActivitiesTitle " v-if="item.includes(findWekin)">
    <p style="font-size:14px;">{{ item.slice(0, 33) }}...</p>
  </div>
  <div class="ui segment secondary" style="padding: 4px 0px 4px 10px;cursor: pointer;" @click="getOneActivity(0)">
    <p style="font-size:14px;"><i class="hand pointer icon"></i>관련위킨 선택안함</p>
  </div>
</div>
        </div>
      </div>
    </div>

    <div class="ui divider"></div>
    <div class="feed-editor__linear-container bottom">
      <div class="ui selection dropdown private">
        <input type="hidden" name="privateMode" :value="defaultPrivateMode">
        <i class="dropdown icon"></i>
        <div class="default text">공개</div>
        <div class="menu">
          <div class="item" data-value="0">공개</div>
          <div class="item" data-value="1">비공개</div>
        </div>
      </div>
      

      <button class="ui action negative button floated right" @click="onPostClick()">작성</button>
      <button class="ui basic action button floated right" @click="hideFeedEditor()">취소</button>
    <!--<div class="not-mobile">
      <input type="checkbox" id="checkbox" style="margin-top: 12px" v-model="withFacebook">
      <label for="checkbox" class="default text" style="color: rgb(59, 89, 152)"> FaceBook 동시 게재 </label>
    </div>-->
    </div>
  </div>
</template>
<script>
import api from 'api'
import FireUpload from 'components/FireUpload.vue'
import firebase from 'firebase'
import { Storage } from 'src/util'
import moment from 'moment'

export default {
  data() {
    return {
      uploadedImage: '',
      uploadedImages: [],
      uploadedMedia: '',
      defaultPrivateMode: false,
      content: null,
      images: null,
      activity: {
        key: null,
        title: null,
        rating: 0,
        Host: {}
      },
      findWekin: '',
      isFileUploading: false,
      isModifying: false, // 수정모드인지 판별 필수
      docKey: null,
      withFacebook: false,
      sendingTime: null,
      allActivitiesTitle : [],
      allActivitiesKeyNumber: [],
    }
  },
  components: {
    FireUpload
  },
  methods: {
    getOneActivity(activity_key) {
      if (activity_key === 0) {
        this.findWekin = '선택안함'
        this.activity = {
          key: null,
          title: null,
          rating: 0,
          Host: {}
        }
        return
      }
      api.getActivity(activity_key)
        .then( result => {
          this.activity =  result 
          this.findWekin = result.title
        })
    },
    fireStorage (e) {
      let self = this
      this.isFileUploading  = true
      let files = e.target.files
      let fileUploadCompleteNumber = 0
      if (files.length > 6) {
        window.alert("파일은 6장까지만 업로드 가능합니다.")
        self.isFileUploading = false
        return
      }
      // 이미지 어레이 받아서 하나씩 firebase에 업로드 후 url 저장한다.
      // TODO: 썸네일 만들어서 저장하는 처리 같이해야한다.
      if (files[0].type.slice(0, 5) === 'video') {
        let file = files[0]
        let tempRef = firebase.storage().ref()
        let videoPath = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + new Date().getSeconds() + new Date().getMilliseconds()
        let videoRef = tempRef.child('video/' + videoPath)
        let uploadTask = videoRef.put(file)
        uploadTask.on('state_changed', function(snapshot){
        }, function(error) {
        }, function() {
          fileUploadCompleteNumber += 1
          var downloadURL = uploadTask.snapshot.downloadURL
          self.uploadedMedia = downloadURL 
          if (fileUploadCompleteNumber === files.length) {
            self.isFileUploading = false
          }
        })
        return
      }
      for (let i = 0; i < files.length; i++) {
        let file = files[i]
        let tempRef = firebase.storage().ref()
        let imagePath = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + new Date().getSeconds() + new Date().getMilliseconds()
        let imageRef = tempRef.child('img/image/' + imagePath)
        let uploadTask = imageRef.put(file)
        uploadTask.on('state_changed', function(snapshot){
        }, function(error) {
        }, function() {
          fileUploadCompleteNumber += 1
          var downloadURL = uploadTask.snapshot.downloadURL
          self.uploadedImages.push(downloadURL + '?alt=media') 
          if (fileUploadCompleteNumber === files.length) {
            self.isFileUploading = false
          }
        })
      }
    },
    progress(value) {
      this.isFileUploading = true
      if (value >= 100) {
        this.isFileUploading = false
        $('.feed-editor').modal('show')
      }
    },
    deleteImage(index) {
      this.uploadedImages.splice(index, 1)
    },
    uploadMedia(e) {
      let file = e.target.files[0]
      this.isFileUploading = true      
      Storage.mediaUpload(file, url => {
        this.uploadedMedia = url
        this.isFileUploading = false
      })
    },
    onPostClick() {
      if (this.findWekin !== '선택안함' && !this.activity.title) {
        if (!window.confirm("관련위킨 없이 업로드 하시겠습니까?")) {
          return
        } 
      }
      if (this.content.length < 5) {
        window.alert("내용은 5글자 이상이여야 합니다.")
        return
      }
      if (this.sendingTime && this.sendingTime - moment() > -30000) {
        alert("10초에 한번만 작성 가능합니다. 잠시만 기다려주세요.")
        return
      }
      this.sendingTime = moment()
      let postParams = {
        activity_key: this.activity.activity_key,
        activity_title: this.activity.title,
        activity_rating: $(this.$el.querySelector('.rating')).rating('get rating'),
        host_key: this.activity.Host.host_key,
        image_url: this.uploadedImages,
        content: this.content,
        type: this.getDocType(),
        private_mode: this.getPrivateMode()
      }
      if (Object.keys(this.uploadedMedia).length) {
        postParams.medias = { video: this.uploadedMedia }
      }
      if (this.isModifying) { // 수정모드 이면 업데이트
        api.updateDoc(this.docKey, postParams)
          .then(res => window.location.href = this.$route.fullPath)
          .catch(err => console.err(err))
      } else if (this.withFacebook) {
        this.isFileUploading = true      
        function statusChangeCallback(response) {
          if (response.status === 'connected') {
            let firebaseUploadedImages = []
            postParams.image_url.forEach(
              function (value) { firebaseUploadedImages.push(value) }
            )
            var photoID = []
            var message = String(postParams.content)
            testAPI(firebaseUploadedImages, photoID, message);
          } else {
            FB.login(function(response) {
              let firebaseUploadedImages = []
              postParams.image_url.forEach(
                function (value) { firebaseUploadedImages.push(value) }
              )
              var photoID = []
              var message = String(postParams.content)
              testAPI(firebaseUploadedImages, photoID, message);
              // handle the response
            }, {scope: 'public_profile,email,publish_actions'});
          }
        }
        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        }, false);

        // 이미지 업로드가 다되고 불러지는 콜백 함수
        function imageUploadDone(photoID, message) {
          let attached_media = [{"media_fbid":"1651173841621010"}]
          var photoID = photoID || ""
          FB.api('/me/feed', 'POST', { "message": message, "attached_media":  photoID }, function(response) {
            api.postDoc(postParams)
              .then(res => window.location.reload())
              .catch(err => console.log(err))
          }
          )
        }

        // 로그인 된후 실행시킬 테스트 API
        function testAPI(postURL, photoID, message) {
          if (postURL.length === 0) {
            imageUploadDone([], message)
          } else {
            postURL.forEach(
              function (imageURL) { 
                FB.api('/me/photos', 'POST', { "url": imageURL, "published": false}, function(response) {
                  photoID.push({"media_fbid": response.id})
                  if (photoID.length === postURL.length) {
                    imageUploadDone(photoID, message)
                  }
                })
              }
            );
          }
        }

      } else {  // 일반모드이면 생성
        api.postDoc(postParams)
          .then(res => window.location.href = this.$route.fullPath)
          .catch(err => console.err(err))
      }
    },
    modifyFeed(feed) {
      this.isModifying = true
      this.docKey = feed.doc_key
      this.content = feed.content
      this.uploadedImages = feed.image_url
      this.activity.key = feed.activity_key
      this.activity.title = feed.activity_title
      this.activity.rating = feed.activity_rating
      this.findWekin = feed.activity_title
      this.defaultPrivateMode = feed.private_mode
      this.showFeedEditor()
    },
    createFeed() {
      this.content = ''
      this.uploadedImages = []
      this.activity.key = null
      this.activity.title = null
      this.activity.rating = 5
      this.findWekin = ''
      this.showFeedEditor()
    },
    createReview(activity) {
      this.getOneActivity(activity.activity_key)
      this.activity.key = activity.activity_key
      this.activity.title = activity.title
      this.findWekin = activity.title
      this.activity.rating = 5
      this.showFeedEditor()
    },
    showFeedEditor() {
      $('.feed-editor').modal('show')
      this.$nextTick(() => {
        $('.feed-editor .ui.rating').rating({
          initialRating: 5,
          maxRating: 5
        })
        if (this.defaultPrivateMode) $('.ui.dropdown.private').dropdown('set value', "1") // NOTE: 따옴표가 없으면 작동하지 않음
        else $('.ui.dropdown.private').dropdown('set value', "0")

        $('.ui.dropdown.private').dropdown()
      })
    },
    hideFeedEditor() {
      this.uploadedImages = []
      this.content = null
      $('.feed-editor').modal('hide')
    },
    getPrivateMode() {
      let privateMode = $(this.$el.querySelector('.dropdown.private')).dropdown('get value')
      if (privateMode === "1") {
        return true
      }
      return false
    },
    getDocType() {
      return this.activity.activity_key ? 1 : 0 // 액티비티 키가 있으면 후기 (1) 아니면 피드 (0)
    },
  },
  mounted() {
    api.getActivityForSearch()
      .then( result => {
        let tmpTitleList = []
        let tmpKeyNumberList = []
        let leng = result.allActivities.length
        for (let i = 0; i < leng; i++) {
          let item = result.allActivities[i] 
          tmpTitleList.push(item.title)
          tmpKeyNumberList.push(item.activity_key)
        }
        this.allActivitiesTitle = tmpTitleList 
        this.allActivitiesKeyNumber= tmpKeyNumberList
      })
    /*
    $('.ui.wekin.search').search({
      apiSettings: {
        url: 'https://wekin-api-prod-dot-wekinproject.appspot.com/v1/activity/front?keyword={query}'
        // url: 'https://wekin-api-dev-dot-wekinproject.appspot.com/v1/activity/front?keyword={query}'
      },
      fields: {
        results: 'results',
        title: 'title',
        key: 'activity_key',
        Host: 'Host',
      },
      minCharacters: 2,
      onSelect: (result, response) => {
        this.activity.title = result.title
        this.activity.key = result.activity_key
        this.activity.Host = result.Host
      }
    })
    */
  }
}
</script>
<style lang="scss" scoped>
.imageUploadButton{
    position: relative;
    overflow: hidden;
    margin: 10px;
}
.imageUploadButton input.imageUploadInput{
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);
}
@import '../style/variables.scss';
@import '../style/cross-browsing.scss';

.feed-editor {
  max-width: 578px;
  margin-left: -289px!important;

  .divider {
    margin: 0;
  }
  &__linear-container {
    padding: 15px 36px;
  }

   ::-webkit-input-placeholder {
    color: $color-line;
  }
   :-moz-placeholder {
    color: $color-line;
    opacity: 1;
  }
   ::-moz-placeholder {
    color: $color-line;
    opacity: 1;
  }
   :-ms-input-placeholder {
    color: $color-line;
  }

  textarea {
    width: 100%;
    height: 200px;
    outline: none;
    border: none;
    resize: none;
    padding: 20px 36px;
    border-radius: 16px;
    line-height: 1.3;
  }

  .media.buttons {
    @include flex-box();
    text-align: center;
    button {
      flex: 1;
      height: 53px;
    }
  }
  .ui.rating {
    margin-left: 30px;
  }
  .ui.selection.dropdown {
    min-width: 130px;
  }
  .action.button {
    width: 90px;
    margin: 0 5px;
  }

  .wekin.search {
    display: inline-block!important;
  }
  .flex-space {
    display: none;
  } // 파일 업로드
  .videoUploader {
    height: 55px;
    position: absolute;
    width: 100%;
    margin-top: -55px;
    border: 0;
    &.attatchedImage {
      display: none;
    }
    &.attatchedVideo {
      display: none;
    }

    input {
      opacity: 0;
      height: 100%;
      width: 44%;
      z-index: 9999;
      cursor: pointer;
      right: 0;
      position: absolute;
      margin-right: 72px;
    }
  }

  .uploaded-images {
    img {
      width: 122px;
      height: 122px;
      padding: 4px;
      object-fit: cover;
    }
  }
}

@media only screen and (max-width: 991px) {
  .flex-space {
    display: inherit;
  }
  .feed-editor {
    max-width: 578px; // margin-left: -47.5%!important;
    &__linear-container {
      padding: 15px 15px;
      &.search {
        @include flex-box();
        align-items: center;
      }
    }
    .ui.selection.dropdown {
      min-width: 82px;
    }
    .action.button {
      width: 80px;
      margin: 1px 1.5px
    }
    .uploaded-images {
      img {
        width: 88px;
        height: 88px;
        padding: 2px;
      }
    }
  }
  .wekin.search .input {
    width: 110px;
  }
}

@media only screen and (max-width: 600px) {
  .feed-editor {
    margin-left: -47.5%!important;
    .videoUploader input {
      margin-right: 34px;
    }
  }
  .modals.dimmer .ui.scrolling.modal {
    &.feed-editor {
      margin-top: 128px!important;

      textarea {
        width: 100%;
        height: 84px;
        outline: none;
        border: none;
        resize: none;
        padding: 20px 36px;
        border-radius: 16px;
        line-height: 1.3;
      }
    }
  }
  .not-mobile {
    display: none;
  }

}
</style>
<style lang="scss">
.fireUpload {
  height: 55px;
  position: absolute;
  width: 100%;
  z-index: 9998;
  border: 0;
  &.attatchedImage {
    height: 120px;
    width: 120px;
    input {
      width: 120px;
    }
  }
  &.attatchedVideo {
    display: none;
  }
}
</style>
