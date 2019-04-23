# Redux
##### 1、redux是什么？
- 是一个框架
- 跨组件通信
#### 分四块内容
1. actionTypes
2. actions => {type, payload}
3. reducer
4. store

#### redux三大原则
1. 单一数据源
2. State 是只读的
3. 使用纯函数来执行修改
##### 2、provider
- 只有一个属性，是store
- 顶层容器
##### 3、connect
- 伪高阶函数
- 4个参数

```
1、把redux中state映射成的props传递到组件中去   // 获取state数据
const mapStatetoProps = (state,ownProps)=>{
    // state  redux存储的数据
    // ownProps   组件调用时传过来的props
    // 返回一个对象
}

2、把dispatch操作封装在当前函数里，传递到组件中   // 封装方法
const mapDispatchtoProps = (dispatch, ownProps)=>{
    // 返回一个对象
    return {
        fetchList:()=>{
            axios.get('路径')
            .then(res=>{
                // 触发dispatch
                dispatch({
                    type:'FETCH_LIST',
                    payload:res.data
                })
            })
        }
    }
    
}

3、合并props
const mergeProps = (stateProps, dispatchProps, ownProps)=>{
    // stateProps 是mapStateToProps的返回值
    // dispatchProps 是mapDispatchtoProps的返回值
    // ownProps 是调用时传入的props
    return {...stateProps, ...dispatchProps, ...ownProps}
    
}

4、可选配置项
const options = {
    pure:true
    // pure：表示state需要深拷贝才会响应
    // true 深拷贝(默认true 深拷贝)
    // false 浅拷贝深拷贝都可以
}
```
##### 4、reducer
- 有两个参数：state action
- 接收先前的 state 和 action，并返回新的 state
##### 5、深拷贝和浅拷贝
- 深拷贝 ...
- 浅拷贝 Object.assign()
##### 5、store
- createStore接收两个参数
> reducers 存储数据和修改数据

> applyMiddleware 应用的中间件

##### 6、combineReducers // 合并

```
import {combineReducers} from 'redux';
import cart from './cart';
import my from './my';

export default combineReducers({
    cart,
    my
})
```
