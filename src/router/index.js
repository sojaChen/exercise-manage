import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push;
const routerReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            name:'main',
            component: ()=> import('@/pages/Main.vue'),
        },
        {
            path:'/login',
            name:'login',
            component: ()=> import('@/pages/Login/index.vue'),
        }
    ]
})

export default router