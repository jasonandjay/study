# CSS篇
### 介绍一下标准的CSS的盒子模型？低版本IE的盒子模型有什么不同的？
盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；  
区  别： IE的content部分把 border 和 padding计算了进去；   
在CSS3中引入了box-sizing属性, 它可以允许改变默认的CSS盒模型对元素宽高的计算方式。

共包括两个选项：
- content-box：标准盒模型，CSS定义的宽高只包含content的宽高
- border-box：IE盒模型，CSS定义的宽高包括了content，padding和border

### CSS选择符有哪些？哪些属性可以继承？
- id选择器（ # myid）
- 类选择器（.myclassname）
- 标签选择器（div, h1, p）
- 相邻选择器（h1 + p）
- 子选择器（ul > li）
- 后代选择器（li a）
- 通配符选择器（ * ） 
- 属性选择器（a[rel = "external"]）
- 伪类选择器（a:hover, li:nth-child）
- 可继承的样式： font-size font-family color, UL LI DL DD DT;
- 不可继承的样式：border padding margin width height ;
 
### CSS优先级算法如何计算？
- 优先级就近原则，同权重情况下样式定义最近者为准; 
- 载入样式以最后载入的定位为准;
   
优先级顺序为:  
!important > 内联 > id > class > tag 
 
### CSS3新增伪类有那些？
举例：
- p:first-of-type 选择属于其父元素的首个p元素。 
- p:last-of-type  选择属于其父元素的最后p元素。 
- p:only-of-type  选择属于其父元素唯一的p元素。 
- p:only-child    选择属于其父元素的唯一子元素的每个p元素。 
- p:nth-child(2)  选择属于其父元素的第二个子元素的每个p元素。 
- :after          在元素之后添加内容,也可以用来做清除浮动。 
- :before         在元素之前添加内容 
- :enabled       
- :disabled       控制表单控件的禁用状态。 
- :checked        单选框或复选框被选中。 
 
### 如何居中不定宽高div？
水平垂直居中问题，在css中margin: 0 auto;可以实现水平居中，但是在垂直居中方面一直没有特定的属性，直到css3的出现，有了弹性盒，可以通过设置弹性盒直接设置居中位置，做浏览器兼容的话可以通过使用一些hack处理，负margin方法，table-cell方法，位移等方法   
- 1，margin auto方法  

CSS代码：
```css
.container{      
    width: 500px;       
    height: 400px;       
    border: 2px solid #379;       
    position: relative;  
} 
.inner{      
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
```

HTML代码：
```html
<div class="container">     
    <div class="inner"></div> 
</div> 
```
这里，我们首先用top:50%和left:50%让inner的坐标原点（左上角）移动到container的中心，然后再利用负margin让它往左偏移自身宽的一半，再往上偏移自身高的一半，这样inner的中心点就跟container的中心点对齐了。
- 2，table－cell方法  

CSS代码：
```css
div{    
     width: 300px; 
     height: 300px; 
     border: 3px solid #555; 
     display: table-cell; 
     vertical-align: middle; 
     text-align: center; 
}
img{
     vertical-align: middle; 
}
```

HTML代码：
```html
<div>     
    <img src="mm.jpg">
</div>
``` 

通过将盒子转换为table元素，table元素本身是可以通过属性来控制位置，div上面的vertical-align: middle是控制垂直方向上的居中的，而text-align: center是控制水平方向的
 
- 3，弹性盒子法  
  
CSS代码：
```css
.container{
       width: 300px; 
       height: 200px; 
       border: 3px solid #546461; 
       display: -webkit-flex; 
       display: flex; 
       -webkit-align-items: center; 
       align-items: center; 
       -webkit-justify-content: center; 
       justify-content: center;  
} 
.inner{
       border: 3px solid #458761; 
       padding: 20px;  
}
```

HTML代码：
```html
<div class="container"> 
     <div class="inner"> 
         我在容器中水平垂直居中 
     </div> 
</div>
```
align-items控制垂直方向的居中，justify-content控制水平方向的居中。这是CSS3的新方法

4，位移方法  
位移方法和margin定位方法一样，只不过吧margin改成了尾翼自身的一半
```css
transform:translate(-50%,--50%) 
```

### display有哪些值？说明他们的作用。
- block          块类型元素一样显示
- none           不显示
- inline-block   行内元素一样显示，但其内容象块类型元素一样显示
- list-item      块类型元素一样显示，并添加样式列表标记
- table          此元素会作为块级表格来显示
- inherit        规定应该从父元素继承display属性的值 
  
### position属性
- static：默认的属性值，按照标准流（包括浮动方式）进行布局。
- relative：称为相对定位，使用相对的盒子的位置常以标准量的排版方式为基础，然后使盒子相对于它在原本的标准位置偏移指定的距离.相对定位仍在标准流中，它对父块和兄弟块盒子没有任何影响。
- absolute：绝对定位，盒子的位置以它的包含框为基准进行偏移。绝对定位从标准流中脱离，并且以它最近的一个已经定位的祖先元素为基准进行定位。没有已经定位的祖先元素，则以浏览器窗口为基准进行定位。
- fixed：固定定位，与绝对定位类似，以浏览器窗口为基准进行定位，拖动浏览器窗口的滚动条时，位置保持不变。
- sticky：粘性定位，粘性定位是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。但是这个属性兼容性不太好，ios上支持度相对好一些
- inherit：规定从父元素继承 position 属性的值。

### CSS3有哪些新特性？
- 新增各种CSS选择器  （: not(.input)：所有 class 不是“input”的节点） 
- 圆角           （border-radius:8px） 
- 多列布局        （multi-column layout） 
- 阴影和反射        （Shadow\Reflect） 
- 文字特效      （text-shadow、） 
- 文字渲染      （Text-decoration） 
- 线性渐变      （gradient） 
- 旋转          （transform） 
- 增加了旋转,缩放,定位,倾斜,动画，多背景

### 用纯CSS创建一个三角形的原理是什么？
把上、左、右三条边隐藏掉（颜色设为 transparent）
```css
#demo {
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}
```

### li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？
行框的排列会受到中间空白（回车\空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为0，就没有空格了。
 
### 为什么要初始化CSS样式。
- 因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。 
- 当然，初始化样式会对SEO有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。 
最简单的初始化方法： 
```css
/* （强烈不建议）  */
* {padding: 0; margin: 0;}
``` 
常用的样式初始化代码：
```css
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; } 
body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; } 
h1, h2, h3, h4, h5, h6{ font-size:100%; } 
address, cite, dfn, em, var { font-style:normal; } 
code, kbd, pre, samp { font-family:couriernew, courier, monospace; } 
small{ font-size:12px; } 
ul, ol { list-style:none; } 
a { text-decoration:none; } 
a:hover { text-decoration:underline; } 
sup { vertical-align:text-top; } 
sub{ vertical-align:text-bottom; } 
legend { color:#000; } 
fieldset, img { border:0; } 
button, input, select, textarea { font-size:100%; } 
table { border-collapse:collapse; border-spacing:0; } 
```

### absolute的containing block(容器块)计算方式跟正常流有什么不同？
无论属于哪种，都要先找到其祖先元素中最近的 position 值不为 static 的元素，然后再判断： 
- 若此元素为 inline 元素，则 containing block 为能够包含这个元素生成的第一个和最后一个 inline box 的 padding box (除 margin, border 外的区域) 的最小矩形； 
- 否则,则由这个祖先元素的 padding box 构成。 
如果都找不到，则为 initial containing block。
- 补充：
  1. static(默认的)/relative：简单说就是它的父元素的内容框（即去掉padding的部分）
  2. absolute: 向上找最近的定位为absolute/relative的元素 
  3. fixed: 它的containing block一律为根元素(html/body)，根元素也是initial containing block 
 
### 对BFC规范(块级格式化上下文：block formatting context)的理解？
W3C CSS 2.1规范中的一个概念,它是一个独立容器，决定了元素如何对其内容进行定位,以及与其他元素的关系和相互作用。一个页面是由很多个 Box 组成的,元素的类型和display属性,决定了这个Box的类型。   
不同类型的 Box,会参与不同的 Formatting Context（决定如何渲染文档的容器）,因此Box内的元素会以不同的方式渲染,也就是说BFC内部的元素和外部的元素不会互相影响。
#### 创建规则： 
- 根元素 
- 浮动元素（float不是none） 
- 绝对定位元素（position取值为absolute或fixed） 
- display取值为inline-block,table-cell, table-caption,flex, inline-flex之一的元素 
- overflow不是visible的元素 
#### 作用： 
- 可以包含浮动元素 
- 不被浮动元素覆盖 
- 阻止父子元素的margin折叠 
 
### css定义的权重
以下是权重的规则：标签的权重为1，class的权重为10，id的权重为100，以下例子是演示各种定义的权重值：
```css
/*权重为1*/         div{} 
/*权重为10*/        .class1{} 
/*权重为100*/       #id1{} 
/*权重为100+1=101*/ #id1 div{} 
/*权重为10+1=11*/   .class1 div{} 
/*权重为10+10+1=21*/.class1 .class2 div{} 
```
如果权重相同，则最后定义的样式会起作用，但是应该避免这种情况出现
 
### 请解释一下为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式？
浮动元素脱离文档流，不占据空间，浮动元素碰到包含它的边框或者浮动元素的边框停留。
#### 浮动元素引起的问题：
- 父元素的高度无法被撑开，影响与父元素同级的元素
- 与浮动元素同级的非浮动元素（内联元素）会跟随其后
- 若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构
#### 清除浮动
- 1.使用overflow，float，定位等方法形成BFC
- 2.在浮动元素后添加空标签或伪元素，让父元素强行包裹浮动元素
  
### 移动端的布局用过媒体查询吗？
css的媒体查询允许通过@media标签为特定媒体的浏览器设定样式，其中包含众多筛选，功能强大。
 
### 使用 CSS 预处理器吗？喜欢那个？             
SASS (SASS、LESS没有本质区别，只因为团队前端都是用的SASS)，可以使用sass和less对css做模块化开发，定制样式的组件

### CSS优化、提高性能的方法有哪些？
将样式表放到页面顶部
不使用CSS表达式
不使用@import
不使用IE的Filter

### 元素竖向的百分比设定是相对于容器的高度吗？
是的，元素的百分比设置一般是根据父级元素的宽高决定的，如果父级元素没有宽高百分比是不起作用的

### 什么是响应式设计？响应式设计的基本原理是什么？
响应式设计就是为了实现根据不同设备环境自动响应及调整网页布局的一种设计方案
基本原理就是利用css的媒体查询功能更具不同屏幕的大小，向下兼容设备、移动优先，达到响应的效果
 
### ::before 和 :after中双冒号和单冒号 有什么区别？解释一下这2个伪元素的作用。 
双冒号是在当前规范中引入的，用于区分伪类和伪元素。但是伪类兼容现存样式，浏览器需要同时支持旧的伪类，比如:first-line、:first-letter、:before、:after等。
对于CSS2之前已有的伪元素，比如:before和:after，单冒号和双冒号的写法::before和::after作用是一样的。
如果只需要兼容webkit、firefox、opera等浏览器，建议对于伪元素采用双冒号的写法，如果不得不兼容IE浏览器，还是用CSS2的单冒号写法比较安全。

### 什么是CSS预处理器和后处理器？ 
- 预处理器例如：LESS、Sass、Stylus
用来预编译Sass或less，增强了css代码的复用性，还有层级、mixin、变量、循环、函数等，具有很方便的UI组件模块化开发能力，极大的提高工作效率。  
- 后处理器例如：PostCSS
通常被视为在完成的样式表中根据CSS规范处理CSS，让其更有效；目前最常做的是给CSS属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。 

### css sprite是什么,有什么优缺点。
概念：将多个小图片拼接到一个图片中。通过background-position和元素尺寸调节需要显示的背景图案
优点：
减少HTTP请求数，极大地提高页面加载速度
增加图片信息重复度，提高压缩比，减少图片大小
更换风格方便，只需在一张或几张图片上修改颜色或样式即可实现
缺点：
图片合并麻烦
维护麻烦，修改一个图片可能需要从新布局整个图片，样式

### 栅格系统？
现在大部分UI框架都内置有删格化系统，常用bootstrap中的，bootstap它提供了一套响应式，移动优先的流式栅格系统(grid system)，将屏幕分成12列来实现响应式的。它的实现原理非常简单，Media Query加上float布局，也研究过bootstrap的源码，在这个过程中也对预处理器有了更深的体会，删格系统这块在bootstrap中sass源码使用的循环生成，less使用的递归生成，我自己也单独封装过一个删格系统

### 渐进增强和优雅降级
- 渐进增强 ：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
- 优雅降级 ：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

### 什么是 FOUC（无样式内容闪烁）？你如何来避免 FOUC？
FOUC - Flash Of Unstyled Content 文档样式闪烁 
```js
<style type="text/css" media="all">@import "../fouc.css";</style>
```
而引用CSS文件的@import就是造成这个问题的罪魁祸首。IE会先加载整个HTML文档的DOM，然后再去导入外部的CSS文件，因此，在页面DOM加载完成到CSS导入完成中间会有一段时间页面上的内容是没有样式的，这段时间的长短跟网速，电脑速度都有关系。   
解决方法简单的出奇，只要在head之间加入一个link或者script元素就可以了。

### display: none;与visibility: hidden;的区别
#### 联系：  
它们都能让元素不可见
#### 区别：
- display:none;会让元素完全从渲染树中消失，渲染的时候不占据任何空间；
- visibility: hidden;不会让元素从渲染树消失，渲染师元素继续占据空间，只是内容不可见
- display: none;是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示；
- visibility: hidden;是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式
- 修改常规流中元素的display通常会造成文档重排。修改visibility属性只会造成本元素的重绘。
- 读屏器不会读取display: none;元素内容；会读取visibility: hidden;元素内容

### 常见的布局方式
常见的布局这么几种
- 单列水平居中布局
- 一列定宽一列自适应布局
- 两列定宽一列自适应布局 
- 两侧定宽中间自适应三列布局。
  
#### 一列定宽一列自适应
定位布局
```css
/* 左边的宽度写死，右边盒子使用定位拉伸法实现，left等于左边盒子的宽度，right等于0 */
.left-box{ width:200px;   }
.right-box{  position:absolute; left:200px; right:0; }
/* 或者左边的定位写死宽度，右边的写padding-left等于左边的宽度（常用一点） */
.left-box{ width:200px;  position: fixed; height:100%; }
.right-box{  padding-left:200px;}
```

浮动布局
```css
/* 左边的宽度写死并且浮动，右边盒子写overflow:hidden;利用的是创建一个新的BFC（块级格式化上下文）来防止文字环绕的原理来实现的。BFC就是一个相对独立的布局环境，它内部元素的布局不受外面布局的影响 */
.left-box {
        width: 200px;
        height: 150px;
        float: left;
        background: #f22;
}
.right-box {
        height: 200px;
        overflow: hidden;
        background: #cff;
 }
```

#### 两列定宽一列自适应上面的布局方式同样适用

#### 常见的三列布局 - 圣杯布局和双飞翼布局。
两者都属于三列布局，是一种很常见的页面布局方式。三列一般分别是子列、主列和附加列，其中子列一般是居左的导航，且宽度固定；主列是居中的主要内容，宽度自适应；附加列一般是广告等额外信息，居右且宽度固定。  
圣杯布局
```html
<div class="container"> 
    <div class="main"></div> 
    <div class="sub"></div> 
    <div class="extra"></div> 
</div>
```
```css
.container { 
    padding-left: 210px; 
    padding-right: 190px; 
}
.main { 
    float: left; 
    width: 100%; 
    height: 300px; 
}
.sub { 
    position: relative; 
    left: -210px; 
    float: left; 
    width: 200px; 
    height: 300px; 
    margin-left: -100%; 
}
.extra { 
    position: relative; 
    right: -190px; 
    float: left; 
    width: 180px; 
    height: 300px; 
    margin-left: -180px; 
}
```

双飞翼布局
```html
<div class="main-wrapper"> 
    <div class="main"></div> 
</div>
<div class="sub"></div> 
<div class="extra"></div> 
```

```css
.main-wrapper { 
    float: left; 
    width: 100%; 
}
.main { 
    height: 300px; 
    margin-left: 210px; 
    margin-right: 190px; 
    background-color: rgba(255, 0, 0, .5); 
}
.sub { 
    float: left; 
    width: 200px; 
    height: 300px; 
    margin-left: -100%; 
    background-color: rgba(0, 255, 0, .5); 
}
.extra { 
    float: left; 
    width: 180px; 
    height: 300px; 
    margin-left: -180px; 
    background-color: rgba(0, 0, 255, .5); 
}
```
俩种布局方式都是把主列放在文档流最前面，使主列优先加载。  
两种布局方式在实现上也有相同之处，都是让三列浮动，然后通过负外边距形成三列布局。  
两种布局方式的不同之处在于如何处理中间主列的位置：
- 圣杯布局是利用父容器的左、右内边距定位；
- 双飞翼布局是把主列嵌套在div后利用主列的左、右外边距定位。

#### 其他的布局
- flex布局  
Flexbox又叫弹性盒模型。它可以简单使用一个元素居中（包括水平垂直居中），可以让扩大和收缩元素来填充容器的可利用空间，可以改变源码顺序独立布局，以及还有其他的一些功能。
Flex布局是我最喜欢的布局，合理使用它能够大大减少布局方面的工作, 例如以上列举的三列布局也可以使用flex轻松实现。此外在移动端使用flex也比较常见。
- 响应式布局  
网页可以自动识别设备屏幕宽度，根据不同的宽度采用不同的CSS的样式，从而达到兼容各种设备的效果。
响应式布局使用媒体查询(CSS3 Media Queries), 根据不同屏幕分辨率采用不同CSS规则
- 流式布局  
流式布常见的就是bootstrap了它提供了一套响应式，移动优先的流式栅格系统(grid system)，将屏幕分成12列来实现响应式的。它的实现原理非常简单，Media Query加float布局

### 说一下CSS的hack
由于不同厂商的流览器或某浏览器的不同版本（如IE6-IE11,Firefox/Safari/Opera/Chrome等），对CSS的支持、解析不一样，导致在不同浏览器的环境中呈现出不一致的页面展现效果。这时，我们为了获得统一的页面效果，就需要针对不同的浏览器或不同版本写特定的CSS样式，我们把这个针对不同的浏览器/不同版本写相应的CSS code的过程，叫做CSS hack
CSS Hack的方法
条件注释法
```html
<!--[if IE]>
这段文字只在IE浏览器显示
<![endif]—>
```

类内属性前缀法
```css
.hack{
    background-color:red; /* All browsers */   
    background-color:blue !important;/* All browsers but IE6 */   
    *background-color:black; /* IE6, IE7 */   
    +background-color:yellow;/* IE6, IE7*/  
    background-color:gray\9; /* IE6, IE7, IE8, IE9, IE10 */   
    background-color:purple\0; /* IE8, IE9, IE10 */   
    background-color:orange\9\0;/*IE9, IE10*/  
    _background-color:green; /* Only works in IE6 */   
}  
```

媒体查询
```css
@media \0screen\,screen\9 { 
  .hack{ 
    /* IE 6 7 8 */ 
  }
}
@media screen and (-webkit-min-device-pixel-ratio:0) { 
   .demo { 
      /* Webkit内核 */ 
    }
}
```