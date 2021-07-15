# HTML篇

### Doctype作用？标准模式与兼容模式各有什么区别?
<!DOCTYPE>声明位于位于HTML文档中的第一行，处于html标签之前。告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。 标准模式的排版 和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。

### HTML5 为什么只需要写 <!DOCTYPE HTML>？ 
- HTML5 不基于 SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为（让浏览器按照它们应该的方式来运行）；
- 而HTML4.01基于SGML,所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。

### 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？
首先：CSS规范规定，每个元素都有display属性，确定该元素的类型，每个元素都有默认的display值，如div的display默认值为“block”，则为“块级”元素；span默认display属性值为“inline”，是“行内”元素。
- 行内元素有：
```html
a b span img input select strong（强调的语气）
```
- 块级元素有：
```html
div ul ol li dl dt dd h1 h2 h3 h4…p
```
- 常见的空元素：
```html
<br><hr><img><input><link><meta>
```
（4）鲜为人知的空元素是：	
```html
<area><base><col><command><embed><keygen><param><source><track><wbr>
```

### 页面导入样式时，使用link和@import有什么区别？
- link属于XHTML标签，除了加载CSS外，还能用于定义RSS, 定义rel连接属性等作用；
- @import是CSS提供的，只能用于加载CSS;
- 页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载。
- import是CSS2.1 提出的，只在IE5以上才能被识别，而link是XHTML标签，无兼容问题。 

### 介绍一下你对浏览器内核的理解？
主要分成两部分：渲染引擎(layout engineer或Rendering Engine)和JS引擎。
#### 渲染引擎
负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核。
### JS引擎
解析和执行javascript来实现网页的动态效果。
最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎。

### 常见的浏览器内核有哪些？
- Trident内核：IE,MaxThon,TT,The World,360,搜狗浏览器等。[又称MSHTML]
- Gecko内核：Netscape6及以上版本，FF,MozillaSuite/SeaMonkey等
- Presto内核：Opera7及以上。      [Opera内核原为：Presto，现为：Blink;] 
- Webkit内核：Safari,Chrome等。   [ Chrome的：Blink（WebKit的分支）] 

### HTML5有哪些新特性、移除了那些元素？如何处理HTML5新标签的浏览器兼容问题？如何区分HTML和HTML5？ 
HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加。 
- 1)绘画 canvas;
- 2)拖拽;
- 3)地理定位;
- 4)用于媒介回放的 video 和 audio 元素; 
- 5)本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失;
- 6)本地离线存储sessionStorage 的数据在浏览器关闭后自动删除; 
- 7)语意化更好的内容元素，比如 article、footer、header、nav、section;
- 8)表单控件，calendar、date、time、email、url、search;
- 9)新的技术webworker, websocket, Geolocation;
 
#### 移除的元素
- 纯表现的元素：basefont，big，center，font, s，strike，tt，u;
- 对可用性产生负面影响的元素：frame，frameset，noframes；
 
#### 支持HTML5新标签： 
IE8/IE7/IE6支持通过document.createElement方法产生的标签，可以利用这一特性让这些浏览器支持HTML5新标签，浏览器支持新标签后，还需要添加标签默认的样式。
当然也可以直接使用成熟的框架、比如html5shim;
```js
<!--[if lt IE 9]> 
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script> 
<![endif]--> 
```

### 简述一下你对HTML语义化的理解？
- 用正确的标签做正确的事情。
- html语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;即使在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的;
- 搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO;
- 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。

### HTML5的离线储存怎么使用，工作原理能不能解释一下？
在用户没有连网时，可以正常访问站点或应用，在用户与网络连接时更新用户机器上的缓存文件。
#### 原理
HTML5的离线存储是基于一个新建的.appcache文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。
#### 如何使用：
页面头部像下面一样加入一个manifest的属性,在cache.manifest文件的编写离线存储的资源；在离线状态时，操作window.applicationCache进行需求实现。

### 浏览器是怎么对HTML5的离线储存资源进行管理和加载的呢？
在线的情况下，浏览器发现html头部有manifest属性，它会请求manifest文件，如果是第一次访问app，那么浏览器就会根据manifest文件的内容下载相应的资源并且进行离线存储。如果已经访问过app并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的manifest文件与旧的manifest文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。离线的情况下，浏览器就直接使用离线存储的资源。

### 请描述一下 cookies，sessionStorage 和 localStorage 的区别？ 
cookie是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密），cookie还可以设置有效时间，cookie数据始终在同源的http请求中携带（即使不需要），会在浏览器和服务器间来回传递，每次ajax请求都会吧cookie传送到后台，cookie一半用做用户登陆，后台可以根据cookie信息判断用户是否登陆状态。sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。
#### 存储大小
- cookie数据大小不能超过4k。
- sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。 
#### 有期时间        
- localStorage    存储持久数据，浏览器关闭后数据不丢失除非主动删除数据； 
- sessionStorage  数据在当前浏览器窗口关闭后自动删除。 
- cookie          设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭 
  
### iframe有那些缺点？
- iframe会阻塞主页面的Onload事件；
- 搜索引擎的检索程序无法解读这种页面，不利于SEO;
- iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。  
  
使用iframe之前需要考虑这两个缺点，如果需要使用iframe，最好是通javascript动态给iframe添加src属性值，这样可以绕开以上两个问题。

### 如何实现浏览器内多个标签页之间的通信?
- 使用webSocket长连接
- 调用localstorge、cookies等本地存储方式
- 使用页面的路由参数传递
- 使用postMessage

### data-属性的作用是什么？
h5新增的属性,可以通过ele.dataset获取到标签上的data-*的属性返回一个对象 ,常用于事件委托存储值和图片懒加载中存储src地址

### HTML与XHTML——二者有什么区别？ 
- 1)所有的标记都必须要有一个相应的结束标记
- 2)所有标签的元素和属性的名字都必须使用小写
- 3)所有的XML标记都必须合理嵌套
- 4)所有的属性必须用引号""括起来
- 5)把所有<和&特殊符号用编码表示
- 6)给所有属性赋一个值
- 7)不要在注释内容中使“--”
- 8)图片必须有说明文字

### img的title和alt有什么区别？
- title是global attributes之一，用于为元素提供附加的advisory information。通常当鼠标滑动到元素上的时候显示。
- alt是img的特有属性，是图片内容的等价描述，用于图片无法加载时显示、读屏器阅读图片。可提图片高可访问性，除了纯装饰图片外都必须设置有意义的值，搜索引擎会重点分析。
