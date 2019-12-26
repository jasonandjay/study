---
sidebar: auto
sidebarDepth: 2
---
# React Hooks



## 简介
### 什么是Hooks
Hooks是一个新的React特性提案，组件尽量写成纯函数，如果需要外部React特性（比如状态管理，生命周期），就用钩子把外部特性"钩"进来，通常函数名字都是以use开头。首次在v16.7.0-alpha版本中添加，在v16.8.0中正式发布。

### Hooks产生的背景
- 跨组件复用stateful logic十分困难
使用Hooks，你可以在将含有state的逻辑从组件中抽象出来，这将可以让这些逻辑容易被测试。同时，Hooks可以帮助你在不重写组件结构的情况下复用这些逻辑。
- 复杂的组件难以理解
Hooks允许您根据相关部分(例如设置订阅或获取数据)将一个组件分割成更小的函数，而不是强制基于生命周期方法进行分割
- 不止是用户，机器也对Classes难以理解
Hooks让你可以在classes之外使用更多React的新特性


## 常用Hooks
- useState 
```js
let [count, setCount] = useState(100);
```

- useEffect
```js
useEffect(()=>{
    return ()=>{}
}, [])
```

![layoutEffect](/study/hooks/layoutEffect.png)
- useLayoutEffect
    - useEffect 在全部渲染完毕后才会执行
    - useLayoutEffect 会在 浏览器 layout 之后，painting 之前执行
    - 其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect
    - 可以使用它来读取 DOM 布局并同步触发重渲染
    - 在浏览器执行绘制之前 useLayoutEffect 内部的更新计划将被同步刷新
    - 会阻塞页面的渲染，如果在里面执行耗时任务的话，页面就会卡顿

- useContext
直接获取祖先元素通过createContext创建的context

- useReducer
```js
const [state, dispatch] = useReducer(reducer, initialState, init);
```
- memo 

- useMemo

- useCallback

- memo,useMemo和useCallback在优化组件的应用场景
    - 在子组件不需要父组件值和函数的情况下，使用memo包裹即可
    - 如果是函数作为props，可以使用useCallback保证不会反复修改
    - 如果是值作为props，可以使用useMemo保证值不会反复修改

- useRef  
不符合capture values，本身不会变化，存储的.current会变化

- useImperativeHandle  
配合forwardRef使用，用于自定义通过ref给父组件暴露的值

- useDebugValue  
用于开发者工具调试

## 封装自定义Hooks
封装hooks获取窗口大小
```js
// useWinSize
import React, { useState ,useEffect ,useCallback } from 'react';

export default function useWinSize(){
    const [ size , setSize] = useState({
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
    })
 
    const onResize = useCallback(()=>{
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    },[])

    useEffect(()=>{
        window.addEventListener('resize',onResize)
        return ()=>{
            window.removeEventListener('resize',onResize)
        }
    },[])
 
    return size;
}

// demo.js
import useWinSize from './useWinSize'

export default function(){
    const size = useWinSize()
    return (
        <div>页面Size:{size.width}x{size.height}</div>
    )
}
```

延迟设置值
```js
import React, {useState, useRef, useEffect} from 'react'

export const useDelayState = (initialState)=>{
    const [state, setState] = useState(initialState);
    const ref = useRef();
    const delaySetState = (value, delay)=>{
        ref.current = setTimeout(()=>{
            setState(value)
        }, delay)
    }
    useEffect(()=>{
        return ()=>{
            clearTimeout(ref.current)
        }
    }, [])
    return [state, delaySetState, setState]
}
```

GeoLocation获取地理定位
```js
import { useEffect, useState } from 'react';

const useGeolocation = options => {
  const [state, setState] = useState({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now(),
  });
  let mounted = true;
  let watchId: any;

  const onEvent = event => {
    if (mounted) {
      setState({
        loading: false,
        accuracy: event.coords.accuracy,
        altitude: event.coords.altitude,
        altitudeAccuracy: event.coords.altitudeAccuracy,
        heading: event.coords.heading,
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed,
        timestamp: event.timestamp,
      });
    }
  };
  const onEventError = (error) =>
    mounted && setState(oldState => ({ ...oldState, loading: false, error }));

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onEvent, onEventError, options);
    watchId = navigator.geolocation.watchPosition(onEvent, onEventError, options);

    return () => {
      mounted = false;
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return state;
};
export default useGeolocation;
```

更多[hooks](https://github.com/streamich/react-use)

## Hooks的使用注意事项
- 只能在顶层调用Hooks?
Hooks是使用数组或单链表串联起来，Hooks顺序修改会打乱执行结果
- useState在多个组件中引入，彼此之间会不会有影响?
在React中Hooks把数据存在fiber node上的，每个组件都有自己的currentlyRenderingFiber.memoizedState

## Hooks的问题
- Hooks能解决组件状态的复用问题，但没有很好的解决JSX复用问题
- React Hooks模糊了生命周期的概念，但也带来了更高门槛的学习（Hooks生命周期的理解、Hooks Rules的理解、useEffect依赖项的判断等）
- 类拥有比函数更丰富的表达能力（OOP），Function Component容易使代码逻辑混乱

## Hooks的原理
- 单向链表通过next把hooks串联起来
- memoizedState存在fiber node上，组件之间不会相互影响
- useState和useReducer中通过dispatchAction调度更新任务

## React Fiber介绍
### 触发React重新渲染
- ReactDOM.render
- setState
- forceUpdate
- React Hooks的dispatchAction

### 重新渲染机制
React 框架内部的运作可以分为3层：
- Virtual DOM层，描述页面长什么样
- Reconciler层，负责调用组件生命周期方法，进行Diff运算
- Renderer层，根据不同的平台，渲染出相应的页面，比较常见的是ReactDOM和ReactNative

React 16.0前后Reconciler层的改动:
- 之前：React会遍历应用的所有节点，计算出差异，然后再更新UI，整个过程不能被打断，一旦用的时机超过16毫秒，就容易出现掉帧的现
- 之后：引入Fiber Reconciler，依赖[requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)
把调和过程分成两个阶段   
阶段一，生成 Fiber 树，得出需要更新的节点信息。这一步是一个渐进的过程，可以被打断  
阶段二，将需要更新的节点一次过批量更新，这个过程不能被打断

图解两者的区别
![stack_reconciler](/study/hooks/stack_reconciler.png)
**stack reconciler**

![fiber_reconciler](/study/hooks/fiber_reconciler.png)
**fiber reconciler**

Fiber Reconciler 在阶段一进行 Diff 计算的时候，会生成一棵 Fiber 树。这棵树是在 Virtual DOM 树的基础上增加额外的信息来生成的（hooks依赖的memoizedState链表），它本质来说是一个链表。
![fiber_tree](/study/hooks/fiber_tree.png)

## 延展思考
React Hooks与Vue Composition API有什么异曲同工之妙

