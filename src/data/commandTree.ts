import { CommandsTree } from "../types";

export const commandsTree: CommandsTree = {
  help: {
    description: "Muestra la lista de comandos disponibles.",
    execute: (context) => {
      return Object.keys(context.commandsTree)
        .map((cmd) => `${cmd} - ${context.commandsTree[cmd].description || ""}`)
        .join("\n");
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
  setColor: {
    description: "Cambia el color de la consola. Ejemplo: setColor red",
    execute: (context, args) => {
      context.setColor(args[0]);
      return `Color cambiado a ${args[0]}.`;
    },
  },
  getSocials: {
    description: "Muestra opciones de redes sociales.",
    subCommands: {
      instagram: {
        description: "Abre Instagram.",
        execute: () => "Redirigiendo a Instagram...",
      },
      twitter: {
        description: "Abre Twitter.",
        execute: () => "Redirigiendo a Twitter...",
      },
    },
  },
};
