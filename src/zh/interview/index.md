---
title: 面试必备知识点
sidebar: auto
sidebarDepth: 2
---
# 面试必备知识点
## HTML
- Html5语义化标签
- Html5新特性
- SEO(搜索引擎优化)
    - 搜索关键词：title,keywords,description
    - SSR(服务端渲染) VS SPA
        - next
        - nuxt
- 兼容：IE9以下支持H5标签，html5shim
- H5的嵌套
    - web里iframe标签
    - 其他地方(小程序，客户端，桌面端，嵌入式),webview组件

## CSS
- 盒模型
    - 标准模式和怪异模式
    - 修改盒模型
- CSS的单位及应用场景(px,rem,em,rpx,vw,vh,百分比,calc)
- CSS优先级
- CSS模块化：CSS Module & Scoped
- CSS模块化的覆盖：global, \deep\
- BFC(Block Formating Context) & IFC
    - [BFC](https://blog.csdn.net/mevicky/article/details/47008939)
    - 边距折叠
    - 清除浮动
    - 双栏、三栏布局
- 元素定位
    - static
    - relative
    - absolute
    - fixed
    - inherited
    - sticky
- 不定宽高垂直居中
    - 弹性盒
    - 0000+auto
    - transform(-50%)
    - display:table-cell
- 圣杯布局、双飞翼布局
    - 弹性盒
    - 浮动+padding
    - 浮动+BFC
- 浮动和清除浮动
    - 父元素创建BFC
    - 浮动元素后面追加一个元素
    - 伪元素
- 响应式
    - 栅格布局，百分比定宽
    - rem，vw，vh，rpx
    - 媒体查询
- CSS处理器
    - 预处理 SCSS&LESS
    - 后处理 postcss & autoPrefix

## 原生JS  
- 数据类型
    - 堆和栈
    - 深浅拷贝
        - JSON.parse(JSON.stringify),
        - [...], {...}
        - slice, concat, Object.assign
        - lodash, _cloneDeep
    - 深浅比较
- 原型链
    - 显示原型prototype
    - 隐式原型__proto__
    - 构造函数constrctor
    - 实例化new

```js
function searchProto(obj, property){
    while(obj){
        console.log('obj...', obj);
        if (obj.hasOwnProperty(property)){
            return obj[property]
        }else{
            obj = obj.__proto__;
        }
    }
    return undefined;
}
```

- 继承  
    - 基于原型链的继承
    - 基于构造函数的继承：call
    - 组合继承
    - 寄生组合继承
- 面向对象
    - 改变this指向：call,apply,bind
    - 使用eval实现call,apply,bind
    - new做的三件事情
        1. var obj = {}
        2. obj.__proto__ = A.prototype
        3. var result = A.call(obj, ...arguments)
    	4. return result instanceof Object ? result : obj;
    - 无new实例化

```js
function Func(){
    if (this instanceof Func){
        
    }else{
        return new Func(...arguments);
    }
}
```
- 作用域链
- 闭包
	- 定义&表现形式
	- 闭包原理
	- 闭包优缺点
- 事件
    - 事件模型：捕获->目标->冒泡
    - 事件三要素：事件类型，事件源，事件处理函数
    - DOM0级事件，2级事件，3级事件
    - 事件委托/代理
        - target 触发事件的元素
        - currentTarget 监听事件的元素
    - 事件优化
    	- 防抖
    	- 截流
- event loop
    - 任务类型
        - 同步任务
        - 异步任务
            - Micro Task(Promise, MutationObserve, process.nextTick)
            - Macro Task(setTimeout, setImmediate, setInterval, Ajax, requestAnimationFrame)
    - 调度机制
- 垃圾回收&内存泄漏
- 输入URL到呈现
- 持久化存储
- Promise
    - 三个状态：fulfilled, pennding, rejected
    - 两个方法：resolve, reject
    - 静态方法：all, race, reoslve, reject
    - 原生实现
- Generator函数及自动执行器
- Set、Map、Proxy


## Vue
- 深入Vue的响应原理?
- 手动实现发部订阅
- 手动实现简单MVVM
- Vue多版本之间的区别（运行时依赖，运行时编译）?
- Vue中computed、watch与methods的区别
- 多种指令与自定义指令
- 路由传参与导航守卫
- Keep-Alive
- Vue.use及封装一个插件
- Element UI && so on
- Api组件的实现
- Vue-cli3.0的搭建和配置覆盖

## React
- [jsx的原理](https://babeljs.io/repl#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=MYewdgzgLgBApgGzgWzmWBeGAKAUDGAHgBMBLANxmAQEMIIA5G1DAIilKiVYD58CYAC0QIQhCAAcaYKrXpMWrUOjRReAdxAAnBMQCEhAPSTpfAkbLk-ASly5l0GJZhYSFWXUbM4bBKWisTjRQNAC0EFrAbIJQUBIAXIaG6ikAdABGNKTEAK6poMiGpMg0AOZwvIAA5oAB3oCqyoAhbgBWEAAe_AJEljwAghYUPG5WAEJ9VoM8AMKjZh1EEyDIQzCGMx3T7QK4AGY5YMAc4DDzyN3YElogEhDWAN64AJBacFA5WjLjN-eXEKlQcC1QAC-60Bdh2ewOMmOQ2wtweTxeb06_UIx26MD-ALYgFNzQBXgV8rkNWCsQUA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=&prettier=false&targets=&version=7.4.4&externalPlugins=)
	- jsx格式
	- React.createElement
	- {$$typeof, props, key...}
```jsx
// jsx
const element = (
  <div className="title">
    hello<span className="content">world!</span>
  </div>
)
// React.createElement
var element = React.createElement("div", {
  className: "title"
}, "hello", React.createElement("span", {
  className: "content"
}, "world!"));
// 原生对象
{
    "$$typeof": Symbol(react.element),
    "type": "div",
    "key": null,
    "ref": null,
    "props": {
        "className": "title",
        "children": [
            "hello",
            {
                "$$typeof": Symbol(react.element),
                "type": "span",
                "key": null,
                "ref": null,
                "props": {
                    "className": "content",
                    "children": "world!"
                },
                "_owner": null
            }
        ]
    },
    "_owner": null
}
```
- virtual dom & dom diff
    - dom diff流程
        1. 用对象表示dom节点
        2. 创建虚拟dom树，，父子关系使用children
        3. 创建新的dom树
        4. 对比两个dom树，产生patches
        5. apply patches
    - 虚拟dom树和真实dom树
    - dom diff算法几个问题
        - 传统树的算法的时间复杂度为O(n³)
        - dom diff算法的时间复杂度为O(n)
            - 假设web中跨层级操作很少，只比较同级节点(tree diff)
            - 两个相同组件产生类似的DOM结构，不同的组件产生不同的DOM结构(component diff)
                - 如果是同一类型组件，diff子节点
                - 如果时不同类型的组件，直接替换
            - 对于同一层级的一组子节点，通过唯一的key进行区分(element diff)
                - 编辑距离算法
    - 如何实施修改
        - 替换
        - 移动
        - 修改

- 受控组件
	- 表单元素
	- 封装受控组件
- 合成事件
	- delegate element(document -> root)
- 组件通信
    - props（详细）
    - context
    - redux（详细）
    - mobx
    - umi3中的model
    - dva
- Redux原理
    - 数据流向
    - redux-thunk
    - redux-logger
    - redux-saga
- 高阶组件
    - connect
    - withRouter
    - Form.create
- 路由原理
    - 两种模式 hash & history
    - 404的重定向
      - 开发环境 webpack配置devServer中historyApiFallback: true
      - 线上环境 使用nginx或apache做404重定向到index.html
    - 原生实现
- hooks
    - hooks组件和class组件
    - hooks的原理（数组的实现，提一下单向链表的实现）
    - 常用的hooks，useState, useEffect, useReduce, useRef
    - hooks的优化
        - memo
        - useMemo
        - useCallback
- 调和过程，reconciler
    - statck reconciler(一次全部更新，容易卡顿)
    - fiber reconciler(间断更新，requestIdleCallback)

## Webpack
- webpack常用配置
    - Entry：入口，webpack构建的起始
    - Output: 出口，webpack生成文件的一些配置
    - Module：模块，webpack里面一切皆模块，也是代表着文件，从Entry配置的入口文件开始，递归找出依赖的模块
    - Chunk：代码块，找出递归依赖模块经转换后组合成代码块
    - Loader：模块转换器，也就是将模块的内容按照需求装换成新内容
    - Plugin：扩展插件，webpack构建过程中，会在特定的时机广播对应的事件，而插件可以监听这些事件的发生
    - devServer: 本地服务配置
- webpack流程
    - 初始化：从配置文件或是shell读取与合并参数，得到最终参数，实例化插件new Plugin()
    - 开始编译：通过上一步初始化得到的最终参数，初始化一个Compiler对象，加载插件（依次调用插件中的apply方法），通过执行Compiler.run开始编译
    - 确定入口：根据配置中entry找出所有入口文件
    - 编译模块：从entry出发，调用配置的loader，对模块进行转换，同时找出模块依赖的模块（如何找？见下文），依次递归，直到所有依赖模块完成本步骤处理
    - 完成模块编译：这一步已经使用loader对所有模块进行了转换，得到了转换后的新内容以及依赖关系
    - 输出资源： 根据入口与模块之间的依赖关系，组装成一个个chunk代码块，并且生成文件输出列表
    - 输出成功：根据配置中的输出路径和文件名，将文件写入文件系统，完成构建
- webpack优化
    - 打包资源优化
        - 公用包的抽离，webpack3的CommonsChunkPlugin到webpack4的optimization.splitChunks 和 optimization.runtimeChunk
        - 资源压缩optimize.UglifyJsPlugin 废弃，由 optimization.minimize 替代
    - 打包优化
        - 缩小编译范围，减少不必要的编译工作，即 modules、mainFields、noParse、includes、exclude、alias等
        - 通过 externals 配置来提取常用库，引用cdn
        - dllPlugin，动态链接第三方库
        - 使用Happypack，将loader由单进程转为多进程
        - 可视化打包，webpack-bundle-analyzer，各个模块的大小和依赖关系呈现出来
- loader和plugin的区别
    - loader完成相应文件的转化处理（css-loader是否使用cssModule）
    - plugin通过注入的compiler监听整个构建过程中的事件，修改生成文件
- webpack原理
    - [手动实现webpack](https://segmentfault.com/a/1190000018385415?utm_source=sf-related)
- runtime & manifest
    - runtime就是调度更新，删除或修改文件的变化
    - manifest把打包后的文件和源文件做个映射

## 网络
- 跨域
    - CORS(cross origin resource sharing)
    - JSONP
    - 代理
        - 本地webpack的Proxy
        - 线上nginx/apache的反向代理
- https
- 状态码
- 缓存
- TCP的三次握手，四次挥手
- 网络安全
    - XSS
    - CSRF
- 网络防护
	- CSP
	- CORS
	- Samesite
  
## 项目
- 开发周期
- 项目、bug管理工具,Teambition,禅道，TAPD
- 前后端对接及联调， showDoc
- 工作流程及团队协助
- 多环境配置（本地，测试，预发布，线上）
- 打包上线
- CDN与缓存
- 数据埋点与追踪，百度统计，诸葛IO，秒针
- Bug自动上报，Sentry
- 持续集成， Jenkins
- 第三方SDK的使用（短信验证码，邮件服务器，客服，支付，地图，微信SDK，JSBridge）