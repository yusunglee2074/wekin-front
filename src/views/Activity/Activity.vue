<template>
  <div id="wekins">
    <navbar id="navbar" ref="navbar"></navbar>
    <div class="navbar-custom"></div>
    <div class="ui segment list">
      <div class="ui left rail filter">
        <button class="title">
          <i class="options icon"></i>
          <span>필터</span>
        </button>
        <div class="ui styled accordion">
          <div class="active title">
            <!--<i class="dropdown icon"></i>-->
            지역
          </div>
          <div class="active content">
            <div class="button-container">
              <button class="ui basic button checkable" v-bind:class="{active: locationCheck.all}" @click="toggleCheckList(locationCheck, 0, '전체')">전체</button>
              <button class="ui basic button checkable" v-bind:class="{active: locationCheck.seoul}" @click="toggleCheckList(locationCheck, 1, '서울')">서울</button>
              <button class="ui basic button checkable" v-bind:class="{active: locationCheck.gyeonggi}" @click="toggleCheckList(locationCheck, 2, '경기')">경기</button>
              <button class="ui basic button checkable" v-bind:class="{active: locationCheck.gangwon}" @click="toggleCheckList(locationCheck, 3, '강원')">강원</button>
              <button class="ui basic button checkable" v-bind:class="{active: locationCheck.chungcheong}" @click="toggleCheckList(locationCheck, 4, '충청')">충청</button>
              <button class="ui basic button checkable" v-bind:class="{active: locationCheck.gyeongsang}" @click="toggleCheckList(locationCheck, 5, '경상')">경상</button>
              <button class="ui basic button checkable" v-bind:class="{active: locationCheck.geonla}" @click="toggleCheckList(locationCheck, 6, '전라')">전라</button>
              <button class="ui basic button checkable" v-bind:class="{active: locationCheck.jeju}" @click="toggleCheckList(locationCheck, 7, '제주')">제주</button>
              <button class="ui basic button checkable" v-bind:class="{active: locationCheck.abroad}" @click="toggleCheckList(locationCheck, 8, '해외')">해외</button>
            </div>
          </div>
        </div>
        <!--카테고리-->
        <!--<div class="ui styled accordion">
          <div class="active title">
            카테고리
          </div>
          <div class="active content">
            <div class="button-container">
              <button class="ui basic button checkable" v-bind:class="{active: this.categoryCheck === '놀이'}" @click="toggleCheckList(categoryCheck, 0, '놀이')">놀이</button>
              <button class="ui basic button checkable" v-bind:class="{active: this.categoryCheck === '도전'}" @click="toggleCheckList(categoryCheck, 0, '도전')">도전</button>
              <button class="ui basic button checkable" v-bind:class="{active: this.categoryCheck === '체험'}" @click="toggleCheckList(categoryCheck, 0, '체험')">체험</button>
              <button class="ui basic button checkable" v-bind:class="{active: this.categoryCheck === '문화'}" @click="toggleCheckList(categoryCheck, 0, '문화')">문화</button>
              <button class="ui basic button checkable" v-bind:class="{active: this.categoryCheck === '휴식'}" @click="toggleCheckList(categoryCheck, 0, '휴식')">휴식</button>
              <button class="ui basic button checkable" v-bind:class="{active: this.categoryCheck === '한강몽땅'}" @click="toggleCheckList(categoryCheck, 0, '한강몽땅')">한강몽땅</button>
            </div>
          </div>
        </div>-->
        <!--카테고리 끝-->
        <div class="ui styled accordion">
          <div class="active title">
            <!--<i class="dropdown icon"></i>-->
            날짜
          </div>
          <div class="active content">
            <div class="ui form">
              <div class="two fields">
                <div class="field">
                  <div class="ui calendar" id="rangestart">
                    <div class="ui input left icon">
                      <i class="calendar icon"></i>
                      <input type="text" placeholder="시작일">
                    </div>
                  </div>
                </div>
                <div class="field">
                  <div class="ui calendar" id="rangeend">
                    <div class="ui input left icon">
                      <i class="calendar icon"></i>
                      <input type="text" placeholder="종료일">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ui styled accordion">
          <div class="active title">
            <!--<i class="dropdown icon"></i>-->
            가격
          </div>
          <div class="active content">
            <div id="price" class="ui double range"></div>
            <p id="display-d"></p>
          </div>
        </div>
        <div class="ui styled accordion">
          <div class="active title">
            <!--<i class="dropdown icon"></i>-->
            인원
          </div>
          <div class="active content">
            <div class="button-container">
              <button class="ui basic button checkable" v-bind:class="{active: peopleCheck.one}" @click="toggleCheckList(peopleCheck, 1)">혼자</button>
              <button class="ui basic button checkable" v-bind:class="{active: peopleCheck.two}" @click="toggleCheckList(peopleCheck, 2)">2명</button>
              <button class="ui basic button checkable" v-bind:class="{active: peopleCheck.three}" @click="toggleCheckList(peopleCheck, 3)">3명</button>
              <button class="ui basic button checkable" v-bind:class="{active: peopleCheck.four}" @click="toggleCheckList(peopleCheck, 4)">4명</button>
              <button class="ui basic button checkable" v-bind:class="{active: peopleCheck.five}" @click="toggleCheckList(peopleCheck, 5)">5명</button>
              <button class="ui basic button checkable" v-bind:class="{active: peopleCheck.six}" @click="toggleCheckList(peopleCheck, 0)">전체</button>
            </div>
          </div>
        </div>
        <div class="ui styled accordion location">
          <div class="active title">
            <!--<i class="dropdown icon"></i>-->
            내주변
          </div>
          <div class="active content">
            <div class="ui buttons">
              <div id="search" class="ui basic primary button" v-on:click="showLocationPopup = !showLocationPopup"><span class="addressText">{{address}}</span></div>
              <div id="gps" class="ui top right teal pointing icon button" @click="getGeoLocation()">
                <i class="compass icon"></i>
              </div>
            </div>
            <div class="ui segment popup-box" v-if="showLocationPopup">
              <span>현재 설정된 주소가 맞지 않으신가요?</span>
              <div class="ui action input">
                <input type="text" placeholder="동명을 입력하세요" v-model="addressText">
                <button class="ui basic icon button" @click="getTextToGeoLocation()">
                  <i class="search icon"></i>
                </button>
              </div>
              <button id="search" class="ui primary button" @click="getGeoLocation()">
                <i class="icon compass"></i>
                현재위치 자동 검색
              </button>
            </div>
          </div>
        </div>
        <button class="ui button negative full-width reset-btn" @click="resetFilter()">필터 초기화</button>
      </div>
      <div class="ui clearing segment rect">
        <div class="ui selection dropdown styled sort">
          <input name="sort" type="hidden" value="0">
          <i class="dropdown icon"></i>
          <div class="text">최신순</div>
          <div class="menu">
            <div class="item" data-value="0">최신순</div>
            <div class="item" data-value="1">인기순</div>
            <div class="item" data-value="3">마감임박</div>
            <div class="item" data-value="4">높은 가격순</div>
            <div class="item" data-value="5">낮은 가격순</div>
          </div>
        </div>
        <span class="ui right floated actived-wekins" v-if="filteredWekin">{{filteredWekin.length}}개의 활동이 있습니다.</span>
      </div>
      <div class="ui link three stackable cards activities">
        <wekin-card-layout
          :activityKey="wekin.activity_key"
          :title="wekin.title"
          :address="wekin.address"
          :name="wekin.Host.name"
          :imageUrl="wekin.main_image.image[0]"
          :favorite="wekin.Favorites"
          :rating="Math.round(wekin.rating_avg) || 0"
          :reviewCount="wekin.review_count"
          v-for="(wekin, index) in filteredWekin" v-bind:key="wekin.wekin_key">
          <span class="right floated price" slot="extra-header">￦ {{wekin.price | joinComma}}</span>
          <div class="content extra-body" slot="extra-body">
            <span v-for="(schedule, index) in wekin.Wekins" v-if="index < 4" style="padding-right:8px;" v-bind:class="{  commingSchedule: isCommingSchedule(schedule), endSchedule: isEndSchedule(schedule) }" v-bind:key="schedule.wekin_key">{{schedule.start_date | formatDateKo}}</span>
          </div>
        </wekin-card-layout>
        <div class="ui active inverted dimmer" v-if="isLoading">
          <div class="ui medium text loader">Loading</div>
        </div>
      </div>
    </div>
    <!--<div class="ui segment"></div>-->
  </div>
</template>
<script>
import wekinCardLayout from 'components/WekinCardLayout.vue'
import Navb from 'components/NavBar.vue'
import api from 'api'
import { Location } from 'src/util'
import _ from 'lodash'
import moment from 'moment'

const MAX_PRICE = 300000
const ONE_DAY_TIME = 86400000

export default {
  data() {
    return {
      showLocationPopup: false,
      position: null,
      address: null,
      addressText: '',
      startDate: null,
      endDate: null,
      koreanCalendar: {
        days: ['일', '월', '화', '수', '목', '금', '토'],
        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        today: '오늘',
        now: '지금',
        am: '오전',
        pm: '오후'
      },
      wekins: [],
      startPrice: 0,
      endPrice: MAX_PRICE,
      peopleCount: 0,
      peopleCheckList: [true, false, false, false, false, false],
      isLoading: true,
      peopleCheck: {
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: true // 단체
      },
      locationCheck: {
        all: true,
        seoul: false,
        gyeonggi: false,
        gangwon: false,
        chungcheong: false,
        gyeongsang: false,
        geonla: false,
        jeju: false,
        abroad: false
      },
      locationFilter: ["전체"],
      categoryCheck: '',
    }
  },
  asyncComputed: {
    filteredWekin() {
      return this.wekins.filter((wekin) => {
        if (this.isInPrice(wekin) &&
          this.isInCurrentLocation(wekin) &&
          this.isInArea(wekin) &&
          this.isInPeople(wekin) &&
          this.isInDate(wekin) &&
          this.isInCategory(wekin)) {
          return wekin
        }
      })
    }
  },
  methods: {
    isEndSchedule(schedule) {
      let now = +moment()
      let startDate = moment(schedule.start_date).toDate().getTime()
      if ((startDate - now) < 0) {
        return true
      }
      if (schedule.max_user == schedule.current_user) {
        return true
      }
      return false
    },
    isCommingSchedule(schedule) {
      if (!this.isEndSchedule(schedule)) {
        let now = +moment()
        let startDate = moment(schedule.start_date).toDate().getTime()
        if ((startDate - now) < ONE_DAY_TIME) {
          return true
        }
      }
      return false
    },
    resetFilter() {
      this.clearPeopleCheck()
      this.clearLocationCheck()
      this.address = ''
      this.locationCheck.all = true
      this.peopleCheck.six = true
      this.endDate = null
      this.startPrice = 0
      this.endPrice = MAX_PRICE
      this.locationFilter = ["전체"]
      this.categoryCheck = ''
      $('#price').range('set valueDouble', 0, MAX_PRICE);
      $('#display-d').html(`0원 ~ ${MAX_PRICE}+`);
      $(".thumb").trigger("click");
      $("#rangestart").calendar('clear')
      $("#rangeend").calendar('clear')
    },
    isInDate(activity) {
      if (!this.startDate && !this.endDate) return true  //시작일 종료일 모두 선택하지 않았으면 필터 제외

      let startDate = moment(this.startDate).toDate().getTime()
      let endDate = moment(this.endDate).toDate().getTime()

      if (this.startDate && this.endDate) { //시작일 종료일 모두 선택한 경우
        let wekin = _.find(activity.Wekins, (wekin) => {
          if ((moment(wekin.start_date).diff(startDate) > 0) && (moment(wekin.start_date).diff(endDate) < 0)) {
            return true
          }
        })
        if (wekin) {
          return true
        } else {
          return false
        }
      }
      if (this.startDate) {
        let wekin = _.find(activity.Wekins, (wekin) => {
          if (moment(wekin.start_date).diff(startDate) > 0) {
            return true
          }
        })
        if (wekin) {
          return true
        }
      }
      if (this.endDate) {
        let wekin = _.find(activity.Wekins, (wekin) => {
          if (moment(wekin.start_date).diff(endDate) < 0) {
            return true
          }
        })
        if (wekin) {
          return true
        }
      }

      return false
    },
    isInPeople(activity) {
      if (this.peopleCount == 0) {
        return true
      }
      let wekin = _.find(activity.Wekins, (wekin) => {
        if ((wekin.max_user - Number(wekin.current_user)) > 0 && (wekin.max_user - Number(wekin.current_user)) >= this.peopleCount) {  // 구매 가능한 인원이 1명이상이면서 선택한 인원보다 커야함
          return true
        }
      })
      if (wekin) {
        return true
      }
      return false
    },
    isInArea(activity) {
      if (this.locationCheck.all) { // 전체면 무조건 통과
        return true
      }
      if (activity && activity.address_detail.area) { // 아니면 검사 area가 있을 경우만
        return _.includes(this.locationFilter, activity.address_detail.area)
        // return this.locationFilter.includes(activity.address_detail.area)
      }
      return false
    },
    isInPrice(activity) {
      if(activity) {
        if (activity.price >= this.startPrice && activity.price <= this.endPrice) {
          return true
        }
        if (this.startPrice >= MAX_PRICE) {
          return true
        }
        return false
      }
    },
    isInCurrentLocation(activity) {
      if (!this.address) {
        return true
      } else if (activity.distance <= 5) {
        return true
      }
      return false
    },
    isInCategory(activity) {
      if (this.categoryCheck === '') {
        return true
      } else if (this.categoryCheck === activity.category) {
        return true
      } else {
        return false
      }
    },
    clearLocationCheck() {
      this.locationCheck.all = false
      this.locationCheck.seoul = false
      this.locationCheck.gyeonggi = false
      this.locationCheck.gangwon = false
      this.locationCheck.chungcheong = false
      this.locationCheck.gyeongsang = false
      this.locationCheck.geonla = false
      this.locationCheck.jeju = false
      this.locationCheck.abroad = false
    },
    clearPeopleCheck() {
      this.peopleCheck.one = false
      this.peopleCheck.two = false
      this.peopleCheck.three = false
      this.peopleCheck.four = false
      this.peopleCheck.five = false
      this.peopleCheck.six = false
    },
    toggleCheckList(checkListType, index, text) { // FIXME: Array로 하면 binding과 view 갱신이 되지 않는 이슈가 있어 추후 변경
      if (checkListType === this.peopleCheck) {
        this.clearPeopleCheck()
        this.peopleCount = index
        switch (index) {
          case 1:
            this.peopleCheck.one = !this.peopleCheck.one
            break;
          case 2:
            this.peopleCheck.two = !this.peopleCheck.two
            break;
          case 3:
            this.peopleCheck.three = !this.peopleCheck.three
            break;
          case 4:
            this.peopleCheck.four = !this.peopleCheck.four
            break;
          case 5:
            this.peopleCheck.five = !this.peopleCheck.five
            break;
          case 0:
            this.peopleCheck.six = !this.peopleCheck.six
            break;
        }
      }
      else if (checkListType === this.locationCheck) {
        if (this.locationFilter.indexOf(text) > -1) {
          this.locationFilter.splice(this.locationFilter.indexOf(text), 1);
        } else {
          this.locationFilter.push(text)
        }
        if (this.locationFilter.indexOf("전체") > -1) {
          this.locationCheck.all = false
          this.locationFilter.splice(this.locationFilter.indexOf("전체"), 1)
        }
        switch (text) {
          case "전체":
            this.clearLocationCheck()
            this.locationCheck.all = true
            this.locationFilter = ["전체"]
            break;
          case "서울":
            this.locationCheck.seoul = !this.locationCheck.seoul
            break;
          case "경기":
            this.locationCheck.gyeonggi = !this.locationCheck.gyeonggi
            break;
          case "강원":
            this.locationCheck.gangwon = !this.locationCheck.gangwon
            break;
          case "충청":
            this.locationCheck.chungcheong = !this.locationCheck.chungcheong
            break;
          case "경상":
            this.locationCheck.gyeongsang = !this.locationCheck.gyeongsang
            break;
          case "전라":
            this.locationCheck.geonla = !this.locationCheck.geonla
            break;
          case "제주":
            this.locationCheck.jeju = !this.locationCheck.jeju
            break;
          case "해외":
            this.locationCheck.abroad = !this.locationCheck.abroad
            break;
        }
        // console.log(this.locationFilter)
        if (this.locationFilter.length == 0) {
          this.locationCheck.all = true
          this.locationFilter.push("전체")
        }
      }
      // 카테고리 시작
      else if (checkListType === this.categoryCheck) {
        switch (text) {
          case "놀이":
            this.togglecategory(text)
            break;
          case "도전":
            this.togglecategory(text)
            break;
          case "체험":
            this.togglecategory(text)
            break;
          case "문화":
            this.togglecategory(text)
            break;
          case "휴식":
            this.togglecategory(text)
            break;
          case "한강몽땅":
            this.togglecategory(text)
            break;
        }
      }
    },
    togglecategory(text) {
      if(this.categoryCheck !== text) {
        this.categoryCheck = text
      } else {
        this.categoryCheck = ''
      }
    },
    getTextToGeoLocation() {
      if (typeof window !== 'undefined' && "geolocation" in navigator) {
        api.geoCoding(this.addressText)
          .then(address => {
            this.address = address.results[0].formatted_address.replace('대한민국', '')
            let lat = address.results[0].geometry.location.lat
            let lng = address.results[0].geometry.location.lng
            // console.log(this.wekins)
            this.wekins = this.wekinsTemp.map(wekin => {
              if(wekin.address_detail && wekin.address_detail.location) {
                wekin.distance = Location.distanceInKmBetweenEarthCoordinates(lat, lng, wekin.address_detail.location.lat, wekin.address_detail.location.lng)
                return wekin
              }
            })
          })
          .catch(err => console.error(err))
      }
    },
    getGeoLocation() {
      if (typeof window !== 'undefined' && "geolocation" in navigator) {
        navigator.geolocation.watchPosition(position => {
          this.position = position
          api.reverseGeoCoding(position.coords.latitude, position.coords.longitude)
            .then(address => {
              this.address = address.results[0].formatted_address.replace('대한민국', '')
              this.wekins = this.wekinsTemp.map(wekin => {
                if(wekin.address_detail && wekin.address_detail.location) {
                  wekin.distance = Location.distanceInKmBetweenEarthCoordinates(this.position.coords.latitude, this.position.coords.longitude, wekin.address_detail.location.lat, wekin.address_detail.location.lng)
                  return wekin
                }
              })
              // console.log(this.wekins)
            })
            .catch(err => console.error(err))
        })
      }
    },
    getActivities() {
      api.getActivities()
        .then(json => {
          this.isLoading = false
          this.wekins = json.results
          this.wekinsTemp = json.results
          this.initSortDropdown()
        })
        .catch(err => console.error(err))
    },
    initSortDropdown() {
      setTimeout(() => {
        this.$nextTick(() => {
          $(".ui.dropdown.sort").dropdown({
            onChange: (value) => {
              switch (Number(value)) {
                case 0: // 0 최신순, 1 인기순, 3 마감임박, 4 높은 가격순, 5 낮은가격순
                  this.wekins = _.orderBy(this.wekins, ['title'], ['desc']);
                  // console.log('00000임')
                  break;
                case 1: // 0 최신순, 1 인기순, 3 마감임박, 4 높은 가격순, 5 낮은가격순
                  this.wekins = _.orderBy(this.wekins, ['title'], ['desc']);
                  break;
                case 2: // 0 최신순, 1 인기순, 3 마감임박, 4 높은 가격순, 5 낮은가격순
                  this.wekins = _.orderBy(this.wekins, ['title'], ['desc']);
                  break;
                case 3: // 0 최신순, 1 인기순, 3 마감임박, 4 높은 가격순, 5 낮은가격순
                  this.wekins = _.orderBy(this.wekins, ['title'], ['desc']);
                  break;
                case 4: // 0 최신순, 1 인기순, 3 마감임박, 4 높은 가격순, 5 낮은가격순
                  // console.log(this.wekins)
                  this.wekins = _.orderBy(this.wekins, ['price'], ['desc']);
                  break;
                case 5: // 0 최신순, 1 인기순, 3 마감임박, 4 높은 가격순, 5 낮은가격순
                  this.wekins = _.orderBy(this.wekins, ['price'], ['asc']);
                  break;
              }
            }
          })
        })
      }, 1000)
    }
  },
  components: {
    wekinCardLayout,
    Navb
  },
  created() {
  },
  mounted() {
    this.getActivities()

    let vue = this
    let params = this.$route.params

    if (params.location) {
      if ((typeof this.$route.params.location) == 'object') {
        this.locationFilter = this.$route.params.location
        this.locationCheck = this.$route.params.locationCheck
      } else {
        this.locationFilter = []
        this.locationCheck.all = false
        this.toggleCheckList(this.locationCheck, 0, this.$route.params.location)
      }
    }
    if (params.categoryCheck) {
      this.categoryCheck = this.$route.params.categoryCheck
    }
    if (params.people) {
      this.peopleCheck.one = false
      this.toggleCheckList(this.peopleCheck, Number(this.$route.params.people))
    }
    if (params.startDate) {
      setTimeout(() => {
        $("#rangestart").calendar('set date', this.$route.params.startDate)
        this.startDate = this.$route.params.startDate
      }, 500)
    }
    if (params.endDate) {
      setTimeout(() => {
        $("#rangeend").calendar('set date', this.$route.params.endDate)
        this.endDate = this.$route.params.endDate
      }, 500)
    }
    if (params.startPrice) {
      this.startPrice = params.startPrice
    }
    if (params.endPrice) {
      this.endPrice = params.endPrice
    }
    $('#rangestart').calendar({
      type: 'date',
      endCalendar: $('#rangeend'),
      text: this.koreanCalendar,
      onChange: (date, text, mode) => {
        this.startDate = date
      }
    })
    $('#rangeend').calendar({
      type: 'date',
      startCalendar: $('#rangestart'),
      text: this.koreanCalendar,
      onChange: (date, text, mode) => {
        this.endDate = date
      }
    })
    $('#price').range({
      min: 0,
      max: MAX_PRICE,
      start: params.startPrice || 0,
      doubleStart: params.endPrice || MAX_PRICE,
      step: 5000,
      verbose: true,
      debug: true,
      onChange: function (value) {
        var
          $self = $(this),
          firstVal = $self.range('get thumb value'),
          secVal = $self.range('get thumb value', 'second');
        vue.startPrice = firstVal
        vue.endPrice = secVal
        if (secVal >= MAX_PRICE) {
          $('#display-d').html(`${firstVal}원 ~ ${secVal}+`);
        } else {
          $('#display-d').html(`${firstVal}원 ~ ${secVal}원`);
        }
      }
    })
  }
}
</script>
<style lang=scss scoped>
@import '../../style/variables';

.addressText {
  line-height: 1.4;
  font-family: NotoSansCJKkr-Regular;
  /* padding-bottom: 7px; */
  /* min-height: 38px; */
  max-height: 36px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  /* height: 0.6em; */
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.list {
  min-height: 904px;
  max-width: 1030px;
  left: 164px;
  margin: 0 auto;
  border: none;
  outline: none;
  box-shadow: none;
  text-align: left;
  padding-top: 0;
}

.activities {
  .endSchedule {
    color: #979797
  }
  .commingSchedule {
    color: red;
  }
}

.cards {
  padding-top: 14px;
  .price {
    padding-left: 14px;
  }
}

.ui.selection.dropdown {
  min-width: 105px;
}

.actived-wekins {
  padding-top: 12px;
  padding-right: 20px;
}

.filter {
  .ui.styled.accordion {
    border-radius: 0;
  }
  &.ui.left.rail {
    margin: 0 14px;
    padding: 0;
  }
  >button.title {
    width: 100%;
    height: 64px;
    outline: 1px solid rgb(151, 151, 151)!important;
    background-color: $color-primary;
    color: white;
    font-size: 17px;
    text-align: left;
    border: none;
    outline: none;
    cursor: default;
    padding-left: 16px;
    span {
      color: white;
    }
  }

  button.checkable.active {
    background: $color-primary!important;
    color: white!important;
  }
  .date {
    min-width: 0;
    max-width: 128px;
  }
  .button-container {
    button {
      margin: 6px;
      width: 76px;
      max-height: 35.31px;
      padding: 11px 0px 11px 0px;
    }
  }

  .location {
    .input {
      width: 100%;
    }
    .buttons {
      width: 100%;
      #search {
        width: 210px;
        text-align: left;
        color: black!important
      }
    }
    .popup-box {
      margin: 8px 0;
      .input {
        margin-top: 10px;
      }
      #search.button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
  .reset-btn {
    border-radius: 0;
    width: 302px!important;
    margin-left: -1px;
  }
}

.mobile-filter-btn {
  display: none;
}

@media only screen and (min-width: 992px) and (max-width: 1355px) {
  .list {
    max-width: 687px;
  }
  .ui.three.stackable.cards>.card {
    width: calc(50% - 2em);
    margin-left: 1em;
    margin-right: 1em;
  }
}

@media only screen and (max-width: 991px) {
  .mobile-filter-btn {
    display: inherit;
    width: 100%;
    height: 64px;
    outline: 1px solid rgb(151, 151, 151)!important;
    background-color: $color-primary;
    color: white;
    font-size: 17px;
    text-align: left;
    border: none;
    outline: none;
    cursor: default;
    padding-left: 16px;
    span {
      color: white;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .navbar-custom {
    margin-bottom: 110px;
  }
  .filter {
    display: none;
  }
  .ui.three.stackable.cards>.card {
    width: calc(50% - 2em);
    margin-left: 1em;
    margin-right: 1em;
  }
  .list {
    left: inherit;
  }
}

@media only screen and (max-width: 767px) {
  .filter {
    display: none;
  }

  .list {
    left: inherit;
  }
} 
</style>
