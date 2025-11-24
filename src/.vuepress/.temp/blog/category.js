export const categoriesMap = JSON.parse("{\"category\":{\"/\":{\"path\":\"/category/\",\"map\":{\"Blog\":{\"path\":\"/category/blog/\",\"indexes\":[0,1,2,3,4,5,6,7,8,9,10]}}}},\"tag\":{\"/\":{\"path\":\"/tag/\",\"map\":{\"Vue\":{\"path\":\"/tag/vue/\",\"indexes\":[8]},\"Nuxt\":{\"path\":\"/tag/nuxt/\",\"indexes\":[8]},\"Theme Hope\":{\"path\":\"/tag/theme-hope/\",\"indexes\":[8]},\"Docker\":{\"path\":\"/tag/docker/\",\"indexes\":[9]},\"Django\":{\"path\":\"/tag/django/\",\"indexes\":[0,9]},\"API Rest\":{\"path\":\"/tag/api-rest/\",\"indexes\":[9]},\"Python\":{\"path\":\"/tag/python/\",\"indexes\":[0,1,2,5,6,7,9]},\"VuePress\":{\"path\":\"/tag/vuepress/\",\"indexes\":[10]},\"JavaScript\":{\"path\":\"/tag/javascript/\",\"indexes\":[10]},\"Programacion\":{\"path\":\"/tag/programacion/\",\"indexes\":[1,3,4]},\"Herencia\":{\"path\":\"/tag/herencia/\",\"indexes\":[3]},\"Polimorfismo\":{\"path\":\"/tag/polimorfismo/\",\"indexes\":[3]},\"herencia\":{\"path\":\"/tag/herencia/\",\"indexes\":[0]},\"polimorfismo\":{\"path\":\"/tag/polimorfismo/\",\"indexes\":[0]},\"algoritmos\":{\"path\":\"/tag/algoritmos/\",\"indexes\":[6,7]},\"Patterns\":{\"path\":\"/tag/patterns/\",\"indexes\":[5]},\"Vibecoding\":{\"path\":\"/tag/vibecoding/\",\"indexes\":[4]}}}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

