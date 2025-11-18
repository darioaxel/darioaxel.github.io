export const categoriesMap = JSON.parse("{\"category\":{\"/\":{\"path\":\"/category/\",\"map\":{\"Blog\":{\"path\":\"/category/blog/\",\"indexes\":[0,1,2,3,4,5,6,7,8,9]}}}},\"tag\":{\"/\":{\"path\":\"/tag/\",\"map\":{\"Vue\":{\"path\":\"/tag/vue/\",\"indexes\":[7]},\"Nuxt\":{\"path\":\"/tag/nuxt/\",\"indexes\":[7]},\"Theme Hope\":{\"path\":\"/tag/theme-hope/\",\"indexes\":[7]},\"Docker\":{\"path\":\"/tag/docker/\",\"indexes\":[8]},\"Django\":{\"path\":\"/tag/django/\",\"indexes\":[8]},\"API Rest\":{\"path\":\"/tag/api-rest/\",\"indexes\":[8]},\"Python\":{\"path\":\"/tag/python/\",\"indexes\":[0,1,4,5,6,8]},\"VuePress\":{\"path\":\"/tag/vuepress/\",\"indexes\":[9]},\"JavaScript\":{\"path\":\"/tag/javascript/\",\"indexes\":[9]},\"Programacion\":{\"path\":\"/tag/programacion/\",\"indexes\":[0,2,3]},\"Herencia\":{\"path\":\"/tag/herencia/\",\"indexes\":[2]},\"Polimorfismo\":{\"path\":\"/tag/polimorfismo/\",\"indexes\":[2]},\"algoritmos\":{\"path\":\"/tag/algoritmos/\",\"indexes\":[5,6]},\"Patterns\":{\"path\":\"/tag/patterns/\",\"indexes\":[4]},\"Vibecoding\":{\"path\":\"/tag/vibecoding/\",\"indexes\":[3]}}}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

