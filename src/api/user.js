// import axios from 'axios'

// const baseUrl = '/api/v1'
// const GEO_API_KEY = 'AIzaSyARPCWOhPLlFgDvqXbKb5RLA4rnVAcGbZ0'

// const BOARD_TYPE_NOTICE = 0

// const http = axios.create({
//   baseURL: baseUrl
// })

// if (typeof window !== 'undefined') {
//   let token = localStorage.getItem('accessToken')
//   if (token) {
//     http.defaults.headers.common['x-access-token'] = localStorage.getItem('accessToken')
//   }
// }

// exports.module = function () {

// }
// // export default {
// //   getUser () {
// //     return http.get('user/verify')
// //       .then(res => res.data)
// //   },
// //   getWekins () {
// //     return http.get('activity')
// //       .then(res => res.data)
// //   },
// //   getWekin (activity_key) {
// //     return http.get(`activity/${activity_key}`)
// //       .then(res => res.data)
// //   },
// //   searchWekin (keyword) {
// //     return http.get(`activity`, {
// //       params: {
// //         keyword: keyword
// //       }
// //     })
// //     .then(res => res.data)
// //   },
// //   searchHash (keyword) {
// //     return http.get(`doc/search`, {
// //       params: {
// //         hash: keyword
// //       }
// //     })
// //     .then(res => res.data)
// //   },
// //   getMakers () {
// //     // TODO: user에서 host로 바꾸기
// //     return http.get('user/list')
// //       .then(res => res.data)
// //   },
// //   getPopulardoc () {
// //     return http.get('doc/popular')
// //       .then(res => res.data)
// //   },
// //   getQnA (activityKey) {
// //     return http.get('qna', {
// //       params: {
// //         activityKey: activityKey
// //       }
// //     })
// //     .then(res => res.data)
// //   },
// //   postQnA (params) {
// //     return http.post(`qna`, params)
// //       .then(res => res.data)
// //   },
// //   /**
// //    * 피드
// //    */
// //   getFeed () {
// //     return http.get('doc', {
// //       params: {
// //         type: 0
// //       }
// //     })
// //     .then(res => res.data)
// //   },
// //   getdoc () {
// //     return http.get('doc')
// //       .then(res => res.data)
// //   },
// //   postdoc (params) {
// //     return http.post(`doc`, params)
// //       .then(res => res.data)
// //   },
// //   getUserdoc (userKey) {
// //     return http.get(`doc/user/${userKey}`)
// //       .then(res => res.data)
// //   },
// //   getdocFromKey (docKey) {
// //     return http.get(`doc/${docKey}`)
// //       .then(res => res.data)
// //   },
// //   getCommentsFromKey (docKey) {
// //     return http.get(`doc/${docKey}/comment`)
// //       .then(res => res.data)
// //   },
// //   postComment (params) {
// //     return http.post(`doc/${params.doc_key}/comment`, params)
// //       .then(res => res)
// //   },
// //   getImagesFromKey (imageKeys) {
// //     return http.get(`image/${imageKeys}`)
// //       .then(res => res.data)
// //   },
// //   signUp (accessToken, name) {
// //     return http.post(`user/signUp`, {accessToken: accessToken, name: name})
// //   },
// //   reverseGeoCoding (latitude, longitude) {
// //     return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GEO_API_KEY}`)
// //       .then(res => res.data.results[0].formatted_address.replace('대한민국', ''))
// //   },
// //   /**
// //    * 공지사항 게시판 목록
// //    */
// //   getBoard (type) {
// //     return http.get(`board`, {
// //       params: {
// //         type: type
// //       }
// //     })
// //     .then(res => res.data)
// //   }
// // }