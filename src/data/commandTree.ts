import { CommandsTree } from "../types";

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
  darkMode: {
    description: "Activa el modo oscuro.",
    execute: (context) => {
      context.setTheme("dark");
      return "Modo oscuro activado.";
    },
  },
  lightMode: {
    description: "Activa el modo claro.",
    execute: (context) => {
      context.setTheme("light");
      return "Modo claro activado";
    },
  },

  color: {
    description: "Cambia el color de la consola. Ejemplo: setColor red",
    execute: (context, args) => {
      if (args.length === 0) {
        return "Debes especificar un color.";
      }
      // colors need to be from a predefined list
      if (!["red", "green", "blue"].includes(args[0])) {
        return "Color no válido. Los colores válidos son: red, green, blue.";
      }
      context.setColor(args[0]);
      return `Color cambiado a ${args[0]}.`;
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
