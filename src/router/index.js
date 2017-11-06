import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/Home.vue'
import Feed from 'views/Feed.vue'
import FeedDetail from 'views/FeedDetail.vue'
import Customer from 'views/Customer.vue'
import Policy from 'views/Policy.vue'
import Login from 'views/Auth/Login.vue'
import KakaoLogin from 'views/Auth/KakaoLogin.vue'
import NaverLogin from 'views/Auth/NaverLogin.vue'
import Join from 'views/Auth/Join.vue'
import ForgotPassword from 'views/Auth/ForgotPassword.vue'
import VerifyEmail from 'views/Auth/VerifyEmail.vue'
import VerifyPhoneNumber from 'views/Auth/VerifyPhone.vue'
import Activity from 'views/Activity/Activity.vue'
import ActivityDetail from 'views/Activity/ActivityDetail.vue'
import Payment from 'views/Payments/Payment.vue'
import PaymentComplete from 'views/Payments/PaymentComplete.vue'
import PersonalPage from 'views/PersonalPage/PersonalPage.vue'
import PersonalPageFeed from 'views/PersonalPage/Feed.vue'
import PersonalPageInterest from 'views/PersonalPage/Interest.vue'
import PersonalPageWekin from 'views/PersonalPage/Wekin.vue'
import PersonalPageBoard from 'views/PersonalPage/Board.vue'
import HostPage from 'views/HostPage/HostPage.vue'
import HostFeed from 'views/HostPage/HostFeed.vue'
import HostReview from 'views/HostPage/HostReview.vue'
import HostWekins from 'views/HostPage/HostWekins.vue'
import RequestForm from 'views/HostAdmin/RequestForm.vue'
import HostAdmin from 'views/HostAdmin/HostAdmin.vue'
import HostHome from 'views/HostAdmin/HostHome.vue'
import HostStats from 'views/HostAdmin/HostStats.vue'
import HostWekinsManagement from 'views/HostAdmin/HostWekinsManagement.vue'
import HostWekinModify from 'views/HostAdmin/HostWekinModify.vue'
import HostWekinAdd from 'views/HostAdmin/HostWekinAdd.vue'
import HostWekinAddNew from 'views/HostAdmin/HostWekinAdd-new.vue'
import HostWekinModifyNew from 'views/HostAdmin/HostWekinModify-new.vue'
import HostBookingsManagement from 'views/HostAdmin/HostBookingsManagement.vue'
import HostBookingMemberList from 'views/HostAdmin/HostBookingMemberList.vue'
import HostBoardsManagement from 'views/HostAdmin/HostBoardsManagement.vue'
import Notification from 'views/Notification.vue'
import HostSettings from 'views/HostAdmin/HostSettings.vue'
import SearchResult from 'views/SearchResult.vue'
import Settings from 'views/Settings.vue'
import Filter from 'views/Filter.vue'
import Search from 'views/Search.vue'
import About from 'views/About.vue'
import Manual from 'views/Manual.vue'
import ExplainMaker from './../views/explainMakerStaticPage.vue'
import EventList from 'components/EventList.vue'
// import Meta from 'vue-meta'

Vue.use(Router)
// Vue.use(Meta)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/manual',
      name: 'Manual',
      component: Manual
    },
    {
      path: '/manual/maker',
      name: 'ExplainMaker',
      component: ExplainMaker
    },
    {
      path: '/notification',
      name: 'Notification',
      component: Notification
    },
    {
      path: '/filter',
      name: 'Filter',
      component: Filter
    },
    {
      path: '/mobileSearch',
      name: 'MobileSearch',
      component: Search
    },
    {
      path: '/feed',
      name: 'Feed',
      component: Feed
    },
    {
      path: '/feed/:key',
      name: 'FeedDetail',
      component: FeedDetail
    },
    {
      path: '/customer',
      name: 'Customer',
      component: Customer
    },
    {
      path: '/policy/:tab',
      name: 'Policy',
      component: Policy
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/auth/kakao',
      name: 'KakaoLogin',
      component: KakaoLogin
    },
    {
      path: '/auth/naver',
      name: 'NaverLogin',
      component: NaverLogin
    },
    {
      path: '/join',
      name: 'Join',
      component: Join
    },
    {
      path: '/verifyEmail',
      name: 'VerifyEmail',
      component: VerifyEmail
    },
    {
      path: '/verify/phonenumber',
      name: 'VerifyPhoneNumber',
      component: VerifyPhoneNumber
    },
    {
      path: '/findPassword',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/activity',
      name: 'Activity',
      component: Activity
    },
    {
      path: '/activity/:key',
      name: 'ActivityDetail',
      component: ActivityDetail
    },
    {
      path: '/activity/:key/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/activity/:key/payment/complete',
      name: 'PaymentComplete',
      component: PaymentComplete
    },
    {
      path: '/search',
      name: 'SearchResult',
      component: SearchResult
    },
    {
      path: '/users/:key',
      name: 'Users',
      component: PersonalPage,
      children: [
        { path: '', name: 'PersonalPage', redirect: 'feed' },
        { path: 'feed', name: 'UserFeed', component: PersonalPageFeed },
        { path: 'interest', name: 'UserInterest', component: PersonalPageInterest },
        { path: 'wekin', name: 'UserWekin', component: PersonalPageWekin },
        { path: 'board', name: 'UserBoard', component: PersonalPageBoard }
      ]
    },
    {
      path: '/host/request',
      name: 'RequestForm',
      component: RequestForm
    },
    {
      path: '/host/admin',
      component: HostAdmin,
      children: [
        { path: '', name: 'HostAdmin', component: HostHome },
        { path: 'stats', name: 'HostStats', component: HostStats },
        { path: 'wekins', name: 'HostWekins', component: HostWekinsManagement },
        // { path: 'wekins/add', name: 'HostWekinsAdd', component: HostWekinAdd },
        // { path: 'wekins/:key', name: 'HostWekinsDetail', component: HostWekinModify },
        { path: 'bookings', name: 'HostBooking', component: HostBookingsManagement },
        { path: 'bookings/:key', name: 'HostBookingDetail', component: HostBookingMemberList },
        { path: 'boards', name: 'HostBoards', component: HostBoardsManagement },
        { path: 'settings', name: 'HostSettings', component: HostSettings },
      ]
    },
    { 
      path: '/wekin/modify/:key', 
      name: 'HostWekinsModifyNew', 
      component: HostWekinModifyNew 
    },
    { 
      path: '/wekin/add', 
      name: 'HostWekinsAddNew', 
      component: HostWekinAddNew 
    },
    {
      path: '/host/:key',
      component: HostPage,
      children: [
        { path: '', name: 'hostPage', redirect: 'feed' },
        { path: 'feed', component: HostFeed },
        { path: 'review', component: HostReview },
        { path: 'wekins', component: HostWekins }
      ]
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/event/:key',
      name: 'EventList',
      component: EventList
    }
  ]
})
