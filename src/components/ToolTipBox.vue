<template>
  <div class="tooltip">
    <i class="icon help circle"></i>
    <span class="tooltiptext" v-html="convertedText"></span>
  </div>
</template>

<script>
import { Storage } from 'src/util'

export default {
  props: ['text'],
  data () {
    return {
      convertedText: ''
    }
  },
  mounted () {
    let tmpArray = this.text.split('.')
    for(let i = 0; i < tmpArray.length; i++) {
      this.convertedText += tmpArray[i]
      this.convertedText += '<br>'
    }
    if (this.convertedText.slice(-4) === '<br>') {
      this.convertedText = this.convertedText.substring(0, this.convertedText.length - 4)
    }
  },
  methods: {
  }
}
</script>
<style>
.tooltip {
    position: relative;
    display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
    visibility: hidden;
    width: 590px;
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text */
    position: absolute;
    z-index: 1;
    left: 50%;
    margin-left: -60px;

    /* Fade in tooltip */
    opacity: 0;
    transition: opacity 1s;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 10%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}
</style>
