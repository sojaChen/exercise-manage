// 引入mockjs
import Mock from "mockjs";

import menu from './menu'
import leftTable from './leftTable'
import order from './order'
import graph from './graph'

Mock.mock("/mock/menu", { code: 200, data: menu })
Mock.mock('/mock/login', 'post', (options) => {
    const account = JSON.parse(options.body);
    if (account.username === 'admin' && account.password === 'admin'){
        return {
            code:200,
            data:{
                "name":"Admin",
                "rank":"超级管理员",
                "lastLoginTime":Mock.Random.date(),
                "lastLoginLocation":Mock.Random.city(true)
            }
        }
    }else{
        return {
            code:301,
            message:'用户名或密码不匹配'
        }
    }
})
Mock.mock("/mock/leftTable", { code: 200, 'data|2-7': leftTable })
Mock.mock("/mock/order", { code: 200, data: order })
Mock.mock("/mock/graph", { code: 200, data: graph })
Mock.mock("/mock/addPersonDataList", "post", (option) => {
    console.log(option);
})