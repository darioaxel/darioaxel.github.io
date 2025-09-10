import comp from "/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/docencia/index.html.vue"
const data = JSON.parse("{\"path\":\"/docencia/\",\"title\":\"Docencia\",\"lang\":\"es-ES\",\"frontmatter\":{\"title\":\"Docencia\",\"icon\":\"lightbulb\",\"description\":\"Docencia Actualmente me encuentro impartiendo docencia de forma virtual en Campus Digital FP. Aquí encontrarás los materiales docentes que utilizo en mis clases de Desarrollo We...\"},\"readingTime\":{\"minutes\":0.24,\"words\":73},\"filePathRelative\":\"docencia/README.md\",\"excerpt\":\"\\n<p>Actualmente me encuentro impartiendo docencia de forma virtual en <a href=\\\"https://campusdigitalfp.com/\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">Campus Digital FP</a>.</p>\\n<p>Aquí encontrarás los materiales docentes que utilizo en mis clases de Desarrollo Web en Entorno Servidor (DWES) que iré creando durante el curso 2025/2026 y otros módulos de cursos anteriores (que también iré actualizando cuando pueda).</p>\",\"autoDesc\":true}")
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
