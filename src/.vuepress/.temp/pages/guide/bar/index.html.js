import comp from "/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/guide/bar/index.html.vue"
const data = JSON.parse("{\"path\":\"/guide/bar/\",\"title\":\"Bar feature\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Bar feature\",\"icon\":\"lightbulb\",\"description\":\"Introduction We support bar feature, ... Details ...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Bar feature\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"darioaxel\\\",\\\"url\\\":\\\"darioaxel.dev\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/guide/bar/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Docs Demo\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Bar feature\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Introduction We support bar feature, ... Details ...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"en-US\"}]]},\"readingTime\":{\"minutes\":0.05,\"words\":15},\"filePathRelative\":\"guide/bar/README.md\",\"excerpt\":\"<h2>Introduction</h2>\\n<p>We support bar feature, ...</p>\\n<h2>Details</h2>\\n<ul>\\n<li><a href=\\\"/guide/bar/baz.html\\\" target=\\\"_blank\\\">baz</a></li>\\n<li>...</li>\\n</ul>\\n\",\"autoDesc\":true}")
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
