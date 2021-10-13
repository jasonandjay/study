---
title: 面试前自检
sidebar: auto
sidebarDepth: 2
---
# 复习总结

## 源码必会
-  路由的实现原理
-  vue2的响应式实现原理
-  vue3的响应式实现原理
-  vue2的部分特性
     -  init各个配置项的顺序
     -  methods中的this为什么指向当前示例？
     -  computed的缓存如何实现？
     -  响应式中数组的缺陷，如何使用变异方法解决？
     -  $forceUpdate的实现
     -  $nextTick的实现
     -  响应式中对象的缺陷，如何使用$set、\$delete解决？
     -  provider/inject的实现
-  redux的实现原理
     -  react-redux
     -  redux-thunk
     -  redux-logger
-  react的部分特性 
     -  hooks的实现原理
     -  react-fiber
     -  virtual dom/dom diff

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
- CSS优先级
- CSS模块化：CSS Module & Scoped
- CSS模块化的覆盖：global, [组件调用的className] \deep\ [要覆盖的className]
```scss
:global{
    .list{

    }
}
<vant-date-picker class="picker"></vant-date-picker>
.picker \deep\ .date{

}
```
- BFC(Block Formating Context) & IFC
    - [BFC](https://blog.csdn.net/mevicky/article/details/47008939)
    - 边距折叠
    - 清除浮动
    - 双栏布局
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
- 三栏布局
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

## Javascript
- 数据类型
    - 堆和栈
    - 深浅拷贝
        - JSON.parse(JSON.stringify),
        - [...], {...}
        - slice, concat, Object.assign
        - lodash, _cloneDeep
    - 深浅比较

```js
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy (obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}
```

- 原型链
    - 显示原型prototype
    - 隐式原型__proto__
    - 构造函数constrctor
    - 实例化new

```js
// 原型链查找
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
// new的实现
function new(F){
    // 1. 生成空对象
    var obj = {}
    // 2. 建立隐式原型
    obj.__proto__ = F.prototype
    // 3. 调用构造函数
    var instance = F.call(obj)
    // 4. 判断instance是否是引用类型
    return typeof instance==='object'?instance: obj;
}
```

- 继承  
    - 基于原型链的继承
```js
function Father(){}
function Son(){}
Son.prototype = new Father
```
    - 基于构造函数的继承：call
```js
function Father(){}
function Son(...args){
    Father.call(this, ...args)
}
```
    - 组合继承
```js
function Father(name='father'){this.name = name}
function Son(...args){
    Father.call(this, ...args)
}
Son.prototype = new Father
```
    - 寄生组合继承
```js
function Father(){}
function Son(...args){
    Father.call(this, ...args)
}
Son.prototype = Object.create(Father.prototype);
```
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

    - instance实现

    ```js
    function MyInstaceOf(obj, Func){
        while(obj){
            if (obj.__proto__ === Func.prototype){
                return true;
            }
            obj = obj.__proto__;
        }
        return false;
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
- 数组去重

```js
const arr = [1,2,3,4,5,6,7,8,9,0,9,8,7,6,5,4,3,2,1];
1. new Set
[...new Set(arr)];

2. indexOf
let newArr = [];
for (let i=0;i<arr.length;i++){
    if (newArr.indexOf(arr[i]) === -1){
        newArr.push(arr[i])
    }
}

3. 把每一项作为对象的key
let newArr = [], obj = {}
for (let i=0;i<arr.length;i++){
    if (!obj[arr[i]]){
        newArr.push(arr[i]);
        obj[arr[i]] = true;
    }
}

4. 有顺序的，可以前后比较删除
for (let i=0;i<arr.length-1;i++){
    if (arr[i] === arr[i+1]){
        arr.splice(i+1, 1);
    }
}
```
- 属性修饰符

```js
function Archiver() {
  var temperature = null;
  var archive = [];

  Object.defineProperty(this, 'temperature', {
    // value: 1,   //  定义属性的值
    // writable: true, //  定义属性是否可以被改写
    configurable: true, // 属性修饰符是否可以被修改，是否可以被删除
    enumerable: true,   // 是否可以被for...in, Object.keys()枚举
    get: function() {   // 重载get方法
      console.log('get!');
      return temperature;
    },
    set: function(value) {  // 重载set方法
      temperature = value;
      archive.push({ val: temperature });
    }
  });

  this.getArchive = function() { return archive; };
}

var arc = new Archiver();
arc.temperature; // 'get!'
arc.temperature = 11;
arc.temperature = 13;
arc.getArchive(); // [{ val: 11 }, { val: 13 }]
```

## Vue
- [多个框架之间比较](https://cn.vuejs.org/v2/guide/comparison.html)
    - 响应式原理
    - 使用上面（指令，插件，事件绑定，传参）
    - 性能方面
    - 优化方面
    - 学习曲线
    - 生态方面
- 响应式原理
    - vue2的defineProperty(兼容性 > ie8)
    - vue3的Proxy+Reflect(兼容性 > ie11)
- 生命周期
    - 普通组件的生命周期
    - 缓存组件的生命周期
    - 路由的生命周期
    - 插件mixin的生命周期
- computed VS watch vs methods
- 组件通信
    - props(详细)
    - bus
    - 自定义事件$emit/v-model
    - .sync
    - slot
    - provider/inject
    - vuex(详细)
- 插件的使用
    - install
    - mixin
- vue的优化
    - 利用key复用组件
    - 组件/路由的懒加载
    - keep-alive
    - computed缓存计算属性
    - vue包的选择,包小1/3，runtime-only VS runtime+compiler
- vuex/vue-router
- composition-api

## React
- [jsx的原理](https://babeljs.io/repl#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=MYewdgzgLgBApgGzgWzmWBeGAKAUDGAHgBMBLANxmAQEMIIA5G1DAIilKiVYD58CYAC0QIQhCAAcaYKrXpMWrUOjRReAdxAAnBMQCEhAPSTpfAkbLk-ASly5l0GJZhYSFWXUbM4bBKWisTjRQNAC0EFrAbIJQUBIAXIaG6ikAdABGNKTEAK6poMiGpMg0AOZwvIAA5oAB3oCqyoAhbgBWEAAe_AJEljwAghYUPG5WAEJ9VoM8AMKjZh1EEyDIQzCGMx3T7QK4AGY5YMAc4DDzyN3YElogEhDWAN64AJBacFA5WjLjN-eXEKlQcC1QAC-60Bdh2ewOMmOQ2wtweTxeb06_UIx26MD-ALYgFNzQBXgV8rkNWCsQUA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=&prettier=false&targets=&version=7.4.4&externalPlugins=)
	
```jsx
- jsx格式
const element = (
  <div className="title" props="a">
    hello<span className="content">world!</span>
  </div>
)

- React.createElement
var element = React.createElement("div", {
  className: "title",
  props: "a"
}, "hello", React.createElement("span", {
  className: "content"
}, "world!"));


- {$$typeof, props, key...}
{
    "$$typeof": Symbol(react.element),
    "type": "div",
    "key": null,
    "ref": null,
    "props": {
        "className": "title",
        "props": "a",
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
    - 步骤
        1. 通过state生成新的dom树
        2. dom diff生成patches
        3. apply patches
    - dom diff流程
        1. 用对象表示dom节点
        2. 创建虚拟dom树，，父子关系使用children
        3. 创建新的dom树
        4. 对比两个dom树，产生patches
        5. apply patches
    - 虚拟dom树和真实dom树
    - dom diff算法几个问题
        - 传统树的diff算法的时间复杂度为O(n³)
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

## 小程序
- 响应式单位：100rpx  = 1rem
- 第三方登陆
- 生物识别，手机号解密，用户信息获取
- 消息订阅
- 支付（requestPayment）
- 小程序分享
- 开发工具
    - 原生开发
    - Mpvue
    - Uni-app
    - Taro

## [移动端](https://jasonandjay.github.io/study/zh/standard/Compatibility.html#rem%E8%AE%A1%E7%AE%97)

## [性能优化](https://jasonandjay.github.io/study/zh/standard/Improve.html)
- 从浏览器里输入地址到网页呈现的整个过程来聊优化

## 网络
- 跨域
    - CORS(cross origin resource sharing)
    - JSONP
    - 代理
        - 本地webpack的Proxy
        - 线上nginx/apache的反向代理
- [https](https://mp.weixin.qq.com/s/z42poTGiWndzEI5VZ4GRUg)
- [https 中间人攻击](https://mp.weixin.qq.com/s/NvNyThS_EmqnBaqIyGtxTw)
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

## 项目流程
### 项目介绍  
那我我就介绍一下我觉得我做的比较好的一个项目吧，是xxx项目，这个项目是我们公司的主要产品，是一个ToB或者ToC，移动或者PC端的项目，项目里面主要的功能是有，登录，购物车，搜索，分类，活动，....一些功能模块因为我们公司主要是做xxx的，所以这个项目是我们不断在开发的，（这个项目也不是我从头开发的，是一个技术版本的更新重构由我来负责的）这个项目是由我主导独立开发完成，从前期的项目架构，到组件的拆封，页面构建，业务对接，包括后期的性能优化都是我自己独立完成，当然这个过程中也获得了很多同事的帮助，通过这个项目首先是对我自身技术能力有了很大的提升，再就是在新版上线后，相对于旧版本用户体验也提升了很多（提升加载速度，用户操作优化，页面动效果）

- 你在项目中的职责是什么
- 功能模块
- 技术架构
- 代码如何管理，多人如何协作的
    git，svn

我们公司的话是使用git作为代码管理工具，用的（马云，coding，gitlab），多人协作主要是分子划分，每个人都会在自己的电脑上新建自己的开发分子，一是为了减少冲突，二是为了写工作日志的时候查看自己的工作内容，主要分子的话我们划分相对比较简单一些，master是放我们生产环境代码的，一般都以版本号作为更新记录，再就是test是我们测试环境的代码，dev是我的开发分子，所有人都会将自己开发的代码合并到dev分子，其他人通过dev进行更新



做一个项目需要多久


通过这个项目有什么收获
脚手架、组件库、打包部署工具、技术提升、新技术应用、优化技巧、功能封装



项目分工是什么样子的
完全是由我自己独立的开发

这个项目有3个前端共同开发完成，每个人负责的功能模块不一样，项目架构是之前开发好的一套架构体系直接复用过来的



### 你在上家公司都做哪些事情？你在其中担任什么角色？
我的话在上家公司主要是技术开发为主，负责前端的开发任务，对接后台完成接口联调，配合ui完成ui规范开发，有时候也会出差主场去客户公司完成对接工作
- 项目环境怎么区分
之前项目主要环境就是3个正式环境，开发环境，测试环境，不同环境直接可能有一些配置上的差异，一是webpack中不同环境有打包差异（开发环境注重开发提效规范验证，测试环境相对没啥，正式环境更多在于加载优化），再就是项目中需要通过环境差异去做不同的变量配置，功能展示（接口在不同环境中指向的host不一样），再比如，移动端可能在测试和开发环境中为了真机调试方便需要使用一些插件，一般在代码中可以通过node. process.env提供过来的环境变量来判断进行变量的覆盖功能的加载

var baseUrl = node.process.env.NODE_ENV == 'dev' ? 'http:192.168.10.1' : 'https://www.aaa.com',
项目架构
（自动化，全局封装，规范）

应用层

  路由（约定式路由配置，路由拦截）

  状态管理

  视图库（全局组件，ui组件库的应用）

  适配

  请求库（统一的错误处理，timoute的处理）

  布局

  ...

基础设施层

  项目目录

  规范（开发规范，命名规范，容规范，工作流规范，UI规范，技术栈规范，兼文档规范，生产发布规范）



  性能优化（

    编码性能，

    打包优化，

    开发环境的优化

  ）



### 项目中做了哪些优化
请求优化

cdn外链，提升访问速度，减轻服务器压力

gzip压缩缩小传输资源的大小

合理利用缓存，减少服务器压力

懒加载，提升代理利用率

体积优化

合理封装，提升组件复用率，利用更少的代码维护更多的模块

合理利用第三方库，配置按需加载提升代码利用率

压缩代码，打包的时候清除注释，无用的console

资源优化

图片的懒加载，压缩图片，合理利用图片格式

编码优化

严格按照规范开发，提升代码可读性，提高项目可维护性

工作流优化

合理利用分子管理代码，严格按照流程进行开发提交，以及各个流程的规范性，提升工作效率

运行性能优化

利用程序设计，设计出更加高效的程序，常见的（防抖，截流，闭包，缓存，....）


### 项目亮点是什么  
1. 支付中心
    适配多环境支付方案（小程序支付，Hybird App支付，Web支付，扫码支付）  
2. 高度可复用的权限系统
    基于RBAC，三个实体，两条关系的可视化修改  
    多层拦截（路由菜单，导航守卫，Api接口中间件）  
3. 大屏可视化  
    异步渲染提高性能，可视化操作（拖拽，缩放）  
4. Hybird App优化web性能  
    如何去优化客户端webview的加载顺序提高性能  
    1. 提前渲染一个webview
    2. 把web请求委托给客户端，在webview初始化期间同步加载网络请求
5. 项目优化  
    移动端的3s到达原则
    从浏览器输入一个url到页面呈现经历了哪些过程


线上环境遇到问题需要及时修改，如何做
先解决用户使用问题，回退一个版本，将当前功能紧急下线，保证其他用户不受影响，然后保存当前环境程序进行提交，基于有问题的版本，新建一个bug分支，进行bug修复，测试没有问题后，重新发布



3-5年的规划


项目中你遇到了哪些技术难点和问题？
背景：做什么，有个什么问题

如何解决的，通过这个问题有什么收获

1，兼容问题（）



做过权限系统吗
做过，在前端来说的主要就是一个，路由访问权限，导航功能的展示，页面操作的显示，我们公司主要通过，等路由后台会通过接口返回个一个视图权限数组，数组里面放的是有权限访问的路由名称，前端通过这个数组动态注册路由，因为我这个项目是vue做的，vue可以通过router.addRoute()方法动态添加路由配置，我将路由配置进行了过滤，生成新的路由配置动态注册，实现路由权限的访问，而导航也是更具路由配置生成的，如果使用react的话可以通过高级组件控制路由是否可以被访问，操作的权限的话我们公司是由后台控制，页面无变化，没有权限的用户操作的话接口会返回错误，我这么通过axios做了全局的错误处理，进行错误提示，提升用户没有权限操作



一次迭代的流程是怎么样的
1，整理需求（客户提需要，更具市场调研开发新功能，用户反馈）

2，产品进行原型设计

3，流程讨论

4，开发设计

5，测试

6，部署上线发布新版本

### 项目如何部署
1，后端部署（我这边打包完成交给后端他来完成部署）

2，工具部署（jenkins）

3，CI/CD 自动化构建部署

我们公司的话是后端部署的项目，但是我也了解到现在有大公司都是有一套自己的devOps自动部署流程，通过命令直接完成部署，但是我没有用过，就是自己了解过（nginx，docker，jenkins，ci，cd，git）



项目中ui框架是如何使用的
ui框架的话只是提供了一些基础ui组件，tab，table，form比较分散，在项目中应用的话，我一般都会根据业务对组件做一些二次封装，才能更好贴合项目去使用，举几个例子吧，在列表页面的话我们一般都是筛选条件，列表，分页，操作按钮组合，所以针对这一快做了统一的封装，只需传递配置项即可生成一个列表页面，将筛选逻辑，分页逻辑统一封装起来提升开发效率，在比如复杂表单页面，将表单组件封装声明式的配置形式进行开发（将表单元素，表单验证）统一封装起来，提升表单页的开发速度

做过访问量比较大的前端项目吗
没有做过，但是我了解，访问量大的项目主要需要我们去解决访问速度的问题，后端采用，负载均衡提升多用户处理，前端可以利用cdn，缓存，懒加载，减少服务器亲求次数



你们的业务组件库有多少个，是什么样的组件
SEO优化你做了吗
对于单页面因用来说的话本身就不利于seo优化，我们可以通过服务端渲染ssr解决seo的问题，再就是页面结构优化



单页面应用有做过埋点统计吗，怎么做的
埋点是用来统计用户行为的方式，多页面项目，因为走的是后端路由，所以后端可以直接统计，而单页面应用，走的是前端的路由，所以后端无法统计，单页面应用我们可以使用，路由拦截的方式，统计路由的访问，封装自定义指令，统计用户的操作，其实就是请求一个接口告诉后端用户做了什么操作



对于后台的数据接口，经常会发生一些分歧，你们团队是怎么化解这种分歧的，有没有一种方式增进团队之间的沟通？
我们这边的话是使用restfull api接口规范，提升了前后端沟通上带来的问题，后端会提供对应接口文档，描述接口作用，参数意义



微信公众号开发如何使用jsdk
如何和安卓ios进行通信
我们公司有封装好的一套jsbrage通信模块，直接调用就好，原理也很简单，调用iso的话就是发生一个自定义请求，ios可以拦截，更具参数进行执行对应的ios功能，安卓的话他可以将方法扩展到我们window上，直接调用就好。而我们需要将我们写的js方法如果需要提供给安卓或者iso的话，只需要将这个方法暴露在window上就好他们可以直接访问



为什么做这个UI库，市面上不是已经有很多好用的UI库了
主要是这么几个原因，1是为了提升自己的技术能力，而是市面上的ui框架大部分只是提供了一些公共的基础组件而已，而我们做的ui组件的话是更具公司业务领域开发的组件库，

上家公司做的业务有哪些？
bug咋提的
团队管理工具（禅道）

接口文档用什么
postman， swagger, showdoc, apizz, word