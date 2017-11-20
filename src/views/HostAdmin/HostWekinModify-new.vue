<template>
  <div style="margin-top:100px; margin-left:200px; max-width:1000px; position:relative;">

    <progress max="100" :value="progressValue"></progress>   
    <div v-show="page === 1">
      <h2>기본 정보를 입력해주세요.</h2>
      <h3>위킨 제목 <tool-tip text='
          메이커님이 진행하실 위킨의 이름을 지어주세요.
          위킨활동 장소명이나 활동의 이름을 포함하시는것이 좋습니다.
          어떤 활동인지 전혀 알아볼 수 없는 제목은 피하시는 것이 더 많은 위키너들에게 어필될 수 있습니다.
          적절한 예) 홍천강 레프팅 즐기기, 아찔한 남이섬 슬링샷 등.
          부적절한 예) 아싸라비아 놀아보자, 도심지를 벗어나 즐거움을 만끽해보자 등.
          '></tool-tip></i></h3>
    <div class="ui input focus" style="width:300px;">
      <input type="text" v-model="activity.title">
    </div>
    <h3>카테고리 
      <tool-tip text="위킨에서 선정한 9가지 카테고리 중 하나를 선택하실 수 있습니다. 예를 들어 다양한 운동 중 구기종목들은 스포츠, 등산이나 런닝 등은 야외활동, 기구를 타거나 도심지가 아닌 곳에서 즐기는 레저활동 들은 익스트림으로 선택 하시면 됩니다.
        혹시 어떤 카테고리를 선택해야할지 모르겠다.혹은 기존의 카테고리에 없는 새로운 카테고리를 만들고 싶으시다면 위킨으로 문의해 주세요.
        카카오톡 @위킨, 031-211-0410"></tool-tip></h3>
    <select v-model="activity.category" class="ui dropdown" style="width: 300px;">
      <option value="" disabled>카테고리</option>
      <option value="투어/여행">투어/여행</option>
      <option value="익스트림">익스트림 (레저)</option>
      <option value="스포츠">스포츠 (구기종목)</option>
      <option value="음악">음악</option>
      <option value="댄스">댄스</option>
      <option value="뷰티">뷰티</option>
      <option value="요리">요리</option>
      <option value="아트">아트</option>
      <option value="힐링">힐링</option>
      <option value="아웃도어">아웃도어</option>
      <option value="요가/피트니스">요가/피트니스</option>
      <option value="소품제작">소품제작</option>
    </select>
    <h2>장소를 입력해주세요.</h2>
    <h3>집결지 <tool-tip text="집결지란, 위킨활동을 위해 활동 시작 시간에 맞추어 모이는 장소를 의미합니다. 활동지와 집결지가 동일할 경우는 활동장소와 같음을 체크해 주세요.
        혹시, 특정 주소에는 없는 일반 건물명이나 지하철역 출구번호 등을 사용하실 수는 있으나, 기본적인 시/군/구/동 등의 주소를 사용해 주시기를 권장합니다.
        예) 서울시 마포구 대흥동 맥도날드 앞, 서울시 마포구 대흥역 3번출구 등"></tool-tip></h3>
    <div class="ui input focus" style="width:300px;">
      <input type="text" v-model="activity.meetAddress" id="meetAddress">
    </div>
    <div style="margin-top:8px;">
      <button class="ui button basic" @click="sameAddress()">
        활동장소도 같음 
      </button>
    </div>
    <h3>활동장소 <tool-tip text="활동지란, 실제 위킨 활동이 이루어 지는 장소를 의미합니다. 메이커의 사업장 주소나 활동을 위해 모이는 장소와는 다른 의미라는 것을 기억하시기 바랍니다.
        혹시, 특정 주소에는 없는 산이나 바다, 강 등을 활동지로 선택하시고자 하신다면 입구나 주차장등 근처의 주소가 있는 곳을 기입해 주세요. 도로명 주소나 지번 주소 모두 입력 가능합니다.
        활동지의 중요 포인트는 위키너들의 검색에서 지역 구분에 해당 주소가 사용된다는 점입니다. 사업장 주소는 서울이지만, 실제 활동은 강원도에서 이루어 진다면 지역 구분에서 강원도에 해당 위킨이 표시됩니다.
        예) 경기도 수원시 영통구 에듀타운로 101, 103동 217호 -> 경기"></tool-tip></h3>
    <div class="ui input focus" style="width:300px;">
      <input type="text" v-model="activity.address">
    </div>
  </div>

  <div v-show="page === 2">
    <h2>상세정보를 사진과 함께 작성해주세요.</h2>
                    <Trumbowyg :content="activity.intro_detail" @tbwchange="update"></Trumbowyg>
  </div>

  <div v-show="page === 3">
    <h2>준비물 외 아래 정보를 작성해주세요.</h2>
    <h3>준비물 <tool-tip text="메이커님이 직접 준비해주시거나 대여가 가능한 물품이외에 위키너들이 직접 준비해 와야 하는 부분을 작성해 주세요. 만약 대여가 가능한 준비물인 경우에는 가능여부를 표시해 주시면 됩니다.
        예) 마른 수건, 갈아입을 옷, 간단한 세면도구 등.
        물안경 (대여가능, 개당 5,000원), 스노쿨링 장비 (대여가능, 개당 10,000원) 등"></tool-tip></h3>
    <div class="ui input focus" style="width:300px;">
      <input type="text" v-model="activity.preparation">
    </div>
    <h3>포함/불포함 사항 <tool-tip text="위킨활동을 위해 결제한 내역에 포함되는 항목과 포함되지 않는 항목을 구분하여 표시해 주세요.
        준비물에서 이미 포함이 안되거나 대여가 된 내역을 작성하셨다면 없음으로 표시하셔도 됩니다.
        다만, 위키너들이 궁금해하는 사항중에 포함/불포함 사항을 물어보는 경우가 있다면 구분하여 작성하시는 것이 도움이 됩니다.
        예) 피맥과 함께하는 볼링파티.
        - 포함 : 맥주 500cc 1잔, 피자 4인 1판, 간단한 다과, 볼링 게임비(1게임), 신발 대여료.
        - 불포함 : 포함사항 이외의 추가 주류 및 안주, 전자 다트 사용료, 당구장 사용료 등"></tool-tip></h3>
    <div class="ui input focus" style="width:300px;">
      <input type="text" v-model="activity.inclusion">
    </div>
    <h3>상세 일정 <tool-tip text="위킨 활동을 진행할 상세 일정을 작성해 주세요. 시간의 흐름에 따라 작성해 주셔도 되고 소요시간에 따라 작성해 주셔도 됩니다. 별다른 일정 설명이 필요 없고, 단순한 기구의 사용만 있다면 없음으로 작성해 주시면 됩니다.예) 멋진 영월하늘을 날아보는 패러글라이딩.
        - 10:00 ~ 10:30 : 기본 이론 교육.
        10:30 ~ 11:00 : 장비 착용 및 장비 설명.
        11:00 ~ 11:30 : 이륙장 이동.
        11:30 ~ 12:30 : 비행.
        12:30 ~ 13:00 : 마무리 및 정리."></tool-tip></h3>
    <div class="ui input focus" style="width:300px;">
      <input type="text" v-model="activity.schedule">
    </div>
  </div>

  <div v-show="page === 4">
    <h3>기본가격 <tool-tip text="메이커님이 활동에 대하여 생각하신 가격을 작성해 주시면 됩니다. 만일 가격이 다른 추가적인 옵션이 있다면, 옵션에 의해서 변경되는 금액은 이후에 추가 및 할인을 하실 수 있습니다. 따라서 위키너들에게 처음 노출될 활동 가격을 기입해 주시면 됩니다. 100원에 추가 옵션 50000원을 하게 되면 위키너들에 대한 신뢰가 떨어지겠죠?. 
        아, 그리고 숫자만 기입해 주세요. 콤마(,) 금액단위 (원, 달러 등) 작성하시면 오류가 발생할 수 있습니다.
        예) 10,000원 (X).
        10,000 (X).
        50000원 (X).
        20000 (O)"></tool-tip></h3>
    <div class="ui input focus" style="width:300px;">
      <input type="number" v-model="activity.base_price" placeholder="숫자만 입력해주세요.">
    </div>
    <h3>환불규정 <tool-tip text="위킨에서는 메이커님들을 위해 환불 규정을 작성하실 수 있도록 했습니다. 운영하시는 사업장에서 사용하시는 환불규정을 작성해 주세요. 만약, 별도의 환불 규정이 없으신 경우는 위킨에서 제공해 드리는 기본 환불 규정을 사용하셔도 됩니다."></tool-tip></h3>
    <textarea type="text" v-model="refundPolicyData" v-show="wekinRefund" style="width:300px; height:80px;"></textarea> 
    <textarea type="text" v-model="activity.refund_policy" v-show="!wekinRefund" style="width:300px; height:80px;"></textarea>
    <button class="ui button secondary basic" @click="wekinRefund = !wekinRefund" style="vertical-align: bottom;">위킨환불규정 사용</button> 
    <h3>최소인원 <tool-tip text="특정일의 최소 예약 인원입니다. 해당 값보다 낮다면 활동은 진행안하시면 됩니다."></tool-tip></h3>
    <div class="ui input focus" style="width:300px;">
      <input type="number" placeholder="숫자만 입력해주세요." id="minuser" @change="setDefaultValueOfWeekOption">
    </div>
    <h3>최대인원 <tool-tip text="특정일의 최대 예약 인원입니다"></tool-tip></h3>
    <div class="ui input focus" style="width:300px;">
      <input type="number" placeholder="숫자만 입력해주세요." id="maxuser" @change="setDefaultValueOfWeekOption">
    </div>
    <h3>활동 시각 <tool-tip text="활동 시작 시각입니다."></tool-tip></h3>
    <div class="ui input focus" style="width:300px;">
      <input type="time" id="time" @change="setDefaultValueOfWeekOption">
    </div>
  </div>

  <div v-show="page === 5">
    <h2>상세페이지 상단 슬라이드에에 노출시킬 이미지들을 업로드해주세요.</h2>
    <h3># 첫번째 올려주신 이미지는 대표이미지가 됩니다. <tool-tip text="대표하는 이미지는 앱/웹 모든 페이지에서 기본으로 노출됩니다. 아래의 권장 사항에 따라 이미지를 업로드 해주세요. 최소 1개 이상 최대 10개 까지 이미지를 올릴 수 있습니다.
        .
        - 이미지 크기 : 768 x 500 ( 가로로긴 사진, 해당 비율의 고화질 사진이면 OK).
        - 이미지 내용. 1) 활동지 사진.  2) 활동중 사진.
        3) 사용하시는 기구/용품/제품 사진. 4) 제작 완료/ 작품 사진"></tool-tip></h3>
    <div class="ui card" :style="{ borderStyle: index === 0 ? 'solid' : '', borderColor: 'rgb(40,190,140)' }" style="width: 300px; height:200px; float:left; margin-right:8px;" v-for="(imageUrl, index) in uploadedMainImages.image" v-bind:key="index">
      <div style="left:12px;top:8px;background: white;width:92%;height:92%;z-index:222;position:absolute;" v-if="imageUrl">
        <img style="width:100%;height:100%" :src="imageUrl">
        <i class="remove circle outline icon big link" style="width: 30px; height:auto;position:absolute; top:0;right:0" @click="deleteImage(index)"></i>
      </div>
    </div>
    <div class="ui card" style="width: 300px; height:200px; float:left; margin-right:8px;">
      <div style="width:90px; height:30px; position:absolute; bottom: 46%; left: 36%;">
        <FireUpload title="업로드" :imageUrl="uploadedMainImage" @prog="prog => process(prog)" @update:imageUrl="val => uploadedMainImages.push(val)"></FireUpload>
      </div>
    </div>
  </div>
  <div v-show="isFileUploading && page == 5">
    <h3>파일 업로드 중입니다.</h3>
  </div>

  <div v-show="page === 6">
    <h2>등록 기간을 정해주세요.</h2>
    <div v-show="isTicket === true">
      <!-- 티켓형식 추 후 업데이트로
      <h3>티켓 유효기간</h3>
      <div class="ui calendar">
        <div class="ui input styled primary left icon">
          <datepicker 
            v-model="activity.startDate" 
            id="datepickerId" 
            wapper-class="ui input styled primary left icon" 
            language="ko" 
            format="MMM dd(D), yyyy"
            placeholder="날짜선택">
          </datepicker>
        </div>
      </div>

      <h3>최대 발행 수</h3>
      <div class="ui input focus" style="width:300px;">
        <input type="number" v-model="activity.ticketMaxApply">
      </div>
      -->
      <h1> 죄송합니다. 티켓형식의 판매는 현재 개발 중에 있습니다.</h1>
      <button class="ui secondary basic button" @click="isTicket = false">날짜형식</button>
    </div>
    <div v-show="isTicket === false">
      <h3>등록 시작 날짜 <tool-tip text="활동 등록을 시작하실 날짜를 선택해 주세요."></tool-tip></h3>
      <div class="ui calendar">
        <div class="ui input styled primary left icon">
          <datepicker 
            v-model="activity.start_date" 
            id="datepickerId" 
            wapper-class="ui input styled primary left icon" 
            language="ko" 
            format="MMM dd(D), yyyy"
            placeholder="날짜선택">
          </datepicker>
        </div>
      </div>
      <h3>등록 만료 날짜 <tool-tip text="등록 만료날짜를 선택해주세요."></tool-tip></h3>
      <div class="ui calendar">
        <div class="ui input styled primary left icon">
          <datepicker 
            v-model="activity.end_date" 
            id="datepickerId" 
            wapper-class="ui input styled primary left icon" 
            language="ko" 
            format="MMM dd(D), yyyy"
            placeholder="날짜선택">
          </datepicker>
        </div>
      </div>
      <h3>몇 일전에 접수 마감 시킬까요? <tool-tip text="메이커님이 위킨활동을 하시면서 준비가 필요한 경우 신청 마감을 미리 하실 수 있습니다. 별다른 준비가 필요없는 경우는 위킨 시작전까지 신청을 받으실 수 있고,. 신청 후 사전 예약을 해야하거나 인원수에 따른 사전 준비가 필요한 경우는 필요하신 기간만큼 미리 신청 마감을 하시고 준비하시면 됩니다."></tool-tip></h3>
      <div class="ui input focus" style="width:300px;">
        <input type="number" v-model="activity.due_date" placeholder="숫자만 일단위로 입력해주세요."> 
      </div>
      <h3>시작일과 종료일 사이의 활동 요일 체크해주세요. <tool-tip text="위킨활동의 시작일 및 종료일을 먼저 선택 하셨습니다. 해당 기간동안 일주일 내내 활동을 진행하실 수도 있고, 월/수/금, 혹은 토/일 주말만 진행하실 수 있습니다."></tool-tip></h3>
      <!--<button @click="isTicket = true">티켓형식으로 변환</button>-->
      <input type="checkbox" id="day1" v-model="checkedDays" value="Mo"><label for="day1">월요일</label>
      <input type="checkbox" id="day2" v-model="checkedDays" value="Tu"><label for="day2">화요일</label>
      <input type="checkbox" id="day3" v-model="checkedDays" value="We"><label for="day3">수요일</label>
      <input type="checkbox" id="day4" v-model="checkedDays" value="Th"><label for="day4">목요일</label>
      <input type="checkbox" id="day5" v-model="checkedDays" value="Fr"><label for="day5">금요일</label>
      <input type="checkbox" id="day6" v-model="checkedDays" value="Sa"><label for="day6">토요일</label>
      <input type="checkbox" id="day7" v-model="checkedDays" value="Su"><label for="day7">일요일</label>
      <div style="clear: both;">
        <br>
        <p style="font-size: 18px;">영업 휴무일을 선택해주세요. <tool-tip text="기본적으로 위킨활동의 시작일과 종료일 사이에 선택하신 모든 요일에는 활동이 가능하게 됩니다. 만약 위킨이 진행되는 요일 중, 특정일을 선택하여 휴무를 선택하실 수 있습니다. 처음 위킨활동을 만들 때 선택하지 않더라도 위킨 신청이 없다면 휴무를 변경하실 수 있습니다"></tool-tip></p>
        <div class="ui calendar">
          <div class="ui input styled primary left icon">
            <datepicker 
              v-model="tempEndDate" 
              id="datepickerId" 
              wapper-class="ui input styled primary left icon" 
              language="ko" 
              format="MMM dd(D), yyyy"
              placeholder="날짜선택">
            </datepicker>
          </div>
        </div>
        <div v-for="(data, index) in activity.close_dates">
          {{ data | formatDateWithMoment }}
          <button @click="activity.close_dates.splice(index, 1)">삭제</button>
        </div>
        <div>
          이 페이지 예시설명 <tool-tip text="예를 들어 시작일이 17/01/01, 종료일 17/02/01, 체크된 요일이 월, 수, 금요일 일때. 17년도 1월에 모든 월, 수, 금요일에 활동이 등록됩니다. 마지막으로 휴무일로 지정한 날짜는 등록이 되지 않습니다. 더 자세한 설명은 사이트 아래 고객센터나 카카오톡 @위킨으로 연락바랍니다."></tool-tip>
        </div>
      </div>
    </div>
    <div v-show="isTicket === null">
      <button class="ui secondary basic button" @click="isTicket = true" >티켓형식</button>
      <button class="ui secondary basic button" @click="isTicket = false">날짜형식</button>
    </div>
  </div>

  <div v-show="page === 7">
    <h2>전 페이지에서 지정한 시작일 ~ 종료일 사이의 활동요일을 선택해주세요. </h2>
    <h3>설명<tool-tip text="같은 날짜라도 하루에 2번 활동이 있는 경우가 있을 수 있습니다. 아래의 시작시각 추가, 빼기 버튼으로 시작시각을 요일별로도 여러개 추가 할 수 있습니다."></tool-tip></h3>
    <div class="ui form">
      <div class="seven fields">
        <div class="field" style="height:20px; padding:0 40px; font-size:18px;">
          월요일<input type="checkbox" v-model="checkedDays" value="Mo">
        </div>
        <div class="field" style="height:20px; padding:0 40px; font-size:18px;">
          화요일<input type="checkbox" v-model="checkedDays" value="Tu">
        </div>
        <div class="field" style="height:20px; padding:0 40px; font-size:18px;">
          수요일<input type="checkbox" v-model="checkedDays" value="We">
        </div>
        <div class="field" style="height:20px; padding:0 40px; font-size:18px;">
          목요일<input type="checkbox" v-model="checkedDays" value="Th">
        </div>
        <div class="field" style="height:20px; padding:0 40px; font-size:18px;">
          금요일<input type="checkbox" v-model="checkedDays" value="Fr">
        </div>
        <div class="field" style="height:20px; padding:0 40px; font-size:18px;">
          토요일<input type="checkbox" v-model="checkedDays" value="Sa">
        </div>
        <div class="field" style="height:20px; padding:0 40px; font-size:18px;">
          일요일<input type="checkbox" v-model="checkedDays" value="Su">
        </div>
      </div>
      <div class="seven fields">
        <div class="field" :class="{ disabled: !checkedDaysInclude('Mo') }">
          <label>최소 ~ 최대인원</label>
          <input style="width:63px; height:24px;" type="number" placeholder="## 명" v-model="activity.base_week_option['Mo'].min_user">
          <input style="width:63px; height:24px;" type="number" placeholder="## 명" v-model="activity.base_week_option['Mo'].max_user">
        </div>
        <div class="field" :class="{ disabled: !checkedDaysInclude('Tu') }">
          <label>최소 ~ 최대인원</label>
          <input style="width:63px; height:24px;" type="number" placeholder="## 명" v-model="activity.base_week_option['Tu'].min_user">
          <input style="width:63px; height:24px;" type="number" placeholder="## 명" v-model="activity.base_week_option['Tu'].max_user">
        </div>
        <div class="field" :class="{ disabled: !checkedDaysInclude('We') }">
          <label>최소 ~ 최대인원</label>
          <input style="width:63px; height:24px;" type="number" placeholder="## 명" v-model="activity.base_week_option['We'].min_user">
          <input style="width:63px; height:24px;" type="number" placeholder="## 명" v-model="activity.base_week_option['We'].max_user">
        </div>
        <div class="field" :class="{ disabled: !checkedDaysInclude('Th') }">
          <label>최소 ~ 최대인원</label>
          <input style="width:63px; height:24px;" type="number" placeholder="## 명" v-model="activity.base_week_option['Th'].min_user">
          <input style="width:63px; height:24px;" type="number" placeholder="## 명" v-model="activity.base_week_option['Th'].max_user">
        </div>
        <div class="field" :class="{ disabled: !checkedDaysInclude('Fr') }">
          <label>최소 ~ 최대인원</label>
          <input style="width:63px; height:24px;" type="number" placeholder="## 명" v-model="activity.base_week_option['Fr'].min_user">
          <input style="width:63px; height:24px;" type="number" placeholder="## 명" v-model="activity.base_week_option['Fr'].max_user">
        </div>
        <div class="field" :class="{ disabled: !checkedDaysInclude('Sa') }">
          <label>최소 ~ 최대인원</label>
          <input style="width:63px; height:24px;" type="number" placeholder="## 명" v-model="activity.base_week_option['Sa'].min_user">
          <input style="width:63px; height:24px;" type="number" placeholder="## 명" v-model="activity.base_week_option['Sa'].max_user">
        </div>
        <div class="field" :class="{ disabled: !checkedDaysInclude('Su') }">
          <label>최소 ~ 최대인원</label>
          <input style="width:63px; height:24px;" type="number" placeholder="## 명" v-model="activity.base_week_option['Su'].min_user">
          <input style="width:63px; height:24px;" type="number" placeholder="## 명" v-model="activity.base_week_option['Su'].max_user">
        </div>
      </div>
      <div id="timeAndAdditionalPrice" v-for="(data, index) in maxStartTimeOfDateCountingList">
        <div class="seven fields">
          <div class="field" :class="{ disabled: !checkedDaysInclude('Mo') }">
            <label>시작시각({{index+1}} 번째)</label>
            <input type="time" style="height:26px;" placeholder="" v-model="activity.base_week_option['Mo'].start_time[index]">
          </div>
          <div class="field" :class="{ disabled: !checkedDaysInclude('Tu') }">
            <label>시작시각({{index+1}} 번째)</label>
            <input type="time" style="height:26px;" placeholder="" v-model="activity.base_week_option['Tu'].start_time[index]">
          </div>
          <div class="field" :class="{ disabled: !checkedDaysInclude('We') }">
            <label>시작시각({{index+1}} 번째)</label>
            <input type="time" style="height:26px;" placeholder="" v-model="activity.base_week_option['We'].start_time[index]">
          </div>
          <div class="field" :class="{ disabled: !checkedDaysInclude('Th') }">
            <label>시작시각({{index+1}} 번째)</label>
            <input type="time" style="height:26px;" placeholder="" v-model="activity.base_week_option['Th'].start_time[index]">
          </div>
          <div class="field" :class="{ disabled: !checkedDaysInclude('Fr') }">
            <label>시작시각({{index+1}} 번째)</label>
            <input type="time" style="height:26px;" placeholder="" v-model="activity.base_week_option['Fr'].start_time[index]">
          </div>
          <div class="field" :class="{ disabled: !checkedDaysInclude('Sa') }">
            <label>시작시각({{index+1}} 번째)</label>
            <input type="time" style="height:26px;" placeholder="" v-model="activity.base_week_option['Sa'].start_time[index]">
          </div>
          <div class="field" :class="{ disabled: !checkedDaysInclude('Su') }">
            <label>시작시각({{index+1}} 번째)</label>
            <input type="time" style="height:26px;" placeholder="" v-model="activity.base_week_option['Su'].start_time[index]">
          </div>
        </div>
        <div class="seven fields">
          <div class="field" :class="{ disabled: !checkedDaysInclude('Mo') }">
            <label>시각 추가가격({{index+1}} 번째)</label>
            <input type="number" style="height:26px;" placeholder="#### 원" v-model="activity.base_week_option['Mo'].price_with_time[index]">
          </div>
          <div class="field" :class="{ disabled: !checkedDaysInclude('Tu') }">
            <label>시각 추가가격({{index+1}} 번째)</label>
            <input type="number" style="height:26px;" placeholder="#### 원" v-model="activity.base_week_option['Tu'].price_with_time[index]">
          </div>
          <div class="field" :class="{ disabled: !checkedDaysInclude('We') }">
            <label>시각 추가가격({{index+1}} 번째)</label>
            <input type="number" style="height:26px;" placeholder="#### 원" v-model="activity.base_week_option['We'].price_with_time[index]">
          </div>
          <div class="field" :class="{ disabled: !checkedDaysInclude('Th') }">
            <label>시각 추가가격({{index+1}} 번째)</label>
            <input type="number" style="height:26px;" placeholder="#### 원" v-model="activity.base_week_option['Th'].price_with_time[index]">
          </div>
          <div class="field" :class="{ disabled: !checkedDaysInclude('Fr') }">
            <label>시각 추가가격({{index+1}} 번째)</label>
            <input type="number" style="height:26px;" placeholder="#### 원" v-model="activity.base_week_option['Fr'].price_with_time[index]">
          </div>
          <div class="field" :class="{ disabled: !checkedDaysInclude('Sa') }">
            <label>시각 추가가격({{index+1}} 번째)</label>
            <input type="number" style="height:26px;" placeholder="#### 원" v-model="activity.base_week_option['Sa'].price_with_time[index]">
          </div>
          <div class="field" :class="{ disabled: !checkedDaysInclude('Su') }">
            <label>시각 추가가격({{index+1}} 번째)</label>
            <input type="number" style="height:26px;" placeholder="#### 원" v-model="activity.base_week_option['Su'].price_with_time[index]">
          </div>
        </div>
      </div>
      <button class="ui positive basic button" v-show="maxStartTimeOfDateCountingList.length < 3" @click="subtractBaseWeekPrice('add')">시작시각 추가</button>
      <button class="ui negative basic button" v-show="maxStartTimeOfDateCountingList.length == 2 || maxStartTimeOfDateCountingList.length == 3" @click="subtractBaseWeekPrice('subtract')">시작시각 빼기</button>
    </div>

  </div>

  <div v-show="page === 8">
    <h2>위킨 옵션이 있나요?</h2>
    <h4>*없다면 넘어가도 좋습니다.</h4>
    <div v-for="(value, index) in activity.base_price_option" style="width:400px;margin-bottom:30px;">
      <h3 style="margin: 6px 0 10px; 0;">{{ index + 1 }} 번째 옵션명<tool-tip text="하나의 활동에 A코스, B코스 등 여러가지 옵션이 있을 수 있습니다. 예) (기본, 0) (강습코스 +3000)"></tool-tip></h3>
      <div class="ui input focus" style="width:300px;">
        <input type="text" v-model="activity.base_price_option[index]['name']" placeholder="추가적 옵션이 없다면 '기본'을 입력해주세요">
      </div>
      <h3 style="margin: 6px 0px;">추가가격 <tool-tip text="*** 추가가격 부분은 3000원을 더 받으려면 3000. 3000원을 덜 받으려면 -3000이라 입력하시면 됩니다."></tool-tip></h3>
      <div class="ui input focus" style="width:300px;">
        <input type="number" v-model="activity.base_price_option[index]['price']" placeholder="예) 3000 혹은 -3000" v-if="index !== 0">
        <input type="number" v-model="activity.base_price_option[index]['price']" placeholder="예) 3000 혹은 -3000" v-if="index === 0" disabled>
      </div>
      <button v-show="index > 0" @click="deletePriceOption(index)">제거</button>
    </div>
    <button class="ui button secondary basic" @click="activity.base_price_option.push({})" v-show="Object.keys(activity.base_price_option).length < 3">추가</button>
  </div>

  <div v-show="page === 9">
    <h2>결제 추가 옵션 사항이 있나요?</h2>
    <h4>*없다면 넘어가도 좋습니다.</h4>
    <div v-for="(value, index) in activity.base_extra_price_option" style="width:400px;margin-bottom:30px;">
      <h3 style="margin: 6px 0 10px 0;">{{ index + 1 }} 번째 옵션명 <tool-tip text="하나의 활동에 특정 그룹을 나눠서 요금을 받고 싶을 수 있습니다. 예) (대인, 0) (소인, -3000)."></tool-tip></h3>
      <div class="ui input focus" style="width:300px;">
        <input type="text" v-model="activity.base_extra_price_option[index]['name']" placeholder="추가적 옵션이 없다면 '대인'을 입력해주세요">
      </div>
      <h3 style="margin: 6px 0;">추가가격 <tool-tip text="예) (대인, 0) (소인, -3000).*** 추가가격 부분은 3000원을 더 받으려면 3000. 3000원을 덜 받으려면 -3000이라 입력하시면 됩니다."></tool-tip></h3>
      <div class="ui input focus" style="width:300px;">
        <input type="number" v-model="activity.base_extra_price_option[index]['price']" placeholder="예) 3000 혹은 -3000" v-if="index !== 0">
        <input type="number" v-model="activity.base_extra_price_option[index]['price']" placeholder="예) 3000 혹은 -3000" v-if="index === 0" disabled>
      </div>
      <button v-show="index > 0" @click="deleteExtraPriceOption(index)">제거</button>
    </div>
    <button class="ui button secondary basic" @click="activity.base_extra_price_option.push({})" v-show="Object.keys(activity.base_extra_price_option).length < 3">추가</button>
  </div>

  <div v-show="page === 10">

    <p>승인 후 문자로 연락 드리겠습니다.</p>
    <p>감사합니다.</p>

    <button class="positive ui button" @click="submit()">수정 신청 하기</button>
  </div>

  <div id='footer'>
    <button class="ui labeled icon button" @click="pageButton('prev')" style="background: rgba(42,195,145,0.2);">
      <i class="left arrow icon"></i>
      이전페이지
    </button>
    <button class="ui right labeled icon button" @click="pageButton('next')" style="background: rgba(42,195,145,0.2);">
      <i class="right arrow icon"></i>
      다음페이지
    </button>
  </div>
</div>

</div>
</template>
<script>
// TODO: 수정하기 페이지는 상세를 예전 버전처럼 trumbow로 바꾼다.
import Trumbowyg from '../../components/Trumbowyg'
import FireUpload from 'components/FireUpload.vue'
import api from 'api'
import moment from 'moment'
import {Storage} from 'src/util'
import Datepicker from 'vuejs-datepicker';
import toolTip from './../../components/ToolTipBox.vue';

export default {
  data() {
    return {
      isFileUploading: false,
      page: 1,
      isTicket: false,
      activity: {
        meetAddress: '',
        address: '',
        base_week_option: { 
          Su: { price_with_time: [], start_time: [], min_user: '0', max_user: '0' },
          Tu: { price_with_time: [], start_time: [], min_user: '0', max_user: '0' },
          We: { price_with_time: [], start_time: [], min_user: '0', max_user: '0' },
          Th: { price_with_time: [], start_time: [], min_user: '0', max_user: '0' },
          Fr: { price_with_time: [], start_time: [], min_user: '0', max_user: '0' },
          Sa: { price_with_time: [], start_time: [], min_user: '0', max_user: '0' },
          Mo: { price_with_time: [], start_time: [], min_user: '0', max_user: '0' } 
        },
        base_price_option: [{ name: '기본', price: '0' }],
        base_extraPrice_option: [{ name: '대인', price: '0' }],
        baseMinUser: '0',
        baseMaxUser: '0',
        close_dates: [],
        category: null,
        base_price: '0',
      },
      wekinRefund: false,
      refundPolicyData: '',
      detailQuestion:  {
        question1: { name: '', images: [] },
        question2: { name: '', images: [] },
        question3: { name: '', images: [] },
        question4: { name: '', images: [] },
        question5: { name: '', images: [] },
      },
      uploadedMainImages: [],
      uploadedMainImage: null,
      checkedDays: [],
      tempWeekData: { 
          Su: "일요일",
          Tu: "화요일",
          We: "수요일",
          Th: "목요일",
          Fr: "금요일",
          Sa: "토요일",
          Mo: "월요일"
      },
      maxStartTimeOfDateCountingList: []
    }
  },
  computed: {
    progressValue() {
      return this.page * 10
    },
    tempEndDate: {
      get() {
        return null
      },
      set(newDate) {
        this.activity.close_dates.push(newDate)
        return null
      }
    },
    user() {
      return this.$store.state.user
    },
  },
  components: {
    Trumbowyg,
    toolTip,
    FireUpload,
    Datepicker
  },
  methods: {
    update (content) {
      this.activity.intro_detail = content
    },
    pageButton(text) {
      switch (text) {
        case 'prev':
          if (this.page > 1) {
            this.page--
          } else {
          }
          break
        case 'next':
          if (this.page < 10) {
            this.page++
          } else {
          }
          break
      }
    },
    subtractBaseWeekPrice(text) {
      let week = this.activity.base_week_option
      if (text === "subtract") {
        this.maxStartTimeOfDateCountingList.splice(-1, 1)
        for (let i in week) {
          week[i].price_with_time.splice(-1,1)
          week[i].start_time.splice(-1,1)
        }
      } else {
        this.maxStartTimeOfDateCountingList.push(0)
        for (let i in week) {
          week[i].price_with_time.push(0)
          week[i].start_time.push('13:00')
        }
      }
    },
    windowAlert(message) {
      window.alert(message)
    },
    setDefaultValueOfWeekOption(event) {
      let id = event.srcElement.id
      let value = event.srcElement.value
      let weekOption = this.activity.base_week_option
      switch(id) {
        case 'minuser': 
          for (let index in weekOption) {
            weekOption[index].min_user = value
          }
          break;
        case 'maxuser': 
          for (let index in weekOption) {
            weekOption[index].max_user = value
          }
          break;
        case 'time': 
          for (let index in weekOption) {
            weekOption[index].start_time[0] = value
            weekOption[index].price_with_time[0] = 0
          }
          break;
      }
    },
    process(value) {
      this.isFileUploading = true
      if (value >= 100) {
        this.isFileUploading = false
      }
    },
    deleteImage(index) {
      this.uploadedMainImages.splice(index, 1)
    },
    deleteQuestionImage(questionNumber, index) {
      let question = 'question' + String(questionNumber)
      this.detailQuestion[question].images.splice(index, 1)
    },
    checkedDaysInclude(text) {
      return this.checkedDays.indexOf(text)
    },
    submit() {
      // TODO: 제출전 형식 검사 해야함
      let params = {
        host_key: this.user.Host.host_key,
        main_image: this.uploadedMainImages,
        title: this.activity.title,
        intro_detail: this.activity.intro_detail,
        schedule: this.activity.schedule,
        inclusion: this.activity.inclusion,
        preparation: this.activity.preparation,
        address_detail: { text: this.activity.address, meet_area: this.activity.meetAddress },
        refund_policy: this.activity.refund_policy || this.refundPolicyData,
        isteamorpeople: 'people',
        category1: this.activity.category,
        category2: this.activity.activity_key,
        start_date: this.activity.start_date,
        end_date: moment(this.activity.end_date).add(1, 'days').format(),
        due_date: this.activity.due_date,
        base_start_time: this.activity.baseStartTime,
        base_price: this.activity.base_price,
        base_min_user: 0,
        base_max_user: 0,
        base_price_option: this.activity.base_price_option,
        base_extra_price_option: this.activity.base_extra_price_option,
        base_week_option: this.activity.base_week_option,
        close_dates: this.activity.close_dates,
        is_it_ticket: this.isTicket,
        ticket_due_date: this.activity.ticketDueDate,
        ticket_max_apply: this.activity.ticketMaxApply,
        detail_question: this.detailQuestion,
        // 수정요청  status 9
        status: 9 
      }
      for (let i = 0; i < params.close_dates; i++) {
        params.close_dates[i] = Number(params.close_dates[i])
      }
      for (let i in params.base_week_option) {
        let item = params.base_week_option[i]
        if (this.checkedDays.indexOf(i)) {
          if (item.price_with_time.length !== item.start_time.length) {
            window.alert("요일별 시작시각, 추가가격 설정부분에 빈칸이 있습니다.")
            return
          }
        } else {
          params.base_week_option[i] = {"price_with_time":[],"start_time":[],"min_user":"0","max_user":"10"}
        }
      }
      if (this.activity.status === 1) {
        params.status = 1
        api.updateActivity(this.activity.activity_key, params)
          .then(result => {
            alert('위킨 수정이 완료되었습니다.')
            window.location.href = '/host/admin'
          })
          .catch(error => {
            alert('에러 메세지' + error + error.message + moment().format() + "정말 죄송합니다. 메이커님 내부 오류가 발생했습니다.\n 해당 화면을 찍어서 카카오톡 플러스친구 '위킨'으로 연락주시면 바로 답변드리겠습니다. 다시한번 불편드려 죄송합니다.")
            return
          })
      } else {
        api.addActivity(params)
          .then(result => {
            alert('위킨 수정 신청이 접수되었습니다.')
            window.location.href = '/host/admin'
          }).catch(error => alert('에러 메세지' + error + error.message + moment().format() + "정말 죄송합니다. 메이커님 내부 오류가 발생했습니다.\n 해당 화면을 찍어서 카카오톡 플러스친구 '위킨'으로 연락주시면 바로 답변드리겠습니다. 다시한번 불편드려 죄송합니다."))
      }
    },
    deleteExtraPriceOption(index) {
      if (index === 0) {
        return
      }
      this.activity.base_extra_price_option.splice(index, 1)
    },
    deletePriceOption(index) {
      if (index === 0) {
        return
      }
      this.activity.base_price_option.splice(index, 1)
    },
    sameAddress() {
      this.activity.address = this.activity.meetAddress
    },
    getPolicy() {
      api.getPolicy()
        .then((result) => this.refundPolicyData = result[0].value.body)
        .then(this.initPolicyCheckbox)
        .catch((error) => console.error(error))
    },
    imageCallback(event, trumbowyg) {
      Storage.imageUpload(event, task => {
        let url = task.snapshot.downloadURL
        let img = url.substring(0, url.indexOf('token') - 1)
        trumbowyg.execCmd('insertImage', img)
        trumbowyg.closeModal()
      }, prg => {})
    },
  },
  created() {
    this.getPolicy()
    let activities = this.$store.getters.hostActivities
    for (let i = 0; i < activities.length; i++) {
      if (activities[i].activity_key === this.$route.params.key) {
        this.activity = Object.assign({}, activities[i])
        this.activity.address = String(activities[i].address_detail.text)
        this.activity.meetAddress = String(activities[i].address_detail.meet_area)
        this.uploadedMainImages = Object.assign({}, activities[i].main_image)
        for (let week in activities[i].base_week_option) {
          if (activities[i].base_week_option[String(week)].start_time.length > 0) {
            // 위킨 수정시 요일 옵션 자동으로 채워지게 해야함kkkkkkkkkkkkkkkkkkkk
            this.checkedDays.push(String(week))
          }
        }
        let tempLength = activities[i].close_dates.length
        this.activity.close_dates = []
        for (let y = 0; y < tempLength; y++) {
          let tmp = activities[i].close_dates[y]
          this.activity.close_dates.push(moment("20" + tmp.slice(1, 3) + "-" + tmp.slice(3, 5) + "-" + tmp.slice(5, 7)).format())
        }
        break;
      } 
    }
    this.detailQuestion = this.activity.detail_question
  },
  mounted() {
    let base_week_option = this.activity.base_week_option
    let maxNumber = 0
    for (let i in base_week_option) {
      if (base_week_option[i].start_time.length >= maxNumber) {
        maxNumber = base_week_option[i].start_time.length
      }
    }
    this.maxStartTimeOfDateCountingList = [...Array(maxNumber).keys()]
    if (maxNumber === 0) {
      this.maxStartTimeOfDateCountingList = [0]
    }
    $.trumbowyg.svgPath = '/static/trumbowyg/dist/ui/icons.svg';
    $('#editor').trumbowyg({
      lang: 'ko',
      btnsDef: {
        // Customizables dropdowns
        align: {
          dropdown: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
          ico: 'justifyLeft'
        },
        image: {
          dropdown: ['upload', 'base64'],
          ico: 'insertImage'
        }
      },
      plugins: {
        // Add imagur parameters to upload plugin
        uploadimage: {
          event: this.imageCallback
        }
      },
      btns: ['viewHTML',
        ['formatting'],
        'btnGrp-test',
        ['align'],
        'btnGrp-lists',
'noembed',
        ['image'],
'fullscreen',
        ['preformatted'],
      ]
    }) 
  }
}
</script>

<style lang="scss" scoped>
@import '/static/trumbowyg/dist/ui/trumbowyg.min.css';
#footer {
  bottom: 200px;
  width: 70%;
  position: absolute;
}
progress {
  position: fixed;
  width: 70%;
  top: 3.7%;
  margin: 2em auto;
  padding: 4px;
  border: 0 none;
  background: rgb(219, 249, 243);
  border-radius: 4px;
  box-shadow: inset 0px 1px 1px rgba(0,0,0,0.05), 0px 1px 0px rgba(255,255,255,0.02);
  z-index: 33;
}
progress::-moz-progress-bar {
  border-radius: 2px;
  background: #fbfff9;
  box-shadow: inset 0 -2px 4px rgba(0,0,0,0.4), 0 2px 5px 0px rgba(0,0,0,0.3);

}
/* webkit */
@media screen and (-webkit-min-device-pixel-ratio:0) {
  progress {
    height: 25px;
  }
}
progress::-webkit-progress-bar {
  background: transparent;
}  
progress::-webkit-progress-value {  
  border-radius: 2px;
  background: rgb(31,196,143);
} 
/* environnement styles */
</style>
