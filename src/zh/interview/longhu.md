---
title: 龙湖地产
sidebar: auto
sidebarDepth: 2
---
# 龙湖地产
## 1. 块级和行内元素元素有哪些，它们有什么区别？

## 2. 为什么要少用Iframe?



## 3. 用css写出这样一个图形  (上下左右居中)



## 4. 写画如下代码的页面展示效果图，c盒子有position：relative 和没position值有什么区别？
```js
<style>
.box {
width: 200px;
height: 200px;
display: inline-block;
}
.a {
background-color: tan;
position: absolute;
}
.b {
background-color: blue;
position: absolute;
}
.c {
background-color: green;
position: relative;
}
</style>
</head>
<body>
<div class="a box"></div>
<div class="b box"></div>
<div class="c box"></div>
</body>
```

## 5. call,apply和bind的区别列举使用方法


## 6. 写出下面代码的输入值
```js
6.1 (function(x){
    delete x;
return x;
})(1);


6.2 var y = 1, x = y = typeof x;
console.log(x);


6.3 (function f(f){
    return typeof f();
  })(function(){ return 1; });


6.4 !!typeof(null)
```

## 7. 写出如下代码的运行结果
```js
function Fun(){
      var printNum= function(){
          console.log(1);
      }
      return this;
 }
 Fun.printNum = function(){
      console.log(2);
 }
 Fun.prototype.printNum = function(){
     console.log(3);
 }
 var printNum = function(){
     console.log(4);
 }
 function printNum (){
     console.log(5);
 }
         
 Fun().printNum();
 printNum();
 Fun();
 printNum();
 new Fun().printNum();
 new new Fun().printNum();
```
## 8. var arr = [1,2,[3,4,[5]],6,[7,[8,9,[10,11,[12]]]]]请写一个方法把数组拍扁成普通数组。
```js
    arr.toString();
```

## 9. 写一写你常用和重要的es6知识点

## 10. 同步和异步的概念和区别。

## 11. 写出常见的http状态码及含义。

## 12. [数组去重的多种方法](https://m.jb51.net/show/118657)


## 13.url从输入地址栏到打开页面一系列操作描述一下

## 14.vue的相关知识
