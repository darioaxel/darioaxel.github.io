import comp from "/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/category/blog/index.html.vue"
const data = JSON.parse("{\"path\":\"/category/blog/\",\"title\":\"Blog Category\",\"lang\":\"en-US\",\"frontmatter\":{\"dir\":{\"index\":false},\"index\":false,\"feed\":false,\"sitemap\":false,\"title\":\"Blog Category\",\"blog\":{\"type\":\"category\",\"name\":\"Blog\",\"key\":\"category\"},\"layout\":\"Blog\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"Blog Category\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/category/blog/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Docs Demo\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Blog Category\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"en-US\"}]]},\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":null,\"excerpt\":\"\"}")
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
