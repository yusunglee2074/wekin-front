<template>
  <div class="ui vertical footer segment form-page">
    <div class="ui divider"></div>
    <div class="ui container">
      <div class="ui grid">
        <div class="computer only column row">
          <div class="ui horizontal small link list">
            <router-link to="/about" class="item">위킨소개</router-link>
            <router-link to="/policy/term" class="item">이용약관</router-link>
            <router-link to="/policy/privacy" class="item">개인정보취급방침</router-link>
            <router-link to="/customer" class="item">고객센터</router-link>
          </div>
        </div>
        <div class="mobile-bar">
          <div class="ui horizontal small link list">
            <router-link to="/about" class="item">위킨소개</router-link>
            <router-link to="/policy/term" class="item">이용약관</router-link>
            <router-link to="/policy/privacy" class="item">개인정보취급방침</router-link>
            <router-link to="/customer" class="item">고객센터</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="ui container">
      <div class="text-container">
        <div>
          <div class="ui horizontal small divided company-info list pc">
            <span class="item">(주)위키너</span>
            <span class="item">대표이사 : 강동완 </span>
            <span class="item">사업자등록번호 : 549-88-00686</span>
            <span class="item">통신판매업신고 : 2017-화성동부-0227</span>
          </div>
          <div class="ui horizontal small divided company-info list pc">
            <span class="item">경기도 화성시 지산2길 25, 201호</span>
            <span class="item">고객센터 : 010-5108-2668</span>
            <span class="item">사업/서비스 제휴 문의 : wekiner@wekiner.com</span>
          </div>
          <div class="ui horizontal small company-info">
            <span class="item">©2017 All Rights Reserved</span>
          </div>
          <div class="social-container">
            <a href="http://facebook.com/Wekin-1369310116471093">
              <img id="icon" src="/static/images/facebook_icon.png">
            </a>
            <a href="http://pf.kakao.com/_xmQxjZxl">
              <img id="icon" src="/static/images/kakao_icon.png">
            </a>
            <a href="http://instagram.com/wekin_kr">
              <img id="icon" src="/static/images/insta_icon.png">
            </a>
            <a href="http://blog.naver.com/wekiner">
              <img id="icon" src="/static/images/blog_icon.png">
            </a>
            <a href="http://post.naver.com/wekiner">
              <img id="icon" src="/static/images/post_icon.png">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {

  }
}

</script>

<style lang="scss" scoped>
.footer {
  padding: 5em 1em!important;
  .ui.container {
    max-width: 900px!important;
    text-align: left;
  }
  .computer.column.row {
    margin-left: 14px;
  }
  .link a,
  .item {
    color: #595959!important;
  }

  .company-info {
    margin-bottom: 0;
    line-height: 2.1;
    &:first-child {
      margin-top: 16px;
    }
    &:not(:first-child) {
      margin-top: 0px;
    }
  }

  .social-container {
    font-size: 24px;
    float: right;
    margin-top: -74px;
    margin-right: 20px;
  }

  .mobile-bar {
    display: none;
  }
  img {
    &#icon {
      max-width: 28px;
    }
  }
}

@media only screen and (max-width: 991px) {
  .pc {
    display: none!important;
  }
  .footer {
    padding-bottom: 76px!important;

    .ui.container {
      margin-top: 22px;
    }
    .mobile-bar {
      display: inherit;
      .ui.horizontal.small.link.list {
        font-size: 0;
        a {
          font-size: 13px!important
        }
      }
    }

    .social-container {
      font-size: 24px;
      margin-top: -24px;
      position: absolute;
      right: 0;
    }
  }
  .text-container {
    display: flex;
    align-items: center;
  }
}
</style>
