<template>
    <div class="ui positive basic button fileUpload">
      {{ title }}
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
      var imagePath = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + new Date().getSeconds() + new Date().getMilliseconds()
      for (let i = 0; i < files.length; i++) {
        (function(i) {
          setTimeout(function() { 
            let file = files[i]
            let tempRef = firebase.storage().ref()
            let imageRef = tempRef.child('img/image/' + imagePath)
            let uploadTask = imageRef.put(file)
            uploadTask.on('state_changed', function(snapshot){
            }, function(error) {
            }, function() {
              var downloadURL = uploadTask.snapshot.downloadURL
              self.$emit('update:imageUrl', downloadURL + '?alt=media')
            }
            )
          }, 100 * i);
        })(i);
        /* FIXME: 썸네일을 프론트에서 만들면 앱에서 만드는 이미지들은 썸네일이 만들어지지 않는다.
        (function(i) {
          setTimeout(function() { 
            let file = files[i]
            let tempRef = firebase.storage().ref()
            let imageRef = tempRef.child('img/imageThumbnail/' + imagePath)
            let uploadTask = imageRef.put(file)
          }, 100 * i);
        })(i)
        */
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
