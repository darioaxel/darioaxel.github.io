import comp from "/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/guide/foo/index.html.vue"
const data = JSON.parse("{\"path\":\"/guide/foo/\",\"title\":\"Foo feature\",\"lang\":\"es-ES\",\"frontmatter\":{\"title\":\"Foo feature\",\"icon\":\"lightbulb\",\"description\":\"Introduction We support foo feature, ... Details ...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Foo feature\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"darioaxel\\\",\\\"url\\\":\\\"darioaxel.dev\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/guide/foo/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"darioaxel\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Foo feature\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Introduction We support foo feature, ... Details ...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"es-ES\"}]]},\"readingTime\":{\"minutes\":0.05,\"words\":15},\"filePathRelative\":\"guide/foo/README.md\",\"excerpt\":\"<h2>Introduction</h2>\\n<p>We support foo feature, ...</p>\\n<h2>Details</h2>\\n<ul>\\n<li><a href=\\\"/guide/foo/ray.html\\\" target=\\\"_blank\\\">ray</a></li>\\n<li>...</li>\\n</ul>\\n\",\"autoDesc\":true}")
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
