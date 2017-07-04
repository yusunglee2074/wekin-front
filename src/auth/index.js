import api from 'api'
import firebase from 'firebase'

export default {
  /**
   * 가입하기
   * 폼에서 유저 정보를 넘겨 받는다.
   * 성공시 유저 정보를 반환한다.
   * 이메일 인증 메일도 함께 전송한다.
   * @param {user} user
   */
  signUp (email, password, userName) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(currentUser => {
        currentUser.sendEmailVerification()
        currentUser.getIdToken().then(token => {
          return api.signUp(token, userName)
        })
      })
  },
  /**
   * 폼에서 유저 정보를 넘겨 받는다.
   *
   * @param {user} user
   */
  signIn (email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(currentUser => {
        currentUser.getIdToken().then(token => {
          localStorage.setItem('accessToken', token)
        })
        return currentUser
      })
  },
  signOut () {
    return firebase.auth().signOut()
  },
  sendPhoneVerification (phoneNumber) {
    return api.sendPhoneVerification(phoneNumber)
  },
  verifySmsCode (phoneNumber, verifySmsCode) {
    return api.verifySmsCode(phoneNumber, verifySmsCode)
  },
  sendVerifyEmail () {
    let currentUser = firebase.auth().currentUser
    return currentUser.sendEmailVerification()
  },
  sendPasswordResetEmail (email) {
    return firebase.auth().sendPasswordResetEmail(email)
  },
  updatePassword (email, oldPassword, newPassword) {
    let currentUser = firebase.auth().currentUser
    let credential = firebase.auth.EmailAuthProvider.credential(email, oldPassword)
    return new Promise((resolve, reject) => {
      currentUser.reauthenticateWithCredential(credential)
        .then(result => {
          return firebase.auth().currentUser.updatePassword(newPassword)
            .then(result => resolve(result))
            .catch(error => reject(error))
        }).catch(error => reject(error))
    })
  },
  deleteUser (email, password) {
    let currentUser = firebase.auth().currentUser
    let credential = firebase.auth.EmailAuthProvider.credential(email, password)
    return new Promise((resolve, reject) => {
      currentUser.reauthenticateWithCredential(credential)
        .then(result => {
          return firebase.auth().currentUser.delete()
            .then(result => resolve(result))
            .catch(error => reject(error))
        }).catch(error => reject(error))
    })
  },
  /**
   * 현재 유저를 가져와 반환한다.
   * @return {user} user
   */
  getCurrentUser () {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then(token => {
            localStorage.setItem('accessToken', token)
            api.getUser()
              .then(result => {
                resolve(result)
              })
          })
        } else {
          reject()
        }
      })
    })
  },
  loginWithFacebook () {
    let provider = new firebase.auth.FacebookAuthProvider()
    provider.addScope('email')
    provider.addScope('user_birthday')
    return firebase.auth().signInWithPopup(provider)
      .then(credential => {
        return credential.user.getIdToken().then(token => {
          return api.signUp(token, credential.user.displayName, credential.user.photoURL)
            .then(currentUser => currentUser)
            .catch(() => credential.user)
        })
      })
  },
  loginWithGoogle () {
    let provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/plus.login')
    return firebase.auth().signInWithPopup(provider)
      .then(credential => {
        return credential.user.getIdToken().then(token => {
          return api.signUp(token, credential.additionalUserInfo.name, credential.additionalUserInfo.picture)
            .then(currentUser => currentUser)
            .catch(() => credential.user)
        })
      })
  },
  loginWithNaver () {
    firebase.auth().signInWithCustomToken(`eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsibmFtZSI6IuydtOqwleyCsCIsImVtYWlsIjoibGVla25zQG5hdmVyLmNvbSIsInByb2ZpbGVfaW1hZ2UiOiJodHRwOi8vbXVkLWthZ2Uua2FrYW8uY28ua3IvMTQvZG4vYnRxZ01HeVZYSjIvc1Z5QVZNYVNub203d2NyazNQaks1MS9vLmpwZyJ9LCJ1aWQiOiJ3ZWtpbl80NTEyMzE0NTciLCJpYXQiOjE0OTgwMzU1NDcsImV4cCI6MTQ5ODAzOTE0NywiYXVkIjoiaHR0cHM6Ly9pZGVudGl0eXRvb2xraXQuZ29vZ2xlYXBpcy5jb20vZ29vZ2xlLmlkZW50aXR5LmlkZW50aXR5dG9vbGtpdC52MS5JZGVudGl0eVRvb2xraXQiLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay14MHUzdUB3ZWtpbi05MTExZC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLXgwdTN1QHdla2luLTkxMTFkLmlhbS5nc2VydmljZWFjY291bnQuY29tIn0.A73UjpL_XbTahBC-U5_XnSsk7SbIRj5xWdzy9pXpekJ3eEjWLlwtqPNC9-OUlgtyQ9hOI8A94ggBOBEt__qsGxksYb3lhVNlhUSFY-PlMQMPabrIRiYAOoKOHr9X8ZLmCFG_GsNF75s43WLxf75f8psIqA2l-uGTaSe3i5vAKet-KiQzx2U4m_BcHi5Tg7TppkvtvOdYccE2dDabCyso-4bcREtIy7YaBTPHmCZEP1ZjSNXh5w5BU_nFSwGSSA0WXsBS_UzoMfaJ-sYGd4r51fqCgmAlGazWYGEtl7UpmnbBJRGU-p1OPAXHx-m3gOJU-9wV0kMuMuRZhmmt67V5og`).then((res) => console.log('token', res)).catch(error => console.error(error))
  },
  loginWithKakao () {
    return new Promise((resolve, reject) => {
      Kakao.Auth.login({
        success: (credential) => {
          api.createCustomToken(credential.access_token)
            .then(customToken => {
              firebase.auth().signInWithCustomToken(customToken).then(credential => {
                credential.getIdToken().then(token => {
                  api.signUpWithToken(token)
                    .then(currentUser => resolve(currentUser))
                    .catch(() => credential.user)
                })
              }).catch(() => credential.user)
            })
        },
        fail: (err) => reject(err)
      })
    })
  }
}
