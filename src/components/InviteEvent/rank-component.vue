<template>
  <div class="rank">
    <div class="circle"><span>{{ circle }}</span></div>
      <div class="id" v-if="i">현재 {{ i }}위 <br> {{ id }}</div>
      <div class="item-img">
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
  },
  created() {
  },
  beforeUpdate() {
  },
}
</script>
<style>
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
.rank > .circle > span { display : inline-block }
.rank > .id {
  Position : absolute ; top : 138px ; left : 218px ;
  display: inline-block;
  font-family: NanumSquareOTFEB;
  font-size: 26px;
  line-height: 46px;
  text-align: left;
  color: #ffffff;
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
  .rank {  width: 100%; height : auto ; display: block }
  .rank:last-child {
    padding : 308px 0 0 0 ;
    width: 100%; display : block ; 
  Text-align : left  }
  .rank:last-child > .circle { position : absolute }
  .rank:last-child > .item-img { margin-top : 0px }
}
</style>
