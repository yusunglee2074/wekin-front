// 캐싱으로 선언한 API를 Vuex를 이용하여 Store하는 작업.
// Vuex에 대한 설명은 https://vuex.vuejs.org/kr/actions.html 를 참조

import Vue from 'vue'
import Vuex from 'vuex'
import { fetchUser, fetchHostActivities } from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },

  // 액션 : 변이에 대한 커밋을 하기 위함, 비동기 작업을 할 수 있다.
  actions: {
    FETCH_USER: ({ commit, state }) => {
      return state.user                    // state에 저장 된 user가
        ? Promise.resolve(state.user) // 있으면 즉시 반환해주고
        : fetchUser().then(user => commit('SET_USER', { user })) // 없다면, 비동기로 받아온 후 SET_USER에 커밋해준다.
    },
    FETCH_HOST_ACTIVITIES: ({ commit, state }, { hostKey }) => {
      return state.hostActivities
        ? Promise.resolve(state.hostActivities)
        : fetchHostActivities(hostKey).then(activities => commit('SET_HOST_ACTIVITIES', { hostKey, activities }))
    }
  },

  // 변이 : 상태변이, 무조건 동기적이어야 한다. 때문에 비동기적인 작업은 액션에서 처리 후 커밋한다.
  mutations: {
    SET_USER: (state, { user }) => {       // SET_USER가 호출되면
      Vue.set(state, 'user', user)  // Vue 속성에 user정보를 추가한다. user에 key(id), value(user) 삽입
    },
    SET_HOST_ACTIVITIES: (state, { activities }) => {
      Vue.set(state, 'hostActivities', activities) // state.host.wekins = wekins
    }
  },

  getters: {
    user (state) {
      return state.user
    },
    hostActivities (state) {
      return state.hostActivities
    }
  }
})

export default store
