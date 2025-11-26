export const categoriesMap = JSON.parse("{\"category\":{\"/\":{\"path\":\"/category/\",\"map\":{\"Blog\":{\"path\":\"/category/blog/\",\"indexes\":[0,1,2,3,4,5,6,7,8,9,10,11,12]}}}},\"tag\":{\"/\":{\"path\":\"/tag/\",\"map\":{\"Vue\":{\"path\":\"/tag/vue/\",\"indexes\":[10]},\"Nuxt\":{\"path\":\"/tag/nuxt/\",\"indexes\":[10]},\"Theme Hope\":{\"path\":\"/tag/theme-hope/\",\"indexes\":[10]},\"Django\":{\"path\":\"/tag/django/\",\"indexes\":[0,1,2,11]},\"ORM\":{\"path\":\"/tag/orm/\",\"indexes\":[0,1]},\"Docker\":{\"path\":\"/tag/docker/\",\"indexes\":[11]},\"API Rest\":{\"path\":\"/tag/api-rest/\",\"indexes\":[11]},\"Python\":{\"path\":\"/tag/python/\",\"indexes\":[2,3,4,7,8,9,11]},\"VuePress\":{\"path\":\"/tag/vuepress/\",\"indexes\":[12]},\"JavaScript\":{\"path\":\"/tag/javascript/\",\"indexes\":[12]},\"Programacion\":{\"path\":\"/tag/programacion/\",\"indexes\":[3,5,6]},\"Herencia\":{\"path\":\"/tag/herencia/\",\"indexes\":[5]},\"Polimorfismo\":{\"path\":\"/tag/polimorfismo/\",\"indexes\":[5]},\"herencia\":{\"path\":\"/tag/herencia/\",\"indexes\":[2]},\"polimorfismo\":{\"path\":\"/tag/polimorfismo/\",\"indexes\":[2]},\"algoritmos\":{\"path\":\"/tag/algoritmos/\",\"indexes\":[8,9]},\"Patterns\":{\"path\":\"/tag/patterns/\",\"indexes\":[7]},\"Vibecoding\":{\"path\":\"/tag/vibecoding/\",\"indexes\":[6]}}}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

