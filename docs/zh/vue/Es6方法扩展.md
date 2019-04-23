# ES6扩展

方法 | 说明
---|---
Number.isFinite() | 判断一个值是不是有限的
Number.isNan() | 判断一个值是不是NaN
Number()|类型转换
Numbar.parseInt()|将字符串转化为整数
Numbar.parseFloat()|将字符串转化为小数
Numbar.isInteger()|判断一个数是不是一个整数
Number.isSafeInteger()|判断是不是一个安全的数
Math.cbrt()|用于计算一个数的立方根
Math.trunc()|用于去除一个数的小数部分，返回整数


```
1、如果参数类型不是数值，Number.isFinite一律返回false
2、如果参数类型不是NaN，Number.isNaN一律返回false
注:es5含有隐式转换，es6不含有隐式转换

// es5
isFinite(25) // true
isFinite("25") // true
// es6
Number.isFinite(25) // true
Number.isFinite("25") // false


// es5
isNaN(NaN) // true
isNaN("NaN") // true
// es6
Number.isNaN(NaN) // true
Number.isNaN("NaN") // false
Number.isNaN(1) // false

3、Number.parseInt(), Number.parseFloat()
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45

这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。
Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true

4、Number.isInteger()用来判断一个数值是否为整数
Number.isInteger(25) // true
Number.isInteger(25.1) // false
Number.isInteger(25.0) // true
// 如果参数不是数值，Number.isInteger返回false
Number.isInteger() // false
Number.isInteger(null) // false
Number.isInteger('15') // false
Number.isInteger(true) // false


5、Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内
Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false

Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false

6、Math.trunc方法用于去除一个数的小数部分，返回整数部分
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0

// 对于非数值，Math.trunc内部使用Number方法将其先转为数值
Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0

// 对于空值和无法截取整数的值，返回NaN
Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN

7、Math.cbrt方法用于计算一个数的立方根
Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(1)  // 1
Math.cbrt(2)  // 1.2599210498948734
对于非数值，Math.cbrt方法内部也是先使用Number方法将其转为数值
Math.cbrt('8') // 2
Math.cbrt('hello') // NaN

```

#### 1、设置默认值
- 回调里面使用箭头函数，this指向上级对象
- 回调里面使用function,this指向当前对象

```
 // es5
 let fun = function(val){
    var val = val || 666;
    return val
 }
 console.log(fun())
  
 
 // es6
 let fun = (val=666) => {
     return val;
 }
 // 简写
 let fun = (val=666) => val;
 
 // 函数默认值的注意事项
 // 定义形参默认值，需要注意：先声明后使用，遵循声明变量的规则
 let fun = (val,val) => { // 报错
    console.log(val)
 }
 let fun = (val2 = 2,val1 = val2) => { 
    console.log(val1)
 }
 fun();
 
 
 // 设置形参后，函数内部的私有变量如果用let命令来声明变量，不得重复定义
 let fun = (val) => {  // 报错
     let val = 666;
     console.log(val)
 }
 fun(555);
 
 
 // 获取函数所有形参
 // es5
 let fun = function(){
    console.log(arguments); // 类数组
    [...arguments].forEach(item=>{ // 通过...把它转为一个数组
        console.log(item);
    })
 }
 fun(1,2,3,4,5)
 
 // es6
 // 箭头函数没有arguments对象
 // reset 参数返回一个实参的数组的集合
 let fun = (...reset) => {
     console.log(reset)
     reset.forEach(item=>{ 
        console.log(item);
    })
 }
 fun(1,2,3,4,5,6)
 
 
 
```
#### 2、扩展运算符 ...
- 可以展开一个数组
#### 3、伪逗号
- es2017允许你去写一个逗号
```
let obj = {
    name:'zs',
    age:18,
}
```
#### 4、数组的扩展

```
1、扩展运算符
// 将数组转化为数组项的参数系列
let arr1 = [1,2,3,4];
let arr2 = [...arr1];


2. Array.from(arr)
// 将类似数组、可以遍历对象(包括set map解构类型的数据) 转为数组
...arr 展开数组的每一项   [...arr] 转为一个数组


3、数组的空值/空位
let arr = new Array(5);
// 长度为5   a[0]为undefined


4、Array.of()  用来将一组参数序列转为数组,可以用来代替new Array()
let arr = Array.of(1,2,3,4,5);
console.log(arr)
// 不传参为空数组


5、Array.copyWithin(target,start,end)
用数组中的一些项，替换数组中的值
// target(必须)： 要替换项的下标
// start(可选)： 替换的起始下标
// end(可选)： 替换的结束下标
let arr = [1, 4, 2, 5, 3, 2];
console.log(arr.copyWithin(0, 4))
// [ 3, 2, 2, 5, 3, 2 ]


6、Array.find()   返回满足条件的第一个项
let arr = [2,8,4,3];
let res = arr.find((item,index,array)=>{
    return item>2;
})
console.log(res) // 8


7、Array.findIndex()   返回满足条件的第一个项下标
let arr = [2,8,4,3];
let res = arr.findIndex((item,index,array)=>{
    return item==2;
})
console.log(res) // 0


8、Array.fill()  给数组填充相同的值
let arr = new Array(5);
arr.fill("mmd",2,3) 
// 2 是开始下标
// 3 是结束下标


9、去重 结合set实现数组去重
let arr = [1,2,3,4,5,2,1,3,4,4];
let res = new Set(arr);
console.log(res) // 转为一个类数组
let result = Array.from(res); // 转数组


```
#### 5、this指向

```
构造器 === 构造函数
1、箭头函数不是一个构造器，不可以实例化
let fun = () => {
    
}
new fun()  // 报错

2、::  左边是一个对象  右边是一个方法
```

#### 6、对象扩展

```
console.log(Object.is(123,'123')) // false


1、Object.assign()  默认是浅拷贝
 // 3个参数是深度拷贝  Object.assign({},obj1,obj2)
 // 2个参数是浅拷贝 Object.assign(obj1,obj2)
 
 有{}会生成新串   没有会替换原字符串
```
