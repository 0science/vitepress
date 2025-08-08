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
      { text: '前端', link: '/Frontend/' }
    ],
    sidebar: {
      '/Frontend/':[
        { text: '路线', link: '/Frontend/' },
        { text: '语义化标签', link: '/Frontend/HTML/' },

      ]
    },

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
