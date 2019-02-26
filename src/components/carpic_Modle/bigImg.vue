<template>
    <div v-if='id' class='wrap_img'>
            <!-- 大图的左右按钮 -->
            <div class="leftBtn" @click=goPrev()></div>
            <div class="rightBtn" @click="goNext()"></div>
            <!-- 实例化组件请求数据时，由于是await，会等待数据返回，result为空，所以img报错，加v-if控制即可 -->
            <loadingImg :src="`http://127.0.0.1:8080/api/images/carimages/${id}/${nowAlbum}/${nowAlbumPic}`" :width='750' :height='500'/>
    </div>
</template>

<script>
    export default {
        computed:{
            id(){
                //过滤出汽车的id
                return this.$store.state.carpicStore.result.id
            },
            nowAlbumPic(){
                //过滤出外观图的第一张
                
                return this.$store.state.carpicStore.result.images[this.nowAlbum][this.nowIdx]
            },
            nowAlbum(){
                //过滤出当前相册集名称
                return this.$store.state.carpicStore.nowAlbum
            },
            nowIdx(){
                //过滤出当前图集的图片序号
                
                return this.$store.state.carpicStore.nowIdx
            }
        },
        methods : {
            goNext(){
               this.$store.dispatch('carpicStore/goNext')
            },
            goPrev(){
                this.$store.dispatch('carpicStore/goPrev')
            }
        }
    }
</script>

<style scoped lang="less">
    img{
        width: 100%;
        height: 100%;
    }
    .wrap_img{
        position: relative;

    }
    .leftBtn{
        position: absolute;
        width: 50%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 100000;
        cursor: url(http://icon.zol-img.com.cn/products/v3/picture-cursor-left.cur),auto;
    }
    .rightBtn{
        position: absolute;
        width: 50%;
        height: 100%;
        top: 0;
        right: 0;
        z-index: 1000001;
        cursor: url(http://icon.zol-img.com.cn/products/v3/picture-cursor-right.cur),auto;
    }
</style>