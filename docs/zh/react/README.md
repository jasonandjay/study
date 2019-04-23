# React
#### 1、虚拟Dom
1. 节约资源
2. 放在内存中
3. 会利用Dom diff 算法
4. 高效
#### 2、react
- 核心库
- React 是一个用于构建用户界面的 JAVASCRIPT 库。
- React主要用于构建UI，很多人认为 React 是 MVC 中的 V（视图）。
- React 起源于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。
- React 起源于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。
- React 拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。
#### 3、react特点
1. **声明式设计** −React采用声明范式，可以轻松描述应用。
2. **高效** −React通过对DOM的模拟，最大限度地减少与DOM的交互
3. **灵活** −React可以与已知的库或框架很好地配合
4. **JSX** − JSX 是 JavaScript 语法的扩展。React 开发不一定使用 JSX ，但我们建议使用它
5. **组件** − 通过 React 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中
6. **单向响应的数据流** − React 实现了单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单
#### 4、react-dom
- 做dom用的 跑在浏览器端
- 渲染/挂载
#### 5、react-native
- native 上面有个 web-view
- 优点: 流畅
- 缺点: 麻烦
#### 6、改变this指向
1. apply 数组时   // 立即执行
2. call // 立即执行
3. bind   返回值：函数(不会执行)
#### 7、react事件
```
e.currentTarget：绑定事件的dom
e.target：触发事件的dom
//阻止事件默认行为
e.preventDefault();
//阻止事件冒泡
e.stopPropagation();
```
#### 8、组件
1. 容器组件  // 有state(只能通过class来定义)
2. 视图组件  // 没有state(渲染出来的,可以通过class和函数来定义)

#### 9、获取元素
- ref   获取dom(refer to缩写)
- findDomNode  获取dom的实例
#### 10、按需加载
封装一个loading组件

```
import React from 'react';
import '../../scss/index.css';
export default ()=>{
    return <div className='load'>
        <img src="/load.gif"/>
    </div>
}
```
样式

```
.load{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    left:0;
    top:0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}
```
react.config.js

```
// 引入路由按需加载的依赖
import Loadable from 'react-loadable';

// 路由未加载完成时显示的load组件
import Loading from '../components/common/loading';

const Detail = Loadable({
    loader:()=>import('../components/Detail'),
    loading:Loading
})

const Index = Loadable({
    loader:()=>import('../components/Index'),
    loading:Loading
})

const Feilei = Loadable({
    loader:()=>import('../components/include/Feilei'),
    loading:Loading
})

```
#### 11、定位

```
// 点击的时候调用这个方法
location(){  // 定位
        let script = document.createElement('script');
        script.src = 'http://pv.sohu.com/cityjson?ie=utf-8';
        document.body.appendChild(script);
        script.onload = ()=>{
            this.setState({
                city:window.returnCitySN.cname
            })
        }
    }
```
