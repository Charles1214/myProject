<template>
    <div class='FilterBox'>
        <!-- 行 -->
       <Row v-for='i in Rows' :key='i.keys'>
           <!-- 标题 -->
           <Col :span='3'>
           {{i.title}}
           </Col>
           <!-- 复选框 -->
           <Col :span='21'>
           <!-- 复选框题型 -->
           <div v-if="i.type == 'Select'">
                <CheckboxGroup :value='getVbyK(i.keys,i.type)' @on-change='changeFilters(i.keys,$event,i.type)'>
                    <Checkbox  v-for='j in i.options' :key="j" :label='j'>
                        <span>{{j}}</span>
                    </Checkbox>
                </CheckboxGroup>
           </div>
           <!-- 范围条题型 -->
           <div v-if="i.type == 'Range'">
               <Row>
                   <Col :span='12'>
                      <Slider range :value='getVbyK(i.keys,i.type,i.min,i.max,i.rate)' @on-change='changeFilters(i.keys,$event,i.type,i.rate)' :min='i.min/i.rate' :max='i.max/i.rate'></Slider>
                   </Col>
                   <Col :span='11' :offset='1'>
                         <twoButton :min='i.min/i.rate' :max='i.max/i.rate' :value='getVbyK(i.keys,i.type,i.min,i.max,i.rate)'  @click2='changeFilters(i.keys,$event,i.type,i.rate)'></twoButton>
                   </Col>
               </Row>
              
           </div>
           <!-- 日期选择器 -->
           <div v-if="i.type == 'Date'">
                <DatePicker type="daterange" placeholder="Select date" style="width: 200px" :value='getVbyK(i.keys,i.type)' @on-change='changeFilters(i.keys,$event,i.type)'></DatePicker>
           </div>
           </Col>
       </Row>


       <!-- Tag标签 --> 
       <Row>
           <Col :span='3'>
               当前
           </Col>
           <Col :span='21'>
                <!-- 遍历filters中的内容,根据filters中的内容来决定标签是否显示 -->
               <Tag closable v-for='i in filters' :key="i.k" @on-close='delTag(i.k,i.v)'>{{getTitle(i.k)}}:{{changeV(i.k,i.v)}}</Tag>
           </Col>
        </Row>    
    </div>
</template>

<script>
    import moment from 'moment'
    import twoButton from './twoButton.vue'
    export default {
        
       data(){
           return {
               Rows : [
                    //用于抽象筛选器的数据
                    {"type" : "Select" ,"title" : '颜色' , 'keys' : 'color' , 'options' : ['红' , '橙' ,'蓝', '黄' , '绿' , '咖啡' ,'黑' ,'白' ,'灰']},
                    {"type" : "Select" ,"title" : '发动机排量' , 'keys' : 'engine' , 'options' : ['1.0L' , '1.2L' , '1.4L' , '1.6L' , '1.6T', '1.8L', '1.8T', '2.0L', '3.0L' ,'4.0L' , '6.0T']},
                    {"type" : "Select" ,"title" : '燃料' , 'keys' : 'fuel' , 'options' : ['汽油','柴油','油电混合','纯电动']},
                    {"type" : "Select" ,"title" : '变速箱' , 'keys' : 'gearbox' , 'options' : ['自动','手动']},
                    {"type" : "Range" ,"title" : '售价(万元)' , 'keys' : 'price','max' : 110, 'min' : 0 , 'rate' : 1}, 
                    {"type" : "Range" ,"title" : '公里数(万公里)' , 'keys' : 'km' , 'max' : 1000000, 'min' : 0, 'rate' : 10000},
                    {"type" : "Date" ,"title" : '购买日期' , 'keys' : 'buydate' },
                    ]
           }
       },
       methods : {
           //:value读值(单向受控)
           getVbyK(k,type,min,max,rate){
               //遍历Store的filters数组
               const filters = this.$store.state.FilterTable.filters
               for(let i=0;i<filters.length;i++){
                   if(filters[i].k == k){
                       //判断题型，返回v用不同的字母分割
                       if(type == 'Select'){
                           //复选框
                         return filters[i].v.split('v')
                        }else if(type == 'Range'){
                           //范围条(将数据除以rate相当于简单做了一个过滤器)    
                          return filters[i].v.split('to').map(item => Math.round(Number(item)/rate))
                        }else if(type == 'Date'){
                            //日期选择器
                            return filters[i].v.split('to').map(item => new Date(Number(item)))
                        }
                   }
               }
                     //没有找到就返回空数组
               if(type== 'Select'){
                      return []
               }else if(type == 'Range'){
                   //默认让slider撑满
                      return [min/rate,max/rate]
               }else if(type == 'Date'){
                      return []
               }
               
           },
           //on-change发送值
           changeFilters(k,v,type,rate){
               if(type == 'Select'){
                   
                   //复选框
                 this.$store.dispatch('FilterTable/changeFilters',{k,v:v.join('v')})
                 }else if(type == 'Range'){
                   //范围条
                   this.$store.dispatch('FilterTable/changeFilters',{k,v:v.map(item => item*rate).join('to')})
                 }else if(type == 'Date'){
                   //日期选择器
                     this.$store.dispatch('FilterTable/changeFilters',{k,v:v.map(item =>Date.parse(item)).join('to')})
                 }
           },
           //将英文变为中文title
           getTitle(keys){
              //遍历自己的Rows数据,如果传进来的keys等于你遍历到的那一项的keys，就返回那一项的title
              for(let i=0;i<this.Rows.length;i++){
                  if(this.Rows[i].keys == keys){
                      return this.Rows[i].title
                  }
              }
              return ''
           },
           //改变拼接符号v
           changeV(k,v){
               if(k=='color'||k=='engine'||k=='fuel'||k=='gearbox'){
                //正则表达式替换所有的v
                return v.replace(/v/g,'或')
               }else if(k=='price'){
                   //拆成数组，给每一项补万元再变用'到'拼接为字符串
                   return v.split('to').map(item => item + '万元').join('到')
               }else if(k == 'km'){
                   //拆成数组，给每一项按比例换算补万公里再用'到'拼接
                   return v.split('to').map(item => item/10000 + '万公里').join('到')
               }else if(k == 'buydate'){
                   return  v.split('to').map(item => moment(Number(item)).format('YYYY年MM月DD日')).join('到')
               }
           },
           //Tag删除
           delTag(k,v){
               this.$store.dispatch('FilterTable/changeFilters',{k,v:''})
           }


       },
       components : {
             twoButton
       },
       computed:{
           //过滤出filters
           filters(){
               return this.$store.state.FilterTable.filters
           }
       }
    }
</script>

<style scoped lang='less'>
   .ivu-row{
       margin-top: 10px;
   }
</style>