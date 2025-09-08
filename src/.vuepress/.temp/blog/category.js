export const categoriesMap = JSON.parse("{\"category\":{\"/\":{\"path\":\"/category/\",\"map\":{\"Blog\":{\"path\":\"/category/blog/\",\"indexes\":[0,1,2]}}}},\"tag\":{\"/\":{\"path\":\"/tag/\",\"map\":{\"Vue\":{\"path\":\"/tag/vue/\",\"indexes\":[0]},\"Nuxt\":{\"path\":\"/tag/nuxt/\",\"indexes\":[0]},\"Theme Hope\":{\"path\":\"/tag/theme-hope/\",\"indexes\":[0]},\"Docker\":{\"path\":\"/tag/docker/\",\"indexes\":[1]},\"Django\":{\"path\":\"/tag/django/\",\"indexes\":[1]},\"API Rest\":{\"path\":\"/tag/api-rest/\",\"indexes\":[1]},\"Python\":{\"path\":\"/tag/python/\",\"indexes\":[1]},\"VuePress\":{\"path\":\"/tag/vuepress/\",\"indexes\":[2]},\"JavaScript\":{\"path\":\"/tag/javascript/\",\"indexes\":[2]}}}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

