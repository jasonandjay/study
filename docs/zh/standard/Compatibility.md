---
sidebar: auto
sidebarDepth: 2
---
# 常见兼容问题
## 如何处理兼容问题
- 在[Can I Use](https://caniuse.com/)网站查询兼容情况
- 在JS代码里使用对象检测，判断该特性是否支持 eg:
    - 'XMLHttpRequest' in window
    - 'WebkitMask' in document.documentElement.style
- 使用postcss做样式的后处理


## 样式问题
### 清除浏览器默认样式
    引入common.css或reset.css重置默认样式
### 清除ios输入框默认阴影
    -webkit-appearance: none;
### 清除ios触摸元素出现半透明灰色遮罩
     -webkit-tap-highlight-color: transparent;
### Ios滑动卡顿问题
    body {-webkit-overflow-scrolling: touch; }
### 禁止复制、选中文本
    -webkit-user-select:none;
    user-select:none;
### 修改input框的placehold样式
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
        color: #f00;
    }
### 模拟实现PC上的hover效果
    touchStart事件+touchEnd事件模拟
    在touchStart时添加class，在touchEnd时移除class
### 启用硬件加速
    -webkit-transform:translate3d(0,0,0)
    transform: translate3d(0,0,0);
### 多倍屏1px像素问题和图片模糊问题
    图片模糊使用多倍图，常使用2倍图做统一处理
    1px像素问题使用dpr查询和缩放解决（transfrom:scale(0.5/0.33)）
### transition闪屏问题
    /设置内嵌的元素在3D 空间如何呈现：保留3D /
    -webkit-transform-style: preserve-3d;
    / 设置进行转换的元素的背面在面对用户时是否可见：隐藏 / 
    -webkit-backface-visibility:hidden;
### fixed定位问题
    ios下fixed元素容易定位出错，软键盘弹出时，影响fixed元素定位，会以软键盘的上方为bottom:0;  
    android下fixed表现要比iOS更好，软键盘弹出时，不会影响fixed元素定位  
    解决：通过屏幕的resize事件重新给fixed元素设置样式
### 300ms延迟问题
    浏览器如何判断快速点击时要区分单击事件和双击屏幕缩放的历史原因造成的，当用户在屏幕上单击某一个元素时候，  
    例如跳转链接<a href="#"></a>，此处浏览器会先捕获该次单击，但浏览器不能决定用户是单纯要点击链接还是要双  
    击该部分区域进行缩放操作，所以，捕获第一次单击后，浏览器会先Hold一段时间t，如果在t时间区间里用户未进行  
    下一次点击，则浏览器会做单击跳转链接的处理，如果t时间里用户进行了第二次单击操作，则浏览器会禁止跳转，  
    转而进行对该部分区域页面的缩放操作。那么这个时间区间t有多少呢？在IOS safari下，大概为300毫秒。  这就是  
    延迟的由来。造成的后果用户纯粹单击页面，页面需要过一段时间才响应，给用户慢体验感觉，对于web开发者来说是，  
    页面js捕获click事件的回调函数处理，需要300ms后才生效，也就间接导致影响其他业务逻辑的处理。
    解决：fastclick库或者使用touchstart事件代替点击事件
    fastclick: 
        var FastClick = require('fastclick');
        FastClick.attach(document.body);
    touchstart事件：
        触摸事件的响应顺序为 touchstart --> touchmove --> touchend --> click,
        也可以通过绑定ontouchstart事件，加快对事件的响应，解决300ms延迟问题
### [点击穿透问题](http://www.fly63.com/article/detial/695)
    当A/B两个层上下z轴重叠，上层的A点击后消失或移开（这一点很重要），并且B元素本身有默认click事件（如a标签）或绑定了click事件。在这种情况下，点击A/B重叠的部分，就会出现点透的现象。
    本质原因: 事件触发顺序，参见上方
    解决：  fastclick库或者用touchend代替tap事件并阻止掉时A元素touchend的默认行为preventDefault()，从而阻止click事件的产生
### js不执行问题
    点击浏览器的回退，有时候不会自动执行js，特别是在mobilesafari中。这与往返缓存(bfcache)有关系。
    解决方法 ：window.onunload = function(){};
### 移动端audio autoplay失效问题
    由于自动播放网页中的音频或视频，会给用户带来一些困扰或者不必要的流量消耗，所以苹果系统和安卓系统通常都会禁止自动播放和使用 JS 的触发播放，必须由用户来触发才可以播放
    解决方法思路：先通过用户 touchstart 触碰，触发播放并暂停
    document.addEventListener('touchstart',function() {
        // 执行播放逻辑
    });

## 移动端适配问题
- navigator.useragent做环境检测和版本检测
- 媒体查询做宽高、屏幕比例和dpr的检测
- Rem做布局单位

### 窗口适配，禁止用户缩放
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" />
### 常用navigator.useragent
    const ua = navigator.userAgent.toLowerCase();
    let UA = {};
    let s = null;
    UA.ie = (s = ua.match(/(msie\s|trident.*rv:)([\d.]+)/)) ? s[2] : false;
    UA.firefox = (s = ua.match(/firefox\/([\d.]+)/)) ? !!s[1] : false;
    UA.chrome = (s = ua.match(/chrome\/([\d.]+)/)) ? !!s[1] : false;
    UA.opera = (s = ua.match(/opera.([\d.]+)/)) ? !!s[1] : false;
    UA.safari = (s = ua.match(/version\/([\d.]+).*safari/)) ? !!s[1] : false;
    UA.android = (s = ua.match(/android/)) ? !!s : false;
    UA.iphone = (s = ua.match(/iphone os/)) ? !!s : false;
    UA.ipad = (s = ua.match(/ipad/)) ? !!s : false;
    UA.ios = UA.ipad || UA.iphone;
    UA.isWin32 = /win32/i.test(window.navigator.platform);
    UA.isWeixin = (s = ua.match(/MicroMessenger/i)) ? !!s : false; // 判断是否是在微信浏览器里面
    UA.isUcweb = (s = ua.match(/ucbrowser/)) ? !!s : false;
    UA.isMqq = navigator.userAgent.indexOf('QQ') !== -1;
    UA.isWeiBo = (s = ua.match(/__weibo__/)) ? !!s : false; // 是否微博浏览器
    UA.winClient = (s = ua.match(/winclient/)) ? !!s : false; // 是否pc客户端
### rem计算
    /**
     * 以750为基础做适配，1rem = 100px, 1rem = 100rpx;
     * 监听pc端的resize事件和mobile的横屏（orientationchange）事件
     */
    var fun = function (doc, win) {
      var docEl = doc.documentElement,
          resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
          recalc = function () {
              var clientWidth = docEl.clientWidth;
              if (!clientWidth) return;

              //这里是假设在750px宽度设计稿的情况下，1rem = 100px；
              //可以根据实际需要修改
              docEl.style.fontSize =  (clientWidth / 750)*100 + 'px';
          };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    }
    fun(document, window);
### 多倍屏处理
    通过媒体查询中的宽高和dpr做判断
    /* iphone 3 */
    @media only screen and (min-device-width: 320px) and (max-device-height: 480px) and (-webkit-device-pixel-ratio: 1) { }
    /* iphone 4 */
    @media only screen and (min-device-width: 320px) and (max-device-height: 480px) and (-webkit-device-pixel-ratio: 2) { }
    /* iphone 5 */
    @media only screen and (min-device-width: 320px) and (max-device-height: 568px) and (-webkit-device-pixel-ratio: 2) { }
    /* iphone 6, 6s */
    @media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (-webkit-device-pixel-ratio: 2) { }
    /* iphone 7, 8 */
    @media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (-webkit-device-pixel-ratio: 2) { }
    /* iphone 6+, 6s+, 7+, 8+ */
    @media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (-webkit-device-pixel-ratio: 3) { }
    /* iphone X */
    @media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (-webkit-device-pixel-ratio: 3) { }

### 自适应处理
    通过媒体查询 + 样式的覆盖
    /*小屏幕*/
    @media screen and (max-width: 768px) {}
    /*平板*/
    @media screen and (min-width: 768px) and (max-width: 992px){}
    /*中等屏幕*/
    @media screen and (min-width: 992px) and (max-width: 1200px){}
    /*大屏幕，或者宽屏*/
    @media screen and (min-width: 1200px) {}
