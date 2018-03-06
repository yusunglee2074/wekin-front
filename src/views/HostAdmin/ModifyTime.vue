<template>
</template>
<script>
import FireUpload from 'components/FireUpload.vue'
import api from 'api'
import auth from './../../auth'
import moment from 'moment'
import {Storage} from 'src/util'
import Datepicker from 'vuejs-datepicker'

export default {
  data() {
    return {
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  components: {
    Datepicker
  },
  methods: {
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>
