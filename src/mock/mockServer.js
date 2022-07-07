// 引入mockjs
import Mock from "mockjs";

import menu from './menu'
import leftTable from './leftTable'
import order from './order'
import graph from './graph'

const adminToken = "1B3fDbDA99c98b27Cb4AED41BDaFA391";
const userToken = "AeeB4C3CDebf0ce6fbEe2b0F6B63c0fB";

Mock.mock('/mock/login', 'post', (options) => {
    const account = JSON.parse(options.body);
    if (account.username === 'admin' && account.password === 'admin') {
        return {
            code: 200,
            message: '成功',
            data: {
                "token": adminToken,
            }
        }
    } else if (account.username === '123' && account.password === '123') {
        return {
            code: 200,
            message: '成功',
            data: {
                "token": userToken,
            }
        }
    } else {
        return {
            code: 401,
            message: '帐号或密码不正确，请重新输入'
        }
    }
})

Mock.mock("/mock/menu", "post", (options) => {
    if (options.body === adminToken) {
        return { code: 200, message: '成功', data: menu }
    } else {
        const menuData = menu.filter((item) => item.name != 'user')
        return { code: 200, message: '成功', data: menuData }
    }
})

Mock.mock("/mock/userInfo", "post", (options) => {
    if (options.body === adminToken) {
        return {
            code: 200,
            message: '成功',
            data: {
                "name": "Admin",
                "rank": "超级管理员",
                "lastLoginTime": Mock.Random.date(),
                "lastLoginLocation": Mock.Random.city(true),
                "imgUrl": Mock.Random.image('500x500', Mock.mock('@color'), 'C')
            }
        }
    } else if (options.body === userToken) {
        return {
            code: 200,
            message: '成功',
            data: {
                "name": "123",
                "rank": "管理员",
                "lastLoginTime": Mock.Random.date(),
                "lastLoginLocation": Mock.Random.city(true),
                "imgUrl": Mock.Random.image('500x500', Mock.mock('@color'), 'C')
            }
        }
    } else {
        return {
            code: 401,
            message: '失败'
        }
    }
})

Mock.mock("/mock/leftTable", { code: 200, 'data|2-7': leftTable })
Mock.mock("/mock/order", { code: 200, data: order })
Mock.mock("/mock/graph", { code: 200, data: graph })

const data = Mock.mock({
    'goodsData|55': [
        {
            "id": '@id',
            "name": '商品名称',
            "price": '@natural(10, 10000)',
            "shelvingTime": '@date',
            "imgUrl": Mock.Random.image('100x100', Mock.mock('@color'))
        }
    ],
    'userData|55': [
        {
            name: '@cname',
            age: '@natural(18, 60)',
            sex: /男|女/,
            birthday: '@date',
            address: '@county(true)',
            id: '@id',
        }
    ]
})

Mock.mock("/mock/getGoodsList", "get", { code: 200, message: '成功', data: data.goodsData })

Mock.mock("/mock/addGoodsList", "post", (options) => {
    data.goodsData.push(JSON.parse(options.body))
})

Mock.mock("/mock/deleteGoodsList", (options) => {
    data.goodsData.forEach((item, index) => {
        if (item.id === options.body) data.goodsData.splice(index, 1);
    })
    return { code: 200, message: '成功' }
})

Mock.mock("/mock/editGoodsList", "post", (options) => {
    const editGood = JSON.parse(options.body)
    try {
        data.goodsData.forEach((item, index) => {
            if (item.id === editGood.id) {
                data.goodsData.splice(index, 1, editGood);
                throw new Error('LoopInterrupt')
            }
        })
    } catch (e) {
        if (e.message !== 'LoopInterrupt') throw e
    }
    return { code: 200, message: '成功' }
})

Mock.mock("/mock/searchGoodsList", "post", (options) => {
    const keyArr = Object.keys(data.goodsData[0]);
    const dataArr = []
    // const reg = new RegExp(`.*${options.body}.*`);
    // console.log(reg.test(data.goodsData[i][keyArr[j]]));
    for (let i = 0; i < data.goodsData.length; i++) {
        for (let j = 0; j < keyArr.length; j++) {
            if (data.goodsData[i][keyArr[j]] == options.body) {
                dataArr.push(data.goodsData[i]);
                break;
            }
        }
    }
    return { code: 200, message: '成功', data: dataArr }
})

Mock.mock("/mock/saveImg", (options) => {
    console.log(options);
})