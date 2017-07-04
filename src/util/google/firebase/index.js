const media = require('./media')

/**
 * @method storage 파일 업로더
 * @description firebase 파일 업로더
 * @param {Object} file 업로드할 파일
 * @param {Object} porgress 프로그래스바를 위한 콜백
 * @version v1.0
 * @author jinhyung
 * @logs 170621 : [jinhyung] 최초생성
 *
 * @returns {Promise<string>}
 *
 * @example
 * ```
 * upload(file, progress => {
 *    console.log(`progress`% 완료)
 * })
 * .then(url => {
 *    console.log(주소 : `url`)
 * })
 * ```
 */
exports.storage = (file, progress) => {
  return new Promise((resolve, reject) => {
    media.mediaUpload(progress, file, datePath(), dateName())
    .then(snapshot => {
      let downloadUrl = snapshot.downloadURL
      resolve(downloadUrl.substring(0, downloadUrl.indexOf('token') - 1))
    })
    .catch(reject)
  })
}

let datePath = () => {
  let today = new Date()
  let path = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
  return path
}
let dateName = () => {
  let today = new Date()
  return `${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}_${today.getMilliseconds()}`
}