import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "es-ES",
  title: "darioaxel",
  description: "Documentación y apuntes para FP",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
