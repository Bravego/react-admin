import React, {Component} from 'react'
import {Row,Col,Modal} from 'antd'
import {withRouter} from 'react-router-dom'

import {formateDate} from '../../utils/utils'
import MemoryUser from '../../utils/MemoryUtils'
import storageUser from '../../utils/storageUtils'
import {reqWeather} from '../../api'
import menuList from '../../config/menuConfig'
import './header.less'
 /*
添加的组件
 */
 class Header extends Component {
    state = {
        date:formateDate(Date.now()),
        dayPictureUrl:'',
        weather:''
    }
    //更新时间
    updateTime=()=>{
        this.intervalId = setInterval(()=>{
            let curTime = formateDate(Date.now())
            this.setState({
                date:curTime
            })
        },1000)
    }
    //退出登录
    logout=()=>{
        Modal.confirm({
            content: '确定要退出登录吗？',
            onOk:()=>{
                //删除本地和内存中的用户数据
                storageUser.removeUser()
                MemoryUser.user = {}
                //跳转到登录界面
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('cancle')
            },
        })
    }
    //获取天气信息
    getWeather=async (city)=>{
         const {dayPictureUrl,weather} = await reqWeather(city)
         this.setState({
             dayPictureUrl,
             weather
         })
     }
    //获取当前要显示的导航名
     getMenuName =(path)=>{
         let menuName
         menuList.forEach(item=>{
             if(item.key === path){
                 menuName = item.title
             }else if(item.children){
                 item.children.forEach(item=>{
                     if(item.key === path){
                         menuName = item.title
                     }
                 })
             }
         })
         return menuName
     }
    componentDidMount(){
        this.updateTime()
        this.getWeather('北京')
    }
    componentWillUnMount(){
        clearInterval(this.intervalId)
    }
    render() {
        const {date,dayPictureUrl,weather} = this.state
        const path = this.props.location.pathname
        let menuName = this.getMenuName(path)
        return (
            <div className='header'>
               <Row className="header-top">
                   <span>{`欢迎，${MemoryUser.user.username}`}</span>
                   <a href="javascript:;" onClick={this.logout}>退出</a>
               </Row>
               <Row className="breadcrumb">
                   <Col span={4} className="breadcrumb-title">
                       <span>{menuName}</span>
                   </Col>
                   <Col span={20} className="weather">
                       <span className="date">{date}</span>
                       <span className="weather-img">
                           <img src={dayPictureUrl} alt=""/>
                       </span>
                       <span className="weather-detail">{weather}</span>
                   </Col>
               </Row>
            </div>
        )
    }
}
export default withRouter(Header)