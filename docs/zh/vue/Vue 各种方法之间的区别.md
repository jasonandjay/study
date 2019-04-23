# Vue一些对比
#### 一、methods和computed
- computed是计算属性，methods是方法。
- computed计算属性是基于它们的依赖进行==缓存==的
- computed只有在它的相关依赖发生改变时才会重新求值
- 而对于method ，只要发生重新渲染，method 调用==总会==执行该函数
- ==总之：数据量大，需要缓存的时候用computed；每次确实需要重新加载，不需要缓存时用methods==
#### 二、computed和watch
- 计算属性是==计算属性==，==侦听器watch==是侦听器watch
- 侦听器watch是侦听一个特定的值，当该值变化时执行特定的函数
#### 三、$router和$route
- router为VueRouter的实例，相当于一个全局的路由器对象，里面含有很多属性和子对象
- route相当于当前正在跳转的路由对象。。可以从里面获取name,path,params,query等
- 打印this.$route和this.$router，==两个同时存在==。
- 两者传参方式相同