# Promise/Aysnc
#### 1、es6定义变量
1. var
2. let
3. import
4. class
5. function
6. const

#### 2、Promise
- 是异步编程的一种解决方案
- 是一个对象

**缺点**
1. 无法取消

```
Promise.all()  会包装多个实例成为一个新的promise实例

new Promise((resolve.reject) =>{
    // do some async function
    if(true){
        // resolve 代表成功的回调
        resolve(data);
    }else{
        // reject 代表失败的回调
        reject(data);
    }
})
```
#### 3、异步加载图片
1. 数据请求 -> 接口(Interface)
2. 创建图片
3. 插入到页面当中
#### 4、继承
obj1 extends obj2

如果继承就一定要在contructor第一行加super()方法
#### 5、异步加载
1. ajax
2. 加载图片
3. jsonp

#### 6、语法糖
再不改变代码的情况下让代码更简洁
#### 7、async
1. 内置执行器
2. 更好的语义
3. 更广的适用性
4. 返回Promise