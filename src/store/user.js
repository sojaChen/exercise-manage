export default {
    namespaced:true,
    state:{
        userInfo:{}
    },
    mutations:{
        setUserInfo(state,value){
            state.userInfo = value
        },
        removeUserInfo(state){
            state.userInfo = {}
        }
    }
}