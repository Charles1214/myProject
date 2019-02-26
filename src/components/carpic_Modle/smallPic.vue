<template>
    <div v-if="id" class='wrap' @mouseleave="leaveHandler()"> 
        
         <div class="inner">
              <!-- 控制unit的位置来让右侧的小图图片显示 -->
              <div class='unit' :style="{'left':-230*(nowPage-1) + 'px'}">
              <!-- 决定总页数 -->
                 <ul v-for="i in totalPage" :key="i" >
              <!-- 决定小图个数 -->
                <li v-for="j in 6" :key="j" @click="changeNowIdx((i-1)*6+(j-1))" :class="{'cur2':(i-1)*6+(j-1)==nowIdx}"v-if="(i-1)*6+(j-1)<allImages">
                    <loadingImg 
                    v-if="getSmallPic(i,j)"
                    :src="`http://127.0.0.1:8080/api/images/carimages_small/${id}/${nowAlbum}/${getSmallPic(i,j)}`" :width='100' :height='66.662'/>
                </li>
                </ul>
            </div>
         </div>
         <!-- 总页数分页条(一页不显示分页条) -->
         <div class='pages' v-if="totalPage!=1">
             <!-- 决定分页条个个数 -->
             <span v-for="i in totalPage" :key="i" :style="{'width' : getWidth() + 'px'}" :class="{'cur' : nowPage==(i)}" @mouseenter="changeNowPage(i)"></span>
        </div> 
      
    </div>
</template>

<script>
    export default {
        data(){
           return{
               //当前页数
               nowPage : 1
           } 
        },
        watch : {
            //监控store中的nowIdx，只要发生改变，就返回当前页数，因为当前页数的改变既可以通过span按钮，也可以通过大图上的按钮，所以目的是
            //不管用什么方法，都可以返回当前页
              nowIdx(){
                  this.nowPage = parseInt(this.nowIdx/6) + 1 
              }
        },
         methods:{
            getSmallPic(i,j){
                //可以加v-if来检验这张图
                 return this.$store.state.carpicStore.result.images[this.nowAlbum][(i-1)*6+(j-1)]
            },
            getWidth(){
                //动态算span的宽度(根据页数来算)
                 return (210 - 10*(this.totalPage-1))/this.totalPage
            },
            changeNowPage(page){
                //通过分页条的点击事件来改变当前页数
                this.nowPage = page
            },
            leaveHandler(){
                //重新计算当前的nowPage(因为nowPage影响unit的left值)
                // 1: 当你没点击小图时，store中的nowIdx始终为0，鼠标离开时，拉回第一页
                // 2: 当你点击了第二页的小图，store中的nowIdx变为大于5的数，即使鼠标离开，当前页数也是2，不会拉回第一页
                // 业务目的是，换页不点击图片，离开弹回第一页，换页点击图片，离开不弹回第一页
                this.nowPage = parseInt(this.nowIdx/6) + 1
                
            },
            changeNowIdx(nowIdx){
                //点击每个li(小图)的时候改变nowIdx   
                this.$store.commit('carpicStore/changeNowIdx',{nowIdx})
            }
         },
         computed:{
             allImages(){
                 //当前图集小图的总张数
                 return this.$store.state.carpicStore.result.images[this.nowAlbum].length
            
             },
             totalPage(){
                  //总页数
                  //当前图集的照片总数除以6向上取整，小于六张图就是一页，大于六张图就是两页
                  return Math.ceil(this.$store.state.carpicStore.result.images[this.nowAlbum].length/6)
             },
            id(){
                //过滤出汽车的id
                return this.$store.state.carpicStore.id
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
        }
    }
</script>

<style scoped lang='less'>
    .inner{
        overflow: hidden;
    }
    .wrap{
        padding: 10px;
    }
    .unit{
        width: 3000px;
        position: relative;
        clear: both;
        transition: left ease 1s;
    }
    ul{
        list-style: none;
        float: left;
        width: 230px;
       
    }
    li{
        width: 100px;
        height: 66.662px;
        float: left;
        margin-right: 10px;
        margin-top: 10px;
        position: relative;
        cursor: pointer;

        img{
            width: 100%;
        }

        //加遮罩
        &::before{
           content: "";
           width: 100%;
           height: 100%;
           background:rgba(0,0,0,.6);
           position: absolute;
           transition: all ease 1s;
           z-index: 9999;
        }
    }
        .cur2{
        //加高光
        &::before{
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }
    span{
        display: block;
        height: 15px;
        background-color:lightsalmon;
        float: left;
        margin-right: 10px;
        opacity: 0.8;
        margin-top: 10px;
    }
    .cur{
        background-color:orangered;
    }
  
</style>