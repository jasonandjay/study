module.exports = {
  dest: './docs/',
  base: '/study/',
  markdown: {
    toc: { includeLevel: [2, 3] }
  },
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '前端知识点总结',
      description: '任何不能够给你快乐的编程都是耍流氓'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  serviceWorker: true,
  theme: 'vue',
  themeConfig: {
    repo: 'jasonandjay/study',

    docsDir: 'src',
    editLinks: true,
   
    locales: {
      '/': {
        label: '简体中文',
        repo: 'jasonandjay/study',
      
        selectText: '选择语言',
        editLinkText: '帮助我们改进内容',
        lastUpdated: '上次更新',
        nav: [
          {
            text: '快速搭建开发环境',
            link: '/zh/standard/Start.md'
          },
          {
            text: '算法',
            items: [
              { text: '编程基本功', link: '/zh/algorithm/Charpter4.md'},
              { text: '数学趣题(一)', link: '/zh/algorithm/Charpter5.md'},
              { text: '数学趣题(二)', link: '/zh/algorithm/Charpter6.md'}
            ],
          },
          {
            text: '项目相关',
            items: [
              { text: '前端规范', link: '/zh/standard/Standard.md'},
              { text: '项目流程', link: '/zh/standard/Project.md'},
              { text: '前后端交互', link: '/zh/standard/Cooperation.md'},
              { text: '移动端兼容问题', link: '/zh/standard/Compatibility.md'}
            ],
          },
          {
            text: '知名公司面试题',
            items: [
              { text: '面试必看', link: '/zh/interview/index.md'},
              { text: '阿里巴巴', link: '/zh/interview/ali.md'},
              { text: '龙湖地产', link: '/zh/interview/longhu.md'}
            ]
          },
          {
            text: '知识点笔记',
            items: [
              { text: '在线思维导图', link: '/zh/interface/Mind.md'},
              { text: 'Vue', link: '/zh/vue/' },
              { text: 'React', link: '/zh/react/'},
              { text: '小程序', link: '/zh/miniapp/' },
              { text: '悦读管理后台', link: '/zh/interface/Yuedu.md'},
              { text: 'BlackMarket', link: '/zh/interface/BlackMarket.md'},
              { text: 'TouTiao', link: '/zh/interface/TouTiao.md'}
            ]
          },
          // {
          //   text: '语言',
          //   items: [
          //     { text: 'Chinese', link: '/language/chinese' },
          //     { text: 'Japanese', link: '/language/japanese' }
          //   ]
          // },
          // {
          //   text: '配置参考',
          //   link: '/config/'
          // },
          // {
          //   text: '默认主题配置',
          //   link: '/default-theme-config/'
          // }
        ],
        sidebar: {
          '/guide/': genSidebarConfig('指南'),
          '/zh/ali/': [{title:'阿里面试题'}],
          '/zh/vue/': [{title: 'Vue知识点', children: [
            '', 'Es6', 'Es6方法扩展', 'Webpack', 'Babel', 'Promise', 'Vue 各种方法之间的区别', 'Vue组件', 'Vue路由', 'Vue动画', 'vue钩子函数', 'vuex'
          ]}],
          '/zh/react/': [{title: 'React知识点', children: [
            '', 'JSX', 'MVVM', 'Props', 'React生命周期', 'React组件', 'React路由', 'redux', 'redux中间件', '组件通信', '高阶组件'
          ]}],
          '/zh/miniapp/': [{title: '小程序知识点', children: [
            '', 'WXS', 'wepy组件通信', '小程序事件', '小程序路由', '小程序组件', '小程序组件化'
          ]}]
        }
      }
    },
    
  }
}

function genSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'getting-started',
        'basic-config',
        'assets',
        'markdown',
        'using-vue',
        'custom-themes',
        'i18n',
        'deploy'
      ]
    }
  ]
}
