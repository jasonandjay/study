# Redux中间件
##### 1、applyMiddleware
- 方便调试，实时触发，线下使用

```
import {createStore，applyMiddleware} from 'redux';
import reducers from './reducers';
import Logger from 'redux-logger';

export default createStore(reducers, applyMiddleware(Logger))
```
##### 2、redux-thunk
- 目的：异步解决方案
- 支持action的写法有对象变为函数
- 可以发送多个dispatch
- 改变action
- 同时会帮我们注入两个参数dispatch和getState
- 在异步操作完成之后再触发dispatch操作
```
dispatch((dispatch, getState)=>{
    // getState可以获取全局的state
    dispatch({
        type:"START"
    })
    fetch('/data.json')
    .then(res=>res.json())
    .then(success=>{
        if(success){
            dispatch({
                type:"FETCH_LIST",
                payLoad:success.arr
            })
        }else{
            dispatch({
                type:"FETCH_TAIL"
            })
        }
    })
})
```
##### 3、redux-saga
- 拦截请求
- 解决异步
- 不会改变action
- take 拦截
- takeEvery 每次都拦截
##### 4、redux-thunk
- 改写action
