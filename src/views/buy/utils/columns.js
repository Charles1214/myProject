//将表格中的columns数据抽象出来
import moment from 'moment'
export default (store) =>{
    let o = [{title : 'avatar',
    key : 'avatar', 
    render(h,{row}){
      //给每个img标签包裹一个div，并且div身上有当前汽车内容对应的id
      return h('div',{style:{'width' : '150px','height':'100px'},attrs:{'data-id':row.id}},[
         h('img',{
             //切记设置标签属性用 attrs 对象
             attrs : {
                 src : `http://127.0.0.1:8080/api/images/carimages_small/${row.id}/view/${row.avatar}`,
                 width : '120',
                 height : '80'
             },

         },'')
     ])
  }
 },
 {title : 'Id', key : 'id','sortable' : 'custom'},
 {title : 'Brand', key : 'brand'},
 {title : 'Series', key : 'series'},
 {title : 'Color', key : 'color'},
 {title : 'Engine', key : 'engine'},
 {title : 'Price', key : 'price','sortable':'custom'},
 {title : 'Fuel', key : 'fuel'},
 {title : 'GearBox', key : 'gearbox'},
 {title : 'Km', key : 'km','sortable':'custom'},
 {title : 'Exhaust', key : 'exhaust'},
 {title : 'License', key : 'license',
  render(h,{row}){
      return h('div',{},row.license=true?'是':'否')
  }

 },
 {title : 'BuyDate', key : 'buydate' , 
 render(h,{row}){
     //将时间戳转换成标准事件日期格式
    return h('div',{},moment(row.buydate).format('YYYY年MM月DD日'))
 }
}]

//遍历o数组,看看o数组中谁的key与store中的sort中的sortby相同,就表示按这个对象排序(升降序图标的单项受控)
 for(let i=0; i<o.length; i++){
     if(o[i].key == store.state.FilterTable.sort.sortby){
          //补充键
          o[i].sortType = store.state.FilterTable.sort.sortdirection === 1?'asc':'desc'
     }
 }

 //读取本地存储里title的顺序
 let sortArr = JSON.parse(localStorage.getItem('colSort'))

 //默认暴露函数，返回一个数组，数组的顺序和个数按照本地存储来
 return sortArr.map(item => {
     for(let i=0;i<o.length;i++){
         if(o[i].key == item){
             return o[i]
         }
     }
 })
}
