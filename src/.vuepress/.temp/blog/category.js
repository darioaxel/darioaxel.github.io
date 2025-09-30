export const categoriesMap = JSON.parse("{\"category\":{\"/\":{\"path\":\"/category/\",\"map\":{\"Blog\":{\"path\":\"/category/blog/\",\"indexes\":[0,1,2,3,4]}}}},\"tag\":{\"/\":{\"path\":\"/tag/\",\"map\":{\"Vue\":{\"path\":\"/tag/vue/\",\"indexes\":[2]},\"Nuxt\":{\"path\":\"/tag/nuxt/\",\"indexes\":[2]},\"Theme Hope\":{\"path\":\"/tag/theme-hope/\",\"indexes\":[2]},\"Docker\":{\"path\":\"/tag/docker/\",\"indexes\":[3]},\"Django\":{\"path\":\"/tag/django/\",\"indexes\":[3]},\"API Rest\":{\"path\":\"/tag/api-rest/\",\"indexes\":[3]},\"Python\":{\"path\":\"/tag/python/\",\"indexes\":[0,1,3]},\"VuePress\":{\"path\":\"/tag/vuepress/\",\"indexes\":[4]},\"JavaScript\":{\"path\":\"/tag/javascript/\",\"indexes\":[4]},\"algoritmos\":{\"path\":\"/tag/algoritmos/\",\"indexes\":[0,1]}}}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

