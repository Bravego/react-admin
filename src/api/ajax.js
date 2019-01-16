/*
* 用于与后台交互，发送ajax请求的模块
* */
import axios from 'axios'
import {message} from 'antd'

/**
 * 发送axios请求的封装
 * @param url 请求地址
 * @param data 请求参数
 * @param method 请求方式
 * @returns {Promise} 返回promise对象
 */
export default function ajax(url,data={},method='GET') {
    return new Promise((resolve,reject)=>{
        let promise
        //先判断请求方式
        if(method === 'GET'){
            promise = axios.get(url,{
                params:data
            })
        }else{
            promise =  axios.post(url,data)
        }
        promise
            .then(response=>{
                resolve(response.data)
                console.log(response.data)
        })
            .catch(err=>{
                message.error('请求出错了')
            })
    })
}

