# Vue动画
#### 1、transition
1. name=""  -> 手写
2. animate.css   
3. velocity.js
#### 2、进入动画  从0-1
1. v-enter  // 进入前
2. v-enter-active  // 定义进入过渡生效时的状态
3. v-enter-to  // 定义进入过渡结束时的状态
#### 3、离开动画   从1-0
1. v-leave // 离开前
2. v-leave-active // 离开中
3. v-leave-to // 离开后
#### 4、过渡持续时间
- :duration='1000'
- :duration='{enter:'1000',leave:'1000'}'
#### 5、JavaScript钩子

```
v-on:before-enter  
v-on:enter  
v-on:after-enter  
v-on:enter-cancelled   // 取消动画(删除)
```

