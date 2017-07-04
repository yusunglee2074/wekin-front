<template>
  <div class="ui card">
    <div class="header">{{title}}</div>
    <slot name="content">
    </slot>
    <slot name="extra">

    </slot>
  </div>
</template>
<style lang="scss" scoped>
@import '../style/variables';
.ui.card {
  width: 100%;
  > .header {
    padding: 10px 30px;
    background: $color-primary;
    color: rgb(255, 255, 255);
    font-family: NotoSansCJKkr-Medium;
  }
  .content,  {
    border-top: none!important;
    min-height: 600px;
  }
}
</style>
<script>
  export default {
    props: [
      'title'
    ]
  }
</script>
