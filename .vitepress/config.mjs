import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AlexJTech's Library",
  description: "一个使用 VitePress 驱动的个人笔记博客静态网站",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      copyright:
        'Copyright © 2024-present AlexJTech'
    },

    logo: '/logo.svg',
  },
  head: [["link", { rel: "icon", href: "/logo.svg" }]],
  base: "/AlexJTech/",
})
