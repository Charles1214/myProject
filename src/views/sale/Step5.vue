<template>
    <div>
          <h3>全新图片插件</h3>
          <dropzone :options='dropzoneOptions' id='dropzone'></dropzone>
    </div>
</template>
   
<script> 
     //引入组件
     import vue2Dropzone from 'vue2-dropzone'
     import 'vue2-dropzone/dist/vue2Dropzone.min.css'
    export default {
         data(){
             return {
                 dropzoneOptions : {
                     //图片上传路径
                      url : '/api/upload/',
                    //缩略图的宽度
                      thumbnaiWidth : 150
                 }
             }
         },
         components : {
             //组件注册
             dropzone : vue2Dropzone
         }
    }
</script>

<style scoped>

</style>