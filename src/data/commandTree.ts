import { CommandsTree, Metadata } from "../types";

export const commandsTree: CommandsTree = {
  help: {
    description: "Muestra la lista de comandos disponibles.",
    execute: (context) => {
      const list = Object.keys(context.commandsTree).map(
        (cmd) => `${cmd} - ${context.commandsTree[cmd].description || ""}`,
      );
      return list;
    },
  },
  clear: {
    description: "Limpia el historial de la consola.",
    execute: (context) => {
      context.clearHistory();
      return "Consola limpia.";
    },
  },
  cls: {
    description: "Limpia el historial de la consola.",
    execute: (context) => {
      context.clearHistory();
      return "Consola limpia.";
    },
  },
  dark: {
    description: "Activa el modo oscuro.",
    execute: (context) => {
      context.setTheme("dark");
      return "Modo oscuro activado.";
    },
  },
  light: {
    description: "Activa el modo claro.",
    execute: (context) => {
      context.setTheme("light");
      return "Modo claro activado";
    },
  },
  exit: {
    description: "Cierra la consola.",
    execute: (context) => {
      window.close();
      context.clearHistory();
      return null;
    },
  },
  reset: {
    description: "Resete a la consola.",
    execute: (context) => {
      context.clearHistory();
      return null;
    },
  },
  color: {
    description: "Cambia el color de la consola. Ejemplo: color red",
    execute: (context, args) => {
      if (args.length === 0) {
        return "Debes especificar un color.";
      }
      // colors need to be from a predefined list
      if (!["red", "green", "blue", "yellow", "grey"].includes(args[0])) {
        return "Color no válido. Los colores válidos son: red, green, blue, yellow, grey.";
      }
      context.setColor(args[0] as Metadata["color"]);
      return `Color cambiado a ${args[0]}.`;
    },
  },
  lang: {
    description: "Cambia el idioma de la consola. Ejemplo: lang es",
    execute: (context, args) => {
      if (args.length === 0) {
        return "Debes especificar un idioma (es, en, de).";
      }
      // colors need to be from a predefined list
      if (!["es", "de", "en"].includes(args[0])) {
        return "Idioma no válido. Los idiomas válidos son: es, en, de.";
      }
      context.setLang(args[0] as "es" | "en" | "de");
      return `Idioma cambiado a ${args[0]}.`;
    },
  },

  font: {
    description: "Cambia el tamaño de la fuente de la consola. Ejemplo: font 16",
    execute: (context, args) => {
      if (args.length === 0) {
        return "Debes especificar un tamaño.";
      }
      const size = Number.parseInt(args[0], 10);
      if (Number.isNaN(size) || size < 1 || size > 72) {
        return "Tamaño no válido.";
      }
      context.setFont(size);
      return `Tamaño de fuente cambiado a ${size}.`;
    },
  },
};
