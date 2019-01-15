import React from 'react'
import ReactDom from 'react-dom'

import MemoryUser from './utils/MemoryUtils'
import storageUser from './utils/storageUtils'

import App from './App'
//读取local中是否有值，有的话保存到内存中
const user = storageUser.getUser()

if(user && user._id){
    MemoryUser.user = user
}

ReactDom.render(<App/>,document.getElementById('root'))
