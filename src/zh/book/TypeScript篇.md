# TypeScript篇

### 什么是TypeScript？
TypeScript是JavaScript的加强版，它给JavaScript添加了可选的静态类型和基于类的面向对象编程，它拓展了JavaScript的语法。而且TypeScript不存在跟浏览器不兼容的问题，因为在编译时，它产生的都是JavaScript代码。

### TypeScript 和 JavaScript 的区别是什么？
Typescript 是 JavaScript 的超集，可以被编译成 JavaScript 代码。 用 JavaScript 编写的合法代码，在 TypeScript 中依然有效。Typescript 是纯面向对象的编程语言，包含类和接口的概念。 程序员可以用它来编写面向对象的服务端或客户端程序，并将它们编译成 JavaScript 代码。  
TypeScript 引入了很多面向对象程序设计的特征，包括：
- 1)interfaces  接口
- 2)classes  类
- 3)enumerated types 枚举类型
- 4)generics 泛型
- 5)modules 模块  

主要不同点如下：
- 1)TS 是一种面向对象编程语言，而 JS 是一种脚本语言（尽管 JS 是基于对象的）。
- 2)TS 支持可选参数， JS 则不支持该特性。
- 3)TS 支持静态类型，JS 不支持。
- 4)TS 支持接口，JS 不支持接口。

### 为什么要用 TypeScript ？
TS 在开发时就能给出编译错误， 而 JS 错误则需要在运行时才能暴露。作为强类型语言，你可以明确知道数据的类型。代码可读性极强，几乎每个人都能理解。TS 非常流行，被很多业界大佬使用。像 Asana、Circle CI 和 Slack 这些公司都在用 TS。

### 什么是泛型？
泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，使用时再去指定类型的一种特性。
可以把泛型理解为代表类型的参数
// 我们希望传入的值是什么类型，返回的值就是什么类型
// 传入的值可以是任意的类型，这时候就可以用到泛型
```ts
// 1. 如果使用 any 的话，就失去了类型检查的意义
function createArray1(length: any, value: any): Array<any> {
    let result: any = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

let result = createArray1(3, 'x');
console.log(result);

// 2. 最傻的写法：每种类型都得定义一种函数
function createArray2(length: number, value: string): Array<string> {
    let result: Array<string> = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

function createArray3(length: number, value: number): Array<number> {
    let result: Array<number> = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
// 3. 或者使用函数重载，写法有点麻烦
function createArray4(length: number, value: number): Array<number>
function createArray4(length: number, value: string): Array<string>
function createArray4(length: number, value: any): Array<any> {
    let result: Array<number> = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray4(6, '666');
//4. 使用泛型
// 有关联的地方都改成 <T>
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
// 使用的时候再指定类型
let result = createArray<string>(3, 'x');
// 也可以不指定类型，TS 会自动类型推导
let result2 = createArray(3, 'x');
console.log(result);
```

### 什么是枚举？
枚举可以使我们定义一些带名字的常量，用于清晰的表达意图和创建一组有区别的用例。  
枚举主要分为两类。  
- 一类是基于数字的，有自增长和反向映射的特性。  
- 一类是基于字符串的。

### 联合类型与交叉类型？
- 联合类型 A | B 表示一个集合，该集合是与类型A关联的一组值和与类型 B 关联的一组值的并集。
- 交叉类型 A & B 表示一个集合，该集合是与类型 A 关联的一组值和与类型 B 关联的一组值的交集

### 什么是可索引类型接口？
一般用来约束数组和对象
```ts
/ 数字索引——约束数组
// index 是随便取的名字，可以任意取名
// 只要 index 的类型是 number，那么值的类型必须是 string
interface StringArray {
  // key 的类型为 number ，一般都代表是数组
  // 限制 value 的类型为 string
  [index:number]:string
}
let arr:StringArray = ['aaa','bbb'];
console.log(arr);

// 字符串索引——约束对象
// 只要 index 的类型是 string，那么值的类型必须是 string
interface StringObject {
  // key 的类型为 string ，一般都代表是对象
  // 限制 value 的类型为 string
  [index:string]:string
}
let obj:StringObject = {name:'ccc'};
```

### 什么是函数类型接口？
对方法传入的参数和返回值进行约束
```ts
// 普通的接口
interface discount1{
  getNum : (price:number) => number
}

// 函数类型接口
interface discount2{
  // 注意:
  // “:” 前面的是函数的签名，用来约束函数的参数
  // ":" 后面的用来约束函数的返回值
  (price:number):number
}
let cost:discount2 = function(price:number):number{
   return price * .8;
}

// 也可以使用类型别名
type Add = (x: number, y: number) => number
let add: Add = (a: number, b: number) => a + b
```

### 什么是类类型接口？
如果接口用于一个类的话，那么接口会表示“行为的抽象”
对类的约束，让类去实现接口，类可以实现多个接口
接口只能约束类的公有成员（实例属性/方法），无法约束私有成员、构造函数、静态属性/方法
```ts
// 接口可以在面向对象编程中表示为行为的抽象
interface Speakable {
    name: string;
     // ":" 前面的是函数签名，用来约束函数的参数
     // ":" 后面的用来约束函数的返回值
    speak(words: string): void
}

interface Speakable2 {
    age: number;
}

class Dog implements Speakable, Speakable2 {
    name!: string;
    age = 18;

    speak(words: string) {
        console.log(words);
    }
}

let dog = new Dog();
dog.speak('汪汪汪');
```

### 什么是混合类型接口？
一个对象可以同时做为函数和对象使用
```ts
interface FnType {
    (getName:string):string;
}

interface MixedType extends FnType{
    name: string;
    age: number;
}
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

### never 和 void 的区别？
- 1)void 表示没有任何类型（可以被赋值为 null 和 undefined）。
- 2)never 表示一个不包含值的类型，即表示永远不存在的值。
拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。

### Typescript有哪些基础类型？
- 1)number
- 2)string
- 3)boolean
- 4)Symbol
- 5)Array
- 6)Tuple(元组)
- 7)enum(枚举)
- 8)object
- 9)never，表示那些永不存在的值类型。如总是抛出异常或者根本不会有返回值的函数的返回值类型。
- 10)any  任意类型
- 11)void，与any相反表示没有任何类型。函数没有返回值时用void。
- 12)null和undefined，它们是所有类型的子类型。当你指定structNullChecks时，它们只能赋值给void或者它们自己本身。

### 如何编译Typescript?
tsc xxx.ts

### 如何自动编译ts文件并实时修改？
tsc --watch file.ts

### 什么是TS接口？说说它有哪些特性？
TS的核心原则之一就是对值所具有的结构进行类型检查。  
它有时被称为“鸭式辩型法”或“结构性子类型化”。 
其作用就是为这些类型进行命名，或为你的代码或者三方代码定义契约。 
特点：
- 1：定义对象、数组、函数、类等。
- 2：接口可以相互继承
- 3：接口可以继承类
- 4：可选属性与额外检查

### 如何理解Typescript中的类？并说说它有什么特性？
Typescript是一种面向对象的Javascript语言，和其他任何面向对象编程的强语言一样，类是描述某一组对象共有属性状态或行为的实体。它就是构建具体对象实例的模板和蓝图。
特性：  
1：继承  
2：多态  
3：抽象  
4：封装  
5：实例  

### Typescript支持哪些面向对象术语？
1：类   
2：继承  
3：多态  
4：抽象  
5：泛化  
6：接口封装  
7：实例化  
等等...  

### 解释下Typescript的装饰器是什么？
装饰器是一种特殊类型的声明，它能被附加在类、方法、属性、访问符、参数上。  
装饰器使用@expression这种方式，expression求值后必须为一个函数，它在运行时调用，被装饰器声明的信息作为参数传入。

### 什么是Mixins?
一种通过重用组件构建类的方法。不通过类的直接继承来实现，而是将基类作为接口来实现。对于基类实例化部分在子类中实现，基类中原型的部分在子类中进行声明占位，然后通过一个Minxin函数将基类上的原型属性拷贝到子类上。

### TSD是什么？
TSD是Typescript的包管理工具，我们都知道在.ts文件中引入第三方库时，第三库是需要.d.ts声明文件的，否则三方库在.ts中是无法识别报错的。
TSD就是帮我查找对应的三方库TS声明文件并下载安装。
使用过程如下：  
1：npm install tsd -g  
2: tsd init  
3: tsd query xxx三方库 --action install 
4：在使用的.ts文件中通过reference指向该声明文件
```ts  
/// <reference path="typings/jquery/jquery.d.ts" />
```

### Declare关键字是干嘛用的？
我们在.ts中使用的第三方库时没有.d.ts声明文件的时候，我们可以通过declare来写申明文件。可以声明该模块，甚至可以直接声明一个值为any的同名的变量，然后我们就可以在代码中直接使用该三方库了。

### 如何让.ts文件自动生成对应的.d.ts声明文件？
tsc --declaration test.ts

### tsconfig.json文件有什么作用？
该文件存在于Typescript项目的根目录里，其作用是指定相关选项告诉ts编译器如何编译ts文件。

### 说说接口和类型别名type的区别？
他们很相似，type可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。
- 区别一：它并不会真的创建一个新的名字，当你在编译器上将鼠标悬停在定义为该类型别名定义的变量上时返回的是该类型别名引用的对象。相反，接口会创建一个新名字 ，当你把鼠标悬停在该接口定义的变量上时返回的是该接口名。
- 区别二：类型别名不能extends和implements
- 区别三：对于元组，联合类型我们一般使用类型别名type。

### 什么是类型断言？
类型断言对运行没有什么影响，仅供编译器使用。向编译器提供我们所希望的分析代码的提示。
表示断言的两种方式：  
1：<类型>变量  
2：变量 as 类型 （在tsx中只能使用这种方式）

### 什么是声明合并？
声明合并是编译器将2个或多个同名声明合并为一个，合并后的声明拥有被合并声明的所有特性。目前除了类不能与其他类和变量合并外，其他声明都是可以相互合并的。