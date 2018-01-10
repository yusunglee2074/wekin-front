<template>
  <div style="margin-top:100px; margin-left:200px; width:1200px; position:relative;">
    <progress max="100" :value="progressValue"></progress>   
    <div v-show="page === 1" class="page">
      <h2>기본 정보를 입력해주세요.</h2>
      <h3>위킨 제목 </h3>
      <div class="ui input focus" style="width:300px;">
        <input type="text" v-model="activity.title" @focus="toggleHelpBox('on', 0)" @blur="toggleHelpBox('off', 0)" placeholder="제목을 입력해주세요.">
        <transition name="fade">
          <help-box v-show="helpBox[0]" numbering="0"></help-box>
        </transition>
      </div>
      <h3>카테고리 
      </h3>
      <div class="ui input focus" style="width:300px;">
        <select v-model="activity.category1" class="ui dropdown" style="width: 300px;" @focus="toggleHelpBox('on', 1)" @blur="toggleHelpBox('off', 1)">
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
          <option value="한국체험">한국체험</option>
        </select>
        <transition name="fade">
          <help-box v-show="helpBox[1]" numbering="1"></help-box>
        </transition>
      </div>
      <h2>장소를 입력해주세요.</h2>
      <h3>집결장소</h3>
      <div class="ui input focus" style="width:300px;">
        <input type="text" v-model="activity.meetAddress" id="meetAddress" @focus="toggleHelpBox('on', 2)" @blur="toggleHelpBox('off', 2)" placeholder="집결장소를 입력해주세요. ">
        <transition name="fade">
          <help-box v-show="helpBox[2]" numbering="2"></help-box>
        </transition>
      </div>
      <div style="margin-top:8px;">
        <button class="ui button basic" @click="sameAddress()">
          활동장소도 같음 
        </button>
      </div>
      <h3>활동장소 </h3>
      <div class="ui input focus" style="width:300px;">
        <input type="text" v-model="activity.address" @focus="toggleHelpBox('on', 3)" @blur="toggleHelpBox('off', 3)" placeholder="활동장소를 입력해주세요.">
        <transition name="fade">
          <help-box v-show="helpBox[3]" numbering="3"></help-box>
        </transition>
      </div>
    </div>


    <div v-show="page === 2" class="page" style="position:relative;">
      <h2>상세정보를 사진과 함께 작성해주세요.</h2>
      <div v-show="isFileUploading">
        <h3 style="color:rgba(40,190,140, 1)">파일 업로드 중입니다.</h3>
      </div>
      <p style="margin-bottom: 5px; font-size: 18px;">메이커님의 활동을 간단히 소개해주세요. </p>
      <div class="ui input focus" style="width:300px; display:inline-table;">
        <textarea rows="4" cols="50" v-model="detailQuestion.question1.text" type="text" @focus="toggleHelpBox('on', 4)" @blur="toggleHelpBox('off', 4)"></textarea> 
        <transition name="fade">
          <help-box v-show="helpBox[4]" numbering="4"></help-box>
        </transition>
      </div>

      <div class="ui card" style="width: 70px; height:70px; margin-right:8px; margin-top:0; display:inline-block; vertical-align: top" v-for="(imageUrl, index) in detailQuestion.question1.images" v-bind:key="index">
        <div style="left:2.5px;top:2.5px;background: white;width:92%;height:92%;z-index:222;position:absolute;" v-if="imageUrl">
          <img style="width:100%;height:100%" :src="imageUrl">
          <i class="remove circle outline icon big link" style="width: 30px; height:auto;position:absolute; top:0;right:0" @click="deleteQuestionImage(1, index)"></i>
        </div>
      </div>
      <FireUpload title="사진 업로드" :imageUrl="uploadedMainImage" @prog="prog => process(prog)" @update:imageUrl="val => detailQuestion.question1.images.push(val)"></FireUpload>

      <p style="margin-bottom: 4px; font-size: 18px; margin-top:0;">메이커님의 활동을 하면 어떤 점이 좋나요? </p>
      <div class="ui input focus" style="width:300px; display:inline-table;">
        <textarea rows="4" cols="50" v-model="detailQuestion.question2.text" type="text" @focus="toggleHelpBox('on', 5)" @blur="toggleHelpBox('off', 5)"></textarea>
        <transition name="fade">
          <help-box v-show="helpBox[5]" numbering="5"></help-box>
        </transition>
      </div>

      <div class="ui card" style="width: 70px; height:70px; margin-right:8px; margin-top:0; display:inline-block; vertical-align: top" v-for="(imageUrl, index) in detailQuestion.question2.images" v-bind:key="index">
        <div style="left:2.5px;top:2.5px;background: white;width:92%;height:92%;z-index:222;position:absolute;" v-if="imageUrl">
          <img style="width:100%;height:100%" :src="imageUrl">
          <i class="remove circle outline icon big link" style="width: 30px; height:auto;position:absolute; top:0;right:0" @click="deleteQuestionImage(2, index)"></i>
        </div>
      </div>
      <FireUpload title="사진 업로드" :imageUrl="uploadedMainImage" @prog="prog => process(prog)" @update:imageUrl="val => detailQuestion.question2.images.push(val)"></FireUpload>

      <p style="margin-bottom: 4px; font-size: 18px; margin-top:0;">활동은 어떻게 진행되나요? </p>
      <div class="ui input focus" style="width:300px; display:inline-table;">
        <textarea rows="4" cols="50" v-model="detailQuestion.question3.text" type="text" @focus="toggleHelpBox('on', 6)" @blur="toggleHelpBox('off', 6)"></textarea>
        <transition name="fade">
          <help-box v-show="helpBox[6]" numbering="6"></help-box>
        </transition>
      </div>
      <div class="ui card" style="width: 70px; height:70px; margin-right:8px; margin-top:0; display:inline-block; vertical-align: top" v-for="(imageUrl, index) in detailQuestion.question3.images" v-bind:key="index">
        <div style="left:2.5px;top:2.5px;background: white;width:92%;height:92%;z-index:222;position:absolute;" v-if="imageUrl">
          <img style="width:100%;height:100%" :src="imageUrl">
          <i class="remove circle outline icon big link" style="width: 30px; height:auto;position:absolute; top:0;right:0" @click="deleteQuestionImage(3, index)"></i>
        </div>
      </div>
      <FireUpload title="사진 업로드" :imageUrl="uploadedMainImage" @prog="prog => process(prog)" @update:imageUrl="val => detailQuestion.question3.images.push(val)"></FireUpload>

      <p style="margin-bottom: 4px; font-size: 18px; margin-top:0;">해당 활동에 대해서 메이커님의 꿀팁이 있나요? </p>
      <div class="ui input focus" style="width:300px; display:inline-table;">
        <textarea rows="4" cols="50" v-model="detailQuestion.question4.text" type="text" @focus="toggleHelpBox('on', 7)" @blur="toggleHelpBox('off', 7)"></textarea>
        <transition name="fade">
          <help-box v-show="helpBox[7]" numbering="7"></help-box>
        </transition>
      </div>
      <div class="ui card" style="width: 70px; height:70px; margin-right:8px; margin-top:0; display:inline-block; vertical-align: top" v-for="(imageUrl, index) in detailQuestion.question4.images" v-bind:key="index">
        <div style="left:2.5px;top:2.5px;background: white;width:92%;height:92%;z-index:222;position:absolute;" v-if="imageUrl">
          <img style="width:100%;height:100%" :src="imageUrl">
          <i class="remove circle outline icon big link" style="width: 30px; height:auto;position:absolute; top:0;right:0" @click="deleteQuestionImage(4, index)"></i>
        </div>
      </div>
      <FireUpload title="사진 업로드" :imageUrl="uploadedMainImage" @prog="prog => process(prog)" @update:imageUrl="val => detailQuestion.question4.images.push(val)"></FireUpload>
      <p style="margin-bottom: 4px; font-size: 18px; margin-top:0;">어떤분들에게 좋은 활동일까요? </p>
      <div class="ui input focus" style="width:300px; display:inline-table;">
        <textarea rows="4" cols="50" v-model="detailQuestion.question5.text" type="text" @focus="toggleHelpBox('on', 8)" @blur="toggleHelpBox('off', 8)"></textarea>
        <transition name="fade">
          <help-box v-show="helpBox[8]" numbering="8"></help-box>
        </transition>
      </div>
      <div class="ui card" style="width: 70px; height:70px; margin-right:8px; margin-top:0; display:inline-block; vertical-align: top" v-for="(imageUrl, index) in detailQuestion.question5.images" v-bind:key="index">
        <div style="left:2.5px;top:2.5px;background: white;width:92%;height:92%;z-index:222;position:absolute;" v-if="imageUrl">
          <img style="width:100%;height:100%" :src="imageUrl">
          <i class="remove circle outline icon big link" style="width: 30px; height:auto;position:absolute; top:0;right:0" @click="deleteQuestionImage(5, index)"></i>
        </div>
      </div>
      <FireUpload title="사진 업로드" :imageUrl="uploadedMainImage" @prog="prog => process(prog)" @update:imageUrl="val => detailQuestion.question5.images.push(val)"></FireUpload>
      <br>

    </div>

    <div v-show="page === 3" class="page">
      <h2>준비물 외 아래 정보를 작성해주세요.</h2>
      <h3>준비물 </h3>
      <div class="ui input focus" style="width:300px;">
        <textarea type="text" v-model="activity.preparation" @focus="toggleHelpBox('on', 9)" @blur="toggleHelpBox('off', 9)" placeholder="준비물을 입력해주세요." rows="4" cols="50"></textarea>
        <transition name="fade">
          <help-box v-show="helpBox[9]" numbering="9"></help-box>
        </transition>
      </div>
      <h3>포함/불포함 사항 </h3>
      <div class="ui input focus" style="width:300px;">
        <textarea type="text" v-model="activity.inclusion" @focus="toggleHelpBox('on', 10)" @blur="toggleHelpBox('off', 10)" placeholder="포함/불포함 사항을 입력해주세요." rows="4" cols="50"></textarea>
        <transition name="fade">
          <help-box v-show="helpBox[10]" numbering="10"></help-box>
        </transition>
      </div>
      <h3>상세 일정 </h3>
      <div class="ui input focus" style="width:300px;">
        <textarea type="text" v-model="activity.schedule" @focus="toggleHelpBox('on', 11)" @blur="toggleHelpBox('off', 11)" rows="4" cols="50"></textarea>
        <transition name="fade">
          <help-box v-show="helpBox[11]" numbering="11"></help-box>
        </transition>
      </div>
      <h3>소요 시간</h3>
      <select style="width:300px; height: 36px;" v-model="detailQuestion.requiredTime">
        <option value="1">1시간 이내</option>
        <option value="2">2시간 이내</option>
        <option value="3">3시간 이내</option>
        <option value="4">4시간 이상</option>
      </select>
    </div>

    <div v-show="page === 4" class="page">
      <div style="position:relative;flex:1" v-for="(imageUrl, index) in uploadedMainImages" v-bind:key="index">
      </div>
      <h2>상세페이지에 노출시킬 이미지를 업로드해주세요.</h2>
      <div class="ui card" :style="{ borderStyle: index === 0 ? 'solid' : '', borderColor: 'rgb(40,190,140)' }" style="width: 300px; height:200px; float:left; margin-right:8px;" v-for="(imageUrl, index) in uploadedMainImages" v-bind:key="index">
        <div style="left:12px;top:8px;background: white;width:92%;height:92%;z-index:222;position:absolute;" v-if="imageUrl">
          <img style="width:100%;height:100%" :src="imageUrl">
          <i class="remove circle outline icon big link" style="width: 30px; height:auto;position:absolute; top:0;right:0" @click="deleteImage(index)"></i>
        </div>
      </div>
      <div class="ui card" style="width: 300px; height:200px; margin-right:8px; float:left;" @click.self="toggleHelpBox('on', 12)">
        <div style="width:120px; height:30px; position:absolute; bottom: 46%; left: 36%;">
          <FireUpload title="사진 업로드" :imageUrl="uploadedMainImage" @prog="prog => process(prog)" @update:imageUrl="val => uploadedMainImages.push(val)"></FireUpload>
        </div>
      </div>
    </div>
    <div style="position: absolute;left: 324px; z-index:30;" @click="toggleHelpBox('off', 12)">
      <transition name="fade">
        <help-box v-show="helpBox[12]" numbering="12"></help-box>
      </transition>
    </div>
    <div v-show="isFileUploading && page == 4">
      <h3>파일 업로드 중입니다.</h3>
    </div>

    <div v-show="page === 5" class="page">
      <h2>활동가격에 대해 알려주세요.</h2>
      <h3>기본가격 </h3>
      <div class="ui input focus" style="width:300px;">
        <input @focus="toggleHelpBox('on', 13)" onkeypress='return event.charCode >= 48 && event.charCode <= 57' @blur="toggleHelpBox('off', 13)" type="number" v-model="activity.basePrice" placeholder="숫자만 입력해주세요.">
        <transition name="fade">
          <help-box v-show="helpBox[13]" numbering="13"></help-box>
        </transition>
      </div>
      <div class="ui input focus" style="width:300px; display:block">
        <h3>환불규정 </h3>
        <textarea @focus="toggleHelpBox('on', 14)" @blur="toggleHelpBox('off', 14)" type="text" v-model="refundPolicyData" v-show="wekinRefund" style="width:300px; height:80px;"></textarea> 
        <textarea @focus="toggleHelpBox('on', 14)" @blur="toggleHelpBox('off', 14)" type="text" v-model="activity.refund_policy" v-show="!wekinRefund" style="width:300px; height:80px;"></textarea>
        <transition name="fade">
          <help-box v-show="helpBox[14]" numbering="14"></help-box>
        </transition>
      </div>
      <button class="ui button secondary basic" @click="wekinRefund = !wekinRefund" style="vertical-align: bottom;">위킨환불규정 사용</button> 
      <h3>최소인원 </h3>
      <div class="ui input focus" style="width:300px;">
        <input @focus="toggleHelpBox('on', 15)" @blur="toggleHelpBox('off', 15)" type="number" id="minuser" @change="setDefaultValueOfWeekOption" placeholder="진행할 수 있는 최소 인원을 입력해주세요.">
        <transition name="fade">
          <help-box v-show="helpBox[15]" numbering="15"></help-box>
        </transition>
      </div>
      <h3>최대인원 </h3>
      <div class="ui input focus" style="width:300px;">
        <input @focus="toggleHelpBox('on', 16)" @blur="toggleHelpBox('off', 16)" type="number" id="maxuser" @change="setDefaultValueOfWeekOption" placeholder="진행 가능한 최대 인원을 입력해주세요.">
        <transition name="fade">
          <help-box v-show="helpBox[16]" numbering="16"></help-box>
        </transition>
      </div>
      <h3>활동 시각<span style="font-size:12px;margin-left:5px;color:tomato;">활동시각이 불분명한 경우는 '오전12:00 혹은 00:00'으로 입력바랍니다.</span></h3>
      <div class="ui input focus" style="width:300px;">
        <input @focus="toggleHelpBox('on', 17)" @blur="toggleHelpBox('off', 17)" type="time" id="time" @change="setDefaultValueOfWeekOption">
        <transition name="fade">
          <help-box v-show="helpBox[17]" numbering="17"></help-box>
        </transition>
      </div>
    </div>

    <div v-show="page === 6" class="page">
      <h2>활동 기간을 설정해주세요.</h2>
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
        <h3>등록 시작 날짜 </h3>
        <div class="ui calendar">
          <div class="ui input styled primary left icon" @mouseover="toggleHelpBox('on', 18)" @mouseleave="toggleHelpBox('off', 18)">
            <datepicker 
              v-model="activity.startDate" 
              id="datepickerId" 
              wapper-class="ui input styled primary left icon" 
              language="ko" 
              input-class="width300"
              format="MMM dd(D), yyyy"
              placeholder="날짜선택">
            </datepicker>
            <transition name="fade">
              <help-box v-show="helpBox[18]" numbering="18"></help-box>
            </transition>
          </div>
        </div>
        <h3>등록 종료 날짜 </h3>
        <div class="ui calendar">
          <div class="ui input styled primary left icon" @mouseover="toggleHelpBox('on', 19)" @mouseleave="toggleHelpBox('off', 19)">
            <datepicker 
              v-model="activity.endDate" 
              id="datepickerId" 
              wapper-class="ui input styled primary left icon" 
              language="ko" 
              input-class="width300"
              format="MMM dd(D), yyyy"
              placeholder="날짜선택">
            </datepicker>
            <transition name="fade">
              <help-box v-show="helpBox[19]" numbering="19"></help-box>
            </transition>
          </div>
        </div>
        <h3>몇 일전에 접수 마감 시킬까요? </h3>
        <div class="ui input focus" style="font-size: 18px;" @mouseover.prevent="toggleHelpBox('on', 20)" @mouseleave.prevent="toggleHelpBox('off', 20)">
          
          <label for="one" style="cursor:pointer;"><input type="radio" id="one" value="1" v-model="activity.dueDate"> 1일 전&nbsp;</label>
           
          <label for="two" style="cursor:pointer;"><input type="radio" id="two" value="3" v-model="activity.dueDate">&nbsp; 3일 전&nbsp;</label> 
           
          <label for="three" style="cursor:pointer;"><input type="radio" id="three" value="7" v-model="activity.dueDate">&nbsp; 7일 전</label> 
          <br>
          <transition name="fade">
            <help-box v-show="helpBox[20]" numbering="20"></help-box>
          </transition>
        </div>
        <h3>시작일과 종료일 사이의 활동 요일 체크해주세요. </h3>
        <!--<button @click="isTicket = true">티켓형식으로 변환</button>-->
        <div class="ui input" style="width:380px;display:block;" @mouseover="toggleHelpBox('on', 21)" @mouseleave="toggleHelpBox('off', 21)">
          <input type="checkbox" id="day1" v-model="checkedDays" value="Mo"><label for="day1" style="cursor:pointer;">월요일</label>
          <input type="checkbox" id="day2" v-model="checkedDays" value="Tu"><label for="day2" style="cursor:pointer;">화요일</label>
          <input type="checkbox" id="day3" v-model="checkedDays" value="We"><label for="day3" style="cursor:pointer;">수요일</label>
          <input type="checkbox" id="day4" v-model="checkedDays" value="Th"><label for="day4" style="cursor:pointer;">목요일</label>
          <input type="checkbox" id="day5" v-model="checkedDays" value="Fr"><label for="day5" style="cursor:pointer;">금요일</label>
          <input type="checkbox" id="day6" v-model="checkedDays" value="Sa"><label for="day6" style="cursor:pointer;">토요일</label>
          <input type="checkbox" id="day7" v-model="checkedDays" value="Su"><label for="day7" style="cursor:pointer;">일요일</label>
          <transition name="fade">
            <help-box v-show="helpBox[21]" numbering="21"></help-box>
          </transition>
        </div>
        <div style="clear: both;">
          <br>
          <p style="font-size: 18px;">영업 휴무일을 선택해주세요. </p>
          <div class="ui calendar">
            <div class="ui input styled primary left icon" @mouseover="toggleHelpBox('on', 22)" @mouseleave="toggleHelpBox('off', 22)">
              <datepicker 
                v-model="tempEndDate" 
                id="datepickerId" 
                wapper-class="ui input styled primary left icon" 
                language="ko" 
                input-class="width300"
                format="MMM dd(D), yyyy"
                placeholder="날짜선택">
              </datepicker>
              <transition name="fade">
                <help-box v-show="helpBox[22]" numbering="22"></help-box>
              </transition>
            </div>
          </div>
          <div v-for="(data, index) in activity.closeDates">
            {{ data | formatDateWithMoment }}
            <button @click="activity.closeDates.splice(index, 1)">삭제</button>
          </div>
        </div>
      </div>
      <div v-show="isTicket === null">
        <button class="ui secondary basic button" @click="isTicket = true" >티켓형식</button>
        <button class="ui secondary basic button" @click="isTicket = false">날짜형식</button>
      </div>
    </div>

    <div v-show="page === 7" class="page">
      <h2>각 요일별 상세 옵션을 지정해주세요.</h2>
      <div class="ui form">
        <div class="seven fields">
          <label class="field" style="height:20px; padding:0 30px; font-size:18px; cursor:pointer;">
            월요일 <input type="checkbox" v-model="checkedDays" value="Mo" style="margin-top:3px;">
          </label>
          <label class="field" style="height:20px; padding:0 30px; font-size:18px; cursor:pointer;">
            화요일 <input type="checkbox" v-model="checkedDays" value="Tu" style="margin-top:3px;">
          </label>
          <label class="field" style="height:20px; padding:0 30px; font-size:18px; cursor:pointer;">
            수요일 <input type="checkbox" v-model="checkedDays" value="We" style="margin-top:3px;">
          </label>
          <label class="field" style="height:20px; padding:0 30px; font-size:18px; cursor:pointer;">
            목요일 <input type="checkbox" v-model="checkedDays" value="Th" style="margin-top:3px;">
          </label>
          <label class="field" style="height:20px; padding:0 30px; font-size:18px; cursor:pointer;">
            금요일 <input type="checkbox" v-model="checkedDays" value="Fr" style="margin-top:3px;">
          </label>
          <label class="field" style="height:20px; padding:0 30px; font-size:18px; cursor:pointer;">
            토요일 <input type="checkbox" v-model="checkedDays" value="Sa" style="margin-top:3px;">
          </label>
          <label class="field" style="height:20px; padding:0 30px; font-size:18px; cursor:pointer;">
            일요일 <input type="checkbox" v-model="checkedDays" value="Su" style="margin-top:3px;">
          </label>
        </div>
        <div class="seven fields">
          <div class="field" :class="{ disabled: !checkedDaysInclude('Mo') }">
            <label>최소 ~ 최대인원</label>
            <input style="width:60px; height:24px;" type="number" placeholder="## 명" v-model="activity.baseWeekOption['Mo'].min_user">
            <input style="width:60px; height:24px;" type="number" placeholder="## 명" v-model="activity.baseWeekOption['Mo'].max_user">
          </div>
          <div class="field" :class="{ disabled: !checkedDaysInclude('Tu') }">
            <label>최소 ~ 최대인원</label>
            <input style="width:60px; height:24px;" type="number" placeholder="## 명" v-model="activity.baseWeekOption['Tu'].min_user">
            <input style="width:60px; height:24px;" type="number" placeholder="## 명" v-model="activity.baseWeekOption['Tu'].max_user">
          </div>
          <div class="field" :class="{ disabled: !checkedDaysInclude('We') }">
            <label>최소 ~ 최대인원</label>
            <input style="width:60px; height:24px;" type="number" placeholder="## 명" v-model="activity.baseWeekOption['We'].min_user">
            <input style="width:60px; height:24px;" type="number" placeholder="## 명" v-model="activity.baseWeekOption['We'].max_user">
          </div>
          <div class="field" :class="{ disabled: !checkedDaysInclude('Th') }">
            <label>최소 ~ 최대인원</label>
            <input style="width:60px; height:24px;" type="number" placeholder="## 명" v-model="activity.baseWeekOption['Th'].min_user">
            <input style="width:60px; height:24px;" type="number" placeholder="## 명" v-model="activity.baseWeekOption['Th'].max_user">
          </div>
          <div class="field" :class="{ disabled: !checkedDaysInclude('Fr') }">
            <label>최소 ~ 최대인원</label>
            <input style="width:60px; height:24px;" type="number" placeholder="## 명" v-model="activity.baseWeekOption['Fr'].min_user">
            <input style="width:60px; height:24px;" type="number" placeholder="## 명" v-model="activity.baseWeekOption['Fr'].max_user">
          </div>
          <div class="field" :class="{ disabled: !checkedDaysInclude('Sa') }">
            <label>최소 ~ 최대인원</label>
            <input style="width:60px; height:24px;" type="number" placeholder="## 명" v-model="activity.baseWeekOption['Sa'].min_user">
            <input style="width:60px; height:24px;" type="number" placeholder="## 명" v-model="activity.baseWeekOption['Sa'].max_user">
          </div>
          <div class="field" :class="{ disabled: !checkedDaysInclude('Su') }">
            <label>최소 ~ 최대인원</label>
            <input style="width:60px; height:24px;" type="number" placeholder="## 명" v-model="activity.baseWeekOption['Su'].min_user">
            <input style="width:60px; height:24px;" type="number" placeholder="## 명" v-model="activity.baseWeekOption['Su'].max_user">
          </div>
        </div>
        <div id="timeAndAdditionalPrice" v-for="(data, index) in activity.baseWeekOption[checkedDays[0] || 'Mo'].price_with_time">
          <div class="seven fields">
            <div class="field" :class="{ disabled: !checkedDaysInclude('Mo') }">
              <label>시작시각({{index+1}} 번째)</label>
              <input type="time" style="height:26px;" placeholder="" v-model="activity.baseWeekOption['Mo'].start_time[index]">
            </div>
            <div class="field" :class="{ disabled: !checkedDaysInclude('Tu') }">
              <label>시작시각({{index+1}} 번째)</label>
              <input type="time" style="height:26px;" placeholder="" v-model="activity.baseWeekOption['Tu'].start_time[index]">
            </div>
            <div class="field" :class="{ disabled: !checkedDaysInclude('We') }">
              <label>시작시각({{index+1}} 번째)</label>
              <input type="time" style="height:26px;" placeholder="" v-model="activity.baseWeekOption['We'].start_time[index]">
            </div>
            <div class="field" :class="{ disabled: !checkedDaysInclude('Th') }">
              <label>시작시각({{index+1}} 번째)</label>
              <input type="time" style="height:26px;" placeholder="" v-model="activity.baseWeekOption['Th'].start_time[index]">
            </div>
            <div class="field" :class="{ disabled: !checkedDaysInclude('Fr') }">
              <label>시작시각({{index+1}} 번째)</label>
              <input type="time" style="height:26px;" placeholder="" v-model="activity.baseWeekOption['Fr'].start_time[index]">
            </div>
            <div class="field" :class="{ disabled: !checkedDaysInclude('Sa') }">
              <label>시작시각({{index+1}} 번째)</label>
              <input type="time" style="height:26px;" placeholder="" v-model="activity.baseWeekOption['Sa'].start_time[index]">
            </div>
            <div class="field" :class="{ disabled: !checkedDaysInclude('Su') }">
              <label>시작시각({{index+1}} 번째)</label>
              <input type="time" style="height:26px;" placeholder="" v-model="activity.baseWeekOption['Su'].start_time[index]">
            </div>
          </div>
          <div class="seven fields">
            <div class="field" :class="{ disabled: !checkedDaysInclude('Mo') }">
              <label>시각 추가가격({{index+1}} 번째)</label>
              <input type="number" style="height:26px;" placeholder="#### 원" v-model="activity.baseWeekOption['Mo'].price_with_time[index]">
            </div>
            <div class="field" :class="{ disabled: !checkedDaysInclude('Tu') }">
              <label>시각 추가가격({{index+1}} 번째)</label>
              <input type="number" style="height:26px;" placeholder="#### 원" v-model="activity.baseWeekOption['Tu'].price_with_time[index]">
            </div>
            <div class="field" :class="{ disabled: !checkedDaysInclude('We') }">
              <label>시각 추가가격({{index+1}} 번째)</label>
              <input type="number" style="height:26px;" placeholder="#### 원" v-model="activity.baseWeekOption['We'].price_with_time[index]">
            </div>
            <div class="field" :class="{ disabled: !checkedDaysInclude('Th') }">
              <label>시각 추가가격({{index+1}} 번째)</label>
              <input type="number" style="height:26px;" placeholder="#### 원" v-model="activity.baseWeekOption['Th'].price_with_time[index]">
            </div>
            <div class="field" :class="{ disabled: !checkedDaysInclude('Fr') }">
              <label>시각 추가가격({{index+1}} 번째)</label>
              <input type="number" style="height:26px;" placeholder="#### 원" v-model="activity.baseWeekOption['Fr'].price_with_time[index]">
            </div>
            <div class="field" :class="{ disabled: !checkedDaysInclude('Sa') }">
              <label>시각 추가가격({{index+1}} 번째)</label>
              <input type="number" style="height:26px;" placeholder="#### 원" v-model="activity.baseWeekOption['Sa'].price_with_time[index]">
            </div>
            <div class="field" :class="{ disabled: !checkedDaysInclude('Su') }">
              <label>시각 추가가격({{index+1}} 번째)</label>
              <input type="number" style="height:26px;" placeholder="#### 원" v-model="activity.baseWeekOption['Su'].price_with_time[index]">
            </div>
          </div>
        </div>
        <button class="ui positive basic button" v-show="activity.baseWeekOption['Mo'].price_with_time.length < 3" @click="subtractBaseWeekPrice('add')">시작시각 추가</button>
        <button class="ui negative basic button" v-show="activity.baseWeekOption['Mo'].price_with_time.length == 2 || activity.baseWeekOption['Mo'].price_with_time.length == 3" @click="subtractBaseWeekPrice('subtract')">시작시각 삭제</button>
      </div>

    </div>

    <div v-show="page === 8" class="page">
      <h2>활동에 대한 코스 옵션을 설정해주세요.</h2>
      <h4>*없다면 넘어가도 좋습니다.</h4>
      <div v-for="(value, index) in activity.basePriceOption" style="width:400px;">
        <h3 style="margin: 6px 0 10px; 0;">{{ index + 1 }} 번째 옵션명</h3>
        <div class="ui input focus" style="width:300px;">
          <input @focus="toggleHelpBox('on', 23)" @blur="toggleHelpBox('off', 23)" type="text" v-model="activity.basePriceOption[index]['name']">
          <transition name="fade">
            <help-box v-show="helpBox[23]" numbering="23"></help-box>
          </transition>
        </div>
        <h3 style="margin: 6px 0px;">추가가격 </h3>
        <div class="ui input focus" style="width:300px;">
          <input type="number" v-model="activity.basePriceOption[index]['price']" v-if="index != 0">
          <input type="number" v-model="activity.basePriceOption[index]['price']" v-if="index === 0" disabled>
        </div>
        <button v-show="index > 0" @click="deletePriceOption(index)">제거</button>
      </div>
      <button class="ui button secondary basic" @click="activity.basePriceOption.push({})" style="margin-top:30px;" v-show="Object.keys(activity.basePriceOption).length < 3">추가</button>
    </div>

    <div v-show="page === 9" class="page">
      <h2>결제 추가 옵션 사항이 있나요?</h2>
      <h4>*없다면 넘어가도 좋습니다.</h4>
      <div v-for="(value, index) in activity.baseExtraPriceOption" style="width:400px;">
        <h3 style="margin: 6px 0 10px; 0;">{{ index + 1 }} 번째 옵션명</h3>
        <div class="ui input focus" style="width:300px;">
          <input @focus="toggleHelpBox('on', 24)" @blur="toggleHelpBox('off', 24)" type="text" v-model="activity.baseExtraPriceOption[index]['name']">
          <transition name="fade">
            <help-box v-show="helpBox[24]" numbering="24"></help-box>
          </transition>
        </div>
        <h3 style="margin: 6px 0px;">추가가격</h3>
        <div class="ui input focus" style="width:300px;">
          <input type="number" v-model="activity.baseExtraPriceOption[index]['price']" v-if="index !== 0">
          <input type="number" v-model="activity.baseExtraPriceOption[index]['price']" v-if="index === 0" disabled>
        </div>
        <button v-show="index > 0" @click="deleteExtraPriceOption(index)">제거</button>
      </div>
      <button class="ui button secondary basic" @click="activity.baseExtraPriceOption.push({})" style="margin-top:30px;" v-show="Object.keys(activity.baseExtraPriceOption).length < 3">추가</button>
    </div>

    <div v-show="page === 10" class="page" id="final-page">
      <div style="margin-top:200px;">
        <span style="font-size:30px;">{{ user.Host.name }}</span> <span> 메이커 님! 감사합니다!</span>
      </div>

      <p style="margin-top: 30px;">승인까지 최대 3일이 걸릴 수 있습니다.</p>

      <div style="bottom: -300px;position: absolute;">
        <button class="positive ui button" @click="submit()">신청 하기</button>
      </div>
    </div>

    <div id='footer'>
      <button class="ui labeled icon button" @click="movePage('yusung')" style="background: rgba(42,195,145,0.2);">
        <i class="left arrow icon"></i>
        이전페이지
      </button>
      <button class="ui right labeled icon button" @click="movePage('next')" style="background: rgba(42,195,145,0.2);" v-if="page < 10">
        <i class="right arrow icon"></i>
        다음페이지
      </button>
      <button class="ui button" @click="tmpSave()" style="background: rgba(42,195,145,0.2);margin-left:50px;" v-if="page < 10">
        <i class="save icon"></i>
        임시저장
      </button>
      
    </div>
    <div style="  bottom: 150px;position: absolute;">
      <br>
      <transition name="fade">
        <h4 v-if="tmpNoti !== ''">{{ tmpNoti }}</h4>
      </transition>
    </div>
  </div>

</div>
</template>
<script>
import FireUpload from 'components/FireUpload.vue'
import api from 'api'
import auth from './../../auth'
import moment from 'moment'
import {Storage} from 'src/util'
import Datepicker from 'vuejs-datepicker'
import toolTip from './../../components/ToolTipBox.vue'
import helpBox from './../../components/WekinAddHelpingBox.vue'

export default {
  data() {
    return {
      helpBox: {
        '0': false,
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        '6': false,
        '7': false,
        '8': false,
        '9': false,
        '10': false,
        '11': false,
        '12': false,
        '13': false,
        '14': false,
        '15': false,
        '16': false,
        '17': false,
        '18': false,
        '19': false,
        '20': false,
        '21': false,
        '22': false,
        '23': false,
        '24': false,
        '25': false,
        '26': false,
        '27': false,
        '28': false,
        '29': false,
        '30': false,
        '31': false,
        '32': false,
        '33': false,
        '34': false,
      },
      isFileUploading: false,
      page: 1,
      isTicket: false,
      activity: {
        meetAddress: '',
        address: '',
        baseWeekOption: { 
          Su: { price_with_time: ['0'], start_time: [null], min_user: '0', max_user: '0' },
          Tu: { price_with_time: ['0'], start_time: [null], min_user: '0', max_user: '0' },
          We: { price_with_time: ['0'], start_time: [null], min_user: '0', max_user: '0' },
          Th: { price_with_time: ['0'], start_time: [null], min_user: '0', max_user: '0' },
          Fr: { price_with_time: ['0'], start_time: [null], min_user: '0', max_user: '0' },
          Sa: { price_with_time: ['0'], start_time: [null], min_user: '0', max_user: '0' },
          Mo: { price_with_time: ['0'], start_time: [null], min_user: '0', max_user: '0' } 
        },
        basePriceOption: [{ name: '기본', price: '0' }],
        baseExtraPriceOption: [{ name: '대인', price: '0' }],
        baseMinUser: '0',
        baseMaxUser: '0',
        closeDates: []
      },
      wekinRefund: false,
      refundPolicyData: '',
      detailQuestion:  {
        question1: { name: '', images: [] },
        question2: { name: '', images: [] },
        question3: { name: '', images: [] },
        question4: { name: '', images: [] },
        question5: { name: '', images: [] },
        requiredTime: 1
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
      tmpNoti: ''
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
        this.activity.closeDates.push(newDate)
        return null
      }
    },
    user() {
      return this.$store.state.user
    },
  },
  components: {
    toolTip,
    helpBox,
    FireUpload,
    Datepicker
  },
  methods: {
    movePage (type) {
      this.toggleHelpBox('off', 12)
      var page = this.page
      if (type === 'next') {
          if (page === 1) {
            if (!this.activity.title) {
              alert("제목을 적어주세요")
            } else if (!this.activity.category1) {
              alert("카테고리를 골라주세요")
            } else if (!this.activity.meetAddress || !this.activity.address) {
              alert("주소를 입력해주세요")
            } else {
              this.page++
            }
          } else if (page === 2) {
            let tmpNumber = 0
            for (let index in this.detailQuestion) {
              let images = this.detailQuestion[index].images
              if (images.length === 0) {
                alert("각 항목에 이미지는 최소 한 장씩 업로드 부탁드립니다")
                tmpNumber = 0
                break
              } else {
                tmpNumber++
              }
            }
            if (tmpNumber > 4) {
              tmpNumber = 0
              this.page++
            } else {
              tmpNumber = 0
            }
          } else if (page === 3) {
            if (!this.activity.preparation) {
              alert("준비물을 적어주세요")
            } else if (!this.activity.inclusion) {
              alert("포함/불포함사항을 간단히 적어주세요")
            } else if (!this.activity.schedule) {
              alert("상세일정을 간단히 적어주세요")
            } else {
              this.page++
            }
          } else if (page === 4) {
            if (this.uploadedMainImages.length === 0) {
              alert("메인이미지를 최소 1장 올려주세요")
            } else {
              this.page++
            }
          } else if (page === 5) {
            if (!this.activity.basePrice) {
              alert("가격에는 숫자만 적어주세요")
            } else if (!(document.getElementById("minuser").value > 0)) {
              alert("최소인원은 0보다 큰 숫자여야 합니다")
            } else if (!document.getElementById("maxuser").value) {
              alert("최대인원을 적어주세요")
            } else if (!document.getElementById("time").value.length !== 5 && document.getElementById("time").value[2] !== ':') {
              alert('시각은 HH:mm 형식으로 입력해주세요. 예) 14:00')
            } else {
              this.page++
            }
          } else if (page === 6) {
            if (!this.activity.startDate) {
              alert("등록 시작일을 선택해주세요")
            } else if (!this.activity.endDate) {
              alert("등록 종료일을 선택해주세요")
            } else if (!this.activity.dueDate) {
              alert("접수 마감일을 선택해주세요")
            } else if (this.checkedDays.length === 0) {
              alert("활동 요일을 선택해주세요")
            } else {
              this.page++
            }
          } else if (page === 7) {
            this.page++
          } else if (page === 8) {
            this.page++
          } else if (page === 9) {
            this.page++
          } else {

          }
      } else {
        if (page === 1 && confirm("위킨 수정을 종료 하시겠습니까? 변경 내용은 저장되지 않습니다.")) {
          this.$router.push({ name: "HostWekins" })
        } else {
          this.page--
        }
      }
    },
    toggleHelpBox (swit, index) {
      if (swit === 'on') {
        this.helpBox[index] = true 
      } else {
        this.helpBox[index] = false 
      }
    },
    subtractBaseWeekPrice(text) {
      let week = this.activity.baseWeekOption
      if (text === "subtract") {
        for (let i in week) {
          week[i].price_with_time.splice(-1,1)
          week[i].start_time.splice(-1,1)
        }
      } else {
        for (let i in week) {
          week[i].price_with_time.push(null)
          week[i].start_time.push(null)
        }
      }
    },
    windowAlert(message) {
      window.alert(message)
    },
    setDefaultValueOfWeekOption(event) {
      let id = event.srcElement.id
      let value = event.srcElement.value
      let weekOption = this.activity.baseWeekOption
          console.log("하핫", value)
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
          if (value.length !== 5 && value[2] !== ':') {
            return alert('시각은 HH:mm 형식으로 입력해주세요. 예) 14:00')
          }
          for (let index in weekOption) {
            weekOption[index].start_time[0] = value
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
      return this.checkedDays.indexOf(text) > -1 ? true : false
    },
    setNotiArea(text) {
      this.tmpNoti = text
    },
    tmpSave() {
      confirm("저장되었습니다.\n임시저장은 같은 컴퓨터에서만 불러올 수 있습니다. \n빠른시간내에 마저 작성 부탁드립니다.")
      this.setNotiArea("저장 성공.")
      localStorage.setItem('tmpActivityData', JSON.stringify(this._data));
    },
    tmpLoad() {
      if(localStorage.tmpActivityData) {
        if(confirm("임시저장 된 데이터를 불러오시겠습니가?")) {
          let tmp = JSON.parse(localStorage.tmpActivityData)
          this.activity = tmp.activity
          this.checkedDays = tmp.checkedDays
          this.detailQuestion = tmp.detailQuestion
          this.uploadedMainImages = tmp.uploadedMainImages
          this.setNotiArea('불러오기 성공.\n 기존의 파일은 삭제되었으니 저장을 원하시면 다시한번 임시저장 부탁드립니다.')
          localStorage.removeItem('tmpActivityData')
        }
      }
    },
    submit() {
      for (let index in this.activity.baseWeekOption) {
        if (!(this.checkedDays.indexOf(index) > -1 ? true : false)) {
          this.activity.baseWeekOption[index] = { price_with_time: [], start_time: [], min_user: '0', max_user: '0' }
        } else {
          for (let i = 0; i < this.activity.baseWeekOption[index].start_time.length; i++) {
            if (this.activity.baseWeekOption[index].start_time[i] === null) {
              this.activity.baseWeekOption[index].start_time = this.activity.baseWeekOption[index].start_time.slice(0, i)
              this.activity.baseWeekOption[index].price_with_time = this.activity.baseWeekOption[index].price_with_time.slice(0, i)
            }
          }
        }
      }
      // TODO: 제출전 형식 검사 해야함
      let params = {
        host_key: this.user.Host.host_key,
        main_image: { image: this.uploadedMainImages },
        title: this.activity.title,
        intro_detail: $('#editor').trumbowyg('html'),
        schedule: this.activity.schedule,
        inclusion: this.activity.inclusion,
        preparation: this.activity.preparation,
        address_detail: { text: this.activity.address, meet_area: this.activity.meetAddress },
        refund_policy: this.activity.refund_policy || this.refundPolicyData,
        isteamorpeople: 'people',
        category1: this.activity.category1,
        category2: '임시 카테고리',
        start_date: this.activity.startDate,
        end_date: moment(this.activity.endDate).format(),
        due_date: this.activity.dueDate,
        base_start_time: this.activity.baseStartTime,
        base_price: this.activity.basePrice,
        base_min_user: this.activity.baseMinUser,
        base_max_user: this.activity.baseMaxUser,
        base_price_option: this.activity.basePriceOption,
        base_extra_price_option: this.activity.baseExtraPriceOption,
        base_week_option: this.activity.baseWeekOption,
        close_dates: this.activity.closeDates,
        is_it_ticket: this.isTicket,
        ticket_due_date: this.activity.ticketDueDate,
        ticket_max_apply: this.activity.ticketMaxApply,
        detail_question: this.detailQuestion
      }
      for (let i in params.base_week_option) {
        let item = params.base_week_option[i]
        if (this.checkedDays.indexOf(i) > -1 ? true : false) {
          if (item.price_with_time.length !== item.start_time.length) {
            window.alert("요일별 시작시각, 추가가격 설정부분에 빈칸이 있습니다.")
            return
          }
        } else {
          item = {"price_with_time":[],"start_time":[],"min_user":"0","max_user":"0"}
        }
      }
      auth.getCurrentUser()
        .then(user => {
          return api.addActivity(params)
        })
        .then(result => {
          alert('위킨 신청이 완료되었습니다. 승인 후 연락드리겠습니다.')
          window.location.href = '/host/admin'
        })
        .catch(error => alert('에러 메세지' + error + error.message + moment().format() + "정말 죄송합니다. 메이커님 내부 오류가 발생했습니다.\n 해당 화면을 캡쳐해서 카카오톡 플러스친구 '위킨'으로 연락주시면 바로 답변드리겠습니다. 다시한번 불편드려 죄송합니다."))
    },
    deleteExtraPriceOption(index) {
      if (index === 0) {
        return
      }
      this.activity.baseExtraPriceOption.splice(index, 1)
    },
    deletePriceOption(index) {
      if (index === 0) {
        return
      }
      this.activity.basePriceOption.splice(index, 1)
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
  },
  mounted() {
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
    this.tmpLoad()
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

.page {
  position: relative;
  width: 80%;
}
.helpImage {
  width: 50%;
  height: auto;
  position:absolute;
  top:30px;
  right:50px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
<style>
.width300 {
  width: 300px!important;
}
#final-page {
  font-size: 20px;
  font-family: 'Spoqa Han Sans', sans-serif;;
}
#final-page p {
  font-weight: 200;
}
#final-page span {
  font-weight: 300;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 2.9s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
