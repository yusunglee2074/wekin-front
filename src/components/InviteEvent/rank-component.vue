<template>
  <div class="rank" style="background-color:#202345;">
    <div class="circle">
      <span>{{ circle }}</span>
    </div>
    <div class="id">
      <span>{{ id }}</span>
    </div>
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
  padding: 10px;
}
.circle {
  width: 168px;
  height: 168px;
  border-radius: 50%;
  background-color: #eed034;
  padding: 70px 38px;
  display: inline-block;
}
.circle span {
  text-align: center;
  width: 101px;
  height: 32px;
  font-family: NanumSquareOTFEB;
  font-size: 28px;
  line-height: 1.14;
  text-align: left;
  color: #1e245b;
}
.id {
  display: inline-block;
  font-family: NanumSquareOTFEB;
  font-size: 26px;
  line-height: 1.23;
  text-align: left;
  color: #ffffff;
}
.id span {
  color: white;
}
@media only screen and (max-width: 548px) {
  .circle {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    background-color: #eed034;
    padding: 35px 19px;
    display: inline-block;
  }
  .circle span {
    text-align: center;
    width: 50px;
    height: 16px;
    font-family: NanumSquareOTFEB;
    font-size: 14px;
    line-height: 8px;
    text-align: left;
    color: #1e245b;
  }
  .id {
    display: inline-block;
    font-family: NanumSquareOTFEB;
    font-size: 13px;
    line-height: 8px;
    text-align: left;
    color: #ffffff;
  }
  .id span {
    color: white;
  }
}
</style>
