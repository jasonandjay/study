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
Object.prototype.MyCall = function(){

}

Object.prototype.MyApply = function(){

}

Object.prototype.MyBind = function(){

}
```

### 继承ES5, ES6
```js
1. 原型链
实例，构造函数，原型对象
```