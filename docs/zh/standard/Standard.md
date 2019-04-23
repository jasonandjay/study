---
sidebar: auto
sidebarDepth: 2
---
## 目录规范

├── build                      // 构建相关  
├── config                     // 配置相关  
├── src                        // 源代码  
│   ├── api                    // 所有请求  
│   ├── assets                 // 主题 字体等静态资源  
│   ├── components             // 全局公用组件  
│   ├── directive              // 全局指令  
│   ├── filters                // 全局 filter  
│   ├── icons                  // 项目所有 svg icons  
│   ├── lang                   // 国际化 language  
│   ├── mock                   // 项目mock 模拟数据  
│   ├── router                 // 路由  
│   ├── store                  // 全局 store管理  
│   ├── styles                 // 全局样式  
│   ├── utils                  // 全局公用方法  
│   ├── vendor                 // 公用vendor  
│   ├── views                  // views 所有页面  
│   ├── App.vue                // 入口页面  
│   ├── main.js                // 入口文件 加载组件 初始化等  
│   └── permission.js          // 权限管理  
├── static                     // 第三方不打包资源  
│   └── Tinymce                // 富文本  
├── .babelrc                   // babel-loader 配置  
├── .eslintrc.js               // eslint 配置项  
├── .gitignore                 // git 忽略项  
├── .travis.yml                // 自动化CI配置  
├── favicon.ico                // favicon图标  
├── index.html                 // html模板  
└── package.json               // package.json  

## 命名规范

1 避免单字母的名字。用你的命名来描述功能（最好使用动词命名）。 
  ```
  function query() {
    // ...
  }
  ```
2 在命名对象、函数和实例时使用驼峰命名法（camelCase）。
  ```
  const thisIsMyObject = {};
  function thisIsMyFunction() {}
  ```
3 只有在命名构造器或者类的时候才用帕斯卡拼命名法。*（PascalCase 每个单词的第一个字母都大写）* 
  ```
  class User {
    constructor(options) {
      this.name = options.name;
    }
  }
  const good = new User({
    name: 'yup',
  });
  ````
4 不要使用前置或者后置下划线。

5 文件名应该和默认导出的名称完全匹配。
  ```
  class CheckBox {
    // ...
  }
  export default CheckBox;
  export default function fortyTwo() { return 42; }
  import CheckBox from './CheckBox'; // PascalCase export/import/filename
  import fortyTwo from './fortyTwo'; // camelCase export/import/filename
  ```
8 当你导出一个构造器 / 类 / 单例 / 函数库 / 暴露的对象时应该使用帕斯卡命名法。
  ```
  const AirbnbStyleGuide = {
    es6: {
    },
  };
  export default AirbnbStyleGuide;
  ```
9 缩略词和缩写都必须是全部大写或者全部小写。
  ```
  import SMSContainer from './containers/SMSContainer';
  const HTTPRequests = [
    // ...
  ];
  const httpRequests = [
    // ...
  ];
  ```

## 变量

1 使用 const 或者 let 来定义变量。避免污染全局命名空间。（最好使用名词命名）
  把 const 声明的放在一起，把 let 声明的放在一起。.
  这在后边如果需要根据前边的赋值变量指定一个变量时很有用。
  ```
  const superPower = new SuperPower();
  const goSportsTeam = true;
  let dragonball;
  let i;
  ```
2 在你需要的使用定义变量，但是要把它们放在一个合理的地方。
  let 和 const 是块级作用域而不是函数作用域。
  ```
  function checkName(hasName) {
    if (hasName === 'test') {
      return false;
    }
    const name = getName();
    if (name === 'test') {
      this.setName('');
      return false;
    }
    return name;
  }
  ```
3 不要链式变量赋值。
  链式变量赋值会创建隐式全局变量。
  ```
  (function example() {
    let a = 1;
    let b = a;
    let c = a;
  }());
  console.log(a); // throws ReferenceError
  console.log(b); // throws ReferenceError
  console.log(c); // throws ReferenceError
  // 对于 `const` 也一样
  ```

## 注释

1 使用 /** ... */ 来进行多行注释。
  ```
  /**
  * make() returns a new element
  * based on the passed-in tag name
  */
  function make(tag) {
    // ...
    return element;
  }
  ```
2 使用 // 进行单行注释。 将单行注释放在需要注释的行的上方新行。 在注释之前放一个空行，除非它在块的第一行。
  ```
  // 注释
  function getType() {
    console.log('fetching type...');

    // set the default type to 'no type'
    const type = this.type || 'no type';
    return type;
  }
  ```

## 空格

1 使用 tabs (空格字符) 设置为 2 个空格。
  ```
  function baz() {
  ∙∙let name;
  }
  ```
2 在主体前放置一个空格。
  ```
  function test() {
    console.log('test');
  }
  dog.set('attr', {
    age: '1 year',
    breed: 'Bernese Mountain Dog',
  });
  ```
3 在控制语句（if, while 等）开始括号之前放置一个空格。 在函数调用和是声明中，在参数列表和函数名之间没有空格。
  ```
  if (isJedi) {
    fight();
  }
  function fight() {
    console.log('Swooosh!');
  }
  ```
4 用空格分离操作符。
  ```
  const x = y + 5;
  ```
5 在块和下一个语句之前留下一空白行。
  ```
  const arr = [
    function foo() {
    },

    function bar() {
    },
  ];

  return arr;
  ```
6 不要在括号内添加空格。
  ```
  if (foo) {
    console.log(foo);
  }
  ```
7 不要在中括号中添加空格。 
  ```
  const foo = [1, 2, 3];
  console.log(foo[0]);
  ```
8 在花括号内添加空格。
  const foo = { clark: 'kent' };

9 要求打开的块标志和同一行上的标志拥有一致的间距。此规则还会在同一行关闭的块标记和前边的标记强    制实施一致的间距。
  ```
  function foo() { return true; }
  if (foo) { bar = 0; }
  ```
10 逗号之前避免使用空格，逗号之后需要使用空格。
  ```
  var foo = 1, bar = 2;
  var arr = [1, 2];
  ```
11 在行的末尾避免使用空格。

## 分号
  
  每一行结束加分号结尾
  ```
  const luke = {};
  const leia = {};
  [luke, leia].forEach((jedi) => {
    jedi.father = 'vader';
  });
  ```

## 方法

1 使用命名的函数表达式代替函数声明。
  函数声明是挂起的，这意味着在它在文件中定义之前，很容易引用函数。这会损害可读性和可维护性。
  // 从变量引用调用中区分的词汇名称
  ```
  const short = function longUniqueMoreDescriptiveLexicalFoo() {
    // ...
  };
  ```
2 Wrap立即调用函数表达式。
  立即调用的函数表达式是单个单元 - 包装， 并且拥有括号调用, 在括号内, 清晰的表达式。 
  ```
  (function () {
    console.log('Welcome to the Internet. Please follow me.');
  }());
  ```
3 切记不要在非功能块中声明函数 (if, while, 等)。 将函数赋值给变量。

4 避免使用默认参数的副作用。
  他们很容易混淆。
  ```
  var b = 1;
  count();  // 1
  count();  // 2
  count(3); // 3
  count();  // 3
  ```
5 总是把默认参数放在最后。
  ```
  function handleThings(name, opts = {}) {
    // ...
  }
  ```
6 函数签名中的间距。
  一致性很好，在删除或添加名称时不需要添加或删除空格。
  ```
  const x = function () {};
  const y = function a() {};
  ```
7 优先使用扩展运算符 ... 来调用可变参数函数
  它更加干净，你不需要提供上下文。
  ```
  const x = [1, 2, 3, 4, 5];
  console.log(...x);
  new Date(...[2016, 8, 5]);
  ```

## 箭头函数

1 当你必须使用匿名函数时 (当传递内联函数时)， 使用箭头函数。 
  它创建了一个在 this 上下文中执行的函数版本，它通常是你想要的，并且是一个更简洁的语法。
  如果你有一个相当复杂的函数，你可以把这个逻辑转移到它自己的命名函数表达式中。
  ```
  [1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
  });
  ```
2 如果表达式跨越多个行，用括号将其括起来，以获得更好的可读性。
  它清楚地显示了函数的起点和终点。
  ```
  ['get', 'post', 'put'].map(httpMethod => (
    Object.prototype.hasOwnProperty.call(
      httpMagicObjectWithAVeryLongName,
      httpMethod,
    )
  ));
  ```
3 如果你的函数接收一个参数，则可以不用括号，省略括号。 否则，为了保证清晰和一致性，需要在参数周围加上括号。 
  注意：总是使用括号是可以接受的，在这种情况下，我们使用 “always” option 来配置减少视觉上的混乱。
  ```
  [1, 2, 3].map(x => x * x);
  [1, 2, 3].map(number => (
    `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
  ));
  [1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
  });
  ```
4 避免箭头函数符号 (=>) 和比较运算符 (<=, >=) 的混淆。
  ```
  const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);
  const itemHeight = (item) => {
    const { height, largeSize, smallSize } = item;
    return height > 256 ? largeSize : smallSize;
  };
  ```
5 注意带有隐式返回的箭头函数函数体的位置。
  ```
  (foo) => bar;
  (foo) => (bar);
  (foo) => (
    bar
  )
  ```

## 类和构造器

1 尽量使用 class. 避免直接操作 prototype .
  class 语法更简洁，更容易推理。
  ```
  class Queue {
    constructor(contents = []) {
      this.queue = [...contents];
    }
    pop() {
      const value = this.queue[0];
      this.queue.splice(0, 1);
      return value;
    }
  }
  ```
2 使用 extends 来扩展继承。
  它是一个内置的方法，可以在不破坏 instanceof 的情况下继承原型功能。
  ```
  class PeekableQueue extends Queue {
    peek() {
      return this.queue[0];
    }
  }
  ```
3 方法返回了 this 来供其内部方法调用。
  ```
  class Jedi {
    jump() {
      this.jumping = true;
      return this;
    }
    setHeight(height) {
      this.height = height;
      return this;
    }
  }
  const luke = new Jedi();
  luke.jump()
  .setHeight(20);
  ```
4 如果没有指定类，则类具有默认的构造器。 一个空的构造器或是一个代表父类的函数是没有必要的。
  ```
  class Rey extends Jedi {
    constructor(...args) {
      super(...args);
      this.name = 'Rey';
    }
  }
  ```
6 避免定义重复的类成员。
  重复的类成员声明将会默认倾向于最后一个 - 具有重复的类成员可以说是一个错误。
  ```
  class Foo {
    bar() { return 1; }
  }
  class Foo {
    bar() { return 2; }
  }
  ```

##模块

1 你可能经常使用模块 (import/export) 在一些非标准模块的系统上。 你也可以在你喜欢的模块系统上相互转换。
  模块是未来的趋势，让我们拥抱未来。
  ```
  import AirbnbStyleGuide from './AirbnbStyleGuide';
  export default AirbnbStyleGuide.es6;
  import { es6 } from './AirbnbStyleGuide';
  export default es6;
  ```
2 不要使用通配符导入。
  这确定你有一个单独的默认导出。
  ```
  import AirbnbStyleGuide from './AirbnbStyleGuide';
  ```
3 不要直接从导入导出。
  虽然写在一行很简洁，但是有一个明确的导入和一个明确的导出能够保证一致性。
  ```
  // filename es6.js
  import { es6 } from './AirbnbStyleGuide';
  export default es6;
  ```
4 只从一个路径导入所有需要的东西。
  从同一个路径导入多个行，使代码更难以维护。
  ```
  import foo, { named1, named2 } from 'foo';
  import foo, {
    named1,
    named2,
  } from 'foo';
  ```
5 不要导出可变的引用。 
  在一般情况下，应该避免发生突变，但是在导出可变引用时及其容易发生突变。虽然在某些特殊情况下，可能需要这样，但是一般情况下只需要导出常量引用。
  ```
  const foo = 3;
  export { foo };
  ```
6 在单个导出的模块中，选择默认模块而不是指定的导出。
  为了鼓励更多的文件只导出一件东西，这样可读性和可维护性更好。
  ```
  export default function foo() {}
  ```
7 将所有的 imports 语句放在所有非导入语句的上边。
  由于所有的 imports 都被提前，保持他们在顶部是为了防止意外发生。
  ```
  import foo from 'foo';
  import bar from 'bar';
  foo.init();
  ```
8 多行导入应该像多行数组和对象一样缩进。
  花括号和其他规范一样，遵循相同的缩进规则，后边的都好一样。
  ```
  import {
    longNameA,
    longNameB,
    longNameC,
    longNameD,
    longNameE,
  } from 'path';
  ```
9 在模块导入语句中禁止使用 Webpack 加载器语法。
  因为在导入语句中使用 webpack 语法，将代码和模块绑定在一起。应该在 webpack.config.js 中使用加载器语法。
  ```
  import fooSass from 'foo.scss';
  import barCss from 'bar.css';
  ```


##属性

1 访问属性时使用点符号。
  const luke = {
    jedi: true,
    age: 28,
  };
  const isJedi = luke.jedi;

2 使用变量访问属性时，使用 []表示法。
  const luke = {
    jedi: true,
    age: 28,
  };
  function getProp(prop) {
    return luke[prop];
  }
  const isJedi = getProp('jedi');

3 计算指数时，可以使用 ** 运算符。
  ```
  const binary = 2 ** 10;
  ```

## 比较运算符和等号

1 使用 === 和 !== 而不是 == 和 !=。 

2 条件语句，例如 if 语句使用 ToBoolean 的抽象方法来计算表达式的结果，并始终遵循以下简单的规则：
  Objects 的取值为： true
  Undefined 的取值为： false
  Null 的取值为： false
  Booleans 的取值为： 布尔值的取值
  Numbers 的取值为：如果为 +0, -0, or NaN 值为 false 否则为 true
  Strings 的取值为: 如果是一个空字符串 '' 值为 false 否则为 true
  ```
  if ([0] && []) {
    // true
    // 一个数组（既是是空的）是一个对象，对象的取值为 true
  }
  ```
3 对于布尔值使用简写，但是对于字符串和数字进行显式比较。
  ```
  if (isValid) {
    // ...
  }
  if (collection.length > 0) {
    // ...
  }
  ```
4 获取更多信息请查看 Angus Croll 的 Truth Equality and JavaScript 。

5 在 case 和 default 的子句中，如果存在声明 (例如. let, const, function, 和 class)，使用大括号来创建块 。
  ```
  switch (foo) {
    case 1: {
      let x = 1;
      break;
    }
    case 2: {
      const y = 2;
      break;
    }
    case 3: {
      function f() {
        // ...
      }
      break;
    }
  }
  ```
6 三目表达式不应该嵌套，通常是单行表达式。
  ```
  // 分离为两个三目表达式
  const maybeNull = value1 > value2 ? 'baz' : null;
  // better
  const foo = maybe1 > maybe2
    ? 'bar'
    : maybeNull;

  // best
  const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
  ```
7 避免不必要的三目表达式。
  ```
  const foo = a || b;
  const bar = !!c;
  const baz = !c;
  ```
8 使用该混合运算符时，使用括号括起来。 唯一例外的是标准算数运算符 (+, -, *, & /) 因为他们的优先级被广泛理解。
  这能提高可读性并且表明开发人员的意图。
  ```
  const foo = (a && b < 0) || c > 0 || (d + 1 === 0);
  const bar = (a ** b) - (5 % d);
  if (a || (b && c)) {
    return d;
  }
  const bar = a + b / c * d;
  ```

## 块

1 当有多行代码块的时候，使用大括号包裹。
  ```
  if (test) return false;
  if (test) {
    return false;
  }
  ```
2 如果你使用的是 if 和 else 的多行代码块，则将 else 语句放在 if 块闭括号同一行的位置。
  ```
  if (test) {
    thing1();
    thing2();
  } else {
    thing3();
  }
  ```
3 如果一个 if 块总是执行一个 return 语句，那么接下来的 else 块就没有必要了。 
  如果一个包含 return 语句的 else if 块，在一个包含了 return 语句的 if 块之后，那么可以拆成多个 if 块。
  ```
  function cats() {
    if (x) {
      return x;
    }
    if (y) {
      return y;
    }
  }

  function dogs(x) {
    if (x) {
      if (z) {
        return y;
      }
    } else {
      return z;
    }
  }
  ```

  ## ESlint
    ```
    module.exports = {

      //此项是用来告诉eslint找当前配置文件不能往父级查找
      root: true,

      //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
      parser: 'babel-eslint',

      //此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
      parserOptions: {
        // 设置 script(默认) 或 module，如果代码是在ECMASCRIPT中的模块
        sourceType: 'module',
        "ecmaVersion": 6,
        "ecmaFeatures": {
          "jsx": true
        }
      },

      // 此项指定环境的全局变量，下面的配置指定为浏览器环境
      env: {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true,
        "amd": true
      },
      
      // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错
      extends: 'vue',
      // 此项是用来提供插件的，插件名称省略了eslint-plugin-，下面这个配置是用来规范html的
      plugins: [
        'html',
        "flow-vars", 
        "react"
      ],

      /* 
      下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
        主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
        "off" -> 0 关闭规则
        "warn" -> 1 开启警告规则
        "error" -> 2 开启错误规则
      */
      rules: {
        // 警告
        "no-extra-parens": 1, // 非必要的括号
        "no-empty": 1, // 块语句中的内容不能为空
        "no-use-before-define": [1, "nofunc"], // 未定义前不能使用
        "no-unused-vars": 1, // 不能有声明后未被使用的变量或参数
        "no-undef": 1, // 不可以 有未定义的变量
        // vue
        "flow-vars/define-flow-type": 1,
        "flow-vars/use-flow-type": 1,

        // react
        "react/jsx-uses-react": 2,
        "react/jsx-uses-vars": 2,

        // 代码风格
        "no-multi-spaces": 1, // 不能用多余的空格
        "key-spacing": [1, {  // 对象字面量中冒号的前后空格
          "beforeColon": false,
          "afterColon": true
        }],
        "block-scoped-var": 2, // 块语句中使用var
        "consistent-return": 2, // return 后面是否允许省略
        "accessor-pairs": 2, // 在对象中使用getter/setter
        "no-return-assign": [2, "always"], // return 语句中不能有赋值表达式
        "no-redeclare": [2, {   // 禁止重复声明变量
          "builtinGlobals": true
        }],
        "space-infix-ops": 2, // 中缀操作符周围要不要有空格
        "curly": 1, // 必须使用 if(){} 中的{}

        // common js
        "no-duplicate-imports": 1
      }
    }
    ```
## ESlint2
    ```
    "no-caller": 1,//禁止使用arguments.caller或arguments.callee
    "no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
    "no-empty": 2,//块语句中的内容不能为空
    "no-eq-null": 2,//禁止对null使用==或!=运算符
    "no-eval": 1,//禁止使用eval
    "no-extra-parens": 2,//禁止非必要的括号
    "no-extra-semi": 2,//禁止多余的冒号
    "no-func-assign": 2,//禁止重复的函数声明
    "no-inline-comments": 0,//禁止行内备注
    "no-label-var": 2,//label名不能与var声明的变量名相同
    "no-mixed-spaces-and-tabs": [2, false],//禁止混用tab和空格
    "linebreak-style": [0, "windows"],//换行风格
    "no-multi-spaces": 1,//不能用多余的空格
    "no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
    "no-redeclare": 2,//禁止重复声明变量
    "no-return-assign": 1,//return 语句中不能有赋值表达式
    "no-self-compare": 2,//不能比较自身
    "no-sparse-arrays": 2,//禁止稀疏数组， [1,,2]
    "no-trailing-spaces": 1,//一行结束后面不要有空格
    "no-this-before-super": 0,//在调用super()之前不能使用this或super
    "no-undef": 1,//不能有未定义的变量
    "no-underscore-dangle": 1,//标识符不能以_开头或结尾
    "no-unused-vars": [2, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数
    "no-use-before-define": 2,//未定义前不能使用
    "no-var": 0,//禁用var，用let和const代替

    "array-bracket-spacing": [2, "never"],//是否允许非空数组里面有多余的空格
    "arrow-parens": 0,//箭头函数用小括号括起来
    "arrow-spacing": 0,//=>的前/后括号
    "accessor-pairs": 0,//在对象中使用getter/setter
    "camelcase": 2,//强制驼峰法命名
    "consistent-this": [2, "that"],//this别名
    "default-case": 2,//switch语句最后必须有default
    "eqeqeq": 2,//必须使用全等
    "func-style": [0, "declaration"],//函数风格，规定只能使用函数声明/函数表达式
    "indent": [2, 4],//缩进风格
    ```