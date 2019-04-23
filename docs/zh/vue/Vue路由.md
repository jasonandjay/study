# Vue路由
#### 1、路由(外置的) vue-router

```
import VueRouter from 'vue-router';
import Index from './components/index.vue';
import List from './components/index.vue';
import Login from './components/index.vue';

Vue.use(VueRouter); // 注册
let router = new VueRouter({
    routes:[{ // 定义多个路由
        path:'/index', 
        component:Index
    },{
        path:'/list',
        component:List
    },{
        path:'/login',
        component:Login
    },{
        path:'/music',
        component:Music,
        children:[{  // 封装子路由
            path:'/comd',
            component:Comd
        },{
            path:'/search',
            component:Search
        }]
    }]
})


app.vue // 入口文件
<router-view></router-view>
```
#### 2、路由跳转路径

```
<router-link to="/music/recommd">推荐</router-link>

router-link === a
to === href
```


