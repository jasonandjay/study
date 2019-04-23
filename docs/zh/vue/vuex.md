# Vuex
##### 1、什么是vuex？
- 每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。

##### 2、初始化vuex
（1）下载vuex

```
cnpm i vuex -D
```


（2）建一个store文件夹（store/index.js）

```
// 初始化vuex

import Vue from 'vue';
import Vuex from 'vuex';

// 引入module
import app from './module/app';

Vue.use(Vuex);

// 生成一个vuex实例
export default new Vuex.Store({
  modules: {
    app
  }
})
```
（3）在store文件夹里建一个module文件夹用来存放数据（store/module/app.js）

```
// 存放数据的地方
const state = {
  num: 100
}

// 派生数据（很少用）
const getters = {
    doubleNum(state){
        return state.num*2
    }
}

// 同步改变
const mutations = {
  changeNum(state, payload){
    state.num = payload;
  }
}

// 异步改变
const actions = {
    <!--changeNumAsync(context, payload){-->
        
    <!--}-->
    changeNumAsync({commit}, payload){
        commit('changeNum', payload)
    }
}

export default {
  // 命名空间
  namespaced: true, // 配合module使用
  state,
  actions,
  getters,
  mutations
}
```
（4）在main.js里面引入store

```
import Vue from 'vue'
import App from './App.vue'

import store from './store'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

```
（5）在页面中使用

```
<template>
  <div>
    <button @click="changeNum('+')">+</button>
    <span>{{num}}</span>
    <button @click="changeNum('-')">-</button>
  </div>
</template>
<script>
  export default {
    name: 'app',
    computed: {
      num() {
        return this.$store.state.app.num
      }
    },
    methods: {
      changeNum(type) {
        if (type == '+') {
          // this.$store.commit('changeNum', this.num+1)
          this.$store.dispatch('changeNumAsync', this.num+1)
        } else {
          this.$store.commit('changeNum', this.num-1)
        }
      }
    },
    mounted(){
      console.log(this.$store)
    }
  }
</script>

```

