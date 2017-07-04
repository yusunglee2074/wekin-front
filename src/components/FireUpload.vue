<template>
  <div class="fireUpload">
    <input type="file" v-on:change="fireStorage" accept="image/*"></input>
  </div>
</template>

<script>
/**
 *  <FireUpload :imageUrl="myValue" @update:imageUrl="val => myValue = val" @progress="myEvent"></FireUpload>
 */
import { Storage } from 'src/util'

export default {
  props: ['imageUrl'],
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
          this.$emit('progress', progress / 5)
        }
      )
    }
  }
}
</script>
