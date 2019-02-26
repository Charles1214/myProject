<template>
    <div>
         <h3>当前列顺序(您可以自由拖拽调整顺序哦)</h3>
          <ul>
              <draggable v-model="myArray1" :options='options'>
                <li v-for="element in myArray1" :key="element">{{element}}</li>
             </draggable>
         </ul>
         <h3>当前列顺序(您可以自由拖拽调整顺序哦)</h3>
         <ul>
               <draggable v-model="myArray2" :options='options'>
                <li v-for="element in myArray2" :key="element">{{element}}</li>
              </draggable>
         </ul>
        
        <br>
       
    </div>
</template>

<script>
 import draggable from 'vuedraggable'

    export default {
        created(){
            //读取本地存储
           let sortArr = JSON.parse(localStorage.getItem('colSort'))
           //根据本地存储的顺序组建两个数组
           const dictionary = {
               'id' : 'ID',
               'license' : '是否含牌',
               'avatar' : '缩略图',
               'color' : '颜色',
               'engine' : '发动机排量',
               'exhaust' : '排放标准',
               'fuel' : '燃料',
               'gearbox' : '变速箱',
               'price' : '价格',
               'km' : '公里数',
               'buydate' : '购买日期',
               'brand' : '品牌',
               'series' : '车系'
           }
           
           //遍历sortArr,把所有项推到数组1
           for(let i=0;i<sortArr.length;i++){
               this.myArray1.push(sortArr[i])
           }
           //遍历dictionary,如果不在sortArr里就放到数组中
            for(let k in dictionary){ 
                if(!sortArr.includes(k)){
                    this.myArray2.push(k)
                }
            }
        },
        data(){
            return { 
               myArray1:[],
               myArray2:[],
               options : {animation : 150,group : 'both'}
            }
        },
      components : {
          draggable
      }
    }
</script>

<style scoped lang='less'>
    ul{
        list-style: none;
        overflow: hidden;
        margin-top: 5px;
    }
    li{
        float: left;
        padding: 0 10px;
        margin-bottom: 5px;
        border: 1px solid orangered;
        text-align: center;
        line-height: 40px;
        margin-right: 10px;
        border-radius: 5px;
        background-color:papayawhip
    }
</style>