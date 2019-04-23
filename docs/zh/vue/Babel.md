# Babel
#### 1、Babel
- 是javascript的编译器/解码器/转码器/解析器

#### 2、配置
- .babelrc

```
命令:
    babel ./index.js -o ./_index.js
下包：
    cnpm install --save-dev babel-cli babel-preset-env
    
    
{
    "presets": [
        "env"
    ]
}

babel-loader // es6转es5
```
