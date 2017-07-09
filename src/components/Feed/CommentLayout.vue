<template>
  <div class="comment-container__list">
    <img class="ui image mini circular" :src="comment.user_profile_image.replace('public', 'static') ">
    <div class="content">
      <span class="name">{{comment.user_name}}</span>
      <span class="date">{{comment.updated_at | timeago}}
        <span class="modify-button link" v-show="isMyComment && !isModifying" @click="modifyComment()"> 수정하기</span>
      </span>
      <div class="body" v-show="!isModifying">{{cutContent}}</div>
      <div class="body ui input" v-show="isModifying">
        <input class="input" type="text" v-model="comment.content">
        <button class="ui button negative" style="margin-left:12px; vertical-align:middle" @click="updateComment()">수정</button>
      </div>
      <a class="expand-btn link" v-if="!isExpanded && !isTooShort" @click="onExpandClick()">더보기</a>
    </div>
  </div>
</template>
<script>
import { Text } from 'src/util'
import api from 'api'

export default {
  props: {
    comment: {},
    user: {}
  },
  computed: {
    cutContent() {
      if (Text.getBytes(this.comment.content) >= 80 && !this.isExpanded) {
        return `${this.comment.content.substring(0, 80)}...`
      } else {
        this.isTooShort = true
        return this.comment.content
      }
    },
    isMyComment() {
      if (this.user) {
        if (this.comment.user_key == this.user.user_key) {
          return true
        }
      }
      return false
    },
  },
  methods: {
    updateComment() {
      let commentParams = {
        content: this.comment.content,
        doc_key: this.comment.doc_key,
        comment_key: this.comment.comment_key
      }
      api.updateComment(commentParams)
        .then(response => {
          this.isModifying = false
          this.comment.updated_at = new Date()
        })
        .catch(err => alert(err.response.data))
    },
    modifyComment() {
      this.isModifying = true
    },
    onExpandClick() {
      this.isExpanded = true
    }
  },
  created() {
    this.content = this.comment.content
  },
  data() {
    return {
      content: '',
      fullContent: '',
      shortContent: '',
      isModifying: false,
      isTooShort: false,
      isExpanded: false
    }
  }
}
</script>
<style lang="scss">
.comment-container {
  padding: 4px 40px;
  border-top: 1px solid rgb(243, 243, 243);
  &__list {
    display: flex;
    align-items: center;
    margin: 14px 0;
  }
  img {
    min-width: 35px;
    min-height: 35px;
    height: 35px!important;
    align-self: flex-start;
  }
  .content {
    margin-left: 12px;
    width: 100%;
    padding-right: 56px;
  }
  .date {
    margin-left: 6px;
    font-size: 12px;
    font-family: NotoSansCJKkr-Regular;
    line-height: 1.8;
    color: rgb(117, 117, 117);
  }
  .body {
    white-space: nowrap;
    min-width: 0;
    font-family: NotoSansCJKkr-Regular;
    padding-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  } // .body {
  // line-height: 1.5;
  // font-family: NotoSansCJKkr-Regular;
  // padding-top: 2px;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // /* 여러 줄 자르기 추가 스타일 */
  // white-space: normal;
  // max-height: 2.8em;
  // word-wrap: break-word;
  // display: -webkit-box;
  // -webkit-line-clamp: 2;
  // -webkit-box-orient: vertical;
  //   &.expanded {
  //     min-height: inherit;
  //     max-height: inherit;
  //     white-space: normal;
  //     height: inherit;
  //     word-wrap: break-word;
  //     display: -webkit-box;
  //     -webkit-line-clamp: inherit;
  //     -webkit-box-orient: vertical;
  //   }
  // }
}
</style>
