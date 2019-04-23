---
title: 阿里巴巴
sidebar: auto
sidebarDepth: 2
---
# 阿里巴巴笔试+面试

##  阿里面试考查知识点
- 安全方面
    - XSS: 跨站脚本攻击（通过input框或者地址栏注入js脚本）
    - CSRF：跨站请求伪造（通过浏览器请求自动携带cookie）
    - SQL注入： 
- 路由相关
    - 路由模式（hash，browser）
    - 路由传参（url，state, path+query, name+params）
    - 路由监听（beforeEach, afterEach, subscribe）
    - 路由原理（hashChange + popState）
- webpack
    - entry
    - output
    - modules
    - devServer
    - plugins
    - NODE_ENV = development
- v-model
    - v-bind：value + v-on:onChange
- redux数据流
    - store->组件： provider+connect
    - 组件->action: dispatch
    - action->store: 纯函数  
- es6
    - promise
    - async/await
    - 装饰器@
    - class
    - 解构+reset操作符
- git flow
    - 每人一个分支，开发完毕合并分支：直接合并或者PR
    - 修复bug，从主分支临时开一个分支，修复完删除
    - master主分支，develop开发测试分支

##  阿里笔试题经典案例
###  1. ES6
#### 1.1 关于Class
##### 1.1.1 阿里云产品线
::: tip Question:
阿里云产品线十分丰富，拥有ECS、RDS等数百款产品，每个产品都具有一些通用属性，例如：ID（id），地域（region），名称（name），同时每个产品又包含自己特有的属性。 ECS拥有实例（instance）属性，可选值有ecs.t1.small、ecs.t3.small、ecs.t1.large RDS拥有数据库类型（dbType）属性，可选值有mysql、mssql、PPAS 请使用你的面向对象知识，基于ES6语法编写ECS、RDS两个类，并实现如下方法： 1. config() 返回一个字面量对象，可以拿到所有的成员变量。 2. buy() 返回一个URL，格式https://www.aliyun.com/buy?id=xxx&region=xxx&name=xxx&每个产品自己特有的成员变量
:::
```js
class Base{
	constructor(options){
		this.id = options.id || '';
		this.region = options.region || '';
		this.name = options.name || '';
	}
	config(){
		return {
			id: this.id,
			name: this.name,
			region: this.region
		}
	}
	buy(){
		return `https://www.aliyun.com/buy?id=${this.id}&region=${this.region}&name=${this.name}`
	}
}

class ECS extends Base{
	constructor(options){
		super(options);
		if (['ecs.t1.small', 'ecs.t3.small', 'ecs.t1.large'].indexOf(options.instance) != -1){
			this.instance = options.instance	
		}else{
			this.instance = '';
		}
	}
	config(){
		return Object.assign({}, super.config(), {instance: this.instance});
	}
	buy(){
		return `${super.buy()}&instance=${this.instance}`
	}
}

class RDS extends Base{
	constructor(options){
		super(options);
		if (['mysql', 'mssql', 'PPAS'].indexOf(options.dbType) != -1){
			this.dbType = options.dbType	
		}else{
			this.dbType = '';
		}
	}
	config(){
		return Object.assign({}, super.config(), {dbType: this.dbType});
	}
	buy(){
		return `${super.buy()}&dbType=${this.dbType}`
	}
}

let ecs = new ECS({name:'ecs',id:1,region:'华北',instance:'ecs.t3.small'})
ecs.config();
ecs.buy();

let rds = new ECS({name:'rds',id:2,region:'华东',dbType:'PPAS'})
rds.config();
rds.buy();
```

##### 1.1.2 阿里云任务调度
::: tip Question:
使用js是实现以下效果 
var priorityQueue = new PriorityQueue();  
priorityQueue.enqueue('优先级1-1', 1);  
priorityQueue.enqueue('优先级3-1', 3);  
priorityQueue.enqueue('优先级1-2', 1);  
priorityQueue.enqueue('优先级2-1', 2);  
priorityQueue.print();  
// 优先级1-1 优先级1-2 优先级2-1 优先级3-1
priorityQueue.dequeue(); 
:::

```js
class PriorityQueue{
    constuctor(obj){
        this.arr=[];
    }
    enqueue(str,num){
        this.arr.push(str)
    }
    print(){
        this.arr.sort()
        console.log(this.arr)
        return this.arr;
    }
}
var priorityQueue=new PriorityQueue();
priorityQueue.enqueue('优先级1-1',1)
priorityQueue.enqueue('优先级3-1',3)
priorityQueue.enqueue('优先级1-2',1)
priorityQueue.enqueue('优先级2-1',2)
priorityQueue.print();
```
#### 1.2 关于promise
##### 1.2.1 图片加载
:::tip Question:
实现图片的依次加载和并行加载
:::
```js
// 封装加载图片的promise
let loadImg = (src)=>{
    return new Promise((resolve, reject)=>{
        let img = new Image();
        img.onload = ()=>{
            resolve(img);
        }
        img.onerror = ()=>{
            reject(new Error());
        }
    })
}
const imgs = ['url1', 'url2', 'url3'];
// 依次加载图片
async function fSync(){
    for (let i=0,len=imgs.length; i<len; i++){
        let img = await loadImg(imgs[i]);
        document.body.appendChild(img);
    }
}
// 并行加载图片
function fAsync(){
    imgs.forEach(async item=>{
        let img = await loadImg(imgs[i]);
        document.body.appendChild(img);
    })
}
```

##### 1.2.2 Promise原生实现
::: tip Question:
原生实现promise，实现依次调用，eg:a().then()
:::
两种实现思路

思路一：利用异步，后置resove和reject的执行
```js
    function MyPromise(fn){
        // promise内部状态
        this.status = 'pending';

        fn(this.resolveWrap.bind(this), this.rejectWrap.bind(this));
    }   
    MyPromise.prototype.resolveWrap = function(res){
        if (this.status != 'pending'){
            return;
        }
        let that = this;
        setTimeout(function(){
            that.resolve(res);
            that.status = 'fulfilled';
        }, 0)
    }
    MyPromise.prototype.rejectWrap = function(res){
        if (this.status != 'pending'){
            return;
        }
        let that = this;
        setTimeout(function(){
            that.reject(res);
            that.status = 'rejected';
        }, 0)
    }
    // 实现then方法
    MyPromise.prototype.then = function(resolve, reject){
        this.resolve = resolve || function(){};
        this.reject = reject || function(){};
    }


    // 测试MyPromise
    var loadImg = function(){
        return new MyPromise((resolve, reject)=>{
            let img = new Image();
            img.onload = function(){
                resolve(img);
                reject(new Error('图片加载失败'));
            }
            img.onerror = function(){
                reject(new Error('图片加载失败'));
            }
            img.src = "http://p1.meituan.net/movie/7a2c3acb1bda2baad8df309b046d0872344909.jpg@160w_220h_1e_1c";
        })
    }

    loadImg().then(res=>{
        document.body.appendChild(res);
    });
```

思路二：先保存resolve和reject执行时传递的参数，then方法里实际执行
```js
    function MyPromise(executor){
        let self = this;
        self.status = 'pending';
        self.value = undefined;
        self.reason = undefined;
        function resolve(value) {
            if(self.status === 'pending') {
                self.status = 'resolved';
                self.value = value;
            }
        }
        function reject(reason) {
            if (self.status === 'pending'){
                self.status = 'rejected';
                self.reason = reason;
            }
        }
        try {
            excutor(resolve, reject);
        }catch(e) {
            reject(e);
        }
    }
    MyPromise.prototype.then = function(onFulfilled, onRejected){
        let self = this;
        if (self.status === 'resolved'){
            onFulfilled(self.value);
        }
        if (self.status === 'rejected'){
            onRejected(self.reason);
        }
    }
    // 测试MyPromise
    var loadImg = function(){
        return new MyPromise((resolve, reject)=>{
            let img = new Image();
            img.onload = function(){
                resolve(img);
                reject(new Error('图片加载失败'));
            }
            img.onerror = function(){
                reject(new Error('图片加载失败'));
            }
            img.src = "http://p1.meituan.net/movie/7a2c3acb1bda2baad8df309b046d0872344909.jpg@160w_220h_1e_1c";
        })
    }

    loadImg().then(res=>{
        document.body.appendChild(res);
    });
```
### 2.DOM树在内存中的表示及JSX的遍历
#### 2.1 DOM遍历
::: tip Question: 
请用递归的方式遍历树形数据结构中的每一个节点
:::
```js
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake'
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }
        ]
      }
    ]
  }
];
// 深度优先遍历
function eachOpt(option){
	option.forEach(element => {
		console.log('element value....',element.value)
		if(Array.isArray(element.children) && element.children.length){
        	eachOpt(element.children)
      	}
   	});
}
eachOpt(options)
```
#### 2.2 DOM解析
::: tip Question:
将类似以下JSON表示的树状结构(可以无限层级)通过parseDOM函数(使用document.createElement,
document.createTextNode,appendChild等方法)生成一颗DOM树(返回一个element元素)
:::
```js
const JsonTree={
    "tagName":"ul",
    "props":{
        "className":"list",
        "data-name":"jsontree"
    },
    "tagName":"a",
    "props":{
        "href":"https://www.aliyun.com",
        "target":"_blank"
    },
    "children":"阿里云"
  } 
};

function parseDOM(jsontree){
    const {tagName,props,children}=jsontree;
    const element = document.createElement("ul")
    if(Array.isArray(children)){
        children.forEach(item=>{
            element.appendChild(parseDOM(item))
        })
    }else{
        let child = document.createText(children); 
        element.appendChild(child);
    }
    if(props){
        Object.keys(props).forEach(item=>{
            element[item]=props[item];
        })
    }
    return element;
}
```

### 3. JS原生
#### 3.1 字符串操作
:::tip Question:
在开发中，我们经常会碰到将abc-xyz这类格式的字符串转为AbcXyz形式的驼峰字符串进行处理，
例如：hello-world我们希望能够变成驼峰风格的HelloWorld，请编写代码实现这个camelize(str)方法 
:::
```js
function camelize(str) {
    //补充代码
  var strArr = str.split('-');
  return strArr.map(item=>{
  	let upperCase = item[0].toUpperCase();
  	return upperCase+item.slice(1)
  }).join('');
}
camelize('hello-world');
```
#### 3.2 a链接监听
::: tip Question:
a链接点击监听实现
监听网页上的所有a链接，当用户点击一个a链接随机加上时间戳
:::
```js
document.body.addEventListener('click',function(e){
  let target=e.target;
  console.log(target.nodeName)
  if(target.nodeName==='A'){
    e.preventDefault();
    let href=target.href+Math.random();
    window.location.href=href;
  }
},false)
```
### 3.3 数组去重
::: tip Question:
请将编写一个函数将 [3, 5, 7, 2, 1, 8, 9, 0, 5, 23, 15, 5, 1, 5, 8] 这样的一个组件中重复的元素去除掉
:::
```js
function splice(){
    var _arr=[3, 5, 7, 2, 1, 8, 9, 0, 5, 23, 15, 5, 1, 5, 8]
        for(var i=0;i<_arr.length;i++){
            for(var n=i+1;n<_arr.length;n++){
                if(_arr[i]===_arr[n]){
                    _arr.splice(n--,1);//因为元素数量减少了，如果向前挪动一个下标3个以上的连续重复的元素会有遗漏
                }
            }
        }
        console.log(_arr);
    }
    splice()
```

### 3.4 评分组件
::: tip Question:
可根据传入的评分和总数，返回评星结果（用 ★ 和 ☆ 描述） 2. 评分必选项，四舍五入，总数可选，大于0的整数，默认为5 3. 对于评分为空或小于0、评分大于总数、总数小于0或总数非整数的情况，返回'error' 示例：
getRate(4, 8); // ★★★★☆☆☆☆  
getRate(3.4); // ★★★☆☆   
getRate(5, 2); // 'error' 
getRate(-2); // 'error'  
getRate(3, 5.5); // 'error'
:::


### 4.性能优化
#### 4.1函数的节流与原生事件
:::tip Question:
请用js实现一个监听浏览器窗口变化的函数，当浏览器窗口的宽度大于等于 600px 
的时候console.log('hello')（持续大于等于600px的话打印一次即可），请用你觉得最优的实现
:::
```js
var throttle = function(func, ms){
    var start = +new Date();
    
    return function(){
        var now = +new Date();
        if (now- start > ms){
            setTimeout(function(){
                func();
            }, ms);
            start = now;
        }
    }
}

var flag = false;
var resizeFunc = throttle(function(){
    if (!flag && window.innerWidth >= 600){
        console.log('hello');
        flag = true;
    }else if(window.innerWidth < 600){
        flag = false;
    }
}, 300);

window.addEventListener('resize', resizeFunc);
```

### 5.关于排序
#### 5.1 二分排序
:::tip Question
写一个有效的算法完成矩阵搜索，这个矩阵有如下特点：
    1) 矩阵中的每行数字都是经过排序的，从左到右依次变大。
    2) 每行的第一个数字都比上一行的最后一个数字大
例如：
[
    [2,   4,  8,  9],
    [10, 13, 15, 21],
    [23, 31, 33, 51]
]
实现一个函数，搜索这个数组
输入：4，返回：true
输入：3，返回：false
:::
```js
const arr =  [
    [2,   4,  8,  9],
    [10, 13, 15, 21],
    [23, 31, 33, 51]
];



// 一维数组二分法查找
function searchArray(arr, num){
    console.log('arr...', arr, num);
    let len = arr.length;
    if (arr[0] > num || arr[len-1] < num){
        return false;
    }else {
        let mid = Math.floor(arr.length/2);
        if (arr[mid] > num){
            return searchArray(arr.slice(0, mid), num);
        }else if(arr[mid] < num){
            return searchArray(arr.slice(mid+1, len), num);
        }else{
            return true;
        }
    }
}

// 二维数组二分查找
function search(arr, num){
    console.log('arr..', arr);
    let len = arr.length,
        arrLen = arr[0].length;
    let middle = Math.floor(arr.length/2);
    if (arr[0][0] > num || arr[len-1][arrLen-1] < num){
        return false;
    }else{
        if (arr[middle][0] > num ){
            // 当最小值大于num，在前面查找
            return search(arr.slice(0, middle), num);
        }else if(arr[middle][arrLen-1] < num){
            // 当最大值小于num，在后面查找
            return search(arr.slice(middle+1, len), num);
        }else{
            // 在这中间，调用一维数组查找方法
            return searchArray(arr[middle], num);
        }
    }
}
let result = search(arr, 52);
console.log('查询结果...', result);
```
#### 5.2 快速排序
```js
let arr1 = [1,23,7,5,3,2,8,2,19,99,10,12,17,78,87];
function quickStart(arr){
    let mid = Math.floor(arr.length/2);
    let left = [],
        right = [];
    // 递归终止条件
    if (arr.length <= 1){
        return arr;
    }
    arr.forEach(item=>{
        if (item > arr[mid]){
            right.push(item);
        }else if(item < arr[mid]){
            left.push(item);
        }
    })
    return quickStart(left).concat([arr[mid]], quickStart(right));
}
console.log('排序前', arr1, '排序后：', quickStart(arr1));
```
#### 4.3 冒泡排序
```js
let arr1 = [1,23,7,5,3,2,8,2,19,99,10,12,17,78,87];
function bubble(arr){
    for (let i=0, len=arr.length; i<len; i++){
        for (let j=i+1, len=arr.length; j<len; j++){
            let tmp = 0;
            if (arr[i] > arr[j]){
                tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    return arr;
}
console.log('排序前', arr1, '排序后：', bubble(arr1));
```