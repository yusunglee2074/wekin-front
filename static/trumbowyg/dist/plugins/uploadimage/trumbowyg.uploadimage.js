/* ===========================================================
 * trumbowyg.upload.js v1.2
 * Upload plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Alexandre Demode (Alex-D)
 *          Twitter : @AlexandreDemode
 *          Website : alex-d.fr
 * Mod by : Aleksandr-ru
 *          Twitter : @Aleksandr_ru
 *          Website : aleksandr.ru
 */

(function ($) {
  'use strict'

  var defaultOptions = {
    fileFieldName: 'fileToUpload',
    data: [],                       // Additional data for ajax [{name: 'key', value: 'value'}]
    event: undefined
  }

  function getDeep (object, propertyParts) {
    var mainProperty = propertyParts.shift(),
      otherProperties = propertyParts

    if (object !== null) {
      if (otherProperties.length === 0) {
        return object[mainProperty]
      }

      if (typeof object === 'object') {
        return getDeep(object[mainProperty], otherProperties)
      }
    }
    return object
  }

  addXhrProgressEvent()

  $.extend(true, $.trumbowyg, {
    langs: {
            // jshint camelcase:false
      ko: {
        upload: 'Upload',
        file: 'File',
        uploadError: 'Error'
      },
    },
        // jshint camelcase:true

    plugins: {
      upload: {
        init: function (trumbowyg) {
          trumbowyg.o.plugins.uploadimage = $.extend(true, {}, defaultOptions, trumbowyg.o.plugins.uploadimage || {})
          var btnDef = {
            fn: function () {
              trumbowyg.saveRange()

              var file,
                prefix = trumbowyg.o.prefix

              var $modal = trumbowyg.openModalInsert(
                                // Title
                                trumbowyg.lang.upload,

                                // Fields
                {
                  file: {
                    type: 'file',
                    required: true,
                    attributes: {
                      accept: 'image/*'
                    }
                  },
                  alt: {
                    label: 'description',
                    value: trumbowyg.getRangeText()
                  }
                },

                                // Callback
                                function (values) {
                                  var data = new FormData()
                                  data.append(trumbowyg.o.plugins.uploadimage.fileFieldName, file)
                                  trumbowyg.o.plugins.uploadimage.event(file, trumbowyg)

                                  trumbowyg.o.plugins.uploadimage.data.map(function (cur) {
                                    data.append(cur.name, cur.value)
                                  })

                                  if ($('.' + prefix + 'progress', $modal).length === 0) {
                                    $('.' + prefix + 'modal-title', $modal)
                                            .after(
                                                $('<div/>', {
                                                  'class': prefix + 'progress'
                                                }).append(
                                                    $('<div/>', {
                                                      'class': prefix + 'progress-bar'
                                                    })
                                                )
                                            )
                                  }
                                }
                            )

              $('input[type=file]').on('change', function (e) {
                try {
                                    // If multiple files allowed, we just get the first.
                  file = e.target.files[0]
                } catch (err) {
                                    // In IE8, multiple files not allowed
                  file = e.target.value
                }
              })
            }
          }

          trumbowyg.addBtnDef('upload', btnDef)
        }
      }
    }
  })

  function addXhrProgressEvent () {
    if (!$.trumbowyg && !$.trumbowyg.addedXhrProgressEvent) {   // Avoid adding progress event multiple times
      var originalXhr = $.ajaxSettings.xhr
      $.ajaxSetup({
        xhr: function () {
          var req = originalXhr(),
            that = this
          if (req && typeof req.upload === 'object' && that.progressUpload !== undefined) {
            req.upload.addEventListener('progress', function (e) {
              that.progressUpload(e)
            }, false)
          }

          return req
        }
      })
      $.trumbowyg.addedXhrProgressEvent = true
    }
  }
})(jQuery)