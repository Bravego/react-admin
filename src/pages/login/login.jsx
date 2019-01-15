import React, {Component} from 'react'
import {Form,Icon,Input,Button} from 'antd'
import PropTypes from 'prop-types'

import {reqLogin} from '../../api'
import storageUser from '../../utils/storageUtils'
import MemoryUser from '../../utils/MemoryUtils'


import logo from '../../asset/images/logo.png'
import './index.less'
 /*
login组件
 */
export default class Login extends Component {
    state = {
        errorMsg:''
    }
    login = async (username,password)=>{
        //发送请求
        const result = await reqLogin(username,password)
        console.log(result.status)
        //判断是否请求成功
        if(result.status === 0){
            //保存用户
            const user = result.data
            storageUser.saveUser(user)
            MemoryUser.user = user

            //跳转到admin界面
            this.props.history.replace('/')
        }else{

            //更新状态，提示错误信息
            this.setState({
                errorMsg:result.msg
            })

        }

    }
    render() {
        const {errorMsg} = this.state
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="网页的logo"/>
                    React:后台管理项目
                </div>
                <div className="login-content">
                    <div className="login-box">
                        <div className="error-msg-wrap">
                            <div className={errorMsg ? "show" : ""}>
                                {errorMsg}
                            </div>
                        </div>
                        <div className="title">用户管理系统</div>
                        <LoginForm login={this.login}/>
                    </div>
                </div>
            </div>
        )
    }
}
class LoginForm extends Component{
    //声明
    static propTypes = {
        login:PropTypes.func.isRequired
    }
    //编程式验证
    checkPassword=(rule,value,callback)=>{
        if(!value){
            callback('请输入密码')
        }else if(value.length<4 || value.length>12){
            callback('密码长度不能少于4位，并不能超出12位')
        }else{
            callback()
        }
    }
    handleLogin=(e)=>{
        const {validateFields,resetFields}=this.props.form
        const login = this.props.login

        e.preventDefault()
        validateFields(async (err,value)=>{
            if(!err){
               //获取用户输入的信息
                const {username,password}=value
                //console.log(username,password)
               //调用login函数
                login(username,password)
            }else{
                resetFields()
            }
        })

    }
    render(){
        const {getFieldDecorator} = this.props.form
        return <Form className="login-form">
            <Form.Item>
                {
                    getFieldDecorator('username',{
                        initialValue:'admin',
                        rules:[
                            {required:true,message:'请输入用户名'},
                            {min:4,message:'用户名不能少于4位字符'}
                        ]
                    })(
                        <Input placeholder="用户名" prefix={<Icon type="user"/>}/>
                    )
                }

            </Form.Item>
            <Form.Item>
                {
                    getFieldDecorator('password',{
                        rules:[
                            {validator:this.checkPassword}
                        ]
                    })(
                        <Input placeholder="密码" prefix={<Icon type="lock"/>}/>
                    )
                }

            </Form.Item>
            <Form.Item>
                <Button type="primary" className="login-form-button" onClick={this.handleLogin}>登录</Button>
            </Form.Item>
        </Form>
    }
}

/*
* 为了操作表单中的一些东西，比如验证信息，收集信息等比较复杂的操作，
* 就可以利用antd表单中的一些方法
* 首先，需要将整个表单包装一下
*       生成一个包装后的新组件，向被包装组件中传递一个form属性
* */
LoginForm=Form.create()(LoginForm)