<template>
    <div>
         <h3>{{$store.state.carpicStore.result.brand}}{{$store.state.carpicStore.result.series}}</h3>
         <h4>{{$store.state.carpicStore.result.price}}万元
             {{$store.state.carpicStore.result.km |wan}}万公里
             {{$store.state.carpicStore.result.color}}
             {{$store.state.carpicStore.result.engine}}
             {{$store.state.carpicStore.result.gearbox}}
         </h4>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang='less'>
    div{
        padding: 10px
        
    }
   h3{
       font-size: 22px
   }
   h4{
       font-size: 15px
   }

</style>