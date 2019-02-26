<template>
    <div >
        <!-- 选图按钮 -->
          <Button type='primary' class='btn' @click="BTN()">点击选图</Button>
          <input type="file" ref='File' @change="choose()" hidden multiple>
          <!-- 根据用户勾选的图片个数生成组件 -->
          <TheOnePicOn v-for="(i,index) in files" :key="index" :file='i'></TheOnePicOn>
          <div class='box' ref="box"></div>

    </div>
</template>

<script>
    import TheOnePicOn from './TheOnePicOn'
    export default {
         data(){
             return {
                 isShow: '',
                 percent : 0,
                 files : []
             }
         },
         methods : {
             doupAll(){
                   
             },
               //选择完图片要做的事
             choose(){ 
                  this.files = this.$refs.File.files
             },
               //js 模拟点击事件
             BTN(){
                    var clickEvent=document.createEvent('MouseEvent'); // 1.创建一个鼠标事件类型
                    clickEvent.initMouseEvent('click',false,false,window,0,0,0,0,0,false,false,false,false,0,null); // 2.初始化一个click事件
                    this.$refs.File.dispatchEvent(clickEvent); // 3.派发(触发)
             }
         },
         components : {
             TheOnePicOn
         },
         //拖拽上传
        mounted(){
            
            //阻止默认事件
           document.addEventListener('drop', function (e) {
                e.preventDefault();
            }, true);

            document.addEventListener('dragleave', function (e) {
                e.preventDefault();
            }, true);

            document.addEventListener('dragenter', function (e) {
                e.preventDefault();
            }, true);

            document.addEventListener('dragover', function (e) {
                e.preventDefault();
            }, true);


            const self = this;
            // 绑监听
            this.$refs.box.addEventListener('drop', function (e) {
                e.preventDefault();
                self.files = e.dataTransfer.files;
            }, true);
        }
    }
</script>

<style scoped lang='less'>
   .box{
       width: 1000px;
       height: 500px;
       border: 1px solid palevioletred
   }
</style>