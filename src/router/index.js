import Vue from 'vue'
import VueRouter from 'vue-router'

import {Message} from 'element-ui'

Vue.use(VueRouter)

let routerPush = VueRouter.prototype.push;
let routerReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch(err => err)
}

const permissionRouter = function(to,from,next){
    // if(this.$store.user.userInfo === "超级管理员"){
    //     next();
    // }else{
    //     Message.error({
    //         message:'没有权限访问',
    //     })
    // }
}

const router = new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            name:'main',
            // redirect: {name:'home'},
            component: ()=> import('@/pages/Main.vue'),
            // children:[
            //     {
            //         path:'/home',
            //         name:'home',
            //         component:()=> import('@/pages/Home/index.vue')
            //     },
            //     {
            //         path:'/user',
            //         name:'user',
            //         component:()=> import('@/pages/User/index.vue'),
            //         beforeEnter:permissionRouter
            //     },
            //     {
            //         path:'/mall',
            //         name:'mall',
            //         component:()=> import('@/pages/Mall/index.vue')
            //     },
            //     {
            //         path:'/other/page1',
            //         name:'page1',
            //         component: () => import('@/pages/Other/Page1.vue')
            //     },
            //     {
            //         path:'/other/page2',
            //         name:'page2',
            //         component: () => import('@/pages/Other/Page2.vue')
            //     }
            // ]
        },
        {
            path:'/login',
            name:'login',
            component: ()=> import('@/pages/Login/index.vue'),
        }
    ]
})

export default router