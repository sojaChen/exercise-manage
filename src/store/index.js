import Vue from 'vue'
import Vuex from 'vuex'

// 数据持久化插件
import createPersistedState from 'vuex-persistedstate';

import tab from './tab.js'
import user from './user.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        tab,
        user
    },
    plugins:[
        createPersistedState({
            storage:window.sessionStorage,
            paths:['tab.isCollapse','tab.menuList','tab.breadcrumbList','user.userInfo']
        })
    ]
})