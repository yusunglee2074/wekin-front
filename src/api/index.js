import axios from 'axios'
// import auth from 'src/auth'

// const bucketsUrl = 'api/v1'
// const postsUrl = 'https://kangsweb.firebaseio.com/posts'
// const baseUrl = 'https://us-central1-kangsweb.cloudfunctions.net/'
const baseUrl = 'http://192.168.0.5:8080/api/v1'
const TEST_API_URL = 'https://wekin-api-prod-dot-wekinproject.appspot.com/v1'
// const TEST_API_URL = 'https://wekin-api-dev-dot-wekinproject.appspot.com/v1'
// const TEST_API_URL = 'http://192.168.0.9:8888/v1'
// const TEST_API_URL = 'http://api.artism.co.kr:9999/v1'
const GEO_API_KEY = 'AIzaSyARPCWOhPLlFgDvqXbKb5RLA4rnVAcGbZ0'

const BOARD_TYPE_NOTICE = 0
// const Cache = {
//   get: (key) => {
//     if (!window.sessionStorage) return false
//     return JSON.parse(window.sessionStorage.getItem(key))
//   },
//   set: (key, data) => {
//     if (!window.sessionStorage) return false
//     window.sessionStorage.setItem(key, JSON.stringify(data))
//     return true
//   },
//   has: (key) => {
//     return Boolean(window.sessionStorage && window.sessionStorage.hasOwnProperty(key))
//   }
// }
const http = axios.create({
  baseURL: baseUrl
})
// const httpTest = axios.create({
//   baseURL: testApiUrl
// })
// httpTest.defaults.headers.common = {}

// if (typeof window !== 'undefined') {
//   let token = localStorage.getItem('accessToken')
//   if (token) {
//     http.defaults.headers.common['x-access-token'] = localStorage.getItem('accessToken')
//   }
// }

http.interceptors.request.use((config) => {
  config.headers.common['x-access-token'] = localStorage.getItem('accessToken')
  return Promise.resolve(config)
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.request.use((config) => {
  config.headers.common['x-access-token'] = localStorage.getItem('accessToken')
  return Promise.resolve(config)
}, (error) => {
  return Promise.reject(error)
})

export default {
  getUser () {
    return http.get('user/verify')
      .then(res => res.data)
  },
  getAllWekins () {
    return http.get('wekin')
      .then(res => res.data)
  },
  getActivities () {
    return http.get('activity')
      .then(res => res.data)
  },
  getActivity (activityKey) {
    return http.get(`activity/${activityKey}`)
      .then(res => res.data)
  },
  getAdminActivity (activityKey) {
    return http.get(`admin/activity/${activityKey}`)
      .then(res => res.data)
  },
  getAdminWekin (activityKey) {
    return http.get(`admin/activity/${activityKey}/wekin`)
          .then(res => res.data)
  },
  getAdminBookings (hostKey) {
    return http.get(`admin/host/${hostKey}/wekin`)
      .then(res => res.data)
  },
  getWekins (activityKey) {
    return http.get(`activity/${activityKey}/wekin`)
      .then(res => res.data)
  },
  searchActivity (keyword) {
    return http.get(`activity`, {
      params: {
        keyword: keyword
      }
    })
      .then(res => res.data)
  },
  searchHash (keyword) {
    return http.get(`doc/search`, {
      params: {
        hash: keyword
      }
    })
      .then(res => res.data)
  },
  getAttendWekiners (wekinKey) {
    return http.get(`/activity/wekin/${wekinKey}/wekiner`)
      .then(res => res.data)
  },
  getMakers () {
    return http.get('host')
      .then(res => res.data)
  },
  getMaker (hostKey) {
    return http.get(`host/${hostKey}`)
      .then(res => res.data)
  },
  getMakerFeed (hostKey) {
    return http.get(`host/${hostKey}/feed`)
      .then(res => res.data)
  },
  getMakerReservation (hostKey) {
    return http.get(`host/${hostKey}/reservation`)
      .then(res => res.data)
  },
  getMakerRatings (hostKey) {
    return http.get(`host/${hostKey}/rating`)
      .then(res => res.data)
  },
  getMakerActivities (hostKey) {
    return http.get(`host/${hostKey}/activity`)
      .then(res => res.data)
  },
  getMakerReviews (hostKey) {
    return http.get(`host/${hostKey}/review`)
      .then(res => res.data)
  },
  getMakerQnAs (hostKey, page, size) {
    return http.get(`host/${hostKey}/qna`, {
      params: {
        page: page,
        size: size
      }
    })
      .then(res => res.data)
  },
  updateAnswer (docKey, answer) {
    return http.put(`host/qna/${docKey}`, {
      answer: answer
    }).then(res => res.data)
  },
  getUserActivities (userKey) {
    return http.get(`user/${userKey}/activity`)
      .then(res => res.data)
  },
  getUserQnAs (userKey) {
    return http.get(`user/${userKey}/qna`)
      .then(res => res.data)
  },
  // getPopularFeed () {
  //   return http.get('doc/popular')
  //     .then(res => res.data)
  // },
  getReviews (activityKey, page, size) {
    return http.get(`doc`, {
      params: {
        type: 1,
        activity_key: activityKey,
        page: page,
        size: size
      }
    })
      .then(res => res.data)
  },
  deleteReview (docKey) {
    return http.delete(`qna/${docKey}`)
      .then(res => res.data)
  },
  getQnas (activityKey, page, size) {
    return http.get('qna', {
      params: {
        activityKey: activityKey,
        page: page,
        size: size
      }
    }).then(res => res.data)
  },
  postQnA (activityKey, params) {
    return http.post(`qna/${activityKey}`, params)
      .then(res => res.data)
  },
  /**
   * 피드에는 후기까지 포함하여 보여진다.
   */
  getFeed (page, size) {
    return http.get('doc', {
      params: {
        type: '0, 1',
        page: page,
        size: size
      }
    })
      .then(res => res.data)
  },
  getdoc () {
    return http.get('doc')
      .then(res => res.data)
  },
  postFeed (params) {
    return http.post(`doc`, params)
      .then(res => res.data)
  },
  updateDoc (docKey, params) {
    return http.put(`doc/${docKey}`, params)
      .then(res => res.data)
  },
  postDoc (params) {
    return http.post(`doc`, params)
      .then(res => res.data)
  },
  deleteDoc (docKey) {
    return http.delete(`doc/${docKey}`)
      .then(res => res.data)
  },
  getUserDoc (userKey) {
    return http.get(`doc/user/${userKey}`)
      .then(res => res.data)
  },
  getDocFromKey (docKey) {
    return http.get(`doc/${docKey}`)
      .then(res => res.data)
  },
  getCommentsFromKey (docKey, page, size) {
    return http.get(`doc/${docKey}/comment`, {
      params: {
        page: page,
        size: size
      }
    }).then(res => res.data)
  },
  postComment (params) {
    return http.post(`doc/${params.doc_key}/comment`, params)
      .then(res => res)
  },
  getImagesFromKey (imageKeys) {
    return http.get(`image/${imageKeys}`)
      .then(res => res.data)
  },
  getUserProfile (userKey) {
    return http.get(`user/${userKey}`)
      .then(res => res.data)
  },
  saveProfile (userKey, params) {
    return http.put(`user/${userKey}`, params)
      .then(res => res.data)
  },
  requestHost (params) {
    return http.post(`host/request`, params)
      .then(res => res.data)
  },
  updateHost (hostKey, params) {
    return http.post(`host/${hostKey}`, params)
      .then(res => res.data)
  },
  addActivity (params) {
    return http.post(`activity`, params)
      .then(res => res.data)
  },
  updateActivity (activityKey, params) {
    return http.put(`activity/${activityKey}`, params)
      .then(res => res.data)
  },
  deleteActivity (activityKey) {
    return http.delete(`activity/${activityKey}`)
      .then(res => res.data)
  },
  signUp (accessToken, name, profileImage) {
    return http.post(`user/signUp`, { accessToken: accessToken, name: name, profileImage: profileImage })
      .then(res => res.data)
  },
  createCustomToken (accessToken) {
    return http.post(`user/createCustomToken`, {
      accessToken: accessToken
    }).then(res => res.data)
  },
  signUpWithToken (customToken) {
    return http.post(`user/signUpWithCustomToken`, {
      customToken: customToken
    }).then(res => res.data)
  },
  reverseGeoCoding (latitude, longitude) {
    if (typeof window !== 'undefined') {
      return window.fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GEO_API_KEY}`)
        .then(res => res.json())
    }
  },
  /**
   * 공지사항 게시판 목록
   */
  getBoard (type) {
    return http.get(`board`, {
      params: {
        type: type
      }
    })
      .then(res => res.data)
  },

  /**
   * 호스트 관련 API ... TODO: hostApi 모듈로 빼기
   */
  getCountAllWekin (hostKey) {
    return http.get(`activity/host/${hostKey}`, {
      params: {
        count: true
      }
    })
      .then(res => res.data)
  },
  getHostWekin (hostKey) {
    return http.get(`activity/host/${hostKey}`)
      .then(res => res.data)
  },
  getRecentlyWekin (hostKey) {
    return http.get(`activity/host/${hostKey}/recently`)
      .then(res => res.data)
  },
  sendPhoneVerification (phoneNumber) {
    return http.post('user/verify/phone', {
      phoneNumber: phoneNumber
    }).then(res => res.data)
  },
  verifySmsCode (phoneNumber, verifyCode) {
    return http.put('user/verify/phone', {
      phoneNumber: phoneNumber,
      verifyCode: verifyCode
    }).then(res => res.data)
  },
  // 테스트용 서버 버전
  getMainBanners () {
    return axios.get(`${TEST_API_URL}/env/main/banner`)
      .then(res => res.data)
  },
  /**
   * {userKey}가 팔로우한 사람들 조회
   * @param {Number} userKey
   */
  getFollower (userKey) {
    return axios.get(`${TEST_API_URL}/follow/target/${userKey}`)
      .then(res => res.data)
  },
  /**
   * {userKey}를 팔로우한 사람들 조회 ({userKey}의 팔로워)
   * @param {Number} userKey
   */
  getFollowing (userKey) {
    return axios.get(`${TEST_API_URL}/follow/${userKey}`)
      .then(res => res.data)
  },
  toggleFollow (userKey, followTargetUserKey) {
    return axios.put(`${TEST_API_URL}/follow/${userKey}/${followTargetUserKey}`)
      .then(res => res.data)
  },
  /**
   * 이메일 전송
   * @param {string} target
   * @param {string} title
   * @param {string} message
   */
  sendEmail (target, title, message) {
    return axios.post(`${TEST_API_URL}/util/mail`, {
      target: target,
      title: title,
      message: message
    })
  },
  sendSms (target, message) {
    return axios.post(`${TEST_API_URL}/util/sms`, {
      target: target,
      message: message
    })
  },
  toggleFavorite (userKey, activityKey) {
    return axios.put(`${TEST_API_URL}/favorite/${userKey}/${activityKey}`)
      .then(res => res.data)
  },
  toggleLike (userKey, activityKey) {
    return axios.put(`${TEST_API_URL}/like/${userKey}/${activityKey}`)
      .then(res => res.data)
  },
  getUserFavorite (userKey) {
    return axios.get(`${TEST_API_URL}/favorite/${userKey}`)
      .then(res => res.data)
  },
  getUserOrders (userKey) {
    return axios.get(`${TEST_API_URL}/order/user/${userKey}`)
      .then(res => res.data)
  },
  requestOrder (userKey, wekinKey, amount, extra) {
    return axios.post(`${TEST_API_URL}/order/order`, {
      user_key: userKey,
      wekin_key: wekinKey,
      amount: amount,
      extra: extra
    })
      .then(res => res.data)
  },
  requestRefund (userKey, params) {
    return axios.post(`${TEST_API_URL}/order/refund`)
      .then(res => res.data)
  },
  verifyOrder (orderKey, impUid) {
    return axios.put(`${TEST_API_URL}/order/confirm/${orderKey}`, {
      imp_uid: impUid
    }).then(res => res.data)
  },
  deleteOrder (orderKey) {
    return axios.delete(`${TEST_API_URL}/order/${orderKey}`)
      .then(res => res.data)
  },
  cancelOrder (orderKey) {
    return axios.put(`${TEST_API_URL}/order/refund/${orderKey}`)
      .then(res => res.data)
  },
  getNotification (orderKey) {
    return axios.get(`${TEST_API_URL}/noti`)
      .then(res => res.data)
  },
  getNoticeCategory () {
    return axios.get(`${TEST_API_URL}/env/notice/category`)
      .then(res => res.data)
  },
  getFaqCategory () {
    return axios.get(`${TEST_API_URL}/env/faq/category`)
      .then(res => res.data)
  },
  getPolicy () {
    return axios.get(`${TEST_API_URL}/env/conf/policy`)
      .then(res => res.data)
  },
  addBeenOrder (orderUid) {
    return axios.post(`${TEST_API_URL}/order/been/${orderUid}`)
      .then(res => res.data)
  },
  requestWaiting (wekinKey, method) {
    return axios.post(`${TEST_API_URL}/waiting/${wekinKey}`, { method: method })
      .then(res => res.data)
  },
  isRequestedWaiting (wekinKey) {
    return axios.get(`${TEST_API_URL}/waiting/${wekinKey}`)
      .then(res => res.data)
  },
  cancelWaiting (wekinKey) {
    return axios.delete(`${TEST_API_URL}/waiting/${wekinKey}`)
      .then(res => res.data)
  },
  getCommission (hostKey, month) {
    return axios.get(`${TEST_API_URL}/order/host/${hostKey}/${month}`)
      .then(res => res.data)
  },
  getNewestActivity () {
    return axios.get(`${TEST_API_URL}/home/newestActivity`)
      .then(res => res.data)
  },
  getPopularActivity () {
    return axios.get(`${TEST_API_URL}/home/popularActivity`)
      .then(res => res.data)
  },
  getPopularMaker () {
    return axios.get(`${TEST_API_URL}/home/popularMaker`)
      .then(res => res.data)
  },
  getPopularFeed () {
    return axios.get(`${TEST_API_URL}/home/popularFeed`)
      .then(res => res.data)
  }
}