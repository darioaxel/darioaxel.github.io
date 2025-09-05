import CodeDemo from "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.94_markdown-it@14.1.0_sass-embedded@1.92.0_sass@1.9_95493f8b6c711fde3f64a2b81b70af61/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "/home/darioaxel/Proyectos/darioaxel.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.94_markdown-it@14.1.0_sass-embedded@1.92.0_sass@1.9_95493f8b6c711fde3f64a2b81b70af61/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";

export default {
  enhance: ({ app }) => {
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
  },
};
