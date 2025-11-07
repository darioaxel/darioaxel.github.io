import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/docencia/": "structure",
  "/docencia/dam-daw/basesdatos": "structure",
  "/docencia/dam-daw/DWES": "structure",
  "/docencia/asir/admonsgbd": "structure",
  "/blog/article/": "structure",
  "/proyectos/": "structure",
  "/": [
    "",
    "portfolio",
    {
      text: "Demo",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "Docs",
      icon: "book",
      prefix: "guide/",
      children: "structure",
    },
    {
      text: "Slides",
      icon: "person-chalkboard",
      link: "https://ecosystem.vuejs.press/plugins/markdown/revealjs/demo.html",
    },
  ],
});