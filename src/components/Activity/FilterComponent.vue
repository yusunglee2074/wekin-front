<template>
  <div class="filter">
    <button class="title ui primary">
      <i class="options icon"></i>
      필터
      <i class="close icon floated right link" @click="onCloseClick()"></i>
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
    <div class="ui styled accordion">
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
          <button class="ui basic button checkable" v-bind:class="{active: this.categoryCheck === '축제'}" @click="toggleCheckList(categoryCheck, 0, '축제')"><span>축제</span></button>
        </div>
      </div>
    </div>
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
          <button class="ui basic button checkable" v-bind:class="{active: peopleCheck.six}" @click="toggleCheckList(peopleCheck, 6)">전체</button>
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
          <div id="search" class="ui basic primary button" v-on:click="showLocationPopup = !showLocationPopup">{{address}}</div>
          <div id="gps" class="ui top right teal pointing icon button" @click="getGeoLocation()">
            <i class="compass icon"></i>
          </div>
        </div>
        <div class="ui segment popup-box" v-if="showLocationPopup">
          <span>현재 설정된 주소가 맞지 않으신가요?</span>
          <div class="ui action input">
            <input type="text" placeholder="동명을 입력하세요">
            <button class="ui basic icon button">
              <i class="search icon"></i>
            </button>
          </div>
          <button id="search" class="ui primary button">
            <i class="icon compass"></i>
            현재위치 자동 검색
          </button>
        </div>
      </div>
    </div>
    <div class="flex action-btn-container">
      <button class="ui button basic reset-btn f1" @click="resetFilter()">초기화</button>
      <button class="ui button negative apply-btn f1" @click="applyFilter()">적용</button>
    </div>
  </div>
</template>
<script>
const MAX_PRICE = 300000

export default {
  data() {
    return {
      showLocationPopup: false,
      position: null,
      address: null,
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
      peopleCheckList: [true, false, false, false, false, false],
      isLoading: true,
      peopleCount: 0,
      peopleCheck: {
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: true
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
  methods: {
    applyFilter() {
      let location = this.locationFilter
      let locationCheck = this.locationCheck
      let startDate = this.startDate
      let endDate = this.endDate
      let startPrice = this.startPrice
      let endPrice = this.endPrice
      let people = this.peopleCount
      let category = this.categoryCheck
      this.$router.push({
        name: 'Activity', path: '/activity', params: {
          location: location,
          startDate: startDate,
          endDate: endDate,
          startPrice: startPrice,
          endPrice: endPrice,
          people: people,
          locationCheck: locationCheck,
          categoryCheck: category
        }
      })
    },
    onCloseClick() {
      this.$router.go(-1)
    },
    resetFilter() {
      this.clearPeopleCheck()
      this.clearLocationCheck()
      this.locationCheck.all = true
      this.peopleCheck.six = true
      this.endDate = null
      this.startPrice = 0
      this.endPrice = MAX_PRICE
      this.locationFilter = ["전체"]
      this.categoryCheck = ""
      $('#price').range('set valueDouble', 0, MAX_PRICE);
      $('#display-d').html(`0원 ~ ${MAX_PRICE}+`);
      $(".thumb").trigger("click");
      $("#rangestart").calendar('clear')
      $("#rangeend").calendar('clear')
    },
    clearLocationCheck() {
      this.locationFilter = []
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
          case 6:
            this.peopleCheck.six = !this.peopleCheck.six
            break;
        }
      }
      else if (checkListType === this.locationCheck) {
        if(this.locationFilter.indexOf('전체') > -1) {
          this.locationCheck.all = false
          this.locationFilter.splice(this.locationFilter.indexOf('전체'), 1);
        }
        if (this.locationFilter.indexOf(text) > -1) {
          this.locationFilter.splice(this.locationFilter.indexOf(text), 1);
        } else {
          this.locationFilter.push(text)
        }
        switch (text) {
          case "전체":
            this.clearLocationCheck()
            this.locationFilter.push("전체")
            this.locationCheck.all = true
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
          case "축제":
            this.togglecategory(text)
            break;
          case "휴식":
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
    getGeoLocation() {
      if (typeof window !== 'undefined' && "geolocation" in navigator) {
        navigator.geolocation.watchPosition(position => {
          this.position = position
          api.reverseGeoCoding(position.coords.latitude, position.coords.longitude)
            .then(address => {
              this.address = address.results[0].formatted_address.replace('대한민국', '')
              this.wekins = this.wekins.map(wekin => {
                wekin.distance =
                  Location.distanceInKmBetweenEarthCoordinates(this.position.coords.latitude, this.position.coords.longitude, wekin.coordinates.x, wekin.coordinates.y)
                return wekin
              })
              console.log(this.wekins)
            })
            .catch(err => console.error(err))
        })
      }
    },
  },
  mounted() {
    let vue = this
    $('#price').range({
      min: 0,
      max: MAX_PRICE,
      start: 0,
      doubleStart: MAX_PRICE,
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
        $('#display-d').html(`${firstVal}원 ~ ${secVal}원`);
      }
    })
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
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables';

.navbar-custom {

}
.filter {
  .ui.styled.accordion {
    border-radius: 0;
    width: 100%;
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
      #gps {
        max-width: 50px;
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

  .action-btn-container {
    button {
      border-radius: 0;
      margin: 0;
      height: 48px;
    }
    margin-bottom: 32px;
  }
}
</style>
