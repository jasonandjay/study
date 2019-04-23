# Vue组件
#### 1、组件是什么？
1. 是vue.js最强大的功能之一
2. 可以扩展html元素，封装可重用的代码
#### 2、注册全局组件

```
Vue.component('组件名称',引入的.vue文件)

main.js
import heads from 'src/heads';
Vue.component('heads',heads)
// 然后在页面直接引用heads标签就可以了

```
#### 3、prop
- 是父组件用来传递数据的一个自定义属性
- 父组件的数据需要通过props把数据传给子组件，子组件需要显示地用props选项声明'prop''

```
参数:
    props:{
        Child:{
            type:Number,
            required:true  // 默认值是false
            default:{
                return{
                    msg:'hello!'
                }
            }
        }
    }
```
#### 4、自定义事件
- $on(even)     监听事件
- $emit(even)   触发事件
#### 5、组件通讯

```
1、同级目录
    全局: window.Eventhub = new Vue();
    发送:methods:{
            send(){
                 EventHub.$emit('HowAre',this.val)
            }
        }
    接收:mounted(){
            EventHub.$on('HowAre',res=>{
                this.val = res
            })
        }
2、父级向子级通讯(利用props)
    父级：
        data(){
            return{
                tit:'加油加油 ！'
            }
        }
    子级：
        props:['tit'] 接收
        <val1 :tit="tit"></val1>
3、子级向父级通讯(利用回调函数)
    子级：
        this.$emit('solgan',this.val)
    父级：
        <val1 @solgan='onSolgan'></val1>
         methods:{
            onSolgan(val){
                this.solgan = val
            }
        }
    
```

#### 4、组件components/component

1. 局部(components)

```
多个
components:{
    组件名称:{
        name:
        data(){
            
        },
        methods:{
            
        },
        beforeCreate:{
            
        }
        template = html字符串
        // template有且只有一个子元素
        
        
    }
}
```
2. 全局(component)

```
Vue.component('组件名称',引入的.vue文件)
```




