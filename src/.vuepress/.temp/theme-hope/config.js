import { Layout, NotFound, injectDarkMode, setupDarkMode, setupSidebarItems, scrollPromise } from "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.94_markdown-it@14.1.0_sass-embedded@1.92.0_sass@1.92.0_vue_50af93d90cdc6233d775127c7e20588c/node_modules/vuepress-theme-hope/lib/bundle/exports/base.js";

import { defineCatalogInfoGetter } from "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/@vuepress+plugin-catalog@2.0.0-rc.112_vuepress@2.0.0-rc.24_@vuepress+bundler-vite@2.0.0_e1ca3f25526a5c94bfe0aa18bfe2ca2b/node_modules/@vuepress/plugin-catalog/lib/client/index.js"
import { h } from "vue"
import { resolveComponent } from "vue"
import { Blog, BloggerInfo, SocialMedias, setupBlog } from "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.94_markdown-it@14.1.0_sass-embedded@1.92.0_sass@1.92.0_vue_50af93d90cdc6233d775127c7e20588c/node_modules/vuepress-theme-hope/lib/bundle/exports/blog.js";
import "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.94_markdown-it@14.1.0_sass-embedded@1.92.0_sass@1.92.0_vue_50af93d90cdc6233d775127c7e20588c/node_modules/vuepress-theme-hope/lib/bundle/styles/blog/bundle.scss";
import { GlobalEncrypt, LocalEncrypt } from "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.94_markdown-it@14.1.0_sass-embedded@1.92.0_sass@1.92.0_vue_50af93d90cdc6233d775127c7e20588c/node_modules/vuepress-theme-hope/lib/bundle/exports/encrypt.js";
import "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.94_markdown-it@14.1.0_sass-embedded@1.92.0_sass@1.92.0_vue_50af93d90cdc6233d775127c7e20588c/node_modules/vuepress-theme-hope/lib/bundle/styles/encrypt/bundle.scss"

import "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.112_vuepress@2.0.0-rc.24_@vuepress+bundler-vite@2.0.0-rc.24_@_57e240eea0a8ab53f8c35dbfd1d30723/node_modules/@vuepress/helper/lib/client/styles/colors.css";
import "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.112_vuepress@2.0.0-rc.24_@vuepress+bundler-vite@2.0.0-rc.24_@_57e240eea0a8ab53f8c35dbfd1d30723/node_modules/@vuepress/helper/lib/client/styles/normalize.css";
import "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.112_vuepress@2.0.0-rc.24_@vuepress+bundler-vite@2.0.0-rc.24_@_57e240eea0a8ab53f8c35dbfd1d30723/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";
import "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.94_markdown-it@14.1.0_sass-embedded@1.92.0_sass@1.92.0_vue_50af93d90cdc6233d775127c7e20588c/node_modules/vuepress-theme-hope/lib/bundle/styles/bundle.scss";

defineCatalogInfoGetter((meta) => {
  const title = meta.title;
  const shouldIndex = meta.index ?? true;
  const icon = meta.icon;

  return shouldIndex ? {
    title,
    content: icon ? () =>[h(resolveComponent("VPIcon"), { icon, sizing: "both" }), title] : null,
    order: meta.order,
    index: meta.index,
  } : null;
});

export default {
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await scrollPromise.wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkMode(app);

    app.component("BloggerInfo", BloggerInfo);
    app.component("SocialMedias", SocialMedias);
    app.component("GlobalEncrypt", GlobalEncrypt);
    app.component("LocalEncrypt", LocalEncrypt);
  },
  setup: () => {
    setupDarkMode();
    setupSidebarItems();
    setupBlog();
  },
  layouts: {
    Layout,
    NotFound,
    Blog,
  }
};
