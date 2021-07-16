# Ajax篇

### Ajax 是什么? 如何创建一个Ajax？ 
ajax是一种创建交互式网页的计算，ajax的全称：Asynchronous Javascript And XML（异步传输+js+xml)  
所谓异步，在这里简单地解释就是：向服务器发送请求的时候，我们不必等待结果，而是可以同时做其他的事情，等到有了结果它自己会根据设定进行后续操作，与此同时，页面是不会发生整页刷新的，提高了用户体验
- (1)创建XMLHttpRequest对象,也就是创建一个异步调用对象 
- (2)创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息 
- (3)设置响应HTTP请求状态变化的函数 
- (4)发送HTTP请求 
- (5)获取异步调用返回的数据 
- (6)使用JavaScript和DOM实现局部刷新 
 
#### 同步和异步的区别?
同步的概念应该是来自于OS中关于同步的概念:不同进程为协同完成某项工作而在先后次序上调整(通过阻塞,唤醒等方式)。同步强调的是顺序性，谁先谁后，异步则不存在这种顺序性.
- 同步：浏览器访问服务器请求，用户看得到页面刷新，重新发请求,等请求完，页面刷新，新内容出现，用户看到新内容,进行下一步操作。
- 异步：浏览器访问服务器请求，用户正常操作，浏览器后端进行请求。等请求完，页面不刷新，新内容也会出现，用户看到新内容。
 
### 如何解决跨域问题?
- CORS(Corss origin resource sharing)
  - 参考手机淘宝请求的配置项
  - access-control-allow-credentials: true
  - access-control-allow-origin: https://main.m.taobao.com
  - access-control-expose-headers: x-eagleeye-id 
  - access-control-allow-methods: GET,POST,OPTIONS
- Jsonp
  - 参考百度搜索
- 代理
  - 本地webpack的Proxy
  - 线上nginx/apache的反向代理
 
### http状态码有那些？分别代表是什么意思？
- 100  Continue   继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息 
- 200  OK         正常返回信息 
- 202  Accepted   服务器已接受请求，但尚未处理 
- 204  No Content   没有响应体
- 301  Moved Permanently  请求的网页已永久移动到新位置。 
- 302  Found       临时性重定向。 
- 304  Not Modified 自从上次请求后，请求的网页未修改过。 
- 400  Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。 
- 401  Unauthorized 请求未授权。 
- 403  Forbidden   禁止访问。 
- 404  Not Found   找不到如何与 URI 相匹配的资源。 
- 500  Internal Server Error  最常见的服务器端错误。 
- 502  Bad Getway    网关出错
- 503  Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。 
 
### 一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？（流程说的越详细越好） 
注：这个问题最主要的是问浏览器的渲染原理
而高手可以根据自己擅长的领域自由发挥，从URL规范、HTTP协议、DNS、CDN、数据库查询、到浏览器流式解析、CSS规则构建、layout、paint、onload/domready、JS执行、JS API绑定等等；
#### 详细版
- 1、浏览器会开启一个线程来处理这个请求，对 URL 分析判断如果是 http 协议就按照 Web 方式来处理; 
- 2、调用浏览器内核中的对应方法，比如 WebView 中的 loadUrl 方法; 
- 3、通过DNS解析获取网址的IP地址，设置 UA 等信息发出第二个GET请求; 
- 4、进行HTTP协议会话，客户端发送报头(请求报头); 
- 5、进入到web服务器上的 Web Server，如 Apache、Tomcat、Node.JS 等服务器; 
- 6、进入部署好的后端应用，如 PHP、Java、JavaScript、Python 等，找到对应的请求处理; 
- 7、处理结束回馈报头，此处如果浏览器访问过，缓存上有对应资源，会与服务器最后修改时间对比，一致则返回304; 
- 8、浏览器开始下载html文档(响应报头，状态码200)，同时使用缓存; 
- 9、文档树建立，根据标记请求所需指定MIME类型的文件（比如css、js）,同时设置了cookie; 
- 10、页面开始渲染DOM，JS根据DOM API操作DOM,执行事件绑定等，页面显示完成。 
 
#### 简洁版
- 浏览器根据请求的URL交给DNS域名解析，找到真实IP，向服务器发起请求； 
- 服务器交给后台处理完成后返回数据，浏览器接收文件（HTML、JS、CSS、图象等）； 
- 浏览器对加载到的资源（HTML、JS、CSS等）进行语法解析，建立相应的内部数据结构（如HTML的DOM）； 
- 载入解析到的资源文件，渲染页面，完成。 

### 浏览器的渲染原理
渲染引擎首先通过网络获得所请求文档的内容，通常以8K分块的方式完成。下面是渲染引擎在取得内容之后的基本流程：  
　　解析html以构建dom树 -> 构建render树 -> 布局render树 -> 绘制render树

这里先解释一下几个概念，方便大家理解：  
- DOM Tree：浏览器将HTML解析成树形的数据结构。
- CSS Rule Tree：浏览器将CSS解析成树形的数据结构。
- Render Tree: DOM和CSSOM合并后生成Render Tree。
- layout: 有了Render Tree，浏览器已经能知道网页中有哪些节点、各个节点的CSS定义以及他们的从属关系，从而去计算出每个节点在屏幕中的位置。
- painting: 按照算出来的规则，通过显卡，把内容画到屏幕上。
- reflow（回流）：当浏览器发现某个部分发生了点变化影响了布局，需要倒回去重新渲染，内行称这个回退的过程叫 reflow。reflow 会从 html 这个 root frame 开始递归往下，依次计算所有的结点几何尺寸和位置。reflow 几乎是无法避免的。现在界面上流行的一些效果，比如树状目录的折叠、展开（实质上是元素的显 示与隐藏）等，都将引起浏览器的 reflow。鼠标滑过、点击……只要这些行为引起了页面上某些元素的占位面积、定位方式、边距等属性的变化，都会引起它内部、周围甚至整个页面的重新渲 染。通常我们都无法预估浏览器到底会 reflow 哪一部分的代码，它们都彼此相互影响着。
- repaint（重绘）：改变某个元素的背景色、文字颜色、边框颜色等等不影响它周围或内部布局的属性时，屏幕的一部分要重画，但是元素的几何尺寸没有变。  

注意：
- (1)display:none 的节点不会被加入Render Tree，而visibility: hidden 则会，所以，如果某个节点最开始是不显示的，设为display:none是更优的。
- (2)display:none 会触发 reflow，而 visibility:hidden 只会触发 repaint，因为没有发现位置变化。
- (3)有些情况下，比如修改了元素的样式，浏览器并不会立刻reflow 或 repaint 一次，而是会把这样的操作积攒一批，然后做一次 reflow，这又叫异步 reflow 或增量异步 reflow。但是在有些情况下，比如resize 窗口，改变了页面默认的字体等。对于这些操作，浏览器会马上进行 reflow。
 
#### 来看看webkit的主要流程：
![webkit](https://jasonandjay.github.io/study/hooks/layoutEffect.png)

#### 再来看看Geoko的主要流程：
![Geoko](/study/book/Geoko.png)   
**Gecko** 里把格式化好的可视元素称做“帧树”（Frame tree），每个元素就是一个帧（frame）。 webkit 则使用”渲染树”这个术语，渲染树由”渲染对象”组成。webkit 里使用”layout”表示元素的布局，Gecko则称为”reflow”。Webkit使用”Attachment”来连接DOM节点与可视化信息以构建渲染树。一个非语义上的小差别是Gecko在HTML与DOM树之间有一个附加的层 ，称作”content sink”，是创建DOM对象的工厂。    
尽管Webkit与Gecko使用略微不同的术语，这个过程还是基本相同的，如下：  
1. 浏览器会将HTML解析成一个DOM树，DOM 树的构建过程是一个深度遍历过程：当前节点的所有子节点都构建好后才会去构建当前节点的下一个兄弟节点。
2. 将CSS解析成 CSS Rule Tree 。
3. 根据DOM树和CSSOM来构造 Rendering Tree。注意：Rendering Tree 渲染树并不等同于 DOM 树，因为一些像Header或display:none的东西就没必要放在渲染树中了。
4. 有了Render Tree，浏览器已经能知道网页中有哪些节点、各个节点的CSS定义以及他们的从属关系。下一步操作称之为layout，顾名思义就是计算出每个节点在屏幕中的位置。
5. 再下一步就是绘制，即遍历render树，并使用UI后端层绘制每个节点。  
注意：上述这个过程是逐步完成的，为了更好的用户体验，渲染引擎将会尽可能早的将内容呈现到屏幕上，并不会等到所有的html都解析完成之后再去构建和布局render树。它是解析完一部分内容就显示一部分内容，同时，可能还在通过网络下载其余内容。
 
### 请解释JSONP的工作原理，以及它为什么不是真正的AJAX 
jsonp的工作原理是，动态的创建了一个全局方法，并且动态生成script标签，将script标签的src属性变为（接口地址?callback=动态生成方法的方法名）请求数据。而后台则需要将接收到的callback值与数据一同返回，呈现出执行js方法的语句（方法名(数据)），其实就是在请求回来的数据中是执行请求是动态生成的js方法，生成了假象的ajax，所以jsonp只能做get类型请求
```js
function JSONP({
    url,
    params = {},
    callbackKey = 'cb',
    callback
}) {
    // 定义本地的一个callback的名称
    const callbackName = 'jsonpCallback';
    // 把这个名称加入到参数中: 'cb=jsonpCallback'
    params[callbackKey] = callbackName;
    //  把这个callback加入到window对象中，这样就能执行这个回调了
    window[callbackName] = callback;

    // 得到'id=1&cb=jsonpCallback'
    const paramString = Object.keys(params).map(key => {
        return `${key}=${params[key]}`
    }).join('&')
    // 创建 script 标签
    const script = document.createElement('script');
    const src = url.includes('?')? `${url}&${paramString}`: `${url}?${paramString}`
    script.setAttribute('src', src);
    document.body.appendChild(script);
}
JSONP({
    url: 'https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=%E5%A4%A9%E5%AE%89%E9%97%A8&req=2&bs=%E7%99%BE%E5%BA%A6&csor=3&pwd=tian%20an%20men',
    params: {},
    callbackKey: 'cb',
    callback (res) {
        console.log(res)
    }
})
```

### 请解释一下 JavaScript 的同源策略。 
同源策略是客户端脚本（尤其是Javascript）的重要的安全度量标准。它最早出自Netscape Navigator2.0，其目的是防止某个文档或脚本从多个不同源装载。  
它的精髓很简单：它认为自任何站点装载的信赖内容是不安全的。当被浏览器半信半疑的脚本运行在沙箱时，它们应该只被允许访问来自同一站点的资源，而不是那些来自其它站点可能怀有恶意的资源。  
这里的同源指的是：同协议，同域名和同端口
 
### 创建ajax过程
(1)创建`XMLHttpRequest`对象,也就是创建一个异步调用对象.
(2)创建一个新的`HTTP`请求,并指定该`HTTP`请求的方法、`URL`及验证信息.
(3)设置响应`HTTP`请求状态变化的函数.
(4)发送`HTTP`请求.
(5)获取异步调用返回的数据.
(6)使用JavaScript和DOM实现局部刷新.
```js
 var xmlHttp = new XMLHttpRequest(); 
 xmlHttp.open('GET','demo.php','true'); 
 xmlHttp.send() 
 xmlHttp.onreadystatechange = function(){ 
    if(xmlHttp.readyState === 4 & xmlHttp.status === 200){ 
    } 
} 
```
 
### 常见web安全及防护原理
#### sql注入原理
就是通过把SQL命令插入到Web表单递交或输入域名或页面请求的查询字符串，最终达到欺骗服务器执行恶意的SQL命令。
总的来说有以下几点：
1. 永远不要信任用户的输入，要对用户的输入进行校验，可以通过正则表达式，或限制长度，对单引号和双"-"进行转换等。
2. 永远不要使用动态拼装SQL，可以使用参数化的SQL或者直接使用存储过程进行数据查询存取。
3. 永远不要使用管理员权限的数据库连接，为每个应用使用单独的权限有限的数据库连接。
4. 不要把机密信息明文存放，请加密或者hash掉密码和敏感的信息。
 
#### XSS原理及防范
Xss(cross-site scripting)攻击指的是攻击者往Web页面里插入恶意 html标签或者javascript代码。比如：攻击者在论坛中放一个看似安全的链接，骗取用户点击后，窃取cookie中的用户私密信息；或者攻击者在论坛中加一个恶意表单当用户提交表单的时候，却把信息传送到攻击者的服务器中，而不是用户原本以为的信任站点。 
 
#### XSS防范方法
首先代码里对用户输入的地方和变量都需要仔细检查长度和对”<”,”>”,”;”,”’”等字符做过滤；其次任何内容写到页面之前都必须加以encode，避免不小心把html tag 弄出来。这一个层面做好，至少可以堵住超过一半的XSS 攻击。首先，避免直接在cookie 中泄露用户隐私，例如email、密码等等。其次，通过使cookie 和系统ip 绑定来降低cookie 泄露后的危险。这样攻击者得到的cookie 没有实际价值，不可能拿来重放。如果网站不需要再浏览器端对cookie 进行操作，可以在Set-Cookie 末尾加上HttpOnly 来防止javascript 代码直接获取cookie 。尽量采用POST 而非GET 提交表单 
 
### XSS与CSRF有什么区别吗？
XSS是获取信息，不需要提前知道其他用户页面的代码和数据包。CSRF是代替用户完成指定的动作，需要知道其他用户页面的代码和数据包。
要完成一次CSRF攻击，受害者必须依次完成两个步骤：
1. 登录受信任网站A，并在本地生成Cookie。
2. 在不登出A的情况下，访问危险网站B。
 
### HTTP和HTTPS
HTTP协议通常承载于TCP协议之上，在HTTP和TCP之间添加一个安全协议层（SSL或TSL），这个时候，就成了我们常说的HTTPS。
默认HTTP的端口号为80，HTTPS的端口号为443。
HTTPS和HTTP的区别主要如下：
1. https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。
2. http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。
3. http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
4. http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

 
### 为什么HTTPS安全
因为网络请求需要中间有很多的服务器路由器的转发。中间的节点都可能篡改信息，而如果使用HTTPS，密钥在你和终点站才有。https之所以比http安全，是因为他利用ssl/tls协议传输。它包含证书，卸载，流量转发，负载均衡，页面适配，浏览器适配，refer传递等。保障了传输过程的安全性
 
### GET和POST的区别，何时使用POST？
- GET：一般用于信息获取，使用URL传递参数，对所发送信息的数量也有限制，一般在2000个字符
- POST：一般用于修改服务器上的资源，对所发送的信息没有限制。  

GET方式需要使用Request.QueryString来取得变量的值，而POST方式通过Request.Form来获取变量的值，也就是说Get是通过地址栏来传值，而Post是通过提交表单来传值。
 
然而，在以下情况中，请使用 POST 请求： 
无法使用缓存文件（更新服务器上的文件或数据库）
向服务器发送大量数据（POST 没有数据量限制） 
发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠 
 
### ajax的缺点
1. ajax不支持浏览器back按钮
2. 安全问题 AJAX暴露了与服务器交互的细节 
3. 对搜索引擎的支持比较弱
4. 破坏了程序的异常机制
5. 不容易调试
 
### 前端需要注意哪些SEO
1. 合理的title、description、keywords：搜索对着三项的权重逐个减小，
   - title值强调重点即可，重要关键词出现不要超过2次，而且要靠前，不同页面title要有所不同； 
   - description把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面description有所不同；
   - keywords列举出重要关键词即可 
2. 语义化的HTML代码，符合W3C规范：语义化代码让搜索引擎容易理解网页
3. 重要内容HTML代码放在最前：搜索引擎抓取HTML顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容一定会被抓取
4. 重要内容不要用js输出：爬虫不会执行js获取内容
5. 少用iframe：搜索引擎不会抓取iframe中的内容
6. 非装饰性图片必须加alt
7. 提高网站速度：网站速度是搜索引擎排序的一个重要指标

### AJAX的请求方式
- GET：GET是http的默认请求方式， 一般用来获取数据。
- HEAD：HEAD方法与GET方法一样，都是向服务器发出指定资源的请求。但是，服务器在响应HEAD请求时不会回传资源的内容部分，即：响应主体。这样，我们可以不传输全部内容的情况下，就可以获取服务器的响应头信息。HEAD方法常被用于客户端查看服务器的性能。
- POST：POST请求会向指定资源提交数据，请求服务器进行处理。如：表单提交、文件上传。
- PUT：PUT请求会身向指定资源位置上传其最新内容，通过该方法客户端可以将指定资源的最新数据传送给服务器取代指定的资源的内容。
- DELETE：DELETE请求用于请求服务器删除所请求URI所标识的资源。DELETE请求后指定资源会被删除。
- TRACE：返回接受到的请求，用来查看数据经过中间服务器时发生了哪些变动。
- OPTIONS：OPTIONS请求与HEAD类似，一般也是用于客户端查看服务器的性能。 这个方法会请求服务器返回该资源所支持的所有HTTP请求方法，该方法会用'*'来代替资源名称，向服务器发送OPTIONS请求，可以测试服务器功能是否正常。JavaScript的XMLHttpRequest对象进行CORS跨域资源共享时，就是使用OPTIONS方法发送嗅探请求，以判断是否有对指定资源的访问权限。
- CONNECT：要求使用SSL和TLS进行TCP通信。
- PATCH：请求修改局部数据

### RESTful架构
REST是一种架构风格：无状态，以资源为中心，充分利用HTTP协议和URI协议，提供统一的接口定义，使得它作为一种设计Web服务的方法而变得流行。在某种意义上，通过强调URI和HTTP等早期Internet标准，REST是对大型应用程序服务器时代之前的Web方式的回归。

#### 架构约束：
- 客户-服务器:通信只能由客户端单方面发起，表现为请求-响应的形式。
- 无状态:通信的会话状态（Session State）应该全部由客户端负责维护。
- 缓存:响应内容可以在通信链的某处被缓存，以改善网络效率。
- 统一接口:通信链的组件之间通过统一的接口相互通信，以提高交互的可见性。
- 分层系统:通过限制组件的行为（即，每个组件只能"看到"与其交互的紧邻层），将架构分解为若干等级的层。
- 按需代码:支持通过下载并执行一些代码（例如Java Applet、Flash或JavaScript），对客户端的功能进行扩展。

#### 主要特征：
- 面向资源（Resource Oriented）
- 可寻址（Addressability）
- 连通性（Connectedness）
- 无状态（Statelessness）
- 统一接口（Uniform Interface）
- 超文本驱动（Hypertext Driven）

### cookie 和session 的区别：     
1. cookie数据存放在客户的浏览器上，session数据放在服务器上。    
2. cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗考虑到安全应当使用session。
3. session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能考虑到减轻服务器性能方面，应当使用COOKIE。     
4. 单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。     
5. 所以一般情况下将登陆信息等重要信息存放为SESSION其他信息如果需要保留，可以放在COOKIE中

### fetch与ajax的区别？      
Ajax主要是利用的是XMLHttpRequest对象来请求数据的。  
Fetch是window的一个方法 主要特点是  
1. 第一个参数是URL  
2. 第二个参数可选参数 可以控制不同的init对象
3. 使用了js 中的promise对象

fetch 的第二参数中  
1. 默认的请求为get请求 可以使用method:post 来进行配置 
2. 第一步中的 response有许多方法 json() text() formData()
3. Fetch跨域的时候默认不会带cookie ，如果你想在fetch请求里附带cookies之类的凭证信息，可以将 credentials参数设置成 “include” 值。还有就是fetch返回的promise在某些错误的http状态下如400、500等不会reject的错误状态，相反它会被resolve；只有网络错误会导致请求不能完成时，fetch 才会被 reject；所以一般会对fetch请求做一层封装，在resolve中真对于大于200和 小于300的状态返回正确信息，其他则返回错误信息所有的IE浏览器都不会支持 fetch()方法


### 请你谈谈Cookie的弊端
cookie虽然在持久保存客户端数据提供了方便，分担了服务器存储的负担，但还是有很多局限性的。
1. 每个特定的域名下最多生成20个cookie
2. IE6或更低版本最多20个cookie
3. IE7和之后的版本最后可以有50个cookie。
4. Firefox最多50个cookie
5. chrome和Safari没有做硬性限制

#### 优点：极高的扩展性和可用性
1. 通过良好的编程，控制保存在cookie中的session对象的大小。 
2. 通过加密和安全传输技术（SSL），减少cookie被破解的可能性。 
3. 只在cookie中存放不敏感数据，即使被盗也不会有重大损失。 
4. 控制cookie的生命期，使之不会永远有效。偷盗者很可能拿到一个过期的cookie。 

#### 缺点：
1. `Cookie`数量和长度的限制。每个domain最多只能有20条cookie，每个cookie长度不能超过4KB，否则会被截掉.   
2. 安全性问题。如果cookie被人拦截了，那人就可以取得所有的session信息。即使加密也与事无补，因为拦截者并不需要知道cookie的意义，他只要原样转发cookie就可以达到目的了。   
3. 有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务器端保存一个计数器。如果我们把这个计数器保存在客户端，那么它起不到任何作用。 