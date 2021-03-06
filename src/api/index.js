import axios from 'axios'

// const BASE_API_URL = 'http://localhost:8888/v1'
// const BASE_API_URL = 'http://175.195.139.99:8888/v1'
// const BASE_API_URL = 'http://52.78.179.244:8888/v1' //유성이AWSㅇ임시 서버 
// const BASE_API_URL = 'http://127.0.0.1:8888/v1'
// const BASE_API_URL = 'https://wekin-api-dev-dot-wekinproject.appspot.com/v1'
const BASE_API_URL = 'https://wekin-api-prod-dot-wekinproject.appspot.com/v1'
const GEO_API_KEY = 'AIzaSyARPCWOhPLlFgDvqXbKb5RLA4rnVAcGbZ0'
const forSNSLoginUrl = 'http://we-kin.com'
// const forSNSLoginUrl = 'http://175.195.139.99:3000'

const BOARD_TYPE_NOTICE = 0

axios.interceptors.request.use((config) => {
  config.headers.common['x-access-token'] = localStorage.getItem('accessToken')
  return config
}, (error) => {
  return Promise.reject(error)
})

export default {
  setEventItem (user_key) {
    return axios.put(`${BASE_API_URL}/event/set-item`, { user_key })
      .then(r => r.data)
  },
  setUserStatusToJoinedForEvent (user_key) {
    return axios.put(`${BASE_API_URL}/event/join`, { user_key })
      .then(r => r.data)
  },
  getCurrentJoinedUsersCount() {
    return axios.get(`${BASE_API_URL}/event/count-user`)
      .then(r => r.data)
  },
  getInviteEventRanking() {
    return axios.get(`${BASE_API_URL}/event/ranking`)
      .then(r => r.data)
  },
  getInviteEventUrl(user_key) {
    return axios.post(`${BASE_API_URL}/event/url`, { user_key })
      .then(r => r.data)
  },
  inviteNewUserLanding(userKey) {
    return axios.post(`${BASE_API_URL}/event/newUser`, { user_key: userKey })
      .then(r => r.data)
  },
  cancelOrderAndRefundWithSms(wekinKeysList) {
    return axios.put(`${BASE_API_URL}/order/cancel-order-and-refund-with-sms`, { wekinKeysList })
      .then(r => r.data)
  },
  getPaidWekinsForHost (activityKey) {
    return axios.get(`${BASE_API_URL}/host/get-paid-wekins/${activityKey}`)
      .then(r => r.data)
  },
  withDrawSocial (socialToken, uuid) {
    return axios.post(`${BASE_API_URL}/user/withdraw-social`, { socialToken: socialToken, uuid: uuid })
      .then(r => r.data)
  },
  getPaidAmount () {
    return axios.get(`${BASE_API_URL}/wekin/paid-amount`)
      .then(r => r.data)
  },
  forSNSLoginUrl,
  iamportResponseWithUid (uid) {
    return axios.get(`${BASE_API_URL}/iamport/${uid}`)
      .then(r => r.data)
  },
  dbCreateWithIdToken (idToken) {
    return axios.post(`${BASE_API_URL}/user/front/signUp/dbCreateWithIdtoken`, { idToken })
      .then( res => res.data )
  },
  getVersion () {
    return axios.get(`${BASE_API_URL}/util/mobile/version`)
      .then(res => res.data)
  },
  getUser () {
    return axios.get(`${BASE_API_URL}/user/front/verify`)
      .then(res => res.data)
  },
  getAllWekins () {
    return axios.get(`${BASE_API_URL}/wekin/front`)
      .then(res => res.data)
  },
  getCurrentNumberOfBookingUsers (key, date, time) {
    return axios.get(`${BASE_API_URL}/wekin/current/${key}/${date}/${time}`)
      .then(res => res.data)
  },
  postWekin (params) {
    return axios.post(`${BASE_API_URL}/wekin`, { params })
      .then(res => res.data)
  },
  getActivities (key) {
    return axios.get(`${BASE_API_URL}/activity/front/period/${key}`)
      .then(res => res.data)
  },
  getActivityForSearch () {
    return axios.get(`${BASE_API_URL}/activity/search`)
      .then(res => res.data)
  },
  getActivity (activityKey) {
    return axios.get(`${BASE_API_URL}/activity/front/${activityKey}`)
      .then(res => res.data)
  },
  getNews () {
    return axios.get(`${BASE_API_URL}/news`)
      .then(res => res.data)
  },
  newsViewCountPlus (key) {
    return axios.get(`${BASE_API_URL}/news/${key}`)
      .then(res => res.data)
  },
  getAdminActivity (activityKey) {
    return axios.get(`${BASE_API_URL}/admin/front/activity/${activityKey}`)
      .then(res => res.data)
  },
  getAdminWekin (activityKey) {
    return axios.get(`${BASE_API_URL}/admin/front/activity/${activityKey}/wekin`)
      .then(res => res.data)
  },
  getAdminBookings (hostKey) {
    return axios.get(`${BASE_API_URL}/admin/front/host/${hostKey}/wekin`)
      .then(res => res.data)
  },
  getWekins (activityKey) {
    return axios.get(`${BASE_API_URL}/activity/front/${activityKey}/wekin`)
      .then(res => res.data)
  },
  getUserWekinNews (userKey) {
    return axios.get(`${BASE_API_URL}/wekin/${userKey}`)
      .then(res => res.data)
  },
  searchActivity (keyword) {
    return axios.get(`${BASE_API_URL}/activity/search-with-title`, {
      params: {
        keyword: keyword
      }
    })
      .then(res => res.data)
  },
  searchHash (keyword) {
    return axios.get(`${BASE_API_URL}/doc/front/search`, {
      params: {
        hash: keyword
      }
    })
      .then(res => res.data)
  },
  getAttendWekiners (activityKey) {
    return axios.get(`${BASE_API_URL}/activity/front/wekin/${activityKey}/wekiner`)
      .then(res => res.data)
  },
  getMakers () {
    return axios.get(`${BASE_API_URL}/host/front`)
      .then(res => res.data)
  },
  getMaker (hostKey) {
    return axios.get(`${BASE_API_URL}/host/front/${hostKey}`)
      .then(res => res.data)
  },
  getMakerFeed (hostKey) {
    return axios.get(`${BASE_API_URL}/host/front/${hostKey}/feed`)
      .then(res => res.data)
  },
  getMakerReservation (hostKey) {
    return axios.get(`${BASE_API_URL}/host/front/${hostKey}/reservation`)
      .then(res => res.data)
  },
  getMakerRatings (hostKey) {
    return axios.get(`${BASE_API_URL}/host/front/${hostKey}/rating`)
      .then(res => res.data)
  },
  getMakerActivities (hostKey) {
    return axios.get(`${BASE_API_URL}/host/front/${hostKey}/activity`)
      .then(res => res.data)
  },
  getMakerReviews (hostKey) {
    return axios.get(`${BASE_API_URL}/host/front/${hostKey}/review`)
      .then(res => res.data)
  },
  getMakerQnAs (hostKey, page, size) {
    return axios.get(`${BASE_API_URL}/host/front/${hostKey}/qna`, {
      params: {
        page: page,
        size: size
      }
    })
      .then(res => res.data)
  },
  updateAnswer (docKey, answer) {
    return axios.put(`${BASE_API_URL}/host/front/qna/${docKey}`, {
      answer: answer
    }).then(res => res.data)
  },
  getUserActivities (userKey) {
    return axios.get(`${BASE_API_URL}/user/front/${userKey}/activity`)
      .then(res => res.data)
  },
  getUserQnAs (userKey) {
    return axios.get(`${BASE_API_URL}/user/front/${userKey}/qna`)
      .then(res => res.data)
  },
  getReviews (activityKey, page, size) {
    return axios.get(`${BASE_API_URL}/doc/front`, {
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
    return axios.delete(`${BASE_API_URL}/qna/${docKey}`)
      .then(res => res.data)
  },
  getQnas (activityKey, page, size) {
    return axios.get(`${BASE_API_URL}/qna`, {
      params: {
        activityKey: activityKey,
        page: page,
        size: size
      }
    }).then(res => res.data)
  },
  postQnA (activityKey, params) {
    return axios.post(`${BASE_API_URL}/qna/${activityKey}`, params)
      .then(res => res.data)
  },
  /**
   * 피드에는 후기까지 포함하여 보여진다.
   */
  getFeed (page, size) {
    return axios.get(`${BASE_API_URL}/doc/front`, {
      params: {
        type: '0, 1',
        page: page,
        size: size
      }
    })
      .then(res => res.data)
  },
  getdoc () {
    return axios.get(`${BASE_API_URL}/doc/front`)
      .then(res => res.data)
  },
  postFeed (params) {
    return axios.post(`${BASE_API_URL}/doc/front`, params)
      .then(res => res.data)
  },
  updateDoc (docKey, params) {
    return axios.put(`${BASE_API_URL}/doc/front/${docKey}`, params)
      .then(res => res.data)
  },
  postDoc (params) {
    return axios.post(`${BASE_API_URL}/doc/front`, params)
      .then(res => res.data)
  },
  deleteDoc (docKey) {
    return axios.delete(`${BASE_API_URL}/doc/front/${docKey}`)
      .then(res => res.data)
  },
  getUserDoc (userKey) {
    return axios.get(`${BASE_API_URL}/doc/front/user/${userKey}`)
      .then(res => res.data)
  },
  getDocFromKey (docKey) {
    return axios.get(`${BASE_API_URL}/doc/front/${docKey}`)
      .then(res => res.data)
  },
  getCommentsFromKey (docKey, page, size) {
    return axios.get(`${BASE_API_URL}/doc/front/${docKey}/comment`, {
      params: {
        page: page,
        size: size
      }
    }).then(res => res.data)
  },
  getLikesFromKey (docKey) {
    return axios.get(`${BASE_API_URL}/doc/front/${docKey}/like`)
      .then(res => res.data)
  },
  postComment (params) {
    return axios.post(`${BASE_API_URL}/doc/front/${params.doc_key}/comment`, params)
      .then(res => res)
  },
  updateComment (params) {
    return axios.put(`${BASE_API_URL}/doc/front/${params.doc_key}/comment/${params.comment_key}`, params)
      .then(res => res)
  },
  deleteComment (params) {
    return axios.delete(`${BASE_API_URL}/doc/front/${params.doc_key}/comment/${params.comment_key}`)
      .then(res => res)
  },
  getImagesFromKey (imageKeys) {
    return axios.get(`${BASE_API_URL}/image/front/${imageKeys}`)
      .then(res => res.data)
  },
  getUserProfile (userKey) {
    return axios.get(`${BASE_API_URL}/user/front/${userKey}`)
      .then(res => res.data)
  },
  saveProfile (userKey, params) {
    return axios.put(`${BASE_API_URL}/user/front/${userKey}`, params)
      .then(res => res.data)
  },
  requestHost (params) {
    return axios.post(`${BASE_API_URL}/host/front/request`, params)
      .then(res => res.data)
  },
  updateHost (hostKey, params) {
    return axios.post(`${BASE_API_URL}/host/front/${hostKey}`, params)
      .then(res => res.data)
  },
  addActivity (params) {
    return axios.post(`${BASE_API_URL}/activity/front`, params)
      .then(res => res.data)
  },
  updateActivity (activityKey, params) {
    return axios.put(`${BASE_API_URL}/activity/front/${activityKey}`, params)
      .then(res => res.data)
  },
  deleteActivity (activityKey) {
    return axios.delete(`${BASE_API_URL}/activity/front/${activityKey}`)
      .then(res => res.data)
  },
  frontsignUp (accessToken, name, profileImage, email) {
    return axios.post(`${BASE_API_URL}/user/front/signUp`, { accessToken: accessToken, name: name, profileImage: profileImage, email: email })
      .then(res => res.data)
  },
  kakaoLogin (code, type) {
    return axios.get(`${BASE_API_URL}/user/front/signUp/kakao/${code}/${type}`)
  },
  signUp (email, password, name, USER) {
    return axios.post(`${BASE_API_URL}/user/front/join`, { email: email, name: name, password: password, userObject: USER })
      .then(res => res.data)
  },
  createCustomToken (accessToken) {
    return axios.post(`${BASE_API_URL}/user/front/createCustomToken`, {
      accessToken: accessToken
    }).then(res => res.data)
  },
  signUpWithToken (customToken) {
    return axios.post(`${BASE_API_URL}/user/front/signUpWithCustomToken`, {
      customToken: customToken
    }).then(res => res.data)
  },
  geoCoding(address) {
    if (typeof window !== 'undefined') {
      return window.fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GEO_API_KEY}`)
        .then(res => res.json())
    }
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
    return axios.get(`${BASE_API_URL}/board/front`, {
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
    return axios.get(`${BASE_API_URL}/activity/front/host/${hostKey}`, {
      params: {
        count: true
      }
    })
      .then(res => res.data)
  },
  getHostWekin (hostKey) {
    return axios.get(`${BASE_API_URL}/activity/front/host/${hostKey}`)
      .then(res => res.data)
  },
  getRecentlyWekin (hostKey) {
    return axios.get(`${BASE_API_URL}/activity/front/host/${hostKey}/recently`)
      .then(res => res.data)
  },
  sendPhoneVerification (phoneNumber) {
    return axios.post(`${BASE_API_URL}/user/front/verify/phone`, {
      phoneNumber: phoneNumber
    }).then(res => res.data)
  },
  verifySmsCode (phoneNumber, verifyCode) {
    return axios.put(`${BASE_API_URL}/user/front/verify/phone`, {
      phoneNumber: phoneNumber,
      verifyCode: verifyCode
    }).then(res => res.data)
  },
  // 테스트용 서버 버전
  getMainBanners () {
    return axios.get(`${BASE_API_URL}/env/main/banner`)
      .then(res => res.data)
  },
  /**
   * {userKey}가 팔로우한 사람들 조회
   * @param {Number} userKey
   */
  getFollower (userKey) {
    return axios.get(`${BASE_API_URL}/follow/target/${userKey}`)
      .then(res => res.data)
  },
  /**
   * {userKey}를 팔로우한 사람들 조회 ({userKey}의 팔로워)
   * @param {Number} userKey
   */
  getFollowing (userKey) {
    return axios.get(`${BASE_API_URL}/follow/${userKey}`)
      .then(res => res.data)
  },
  toggleFollow (userKey, followTargetUserKey) {
    return axios.put(`${BASE_API_URL}/follow/${userKey}/${followTargetUserKey}`)
      .then(res => res.data)
  },
  /**
   * 이메일 전송
   * @param {string} target
   * @param {string} title
   * @param {string} message
   */
  sendEmail (target, title, message) {
    return axios.post(`${BASE_API_URL}/util/mail`, {
      target: target,
      title: title,
      message: message
    })
  },
  sendSms (target, message) {
    return axios.post(`${BASE_API_URL}/util/sms`, {
      target: target,
      message: message
    })
  },
  toggleFavorite (userKey, activityKey) {
    return axios.put(`${BASE_API_URL}/favorite/${userKey}/${activityKey}`)
      .then(res => res.data)
  },
  hostFavorite(host_key) {
    return axios.get(`${BASE_API_URL}/favorite/host/${host_key}`)
      .then(res => res.data)
  },
  toggleLike (userKey, activityKey) {
    return axios.put(`${BASE_API_URL}/like/${userKey}/${activityKey}`)
      .then(res => res.data)
  },
  getUserFavorite (userKey) {
    return axios.get(`${BASE_API_URL}/favorite/${userKey}`)
      .then(res => res.data)
  },
  getUserOrders (userKey) {
    return axios.get(`${BASE_API_URL}/order/user/${userKey}`)
      .then(res => res.data)
  },
  requestOrder (userKey, wekinKey, amount, extra) {
    return axios.post(`${BASE_API_URL}/order/order`, {
      user_key: userKey,
      wekin_key: wekinKey,
      amount: amount,
      extra: extra
    })
      .then(res => res.data)
  },
  postOrderWithPoint(userKey, wekinKey, amount, extra){
    return axios.post(`${BASE_API_URL}/order/point`, {
      user_key: userKey,
      wekin_key: wekinKey,
      amount: amount,
      extra: extra
    })
      .then(res => res.data)
  },
  requestPointUse(value, type, wekin_key) {
    return axios.post(`${BASE_API_URL}/point/front/use`, {
      value: value,
      type: type,
      wekin_key: wekin_key || null
    })
  },
  getPointHistory(user_key, month) {
    return axios.get(`${BASE_API_URL}/point/detail/${ user_key }/${ month }`)
  },
  requestRefund (userKey, params) {
    return axios.post(`${BASE_API_URL}/order/refund`)
      .then(res => res.data)
  },
  verifyOrder (orderKey, impUid) {
    return axios.put(`${BASE_API_URL}/order/confirm/${orderKey}`, {
      imp_uid: impUid
    }).then(res => res.data)
  },
  deleteOrder (orderKey) {
    return axios.delete(`${BASE_API_URL}/order/${orderKey}`)
      .then(res => res.data)
  },
  cancelOrder (orderKey) {
    return axios.put(`${BASE_API_URL}/order/refund/${orderKey}`)
      .then(res => res.data)
  },
  getNotification (orderKey) {
    return axios.get(`${BASE_API_URL}/noti`)
      .then(res => res.data)
  },
  getNoticeCategory () {
    return axios.get(`${BASE_API_URL}/env/notice/category`)
      .then(res => res.data)
  },
  getFaqCategory () {
    return axios.get(`${BASE_API_URL}/env/faq/category`)
      .then(res => res.data)
  },
  getPolicy () {
    return axios.get(`${BASE_API_URL}/env/conf/policy`)
      .then(res => res.data)
  },
  addBeenOrder (orderUid) {
    return axios.post(`${BASE_API_URL}/order/been/${orderUid}`)
      .then(res => res.data)
  },
  requestWaiting (wekinKey, method) {
    return axios.post(`${BASE_API_URL}/waiting/${wekinKey}`, { method: method })
      .then(res => res.data)
  },
  isRequestedWaiting (wekinKey) {
    return axios.get(`${BASE_API_URL}/waiting/${wekinKey}`)
      .then(res => res.data)
  },
  cancelWaiting (wekinKey) {
    return axios.delete(`${BASE_API_URL}/waiting/${wekinKey}`)
      .then(res => res.data)
  },
  getCommission (hostKey, year, month) {
    return axios.get(`${BASE_API_URL}/order/host/${hostKey}/${year}/${month}`)
      .then(res => res.data)
  },
  getNewestActivity () {
    return axios.get(`${BASE_API_URL}/home/newestActivity`)
      .then(res => res.data)
  },
  getPopularActivity () {
    return axios.get(`${BASE_API_URL}/home/popularActivity`)
      .then(res => res.data)
  },
  getPopularMaker () {
    return axios.get(`${BASE_API_URL}/home/popularMaker`)
      .then(res => res.data)
  },
  getPopularFeed () {
    return axios.get(`${BASE_API_URL}/home/popularFeed`)
      .then(res => res.data)
  },
  deleteUser () {
    return axios.delete(`${BASE_API_URL}/user`)
      .then(res => res.data)
  },
  isThereAnyEmailAddress(token) {
    return axios.get(`${BASE_API_URL}/user/check/email`, {
      params: {
        token: token 
      }
    })
      .then(res => res.data)
  },
}
