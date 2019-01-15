import store from 'store'


/*
* 保存，读取，删除用户方法的封装
* */
function setItem(name,value) {
    if(value && typeof value!=='function'){
        store.set(name,value)
    }else{
        alert('不支持保存此类型的数据')
    }
}
function getItem(name) {
    return store.get(name) || ''
}
function removeItem(name) {
    store.remove(name)
}

export default{
    saveUser(user){
        setItem('USER_KEY',user)
    },
    getUser(){
       return getItem('USER_KEY')
    },
    removeUser(){
        removeItem('USER_KEY')
    }
}
