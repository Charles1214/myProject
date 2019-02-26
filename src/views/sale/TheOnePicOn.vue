<template>
    <div class='wrap'>
        <!-- 图片同步上传 -->
         <!-- <form action="http://127.0.0.1:3000/upload" method="post" enctype="multipart/form-data">
             <input type="file" name='file'>
              <input type="submit">
         </form> -->
       
        <div>
            我是一个TheOnPic组件
            <!-- <Button type='primary' class='btn' @click="BTN()">点击选图</Button> -->
            <!-- <input type="file" ref='File' @change="choose()" hidden multiple> -->
            <p>
                <Progress :percent='percent' status='active'></Progress>
            </p>
            <p>
            <img :src="isShow" v-show="isShow != ''" width="80">
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        props:['file'],
        data(){
            return {
                 isShow: '',
                 percent : 0
            }
        },
        //组件上树就执行本地预览
        created(){
               //选择完图片要做的事
                 //创建文件读取器
                   var reader = new FileReader()
                    
                   //读取用户选择的文件,并且转为base64编码
                   reader.readAsDataURL(this.file)
                   //读取完毕
                   const self = this
                   reader.onload = function (v) { 
                       self.isShow = v.target.result
                       //选好图片并且编码完成后自动上传
                       self.goup()
                   }
        },
         methods : {

             //发送异步请求
             goup(){
                 const self = this
                 //创建虚拟表单
                  var form = new FormData()
                 //将图片二进制信息添加到form对象
                 form.append('file',this.file)
                 var xhr = new XMLHttpRequest()
                 //文件上传进度
                 xhr.upload.onprogress = function (e) {
                     //回调中拿到进度比值
                     self.percent = (e.loaded/e.total)*100
                 }
                 //请求服务器并响应的过程
                 xhr.onreadystatechange = function(){
                     if(xhr.readyState == 4){
                        console.log(xhr.responseText)
                     }
                 }
                 xhr.open('post','http://127.0.0.1:8080/api/upload',true)
                 xhr.send(form)

             }
         }
    }
</script>

<style scoped lang='less'>
.btn{
    margin-top: 10px
}
.wrap{
    width: 300px;
    height: 150px;
    border: 1px solid orangered;
    float: left;
    margin-right: 10px;
}
</style>