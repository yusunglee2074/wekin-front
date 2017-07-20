
<template>
  <div>
    <div class="navbar-custom"></div>  
    <filter-component></filter-component>
  </div>
</template>
<script>
import filterComponent from 'components/Activity/FilterComponent.vue'

export default {
  components: {
    filterComponent,
  }
}
</script>
<style lang="scss" scoped>
.navbar-custom {
  margin-bottom: 0;
}

.filter {
  z-index: 9999;
  position: absolute;
  top: 0;
}
</style>
