import { hasGlobalComponent } from "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.112_vuepress@2.0.0-rc.24_@vuepress+bundler-vite@2.0.0-rc.24_@_57e240eea0a8ab53f8c35dbfd1d30723/node_modules/@vuepress/helper/lib/client/index.js";
import Badge from "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.94_sass-embedded@1.92.0_sass@1.92.0_vuepress@2.0.0-_1447e48f88b1558fbe06e53b40f01ce7/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import VPCard from "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.94_sass-embedded@1.92.0_sass@1.92.0_vuepress@2.0.0-_1447e48f88b1558fbe06e53b40f01ce7/node_modules/vuepress-plugin-components/lib/client/components/VPCard.js";

import "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.112_vuepress@2.0.0-rc.24_@vuepress+bundler-vite@2.0.0-rc.24_@_57e240eea0a8ab53f8c35dbfd1d30723/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("VPCard")) app.component("VPCard", VPCard);
    
  },
  setup: () => {

  },
  rootComponents: [

  ],
};
