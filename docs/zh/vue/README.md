# VUE
#### 1、Vue是什么?
- Vue是一个渐进式的javascript开发框架，通过组件的开发，最后进行组件的组合，合并组件形成页面
- 构造器(构造函数)
- 自动化构建工具
##### 优点
1. 组件化开发
2. 单页面路由
3. 丰富的Api方法
4. 双向的数据绑定
5. 单向数据流
6. 易于结合其他第三库
##### 缺点
1. 生态系统不够完善
2. 可扩展性稍差

> 1、全局安装   npm install -g vue-cli

> 2、创建项目 vue init webpack myprojuct

> 3、安装依赖包 npm install

```
下包：
    cnpm i --save-dev vue

CDN:内容分发网络/智能虚拟网络
v-on:click 缩写 @click
v-on:click="alert($event)" // 阻止默认行为
v-on:click.prevent="alert" // 利用修饰符阻止默认行为

指令
v-show
v-html
v-text
v-bind:src="list.img"  // 绑定属性  所有属性都可以
v-for="list in lists"  // 循环


插值
{{message}}
v-html="message"  // 可以解析html元素
v-text="message"  // 只能解析字符串

<div id="app">
    {{message}}
    {{message+""}} // 表达式
    <input type="text" v-model="message">
    <button v-on:click="alert">点击</button>
</div>

let vm = new Vue({ 
    el:"#app",  // 挂载对象
    data:{ // 实例属性    // data是一个方法返回一个对象
        message:"世界您好!"
    }, 
    beforeCreate(){   // 创建
        // 挂载元素 实例属性 实例方法 都没有生成
    },
    created(){   // 创建完成
        // 挂载元素 还是没有被初始化
        // 实例属性 实例方法 编译出来
    },
    beforeMount(){  
        // 挂载元素 初始化了，但是模板还没有被编译，原样输出
        // 实例属性 实例方法 编译出来
    },
    mounted(){
        // 挂载元素 初始化 模板被编译
        // 属性 初始化
        // 方法初始化
    },
    beforeUpdate(){
        // 数据更新前
    },
    updated(){
        // 数据更新后
        // 当数据发生改变都会被updated捕获到
    }
    methods:{  // 方法
        alert(e){
            // e.preventDefault();
            alert(this.message)
        }
    }
})
```
#### 2、app.vue

```
自动添加前缀
postcss-loader
autoprefixer
sass-loader
{
    loader:'postcss-loader',
    optiond:{
        sourceMap:true,
        config:{
            
        }
    }
}

vue init webpack-simple aaa
vue
vue-loader
vue-template-compiler 
vue-style-loader

<template>
    <div>
        <h1 v-bind:style="{fontSize:'12px'}">绑定样式</h1> // 直接赋值形式
        <h2 v-bind:style="styleObj">绑定样式</h2> // 对象形式
        <h3 v-bind:style="[obj1,obj2]">绑定样式</h3>  // 数组形式
        
        <p v-bind:class="['text-res':true]">绑定类</p>  // 数组形式
    </div>
</template>
<script>
    export default:{
        name:'app',
        data(){
            return{
                styleObj:{
                    fontSize:"20px",
                    color:"red"
                },
                obj1:{
                    color:"#dec"
                },
                 obj2:{
                    color:"green"
                }
            }
        },
        computed:{
            // computed 属性默认只有 getter ，不过在需要时你也可以提供一个 setter
            sum(){
                return Number(this.vall)+Number(this.val2)
            }
        },
        watch:{ // 监听新值和旧值
            slogin(){
                
            }
        }
    }
</script>
<style scoped> // 只在当前作用域里生效
    .text-red{
        color:red;
    }
</style>
```
#### 3、ajax
- axios
#### 4、取dom元素

```
  ref="aaa"   this.$refs.aaa
```
#### 6、轮播图 element-ui
```
main.js
import Element from 'element-ui'

Vue.use(Element)

页面
<el-carousel :interval="3000">
    <el-carousel-item v-for="(list,ind) in Imgs" :key="ind">
        <img :src="list.picUrl" class="img_res">
    </el-carousel-item>
</el-carousel>

style
 @import url('element-ui/lib/theme-chalk/index.css');
```
#### 7、mock

```
下包：
    mock-axios-adapter

import mockjs from 'mockjs';
import axios from 'axios';
import axiosAdapter from 'mock-axios-adapter'  // 拦截axios请求


const mock = new axiosAdapter(axios);

mock.onGet('地址').reply(200,{
    errCode:0,
    errMsg:'',
    result:[{
        url:'./static/img/banner.jpg'
    }]
})

```

#### 8、vue-lazyload

```
1、安装插件
npm install vue-lazyload --save-dev

2. main.js引入插件：
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    error:'./static/error.png',
    loading:'./static/loading.png'
})

3. vue文件中将需要懒加载的图片绑定 v-bind:src 修改为 v-lazy 
<img class="item-pic" v-lazy="newItem.picUrl"/>

```
#### 9、插槽

```
<slot></slot>

两端对齐：
vertival-align:sub

```
#### 10、缓存页面

```
用这个标签包裹起来

<keep-alive>
    <router-view/>
</keep-alive>
```
#### 11、事件修饰符
> .stop
.prevent
.capture
.self
.once

```
<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- 修饰符可以串联  -->
<a v-on:click.stop.prevent="doThat"></a>
<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
<!-- 添加事件侦听器时使用事件捕获模式 -->
<div v-on:click.capture="doThis">...</div>
<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>

<!-- click 事件只能点击一次，2.1.4版本新增 -->
<a v-on:click.once="doThis"></a>
```
#### 12、按键修饰符
.enter

.tab

.delete (捕获 "删除" 和 "退格" 键)

.esc

.space

.up

.down

.left  // 检测鼠标左键

.right

.ctrl

.alt

.shift

.meta
#### 13、表单修饰符
- .lazy
- .number
- .trim