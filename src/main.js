 //需要引用的包
import Vue from 'vue'
import App from './App.vue'
import storeConfig from './store/index.js'
import Vuex from 'vuex'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueRouter from 'vue-router'
import routeConfig from './router/routeConfig.js'
import VueBus from 'vue-bus'
import loadingImg from './components/loadingImg/loadingImg.vue' 
import axios from 'axios'
import { nextTick } from 'q';
// import { Math } from 'core-js';

//需要激活的包
Vue.use(Vuex)
Vue.use(iView)
Vue.use(VueRouter)
Vue.use(VueBus)

//实例化router和store
const store = new Vuex.Store(storeConfig)
const router = new VueRouter(routeConfig)

//路由守卫
router.beforeEach(async function (to,from,next){ //路由跳转之前
    //只要去的不是login界面，就要对me接口进行查询,看你是否登陆
    const token = localStorage.getItem('token') //得到本地存储的token
    const {login,username,avatar} = await axios.get('/api/me?token=' + token).then(data=>data.data)// 去服务端比对token验证是否登陆并且拿到服务端返回的登陆信息
   
    if(to.name !== 'login'){//如果跳转过去的页面不是login页面

      if(!login||!username){ //如果没登陆
       
         next({name:'login'})//强制打回登陆界面
      }else{
        
        next() //登陆了就放行
        store.commit('meStore/changeUsername',{username}) 
        store.commit('meStore/changeAvatar',{avatar}) 
      }
        
    }else {
        next()
    }
    
})

router.afterEach((to)=>{ //路由跳转之后
    store.commit('routerStore/changeColumn',{column:to.meta.column,subcolumn:to.meta.subcolumn,Cn:to.meta.Cn})
    store.commit('routerStore/changeisShow',{isShow : false})
})

//定义过滤器
Vue.filter('wan',function(str){
    return Math.round(str/10000)
})

//定义全局组件(lodingImg)
Vue.component('loadingImg',loadingImg)

//根实例
new Vue ({
  el : '#app',
  render(h){
    return h(App)
  },
  store,//vuex
  router//路由
})