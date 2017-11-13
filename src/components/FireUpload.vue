<template>
    <div class="ui positive basic button fileUpload">
      <img :src="`./../../static/icon/${icon}`">{{ title }}
      <input class="upload" type="file" v-on:change="fireStorage" accept="image/*" multiple></input>
    </div>
</template>

<script>
/**
 *  <FireUpload :imageUrl="myValue" @update:imageUrl="val => myValue = val" @progress="myEvent"></FireUpload>
 */
import { Storage } from 'src/util'
import firebase from 'firebase'

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
    fireStorage (e) {
      let self = this
      let files = e.target.files
      for (let i = 0; i < files.length; i++) {
        let file = files[i]
        let tempRef = firebase.storage().ref()
        let imagePath = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + new Date().getSeconds() + new Date().getMilliseconds()
        let imageRef = tempRef.child('img/image/' + imagePath)
        let uploadTask = imageRef.put(file)
        uploadTask.on('state_changed', function(snapshot){
        }, function(error) {
        }, function() {
          var downloadURL = uploadTask.snapshot.downloadURL
          self.$emit('update:imageUrl', downloadURL + '?alt=media')
          }
        )
      }
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
