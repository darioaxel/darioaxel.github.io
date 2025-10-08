import comp from "/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/blog/article/first-article copy.html.vue"
const data = JSON.parse("{\"path\":\"/blog/article/first-article%20copy.html\",\"title\":\"Mi primer artículo!!\",\"lang\":\"es-ES\",\"frontmatter\":{\"title\":\"Mi primer artículo!!\",\"date\":\"2025-06-20T00:00:00.000Z\",\"category\":[\"Blog\"],\"tag\":[\"VuePress\",\"JavaScript\"],\"type\":\"article\",\"description\":\"Mi primer artículo!! ¡Hola, mundo! Este es mi primer artículo en VuePress con Theme Hope 😃 Para comenzar, voy a explicar todos los pasos que he ido dando para crear esta web y ...\"},\"readingTime\":{\"minutes\":0.22,\"words\":67},\"filePathRelative\":\"blog/article/first-article copy.md\",\"excerpt\":\"\\n<p>¡Hola, mundo! Este es mi primer artículo en VuePress con Theme Hope 😃<br>\\nPara comenzar, voy a explicar todos los pasos que he ido dando para crear esta web y como configurarla.</p>\\n<h2>Instalación de VuePress con Theme Hope</h2>\\n<h2>Estructura del Proyecto</h2>\\n<h2>Modificaciones en el Theme</h2>\",\"autoDesc\":true}")
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
