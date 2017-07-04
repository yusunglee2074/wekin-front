<template>
  <div class="ui segment unboxing review-list" v-if="review">
    <div class="image-light-box" v-if="isShowingLightBox">
      <i class="icon close" @click="hideImageLightBox()"></i>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="image in review.image_url" :style="`background-image:url(${image.replace('730','')})`">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <router-link :to="`/users/${review.User.user_key}/`" tag="img" class="ui top aligned image circular profile" :src="review.User.profile_image"></router-link>
    <div class="info">
      <span>{{review.User.name}}</span>
      <span class="wekinTitle">{{review.activity_title | cuttingText}}</span>
      <p style="margin-top:4px">{{review.created_at | formatDate}}</p>
    </div>
    <div class="ui star top right rating" :data-rating="review.activity_rating"></div>
    <div class="content">
      <p>{{review.content}}</p>
      <div class="ui images" v-if="review.image_url">
        <a class="link" v-for="(image, index) in review.image_url" v-if="index < MAX_IMAGE_COUNT" @click="showImageLightBox()">
          <img :src="image" v-if="!(review.image_url.length > MAX_IMAGE_COUNT && index == 3)">
        </a>
        <a class="link image-cover" v-if="review.image_url.length > MAX_IMAGE_COUNT" @click="showImageLightBox()">
          <img :src="review.image_url[MAX_IMAGE_COUNT]">
          <div class="more-img">
            <div class="table">
              <div class="table-cell">+{{review.image_url.length - MAX_IMAGE_COUNT}}</div>
            </div>
          </div>
        </a>
      </div>
    </div>
    <slot name="buttons"></slot>
    <div class="ui divider"></div>
  </div>
</template>
<script>
import api from 'api'
import { Text } from 'src/util'

export default {
  props: {
    review: {
      images: [],
      User: {
        name: ''
      }
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
  data() {
    return {
      MAX_IMAGE_COUNT: 5,
      imageLightBox: null,
      isShowingLightBox: false,
    }
  },
  methods: {
    loadImages(imageKeys) {
      if (imageKeys != null) {
        api.getImagesFromKey(imageKeys)
          .then(images => this.images = images)
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
  },
  mounted() {
    if (this.review.images !== null) {
      this.loadImages(this.review.images)
    }
    $('.ui.rating').rating({ maxRating: 5 }).rating('disable')
  }
}
</script>

<style lang="scss" scoped>
$feed-width: 690px;

// 이미지 슬라이드 라이트박스 TODO: Component로 만들어두기
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

.ui.card .content,
.ui.cards>.card .content {
  border-top: none!important;
}

.review-list {
  display: inline-block;
  text-align: left; // padding: 15px 30px;
  margin: 0;
  width: 100%;

  .profile {
    width: 50px;
    height: 50px;
  }
  .info {
    display: inline-block; // width: 150px;
    padding: 6px 12px;
  }
  .content {
    margin-top: 20px;
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
  .like {
    margin-left: 38px;
  }

  .rating {
    float: right; // margin-top: 16px;
  }

  .images .image-cover {
    position: absolute;
  }
  .divider {
    margin-top: 15px;
    margin-bottom: 0;
  }
  .buttons {
    padding: 20px 0;
  }
}

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

.feed-e {
  width: $feed-width;
  height: 118px;
}

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
  }
  .table-cell {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
}

.feed-menu {
  vertical-align: top;
}

.card {
  width: $feed-width;
}

.info span.wekinTitle {
  background: none #fff;
  font-size: .85714286rem;
  -webkit-border-radius: .28571429rem;
  -moz-border-radius: .28571429rem;
  border-radius: .28571429rem;
  border: 1px solid rgba(34, 36, 38, .15);
  color: rgba(0, 0, 0, .87);
  box-shadow: none;
  padding: 3px 5px;
  margin-left: 10px;
}
</style>
