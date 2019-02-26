<template>
   <div>
     <!-- 弹出层 -->
     <carpicModle v-if="isshowCarpic" :carId='carId'></carpicModle>
     <!-- 加key解决组件复用页面不刷新的问题 -->
     <router-view></router-view>
     <!-- 抽屉 -->
     <userInfodrawer :isshowDrawer='isshowDrawer'></userInfodrawer>
   </div>
</template>

<script>
import carpicModle from './components/carpic_Modle/index.vue'
import userInfodrawer from './components/userInfo_drawer/index.vue'
  export default {
      //解决办法1   加key
      //  computed:{
      //    key(){
      //       return this.$store.state.routerStore.column
      //    }
      //  }
      components: {
        carpicModle,userInfodrawer
      },
      data(){
        return {
          isshowCarpic : false,  //控制弹出层的显示
          isshowDrawer : false, //控制抽屉的显示
          carId : null
        }
      },
      mounted(){
         const self=this
         //监听事件开启弹出层
         this.$bus.on('isshow',function({id}){
              self.isshowCarpic = true
              self.carId = id
         }),
         //监听事件关闭弹出层
         this.$bus.on('close',function(){
              self.isshowCarpic = false
         }),
         //监听开启抽屉
         this.$bus.on('isshowDrawer',function (){
             self.isshowDrawer = true
            
         }),
         //监听关闭抽屉
         this.$bus.on('hideDrawer',function(){
             self.isshowDrawer = false
         })
      }
  }
</script>

<style scoped lang="less">
</style>