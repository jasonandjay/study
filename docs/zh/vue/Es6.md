# ES6
#### 1、声明变量

```
// es5
声明变量 var --- variable
用大写的形式去声明常量:var PI = 3.14159255358;
常量的值允许被修改

// es6
// 通过let 关键字代替 var 来声明变量，用发与var几乎一致
当let/const遇到{}会形成这个变量的块级作用域
声明变量 let --- 叫命令或关键字
声明常量 const PI = 3.1415926;
报错会阻断下面的代码执行
报错:Assignment to constant variale 
常量的值不允许被修改
// 变量、常量不得重复定义(相同作用域)
报错:Identifier 'num' has already been declared
```
#### 2、变量提升
- es5
> 
    var 存在变量提升，只要在声明之前调用，就会有变量提升，并且值为undefined
- es6 
> let 语句声明的参数没有变量提升

> 暂时性死区的概念：在变量声明之前调用，都是该变量的暂时性死区
#### 3、解构赋值
- **三种状态**
1. 模式不匹配
1. 解构不成功：声明了变量，没有赋值（undefined）
1. 不完全解构

```
ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称作解构赋值 
// 数组的解构赋值
// es5
var a = 1;
var b = 2;
var c = 3;
// es6 好处:代码简洁
// 数组
let [a,b,c] = [1,2,3];
console.log(a);
console.log(b);
console.log(c);
// 对象
let person = {
    name: 'zs',
    age: 18,
    hoppy: ['吃饭', '睡觉', '打豆豆'],
    address: '北京八维'
}
let { obj: objs, obj: obj1 } = {
    obj: person
}

console.log(objs)
// 字符串
// 会将字符串转换成类似数组的一个对象
let [a,b,c] = 'mmd';
// a = m
// b = m
// c = d
let {length:len} = 'mmd';
// len = 3

// 数组的解构赋值在函数中应用
let fun = function([name,age]){ // 接收的是形参
    console.log(name);
    console.log(age);
}
fun(['zs',18]) // 传递的参数是实参

// 对象的解构赋值在函数中应用
let fun = function({name,age}){ // 接收的是形参
    console.log(name);
    console.log(age);
}
fun({name:'zs',age:18}) // 传递的参数是实参


// 通过数组的解构赋值，返回一个值
let fun = (val) => {
    return [val, val + "you aer the best!"];
}
console.log(fun())

// 通过对象的解构赋值来取json数据
const data = {
    name:'zs',
    age:18
}
let {name,age} = data;
console.log(name);
console.log(age)

```
#### 总结：
- 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象
- 由于undefined和null无法转为对象，所以对他们进行解构赋值，都会报错

#### 4、语法提案的批准流程
- Stade 0 - Strawman (展示阶段)
- Stage 1 - proposal (征求意见阶段)
- Stage 2 - Draft (草案阶段)
- Stage 3 - Candidate (候选人阶段)
- Stage 4 - Finished (定案阶段)
#### 5、字符串扩展

```
1、String.includes(string) 用来判断字符串中是否包含指定参数（string）
2、String.startsWith(string) 字符串是否以XX开始
3、String.endsWith(string) 字符串是否以XX开始
string.includes(string,start) 
string 代表查询参数
start 代表查询起始位置
includes() 具备隐式转换

let str = '123木头人'
console.log(str.includes('123',3)) // 结果为false


// str.repeat() ''
// str.repeat(0) ''
// str.repeat(1) mmd
// str.repeat(2) mmdmmd
let str = 'mmd';
let newString = str.repeat();
console.log(newString)

let str = 'mmd';
console.log(str.padStart(5,'*')) // **mmd
console.log(str.padEnd(5,'*')) // mmd**
```
