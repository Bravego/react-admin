import React, {Component} from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import {Row,Col} from 'antd'

import MemoryUser from '../../utils/MemoryUtils'
import storageUser from '../../utils/storageUtils'

import LeftNav from '../../components/left_nav/left_nav'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Home from '../../pages/home/home'
import Category from '../../pages/category/category'
import Product from '../../pages/product/product'
import User from '../../pages/user/user'
import Role from '../../pages/role/role'
import Pie from '../../pages/charts/pie'
import Line from '../../pages/charts/line'
import Bar from '../../pages/charts/bar'

import './admin.less'
 /*
添加的组件
 */
export default class Admin extends Component {
    render() {
        //判断内存中是否有值，没值的话，就跳转到登录界面
        const user = MemoryUser.user

        if(!user || !user._id){
            return <Redirect to='/login'/>
        }
        return (
            <Row className="container">
                <Col span={4}>
                    <LeftNav></LeftNav>
                </Col>
                <Col span={20} className="main">
                    <Header/>
                    <div className="content">
                        {/*定义路由组件，路由组件要在哪里显示就在哪里定义路由*/}
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/user' component={User}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </div>
                    <Footer/>
                </Col>
            </Row>
        )
    }
}