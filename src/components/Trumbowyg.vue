<template>
  <div id="trumbowyg-editor" style="min-height:450px"></div>
</template>

<style>
  @import '../../static/trumbowyg/dist/ui/trumbowyg.min.css';
</style>

<script>
import fireHelper from '../util/google/firebase/storage'

export default {
  mounted () {
    window.jQuery.trumbowyg.svgPath = '../../static/trumbowyg/dist/ui/trumbowyg_icons.svg'
    window.jQuery('#trumbowyg-editor').trumbowyg({
      lang: this.language,
      btnsDef: {
        align: {
          dropdown: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
          ico: 'justifyLeft'
        },
        image: {
          dropdown: ['insertImage', 'upload', 'base64', 'noembed'],
          ico: 'insertImage'
        }
      },
      plugins: {
        // Add imagur parameters to upload plugin
        uploadimage: {
          event: this.mylog
        }
      },
      btns: ['viewHTML', ['formatting'], ['btnGrp-test'], ['align'],
        ['btnGrp-lists'], ['image'], ['preformatted'], 'fullscreen']
    })
      .on('tbwchange', this.onChange)
    window.jQuery('#trumbowyg-editor').trumbowyg('html', this.content)
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'ko'
    }
  },
  methods: {
    mylog (e, trumbowyg) {
      fireHelper.imageUpload(e, task => {
        let url = task.snapshot.downloadURL
        let img = url.substring(0, url.indexOf('token') - 1)
        trumbowyg.execCmd('insertImage', img)
        trumbowyg.closeModal()
      }, prg => {})
    },
    onChange () {
      const content = window.jQuery('#trumbowyg-editor').trumbowyg('html')
      this.$emit('tbwchange', content)
    }
  }
}
</script>
