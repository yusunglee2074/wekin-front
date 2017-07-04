<template>
  <div class="qna-list">
    <div class="header">
      <div class="ui basic label f1">{{qna.activity_title}}</div>
      <div class="maker">by {{qna.User.name}}</div>
      <div class="date">{{qna.create_date}}</div>
      <div class="status">{{qna.answer | qnaStatus}}</div>
    </div>
    <div class="body">{{qna.content}}</div>
    <div class="reply" v-if="qna.answer">
      <i class="icon comment color primary"></i>
      <span>
        {{qna.answer}}
      </span>
      <div v-if="isAnswerClicked" class="flex">
        <div class="ui input f1">
          <input type="text" v-model="answer">
        </div>
        <button class="ui primary button save-btn" @click="onSaveAnswerClick()">저장</button>
      </div>
      <a @click="onWriteAnswerClick()">수정하기</a>
    </div>
    <div v-else>
      <div v-if="isAnswerClicked" class="flex">
        <div class="ui input f1">
          <input type="text" v-model="answer">
        </div>
        <button class="ui primary button save-btn" @click="onSaveAnswerClick()">저장</button>
      </div>
      <a @click="onWriteAnswerClick()">답변 남기기</a>
    </div>
  </div>
</template>

<script>
import api from 'api'

export default {
  props: [
    'qna'
  ],
  data() {
    return {
      answer: '',
      isAnswerClicked: false
    }
  },
  filters: {
    qnaStatus(answer) {
      if (answer) {
        return "답변완료"
      }
      return "처리중"
    }
  },
  methods: {
    onWriteAnswerClick() {
      this.isAnswerClicked = true
    },
    onSaveAnswerClick() {
      if (this.answer.length > 0) {
        api.updateAnswer(this.qna.doc_key, this.answer)
          .then((result) => {
            if (result == 1) {
              this.qna.answer = this.answer
              this.isAnswerClicked = false
            }
          })
          .catch((error) => console.error(error))
      } else {
        alert("답변을 입력해주세요.")
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../style/variables.scss';
@import '../../style/typography.scss';
@import '../../style/cross-browsing.scss';
.qna-list {
  border-top: 1px solid $color-line;
  padding: 20px 24px;
  &:last-child {
    border-bottom: 1px solid $color-line;
  }
  .header {
    @include flex-box();
    align-items: center;
    .ui.basic.label {
      font-weight: 400;
    }
    div {
      margin-right: 20px;
    }
  }
  .body {
    font-size: 16px;
    padding: 10px 0 20px;
  }
  a {
    text-decoration: underline;
    display: block;
    color: rgb(117, 117, 117);
  }
  .reply a {
    padding-top: 12px;
    padding-left: 22px;
  }
  .save-btn {
    margin-left: 12px;
  }
}


@media only screen and (max-width: 991px) {
  .qna-list {
    padding: 20px 0px;
    .header {
      font-size: 12px;
      div {
        margin-right: 8px;
      }
    }
    .body {
      font-size: 14px;
      padding: 10px 0 20px;
    }
  }
}
</style>
