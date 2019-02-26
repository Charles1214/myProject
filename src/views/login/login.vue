<template>
    <div class='wrap'>
         <div class='inner'>
              <Form ref="formInline" :model="form"  >
                <h3>登录</h3>
                <FormItem prop="user">
                    <Input type="text" v-model="form.username" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="form.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="submit()">Signin</Button>
                </FormItem>
           </Form>
         </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
           data(){
               return {
                   form : {
                       password : '',
                       username : ''
                   }
               }
           },
           methods : {
               //用 axios方法向服务端把用户的账号和密码提交上去
               async submit(){
                   const {token,result} = await axios.post('api/login',{
                          username : this.form.username,
                          password : this.form.password
                    }).then(data => data.data)
                  
                //如果状态吗是1并且下发了token，说明用户登陆成功
                if(result == 1 && token) {
                    //拿到token并存入本地存储
                    localStorage.setItem('token',token)
                    //登陆成功,页面跳转到首页
                    this.$router.push({'name':'index'})
                }else{
                    //否则登陆失败
                    this.$Message.error('请输入正确的用户名和密码')
                }
               }
           }
    }
</script>

<style scoped lang='less'>
      .wrap{
          background-color: bisque;
          position: absolute;
          width: 100%;
          height: 100%;
      }
      .inner{
          position: absolute;
          width: 400px;
          height: 200px;
          left: 50%;
          top: 50%;
          margin-left: -200px;
          margin-top:-100px;
          background-color:lightyellow;
          border-radius: 5px;
          border: 5px solid orangered
      }
      P{
          
          margin-bottom: 20px;
      }
</style>