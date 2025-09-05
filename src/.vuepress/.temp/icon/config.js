import { hasGlobalComponent } from "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.112_vuepress@2.0.0-rc.24_@vuepress+bundler-vite@2.0.0-rc.24_@_57e240eea0a8ab53f8c35dbfd1d30723/node_modules/@vuepress/helper/lib/client/index.js";
import { useScriptTag } from "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/@vueuse+core@13.9.0_vue@3.5.21/node_modules/@vueuse/core/index.mjs";
import { h } from "vue";
import { VPIcon } from "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/@vuepress+plugin-icon@2.0.0-rc.112_markdown-it@14.1.0_vuepress@2.0.0-rc.24_@vuepress+bu_3a0fce6129276f3a8dca0b9e97f14789/node_modules/@vuepress/plugin-icon/lib/client/index.js"

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("VPIcon")) {
      app.component(
        "VPIcon",
        (props) =>
          h(VPIcon, {
            type: "iconify",
            prefix: "fa6-solid:",
            ...props,
          })
      )
    }
  },
  setup: () => {
    useScriptTag(`https://cdn.jsdelivr.net/npm/iconify-icon@2`);
  },
}
