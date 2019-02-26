
export default {
    namespaced: true,
    state: {
        //当前栏目名字
         column: '',
         subcolumn: '',
         subcolumnCn:'',
         isShow: true //控制menu标签上下树

    },
    mutations:{
        //改变当前栏目
        changeColumn(state,{column,subcolumn,Cn}){
            state.column = column
            state.subcolumn = subcolumn
            state.subcolumnCn = Cn
        },
        //改变isShow
        changeisShow(state,{isShow}){
            
            state.isShow = isShow
            
           
        }
    }
}