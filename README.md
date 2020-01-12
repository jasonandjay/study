<p align="center">
  <img width="280" src="https://avatars1.githubusercontent.com/u/8192412?s=460&v=4" alt="logo">
</p>

## Target
Collect quality content and classical problem
Contributions are welcome!

## Start
``` bash
# fork repo

# 克隆项目
git clone git@github.com:jasonandjay/study.git
```

## Development

> Please make sure your version of Node.js is greater than 8.

``` bash
# 安装依赖 & 启动开发服务
cnpm i & npm run dev # serves VuePress' own docs with itself

# 添加导航 text&link
modify /src/.vuepress/config.js
such as: 
{
  text: '快速搭建开发环境',
  link: '/zh/standard/Start.md'
}

# 创建一个 markdown 文件
touch /src/zh/standard/Start.md

# 添加内容
...
```

## Deploy
``` bash
# 构建为静态文件
npm run build

# 提交代码到仓库
git push origin master

# 开启github pages
设置source: master branch /docs folder

# 查看网站
在浏览器里输入 https://[your account name].github.io/study/
```

## Contribute
- Send pr to add excellent content
- Help us improve our content on exist pages  
 
![improve](/src/.vuepress/public//improve.jpg)

## License

MIT