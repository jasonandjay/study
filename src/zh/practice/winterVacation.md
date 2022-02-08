---
title: 2022寒假作业
sidebar: auto
sidebarDepth: 3
---
# 2022寒假作业
## day1
### 1.使用发布订阅模式  
实现$on和$emit、$off 方法
```js
class Event {
  constructor() {
    // 存储事件
    this.callbacks = {};
  }

  // 监听
  $on(name, fn) {
    // 一个名字可以订阅多个事件函数
    (this.callbacks[name] || (this.callbacks[name] = [])).push(fn);
  }

  // 触发
  $emit(name, arg, context) {
    let cbs = this.callbacks[name];
    if (cbs) {
      cbs.forEach((v) => {
        v.call(context, arg);
      });
    }
  }

  // 移除事件
  $off(name) {
    this.callbacks[name] = null;
  }

  // 触发一次
  $once(name, fn) {
    const wrapFn = ()=>{
        fn();
        this.$off(name, wrapFn);
    }
    this.$on(name, fn);
  }
}

// 简单使用
let event = new Event();
event.$on("event1", function (arg) {
  console.log("事件1", arg);
});

event.$on("event2", function (arg) {
  console.log("事件2", arg);
});

event.$emit("event1", { name: "anyway" });
event.$emit("event2", { age: "20" });
```

### 2.实现深拷贝支持函数正则日期对象
```js
function cloen(obj) {
  // 当null NaN undefined number string等基本数据类型时直接返回
  if ((obj === null) | (typeof obj !== "object")) {
    return obj;
  }

  // Date类型
  if (obj instanceof Date) {
    const copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // 正则类型
  if (obj instanceof RegExp) {
    const Constructor = obj.constructor;
    return new Constructor(obj);
  }

  // 如果是数组等引用数据类型
  if (obj instanceof Array || obj instanceof Object) {
    const copyObj = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        copyObj[key] = clone(obj[key]);
      }
    }
    return copyObj;
  }
}
```

### 3.实现instanceOf方法
```js
function instanceof_myself(leftValue, rightValue) {
  let rightPrototype = rightValue.prototype; // 获取右侧构造函数对硬的原型
  let leftProto = leftValue.__proto__; // 获取左侧实例对应的原型
  while (true) {
    if (leftProto == null) {
      return fales;
    } else if (leftProto === rightPrototype) {
      return true;
    }
    leftProto = leftProto.__proto__;
  }
}
```

### 4.红绿灯问题  
绿灯3秒，红灯2秒，黄灯1秒，每隔一秒打印一条记录 这样循环,要求：可以在控制台可以运行的代码，并且正确输出
```js
// 绿灯 3
// 绿灯 2
// 绿灯 1
// 红灯 2
// 红灯 1
// 黄灯 1
// 绿灯 3 
const trafficLights = [{color: '绿灯', delay: 3}, {color: '红灯', delay: 2}, {color: '黄灯', delay: 1}]
class Traffic{
    geneLight(color, delay){
      return new Promise(function(resolve,reject){
        console.log(color+'  '+delay );
        let timer = setTimeout(function(){
            window.clearTimeout(timer);
            resolve();
        }, delay*1000);
      })
    }
    async run(){
      let index = 0;
      while(true){
        await this.geneLight(trafficLights[index].color, trafficLights[index].delay);
        index = ++index%(trafficLights.length);
      }
    }
}

new Traffic().run()
```
## day2

### 1.封装数组的reduce

```js
Array.prototype.MyReduce = function (func, init) {
  var len = this.length;
  var prev = init;
  var i = 0;
  if (init == undefined) {
    prev = this[0];
    i = 1;
  }
  for (i; i < len; i++) {
    prev = func(prev, this[i], i, this);
  }
  return prev;
};
```

### 2.使用冒泡和快速实现数组排序

```js
// 冒泡排序
function bubbleSort(arr) {
  let temp; // 定义一个临时变量
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // 如果顺序不对，则交换两个元素
      if (arr[j + 1] < arr[j]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

// 快速排序
void quickSort(int *arr, int begin, int end){
  if(begin > end)
      return;
  int tmp = arr[begin];
  int i = begin;
  int j = end;
  while(i != j){
      while(arr[j] >= tmp && j > i)
          j--;
      while(arr[i] <= tmp && j > i)
          i++;
      if(j > i){
          int t = arr[i];
          arr[i] = arr[j];
          arr[j] = t;
      }
  }
  arr[begin] = arr[i];
  arr[i] = tmp;
  quickSort(arr, begin, i-1);
  quickSort(arr, i+1, end);
}
```

### 3.封装Storage对象

```js
/** storage结构
 *  key: {
 *    value,
 *    type, 'raw'原始值,'stringify'序列化
 *    expires,
 *    timestamp
 *  }
 */
const Storage = {
  set(key, value, expires){
    let storageValue = {
      value,
      type: 'raw',
      expires,
      timestamp: +new Date()
    }
    let type = Object.prototype.toString.call(value);
    if (type === '[Object Object]' || type === '[Object Array]'){
      storageValue.type = 'stringify';
      storageValue.value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, JSON.stringify(storageValue))
  },
  get(key){
    let value = window.localStorage.getItem(key);
    if (value){
      value = JSON.parse(value);
      // 处理过期时间
      if (value.expires){
        let now = +new Date();
        if (now - value.timestamp > value.expires*1000){
          window.localStorage.removeItem(key);
          return undefined;
        }else{
          if (value.type === 'stringify'){
            return JSON.parse(value.value)
          }
          return value.value;
        }
      }else{
        if (value.type === 'stringify'){
          return JSON.parse(value.value)
        }
        return value.value;
      }
    }
  }
}
```

### 4.将数字转换成中文大写的表示  
处理到万级别, 例如 toChineseNum(12345)，返回 一万二千三百四十五

```js
const toChineseNum = (num) => {
  const keys = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const count = ["", "十", "百", "千", "万"];

  let str = "";
  let nums = num.toString().split("").reverse();

  str = nums.reduce((pre, value, index) => {
    return keys[value] + (value == 0 ? "": count[index]) + pre;
  }, "");

  return str.replace(/零(?=零)|零$|零(?=万)/g, "");
};
toChineseNum(12345);
```
## day3

### 1.实现时间戳转中文时间戳
实现时间戳转中文时间戳 https://momentjs.com/ 参考 momentjs 实现方法
```js
// new Date() = > 2022年02月08日
function timestamp(time) {
    const date = time?new Date(time): new Date();
    const year = date.getFullYear(), //获取当前年份
          month = (date.getMonth() + 1).toString().padStart(2, '0'),
          day = (date.getDate()).toString().padStart(2, '0');  //获取当前日期
    return year + "年" + month + "月" + date + '日';
}
```

### 2.数组扁平化和迭代器
```js
// 接受一个仅包含数字的多维数组 ，返回一个迭代器，可以遍历得到它偏平以后的结果
const arr = [1,2,[3,4,[5,6,[7,8]]]];
function * flatten(arr) {
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    if (item instanceof Array) {
      yield flatten(item);
    } else {
      yield item;
    }
  }
}
```

### 3.对象和字符串互转  

```js
// 复习对象方法，实现key=value&key=value格式转对象
const jsonObj = {
  创维电视: 50,
  卡萨帝北京: 40,
  家电: 40,
  松下: 30,
  格力: 20,
  海尔: 20,
  海尔商城: 20,
  海尔客服: 20,
  美的: 20,
  美菱: 20,
};

function toObj(str){
  let obj = {};
  str.split('&').forEach(item=>{
    let [key, value] = item.split('=');
    obj[key] = value;
  })
  return obj;
}
function toString(obj){
  let str = '';
  for (let key in obj){
    str += `${key}=${obj[key]}&`
  }
  return str.slice(0, -1);
}
```

### 4.封装实现数组的map、filter和every

```js
//封装map方法
Array.prototype.myMap = function(callback){
  if(!Array.isArray(this) || !this.length || typeof callback !== 'function'){
      return [];
  }else{
      debugger;
    let result = [];
    for(let i = 0; i <this.length; i++){
      result.push(callback(this[i], i, this))
    }
    return result
  }
}

// 封装filter方法
Array.prototype.myFilter = (arr,callback)=>{
  if(!Array.isArray(arr) || !arr.length || typeof callback !== 'function'){
      return [];
  }else{
    let result = []
    for(let i = 0 ; i <arr.length;i++){
      if(callback(arr[i], i, arr)){
        result.push(arr[i])
      }
    }
    return result
  }
}

// 实现every
Array.prototype.myEvery = (fn, value)=>{
  if (typeof fn !== "function") {
      return false;
  }
  const len = this.length;
  for (let i = 0; i < len; i++) {
      const result = fn.call(value, arr[i], i, arr);
      if (!result){
        return false;
      }
  }
  return true;
}
```
## day4

### 1.用自己的话描述 js 垃圾回收机制

```js
// 垃圾回收是一种自动的内存管理机制，当计算机上的动态内存不再需要时，就应该予以释放，以让出内存。直白的来说就是程序是运行在内存中的，当声明一个变量，定义一个函数 时都会占用内存，内存的容量是有限的，如果函数 变量等只有出生没有消亡的过程，那内存迟早会有被占用完的时候，这个时候不仅自己的程序无法正常运行，连其他程序也无法正常运行，所以在计算机中，我们需要垃圾回收机制。需要注意的是，定义中的“自动”的意思是语言可以帮助我们回首内存垃圾，但并不代表我们不用关心内存管理如果操作不当，js中依旧会出现内存溢出的情况。
```

### 2.实现千分符，123456789=>123,456,789

```js
 function reverseNum(num){
        if(typeof num !== "undefined"){
            var arr = (num + "").split(""),
                arr = arr.reverse();
 
 
            for(var i=0, len=arr.length/3; i<len; i++){
                arr.splice(i*3+i, 0, "-");
            }
            arr.reverse();
            var str = arr.join("");
            str = str.substring(0, str.length-1);
            str = str.replace(/-/g,",");
            return str;
        }
    }
    console,log(reverseNum(123456789));
```

### 3.深入理解 this 执行

```js
/*function Foo() {
  getName = function () {
    alert(1);
  };
  return this;
}
Foo.getName = function () {
  alert(2);
};
Foo.prototype.getName = function () {
  alert(3);
};
var getName = function () {
  alert(4);
};
function getName() {
  alert(5);
}

// 输出值？ 请写出原因
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName(); */

// 输出值？
1.Foo.getName()
Foo的静态方法优先级高于方法内部定义，调用Foo.getName()，输出2

2.getName()
function getName()变量提升，声明后被var getName= function(){...}覆盖，输出4

3.Foo().getName()
调用Foo()函数，返回的this，则当前的全局window变为Foo内部的this，再调用getName()时就是调用Foo内的getName()，输出1

4.getName()
由于第三步已经将Foo的this覆盖了window，调用getName()时，仍然时调用Foo的getName()，输出1

5.new Foo.getName()
等价于new (Foo.getName())，先执行Foo.getName()，输出2，再创建Foo.getName()方法的实例。

6.new Foo().getName()
相当于(new Foo()).getName()，先创建Foo的实例，调用实例的getName()方法，由于自身没有该方法，去原型链上找，它的原型指向构造函数的prototype，即调用Foo.prototype.getName()，输出3

7.new new Foo().getName()
相当于new (new Foo().getName())，即先执行new Foo().getName()，由第六步可知，输出3，再创建Foo.prototype.getName()这个函数的实例返回。

 //原因
new Foo() 属于new（带参数列表）
new Foo属于new（无参数列表）
无参数列表的优先级为18，而成员访问的优先级为19，高于无参数列表。因此new Foo.getName()先执行Foo.getName()

带参数列表的优先级为19，而成员访问的优先级也为19，按照运算符规则（同一优先级，按照从左向右的执行顺序），new Foo().getName()先执行new Foo()，再对new之后的实例进行成员访问.getName()操作。
这是js运算符的优先级链接，可查看每个运算符的优先级。
```

### 4.重绘和回流（重排）的区别和关系

```js
/*
1.重绘（repaint或redraw）：当盒子的位置、大小以及其他属性，例如颜色、字体大小等都确定下来之后，浏览器便把这些原色都按照各自的特性绘制一遍，将内容呈现在页面上。重绘是指一个元素外观的改变所触发的浏览器行为，浏览器会根据元素的新属性重新绘制，使元素呈现新的外观。
触发重绘的条件：改变元素外观属性。如：color，background-color等。

2.重排（重构/回流/reflow）：当渲染树中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建, 这就称为回流(reflow)。每个页面至少需要一次回流，就是在页面第一次加载的时候。
触发重排的条件：
1、页面渲染初始化；(无法避免)

2、添加或删除可见的DOM元素；

3、元素位置的改变，或者使用动画；

4、元素尺寸的改变——大小，外边距，边框；

5、浏览器窗口尺寸的变化（resize事件发生时）；

6、填充内容的改变，比如文本的改变或图片大小改变而引起的计算值宽度和高度的改变；

7、读取某些元素属性：（offsetLeft/Top/Height/Width,　clientTop/Left/Width/Height,　scrollTop/Left/Width/Height,　width/height,　getComputedStyle(),　currentStyle(IE)　)

3.重绘和回流（重排）的区别和关系:在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程称为重绘。，但重绘不一定会引发重排。*/
```
