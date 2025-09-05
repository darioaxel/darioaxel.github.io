import { CodeTabs } from "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.112_markdown-it@14.1.0_vuepress@2.0.0-rc.24_@vue_f6df4a56a47b2fa235b6fa2e0045a1f3/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.112_markdown-it@14.1.0_vuepress@2.0.0-rc.24_@vue_f6df4a56a47b2fa235b6fa2e0045a1f3/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.112_markdown-it@14.1.0_vuepress@2.0.0-rc.24_@vue_f6df4a56a47b2fa235b6fa2e0045a1f3/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
