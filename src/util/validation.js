module.exports.checkEmailValidation = (email) => {
  let regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
  if (regex.test(email) === false) {
    return false
  }
  return true
}
