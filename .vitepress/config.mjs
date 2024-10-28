import { defineConfig } from 'vitepress'
import sidebarConfig from '../docs/sidebar.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AlexJTech's Library",
  description: '一个使用 VitePress 驱动的个人笔记博客静态网站',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '前端开发', link: '/docs/前端开发/' },
      { text: '后端开发', link: '/docs/后端开发/' },
      { text: '上位机开发', link: '/docs/上位机开发/' },
    ],

    outlineTitle:'当前页大纲',

    outline: [1,3],

    // sidebar: [
    //   {
    //     text: '前端开发',
    //     items: [
    //       { text: 'HTML', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' },
    //     ],
    //   },
    // ],
    sidebar: sidebarConfig,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AlexJTech' },
    ],

    footer: {
      copyright: 'Copyright © 2024-present AlexJTech',
    },

    logo: '/logo.svg',

    // 设置搜索框的样式
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
            },
          },
        },
      },
    },
  },
  head: [['link', { rel: 'icon', href: '/logo.svg' }]],
  // base: "/AlexJTech.github.io/",
})
