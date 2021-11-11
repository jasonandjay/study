---
sidebar: auto
sidebarDepth: 2
---
- [PR与MR简介](https://jasonandjay.github.io/study/zh/book/%E5%89%8D%E7%AB%AF%E6%9C%AF%E8%AF%AD%E7%AF%87.html#PRMR)

## 分支命名规范
#### 以功能和bug修复分类
- 功能分支：feature/FE-${Jira issue number}-Description-XXX
- bug分支：bug/FE-${Jira issue number}-Description-YYY

#### 以开发者分类
- userA
- userB
- userC

#### 通用分支
- develop 测试分支
- master｜main 主分支(保护分支)
- pre-production 预发分支
- production｜release 生产分支 

#### 版本分支或tag
- 1.0.0
- 1.1.1

## commit规范
### 标题定义
#### 内容格式
```js
<type>(<scope>): <subject>
```
#### type：⽤于说明这次 mr/commit 的类别，只允许使⽤下⾯ 7 个标识(都是⼩写):
- feat：新功能（feature）
- fix：修补bug
- docs：⽂档（documentation）
- style： 格式（不影响代码运⾏的变动）
- refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
- perf： 性能优化
- test：增加测试
- chore：构建过程或辅助⼯具的变动，例如 requirement 的变动可以放到这⾥
#### scope：⽤于说明 mr/commit 影响的范围，⽐如数据层、控制层、视图层等等，视项⽬不同⽽不同。
这⾥可以是 all/base/train-worker/model-manager/ml-service等
#### subject：是 mr/commit ⽬的的简短描述，不超过50个字符
- 以动词开头，使⽤第⼀⼈称现在时，⽐如 change，⽽不是 changed 或 changes
- 第⼀个字⺟⼩写
- 结尾不加句号(.)

### 内容定义
message 的 body 部分是对本次 mr/commit 的详细描述，说明代码变动的动机，以及与以前⾏为的对⽐。
可以包括的内容有：
- 可以分点详细列出
- 关联 issue
- at 其他相关的同学

## 分支合并流程