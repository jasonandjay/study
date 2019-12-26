---
title: 面试必会
sidebar: auto
sidebarDepth: 2
---

# [“寒冬”三年经验前端面试总结（含头条、百度、饿了么、滴滴等）](https://juejin.im/post/5d9c2005f265da5bb977c55e)

## CSS
### 盒模型
```css
怪异模式box-sizing = border-box, width = content+padding+border
标准模式，box-sizing = content-box, width = content
```
### 垂直居中方法
```css
// 不定宽高
{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
{
    display: flex;
    align-items: center;
    justify-content: center;
}
{
    postiton: fixed;
    top: 50%;
    left: 50%
    transform: translate(-50%, -50%)
}
```

### 三栏布局
```css
两边固定，中间flex:1
```

### 选择器权重
```css
!important > inline > id > class > tag
```

### 清除浮动和[BFC|IFC](https://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)
```css
1.浮动的产生：
    浮动元素形成新的BFC，父元素会忽略子元素中所有浮动的元素

2.浮动带来的问题：
    高度塌陷

3.解决浮动：
    3.1在浮动元素后面加一个元素(标签和伪元素))，让父元素强行包裹
    3.2父元素也形成一个BFC（overflow:hidden, float: left|right）

4.BFC能解决的问题
    高度塌陷，边距折叠
```

### position属性
```css
static, relative, absoulte, fixed, sticky(粘性定位)
重绘与重排（回流）, 脱离文档流来减少重排
```

### 自适应的正方形
```css
宽高为屏幕40%的正方形
{
    width: 3rem;
    height: 3rem;
}
{
    width: 40vw;
    height: 40vw;
}
{
    width: 300rpx;
    height: 300rpx;
}
```

### [用css实现一个三角形](https://www.jb51.net/article/42513.htm)


## Javascript
### 防抖和节流
```js
// 区别：目的都是减少事件触发频率，节流会在固定频率内触发，防抖会只执行一次
// 节流
function throttle(func, delay=150){
    let start = +new Date(),
        timer = 0;

    return function(){
        let cur = +new Date();
        if (cur - start > delay){
            timer = setTimeout(()=>{
                func();
            }, delay);
            start = cur;
        }
    }
}

// 防抖
function debounce(func, delay=150){
    let start = +new Date(),
        timer = 0;
    
    return function(){
        let cur = +new Date();
        window.clearTimeout(timer);
        timer = setTimeout(()=>{
            func();
        }, delay);
        start = cur;
    }
}
```

### 深拷贝
```js
// 1. js里所有的深拷贝都是最外层的深拷贝，内存还是浅拷贝，比如：object.assign, ..., slice, concat
// 2. JSON.stringify和JSON.parse会忽略函数，时间对象，正则等js内置对象
// 3. 深拷贝的原理是依赖递归逐层拷贝
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]' 
  ||  Object.prototype.toString.call(obj) === '[object Array]'

}

function deepCopy(source,hash = new WeakMap()){
  // 判断如果参数不是一个对象，返回改参数
  if(!isObject(source)) return source;
  if(hash.has(source)) return hash.get(source); // 如何拷贝过该对象，则直接返回该对象
  // 判断参数是对象还是数组来初始化返回值
  let res = Array.isArray(source)?[]:{};
  hash.set(source,res); // 哈希表添加新对象
  // 循环参数对象的key
  for(let key in source){
    // 如果该key属于参数对象本身
    if(Object.prototype.hasOwnProperty.call(source,key)){
      // 如果该key的value值是对象，递归调用深拷贝方法进行拷贝
      if(isObject(source[key])){
        res[key] = deepCopy(source[key],hash);
      }else{
        // 如果该key的value值不是对象，则把参数对象key的value值赋给返回值的key
        res[key] = source[key];
      }
    }
  }
  // 返回返回值
  return res;
};


// 测试
let obj1 = {
  name:'obj.name',
  un:undefined,
  nu:null,
  arr: [1,2,3],
  sy:Symbol(123),
  say:function(){
    console.log(this.name);
  },
  reg:/\d{6}/g,
  date:new Date(),
  child:{
    name:'child.name'
  }
}

obj1.child.child= obj1.child;
let obj2 = deepCopy(obj1);
console.log(obj1);
console.log(obj2);
console.log(obj2.sy === obj1.sy)
console.log(obj2.arr === obj1.arr)
obj2.name = 'obj2.name';
obj2.say();
```

### 数组去重，数组乱序
```js
// 数组去重
1. [...new Set(arr)]
2. indexOf+遍历
3. 有序数组，不引用第三方变量，遍历+判断相邻元素是否相等+splice

// 数组乱序
arr.sort(()=>Math.random()-.5)
```

### 手写call, apply和bind
```js
Object.prototype.myCall = function(context){
    if(typeof this != 'function'){
        throw new TypeError('this is not a function')
    }
    context.fn = this;
    var result= [];
    var args = [];
    for(var i = 1; i< arguments.length; i++){
        args.push('arr[' + i + ']')
    }
    result = eval('context.fn(' +args+ ')');

    delete context.fn;
    return result;
}

Object.prototype.myApply = function(context, arr){
    if(typeof this != 'function'){
        throw new TypeError('this is not a function')
    }
    context.fn = this;
    var result= [];
    if(!arr){
        result = context.fn()
    }else{
        var args = [];
        for(var i = 0; i< arr.length; i++){
            args.push('arr[' + i + ']')
        }
        result = eval('context.fn(' +args+ ')');
    }
    delete context.fn;
    return result;
}

Object.prototype.myBind = function(){
    if(typeof this != 'function'){
        throw new TypeError('this is not a function')
    }
    var self = this;
    var args = Array.prototype.slice.call(arguments,1);
    var F = function(){};
    F.prototype = this.prototype;
    var bound = function(){
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof F ? this: context, args.concat(bindArgs))
    };
    bound.prototype = new F();
    return bound;
}
```

### 继承ES5, ES6
```js
1. 原型链
实例，构造函数，原型对象

2. new的过程, 构造函数Func, 实例obj
var obj = new Func();
相等于
var obj = null;
obj.__propto__ = Func.proptotype;
Func.call(obj);

3. 无new实例化
Func(){
    if (!this instanceof Func){
        return new Func(arguments);
    }
}
```

### sleep函数
```js
// 链式调用+无new实例化+event loop
// 1. 测试构造函数
Person('li');
// This is li

// 2. 测试sleep
Person('li').sleep(10).eat('danner')

// This is li
// ...等待10ms
// sleep after 10
// eat danner

// 3. 测试sleepFirst和sleep
Person('li').sleepFirst(5000).eat('danner').sleep(3000).eat('food').sleep(3000).eat(123);
// ...等待5s
// sleep before 5000
// This is li
// eat dinner
// sleep after 3000
// eat food
// sleep after 3000
// eat 123
         

function Person(name){
    if (this instanceof Person){
        // 设置任务队列
        this.queues = [];
        // 把初始化的任务放入队列
        this.queues.push({
            delay: 0,
            cb: ()=> console.log(`This is ${name}`)
        })
        // 异步调用run方法执行队列
        setTimeout(()=>{
            this.run();
        });
    }else{
        // 无new实例化
        return new Person(name);
    }
}

Person.prototype.run = async function(){
    // 调用for循环阻塞任务队列的执行
    for (let i=0, len=this.queues.length; i<len; i++){
        let item = this.queues[i];
        if (item.delay){
            await this.toPromise(item.cb, item.delay)();
        }else{
            await item.cb();
        }
    }
}

Person.prototype.toPromise = function(cb, delay){
    // 把一个有延迟的函数转化为promise，延迟时间为状态改为resolve的时间
    return function(){
        return new Promise((resolve, reject)=>{
            setTimeout(function(){
                cb();
                resolve();
            }, delay);
        })
    }
}

Person.prototype.sleep = function(delay){
    this.queues.push({  
        delay,
        cb: ()=>console.log(`sleep after ${delay}`)
    })
    return this;
}

Person.prototype.eat = function(food){
    this.queues.push({  
        delay: 0,
        cb: ()=>console.log(`eat ${food}`)
    })
    return this;
}

Person.prototype.sleepFirst = function(delay){
    this.queues.unshift({  
        delay: delay,
        cb: ()=>console.log(`sleep before ${delay}`)
    })
    return this;
}
```

### [实现promise](https://jasonandjay.github.io/study/zh/interview/ali.html#_1-es6)
- 一. 先执行Promise的参数，保存结果，当调用then的时候执行真正的回调
- 二. 利用异步让Promise构造函数内部的resolve和reject晚于真正的回调执行

### Promise.all,思路就是轮询
```js
Promise.all = function(arr){
    return new Promise((resolve,reject) => {
        if(!Array.isArray(arr)){
            throw new TypeError(`argument must be a array`)
        }
        var length = arr.length;
        var resolveNum = 0;
        var resolveResult = [];
        for(let i = 0; i < length; i++){
            arr[i].then(data => {
                resolveNum++;
                resolveResult.push(data)
                if(resolveNum == length){
                    return resolve(resolveResult)
                }
            }).catch(data => {
                return reject(data)
            })
        }
    })
}
```

### Promise.retry
```js
Promise.retry = function(fn, times, delay) {
    return new Promise(function(resolve, reject){
        var error;
        var attempt = function() {
            if (times == 0) {
                reject(error);
            } else {
                fn().then(resolve)
                    .catch(function(e){
                        times--;
                        error = e;
                        setTimeout(function(){attempt()}, delay);
                    });
            }
        };
        attempt();
    });
};
```

### eventEmitter|发布订阅|Dom三级事件
```js
class EventEmitter{
    store = {}

    on(type, cb, once=false){
        if (this.store[type] && this.store[type].cb.length){
            this.store[type].push(cb);
        }else{
            this.store[type] = {cb: [cb], once}
        }
    }

    emit(type, payload){ 
        if (this.store[type]){
            this.store[type].cb.forEach(item=>{
              item(payload);
            })
            if (this.store[type].once){
                delete this.store[type];
            }
        }
    }

    off(type, cb){
        if (this.store[type]){
            var index = this.store[type].cb.findIndex(item=>item===cb);
            this.store[type].cb.splice(index, 1);
        }
    }

    once(type, cb){
        this.on(type, cb, true);
    }
}
```

### 实现instanceof
```js
function myInstanceof(left,right){
    // 实例的原型对象
    var proto = left.__proto__;
    // 构造函数的原型对象
    var protoType = right.prototype;
    while(true){
        if(proto === null){
            return false
        }
        if(proto == protoType){
            return true
        }
        proto = proto.__proto__
    }
}
```

### 实现数组flat，filter
```js
// 数组扁平化
toString().split(',')

// 展平一级
function flat(arr){
    var result = [];
    for(var i = 0; i < arr.length; i++){
        if(Array.isArray(arr[i])){
            result = result.concat(flat(arr[i]))
        }else{
            result.push(arr[i]);
        }
    }
    return result;
}

//展平多层
function flattenByDeep(array,deep){
    var result = [];
    for(var i = 0 ; i < array.length; i++){
        if(Array.isArray(array[i]) && deep >= 1){
            result = result.concat(flattenByDeep(array[i],deep -1))
        }else{
            result.push(array[i])
        }
    }
    return result;
}

// 数组过滤
Array.prototype.myFilter = function(fn,context){
    if(typeof fn != 'function'){
        throw new TypeError(`${fn} is not a function`)
    }
    let arr = this;
    let reuslt = []
    for(var i = 0;i < arr.length; i++){
        let temp= fn.call(context,arr[i],i,arr);
        if(temp){
            result.push(arr[i]);
        }
    }
    return result
}

Array.prototype.myForeach = function(fn,context){
    if(typeof fn != 'function'){
        throw new TypeError(`${fn} is not a function`)
    }
    let arr = this;
    for(var i = 0;i < arr.length; i++){
        fn.call(context,arr[i],i,arr);
    }
}

Array.prototype.myMap = function(fn,context){
    if(typeof fn != 'function'){
        throw new TypeError(`${fn} is not a function`)
    }
    let arr = this;
    let reuslt = []
    for(var i = 0;i < arr.length; i++){
        result.push(fn.call(context,arr[i],i,arr));
    }
    return result;
}
```

### [函数柯里化](https://www.jianshu.com/p/2975c25e4d71)
```js
function currying(fn,...args){
    if(fn.length <= args.length){
        return fn(...args)
    }
    return function(...args1){
        return currying(fn,...args,...args1)
    }
}
function add(a,b,c){
    return a + b + c
}
add(1,2,3) // 6
var curryingAdd = currying(add);
curryingAdd(1)(2)(3) // 6



// 柯里化+toString隐式转换
function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments);

    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function() {
        _args.push(...arguments);
        return _adder;
    };

    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        });
    }
    return _adder;
}

add(1)(2)(3)                // 6
add(1, 2, 3)(4)             // 10
add(1)(2)(3)(4)(5)          // 15
add(2, 6)(1)                // 9
```

### EventLoop
任务队列分为同步任务，宏任务（定时器），微任务（Promise）
执行优先级：同步>异步，微任务>宏任务
执行顺序：按照加入队列的顺序
```js
console.log(1);     // 1.第一个同步任务

setTimeout(() => {
    console.log(2);     // 7.第一个宏任务
    Promise.resolve().then(() => {
        console.log(3)  // 8.第一个宏任务中的微任务
    });
});

new Promise((resolve, reject) => {
    console.log(4)      // 2.第二个同步立即执行的同步任务
    resolve(5)
}).then((data) => {
    console.log(data);  // 4. 第一个微任务

    Promise.resolve().then(() => {
        console.log(6)  // 5. 第二个微任务
    }).then(() => {
        console.log(7)  // 6.第三个微任务
        
        setTimeout(() => {
            console.log(8)  //10. 第三个宏任务
        }, 0);
    });
})

setTimeout(() => {
    console.log(9);     // 9. 第二个宏任务
})

console.log(10);    // 3.同步任务
```