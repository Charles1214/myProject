<template>
<!-- 给最外层大盒子添加点击事件，传入$event,事件委托用 -->
    <div class='BigTable' ref='BigTable' @click='clickHandler($event)' >
         <Row>
             <Col :span='16'><h3>通过筛选,共有({{total}})辆车符合条件</h3></Col>
             <!-- 唤醒模态框的按钮 -->
             <Col :span='2' offset='6'><Button shape='circle' icon='ios-search' @click='showModle'></Button></Col>
            
         </Row>


        </br>
        <!-- 表格 -->
       <Table :columns="columns" :data="results" v-if='total' @on-sort-change='changeSort'></Table>
       <div class="h10"></div>
       <!-- 分页条 -->
       <!-- <Page :total="total" @on-change='changePage' show-sizer @on-page-size-change='changePageSize' :current='page' :page-size='pagesize'/> -->
      

      <!-- 模态框 -->
     <div v-if="isShowModle">
      <Modal
        :value='true'
        @on-ok='ok'
        @on-cancel='cancel'
        title="自定义">
        <changeColSort ref='ccs'/>
       </Modal>
     </div>
      
    </div>
</template>

<script> 
    import getColumns from '../utils/columns.js'
    import changeColSort from './changeColSort'
    export default {
       created(){
           //组件上树时pagesize设置为10,为了不和BigGrid组件相互影响
        this.$store.dispatch('FilterTable/changePageSize',{pagesize : 10})
       },
        data(){
            return {
               columns:getColumns(this.$store), //引入将表格中column抽象过后的包(默认暴露一个函数，函数返回数组)
               isShowModle:false //模态框的显示
            }
        },
        computed: {
            //过滤所有车信息
            results(){
                return this.$store.state.FilterTable.results
            },
            //过滤总条数
            total(){
                return this.$store.state.FilterTable.total
            },
            //过滤当前页
            page(){
                return this.$store.state.FilterTable.page
            },
            //过滤每页条数
            pagesize(){
                return this.$store.state.FilterTable.pagesize
            }

        },
        methods : {
            //事件委托(目的是点击avatar图唤醒弹出层)
            //实现原理，利用event.target实现
            clickHandler(event){
                //判断点击的最底层的标签对象是img
                if(event.target.nodeName=== 'IMG'){
                    if(event.target.parentNode.hasAttribute('data-id')){
                        this.$bus.emit('isshow',{'id':event.target.parentNode.getAttribute('data-id')})
                //event.target是点击的每一个最底层的标签对象,parentNode为父节点
                    }
                }
            },
            //用户点击换页按钮
            changePage(page){
               this.$store.dispatch('FilterTable/changePage',{page})
            },
            //用户切换每页条数
            changePageSize(pagesize){
               this.$store.dispatch('FilterTable/changePageSize',{pagesize})
            },
            //用户改变排序
            changeSort({key,order}){
               this.$store.dispatch('FilterTable/changeSort',{key,order})
            },
            //显示模态框
            showModle(){
                this.isShowModle = true
            },
            cancel(){
                this.isShowModle = false
            },
            ok(){
                //读取用户拖拽改变的数组
                const arr = this.$refs.ccs.myArray1
                //写入本地存储
               
                localStorage.setItem('colSort',JSON.stringify(arr))
                //更改列(重新赋值)
                this.columns = getColumns(this.$store)
                //关闭模态框
                this.isShowModle = false
            }
        },
        components : {
            changeColSort 
        }
    }
</script>

<style scope lang='less'>
.BigTable{
    margin-top: 15px;
}
 div[data-id]{
     cursor: pointer;
 }
 .h10{
     height: 10px;
 }
</style>