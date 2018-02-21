<template>
  <div class="rank">
    <div class="circle"><p>{{ circle }}</p></div>
    <div class="id" v-if="i">현재 {{ i }}위 <span class="span-block">{{ id | hidingEmail }}</span></div>
    <div class="item-img" :class="{ ipad: i === '2' }">
      <img :src="img">
    </div>
  </div>
</template>

<script>
import api from 'api'
import moment from 'moment'

export default {
  props: [
    'circle',
    'id',
    'img',
    'i'
  ],
  data() {
    return {
    }
  },
  components: {
  },
  methods: {
  },
  filters: {
    hidingEmail (item) {
      if (item == '정보없음') return '정보없음'
      return item.slice(0, 5) + '*****'
    }
  },
  created() {
  },
  beforeUpdate() {
  },
}
</script>
<style lang="scss">
.rank {
  padding : 308px 0 0 0 ;
  width: 50%; height : 570px ; float : left ; display : inline-block ; 
  margin: auto;
  Position : relative 
}
.rank > .circle {
  width: 168px;
  height: 168px;
  border-radius: 50%;
  background-color: #eed034;
  display: inline-block;
  font-family: NanumSquareOTFEB;
  Color : #1e245b ; font-size : 23px ; text-align : center ; line-height : 1 ; position : absolute ; top : 100px ; left : 0
; display: -webkit-box; display: -ms-inlinebox; display: -webkit-inline-box; display: inline-box; -webkit-box-pack: center; -ms-flex-pack: center; -webkit-justify-content: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center; -webkit-align-items: center; align-items: center;
}
.rank > .circle > p { display : inline-block }
.rank > .id {
  Position: absolute;
  top: 138px;
  left: 218px;
  display: inline-block;
  font-family: NanumSquareOTFEB;
  font-size: 26px;
  line-height: 46px;
  text-align: left;
  color: #fff;

  span {
    font-family: NanumSquareOTFEB;
    color: #fff;
  }
}
.rank > .item-img { text-align : center }
.rank:last-child {
  padding : 100px 0 0 0 ;
  width: 100%; float : initial ; display : inline-block ; 
  Text-align : center  
}
.rank:last-child > .circle { position : static }
.rank:last-child > .item-img { margin-top : -50px }


@media only screen and (max-width: 548px) {
  .rank {
    width: 100%;
    height: auto;
    display: block;
    padding-top: 0px;
  }
  .rank:last-child {
    padding : 308px 0 0 0 ;
    width: 100%; display : block ; 
  Text-align : left  }
  .rank:last-child > .circle { position : absolute; }
  .rank:last-child > .item-img { margin-top : 0px }
  .rank .circle {
    position: relative;
    display: block;
    width: 100px;
    height: 100px;
    margin: auto;
    p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      width: 100%;
      text-align: center;
      padding: 0 10px;
      // height: 100px;
      // line-height: 100px;
      font-size: 18px;
      font-weight: bold;
      // border-radius: 100%;
      // background-color: #eed034;
    }
  }
  .rank .id {
    position: inherit;
    top: auto;
    left: auto;
    line-height: auto;
    display: block;
    margin-top: 120px;
    text-align: center;
    
    .span-block {
      display: block;
    }
  }
  .item-img {
    margin-top: 20px;
    img {
      width: 70%;
    }

    &.ipad {
      img {
        width: 50%;
      }
    }
  }
}
</style>
