<template>
    <div>
        <InputNumber size='small':min='min' :max='max' :value='value[0]' @on-change='changev0'></InputNumber>~
        <InputNumber size='small':min='min' :max='max' :value='value[1]' @on-change='changev1'></InputNumber>
            {{' '}}
        <Button type='primary' size='small' @click="_clickHandler">确定</Button>
    </div>
</template>

<script>
    export default {
        props : ['min' , 'max' , 'value'],
        data(){
          return {
              v0 : this.value[0],
              v1 : this.value[1]

          }
        },
        methods : {
            _clickHandler(){
                this.$emit('click2',[this.v0,this.v1])
            },
            changev0(v){
                this.v0 = v
            },
            changev1(v){
                this.v1 = v
            }       

        }
    }
</script>

<style scoped>

</style>