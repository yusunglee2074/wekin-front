module.exports.getBytes = (str) => {
  var strLength = 0
  let i = 0
  for (; i < str.length; i++) {
    var code = str.charCodeAt(i)
    var ch = str.substr(i, 1).toUpperCase()

    code = parseInt(code)

    if ((ch < '0' || ch > '9') && (ch < 'A' || ch > 'Z') && ((code > 255) || (code < 0))) { strLength = strLength + 2 } else { strLength = strLength + 1 }
  }
  return strLength
}