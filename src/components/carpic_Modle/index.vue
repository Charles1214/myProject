<template>
    <div>
             <div class='modle' @click='close'>
                  <!--click.stop阻止事件冒泡 -->
                  <div class="inner" @click.stop=''>
                      <a class='but' @click='close'>×</a>
                      <div class="bigImgBox">
                          <bigImg></bigImg>
                      </div>
                      <div class="rightPart">
                          <carInfo></carInfo>
                          <chooseAlbum></chooseAlbum>
                          <div class='clfix'></div>
                          <smallPic></smallPic>
                      </div>
                  </div>
             </div>
    </div>
</template>

<script>
    import bigImg from './bigImg.vue'
    import carInfo from './carInfo.vue'
    import chooseAlbum from './chooseAlbum.vue'
    import smallPic from './smallPic.vue'
    export default {
        created(){//通知store请求数据
           this.$store.dispatch('carpicStore/init',{id:this.carId})
        },
        props : ['carId'],
        components:{
            bigImg,carInfo,chooseAlbum,smallPic
        },
        methods:{
            close(){
                this.$bus.emit('close')
            }
        }
        
    }
</script>

<style scoped lang='less'>
//清除浮动
.clfix{
  clear: both;
}
.but{
    display: block;
    position: absolute;
    width: 25px;
    height: 25px;
    background-color:tomato;
    right: 0;
    top: 0;
    margin-top: -12.5px;
    margin-right: -12.5px;
    border-radius: 50%;
    text-align: center;
    line-height:25px;
    font-size: 22px; 
    color: beige;
}
 .modle{
     position: absolute;
     width: 100%;
     height: 100%;
     top: 0;
     left: 0;
     background-color: rgba(0, 0,0,.85);
     z-index: 999;

     .inner{
         position: absolute;
         width: 1000px;
         top: 50%;
         left: 50%;
         height: 500px;
         background-color: white;
         margin-left: -500px;
         margin-top: -250px;
    
          .bigImgBox{
              
              float: left;
              width: 750px;
              height: 500px;
             background-color:sandybrown;

               img{
                   width: 100%;
                   height: 100%;
               }
          }
          .rightPart{
              
              float: right;
              width: 250px;
              height: 500px;
              background-color:#131212;;
          }

     }
 }
 

</style>