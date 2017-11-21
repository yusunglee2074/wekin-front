<template>
  <div id="customer">
    <div class="navbar-custom"></div>
    <div class="ui container">
      <div class="ui pointing secondary menu">
        <a class="item active" data-tab="first">공지사항</a>
        <a class="item" data-tab="second">자주묻는질문</a>
        <a class="item" data-tab="third">문의하기</a>
      </div>
      <div class="ui tab notice active" data-tab="first">
        <div class="ui styled notice accordion">
          <div class="notice-list" v-for="(notice, index) in notices" v-bind:key="index">
            <div class="title">
              <div class="ui label" v-for="category in categories" v-bind:key="category.env_key" v-bind:style="{ 'background-color': `#${category.value.color}` }"> {{category.value.name}} </div>
              <i class="angle down icon"></i>
              <div class="text">{{notice.title}}</div>
              <p class="date">{{notice.created_at | formatDate}}</p>
            </div>
            <div class="content">
              <p class="transition hidden" v-html="notice.content"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="ui tab faq" data-tab="second">
        <div class="item search-container">
          <div class="ui">
            <div class="ui icon input">
              <input class="prompt" type="text" placeholder="궁금하신 키워드를 입력하세요." v-model="keyword">
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>
        </div>
        <div class="ui pointing secondary menu child-menu">
          <a class="item" data-tab="0" @click="faqTab(0)">전체</a>
          <a class="item" :data-tab="faqCategory.env_key" v-for="faqCategory in faqCategories" v-bind:key="faqCategory.env_key" @click="faqTab(faqCategory.env_key)">{{faqCategory.value.name}}</a>
        </div>
        <div class="ui tab active" data-tab="0"></div>
        <div class="ui tab" :data-tab="faqCategory.env_key" v-for="faqCategory in faqCategories" v-bind:key="faqCategory.env_key"></div>
        <div class="ui styled faq accordion">
          <div class="notice-list" v-for="(faq, index) in filteredFaqs" v-bind:key="index">
            <div class="title">
              <i class="angle down icon"></i>
              <div class="text">{{faq.title}}</div>
            </div>
            <div class="content">
              <p class="transition hidden" v-html="faq.content"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="ui tab contact" data-tab="third">
        <form class="ui form">
          <div class="field">
            <label>이름</label>
            <input type="text" name="first-name" placeholder="이름을 입력해주세요." v-model="contact.name">
          </div>
          <div class="field">
            <label>이메일</label>
            <input type="text" name="last-name" placeholder="이메일을 입력해주세요." v-model="contact.email">
          </div>
          <div class="field">
            <label>전화번호</label>
            <input type="tel" name="last-name" placeholder="전화번호를 입력해주세요." v-model="contact.phone">
          </div>
          <div class="field">
            <label>문의내용</label>
            <textarea placeholder="문의하실 내용을 입력해주세요." v-model="contact.body"></textarea>
          </div>
        </form>
        <button class="ui primary button floated right" @click="sendEmail()">
          보내기
        </button>
        <div class="ui active inverted dimmer" v-if="isLoading">
          <div class="ui medium text loader">Loading</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from 'api'
import _ from 'lodash'
import { Validation } from 'src/util'

export default {
  name: 'customer',
  data() {
    return {
      notices: [],
      faqs: [],
      contact: {},
      isLoading: false,
      categories: [],
      faqCategories: [],
      keyword: '',
      faqTabId: 0
    }
  },
  asyncComputed: {
    filteredFaqs() {
      return this.faqs.filter((faq) => {
        if (
          this.keyword.length >= 0 &&
          faq.title.indexOf(this.keyword) >= 0 &&
          (this.faqTabId > 0 && _.includes(faq.category, this.faqTabId))
        ) {
          return faq
        }
        if (this.keyword.length >= 0 &&
          faq.title.indexOf(this.keyword) >= 0 &&
          this.faqTabId == 0) {
          return faq
        }
      })
    }
  },
  methods: {
    faqTab(tabId) {
      this.faqTabId = tabId
    },
    sendEmail() {
      if (!Validation.checkEmailValidation(this.contact.email)) {
        alert('이메일 형식을 확인해주세요.')
        return
      }
      if (this.contact.name && this.contact.email && this.contact.phone && this.contact.body) {
        let body = `
          ${this.contact.name}님의 문의 메일 입니다.<br/>
          전화번호 : ${this.contact.phone}<br/>
          내용 : ${this.contact.body}
        `
        this.isLoading = true
        api.sendEmail('wekin@wekiner.com', `${this.contact.name}님의 문의 메일 입니다.`, body)
          .then(res => {
            alert('문의 메일이 전송되었습니다.')
            window.location.href = '/customer'
          })
          .catch(err => console.error(err))
      } else {
        alert('모든 폼을 채워주세요.')
      }
    },
    afterFaqApiCalled() {
      $('.faq.accordion').accordion({
        selector: {
          trigger: '.title'
        }
      })
    },
    afterNoticeApiCalled() {
      $('.notice.accordion').accordion({
        selector: {
          trigger: '.title'
        }
      })
    },
    getFAQ() {
      api.getFaqCategory()
        .then(categories => {
          this.faqCategories = categories
        })
        .then(() => {
          api.getBoard(1)
            .then(faqs => {
              this.faqs = faqs
              this.afterFaqApiCalled()
            })
            .catch(err => console.error(err))
        }).catch(err => console.error(err))
    },
    getNotice() {
      api.getNoticeCategory()
        .then(categories => this.categories = categories)
        .then(() => {
          api.getBoard(0)
            .then(notices => {
              this.notices = notices
              this.afterNoticeApiCalled()
            })
            .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
    },
    hasCategory(notice, category) {
      return notice.category.indexOf(category) >= 0
    }
  },
  mounted() {
    $('.menu .item').tab()
    this.getNotice()
    this.getFAQ()
  }
}
</script>

<style lang="scss" scoped>
@import '../style/variables';
@import '../style/cross-browsing.scss';

.accordion {
  width: 100% !important;
  margin: 0 auto;
  text-align: left;

  .title {
    .text {
      font-size: 16px;
      padding: 8px 0;
    }
    .date {
      font-size: 12px;
    }
    .angle.down.icon {
      float: right;
      font-size: 2em;
      margin-top: 30px;
      color: black;
    }
  }
  .label {
    color: white;
    &.notice {
      background-color: $color-primary;
    }
    &.event {
      background-color: #40AC7E;
    }
  }
}

.notice.tab {
  text-align: center;
}

.info-container {
  @include flex-box();
  height: 100px;
  align-items: center;
  border-radius: 6px;
  border: 1px solid rgb(151, 151, 151);
  margin-bottom: 36px;
  .item {
    min-width: 180px;
    &:first-child {
      text-align: center;
      font-size: 18px;
    }
    &:not(:first-child) {
      border-left: 1px solid rgb(151, 151, 151);
      padding: 4px 20px;
      padding-right: 50px;
      font-size: 14px;
    }
  }
}

.info-container-mobile {
  display: none;
}

.child-menu {
  @include flex-box();
  text-align: center;
  .item {
    flex: 1;
    display: block!important;
  }
}

.ui.pagination.menu {
  margin-top: 30px!important;

  .active.item {
    background-color: $color-primary;
    color: white;
  }
}

.ui.secondary.menu {
  margin: 20px auto;
}

.faq {
  .search-container {
    .ui.input {
      width: 100%;
    }
    input {
      height: 50px;
      border: 1px solid $color-line;
    }
  }
  .ui.secondary.pointing.menu {
    border-top: 1px solid $color-primary;
    border-bottom: 1px solid $color-primary;
    .active.item {
      border-color: transparent;
    }
  }
  .angle.down.icon {
    margin-top: 8px!important;
  }
}

.contact {
  .text-box {
    text-align: left;
    margin: 0 auto;
    p {
      line-height: 1.1;
    }
  }
  .form {
    margin-top: 30px;
    font-family: NotoSansCJKkr-Medium;
    label {
      font-weight: inherit!important;
    }
    input,
    textarea {
      border: 1px solid $color-line;
    }
  }
  button {
    width: 150px;
    margin-top: 20px;
  }
}

@media only screen and (max-width: 1199px) {
  .info-container {
    display: none;
  }

  .info-container-mobile {
    display: block;
    border-radius: 6px;
    border: 1px solid rgb(151, 151, 151);
    margin-bottom: 24px;
    .item {
      padding: 8px;
      &:first-child {
        border-bottom: 1px solid;
      }
    }
  }
}
</style>
