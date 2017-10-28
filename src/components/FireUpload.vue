<template>
    <div class="ui positive basic button fileUpload">
      <span><img :src="`./../../static/icon/${icon}`">{{ title }}</span>
      <input class="upload" type="file" v-on:change="fireStorage" accept="image/*"></input>
    </div>
</template>

<script>
/**
 *  <FireUpload :imageUrl="myValue" @update:imageUrl="val => myValue = val" @progress="myEvent"></FireUpload>
 */
import { Storage } from 'src/util'

export default {
  props: ['imageUrl', 'title', 'icon'],
  data () {
    return {
      item: ''
    }
  },
  mounted () {
  },
  methods: {
    fireStorage (event) {
      let file = event.target.files[0]
      Storage.imageUpload(file,
        (task) => {
          let url = task.snapshot.downloadURL
          let tmp = url.substring(0, url.indexOf('token') - 1)
          this.$emit('update:imageUrl', tmp)
        },
        (progress) => {
          this.$emit('prog', progress / 5)
        }
      )
    }
  }
}
</script>
<style>
.fileUpload {
    position: relative;
    overflow: hidden;
    margin: 10px;
}
.fileUpload input.upload {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);
}

</style>
