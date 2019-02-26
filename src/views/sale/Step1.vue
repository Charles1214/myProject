<template>
    <div style="width : 500px">
         <Form :model="myform" :label-width="80" :rules='myrules'>
             <!-- Input框 -->
            <FormItem label="用户名" prop='name'>
                <Input v-model="myform.name" placeholder="请填写身份证上的汉语姓名" type='text'></Input>
            </FormItem> 
            <!-- 单选按钮 -->
            <FormItem label='性别' prop='sex'>
                <RadioGroup v-model="myform.sex">
                    <Radio label="男" ></Radio>
                    <Radio label="女"></Radio>
                </RadioGroup>
            </FormItem>
            <!-- Input框 -->
            <FormItem label='身份证号' prop='id'>
                 <Input v-model="myform.id" placeholder="请填写正确的二代身份证号码" type='text'></Input>
            </FormItem>
            <FormItem label='车架号' prop=carID>
                 <Input v-model="myform.carID" placeholder="请填写正确的车架号" type='text'></Input>
            </FormItem>
         </Form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                myform: {},//Form对象
                myrules:{
                    //中文姓名校验
                    name:[
                        {
                            required: true,//必填提醒
                            message: '请务必填写姓名'
                        },
                        {
                            type : 'string',
                            pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,//姓名正则校验
                            message: '请填写正确的姓名'
                        }
                    ],
                    //性别校验
                    sex:[
                        {
                           required:true,
                           message:'请务必勾选性别'
                        }
                    ],
                   //身份证校验
                   id:[
                       {
                           required:true,
                           message:'请务必填写正确的二代身份证号码'
                       },
                       {
                           type:'string',
                           pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,//身份证正则校验
                           message:'请填写正确的身份证号码'
                       }
                   ],
                   //车架号验证
                   carID:[
                        {       
                                trigger:'blur',
                                validator(rule,value,callback ){
                                    console.log(rule)
                                 if(Math.random()>0.5){
                                     callback(new Error('对不起,车架号已经被占用'))
                                 }else{
                                     callback()
                                 }
                            }
                        }
                   ]
                }
            }
        }
    }
</script>

<style scoped>

</style>