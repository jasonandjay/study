# WXS
##### wxs是什么？
> WXS（WeiXin Script）是小程序的一套脚本语言，结合 WXML，可以构建出页面的结构。
##### 注意
1. wxs 不依赖于运行时的基础库版本，可以在所有版本的小程序中运行。
1. wxs 与 javascript 是不同的语言，有自己的语法，并不和 javascript 一致。
1. wxs 的运行环境和其他 javascript 代码是隔离的，wxs 中不能调用其他 javascript文件中定义的函数，也不能调用小程序提供的API。
1. wxs 函数不能作为组件的事件回调。
1. 由于运行环境的差异，在 iOS 设备上小程序内的 wxs 会比 javascript 代码快 2 ~ 20 倍。在 android 设备上二者运行效率无差异。


##### 页面渲染

```
<!--wxml-->
<wxs module="m1">
    var msg = "hello world";

    module.exports.message = msg;
</wxs>

<view> {{m1.message}} </view>


页面输出
hello world
```

##### 数据处理

```
// page.js
Page({
  data: {
    array: [1, 2, 3, 4, 5, 1, 2, 3, 4]
  }
})
```

```
<!--wxml-->
<!-- 下面的 getMax 函数，接受一个数组，且返回数组中最大的元素的值 -->
<wxs module="m1">
var getMax = function(array) {
  var max = undefined;
  for (var i = 0; i < array.length; ++i) {
    max = max === undefined ? 
      array[i] : 
      (max >= array[i] ? max : array[i]);
  }
  return max;
}

module.exports.getMax = getMax;
</wxs>

<!-- 调用 wxs 里面的 getMax 函数，参数为 page.js 里面的 array -->
<view> {{m1.getMax(array)}} </view>
```
页面输出

```
5
```


