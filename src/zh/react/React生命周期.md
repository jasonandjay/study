# React生命周期
#### 1、componentDidMount() // 组件挂载完成之后触发的生命周期 相当于vue的mounted
```
componentDidMount(){
    setInterval(()=>{
        // 修改state的唯一方法
        // @param 要修改的数据
        // @param 修改完成之后的回调函数
        this.setState({
            index:this.state.index++
        },()=>{
            consloe.log(this.state.index)
        })
    },1000)
}

```
#### 2、componentWillMount()  // 组件挂载之前 相当于vue的beforeMount
#### 3、componentWillReceiveProps(nextProps)  // 组件将要接收新的props vue没有

```
// 和props相关的唯一一个生命周期
// 执行完成之后，this.props指向新的props
componentWillReceiveProps(nextProps){
    // 旧的props   this.props
    // 新的props   nextProps
    
}


```
#### 4、shouldComponentUpdate(nextProps,nextState)  // 通过返回值判断组件是否需要更新,用于react优化，vue没有 true更新，false不更新
```
shouldComponentUpdate(nextProps,nextState){
    // 旧的props   this.props
    // 新的props   nextProps
    // 旧的State   this.state
    // 新的state   nextState
    // 返回值是Boolean  默认true
}


```
#### 5、componentWillUpdate // 组件将要更新 相当于vue的beforeUpdate
#### 6、componentDidUpdate // 组件更新完成 相当于vue的updated
#### 7、componentWillUnmount() // 组件将要卸载
#### 8、unmountComponentAtNode() // 卸载组件
```
ReactDom.unmountComponentAtNode(document.getElementById('root'))
```
#### 9、分为三个阶段
1. 实例化阶段

```
首次使用一个组件类时会有getDefaultProps
对于组件类的所有后续应用没有getDefaultProps
1、getDefaultProps
2、getInitialState
3、componentWillMount
4、render
5、componentDidMount
```
2. 更新阶段(存在期)


```
1. componentWillReceiveProps 
2. shouldComponentUpdate 
3. componentWillUpdate 
4. render 
5. componentDidUpdate
```
3. 销毁&清理期

```
componentWillUnmount
```
