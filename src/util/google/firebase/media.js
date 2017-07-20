const firebase = require('firebase')

exports.mediaUpload = (cb, file, path, fileName) => {
  let extension = file.name.split('.').pop()
  let storageRef = firebase.storage().ref()
  let mediaRef = storageRef.child(path)
  let spaceRef = mediaRef.child(`${fileName}.${extension}`)

  return new Promise((resolve, reject) => {
    let uploadTask = spaceRef.put(file)
    uploadTask.on('state_changed', snap => {
      cb((snap.bytesTransferred / snap.totalBytes) * 100)
    }, reject, _ => {
      resolve(uploadTask.snapshot)
    })
  })
}