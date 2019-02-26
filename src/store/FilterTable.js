import querystring from 'querystring'
import { inherits } from 'util';
export default {
    namespaced : true,
    state:{
        page:1,//页码
        pagesize:10,//每页显示的数据条数
        results:[],//本页数据
        total:0,//数据总数
        sort:{//排序
            sortby:'id',
            sortdirection:1
        },
        //筛选器
        filters:[
            // {'k' : 'buydate' , 'v' : '1356969600000to1388505600000'}
            //    {'k' : 'price' , 'v' : '0to100'}
            //    { 'k' : 'engine' , 'v' : '3.0Lv1.6L' }

        ]
    },
    mutations:{
        //改变当前页
        changePage(state,{page}){
            state.page = page
        },
        //改变每页显示数据条数
        changePageSize(state,{pagesize}){
            
            state.pagesize = pagesize
        },
        //改变results
        changeResults(state,{results}){
            state.results = results
        },
        //改变数据总条数
        changeTotal(state,{total}){
            state.total = total
        },
        //改变排序
        changeSort(state,{sortby,sortdirection}){
            state.sort.sortby = sortby
            state.sort.sortdirection = sortdirection
        },
        //筛选器的增删改
        filter_add(state,{k,v}){
            state.filters.push({k,v})
        },
        filter_del(state,{k,v}){
            state.filters = state.filters.filter(item => item.k!=k)
        },
        filter_update(state,{k,v}){
            state.filters = state.filters.map(item => item.k==k?{...item,v}:item)
        }
    },
    actions:{
        async init ({commit,state}){

            //准备querystring里对象的参数
            const page = state.page
            const pagesize = state.pagesize
            const sortby = state.sort.sortby
            const sortdirection = state.sort.sortdirection

            //查询对象(需要后缀的参数)
            let queryObj = {
                //数据展示方式参数
                 page,
                 pagesize,
                 sortby,
                 sortdirection
                 //数据筛选类型参数
            }
            
            //遍历filters数组，给查询对象添加键
            for(let i=0;i<state.filters.length;i++){
                queryObj[state.filters[i].k] = state.filters[i].v
                
            }

            const {results,total} = await fetch('http://127.0.0.1:8080/api/findcar?' + querystring.stringify(queryObj)).then(item => item.json())
            
 
            commit('changeResults',{results})
            commit('changeTotal',{total})
        },
        //改当前页
        changePage({commit,dispatch},{page}){
            commit('changePage' , {page} )
            dispatch('init')
        },
        //改每页显示的数据条数
        changePageSize({commit,dispatch},{pagesize}){
            
            commit('changePageSize',{pagesize})
            dispatch('init')
        },
        //改变排序
        changeSort({commit,dispatch},{key,order}){
               commit('changePage',{'page' : 1})
               commit('changeSort',{'sortby' : key, 'sortdirection' : order=='asc'? 1:-1})
               dispatch('init')

        },
        //改变filters里的k,v,决定增删改
        changeFilters({dispatch,commit,state},{k,v}){
            

            //先判断传进来的k在filters中是否存在
            let isHave = false //默认不存在
            for(let i=0;i<state.filters.length;i++){
                //如果传进来的k在filters中存在，说明筛选的这一项有
                if(state.filters[i].k == k){
                    isHave = true
                }
            }
           
           //存在和不存在分别执行的事情
           if(isHave){
               //存在
               if(v==''){
                   
                   //v如果为空
                   commit('filter_del',{k,v})
                  
               }else{
                   //v不为空
                   commit('filter_update',{k,v})
                  
               }  
           }else{
               //不存在
               commit('filter_add',{k,v})
               
           }
          
          //页码归一
          commit('changePage',{page : 1})
          //执行查询
           dispatch('init')

            
        }

    }
}