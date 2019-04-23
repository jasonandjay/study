# 小程序
#### 任何情况下，100rpx = 1rem
##### 1、小程序的作用
- 一种新的产品运营方式，依赖于微信客户端，基于js可以进行开发，多种传播途径（入口场景）,很容易实现用户裂变
##### 2、小程序开发的必备内容
- 开发者工具
- 注册小程序账号
    1. 小程序管理后台
    2. 获取Appid （设置--开发设置）
    3. 添加多个开发者（设置不同的开发权限）
    4. 发布小程序
    5. 小程序运维数据
    5. 注意：
        6. 一个邮箱只能注册一个小程序
        7. 每一个小程序id都是唯一的
        8. 每一个账号只能发布一个小程序

##### 3、小程序的开发分为两个方向
1. 小程序应用开发
2. 小游戏开发

##### 4、为什么叫小程序？
- 因为小，所以叫小程序开发
- 小程序的发布包有大小限制，最初为1MB，后来增加到2MB！因为小程序和网页不一样，网页内容是放在服务端，浏览器只是一个加载作用，而小程序是打开小程序微信会将小程序依赖的代码下载到本地进行运行
- 开发10MB


##### 5、代码构成

```
1、.json    小程序的配置文件
2、.wxml    小程序的模板文件 类似与html
    (1) Wxml类似与html，但是不是html，区别是
    (2) 在html中我们使用标签做结构，在wxml中我们实用组件
    (3) 小程序中有指令，表达式的功能，而html没有
3、.wxss    小程序的样式文件 类似于css
    Wxss类似于css但是不同
    (1) 小程序新增尺寸单位rpx
    (2) 小程序样式有全局和页面的区别
    (3) wxss仅支持
4、.js      小程序的逻辑文件 就是js


App的构成
状态栏  header头    窗口    底部tabbar

入口
app.json    小程序的全局配置（状态栏，header头，窗口，tabbar，网络超时时间，...）
app.wxss    全局样式作用于页面
app.js

页面
[pageName].json 配置当前页面中窗口表现
[pageName].js
[pageName].wxss      wxss充当的就是类似CSS的角色编写页面样式，只针对当前页面起作用，不会冲突
[pageName].wxml     wxml充当的就是类似HTML的角色编写页面模板


```
##### 6、小程序的启动
- 微信客户端在打开小程序之前，会把整个小程序的代码包下载到本地。
- 紧接着通过 app.json 的 pages 字段就可以知道你当前小程序的所有页面路径:

##### 7、小程序的功能
1. 启动程序:  小程序的入口哦
2. 页面:  页面的注册
3. 组件： 内置组件 （view， button， text， map， ....） 和   自定义组件
4. Api：微信提供小程序的微信内置功能(登录，支付，扫码，ajax，... )

##### 8、小程序全局配置app.json

```
{
  pages: [
    ‘/page/index/index’,   //小程序每个页面由4个文件组件，但是配置路径的时候不需要添加后缀，因为要根据文件路径找到对应的4个不同后缀的文件
    ‘/page/log/log’
    ],  //用来配置小程序所有页面路径， 第一个就是首页
“window”: {
    “navigationBarBackgroundColor” : “#f00”,  //导航栏背景颜色  HexColor 默认黑色
    “navigationBarTextStyle”: “”,   //导航栏标题颜色，仅支持 black / white  默认白色
    “navigationBarTitleText”: “文字”,  //设置导航栏文字
    “navigationStyle” ： “custom”， // 导航栏样式
    “backgroundColor”: “”,  //背景颜色
    “enablePullDownRefresh”: true， //开启下拉刷新 需要在对应页面设置 onPullDownRefresh监听函数
    “onReachBottomDistance”: 50， //开启上拉加载， 需要在对应页面设置 onReachBottom监听
    }, //配置小程序全局的窗口表现
“tabBar”: { // 其中 list 接受一个数组，只能配置最少2个、最多5个 tab。tab 按数组的顺序排序，每个项都是一个对象
        "list":[{},{},{}]
    }
}
```
##### 9、小程序实例和小程序页面

```
**注册小程序实例**
小程序注册使用 App(Object) App() 必须在app.js中调用，必须调用且只能调用一次
Object:{
    onLaunch(){}, // 小程序初始化，全局只触发一次
    onShow(){}, // 小程序显示
    onHide(){}, // 小程序从前台到后台的隐藏
    onError(){}, // 小程序发送错误的捕获
    onPageNotFound(){} // 页面找不到的回调
    
    // 其他任意属性和方法
    aa(){},
    bb:{}
}

在小程序实例中可以通过this调用任意函数和属性，但是需要注意的是不可以随便调用生命周期函数，因为这样会违背生命周期的执行
onLaunch 和 onShow 生命周期接收到一个Object参数
参数的值：{
    path:'打开小程序的路径'，
    query:'打开小程序的query(参数)',
    scene:'打开小程序的场景值'，
    shareTicket:'获取到转发信息'，
    referrerInfo:{  // 第三方来源（其他小程序，其他app, ...）
        appId:"来源的ID",
        extraData:"来源消息"
    }
}

获取实例使用getApp()，可以调用除了生命周期外的任意函数和属性


**注册页面**
注册页面使用Page(Object)
Object:{
    data:{}, // 页面相关数据
    // 页面相关的生命周期
    onLoad(){}, // 页面加载完成
    onShow(){}, // 页面显示
    onReady(){}, // 页面渲染完成
    onHide(){}, // 页面隐藏
    onUnload(){} // 页面卸载
    
    // 页面相关的事件
    （1） onPullDownRefresh(){}, // 监听用户的下拉刷新事件回调 可以通过wx.stopPullDownRefresh停止当前页面的下拉刷新动画，需要在page.json中配置enablePullDownRefresh:true
    
    （2） onReachBottom(){}, // 监听用户的上拉加载触底事件，需要在page.json中配置onReachBottomDistance:Number
    
    （3） onPageScroll(scroll){}, // 监听页面的滚动事件，前提是页面是允许滚动的，并且只能监听纵向滚动，可以通过scroll.scrollTop获取到滚动y轴区域
    
    （4） onshareAppMessage(){
        return {
            title:"标题",
            path:"路径",
            imageUrl:"图片路径"
        }
    }
    监听页面分享事件，需要返回一个对象设置分享信息，接收到一个分享信息
    Object：{
        from:"分享来源 微信menu 或者button按钮",
        target:"如果是点击button按钮的话 这个属性的值就是button按钮， 其他都是undefined",
        webViewUrl:"如果分享的页面有web-view组件的话，那么就会存在网页的地址"
    }
    
    （5） onTabItemTap(){}  // 点击tab切换时
    
}
```
##### 10、模板渲染
1. 简单绑定

```
数据绑定使用Mustache语法(双大括号)将变量包起来, 所有需要渲染的数据来源与page中的data


类似于vue的数据绑定，但是有区别
在vue中我们使用v-bind的形式绑定动态属性  v-bind:name=”name”
在小程序中所有的动态值的输出全部使用{{}}   name=”{{name}}”
wx:for=”{{list}}”  wx:if=”{{true}}”
任何动态内容都需要写在 {{}} 内（内容，动态属性，控制属性，关键字，运算，...， 数组， 对象）, 但是不能执行函数， 

```
2、指令

```
指令：
wx:for  用于数据循环数组，对象
数组  item指的是当期数据项, index指的是索引
对象  item指的是value值，index指的是key值

循环的时候记得实用wx:key直到当前项的唯一key值，否在会发出警告
使用wx:for-item=”value”  wx:for-index=”key” 可以改变item，index 的别名

wx:if  wx:elif  wx:else  用于条件判断 值是一个返回布尔值的表达式
```
3、template模板

```
WXML提供模板（template），可以在模板中定义代码片段，然后在不同的地方调用

定义
使用template组件定义,使用name指定模板名称
<template name=”name”>
片段代码  {{age}}
</template>

使用template的is属性查找对应定义的模板，可以进行展示，data属性可以给模板内部传递数据
<template is=”name” data=”{{age: 100, name: ‘aaaa’}}” />
```

