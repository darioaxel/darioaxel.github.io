import comp from "/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/blog/index.html.vue"
const data = JSON.parse("{\"path\":\"/blog/\",\"title\":\"Blog & Chorradas\",\"lang\":\"es-ES\",\"frontmatter\":{\"home\":true,\"layout\":\"Blog\",\"icon\":\"note\",\"title\":\"Blog & Chorradas\",\"bgImage\":\"/assets/image/Space-Invaders-1.0.svg\",\"heroImage\":\"/assets/image/space-invader-icon.svg\",\"description\":\"A collection of articles, tutorials, and insights on various topics.\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"Blog & Chorradas\\\",\\\"description\\\":\\\"A collection of articles, tutorials, and insights on various topics.\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/blog/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"darioaxel\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Blog & Chorradas\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"A collection of articles, tutorials, and insights on various topics.\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"es-ES\"}]]},\"readingTime\":{\"minutes\":0.09,\"words\":28},\"filePathRelative\":\"blog/README.md\",\"excerpt\":\"\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
