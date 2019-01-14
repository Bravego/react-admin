import React, {Component} from 'react'
import {Route,BrowserRouter,Switch} from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

 /*
应用根组件
 */
export default class App extends Component {

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path='/login' component={Login}/>
                        <Route path='/' component={Admin}/>
                    </Switch>
                </BrowserRouter>

            </div>
        )
    }
}