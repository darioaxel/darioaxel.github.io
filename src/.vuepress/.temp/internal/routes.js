export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Project home","icon":"house"} }],
  ["/portfolio.html", { loader: () => import(/* webpackChunkName: "portfolio.html" */"/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/portfolio.html.js"), meta: {"title":"Portfolio Home","icon":"house"} }],
  ["/demo/", { loader: () => import(/* webpackChunkName: "demo_index.html" */"/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/demo/index.html.js"), meta: {"title":"Features demo","icon":"laptop-code"} }],
  ["/demo/disable.html", { loader: () => import(/* webpackChunkName: "demo_disable.html" */"/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/demo/disable.html.js"), meta: {"title":"Disabling layout and features","icon":"gears","order":4} }],
  ["/demo/encrypt.html", { loader: () => import(/* webpackChunkName: "demo_encrypt.html" */"/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/demo/encrypt.html.js"), meta: {"title":"Encryption Article","icon":"lock"} }],
  ["/demo/layout.html", { loader: () => import(/* webpackChunkName: "demo_layout.html" */"/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/demo/layout.html.js"), meta: {"title":"Layout","icon":"object-group","order":2} }],
  ["/demo/markdown.html", { loader: () => import(/* webpackChunkName: "demo_markdown.html" */"/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/demo/markdown.html.js"), meta: {"title":"Markdown Enhance","icon":"fa6-brands:markdown","order":2} }],
  ["/demo/page.html", { loader: () => import(/* webpackChunkName: "demo_page.html" */"/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/demo/page.html.js"), meta: {"title":"Page Config","icon":"file","order":3} }],
  ["/guide/", { loader: () => import(/* webpackChunkName: "guide_index.html" */"/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/guide/index.html.js"), meta: {"title":"Guide","icon":"lightbulb"} }],
  ["/guide/foo/", { loader: () => import(/* webpackChunkName: "guide_foo_index.html" */"/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/guide/foo/index.html.js"), meta: {"title":"Foo feature","icon":"lightbulb"} }],
  ["/guide/foo/ray.html", { loader: () => import(/* webpackChunkName: "guide_foo_ray.html" */"/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/guide/foo/ray.html.js"), meta: {"title":"Ray","icon":"circle-info"} }],
  ["/guide/bar/", { loader: () => import(/* webpackChunkName: "guide_bar_index.html" */"/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/guide/bar/index.html.js"), meta: {"title":"Bar feature","icon":"lightbulb"} }],
  ["/guide/bar/baz.html", { loader: () => import(/* webpackChunkName: "guide_bar_baz.html" */"/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/guide/bar/baz.html.js"), meta: {"title":"Baz","icon":"circle-info"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/home/darioaxel/Proyectos/darioaxel.github.io/src/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);
