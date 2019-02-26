<template>
    <div v-if='results.length!=0'>
         <Row v-for="i in 5 " :key='i' :gutter='10'>
              <Col v-for="j in 3" :key="j" :span='8'>
                 <oneGrid v-if='results[(i-1)*3+(j-1)]' :info='results[(i-1)*3+(j-1)]'/>  
              </Col>
         </Row>
    </div>
</template>

<script>
    import oneGrid from './oneGrid.vue'
    export default {
        created(){
                  
               this.$store.dispatch('FilterTable/changePageSize',{pagesize : 15})
               
        },
        data (){
            return {

            }
        },
        computed: {
            results(){
                return this.$store.state.FilterTable.results
            }
        },
        components : {
            oneGrid
        }
    }
</script>

<style scoped>

</style>