import React, {Component} from 'react'
import {NavLink,withRouter} from 'react-router-dom'
import {Menu,Icon} from 'antd'

import menuList from '../../config/menuConfig'
import './left_nav.less'
import logo from '../../asset/images/logo.png'
 /*
添加的组件
 */
const Item = Menu.Item
const SubMenu = Menu.SubMenu
class LeftNav extends Component {
     getMenus = (list)=>{
        return list.reduce((pre,item)=>{
            if(item.children){
                //返回subMenu类型
                const subMenu = (
                <SubMenu key={item.key}
                 title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                    {this.getMenus(item.children)}
                </SubMenu> )
                pre.push(subMenu)
            }else{
                //返回item类型

                const menu = (<Item key={item.key}>
                    <NavLink to={item.key}>
                        <Icon type={item.icon}/>
                        <span>{item.title}</span>
                    </NavLink>
                </Item>)
                pre.push(menu)
            }

            return pre
        },[])

    }

    componentWillMount(){
        this.menuNodes = this.getMenus(menuList)
    }


    render() {
        const path = this.props.location.pathname


        return (
            <div className='left-nav'>
                <NavLink to="/home">
                    <div className="logo">
                        <img src={logo} alt="logo"/>
                        <h1>硅谷后台</h1>
                    </div>
                </NavLink>
                <Menu
                    defaultSelectedKeys={[path]}//设置被选中，通过key值
                    mode="inline"
                    theme="dark"
                >
                    {/*<Item key="/home">
                        <NavLink to="/home">
                            <Icon type="windows" />
                            <span>首页</span>
                        </NavLink>
                    </Item>
                    <SubMenu key="sub4" title={<span><Icon type="setting" /><span>商品</span></span>}>
                        <Item key="/category">
                            <NavLink to="/category"><span>分类管理</span></NavLink>
                        </Item>
                        <Item key="/product">
                            <NavLink to="/product"><span>商品管理</span></NavLink>
                        </Item>
                    </SubMenu>*/}
                    {
                        this.menuNodes
                    }


                </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)