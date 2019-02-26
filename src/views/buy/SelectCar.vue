<template>
    <div >
        <!-- 筛选器 -->
        <FilterBox></FilterBox>
        <!-- 切换试图按钮 -->
           <RadioGroup  type="button" class='RG' v-model="view">
                <Radio label="table_view">表格视图</Radio>
                <Radio label="grid_view">网格视图</Radio>
           </RadioGroup>
          <!-- 表格 -->
        <BigTable v-if="view == 'table_view'"></BigTable>
        <BigGrid v-if="view == 'grid_view'"></BigGrid>
        <div class='h10'></div>
        <!-- 共用的分页条 -->
        <myPage></myPage>
    </div>
</template>

<script>
import FilterBox from './components/FilterBox.vue'
import BigTable from './components/BigTable.vue'
import BigGrid from './components/BigGrid.vue'
import myPage from './components/myPage.vue'
    export default {
        data(){
            return {
                view : 'table_view'
            }
        },
        created(){
        //表格上树时请求数据
        this.$store.dispatch('FilterTable/init')
        //设置本地存储(默认)
        if(!localStorage.getItem('colSort')){
            //如果本地没有colSort,就设置colSort
            localStorage.setItem('colSort',JSON.stringify(['price','series','brand','avatar','color','engine']))
        }
        },
        methods : {
            isshow(id){
                
                this.$bus.emit('isshow',{id})
            }
        },
        components : {
            FilterBox,BigTable,BigGrid,myPage
        },
        computed: {
            results(){
                return this.$store.state.FilterTable.results
            }
        }
    }
</script>

<style scoped lang='less'>
.RG{
    margin-top: 15px
}
.h10{
    height: 5px;
}
</style>