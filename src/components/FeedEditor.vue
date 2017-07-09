<template>
  <div class="ui modal feed-editor">
    <div class="ui active inverted dimmer" v-if="isFileUploading">
      <div class="ui text loader">업로드중</div>
    </div>
    <div class="textarea">
      <textarea placeholder="이야기를 남겨주세요." v-model="content">
      </textarea>
    </div>
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
    <div class="ui divider"></div>
    <div class="feed-editor__linear-container search">
      <!--<button class="ui basic button">위킨 찾기</button>-->
      <div class="ui wekin search">
        <div class="ui left icon input">
          <input class="prompt" type="text" placeholder="위킨 찾기" v-model="findWekin">
          <i class="search icon"></i>
        </div>
      </div>
      <div class="flex-space"></div>
      <span class="ui star top right rating"></span>
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
    </div>
  </div>
</template>
<script>
import api from 'api'
import FireUpload from 'components/FireUpload.vue'
import firebase from 'firebase'
import { Media } from 'src/util'

export default {
  data() {
    return {
      uploadedImage: '',
      uploadedImages: [],
      uploadedMedia: {},
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
    }
  },
  components: {
    FireUpload
  },
  methods: {
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
      Media.storage(file, this.progress).then(url => {
        this.uploadedMedia = url
      })
    },
    onPostClick() {
      let postParams = {
        activity_key: this.activity.key,
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
      return this.activity.key ? 1 : 0 // 액티비티 키가 있으면 후기 (1) 아니면 피드 (0)
    },
  },
  mounted() {
    $('.ui.wekin.search').search({
      apiSettings: {
        url: 'https://wekin-api-prod-dot-wekinproject.appspot.com/v1/activity/front?keyword={query}'
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
  }
}
</script>
<style lang="scss" scoped>
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
