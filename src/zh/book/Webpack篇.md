# Webpack篇

### Webapck简介
webpack 就像一条生产线，要经过一系列处理流程后才能将源文件转换成输出结果。 这条生产线上的每个处理流程的职责都是单一的，多个流程之间有存在依赖关系，只有完成当前处理后才能交给下一个流程去处理。 插件就像是一个插入到生产线中的一个功能，在特定的时机对生产线上的资源做处理。
webpack 通过 Tapable 来组织这条复杂的生产线。 webpack 在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条生产线中，去改变生产线的运作。 webpack 的事件流机制保证了插件的有序性，使得整个系统扩展性很好。

### Webpack常用配置
- Entry：入口，webpack构建的起始
- Output: 出口，webpack生成文件的一些配置
- Module：模块，webpack里面一切皆模块，也是代表着文件，从Entry配置的入口文件开始，递归找出依赖的模块
- Chunk：代码块，找出递归依赖模块经转换后组合成代码块
- Loader：模块转换器，也就是将模块的内容按照需求装换成新内容
- Plugin：扩展插件，webpack构建过程中，会在特定的时机广播对应的事件，而插件可以监听这些事件的发生
- devServer: 本地服务配置
  
### Webpack的生命流程
![完整流程](/study/book/webpack_lifecycle.jpeg)  
webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：
- 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
- 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
- 确定入口：根据配置中的 entry 找出所有的入口文件
- 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
- 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。  
  
在以上过程中，webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 webpack 提供的 API 改变 webpack 的运行结果。

### webpack如何打包优化
#### 打包资源优化
  - 公用包的抽离，webpack3的CommonsChunkPlugin到webpack4的optimization.splitChunks 和 optimization.runtimeChunk
  - 资源压缩optimize.UglifyJsPlugin 废弃，由 optimization.minimize 替代
#### 打包优化
- 缩小编译范围，减少不必要的编译工作，即 modules、mainFields、noParse、includes、exclude、alias等
- 通过 externals 配置来提取常用库，引用cdn
- dllPlugin，动态链接第三方库
- 使用Happypack，将loader由单进程转为多进程
- 可视化打包，webpack-bundle-analyzer，各个模块的大小和依赖关系呈现出来
  
### loader和plugin的区别
  - loader完成相应文件的转化处理（css-loader是否使用cssModule）
  - plugin通过注入的compiler监听整个构建过程中的事件，修改生成文件
  - 
### webpack原理
[手动实现webpack](https://segmentfault.com/a/1190000018385415?utm_source=sf-related)

### runtime和manifest的区别
- runtime就是调度更新，删除或修改文件的变化
- manifest把打包后的文件和源文件做个映射
