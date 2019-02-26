export default {
    namespaced : true,
    state:{
        id : 0,//当前汽车id
        result:{},
        nowAlbum:'view',//当前图集名称
        nowIdx:0//当前图集中图的序号
    },
    mutations:{
          changeResult(state,{result}){
              state.result = result      
          },
          //改变当前图集
          changeAlbum(state,{nowAlbum}){
              state.nowAlbum = nowAlbum    
          },
          //改id
          changeID(state,{id}){
             state.id = id      
          },
          //改变当前图集图片序号
          changeNowIdx(state,{nowIdx}){
            state.nowIdx = nowIdx    
          }
    },
    actions:{
        async init({commit},{id}){
            const {result} = await fetch('http://127.0.0.1:8080/api/car/'+id).then(data=>data.json())
            commit('changeResult',{result})//改变result拿到每辆车的数据
            commit('changeAlbum',{nowAlbum:'view'})//每次初始化让图集变回第一个
            commit('changeID',{id:id})//改变id
            commit('changeNowIdx',{nowIdx:0})//初始nowIdx为0
        },
        //注意，若想改变两个变量，要写在actions中，mutatios里的变量各自管各自
        changeAlbum({commit},{nowAlbum}){
            commit('changeAlbum',{nowAlbum})
            commit('changeNowIdx',{nowIdx : 0})
        },
        //bigImg右按钮改图集当前图片序号
        goNext({commit,state}){
            //如果当前图集的图片序号小于图集的图片个数减1(小图的序号从零开始)，就让图片序号加一,换到下一张小图
            if(state.nowIdx<state.result.images[state.nowAlbum].length-1){
               //拿第一个图集来说，当序号变成3的时候，满足小于4，让图片序号变成4，不满足条件，不执行下一次
               commit('changeNowIdx',{nowIdx : state.nowIdx+1})
            }else {
            //判断当前图集和要切换图集
            if(state.nowAlbum=='view'){
               commit('changeAlbum',{nowAlbum : 'inner'})      
            }else if( state.nowAlbum =='inner'){
               commit('changeAlbum',{nowAlbum : 'engine'})
            }else if( state.nowAlbum == 'engine'){
               commit('changeAlbum',{nowAlbum : 'more'})
            }else if(state.nowAlbum == 'more'){
               commit('changeAlbum',{nowAlbum : 'view'})
            }
            //换完图集之后让小图序号归零
            commit('changeNowIdx',{nowIdx : 0})
    }
},
      goPrev({commit,state}){
        if(state.nowIdx > 0){
            //当前小图序号大于零，点击左按钮后，让小图序号减一，换到上一张小图
            commit('changeNowIdx',{nowIdx : state.nowIdx-1})
         }else {
         //小图序号为零，再点击左按钮就要换图集
         if(state.nowAlbum=='view'){
            commit('changeAlbum',{nowAlbum : 'more'})      
         }else if( state.nowAlbum =='more'){
            commit('changeAlbum',{nowAlbum : 'engine'})
         }else if( state.nowAlbum == 'engine'){
            commit('changeAlbum',{nowAlbum : 'inner'})
         }else if(state.nowAlbum == 'inner'){
            commit('changeAlbum',{nowAlbum : 'view'})
         }
         //换完图集让小图序号为最后一个
         commit('changeNowIdx',{nowIdx : state.result.images[state.nowAlbum].length-1})
        }
      }

}}