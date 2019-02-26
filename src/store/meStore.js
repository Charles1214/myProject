export default {
    namespaced : true,
    state : {
        username : '',
        avatar : ''
    },
    mutations : {
        changeUsername(state,{username}){
           state.username = username
          
        },
        changeAvatar(state,{avatar}){
            
            state.avatar = avatar
            
        }
    },
    actions : {

    }
}