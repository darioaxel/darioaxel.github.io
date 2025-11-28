export const categoriesMap = JSON.parse("{\"category\":{\"/\":{\"path\":\"/category/\",\"map\":{\"Blog\":{\"path\":\"/category/blog/\",\"indexes\":[0,1,2,3,4,5,6,7,8,9,10,11,12,13]}}}},\"tag\":{\"/\":{\"path\":\"/tag/\",\"map\":{\"Vue\":{\"path\":\"/tag/vue/\",\"indexes\":[11]},\"Nuxt\":{\"path\":\"/tag/nuxt/\",\"indexes\":[11]},\"Theme Hope\":{\"path\":\"/tag/theme-hope/\",\"indexes\":[11]},\"NAS\":{\"path\":\"/tag/nas/\",\"indexes\":[0]},\"Linux\":{\"path\":\"/tag/linux/\",\"indexes\":[0]},\"Docker\":{\"path\":\"/tag/docker/\",\"indexes\":[0,12]},\"SSH\":{\"path\":\"/tag/ssh/\",\"indexes\":[0]},\"Django\":{\"path\":\"/tag/django/\",\"indexes\":[1,2,3,12]},\"ORM\":{\"path\":\"/tag/orm/\",\"indexes\":[1,2]},\"API Rest\":{\"path\":\"/tag/api-rest/\",\"indexes\":[12]},\"Python\":{\"path\":\"/tag/python/\",\"indexes\":[3,4,5,8,9,10,12]},\"VuePress\":{\"path\":\"/tag/vuepress/\",\"indexes\":[13]},\"JavaScript\":{\"path\":\"/tag/javascript/\",\"indexes\":[13]},\"Programacion\":{\"path\":\"/tag/programacion/\",\"indexes\":[4,6,7]},\"Herencia\":{\"path\":\"/tag/herencia/\",\"indexes\":[6]},\"Polimorfismo\":{\"path\":\"/tag/polimorfismo/\",\"indexes\":[6]},\"herencia\":{\"path\":\"/tag/herencia/\",\"indexes\":[3]},\"polimorfismo\":{\"path\":\"/tag/polimorfismo/\",\"indexes\":[3]},\"algoritmos\":{\"path\":\"/tag/algoritmos/\",\"indexes\":[9,10]},\"Patterns\":{\"path\":\"/tag/patterns/\",\"indexes\":[8]},\"Vibecoding\":{\"path\":\"/tag/vibecoding/\",\"indexes\":[7]}}}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

