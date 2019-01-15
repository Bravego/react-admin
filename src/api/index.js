/*
* 多个请求接口的方法的封装，便于在外部使用
* 返回的都是一个promise对象
* */
import ajax from './ajax'

//登录
export function reqLogin(username,password) {
    return ajax('/login',{username,password},'POST')
}

