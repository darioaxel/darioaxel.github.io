import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "Docencia",
    icon: "lightbulb",
    prefix: "/docencia/",
    children: [
      {
        text: "CFGS DAM/DAW",
        icon: "lightbulb",
        prefix: "dam-daw/", 
        children: [{ text: "0484 Bases de Datos", link: "basesdatos/" },
          { text: "0613 Desarrollo Web Entorno Servidor", link: "DWES/" },
        ],       
      },
       {
        text: "CFGS ASIR",
        icon: "lightbulb",
        prefix: "asir/",
        children: [{ text: "0378 Gestión Bases de Datos", link: "gestionbasesdatos/" },
          { text: "0378 Admon. Sistemas Gestores BBDD", link: "admonsgbd/" }
        ],
      },
      {
        text: "Ciclos Expecialización",
        icon: "lightbulb",
        prefix: "ce/",
        children: [{ text: "Programación para IA", link: "pia/" }],
      },
    ],
  }, 
  {
    text: "Blog",
    icon: "book",
    link: "/blog/",
  },   
  {
    text: "Proyectos",
    icon: "book",
    link: "/proyectos/",
  },
]);