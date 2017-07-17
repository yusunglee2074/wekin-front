<template>
  <div class="card">
    <a :href="`/activity/${activityKey}`" class="image link">
      <slot name="badge">
      </slot>
      <div :style="{ 'background':'url(' + imageUrl + ') center center', 'height': 200 + 'px', 'background-size':'cover'}"></div>
    </a>
    <a :href="`/activity/${activityKey}`" class="content link" style="display: block;">
        <slot name="extra-header">
        </slot>
        <div class="titlenameaddress">
          <span class="title">{{title}}</span>
          <div class="address">{{address}}</div>
          <div class="name">Maker {{name}}</div>
        </div>
    </a>
    <slot name="extra-body" class="extra-body">
    </slot>
    <div class="extra content">
      <div class="ui star rating" :data-rating="Math.round(rating)"></div>
      <span>후기 {{reviewCount}}</span>
      <span class="right floated">
        <slot name="action-btn">
          <i class="remove bookmark icon"></i>
          <span v-if="favorite">관심 {{total || favorite.length || 0}}</span>
        </slot>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    'activityKey',
    'title',
    'address',
    'name',
    'imageUrl',
    'favorite',
    'total',
    'rating',
    'reviewCount',
  ],
  mounted() {
    $('.ui.rating')
      .rating({
        initialRating: 3,
        maxRating: 5
      })
      .rating('disable')
  }
}
</script>
<style lang="scss" scoped>
@import '../style/variables.scss';

.badge {
  position: absolute;
  width: 50px;
  height: 30px;
  border: 1px solid rgb(255, 255, 255);
  margin: 14px 19px;
  text-align: center;
  line-height: 2.2;
  font-family: NotoSansCJKkr-Medium;
  border-radius: 4px;
  background: transparent;
  color: white;
  font-size: 13px;
}

.title {
  font-family: NotoSansCJKkr-Medium;
  font-weight: 600;
  font-size: 18px;
  min-height: 2em;
  display: block;
}

.image {
  padding: 1px!important;
}

.price {
  font-family: NotoSansCJKkr-Light;
  font-size: 18px;
  padding-left: 14px;
}

.rating {
  padding: 6px 0;
}

.address {
  padding-top: 12px;
}

.address,
.name {
  font-size: 13px;
  color: rgb(27, 28, 29);
  font-family: NotoSansCJKkr-Light;
}

.extra-body {
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.2;
  height: 44px;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: rgb(27, 28, 29);
}

.bookmark.icon {
  padding: 6px 0;
}

.ui.divider {
  border-top: 1px dashed black!important;
}

.ui.buttons {
  width: 100%;
}

@media only screen and (max-width: 548px) {
  .ui.three.doubling.cards>.card {
    width: 100%!important;
  }
}
</style>
