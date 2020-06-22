---
sidebar: auto
sidebarDepth: 2
---

# Progressive Web Application

## 背景
PWA 全称是渐进式 web 应用，它是用一系列前端技术来实现的，目标是提供类似原生APP一样的体验。
### 解决的问题：
- Web 的用户体验
    - 首屏加载速度
    - 网页离线无法访问
- 用户留存
    - Native App 安装完毕桌面上有一个入口
    - Native App 能够通过发送通知让用户再次回到应用中来
    - Web App需要记住URL并输入地址
- Device API 的不完善
    - Native App 更方便访问设备硬件和设备上的数据
    - [WebAPI的推进](https://developer.mozilla.org/zh-CN/docs/WebAPI )

### 关键时间节点：
- 2014年，W3C 就公布过 Service Worker 的相关草案
- 2015年，chrome生产环境支持Service Worker
- 2018年2月，win10和edge全面支持pwa
- 2018年3月，ios11.3支持pwa
- 2019年3月，iOS 12.2 版本修复了 PWA 很多致命的体验问题，支持了 Web Share API 等
- 至今，PWA被提出到现在，已经过去了4年，通过 Service Worker，Web App Manifest 等技术的使用，不仅在体验上达到了他们的标准，同时还具有了 Web App 的产品迭代速度

## 什么是PWA
### 主要特点
- 可靠 - 即使在网络不稳定甚至断网的环境下，也能瞬间加载并展现
- 用户体验 - 快速响应，具有平滑的过渡动画及用户操作的反馈
- 用户黏性 - 和 Native App 一样，可以被添加到桌面，能接受离线通知，具有沉浸式的用户体验
### 使用pwa的基本要求
- 站点需要使用 HTTPS
- 页面需要响应式，能够在平板和移动设备上都具有良好的浏览体验
- 所有的 URL 在断网的情况下有内容展现，不会展现浏览器默认页面
- 需要支持 Wep App Manifest，能被添加到桌面
- 即使在 3G 网络下，页面加载要快，可交互时间要短
- 在主流浏览器下都能正常展现
- 动画要流畅，有用户操作反馈
- 每个页面都有独立的 URL
### 对比传统 Web App，Native App 和 PWA  

|应用类型|是否可安装|是否可链接访问|用户体验|用户黏性|  
|---|---|---|----|---|  
|传统 Web|	无法安装|	可链接访问|	体验一般|黏性差|
|Native App|	可安装|	不可链接访问|	体验好|	黏性强|
|PWA|	可安装|	可链接访问|	体验好|	黏性强|

## PWA的核心技术
### Web App Manifest
- 兼容性：83%
- 技术实现：manifest.json
开发者配置 PWA 的相关信息，应用名称、图标、启动方式、背景颜色、主题颜色等等，添加到桌面后，能够在系统中作为一个独立的 App 存在，具有启动画面、沉浸式浏览体验。未来PWA会被系统的应用商店收录，目前 Windows 10已经支持。

### Service Worker
- 兼容性：94.25%
- 技术实现：service-work.js
- 主要功能
    - 一个特殊的 worker 线程，独立于当前网页主线程，有自己的执行上下文
    - 不能直接操作 DOM
    - 一旦被安装，就永远存在，除非显示取消注册
    - 使用到的时候浏览器会自动唤醒，不用的时候自动休眠
    - 可拦截并代理请求和处理返回，可以操作本地缓存，如 CacheStorage，IndexedDB 等
    - 离线内容开发者可控
    - 离线期间网络期间可以在网络恢复后同步
    - 能接受服务器推送的离线消息
    - 必须在 HTTPS 环境下才能工作

### 离线通知
- 兼容性：79.51%
- 技术实现：Web Push 和 Notification API

## service worker
### 作用域
- scope和文件所在路径控制最大作用域范围
- 尽量避免作用域污染
- SPA注册在项目根目录
- MPA注册单个注册在根目录
- MPA注册多个注册在子目录
### 更新策略
浏览器通过自身 diff 算法能够检测 service work 的更新包含两种方式
- Service Worker 文件 URL 的更新（时间戳和版本号做查询字符串）
- Service Worker 文件内容的更新（更新文件内容）
### 生命周期
![多页面](/study/pwa/lifecycle.png)

- install 安装成功，每次安装前先注销之前所有的service worker
- active 激活成功

## 用户留存
### mainfest字段详解
```js
short_name: 应用展示的名称(桌面上显示的名称)

icons: 定义不同尺寸的应用图标

start_url: 定义桌面启动的 URL

description: 应用描述，可以参考 meta 中的 description

display: 定义应用的显示方式，有 4 种显示方式，分别为：

    fullscreen: 全屏

    standalone: 应用

    minimal-ui: 类似于应用模式，但比应用模式多一些系统导航控制元素，但又不同于浏览器模式

    browser: 浏览器模式，默认值

name: 应用名称（浏览器提示用户添加和Android启动屏显示的名称）

orientation: 定义默认应用显示方向，竖屏、横屏

background_color: 应用加载之前的背景色，用于应用启动时的过渡

theme_color: 定义应用默认的主题色

dir: 文字方向，3 个值可选 ltr(left-to-right), rtl(right-to-left) 和 auto(浏览器判断)，默认为 auto

scope: 定义应用模式下的路径范围，超出范围会已浏览器方式显示

```
[生成地址](https://app-manifest.firebaseapp.com/)

### 修复ios上icon配置失效
```js
<link rel="apple-touch-icon" href="/img/mobile-homescrenn-192x192.png">
```

## 离线存储
### 资源请求拦截
### 本地存储管理
### 预缓存方案
- Network First
- Cache First
- Network Only
- Cache Only
- Stale While Revalidate
### workbox

## 案例
- [微博](https://m.weibo.cn/)
