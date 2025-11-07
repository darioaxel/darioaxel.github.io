import comp from "/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/proyectos/.markdown.html.vue"
const data = JSON.parse("{\"path\":\"/proyectos/.markdown.html\",\"title\":\"Markdown Enhance\",\"lang\":\"es-ES\",\"frontmatter\":{\"title\":\"Markdown Enhance\",\"icon\":\"fa6-brands:markdown\",\"order\":2,\"category\":[\"Guide\"],\"tag\":[\"Markdown\"],\"gitInclude\":[\"README.md\"],\"description\":\"VuePress basically generate pages from Markdown files. So you can use it to generate documentation or blog sites easily. You should create and write Markdown files, so that VueP...\"},\"readingTime\":{\"minutes\":2.63,\"words\":789},\"filePathRelative\":\"proyectos/.markdown.md\",\"excerpt\":\"<p>VuePress basically generate pages from Markdown files. So you can use it to generate documentation or blog sites easily.</p>\\n<p>You should create and write Markdown files, so that VuePress can convert them to different pages according to file structure.</p>\\n\",\"autoDesc\":true}")
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
