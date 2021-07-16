# Node篇

### 为什么要用node? 
总结起来node有以下几个特点:简单强大，轻量可扩展。  
- 简单体现在node使用的是javascript,json来进行编码，人人都会；
- 强大体现在非阻塞IO,可以适应分块传输数据，较慢的网络环境，尤其擅长高并发访问；
- 轻量体现在node本身既是代码，又是服务器，前后端使用统一语言;
- 可扩展体现在可以轻松应对多实例，多服务器架构，同时有海量的第三方应用组件． 
 
### node的构架是什么样子的?
主要分为三层，应用app >> V8及node内置架构 >> 操作系统.   
V8是node运行的环境，可以理解为node虚拟机．  
node内置架构又可分为三层: 核心模块(javascript实现) >> c++绑定 >> libuv + CAes + http. 
 
### node有哪些核心模块?
EventEmitter, Stream, FS, Net和全局对象  
node全局对象
1. node有哪些全局对象?  
process, console, Buffer和exports
 
2. process有哪些常用方法?  
process.stdin, process.stdout, process.stderr, process.on, process.env, process.argv, process.arch, process.platform, process.exit
 
3. console有哪些常用方法?  
console.log/console.info, console.error/console.warning, console.time/console.timeEnd, console.trace, console.table
 
4. node有哪些定时功能?  
setTimeout/clearTimeout, setInterval/clearInterval, setImmediate/clearImmediate, process.nextTick
 
### node中的事件循环是什么样子的?
总体上执行顺序是：process.nextTick >> setImmidate >> setTimeout/SetInterval   
[参考官方介绍](https://github.com/nodejs/node/blob/master/doc/topics/event-loop-timers-and-nexttick.md)

### node中的Buffer如何应用?
Buffer是用来处理二进制数据的，比如图片，mp3,数据库文件等.Buffer支持各种编码解码，二进制字符串互转．
 
### EventEmitter
 
1. 什么是EventEmitter?   
EventEmitter是node中一个实现观察者模式的类，主要功能是监听和发射消息，用于处理多模块交互问题.
 
2. 如何实现一个EventEmitter?   
主要分三步：定义一个子类，调用构造函数，继承EventEmitter 
代码演示
```js
var util = require('util'); 
var EventEmitter = require('events').EventEmitter; 
 
function MyEmitter() { 
    EventEmitter.call(this); 
} // 构造函数 
 
util.inherits(MyEmitter, EventEmitter); // 继承 
 
var em = new MyEmitter(); 
em.on('hello', function(data) { 
    console.log('收到事件hello的数据:', data); 
}); // 接收事件，并打印到控制台 
em.emit('hello', 'EventEmitter传递消息真方便!'); 
```
3. EventEmitter有哪些典型应用?
   - 模块间传递消息 
   - 回调函数内外传递消息 
   - 处理流数据，因为流是在EventEmitter基础上实现的
   - 观察者模式发射触发机制相关应用 
 
4. 怎么捕获EventEmitter的错误事件?   
监听error事件即可，如果有多个EventEmitter,也可以用domain来统一处理错误事件     

代码演示
```js
var domain = require('domain'); 
var myDomain = domain.create(); 
myDomain.on('error', function(err){ 
    console.log('domain接收到的错误事件:', err); 
}); // 接收事件并打印 
myDomain.run(function(){ 
    var emitter1 = new MyEmitter(); 
    emitter1.emit('error', '错误事件来自emitter1'); 
    emitter2 = new MyEmitter(); 
    emitter2.emit('error', '错误事件来自emitter2'); 
}); 
```

### EventEmitter中的newListenser事件有什么用处?
newListener可以用来做事件机制的反射，特殊应用，事件管理等。当任何on事件添加到EventEmitter时，就会触发newListener事件，基于这种模式，我们可以做很多自定义处理.
 
代码演示
```js 
var emitter3 = new MyEmitter();
emitter3.on('newListener', function(name, listener) {
    console.log("新事件的名字:", name); 
    console.log("新事件的代码:", listener); 
    setTimeout(function(){ console.log("我是自定义延时处理机制"); }, 1000); 
});
emitter3.on('hello', function(){
    console.log('hello　node'); 
});
```

### Stream
1. 什么是Stream?   
stream是基于事件EventEmitter的数据管理模式．由各种不同的抽象接口组成，主要包括可写，可读，可读写，可转换等几种类型．
 
2. Stream有什么好处?  
非阻塞式数据处理提升效率，片断处理节省内存，管道处理方便可扩展等. 
 
3. Stream有哪些典型应用?  
文件，网络，数据转换，音频视频等. 
 
4. 怎么捕获Stream的错误事件?   
监听error事件，方法同EventEmitter. 
 
5. 有哪些常用Stream,分别什么时候使用?   
Readable为可被读流，在作为输入数据源时使用；Writable为可被写流,在作为输出源时使用；Duplex为可读写流,它作为输出源接受被写入，同时又作为输入源被后面的流读出．Transform机制和Duplex一样，都是双向流，区别时Transfrom只需要实现一个函数_transfrom(chunk, encoding, callback);而Duplex需要分别实现_read(size)函数和_write(chunk, encoding, callback)函数.
 
6. 实现一个Writable Stream?   
三步走:  
1)构造函数call Writable   
2)继承Writable  
3)实现_write(chunk, encoding, callback)函数  

代码演示
```js
var Writable = require('stream').Writable;
var util = require('util');
 
function MyWritable(options) {
    Writable.call(this, options); 
} // 构造函数 
util.inherits(MyWritable, Writable); // 继承自Writable 
MyWritable.prototype._write = function(chunk, encoding, callback) {
    console.log("被写入的数据是:", chunk.toString()); // 此处可对写入的数据进行处理 
    callback(); 
};
 
process.stdin.pipe(new MyWritable()); // stdin作为输入源，MyWritable作为输出源  
```

### 文件系统
1. 内置的fs模块架构是什么样子的?   
fs模块主要由下面几部分组成: 
   1) POSIX文件Wrapper,对应于操作系统的原生文件操作 
   2) 文件流 fs.createReadStream和fs.createWriteStream 
   3) 同步文件读写,fs.readFileSync和fs.writeFileSync 
   4) 异步文件读写, fs.readFile和fs.writeFile 
1. 读写一个文件有多少种方法?  
    总体来说有四种: 
    1) POSIX式低层读写 
    2) 流式读写 
    3) 同步文件读写 
    4) 异步文件读写 
2. 怎么读取json配置文件?  
主要有两种方式  
第一种是利用node内置的require('data.json')机制，直接得到js对象;   
第二种是读入文件入内容，然后用JSON.parse(content)转换成js对象．  
二者的区别是require机制情况下，如果多个模块都加载了同一个json文件，那么其中一个改变了js对象，其它跟着改变，这是由node模块的缓存机制造成的，只有一个js模块对象; 第二种方式则可以随意改变加载后的js变量，而且各模块互不影响，因为他们都是独立的，是多个js对象. 
4. fs.watch和fs.watchFile有什么区别，怎么应用?  
二者主要用来监听文件变动．fs.watch利用操作系统原生机制来监听，可能不适用网络文件系统; fs.watchFile则是定期检查文件状态变更，适用于网络文件系统，但是相比fs.watch有些慢，因为不是实时机制． 
 
### 网络
1. node的网络模块架构是什么样子的?  
node全面支持各种网络服务器和客户端，包括tcp, http/https, tcp, udp, dns, tls/ssl等.
 
2. node是怎样支持https,tls的?  
主要实现以下几个步骤即可: 1) openssl生成公钥私钥 2) 服务器或客户端使用https替代http 3) 服务器或客户端加载公钥私钥证书 
 
3. 实现一个简单的http服务器?(必须会手写)   
经典又很没毛意义的一个题目．思路是加载http模块，创建服务器，监听端口. 
 
代码演示
```js 
var http = require('http'); // 加载http模块 
 
http.createServer(function(req, res) { 
    res.writeHead(200, {'Content-Type': 'text/html'}); // 200代表状态成功, 文档类型是给浏览器识别用的 
    res.write('<meta charset="UTF-8"><h1>我是标题啊！</h1><font color="red">这么原生，初级的服务器，下辈子能用着吗?!</font>'); // 返回给客户端的html数据 
    res.end(); // 结束输出流 
}).listen(3000); // 绑定3ooo, 查看效果请访问 http://localhost:3000 
```

### child-process
1. 为什么需要child-process?   
node是异步非阻塞的，这对高并发非常有效．可是我们还有其它一些常用需求，比如和操作系统shell命令交互，调用可执行文件，创建子进程进行阻塞式访问或高CPU计算等，child-process就是为满足这些需求而生的．child-process顾名思义，就是把node阻塞的工作交给子进程去做．
 
2. exec,execFile,spawn和fork都是做什么用的?  
exec可以用操作系统原生的方式执行各种命令，如管道 cat ab.txt | grep hello; execFile是执行一个文件; spawn是流式和操作系统进行交互; fork是两个node程序(javascript)之间时行交互. 
 
3. 实现一个简单的命令行交互程序?   
那就用spawn吧   
 
代码演示
```js
var cp = require('child_process'); 
var child = cp.spawn('echo', ['你好', "钩子"]); // 执行命令 

child.stdout.pipe(process.stdout); // child.stdout是输入流，process.stdout是输出流 
// 这句的意思是将子进程的输出作为当前程序的输入流，然后重定向到当前程序的标准输出，即控制台
```

###  两个node程序之间怎样交互? 
用fork嘛，上面讲过了．原理是子程序用process.on, process.send，父程序里用child.on,child.send进行交互. 
代码演示
```js
1) fork-parent.js 
var cp = require('child_process'); 
var child = cp.fork('./fork-child.js'); 
child.on('message', function(msg){ 
    console.log('老爸从儿子接受到数据:', msg); 
}); 
child.send('我是你爸爸，送关怀来了!'); 
 
2) fork-child.js 
process.on('message', function(msg){ 
    console.log("儿子从老爸接收到的数据:", msg); 
    process.send("我不要关怀，我要银民币！"); 
}); 
```

### 怎样让一个js文件变得像linux命令一样可执行? 
1) 在myCommand.js文件头部加入#!/usr/bin/env node 
2) chmod命令把js文件改为可执行即可 
3) 进入文件目录，命令行输入myComand就是相当于node myComand.js了 
 
### child-process和process的stdin,stdout,stderror是一样的吗?
概念都是一样的，输入，输出，错误，都是流，区别是在父程序眼里，子程序的stdout是输入流，stdin是输出流． 
 
### node高级话题(异步，部署，性能调优，异常调试等)
1. node中的异步和同步怎么理解  
node是单线程的，异步是通过一次次的循环事件队列来实现的．同步则是说阻塞式的IO,这在高并发环境会是一个很大的性能问题，所以同步一般只在基础框架的启动时使用，用来加载配置文件，初始化程序什么的．
 
2. 有哪些方法可以进行异步流程的控制?   
   - 多层嵌套回调 
   - 为每一个回调写单独的函数，函数里边再回调
   - 用第三方框架比方async, q, promise等 
 
3. 怎样绑定node程序到80端口?  
   1) sudo 
   2) apache/nginx代理 
   3) 用操作系统的firewall iptables进行端口重定向 
 
4. 有哪些方法可以让node程序遇到错误后自动重启(守护进程)?  
    forever、 nohup、pm2
 
5. 怎样充分利用多个CPU?   
一个CPU运行一个node实例 
 
6. 怎样调试node程序?   
node --debug app.js 和node-inspector 

7. express response有哪些常用方法  
   - res.download() 弹出文件下载 
   - res.end() 结束response 
   - res.json() 返回json 
   - res.jsonp() 返回jsonp 
   - res.redirect() 重定向请求 
   - res.render() 渲染模板 
   - res.send() 返回多种形式数据 
   - res.sendFile 返回文件 
   - res.sendStatus() 返回状态   
  
8. apache,nginx有什么区别?  
二者都是代理服务器，功能类似。apache应用简单，相当广泛，nginx在分布式，静态转发方面比较有优势。 




