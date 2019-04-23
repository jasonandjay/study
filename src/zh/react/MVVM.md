# MVVM
#### 1、MVVM是什么？
1. MVVM是Model-View-ViewModel的简写
2. 它本质上是MVC 的改进版
3. MVVM（Model-View-ViewModel）框架的由来是MVP（Model-View-Presenter）模式与WPF结合的应用方式时发展演变过来的一种新型架构框架
#### 2、MVVM优点

- > MVVM模式和MVC模式一样，主要目的是分离视图（View）和模型（Model），有几大优点

1. **低耦合**：视图（View）可以独立于Model变化和修改，一个ViewModel可以绑定到不同的"View"上，当View变化的时候Model可以不变，当Model变化的时候View也可以不变
2. **可重用性**：你可以把一些视图逻辑放在一个ViewModel里面，让很多view重用这段视图逻辑
3. **独立开发**：开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面设计，使用Expression Blend可以很容易设计界面并生成xml代码
4. **可测试**：界面素来是比较难于测试的，而现在测试可以针对ViewModel来写