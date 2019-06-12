# webpack4的简易配置
实现功能
- 自动注入js
- 开发环境热更新
- 抽离CSS
- 压缩JS、CSS、Html
- 第三方非业务依赖包的抽离
- 公共代码包的抽离
- 开发环境线上环境的区分
- devServer请求拦截
- 配置别名
- es6、scss、图片、字体的加载


## package.json
```js
"scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack --mode production",
    "test": "echo \"Error: no test specified\" && exit 1"
}
```
## webpack.config.js
```js
// 处理html
const HtmlWebPackPlugin = require('html-webpack-plugin')
// 清空dist
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 分离CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩js
const TerserJSPlugin = require('terser-webpack-plugin');
// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 处理文件的绝对路径
const path = require('path');
// body-parser中间件，处理post请求传参
const bodyParser = require('body-parser');

module.exports = {
    // 入口文件
    entry: './src/index.js',
    // entry: {
    //     index: './src/index.js',
    //     order: './src/order.js'
    // },

    // 出口配置
    output: {
        filename: 'assets/[name].[hash:6].js',  // 生成文件的名字
        publicPath: '/dist',
        path: path.join(__dirname, 'dist')  // 生成文件的路径
    },

    // 加载模块，配置各种loader
    module: {
        rules: [
            {
                test: /\.(sass|scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                      // 1024 = 1kb
                      limit: 10240,
                      name: 'assets/[name].[hash:6].[ext]',
                    }
                }
            },
            {
                test: /\.(eot|ttf|svg|woff2?)$/,
                use: ['url-loader']
            }
        ]
    },
    // 插件
    plugins: [
        // 打包前清空
        new CleanWebpackPlugin(),
        // 自动注入
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: true
        }),
        // 抽离css
        new MiniCssExtractPlugin({
            filename: 'assets/[name].css',
            chunkFilename: 'assets/[id].css'
        })
    ],
    // 服务配置
    devServer: {
        // open: true, // 自动打开浏览器
        port: 10001,    // 指定端口号
        host: '0.0.0.0',
        hot: true,   // 热更新
        before(app){    // 请求拦截
            app.post('/loader/list', bodyParser.json(), (req, res, next)=>{
                console.log('req...', req);
                console.log('查询参数...', req.query);
                console.log('body体...', req.body)
                res.json({
                    code: 1,
                    msg: '请求成功',
                    data: ['node-sass', 'sass-loader', 'css-loader', 'file-loader', 'url-loader', 'style-loader']
                })
            })
        }
    },
    resolve: {
        // 配置别名
        alias: {
            '@': path.join(__dirname, 'src')
        }
    },
    // 优化的配置
    optimization: {
        minimizer: [
            // 压缩js
            new TerserJSPlugin({}),
            // 压缩css
            new OptimizeCSSAssetsPlugin({})
        ],
        // 包的分离，分离出非业务逻辑相关的包
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名    
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10    
                },
                utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
                    chunks: 'initial',
                    name: 'utils',  // 任意命名
                    minChunks: 2,   // 引用次数最少两次
                    minSize: 0    // 只要超出0字节就生成一个新包
                }
            }
        }
    }
}
```