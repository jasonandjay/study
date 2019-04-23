# Webpack
#### 1、简介
- 模块的打包器(将多个文件打包为一个文件)
- 自动化构建工具(和gulp类似)
- 在webpack当中任何一个文件都需要一个loader解析文件
#### 2、能干啥？
- 提升网站的响应速度，减少http 请求数
##### 3_1、开始

cnpm install -g webpack

cnpm install -g webpack-cli

##### 3_2、配置文件
默认: webpack.config.js

```
下包：
    extract-text-webpack-plugin@next   // 样式的抽离

const path = require('path');
const htmlwebpackplugin = require('html-webpack-plugin'); // 新建html页面
// 将多个样式表打包为一个样式表
const ExtractTexPlugin = require('extract-text-webpack-plugin')  // 样式的抽离

function entries(){
    let temp = {};
    let pathname = path.join(__dirname,'src');
    let files = fs.readdirSync(pathname);
    files.map(file =>{
        let pathUrl = path.join(pathname,file);
        ley stats = fs.statSync(pathUrl);
        if(stats.isFile()){
            let key = path.basename(pathUrl,'.js');
            temp[file] = pathUrl;
        }
    })
}
module.exports = {
    mode:'development',  // 解决警告
    // 单入口文件
    entry:path.join(__dirname,'src/app.js'),
    // 多入口文件
    // entry:{
    //   app:path.join(__dirname,'src/app.js'),
    //   app2:path.join(__dirname,'src/app2.js')
    // }
    output:{
        path:path.join(__dirname,'dist'),
        filename:'buildle.js'
    },
    // webpack文件解析器，用来解析各种loader
    module:{
        rules:[
            {
                test:/\.css$/,
                loader:ExtractTextPlugin.extract({  // 样式的抽离
                    fallback:'style-loader',
                    use:'css-loader'
                })
            },{
                test:/\.(jpg|png|gif)/,
                loader:'url-loader' 
            },{
                test:/\.(sass|scss)$/,
                loader:[
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    resolve:{
        alias:{
            common:path.join(__dirname,'src/....');
        }
    }
    devServer:{ // 起服务
        host:"localhost",
        port:8080,
        contentBase:'.',   // 基准路径  . 根目录 //本地服务器所加载的页面所在的目录
        overlay:true, // 将错误显示在页面中
        inline:true, // 当源文件发生改变是自动刷新页面
        hot:true,   // 模块的热替换
        stats:'errors-only',  // 只打印错误
        compress:true  // 当他为true时对所有的服务器资源采用gzip压缩
        before(app){
            app.get('/api',(req,res)=>{
                res.end()
            }) 
        }
    }
    plugins:[
        new webpack.HotModuleReplacementPlugin(), // 模块的热替换
        new ExtractTextPlugin('common.css'),  //  common.css 目标目录
        new HtmlWebpackPlugin({    // 新建html
            title:"my first page",
            filename:"index.html",
            template:"./index.html",
            inject:true // 默认false,true显示在body中
            
        })
    ],
    // devtool:"eval-source-map"   无map文件
    devtool:"cheap-source-map"  // 有map的压缩文件
}  

// sass需要两个包
// node-sass    sass-loader
```
#### 4、引入 抛出

```
引入: 
单：import Utils from './js/app.js'
多：import {PI,username,test} from './js';
抛出：
单：export default utils
多：export const PI = 3.14;
多：export let a = 6;

```
#### 5、命令
webpack.optimize.commonsChunkPlugin   // 实现多个文件中公共代码的提取

setup()  // 为服务的中间件,可以对请求进行拦截

proxy()  // 用来做代理的，可以将请求代理到别的服务

hot()  // 模块的热加载

contentBase()  // 用来定义静态文件的地址

webpack.ensure()  // 实现文件的懒加载



