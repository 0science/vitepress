import { defineConfig } from 'vitepress'

export default defineConfig({
  ignoreDeadLinks: true,
  title: "赛博空间",
  description: "A VitePress Site",
  base: '/',
  themeConfig: {
    // logo
    logo: '/assets/logo.jpg',
    // 头部导航栏
    nav: [
      { text: '前端', link: '/Frontend/' },
      { text: 'C语言教程', link: '/Frontend/' },
      { text: 'HTML教程', link: '/Frontend/' },
      { text: 'CSS教程', link: '/Frontend/' },
      { text: 'JavaScript教程', link: '/Frontend/' },
    ],
    sidebar: [
      {
        text: '前端',
        items:[
          { text: '路线', link: '/Frontend/' },
          { text: '插件', link: '/Frontend/html/plugin' },
          { text: '面试题', link: '/Frontend/html/interview' },
          { text: '语义化', link: '/Frontend/html/semanticization' },
        ]
      },
      {
        text: 'C语言教程',
        items:[
          { text: '入门', link: '/Frontend/c/introduction' },
          { text: '环境配置', link: '/Frontend/c/environment' },
          { text: '基础知识', link: '/Frontend/c/basic' },
          // { text: '运算符与表达式', link: '/Frontend/c/environment' },
          // { text: '结构化设计', link: '/Frontend/c/environment' },
          // { text: '数组', link: '/Frontend/c/environment' },
          // { text: '函数', link: '/Frontend/c/environment' },
          // { text: '指针', link: '/Frontend/c/environment' },
          // { text: '字符串', link: '/Frontend/c/environment' },
          // { text: '结构体', link: '/Frontend/c/environment' },
          // { text: '文件管理', link: '/Frontend/c/environment' },
          { text: '案例', link: '/Frontend/c/case' },
        ]

      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    outline: [2, 6],
    outlineTitle: '页面导航',
    darkModeSwitchLabel: '切换主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  }
})
