export const categoriesMap = JSON.parse("{\"category\":{\"/\":{\"path\":\"/category/\",\"map\":{\"Blog\":{\"path\":\"/category/blog/\",\"indexes\":[0,1,2,3,4,5,6,7,8]}}}},\"tag\":{\"/\":{\"path\":\"/tag/\",\"map\":{\"Vue\":{\"path\":\"/tag/vue/\",\"indexes\":[6]},\"Nuxt\":{\"path\":\"/tag/nuxt/\",\"indexes\":[6]},\"Theme Hope\":{\"path\":\"/tag/theme-hope/\",\"indexes\":[6]},\"Docker\":{\"path\":\"/tag/docker/\",\"indexes\":[7]},\"Django\":{\"path\":\"/tag/django/\",\"indexes\":[7]},\"API Rest\":{\"path\":\"/tag/api-rest/\",\"indexes\":[7]},\"Python\":{\"path\":\"/tag/python/\",\"indexes\":[0,1,3,4,5,7]},\"VuePress\":{\"path\":\"/tag/vuepress/\",\"indexes\":[8]},\"JavaScript\":{\"path\":\"/tag/javascript/\",\"indexes\":[8]},\"algoritmos\":{\"path\":\"/tag/algoritmos/\",\"indexes\":[4,5]},\"Programacion\":{\"path\":\"/tag/programacion/\",\"indexes\":[0,2]},\"Patterns\":{\"path\":\"/tag/patterns/\",\"indexes\":[3]},\"Vibecoding\":{\"path\":\"/tag/vibecoding/\",\"indexes\":[2]}}}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

