export const categoriesMap = JSON.parse("{\"category\":{\"/\":{\"path\":\"/category/\",\"map\":{\"Blog\":{\"path\":\"/category/blog/\",\"indexes\":[0,1,2,3,4,5,6,7]}}}},\"tag\":{\"/\":{\"path\":\"/tag/\",\"map\":{\"Vue\":{\"path\":\"/tag/vue/\",\"indexes\":[5]},\"Nuxt\":{\"path\":\"/tag/nuxt/\",\"indexes\":[5]},\"Theme Hope\":{\"path\":\"/tag/theme-hope/\",\"indexes\":[5]},\"Docker\":{\"path\":\"/tag/docker/\",\"indexes\":[6]},\"Django\":{\"path\":\"/tag/django/\",\"indexes\":[6]},\"API Rest\":{\"path\":\"/tag/api-rest/\",\"indexes\":[6]},\"Python\":{\"path\":\"/tag/python/\",\"indexes\":[0,2,3,4,6]},\"VuePress\":{\"path\":\"/tag/vuepress/\",\"indexes\":[7]},\"JavaScript\":{\"path\":\"/tag/javascript/\",\"indexes\":[7]},\"algoritmos\":{\"path\":\"/tag/algoritmos/\",\"indexes\":[3,4]},\"Patterns\":{\"path\":\"/tag/patterns/\",\"indexes\":[2]},\"Programacion\":{\"path\":\"/tag/programacion/\",\"indexes\":[1]},\"Vibecoding\":{\"path\":\"/tag/vibecoding/\",\"indexes\":[1]}}}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

