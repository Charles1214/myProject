<template>
    <div
         <Page :total="total" @on-change='changePage'
          show-sizer @on-page-size-change='changePageSize' :current='page' :page-size='pagesize' :page-size-opts='[10,15,20,30]'/>
    </div>
</template>

<script>
    export default {
        
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
             //用户点击换页按钮
            changePage(page){
               this.$store.dispatch('FilterTable/changePage',{page})
            },
            //用户切换每页条数
            changePageSize(pagesize){
               this.$store.dispatch('FilterTable/changePageSize',{pagesize})
            },
        }
    }
</script>

<style scoped lang='less'>

</style>