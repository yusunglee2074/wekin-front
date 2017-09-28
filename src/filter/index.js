import Timeago from 'timeago.js'
import moment from 'moment'
const timeagoInstance = new Timeago(null, 'ko_KR')

export default (Vue) => {
  Vue.filter('timeago', function (value) {
    var testlocaldict = function (number, index, totalsec) {
      return [
        ['방금', 'right now'],
        ['%s 초 전', 'in %s seconds'],
        ['1 분 이내', 'in 1 minute'],
        ['%s 분 전', 'in %s minutes'],
        ['1 시간 이내', 'in 1 hour'],
        ['%s 시간 전', 'in %s hours'],
        ['1 일 이내', 'in 1 day'],
        ['%s 일 전', 'in %s days'],
        ['1 주 이내', 'in 1 week'],
        ['%s 주 전', 'in %s weeks'],
        ['1 달 이내', 'in 1 month'],
        ['%s 달 전', 'in %s months'],
        ['1 년 이내', 'in 1 year'],
        ['%s 년 전', 'in %s years']
      ][index]
    }
    Timeago.register('ko_KR', testlocaldict)

    return timeagoInstance.format(value)
  })

  Vue.filter('formatDate', date => {
    return new Date(date).toLocaleDateString()
  })

  Vue.filter('formatTime', date => {
    return moment(date).format('hh:mm') 
  })

  Vue.filter('formatTimer', seconds => {
    return moment.utc(seconds * 1000).format('HH:mm:ss')
  })

  Vue.filter('formatDateKo', date => {
    moment.locale('ko', {
      weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      weekdaysShort: ['일', '월', '화', '수', '목', '금', '토']
    })
    var m = moment(date).subtract(9, 'hours')
    return m.format('MM/DD(ddd)')
  })

  Vue.filter('formatDateTimeKo', date => {
    moment.locale('ko', {
      weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      weekdaysShort: ['일', '월', '화', '수', '목', '금', '토']
    })
    var m = moment(date).subtract(9, 'hours')
    if (m.format('MM/DD(ddd) HH:mm').slice(-5) === "00:00") {
      let customTime = m.format('MM/DD(ddd)')
      return customTime
    }
    return m.format('MM/DD(ddd) HH:mm')
  })

  Vue.filter('joinComma', number => {
    try {
      return number.toLocaleString()
    } catch (e) {
      return number
    }
  })

  Vue.filter('hashLinking', (content, hashTags) => {
    if (hashTags !== null) {
      try {
        hashTags.forEach((value, index) => {
          let hashLink = value.replace('#', '')
          content = content.replace(value, `<a href="/search?keyword=${hashLink}" class="hashtag">${value}</a>`)
        })
      } catch (e) { }
    }
    return content
  })
}
