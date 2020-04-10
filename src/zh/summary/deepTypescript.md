---
sidebar: auto
sidebarDepth: 2
---

<!-- ## TS笔记 -->
<!-- ------------------ -->
## 环境配置
### 安装全局TypeScript
```js
npm install -g typescript
```

### 创建环境
查看支持命令
```js
tsc --help
```
初始化
```js
tsc --init
```

## TS类型编程
### 索引类型

### 映射类型

### 条件类型
```js
interface People = {
  id: string
  name: string
  age?: number
  from?: string
}
type NullableKeys<T> = { [K in keyof T]: T[K] is -readonly ? K : never }[keyof T]
```

### infer关键字

### 

