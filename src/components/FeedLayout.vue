<template>
  <div class="ui segment feed-list">
    <div class="image-light-box" v-if="isShowingLightBox">
      <i class="icon close" @click="hideImageLightBox()"></i>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(image, index) in feed.image_url" :style="`background-image:url(${image.replace('730','')})`" v-bind:key="index">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="body-container">
      <a :href="`/users/${feed.User.user_key}`" class="ui top aligned circular background image profile link" v-if="feed.User" v-bind:style="{'background-image': `url(${feed.User.profile_image})`}"></a>
      <div class="info">
        <span v-if="feed.User">{{feed.User.name}}</span>
        <p>{{feed.created_at | formatDate}}</p>
      </div>
      <div style="display:inline-block;">
          <transition name="fade" mode="out-in">
            <div v-if="!snsShow" class="ui basic button" style="margin:auto 0 auto 70px;" v-on:click="snsShow = !snsShow">
            <span><i class="share alternate icon"></i>공유하기</span>
</div>
            <div v-else key="button" class="ui basic button" style="margin:auto auto" v-on:click="snsShow = !snsShow">
            <span>
              <img class="facebookLogoBtn" @click="onFacebookShareClick(feed.doc_key)" src="/static/images/ic-facebook.png" style="width:28px;height=28px; margin-right:10px;">
              <img class="facebookLogoBtn" @click="snsShare('google', feed.doc_key)" src="/static/images/ic-google.png" style="width:28px;height=28px; margin-right:10px;">
              <img class="facebookLogoBtn" @click="snsShare('kakaostory', feed.doc_key)" src="/static/images/ic-kakaostory.png" style="width:28px;height=28px; margin-right:10px;">
              <img class="facebookLogoBtn" @click="snsShare('naver', feed.doc_key)" src="/static/images/ic-naver.png" style="width:28px;height=28px; margin-right:10px;">
            </span>
</div>
          </transition>
      </div>
      <div class="content">
        <p v-bind:class="{ expanded: isExpanded}" v-html="cutContent" style="white-space:pre-wrap"></p>
        <a class="expand-btn link" v-if="!isExpanded && !isTooShort" @click="onExpandClick()">더보기</a>
        <div class="ui images" v-if="feed.image_url">
          <a class="link" v-for="(image, index) in feed.image_url" v-bind:key="index" v-if="index < MAX_IMAGE_COUNT" @click="showImageLightBox()">
            <img :src="image" v-if="!(feed.image_url.length > MAX_IMAGE_COUNT && index == 3) && index === 0" style="width: 81%; height: 81%; display: block;">
            <img :src="image" v-if="!(feed.image_url.length > MAX_IMAGE_COUNT && index == 3) && index > 0">
          </a>
          <a class="link image-cover" v-if="feed.image_url.length > MAX_IMAGE_COUNT" @click="showImageLightBox()">
            <img :src="feed.image_url[MAX_IMAGE_COUNT]">
            <div class="more-img">
              <div class="table">
                <div class="table-cell">+{{feed.image_url.length - MAX_IMAGE_COUNT}}</div>
              </div>
            </div>
          </a>
        </div>
        <div v-if="feed.medias" id="DPlayer" class="dplayer"></div>
      </div>
      <div class="hash-container" v-if="feed.activity_key !=null && feed.activity_title">
        <!--<button class="ui basic button">후기</button>-->
        <a :href="`/activity/${feed.activity_key}`" tag="button" class="ui basic button">{{feed.activity_title | cuttingText}}</a>
        <div class="ui star top right rating" :data-rating="feed.activity_rating"></div>
      </div>
    </div>
    <div class="action-container" v-if="likes">
      <span class="link" @click="onLikeClick()">
        <i class="heart like red icon" v-bind:class="{ outline: !isLiked }"></i> 좋아요 {{likeCount}}
      </span>
      <i class="comment outline icon"></i> 댓글 {{commentCount}}
    </div>
    <div class="comment-input-container">
      <div class="content divider flex">
        <div class="ui input f1">
          <input type="text" placeholder="댓글을 입력하세요." v-model="commentContent">
        </div>
        <button class="ui button primary" @click="onPostCommentClick()">전송</button>
        <!--<div id="comment" ref="comment" contenteditable="true" placeholder="댓글을 입력하세요."></div>-->
      </div>
    </div>
    <div class="comment-container" v-if="commentCount!=0">
      <comment-layout :comment="comment" :user="user" :parent="$refs" v-for="comment in comments" v-bind:key="comment.comment_key"></comment-layout>
    </div>
    <div class="more-btn-container link" @click="getComments(page++)" v-if="!isLastComment">
      댓글 더보기
    </div>
  </div>
</template>
<script>
import api from 'api'
import auth from 'src/auth'
import _ from 'lodash'
import commentLayout from 'components/Feed/CommentLayout.vue'
import { Text } from 'src/util'

export default {
  name: 'feed',
  props: {
    feed: {
      image_url: '',
      images: [],
      User: {
        name: '',
        profile_image: '',
      }
    }
  },
  components: {
    commentLayout
  },
  data() {
    return {
      snsShow: false,
      MAX_IMAGE_COUNT: 4,
      isLiked: false,
      images: [],
      comments: [],
      likes: [],
      commentCount: 0,
      commentContent: null,
      likeCount: 0,
      isLikeClickingTime: false,
      imageLightBox: null,
      isShowingLightBox: false,
      isExpanded: false,
      isLastComment: false,
      isTooShort: false,
      isMenuClicked: false,
      page: 0,
    }
  },
  filters: {
    cuttingText(text) {
      if (Text.getBytes(text) >= 10) {
        return `${text.substring(0, 10)}...`
      } else {
        return text
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    cutContent() {
      if (Text.getBytes(this.feed.content) >= 240 && !this.isExpanded) {
        return `${this.hashLinking(this.feed.content.substring(0, 240), this.feed.tags)}...`
      } else {
        this.isTooShort = true
        return this.hashLinking(this.feed.content, this.feed.tags)
      }
    }
  },
  methods: {
    onReportClick() {
      api.sendEmail('wekin@wekiner.com', '[피드 신고] 신고 된 피드 알림', `피드 번호 : ${this.feed.doc_key}에 대한 신고가 들어왔습니다. 확인해주세요. \n 내용 : ${this.feed.content}`)
        .then(() => alert("신고되었습니다."))
    },
    hashLinking(content, hashTags) {
      if (hashTags !== null) {
        try {
          hashTags.forEach((value, index) => {
            let hashLink = value.replace('#', '')
            content = content.replace(value, `<a href="/search?keyword=${hashLink}" class="hashtag">${value}</a>`)
          })
        } catch (e) { }
      }
      return content
    },
    onExpandClick() {
      this.isExpanded = true
    },
    onModifyClick() {
      this.feed.refs.modifyFeed(this.feed)
    },
    onDeleteClick() {
      if (confirm('정말 삭제하시겠습니까?')) {
        api.deleteDoc(this.feed.doc_key)
          .then(result => {
            this.$el.remove()
          }).catch(error => console.error(error))
      }
    },
    onShareMenuClick() {
      // this.isMenuClicked = true
      this.$nextTick(() => {
        // $('.dropdown.feed-menu').dropdown({
        //   onHide: () => {
        //     this.isMenuClicked = false
        //     return true;
        //   },
        // })
        $('.dropdown.feed-menu').dropdown()
      })
    },
    snsShare(sns_type, key) {
      var title = $("#ogTitle").attr('content');
      var href = 'http://175.195.139.99:3000/share/doc/' + key
      var loc = "";
      var img = 'http://we-kin.com/static/images/default-profile.png'
      var oFlag = true;

      if (sns_type == 'facebook') {
        console.log("fb")
        loc = '//www.facebook.com/sharer/sharer.php?u=' + href + '&t=' + title;
      }
      else if (sns_type == 'twitter') {
        loc = '//twitter.com/home?status=' + encodeURIComponent(title) + ' ' + href;
      }
      else if (sns_type == 'google') {
        loc = '//plus.google.com/share?url=' + href;
      }
      else if (sns_type == 'pinterest') {

        loc = '//www.pinterest.com/pin/create/button/?url=' + href + '&media=' + img + '&description=' + encodeURIComponent(title);
      }
      else if (sns_type == 'kakaostory') {
        loc = 'https://story.kakao.com/share?url=' + encodeURIComponent(href);
      }
      else if (sns_type == 'band') {
        loc = 'http://www.band.us/plugin/share?body=' + encodeURIComponent(title) + '%0A' + encodeURIComponent(href);
      }
      else if (sns_type == 'naver') {
        loc = "http://share.naver.com/web/shareView.nhn?url=" + encodeURIComponent(href) + "&title=" + encodeURIComponent(title);
      }
      else {
        return false;
      }
      window.open(loc);
    },
    onFacebookShareClick(key) {
      window.open(`https://www.facebook.com/v2.1/dialog/feed?&app_id=101477687056507&display=popup&locale=ko_KR&link=${encodeURIComponent(`http://175.195.139.99:3000/share/doc/${key}`)}&version=v2.1`,
        'facebookShare',
        'toolbar=0,status=0,width=625,height=435'
      );
    },
    // hashLinker(content, hashTags) {
    //   if (hashTags !== null) {
    //     hashTags.forEach((value, index) => {
    //       content = content.replace(value, `<span class="hashtag">${value}</span>`)
    //     })
    //   }
    //   return content
    // },
    onLikeClick() {
      if (this.user) {
        api.toggleLike(this.user.user_key, this.feed.doc_key)
          .then(result => {
            if (result == 1) {
              this.isLiked = false
              this.likeCount--
            } else {
              this.isLiked = true
              this.likeCount++
            }
          })
      } else {
        alert("로그인이 필요한 서비스 입니다.")
        this.$parent.$parent.$refs.navbar.showModalLogin()
      }
    },
    onPostCommentClick() {
      if (this.user) {
        let commentParams = {
          doc_key: this.feed.doc_key,
          content: this.commentContent,
          user_name: this.user.name,
          user_key: this.user.user_key,
          user_profile_image: this.user.picture || this.user.profile_image
        }
        api.postComment(commentParams)
          .then(response => {
            if (response.status == 201) {
              this.comments.unshift(response.data)
              this.commentCount++
              this.commentContent = ''
            }
          })
          .catch(err => alert(err.response.data))
      } else {
        alert("로그인이 필요한 서비스 입니다.")
        this.$parent.$parent.$refs.navbar.showModalLogin()
      }
    },
    showImageLightBox() {
      this.isShowingLightBox = true
      this.initSwiper()
    },
    hideImageLightBox() {
      this.isShowingLightBox = false
    },
    initSwiper() {
      this.$nextTick(() => {
        this.imageLightBox = new Swiper('.image-light-box .swiper-container', {
          slidesPerView: 1,
          pagination: '.image-light-box .swiper-pagination',
        })
      })
    },
    getComments() {
      if (this.feed.doc_key) {
        api.getCommentsFromKey(this.feed.doc_key, this.page, 3)
          .then(comments => {
            console.log(comments)
            if (comments.rows.length != 0) {
              this.commentCount = comments.count.length
              comments.rows.forEach(comment => this.comments.push(comment))
            } else {
              this.isLastComment = true
            }
            if (comments.rows.length < 3) {
              this.isLastComment = true
            }
          })
      }
    },
    getLikes() {
      if (this.feed.doc_key) {
        api.getLikesFromKey(this.feed.doc_key)
          .then(likes => {
            this.likeCount = likes.count
            this.likes = likes.rows
          })
      }
    },
    nextImage() {
      this.imageLightBox.slideNext()
    },
    prevImage() {
      this.imageLightBox.slidePrev()
    }
  },
  mounted() {
    this.getComments()
    this.getLikes()
    this.$store.watch(() => {
      if (this.$store.state.user !== undefined) {
        // this.feed.content = this.hashLinker(this.feed.content, this.feed.tags)
        this.isLiked = _.find(this.likes, (like) => {
          if (this.user.user_key === like.user_key) {
            return true
          }
        })
      }
    })
    if (typeof window !== 'undefined') {
      if (this.feed.medias) {
        let element = this.$el.querySelector('#DPlayer')
        let dp = new DPlayer({
          element: element,
          hotkey: false,
          video: {
            url: this.feed.medias.video,
          }
        })
      }
    }
    // if (this.feed.images !== null) {
    //   this.getImages(this.feed.images)
    // }
    // $('.dropdown').dropdown({ transition: 'drop' })
    $('.feed-list .ui.rating').rating({ maxRating: 5 }).rating('disable')
  },
}
</script>

<style lang="scss" scoped>
$feed-width: 578px;

.image-light-box {
  position: fixed;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  left: 0;
  background: black;
  text-align: center;
  display: flex;
  align-items: center;

  .icon {
    color: white;
    font-size: 50px;
    position: fixed;
    top: 30px;
    right: 30px;
    z-index: 9999;
  }
  .swiper-wrapper {
    display: flex;
    align-items: center;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    height: 80%;
  }
  img {
    width: 100%
  }
}

[contenteditable=true]:empty:before {
  content: attr(placeholder);
  display: block;
  /* For Firefox */
}

div[contenteditable=true] {
  display: inline-block;
  flex: 1;
  outline: none;
  font-size: 12px;
  margin-right: 22px;
  padding: 8px;
  border: 1px solid #979797;
  border-radius: 4px;
}



.ui.container {
  text-align: center;
}

// .feed-e {
//   width: $feed-width;
//   height: 118px;
// }
.feed-list {
  width: $feed-width;
  display: inline-block;
  text-align: left; // padding: 20px 36px;
  &.ui.segment {
    padding: 0;
    border-radius: 4px;
  }

  .body-container {
    padding: 20px 40px;

    .rating {
      padding-left: 8px;
    }
    .content {
      p {
        margin-top: 20px;
        line-height: 1.5;
        font-family: NotoSansCJKkr-Regular;
        padding-top: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        /* 여러 줄 자르기 추가 스타일 */
        white-space: normal;
        max-height: 8.8em;
        word-wrap: break-word;
        display: -webkit-box; // -webkit-line-clamp: 3;
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
      img {
        width: 120px;
        height: 120px;
        object-fit: cover;
      }
    }
    .ui.images .image,
    .ui.images img,
    .ui.images svg {
      margin: 0 2.5px;
    }
  }
  .action-container,
  .comment-input-container {
    padding: 12px 40px;
    border-top: 1px solid rgb(243, 243, 243);
    font-size: 15px;
  }
  .action-container {
    font-size: 14px;
  }
  .more-btn-container {
    padding: 20px 40px;
    font-size: 14px;
    border-top: 1px solid rgb(243, 243, 243);
  }
  .comment-input-container .content {
    display: flex;
    align-items: center;
    align-content: center;
  }
  .comment-input-container .input {
    max-height: 34px;
    margin-right: 20px;
  }
  .hash-container {
    padding: 20px 0 0;

    button {
      font-weight: 700;
    }
  }
  .profile {
    width: 50px;
    height: 50px;
  }
  .info {
    display: inline-block;
    width: 202px;
    padding: 6px 12px;
  }
  .comment {
    margin-left: 38px;
  }

  .images .image-cover {
    position: absolute;
  }
}
 
/*issue 340 */

.menu .item img.facebookLogoBtn {
  width: 30px;
  display: inline-block;
  margin-top: -4px;
}

 

/*issue 340*/

.more-img {
  width: 120px;
  height: 120px;
  position: absolute;
  right: 0;
  font-size: 30px;
  top: 0;
  bottom: 0;
  left: 0;
  color: rgb(0, 0, 0);

  .table {
    display: table;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    margin-left: 3px;
  }
  .table-cell {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    color: white;
  }
}

.feed-menu {
  vertical-align: top;
  float: right;
  background: none;
  .menu {
    margin-left: -128px;
  }
  .icon {
    padding: 16px 0;
    font-size: 22px;
  }
  .header {
    font-size: 14px!important;
  }
}

.card {
  width: $feed-width;
}

@media only screen and (max-width: 548px) {
  .feed-list {
    .body-container {
      .content img {
        width: 64px;
        height: 64px;
      }
    }
    .more-img {
      width: 64px;
      height: 64px;
    }
  }
}

@media only screen and (max-width: 768px) {
  .feed-list {
    &.ui.segment {
      padding: 0!important;
    }
    .comment-input-container .input {
      margin-right: 4px;
    }
    .comment-input-container button {
      font-size: 12px;
      height: 33px;
    }
  }
}

@media only screen and (max-width: 991px) {
  .feed-e {
    width: 100%;
  }

  .feed-list {
    width: 100%!important;

    .ui.segment {
      padding: 0!important;
    }
    .body-container {
      padding: 20px;
    }
    .info {
      width: inherit;
    }
    .action-container,
    .comment-input-container {
      padding: 10px 20px;
    }
    .comment-container {
      padding: 4px 12px;

      .content {
        flex: 1;
      }
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
