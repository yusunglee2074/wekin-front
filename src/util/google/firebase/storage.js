const firebase = require('firebase')

exports.imageUploadOne = (file, callback) => {
  let dPath = datePath()
  let path = `images/test/${dPath}.png`

  fireUpload(file, path, (snap) => {
    callback(snap.snapshot.downloadURL)
  }, null)
}
exports.imageUpload = (file, paramCallback, progressCallback) => {
  let dPath = datePath()
  let path = `img/image/${dPath}.png`
  let tPath = 'img/image300/' + dPath + '.png'
  let tPath730 = 'img/image730/' + dPath + '.png'
  let tPath240 = 'img/image240/' + dPath + '.png'
  let tPath130 = 'img/image130/' + dPath + '.png'
  var percent = 0

  fireUpload(file, path, null, (snap) => {
    let progress = (snap.bytesTransferred / snap.totalBytes) * 100
    percent = percent + progress
    progressCallback(percent)
  })
  makeThumbNailImage(file, tPath730, 730, (callback2) => {
    paramCallback(callback2)
  }
  , (snap) => {
    let progress = (snap.bytesTransferred / snap.totalBytes) * 100
    percent = percent + progress
    progressCallback(percent)
  })

  makeThumbNailImage(file, tPath240, 240, null, (snap) => {
    let progress = (snap.bytesTransferred / snap.totalBytes) * 100
    percent = percent + progress
    progressCallback(percent)
  })
  makeThumbNailImage(file, tPath130, 130, null, (snap) => {
    let progress = (snap.bytesTransferred / snap.totalBytes) * 100
    percent = percent + progress
    progressCallback(percent)
  })
  makeThumbNailImage(file, tPath, 300, null, (snap) => {
    let progress = (snap.bytesTransferred / snap.totalBytes) * 100
    percent = percent + progress
    progressCallback(percent)
  })
}

function datePath () {
  let today = new Date()
  return today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getSeconds() + today.getMilliseconds()
}
function fireUpload (file, paramPath, callback, progressCallback) {
  let storageRef = firebase.storage().ref()
  let imageRef = storageRef.child(paramPath)
  let uploadTask = imageRef.put(file)

  uploadTask.on('state_changed', (snap) => {
        // let bodyProgress = document.getElementsByClassName('nprogress');
        // bodyProgress.className = 'progress';

        // let progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');

    typeof progressCallback === 'function' && progressCallback(snap)
  }, (err) => {
    if (err) {}
  }, () => {
        // 옵셔널
    typeof callback === 'function' && callback(uploadTask)
  })
}
/* global FileReader */
/* global Image */
/* global atob */
/* global Blob */
function makeThumbNailImage (file, path, widthSize, callback, progressCallback) {
  let reader = new FileReader()

  reader.readAsDataURL(file)

  reader.onload = function (e) {
    let thumbImage = new Image()
    thumbImage.src = reader.result
    thumbImage.onload = function (ev) {
      let canvas = document.createElement('canvas')
      let canvasContext = canvas.getContext('2d')

      let height = (thumbImage.height * widthSize) / thumbImage.width
      canvas.width = widthSize
      canvas.height = height
      canvasContext.drawImage(thumbImage, 0, 0, widthSize, height)

      let dataURL = canvas.toDataURL('image/jpeg', 0.5)
      let blob = dataURItoBlob(dataURL)

      fireUpload(blob, path, function (uploadTask) {
        // let dUrl = uploadTask.snapshot.downloadURL
        typeof callback === 'function' && callback(uploadTask)
      }, progressCallback)
    }
  }
}
function dataURItoBlob (dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString
  if (dataURI.split(',')[0].indexOf('base64') >= 0) { byteString = atob(dataURI.split(',')[1]) } else { byteString = unescape(dataURI.split(',')[1]) }

        // separate out the mime component
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to a typed array
  let ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ia], {type: mimeString})
}
