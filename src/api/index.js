/*
* 多个请求接口的方法的封装，便于在外部使用
* 返回的都是一个promise对象
* */
import ajax from './ajax'
import jsonp from 'jsonp'

//登录
export function reqLogin(username,password) {
    return ajax('/login',{username,password},'POST')
}


export function reqWeather(city) {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    return new Promise((resolve,reject)=>{
        jsonp(url,
            {param:'callback'},
            (err,response)=>{
                if(!err && response.status === 'success'){
                    const {dayPictureUrl,weather} = response.results[0].weather_data[0]
                    resolve({dayPictureUrl,weather})
                }else{
                    alert('获取天气信息失败了')
                }
            }
        )
    })
}

