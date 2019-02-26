<template>
    <div class='wrap'>
          <img :src="`http://127.0.0.1:8080/api/images/carimages_small/${info.id}/view/${info.avatar}`" >
          <p>{{info.brand}}{{info.series}}</p>
             {{info.price}}万元
             {{info.km |wan}}万公里
             {{info.color}}
             {{info.engine}}
             {{info.gearbox}}
             {{info.id}}
         <p><Button @click="showPic">点击查看本车图集</Button></p>
    </div>
</template>

<script>
    export default {
        props : ['info'],
        created(){
        },
        methods : {
            showPic(){
                this.$bus.emit('isshow',{id : this.info.id})
            }
        }
    }
</script>

<style scoped lang='less'>
     .wrap{
         text-align: center;
         margin-top: 10px;
         border: 1px solid gainsboro
     }
</style>