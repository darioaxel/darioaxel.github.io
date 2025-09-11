import comp from "/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"Home\",\"lang\":\"es-ES\",\"frontmatter\":{\"home\":true,\"icon\":\"house\",\"title\":\"Home\",\"heroImage\":\"/assets/image/darioaxel-nobackground.png\",\"bgImage\":\"https://theme-hope-assets.vuejs.press/bg/6-light.svg\",\"bgImageDark\":\"https://theme-hope-assets.vuejs.press/bg/6-dark.svg\",\"bgImageStyle\":{\"background-attachment\":\"fixed\"},\"heroText\":\"darioaxel.dev\",\"tagline\":\"Mi nombre es Darío Ureña y soy Profe de FPs e Ingeniero en Informática. Este es mi repositorio de documentos para la docucencia que se encuentra... EN CONTRUCCIÓN :-)\",\"actions\":[{\"text\":\"Docencia\",\"icon\":\"lightbulb\",\"link\":\"./docencia/index.html\",\"type\":\"primary\"},{\"text\":\"Proyectos\",\"link\":\"./proyectos/\"},{\"text\":\"Blog\",\"link\":\"./blog/\"}],\"highlights\":[{\"header\":\"Blog\",\"description\":\"Blog personal con artículos programación y proyectos varios.\",\"image\":\"/assets/image/blog.svg\",\"bgImage\":\"https://theme-hope-assets.vuejs.press/bg/5-light.svg\",\"bgImageDark\":\"https://theme-hope-assets.vuejs.press/bg/5-dark.svg\",\"highlights\":[{\"title\":\"Blog features\",\"icon\":\"blog\",\"details\":\"Listing your articles with their dates, tags and categories\",\"link\":\"https://theme-hope.vuejs.press/guide/blog/intro.html\"}]}],\"copyright\":false,\"footer\":\"Creado con cariño por darioaxel | Creative Commons Attribution-NonCommercial 4.0 International License\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"Home\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"darioaxel\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Home\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"es-ES\"}]]},\"readingTime\":{\"minutes\":0.45,\"words\":134},\"filePathRelative\":\"README.md\",\"excerpt\":\"\"}")
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
