<template>
     <!-- 封装一个全局的loading组件 -->
    <div :style="{'width' : width + 'px','height' : height + 'px'}" class='box' v-if="src">
        
         <img :src="src" :style="{'width' :width + 'px','height':height + 'px','display':'none'}" ref="Pic">
         <b ref='Loading'></b>
    </div>

</template>

<script>
    export default {
        //接收父组件传过来的图片属性
        props : ['src','width','height'],
        methods : {
           init(){
                const img = new Image()
                img.src = this.src
                const self = this
                img.onload = function(){
                    // //loading图消失
                    self.$refs.Loading.style.display='none'
                    // //图片显示
                    self.$refs.Pic.style.display='block'  
                     
            }
           }
        },
        mounted(){
            this.init()
        },
        updated(){
            //loading图出来(这个loading相当于占位用)
            this.$refs.Loading.style.display='block'
            //图片隐藏
            
            //再调用
            this.init()
        }

    }
</script>

<style scoped lang='less'>
   .box{
       position: relative;

       b{
           position: absolute;
           width: 60px;
           height: 60px;
           left: 50%;
           top:50%;
           margin-left: -30px;
           margin-top:-30px;
           background: url('../../../public/loading.svg')
       }
   }
</style>