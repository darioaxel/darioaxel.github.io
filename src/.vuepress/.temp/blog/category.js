export const categoriesMap = JSON.parse("{\"category\":{\"/\":{\"path\":\"/category/\",\"map\":{\"Blog\":{\"path\":\"/category/blog/\",\"indexes\":[0,1,2,3,4,5,6]}}}},\"tag\":{\"/\":{\"path\":\"/tag/\",\"map\":{\"Vue\":{\"path\":\"/tag/vue/\",\"indexes\":[4]},\"Nuxt\":{\"path\":\"/tag/nuxt/\",\"indexes\":[4]},\"Theme Hope\":{\"path\":\"/tag/theme-hope/\",\"indexes\":[4]},\"Docker\":{\"path\":\"/tag/docker/\",\"indexes\":[5]},\"Django\":{\"path\":\"/tag/django/\",\"indexes\":[5]},\"API Rest\":{\"path\":\"/tag/api-rest/\",\"indexes\":[5]},\"Python\":{\"path\":\"/tag/python/\",\"indexes\":[1,2,3,5]},\"VuePress\":{\"path\":\"/tag/vuepress/\",\"indexes\":[6]},\"JavaScript\":{\"path\":\"/tag/javascript/\",\"indexes\":[6]},\"algoritmos\":{\"path\":\"/tag/algoritmos/\",\"indexes\":[2,3]},\"Patterns\":{\"path\":\"/tag/patterns/\",\"indexes\":[1]},\"Programacion\":{\"path\":\"/tag/programacion/\",\"indexes\":[0]},\"Vibecoding\":{\"path\":\"/tag/vibecoding/\",\"indexes\":[0]}}}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

