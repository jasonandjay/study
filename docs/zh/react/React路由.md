# React路由
##### 路由模式(2种)
1. hash
 
```
改变地址 -> push     ->  window.location.hash=
         -> replace  -> window.location.replace(url)
hashchange
```

2. browser/history

```
改变地址 -> pushstate  -> window.history.pushState({}, `这是标题`, this.getAttribute('href'));
        ->  replacestate  -> window.history.replaceState({}, `这是标题`, this.getAttribute('href'));
popState
```


#### 1、react-router-dom
- web前段用的
```
Switch
// 只显示匹配的第一个子路由，然后就不往下匹配了


// 当route不给path属性是会匹配路由
<Route component={()=><h1>未匹配路由</h1>}/>

// redirect不给from属性是也会匹配任意匹配
<Redirect exact to='/index'></Redirect>

引入
import {
    HashRouter as Router,   // 使用哈希版本
    Link,   // 相当于vue的router-link
    Redirect,  // 改变重定向
    Route   // 相当于vue的router-view
} from 'react-router-dom';

render(){
        return <Router>
                    <Fragment>
                        <Switch>
                             // 占位标签，如果path与当前路径匹配，渲染component
                             // exact表示精准匹配，当path与当前路径一模一样才匹配
                            <Route exact path="/index" component={()=><h1>我是首页</h1>}/>
                            <Route path="/taobao" component={()=><h1>我是淘宝</h1>}/>
                        </Switch>
                        <footer>
                            // 导航标签 to属性声明要跳转的路径
                            <Link to="/index">首页</Link>
                            <Link to="/taobao">淘宝</Link>
                            <Redirect exact from="/" to="/index"></Redirect>
                        </footer>
                    </Fragment>
            </Router>
    }
```

#### 2、react-router-native
- native用的

#### 3、HashRouter
> 哈希模式(#)  只存在浏览器端，服务器会忽略

> 瞄点：不会刷新浏览器，跳转页面
#### 4、BrowserRouter
> 浏览器模式(localhost:3000/tab)  // 假的url，伪地址
#### 5、后退
- window.history.go(-1)
- window.history.back()

```
<button onClick={()=>{
    window.history.back()
}}>
    后退
</button>
```
#### 6、路由的封装(一级路由)
index.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';

// 封装的类似于router-view的文件
import RouterView from './react/reactView';
// 路由配置
import config from './react/react.config';

ReactDOM.render(<Router>
    <RouterView routes={config.routes}></RouterView>
</Router>,document.getElementById('root'));
```
react/reactView.jsx

```
import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';

export default (props)=>{
    return <Switch>{
        props.routes.map((item,index)=>{
            return <Route key={index} path={item.path} render={(props)=>{
                if(item.children){
                    // 渲染组件
                    // ...props 展开路由信息传递下去
                    // item.children 把子路由配置传递下去
                    return <item.component {...props} routes={item.children}/>
                }else{
                    return <item.component {...props}/>
                }
            }}></Route>
        })
    }
    <Redirect exact from='/' to='/tab'></Redirect>
    </Switch>
}
```
react/react.config.js

```
// 一级路由
import Tab from '../components/Tab.jsx';
import Detail from '../components/Detail.jsx';

// 二级路由
import Hot from '../components/include/Hot.jsx';
import Movie from '../components/include/Movie.jsx';
import My from '../components/include/My.jsx';

export default{
    routes:[
        {
            path:'/tab',
            component:Tab,
            children:[
                {
                    path:'/tab/hot',
                    component:Hot
                }, {
                    path:'/tab/movie',
                    component:Movie
                }, {
                    path:'/tab/my',
                    component:My
                }
            ]
        },{
            path:'/detail',
            component:Detail
        }
    ]
}


```
components/Tab.js

```
import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';

class Detail extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return <div>
            <footer>
                <NavLink to="/tab/hot">热映</NavLink>
                <NavLink to="/tab/movie">电影</NavLink>
                <NavLink to="/tab/my">我的</NavLink>
            </footer>
        </div>
    }
}

export default Detail;
```

