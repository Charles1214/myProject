<template>
    <div>  
        <Drawer title="Basic Drawer" :closable="false" :value='isshowDrawer' :width='500' @on-close='close'>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Drawer>
    </div>
</template>

<script>
    export default {
        props : ['isshowDrawer'],
        data(){
             return {
                
             }
         },
         methods : {
             close(){
                 //关闭抽屉
                 this.$bus.emit('hideDrawer',true)
             }
         }
    }
</script>

<style scoped lang='less'>

</style>