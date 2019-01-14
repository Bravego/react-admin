import React, {Component} from 'react'
import {Form, Input, Button, Icon} from 'antd'

import logo from '../../assets/images/logo.png'
import './index.less'
 /*
添加的组件
 */
export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="图标"/>
                    React项目: 后台管理系统
                </div>
                <div className="login-content">
                    <div className="login-box">
                        <div className="title">用户登录系统</div>
                        <LoginForm/>
                    </div>
                </div>
            </div>
        )
    }
}

/*包含<Form>的被包装组件*/
class LoginForm extends Component{
    checkPassword=(rule,value,callback)=>{//根据自定义的需求，返回响应的结果
        if(!value){
            callback('密码不能为空')
        }else if(value.length<4 || value.length>8){
            callback('密码长度不能低于4位，且不能超过8位')
        }else{
            callback()//成功时调用callback不传参数
        }
    }
    handleLogin=(e)=>{
        e.preventDefault()
        const {validateFields} = this.props.form
        const dataArr = []
        validateFields((err,value)=>{
            if(!err){
                dataArr.push(value.userName,value.password)
                alert(dataArr.join())
            }else{
                alert(err)
                this.props.form.resetFields()
            }
        })
    }
    render(){
        const {getFieldDecorator} = this.props.form
        return (
            <Form className="login-form">
                <Form.Item>
                    {
                        getFieldDecorator('userName',{
                            initialValue:'admin',//设置默认值
                            rules:[
                                {required:true,message:'用户名不能为空'},
                                {min:4,message:""}
                                ]
                        })(
                            <Input placeholder="用户名" prefix={<Icon type="user"/>}/>
                        )
                    }

                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('password',{
                            rules:[{validator:this.checkPassword}]
                        })(
                            <Input placeholder="密码" prefix={<Icon type="safety"/>}/>
                        )
                    }

                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="login-form-button" onClick={this.handleLogin}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
/*
* 包装包含<Form>的组件，生成一个新的组件
* 包装组件会向被包装组件中的props传递一个form属性，
* */
LoginForm = Form.create()(LoginForm)
