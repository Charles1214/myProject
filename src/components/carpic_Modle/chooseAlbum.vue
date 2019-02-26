<template>
    <div>
         <!-- 同理用v-if控制显示，防止初始请求数据请求不到报错 -->
          <ul v-if="$store.state.carpicStore.result.id">
              <li @click="changeAlbum('view')" :class="{'cur':$store.state.carpicStore.nowAlbum=='view'}">外观<br>({{$store.state.carpicStore.result.images.view.length}})</li>
              <li @click="changeAlbum('inner')" :class="{'cur':$store.state.carpicStore.nowAlbum=='inner'}">内饰<br>({{$store.state.carpicStore.result.images.inner.length}})</li>
              <li @click="changeAlbum('engine')" :class="{'cur':$store.state.carpicStore.nowAlbum=='engine'}">发动机<br>({{$store.state.carpicStore.result.images.engine.length}})</li>
              <li @click="changeAlbum('more')" :class="{'cur':$store.state.carpicStore.nowAlbum=='more'}">细节<br>({{$store.state.carpicStore.result.images.more.length}})</li>
          </ul>
    </div>
</template>

<script>
    export default {
        methods:{
            changeAlbum(nowAlbum){
                //注意改变图集dispatch发出，因为涉及到将idx归零
               this.$store.dispatch('carpicStore/changeAlbum',{nowAlbum})
            }
        }
    }
</script>

<style scoped lang='less'>
    div{
        padding: 10px;
    }
    ul li{
        list-style: none;
        float: left;
        width: 100px;
        height: 50px;
        border:1px solid orangered;
        margin-right: 10px;
        margin-top: 10px;
        text-align: center;
        line-height: 20px;
        font-size: 14px;
        padding-top: 5px;
        cursor: pointer;
        color:#f8b757;
    }
    .cur{
        background-color:#606364;    
    }
</style>