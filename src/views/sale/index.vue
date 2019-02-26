<template>
    <div>
        
          <Layout>
              <Content :style="{'padding' : '0 50px' , 'margin' : '10px'}">
               <Card>
                   <!-- 步骤条 -->
                     <Steps :current="step - 1" >
                        <Step :title="Steps(1)" content='填写车辆基本信息'></Step>
                        <Step :title="Steps(2)" content='上传车辆外观、内饰、发动机、更多图片'></Step>
                        <Step :title="Steps(3)" content='车辆网盘、上传行驶本、保单、大绿本'></Step>
                        <Step :title="Steps(4)" content='总部审核'></Step>
                        <Step :title="Steps(5)" content='全新上传图片展示'></Step>
                     </Steps>
               </Card>
                   <!-- 用is指令根据步骤生成组件 -->
               <div :is="'step' +step"></div>
             </Content>
          </Layout>
    </div>
</template>

<script>
    import step1 from './Step1.vue'
    import step2 from './Step2.vue'
    import step3 from './Step3.vue'
    import step4 from './Step4.vue'
    import step5 from './Step5.vue'
    export default {
          computed : {
              step(){
                  //过滤当前步骤
                  return this.$store.state.saleCarStore.step
              }
          },
          methods : {
                Steps(n){
                    //动态让title根据当前步骤而显示
                   if(n == this.step){
                       return '进行中'
                   }else if(n > this.step){
                       return '待进行'
                   }else if(n < this.step){
                       return '已完成'
                   }
                }
          },
          components : {
              step1,step2,step3,step4,step5
          }
    }
</script>

<style scoped>

</style>